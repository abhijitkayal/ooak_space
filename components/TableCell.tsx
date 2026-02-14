"use client";

import { useEffect, useState } from "react";
import { Column, Row, useTableStore } from "@/app/store/TableStore";

export default function TableCell({
  row,
  col,
}: {
  row: Row;
  col: Column;
}) {
  const value = row.cells?.[col._id];
  const { updateCell } = useTableStore();

  const [local, setLocal] = useState(value ?? "");

  useEffect(() => {
    setLocal(value ?? "");
  }, [value]);

  const save = async () => {
    await updateCell(row._id, col._id, local);
  };

  // checkbox
  if (col.type === "checkbox") {
    return (
      <div className="px-3 py-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => updateCell(row._id, col._id, e.target.checked)}
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
          className="w-full outline-none text-sm"
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
          className="w-full outline-none text-sm"
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
        className="w-full outline-none text-sm bg-transparent"
      />
    </div>
  );
}
