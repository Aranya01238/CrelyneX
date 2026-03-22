import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  location: string;
  description: string;
  category: string;
  price: string;
  registrationLink: string;
};

export type CourseItem = {
  id: string;
  title: string;
  price: string;
  duration: string;
  level: string;
  students: number;
  description: string;
  modules: string[];
  featured: boolean;
  dates: string[];
  time: string;
  certificate: boolean;
  registrationLink: string;
};

export type EventsCoursesData = {
  events: EventItem[];
  courses: CourseItem[];
};

const DATA_FILE_PATH = path.join(process.cwd(), "data", "events-courses.json");
const REDIS_KEY = "crelynex:events-courses";
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzvEb82D_IEmRKf7INY_w7h-LouAcmmQrZGob__zFMeJjaRRvUe_5pgPbzSan5sukQsWw/exec";
const APPS_SCRIPT_SECRET = "";

const hasRedisConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const hasAppsScriptConfig = true;

const DEFAULT_DATA: EventsCoursesData = {
  events: [
    {
      id: "ml-bootcamp-event-2026",
      title: "Machine Learning Online Bootcamp",
      date: "March 21 - April 5, 2026",
      time: "8:00 PM - 9:00 PM IST",
      attendees: 500,
      location: "Online",
      description:
        "Intensive 4-day bootcamp in association with AI ZENERA. Master ML fundamentals, algorithms, Google Colab, and deep learning with live demos and giveaways.",
      category: "Bootcamp",
      price: "₹249",
      registrationLink: "https://forms.gle/cjqqRug8VNBuenhH8",
    },
  ],
  courses: [
    {
      id: "ml-bootcamp-course-2026",
      title: "Machine Learning Online Bootcamp",
      price: "₹249",
      duration: "4 Days",
      level: "Beginner to Intermediate",
      students: 500,
      description:
        "Master Machine Learning fundamentals with AI ZENERA. Learn ML algorithms, Google Colab, and deep learning in this intensive bootcamp.",
      modules: [
        "How ML Works",
        "Basic Terms & Conditions",
        "Types of ML",
        "Google Colab",
        "Deep Learning",
        "Optimization Techniques",
        "Live Demos & Giveaway",
      ],
      featured: true,
      dates: [
        "March 21, 2026",
        "March 28, 2026",
        "April 4, 2026",
        "April 5, 2026",
      ],
      time: "8:00 PM - 9:00 PM",
      certificate: true,
      registrationLink: "https://forms.gle/cjqqRug8VNBuenhH8",
    },
  ],
};

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(DEFAULT_DATA, null, 2), "utf8");
  }
}

function normalizeData(data: Partial<EventsCoursesData> | null | undefined): EventsCoursesData {
  return {
    events: Array.isArray(data?.events) ? data.events : [],
    courses: Array.isArray(data?.courses) ? data.courses : [],
  };
}

type AppsScriptResponse = {
  ok: boolean;
  data?: Partial<EventsCoursesData>;
  error?: string;
};

async function callAppsScript(
  action: "getData" | "setData",
  data?: EventsCoursesData,
): Promise<AppsScriptResponse> {
  if (!hasAppsScriptConfig) {
    throw new Error("Google Apps Script is not configured.");
  }

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      secret: APPS_SCRIPT_SECRET,
      data,
    }),
    cache: "no-store",
  });

  const raw = await response.text();

  let body: AppsScriptResponse;

  try {
    body = JSON.parse(raw) as AppsScriptResponse;
  } catch {
    const preview = raw.trim().slice(0, 120);
    const accessHint =
      response.status === 401 || response.status === 403
        ? " Apps Script access is denied. Deploy Web App with access set to Anyone and use the /exec URL."
        : "";

    body = {
      ok: false,
      error: preview
        ? `Apps Script did not return valid JSON.${accessHint} Response starts with: ${preview}`
        : `Apps Script did not return valid JSON.${accessHint}`,
    };
  }

  if (!response.ok || !body.ok) {
    throw new Error(body.error || `Apps Script request failed (${response.status}).`);
  }

  return body;
}

async function readFromRedis(): Promise<EventsCoursesData> {
  if (!redis) {
    throw new Error("Redis storage is not configured.");
  }

  const data = await redis.get<EventsCoursesData>(REDIS_KEY);

  if (!data) {
    await redis.set(REDIS_KEY, DEFAULT_DATA);
    return DEFAULT_DATA;
  }

  return normalizeData(data);
}

async function writeToRedis(data: EventsCoursesData) {
  if (!redis) {
    throw new Error("Redis storage is not configured.");
  }

  await redis.set(REDIS_KEY, data);
}

export async function readEventsCoursesData(): Promise<EventsCoursesData> {
  if (hasAppsScriptConfig) {
    try {
      const response = await callAppsScript("getData");
      return normalizeData(response.data);
    } catch {
      // If Apps Script is unreachable, keep site readable by falling back.
    }
  }

  if (redis) {
    try {
      return await readFromRedis();
    } catch {
      // Fall back to file storage for local/dev resilience.
    }
  }

  await ensureDataFile();

  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<EventsCoursesData>;

    return normalizeData(parsed);
  } catch {
    return DEFAULT_DATA;
  }
}

export async function writeEventsCoursesData(data: EventsCoursesData) {
  if (hasAppsScriptConfig) {
    await callAppsScript("setData", data);
    return;
  }

  if (redis) {
    await writeToRedis(data);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Production storage is not configured. Configure Google Apps Script or Upstash Redis.",
    );
  }

  await ensureDataFile();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}