import { promises as fs } from "node:fs";
import path from "node:path";

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

async function ensureFile() {
  await fs.mkdir(path.dirname(GRAPHICS_FILE), { recursive: true });
  try {
    await fs.access(GRAPHICS_FILE);
  } catch {
    await fs.writeFile(GRAPHICS_FILE, "[]", "utf8");
  }
}

export async function getUploads(): Promise<GraphicsUpload[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(GRAPHICS_FILE, "utf8");
    return JSON.parse(raw) as GraphicsUpload[];
  } catch {
    return [];
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
  await fs.writeFile(GRAPHICS_FILE, JSON.stringify(uploads, null, 2), "utf8");
  return newUpload;
}

export async function deleteUpload(id: string): Promise<boolean> {
  const uploads = await getUploads();
  const filtered = uploads.filter((u) => u.id !== id);
  if (filtered.length === uploads.length) return false;
  await fs.writeFile(GRAPHICS_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}
