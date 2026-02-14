"use client";

import { useEffect, useState } from "react";
import AddPropertyModal from "./AddPropertyModal";
import TableHeaderCell from "./TableHeadercell";
import TableCell from "./TableCell";

export default function TableView({ databaseId }: { databaseId: string }) {
  const [properties, setProperties] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchProperties = async () => {
    const res = await fetch(`/api/properties?databaseId=${databaseId}`);
    const data = await res.json();
    setProperties(data);
  };

  const fetchRows = async () => {
    const res = await fetch(`/api/items?databaseId=${databaseId}`);
    const data = await res.json();
    setRows(data);
  };

  useEffect(() => {
    fetchProperties();
    fetchRows();
  }, [databaseId]);

  const addRow = async () => {
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ databaseId }),
    });

    fetchRows();
  };

  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="font-semibold">Table</div>

        <div className="flex gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          >
            + Property
          </button>

          <button
            onClick={addRow}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          >
            + Row
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="overflow-auto">
        <div className="min-w-[900px]">
          {/* columns */}
          <div className="flex border-b bg-gray-50">
            <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-gray-500 border-r">
              #
            </div>

            {properties.map((p) => (
              <TableHeaderCell
                key={p._id}
                property={p}
                refresh={fetchProperties}
              />
            ))}
          </div>

          {/* rows */}
          {rows.map((row, index) => (
            <div key={row._id} className="flex border-b">
              <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-gray-500 border-r">
                {index + 1}
              </div>

              {properties.map((p) => (
                <TableCell
                  key={p._id}
                  row={row}
                  property={p}
                  refreshRows={fetchRows}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* footer add row */}
      <button
        onClick={addRow}
        className="w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50"
      >
        + New
      </button>

      {/* modal */}
      <AddPropertyModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        databaseId={databaseId}
        onSaved={fetchProperties}
      />
    </div>
  );
}
