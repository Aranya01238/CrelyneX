import { promises as fs } from "node:fs";
import path from "node:path";

export type MemberPortal = "graphics" | "social" | "updates";

export type Member = {
  id: string;
  name: string;
  password: string; // plain text for now, same pattern as admin
  portals: MemberPortal[];
  createdAt: string;
};

export type Task = {
  id: string;
  toMemberId: string;
  toMemberName: string;
  title: string;
  description: string;
  assignedAt: string;
  status: "pending" | "done";
};

const MEMBERS_FILE = path.join(process.cwd(), "data", "members.json");
const TASKS_FILE = path.join(process.cwd(), "data", "tasks.json");

async function ensureFile(filePath: string, defaultValue: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2), "utf8");
  }
}

export async function getMembers(): Promise<Member[]> {
  await ensureFile(MEMBERS_FILE, []);
  try {
    const raw = await fs.readFile(MEMBERS_FILE, "utf8");
    return JSON.parse(raw) as Member[];
  } catch {
    return [];
  }
}

export async function getMember(id: string): Promise<Member | null> {
  const members = await getMembers();
  return members.find((m) => m.id === id) ?? null;
}

export async function saveMembers(members: Member[]) {
  await ensureFile(MEMBERS_FILE, []);
  await fs.writeFile(MEMBERS_FILE, JSON.stringify(members, null, 2), "utf8");
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

// Tasks
export async function getTasks(): Promise<Task[]> {
  await ensureFile(TASKS_FILE, []);
  try {
    const raw = await fs.readFile(TASKS_FILE, "utf8");
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
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
  };
  tasks.push(newTask);
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf8");
  return newTask;
}

export async function updateTaskStatus(
  id: string,
  status: "pending" | "done"
): Promise<boolean> {
  const tasks = await getTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks[idx].status = status;
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf8");
  return true;
}

export async function deleteTask(id: string): Promise<boolean> {
  const tasks = await getTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length) return false;
  await fs.writeFile(TASKS_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}
