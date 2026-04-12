import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";

export type SocialPlatform = "instagram" | "facebook" | "linkedin";

export type SocialCredentials = {
  instagram?: { username: string; password: string };
  facebook?: { username: string; password: string };
  linkedin?: { username: string; password: string };
};

// Per-member credentials map: { [memberId]: SocialCredentials }
export type AllSocialCredentials = Record<string, SocialCredentials>;

export type FollowerEntry = {
  date: string; // YYYY-MM-DD
  count: number;
  addedBy: string; // memberId
  addedByName: string;
};

// Per platform per member: { [memberId]: { [platform]: FollowerEntry[] } }
export type AllFollowerData = Record<
  string,
  Record<SocialPlatform, FollowerEntry[]>
>;

const CREDENTIALS_FILE = path.join(
  process.cwd(),
  "data",
  "social-credentials.json"
);
const FOLLOWERS_FILE = path.join(
  process.cwd(),
  "data",
  "social-followers.json"
);

const REDIS_CREDS_KEY = "crelynex:social_creds";
const REDIS_FOLLOWERS_KEY = "crelynex:social_followers";

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
      await fs.writeFile(
        filePath,
        JSON.stringify(defaultValue, null, 2),
        "utf8"
      );
    } catch {
      // Ignore Vercel read-only FS errors
    }
  }
}

// Credentials
export async function getAllCredentials(): Promise<AllSocialCredentials> {
  if (redis) {
    try {
      const data = await redis.get<AllSocialCredentials>(REDIS_CREDS_KEY);
      if (data) return data;
    } catch {
      // fallback
    }
  }

  await ensureFile(CREDENTIALS_FILE, {});
  try {
    const raw = await fs.readFile(CREDENTIALS_FILE, "utf8");
    return JSON.parse(raw) as AllSocialCredentials;
  } catch {
    return {};
  }
}

export async function saveCredentials(all: AllSocialCredentials) {
  if (redis) {
    try {
      await redis.set(REDIS_CREDS_KEY, all);
      return;
    } catch {
      // fallback
    }
  }

  await ensureFile(CREDENTIALS_FILE, {});
  try {
    await fs.writeFile(CREDENTIALS_FILE, JSON.stringify(all, null, 2), "utf8");
  } catch {
    // Vercel read-only FS fallback
  }
}

export async function getMemberCredentials(
  memberId: string
): Promise<SocialCredentials> {
  const all = await getAllCredentials();
  return all[memberId] ?? {};
}

export async function setMemberCredentials(
  memberId: string,
  credentials: SocialCredentials
) {
  const all = await getAllCredentials();
  all[memberId] = credentials;
  await saveCredentials(all);
}

// Followers
export async function getAllFollowers(): Promise<AllFollowerData> {
  if (redis) {
    try {
      const data = await redis.get<AllFollowerData>(REDIS_FOLLOWERS_KEY);
      if (data) return data;
    } catch {
      // fallback
    }
  }

  await ensureFile(FOLLOWERS_FILE, {});
  try {
    const raw = await fs.readFile(FOLLOWERS_FILE, "utf8");
    return JSON.parse(raw) as AllFollowerData;
  } catch {
    return {};
  }
}

export async function saveAllFollowers(all: AllFollowerData) {
  if (redis) {
    try {
      await redis.set(REDIS_FOLLOWERS_KEY, all);
      return;
    } catch {
      // fallback
    }
  }

  await ensureFile(FOLLOWERS_FILE, {});
  try {
    await fs.writeFile(FOLLOWERS_FILE, JSON.stringify(all, null, 2), "utf8");
  } catch {
    // Vercel read-only FS fallback
  }
}

export async function getMemberFollowers(
  memberId: string
): Promise<Record<SocialPlatform, FollowerEntry[]>> {
  const all = await getAllFollowers();
  return (
    all[memberId] ?? { instagram: [], facebook: [], linkedin: [] }
  );
}

export async function addFollowerEntry(
  memberId: string,
  platform: SocialPlatform,
  entry: Omit<FollowerEntry, "date"> & { date?: string }
): Promise<void> {
  const all = await getAllFollowers();
  if (!all[memberId]) {
    all[memberId] = { instagram: [], facebook: [], linkedin: [] };
  }
  const today = entry.date ?? new Date().toISOString().split("T")[0];
  const platformData = all[memberId][platform];

  // Update if same date already exists, else push
  const existingIdx = platformData.findIndex((e) => e.date === today);
  const newEntry: FollowerEntry = {
    date: today,
    count: entry.count,
    addedBy: entry.addedBy,
    addedByName: entry.addedByName,
  };

  if (existingIdx >= 0) {
    platformData[existingIdx] = newEntry;
  } else {
    platformData.push(newEntry);
    platformData.sort((a, b) => a.date.localeCompare(b.date));
  }

  await saveAllFollowers(all);
}
