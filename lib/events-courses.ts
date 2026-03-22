import { promises as fs } from "node:fs";
import path from "node:path";

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

export async function readEventsCoursesData(): Promise<EventsCoursesData> {
  await ensureDataFile();

  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<EventsCoursesData>;

    return {
      events: Array.isArray(parsed.events) ? parsed.events : [],
      courses: Array.isArray(parsed.courses) ? parsed.courses : [],
    };
  } catch {
    return DEFAULT_DATA;
  }
}

export async function writeEventsCoursesData(data: EventsCoursesData) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}