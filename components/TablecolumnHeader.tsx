"use client";

import { useEffect, useState } from "react";
import ColumnTypePicker from "@/components/ColumnTypepicker";
import { Column, ColumnType } from "@/app/store/TableStore";

export default function TableColumnHeader({
  col,
  databaseId,
  refreshColumns,
  isViewOnly = false,
}: {
  col: Column;
  databaseId: string;
  refreshColumns: () => void;
  isViewOnly?: boolean;
}) {
  const [name, setName] = useState(col.name);

  useEffect(() => {
    setName(col.name);
  }, [col.name]);

  const saveName = async () => {
    const res = await fetch(`/api/columns/${col._id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name }),
});

console.log("PATCH status:", res.status);

const data = await res.json();
console.log("PATCH response:", data);

if (!res.ok) {
  alert("PATCH failed");
  return;
}

  };

  const changeType = async (t: ColumnType) => {
    const res = await fetch(`/api/columns/${col._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: t }),
    });

    if (!res.ok) {
      alert("Failed to update column type");
      return;
    }

    refreshColumns();
  };

 
  return (
    <div className="flex-1 min-w-[220px] border-r px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        {/* ✅ Editable column name */}
        <input
          value={name}
          onChange={(e) => !isViewOnly && setName(e.target.value)}
          onBlur={saveName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
          disabled={isViewOnly}
          className={`font-semibold text-sm w-full bg-transparent outline-none ${isViewOnly ? "cursor-default" : ""}`}
        />

        {/* ✅ Select column type */}
        {!isViewOnly && <ColumnTypePicker value={col.type} onChange={changeType} />}
      </div>
    </div>
  );
}
