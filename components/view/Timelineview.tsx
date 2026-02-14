"use client";

import { useEffect, useMemo, useState } from "react";

type TimelineItem = {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatMonthYear(d: Date) {
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export default function TimelineView({ databaseId }: { databaseId: string }) {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 fixed route name: database-items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/database_items?databaseId=${databaseId}`
        );
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.log("Timeline fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [databaseId]);

  // ---- Determine timeline month (like Notion screenshot)
  const monthDate = useMemo(() => {
    if (items.length === 0) return new Date();
    return new Date(items[0].startDate);
  }, [items]);

  const monthStart = useMemo(() => startOfMonth(monthDate), [monthDate]);
  const monthEnd = useMemo(() => endOfMonth(monthDate), [monthDate]);

  // ---- Visible days range
  // Notion shows partial previous days too, so we show -3 days before monthStart
  const rangeStart = useMemo(() => addDays(monthStart, -3), [monthStart]);
  const rangeEnd = useMemo(() => addDays(monthEnd, 2), [monthEnd]);

  const totalDays = Math.max(1, daysBetween(rangeStart, rangeEnd) + 1);

  // Today position
  const today = new Date();
  const todayOffset = daysBetween(rangeStart, today);
  const todayPercent = (todayOffset / totalDays) * 100;

  // Layout
  const ROW_HEIGHT = 56;
  const DAY_COL_WIDTH = 70; // Notion-ish
  const GRID_WIDTH = totalDays * DAY_COL_WIDTH;

  if (loading) {
    return <div className="p-6 text-sm text-gray-600">Loading timeline...</div>;
  }

  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
      {/* ======= HEADER (like Notion) ======= */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-800">»</button>
          <div className="font-semibold">{formatMonthYear(monthStart)}</div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 font-semibold">
            Manage in Calendar
          </button>

          <div className="flex items-center gap-1 text-gray-500">
            <span>Month</span>
            <span>▾</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <button className="hover:text-gray-800">‹</button>
            <button className="hover:text-gray-800">Today</button>
            <button className="hover:text-gray-800">›</button>
          </div>
        </div>
      </div>

      {/* ======= GRID ======= */}
      <div className="relative overflow-x-auto">
        <div style={{ minWidth: GRID_WIDTH + 260 }}>
          {/* Top Day Row */}
          <div className="flex border-b">
            {/* left empty column like Notion */}
            <div className="w-[260px] shrink-0 bg-white" />

            <div
              className="relative"
              style={{ width: GRID_WIDTH, height: 44 }}
            >
              {/* alternating day columns background */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: totalDays }).map((_, i) => (
                  <div
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    style={{ width: DAY_COL_WIDTH }}
                  />
                ))}
              </div>

              {/* day numbers */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: totalDays }).map((_, i) => {
                  const d = addDays(rangeStart, i);
                  const dayNum = d.getDate();

                  const isToday =
                    d.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={i}
                      className="flex items-center justify-center text-sm text-gray-500"
                      style={{ width: DAY_COL_WIDTH }}
                    >
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full ${
                          isToday
                            ? "bg-red-500 text-white font-bold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {dayNum}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* today red dot */}
              {todayOffset >= 0 && todayOffset <= totalDays && (
                <div
                  className="absolute top-[38px] w-3 h-3 rounded-full bg-red-500"
                  style={{
                    left: `calc(${todayPercent}% - 6px)`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Body rows */}
          <div className="relative flex">
            {/* left side column */}
            <div className="w-[260px] shrink-0 border-r bg-white">
              {/* empty spacing for items */}
              <div style={{ height: items.length * ROW_HEIGHT }} />

              {/* + New */}
              <button className="flex items-center gap-2 px-4 py-4 text-gray-500 hover:text-gray-800">
                <span className="text-xl">+</span>
                <span className="text-base">New</span>
              </button>
            </div>

            {/* timeline canvas */}
            <div
              className="relative"
              style={{
                width: GRID_WIDTH,
                height: items.length * ROW_HEIGHT + 64,
              }}
            >
              {/* background columns */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: totalDays }).map((_, i) => (
                  <div
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    style={{ width: DAY_COL_WIDTH }}
                  />
                ))}
              </div>

              {/* today red vertical line */}
              {todayOffset >= 0 && todayOffset <= totalDays && (
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-red-500/70"
                  style={{
                    left: `calc(${todayPercent}% - 1px)`,
                  }}
                />
              )}

              {/* items */}
              <div className="relative">
                {items.map((it, rowIndex) => {
                  const s = new Date(it.startDate);
                  const e = new Date(it.endDate);

                  const startOffset = daysBetween(rangeStart, s);
                  const duration = Math.max(1, daysBetween(s, e) + 1);

                  const leftPx = startOffset * DAY_COL_WIDTH;
                  const widthPx = Math.max(duration * DAY_COL_WIDTH, 180);

                  return (
                    <div
                      key={it._id}
                      className="relative"
                      style={{
                        height: ROW_HEIGHT,
                      }}
                    >
                      <div
                        className="absolute top-[10px] h-[44px] rounded-xl border bg-white shadow-sm flex items-center px-4 font-semibold text-gray-800"
                        style={{
                          left: leftPx,
                          width: widthPx,
                        }}
                      >
                        {it.title}

                        {/* small handle circle (like Notion) */}
                        <div className="ml-auto flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-300" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* bottom scrollbar fake bar look */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[120px] h-2 rounded-full bg-gray-300/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
