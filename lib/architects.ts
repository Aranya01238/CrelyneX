import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";

export type Architect = {
  id: string;
  name: string;
  role: string;
  bio: string;
  icon: string;
};

const ARCHITECTS_FILE = path.join(process.cwd(), "data", "architects.json");
const REDIS_KEY = "crelynex:architects";

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
      // Ignore write errors in read-only environments
    }
  }
}

export async function getArchitects(): Promise<Architect[]> {
  if (redis) {
    try {
      const data = await redis.get<Architect[]>(REDIS_KEY);
      if (data) return data;
    } catch {
      // Fallback
    }
  }

  await ensureFile(ARCHITECTS_FILE, []);
  try {
    const raw = await fs.readFile(ARCHITECTS_FILE, "utf8");
    return JSON.parse(raw) as Architect[];
  } catch {
    return [];
  }
}

export async function saveArchitects(architects: Architect[]) {
  if (redis) {
    try {
      await redis.set(REDIS_KEY, architects);
      return;
    } catch {
      // Fallback
    }
  }

  await ensureFile(ARCHITECTS_FILE, []);
  try {
    await fs.writeFile(ARCHITECTS_FILE, JSON.stringify(architects, null, 2), "utf8");
  } catch {
    // Vercel read-only FS fallback
  }
}

export async function createArchitect(data: Omit<Architect, "id">): Promise<Architect> {
  const architects = await getArchitects();
  const newArchitect: Architect = {
    ...data,
    id: `arch_${Date.now()}`,
  };
  architects.push(newArchitect);
  await saveArchitects(architects);
  return newArchitect;
}

export async function updateArchitect(
  id: string,
  updates: Partial<Omit<Architect, "id">>
): Promise<Architect | null> {
  const architects = await getArchitects();
  const idx = architects.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  architects[idx] = { ...architects[idx], ...updates };
  await saveArchitects(architects);
  return architects[idx];
}

export async function deleteArchitect(id: string): Promise<boolean> {
  const architects = await getArchitects();
  const filtered = architects.filter((a) => a.id !== id);
  if (filtered.length === architects.length) return false;
  await saveArchitects(filtered);
  return true;
}
