"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CalendarItem {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
}

export default function CalendarPage() {
  const search = useSearchParams();
  const databaseId = search.get("databaseId");

  const [items, setItems] = useState<CalendarItem[]>([]);

  useEffect(() => {
    if (!databaseId) return;

    fetch(`/api/database-items?databaseId=${databaseId}`)
      .then((r) => r.json())
      .then(setItems);
  }, [databaseId]);

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-2xl font-bold">Calendar View</h1>
      <p className="text-sm text-gray-500 mt-2">
        (Simple list now — later you can render a real calendar grid)
      </p>

      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <div key={it._id} className="border rounded-xl p-4">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm text-gray-500">
              {new Date(it.startDate).toDateString()} →{" "}
              {new Date(it.endDate).toDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
