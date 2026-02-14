"use client";

import { useEffect, useState } from "react";

export default function TableCell({
  row,
  property,
  refreshRows,
}: {
  row: any;
  property: any;
  refreshRows: () => void;
}) {
  const propertyId = property._id;

  const initialValue =
    row.properties?.[propertyId]?.value !== undefined
      ? row.properties[propertyId].value
      : "";

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const save = async (newValue: any) => {
    const newProps = {
      ...(row.properties || {}),
      [propertyId]: {
        type: property.type,
        value: newValue,
      },
    };

    await fetch(`/api/items/${row._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ properties: newProps }),
    });

    refreshRows();
  };

  // checkbox special
  if (property.type === "checkbox") {
    return (
      <div className="w-[220px] px-3 py-2 border-r">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => {
            setValue(e.target.checked);
            save(e.target.checked);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-[220px] px-3 py-2 border-r">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => save(value)}
        className="w-full bg-transparent outline-none text-sm"
      />
    </div>
  );
}
