import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";

export type MemberPortal = "graphics" | "social" | "updates";

export type Member = {
  id: string;
  name: string;
  password: string; // plain text for now, same pattern as admin
  portals: MemberPortal[];
  createdAt: string;
  lastLoginAt?: string;
  creditPoints?: number; // Migration: older members might not have this
};

export type Task = {
  id: string;
  toMemberId: string;
  toMemberName: string;
  title: string;
  description: string;
  assignedAt: string;
  status: "pending" | "done";
  points: number;
  memberMarkedDone: boolean;
};

const MEMBERS_FILE = path.join(process.cwd(), "data", "members.json");
const TASKS_FILE = path.join(process.cwd(), "data", "tasks.json");
const REDIS_MEMBERS_KEY = "crelynex:members";
const REDIS_TASKS_KEY = "crelynex:tasks";

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const hasRedisConfig = Boolean(redisUrl && redisToken);

const redis = hasRedisConfig
  ? new Redis({
      url: redisUrl!,
      token: redisToken!,
    })
  : null;

async function ensureFile(filePath: string, defaultValue: unknown) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.access(filePath);
  } catch {
    try {
      await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2), "utf8");
    } catch {
      // Ignore write errors in read-only environments (e.g. Vercel)
    }
  }
}

// ---- Members ---- //

export async function getMembers(): Promise<Member[]> {
  if (redis) {
    try {
      const data = await redis.get<Member[]>(REDIS_MEMBERS_KEY);
      if (data) return data;
    } catch {
      // Fallback
    }
  }

  await ensureFile(MEMBERS_FILE, []);
  try {
    const raw = await fs.readFile(MEMBERS_FILE, "utf8");
    const members = JSON.parse(raw) as Member[];
    // Initial Migration: set creditPoints to 0 if missing
    return members.map(m => ({ ...m, creditPoints: m.creditPoints ?? 0 }));
  } catch {
    return [];
  }
}

export async function getMember(id: string): Promise<Member | null> {
  const members = await getMembers();
  const member = members.find((m) => m.id === id);
  if (!member) return null;

  // Retroactive Migration: if creditPoints is specifically undefined and they have done tasks
  if (member.creditPoints === undefined || member.creditPoints === 0) {
    const tasks = await getTasks();
    const memberTasks = tasks.filter(t => t.toMemberId === id && t.status === "done");
    const totalPoints = memberTasks.reduce((sum, t) => sum + (t.points || 1), 0);
    
    if (totalPoints > 0) {
      member.creditPoints = totalPoints;
      await saveMembers(members);
    }
  }

  return member;
}

export async function saveMembers(members: Member[]) {
  if (redis) {
    try {
      await redis.set(REDIS_MEMBERS_KEY, members);
      return;
    } catch {
      // Fallback
    }
  }

  await ensureFile(MEMBERS_FILE, []);
  try {
    await fs.writeFile(MEMBERS_FILE, JSON.stringify(members, null, 2), "utf8");
  } catch {
    // Vercel read-only FS fallback handled by Redis ideally
  }
}

export async function createMember(
  data: Omit<Member, "createdAt">
): Promise<Member> {
  const members = await getMembers();
  const newMember: Member = {
    ...data,
    createdAt: new Date().toISOString(),
  };
  members.push(newMember);
  await saveMembers(members);
  return newMember;
}

export async function updateMember(
  id: string,
  updates: Partial<Omit<Member, "id" | "createdAt">>
): Promise<Member | null> {
  const members = await getMembers();
  const idx = members.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  members[idx] = { ...members[idx], ...updates };
  await saveMembers(members);
  return members[idx];
}

export async function deleteMember(id: string): Promise<boolean> {
  const members = await getMembers();
  const filtered = members.filter((m) => m.id !== id);
  if (filtered.length === members.length) return false;
  await saveMembers(filtered);
  return true;
}

// ---- Tasks ---- //

export async function getTasks(): Promise<Task[]> {
  if (redis) {
    try {
      const data = await redis.get<Task[]>(REDIS_TASKS_KEY);
      if (data) return data;
    } catch {
      // Fallback
    }
  }

  await ensureFile(TASKS_FILE, []);
  try {
    const raw = await fs.readFile(TASKS_FILE, "utf8");
    const tasks = JSON.parse(raw) as Task[];
    // Initial Migration: set points and memberMarkedDone if missing
    return tasks.map(t => ({
      ...t,
      points: t.points ?? 1,
      memberMarkedDone: t.memberMarkedDone ?? (t.status === "done")
    }));
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]) {
  if (redis) {
    try {
      await redis.set(REDIS_TASKS_KEY, tasks);
      return;
    } catch {
      // Fallback
    }
  }

  await ensureFile(TASKS_FILE, []);
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf8");
  } catch {
    // Vercel read-only FS fallback
  }
}

export async function getTasksForMember(memberId: string): Promise<Task[]> {
  const tasks = await getTasks();
  return tasks.filter((t) => t.toMemberId === memberId);
}

export async function createTask(
  data: Omit<Task, "id" | "assignedAt" | "status">
): Promise<Task> {
  const tasks = await getTasks();
  const newTask: Task = {
    ...data,
    id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    assignedAt: new Date().toISOString(),
    status: "pending",
    points: (data as any).points || 1,
    memberMarkedDone: false,
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, "id">>
): Promise<Task | null> {
  const tasks = await getTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  await saveTasks(tasks);
  return tasks[idx];
}

export async function deleteTask(id: string): Promise<boolean> {
  const tasks = await getTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length) return false;
  await saveTasks(filtered);
  return true;
}
