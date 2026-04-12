import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";

export type EventUpdateData = {
  eventId: string;
  eventName: string;
  count: number;
};

export type DailyUpdateEntry = {
  id: string; // Unique ID for this entry
  date: string; // YYYY-MM-DD
  instagramCount: number;
  facebookCount: number;
  events: EventUpdateData[];
};

// Global mapping keyed by memberId
export type AllUpdatesData = Record<string, DailyUpdateEntry[]>;

const UPDATES_FILE = path.join(process.cwd(), "data", "member-updates.json");
const REDIS_UPDATES_KEY = "crelynex:member_updates";

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const hasRedisConfig = Boolean(redisUrl && redisToken);

const redis = hasRedisConfig
  ? new Redis({
      url: redisUrl!,
      token: redisToken!,
    })
  : null;

async function ensureFile() {
  try {
    await fs.mkdir(path.dirname(UPDATES_FILE), { recursive: true });
    await fs.access(UPDATES_FILE);
  } catch {
    try {
      await fs.writeFile(UPDATES_FILE, "{}", "utf8");
    } catch {
      // Vercel read-only FS fallback
    }
  }
}

export async function getAllUpdates(): Promise<AllUpdatesData> {
  if (redis) {
    try {
      const data = await redis.get<AllUpdatesData>(REDIS_UPDATES_KEY);
      if (data) return data;
    } catch {
      // Fallback
    }
  }

  await ensureFile();
  try {
    const raw = await fs.readFile(UPDATES_FILE, "utf8");
    return JSON.parse(raw) as AllUpdatesData;
  } catch {
    return {};
  }
}

export async function saveAllUpdates(all: AllUpdatesData) {
  if (redis) {
    try {
      await redis.set(REDIS_UPDATES_KEY, all);
      return;
    } catch {
      // Fallback
    }
  }

  await ensureFile();
  try {
    await fs.writeFile(UPDATES_FILE, JSON.stringify(all, null, 2), "utf8");
  } catch {
    // Vercel read-only FS fallback
  }
}

export async function getMemberUpdates(memberId: string): Promise<DailyUpdateEntry[]> {
  const all = await getAllUpdates();
  return all[memberId] ?? [];
}

export async function submitDailyUpdate(
  memberId: string,
  entry: Omit<DailyUpdateEntry, "id" | "date">
): Promise<DailyUpdateEntry> {
  const all = await getAllUpdates();
  if (!all[memberId]) {
    all[memberId] = [];
  }

  const today = new Date().toISOString().split("T")[0];
  const newEntry: DailyUpdateEntry = {
    ...entry,
    id: `update_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    date: today,
  };

  // Prevent multiple entries for the same day entirely? No, let's just append.
  // The prompt implies daily updates are a feed/log. We can just append them.
  all[memberId].unshift(newEntry);
  await saveAllUpdates(all);
  return newEntry;
}

export async function deleteDailyUpdate(memberId: string, entryId: string): Promise<boolean> {
  const all = await getAllUpdates();
  if (!all[memberId]) return false;

  const initialLength = all[memberId].length;
  all[memberId] = all[memberId].filter(e => e.id !== entryId);

  if (all[memberId].length !== initialLength) {
    await saveAllUpdates(all);
    return true;
  }
  return false;
}
