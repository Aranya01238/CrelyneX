"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const STORAGE_KEY = "crelynex-site-open-times";

const chartConfig = {
  visits: {
    label: "Visits",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const RANGE_OPTIONS = [7, 14, 30] as const;
type RangeDays = (typeof RANGE_OPTIONS)[number];

export default function SiteOpenTimesList() {
  const [openTimes, setOpenTimes] = useState<number[]>([]);
  const [rangeDays, setRangeDays] = useState<RangeDays>(14);

  const filteredTimes = useMemo(() => {
    const cutoff = Date.now() - rangeDays * 24 * 60 * 60 * 1000;
    return openTimes.filter((timestamp) => timestamp >= cutoff);
  }, [openTimes, rangeDays]);

  const visitsByDay = useMemo(() => {
    const dayCount = new Map<string, number>();

    for (const timestamp of filteredTimes) {
      const date = new Date(timestamp);
      const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      dayCount.set(dayKey, (dayCount.get(dayKey) || 0) + 1);
    }

    return Array.from(dayCount.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, visits]) => ({
        day: day.slice(5),
        visits,
      }));
  }, [filteredTimes]);

  const visitsByHour = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      visits: 0,
      label: `${String(hour).padStart(2, "0")}:00`,
    }));

    for (const timestamp of filteredTimes) {
      const hour = new Date(timestamp).getHours();
      hours[hour].visits += 1;
    }

    return hours;
  }, [filteredTimes]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      const history = Array.isArray(parsed)
        ? parsed.filter((value): value is number => typeof value === "number")
        : [];

      setOpenTimes([...history].reverse());
    } catch {
      setOpenTimes([]);
    }
  }, []);

  return (
    <section className="mt-12 rounded-xl border border-border/70 bg-background/70 p-5 backdrop-blur-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-foreground">
          Website Visits
        </h2>
        <div className="flex items-center gap-2">
          {RANGE_OPTIONS.map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => setRangeDays(days)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                rangeDays === days
                  ? "bg-red-600/80 text-white"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
              }`}
            >
              {days}D
            </button>
          ))}
          <p className="rounded-md bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
            Total Visits:{" "}
            <span className="font-semibold text-foreground">
              {openTimes.length}
            </span>
          </p>
        </div>
      </div>
      {openTimes.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          No visit data yet. Refresh or reopen the site to start tracking.
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm text-muted-foreground">
            Showing analytics for last {rangeDays} days ({filteredTimes.length}{" "}
            visits).
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
              <p className="mb-2 text-sm font-medium text-foreground">
                Visits by Day
              </p>
              <ChartContainer className="h-56 w-full" config={chartConfig}>
                <LineChart
                  data={visitsByDay}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="var(--color-visits)"
                    strokeWidth={2.5}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
              <p className="mb-2 text-sm font-medium text-foreground">
                Visits by Hour
              </p>
              <ChartContainer className="h-56 w-full" config={chartConfig}>
                <BarChart
                  data={visitsByHour}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    interval={3}
                    minTickGap={12}
                  />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="visits"
                    fill="var(--color-visits)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground sm:text-base">
            {openTimes.map((time, index) => (
              <li
                key={`${time}-${index}`}
                className="rounded-md bg-muted/40 px-3 py-2"
              >
                {new Date(time).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
