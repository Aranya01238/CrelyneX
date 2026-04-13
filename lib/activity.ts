import { Redis } from "@upstash/redis";

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

const LOGS_KEY = "crelynex:activity-logs";

export type AuditLog = {
  id: string;
  userId: string;
  role: "admin" | "hr" | "member";
  action: string;
  timestamp: string;
};

export async function logActivity(userId: string, role: "admin" | "hr" | "member", action: string) {
  if (!redis) return;

  const log: AuditLog = {
    id: `log-${Date.now()}`,
    userId,
    role,
    action,
    timestamp: new Date().toISOString(),
  };

  try {
    // Keep last 100 logs
    await redis.lpush(LOGS_KEY, JSON.stringify(log));
    await redis.ltrim(LOGS_KEY, 0, 99);
  } catch (err) {
    console.error("Failed to log activity", err);
  }
}

export async function getActivityLogs(): Promise<AuditLog[]> {
  if (!redis) return [];

  try {
    const rawLogs = await redis.lrange(LOGS_KEY, 0, -1);
    return rawLogs.map(l => (typeof l === 'string' ? JSON.parse(l) : l) as AuditLog);
  } catch (err) {
    console.error("Failed to fetch activity logs", err);
    return [];
  }
}
