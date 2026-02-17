// "use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Column, Row, useTableStore } from "@/app/store/TableStore";

export default function TableCell({ row, col }: { row: Row; col: Column }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const value = row.cells?.[col._id];
  const { updateCell } = useTableStore();

  const [local, setLocal] = useState(value ?? "");

  useEffect(() => {
    setLocal(value ?? "");
  }, [value]);

  const save = async () => {
    await updateCell(row._id, col._id, local);
  };

  const inputClass = `w-full outline-none text-sm bg-transparent ${isDark ? "text-gray-200 placeholder-gray-600" : "text-gray-900 placeholder-gray-400"}`;

  // checkbox
  if (col.type === "checkbox") {
    return (
      <div className="px-3 py-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => updateCell(row._id, col._id, e.target.checked)}
          className={isDark ? "accent-blue-500" : "accent-blue-600"}
        />
      </div>
    );
  }

  // date
  if (col.type === "date") {
    return (
      <div className="px-3 py-2">
        <input
          type="date"
          value={local ? String(local).slice(0, 10) : ""}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          className={`${inputClass} ${isDark ? "color-scheme-dark" : ""}`}
        />
      </div>
    );
  }

  // number
  if (col.type === "number") {
    return (
      <div className="px-3 py-2">
        <input
          type="number"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          className={inputClass}
        />
      </div>
    );
  }

  // default text
  return (
    <div className="px-3 py-2">
      <input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={save}
        className={inputClass}
      />
    </div>
  );
}