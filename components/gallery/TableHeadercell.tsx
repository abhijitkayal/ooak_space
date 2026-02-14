"use client";

import { useEffect, useState } from "react";
import PropertyTypePicker from "./PropertyTypepicker";

export default function TableHeaderCell({
  property,
  refresh,
}: {
  property: any;
  refresh: () => void;
}) {
  const [name, setName] = useState(property.name);

  useEffect(() => {
    setName(property.name);
  }, [property.name]);

  const saveName = async () => {
    if (!name.trim()) {
      setName(property.name);
      return;
    }

    await fetch(`/api/properties/${property._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    refresh();
  };

  const changeType = async (t: string) => {
    await fetch(`/api/properties/${property._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: t }),
    });

    refresh();
  };

  return (
    <div className="w-[220px] shrink-0 border-r px-3 py-2 bg-gray-50">
      <div className="flex items-center justify-between gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={saveName}
          className="font-semibold text-sm w-full bg-transparent outline-none"
        />

        <PropertyTypePicker value={property.type} onChange={changeType} />
      </div>
    </div>
  );
}
