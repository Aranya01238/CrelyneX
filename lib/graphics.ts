import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";

export type GraphicsUpload = {
  id: string;
  title: string;
  type: "poster" | "video";
  url: string;
  thumbnail?: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
  description?: string;
};

const GRAPHICS_FILE = path.join(process.cwd(), "data", "graphics.json");
const REDIS_GRAPHICS_KEY = "crelynex:graphics";

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
    await fs.mkdir(path.dirname(GRAPHICS_FILE), { recursive: true });
    await fs.access(GRAPHICS_FILE);
  } catch {
    try {
      await fs.writeFile(GRAPHICS_FILE, "[]", "utf8");
    } catch {
      // ignore
    }
  }
}

export async function getUploads(): Promise<GraphicsUpload[]> {
  if (redis) {
    try {
      const data = await redis.get<GraphicsUpload[]>(REDIS_GRAPHICS_KEY);
      if (data) return data;
    } catch {
      // fallback
    }
  }

  await ensureFile();
  try {
    const raw = await fs.readFile(GRAPHICS_FILE, "utf8");
    return JSON.parse(raw) as GraphicsUpload[];
  } catch {
    return [];
  }
}

async function saveUploads(uploads: GraphicsUpload[]) {
  if (redis) {
    try {
      await redis.set(REDIS_GRAPHICS_KEY, uploads);
      return;
    } catch {
      // fallback
    }
  }

  await ensureFile();
  try {
    await fs.writeFile(GRAPHICS_FILE, JSON.stringify(uploads, null, 2), "utf8");
  } catch {
    // Vercel read-only FS fallback
  }
}

export async function addUpload(
  data: Omit<GraphicsUpload, "id" | "uploadedAt">
): Promise<GraphicsUpload> {
  const uploads = await getUploads();
  const newUpload: GraphicsUpload = {
    ...data,
    id: `upload_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    uploadedAt: new Date().toISOString(),
  };
  uploads.unshift(newUpload); // newest first
  await saveUploads(uploads);
  return newUpload;
}

export async function deleteUpload(id: string): Promise<boolean> {
  const uploads = await getUploads();
  const filtered = uploads.filter((u) => u.id !== id);
  if (filtered.length === uploads.length) return false;
  await saveUploads(filtered);
  return true;
}
