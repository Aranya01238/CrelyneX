import { promises as fs } from "node:fs";
import path from "node:path";

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

async function ensureFile(filePath: string, defaultValue: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(
      filePath,
      JSON.stringify(defaultValue, null, 2),
      "utf8"
    );
  }
}

// Credentials
export async function getAllCredentials(): Promise<AllSocialCredentials> {
  await ensureFile(CREDENTIALS_FILE, {});
  try {
    const raw = await fs.readFile(CREDENTIALS_FILE, "utf8");
    return JSON.parse(raw) as AllSocialCredentials;
  } catch {
    return {};
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
  await fs.writeFile(CREDENTIALS_FILE, JSON.stringify(all, null, 2), "utf8");
}

// Followers
export async function getAllFollowers(): Promise<AllFollowerData> {
  await ensureFile(FOLLOWERS_FILE, {});
  try {
    const raw = await fs.readFile(FOLLOWERS_FILE, "utf8");
    return JSON.parse(raw) as AllFollowerData;
  } catch {
    return {};
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

  await fs.writeFile(FOLLOWERS_FILE, JSON.stringify(all, null, 2), "utf8");
}
