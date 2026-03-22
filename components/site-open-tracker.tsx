"use client";

import { useEffect } from "react";

const STORAGE_KEY = "crelynex-site-open-times";
const SESSION_COUNTED_KEY = "crelynex-site-open-counted";
const DUPLICATE_WINDOW_MS = 5000;
const MAX_ENTRIES = 50;

export default function SiteOpenTracker() {
  useEffect(() => {
    const pathname = window.location.pathname;

    // Admin area should not be counted as website visits.
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      return;
    }

    // Count at most once per browser tab session.
    if (sessionStorage.getItem(SESSION_COUNTED_KEY) === "1") {
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      const history = Array.isArray(parsed)
        ? parsed.filter((value): value is number => typeof value === "number")
        : [];

      const now = Date.now();
      const lastOpenedAt = history[history.length - 1];

      // React Strict Mode can run effects twice in development.
      if (
        typeof lastOpenedAt === "number" &&
        now - lastOpenedAt < DUPLICATE_WINDOW_MS
      ) {
        return;
      }

      const nextHistory = [...history, now].slice(-MAX_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
      sessionStorage.setItem(SESSION_COUNTED_KEY, "1");
    } catch {
      // Ignore storage errors so page rendering is never blocked.
    }
  }, []);

  return null;
}
