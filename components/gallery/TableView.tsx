"use client";

import { useEffect, useState } from "react";

import AddPropertyModal from "./AddPropertyModal";
import TableHeaderCell from "./TableHeadercell";
import TableCell from "./TableCell";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Plus } from "lucide-react";

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
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ databaseId }),
    });

    const created = await res.json();
    setRows((prev) => [...prev, created]);
  };

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Table</CardTitle>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpenModal(true)}
          >
            + Property
          </Button>

          <Button size="sm" variant="outline" onClick={addRow}>
            <Plus className="mr-2 h-4 w-4" />
            Row
          </Button>
        </div>
      </CardHeader>

      <Separator />

      {/* Table Grid */}
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <div className="min-w-[900px]">
            {/* Columns */}
            <div className="flex border-b bg-muted/40">
              <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-muted-foreground border-r">
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

            {/* Rows */}
            {rows.map((row, index) => (
              <div key={row._id} className="flex border-b">
                <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-muted-foreground border-r">
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
        </ScrollArea>

        <Separator />

        {/* Footer Add Row */}
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none px-4 py-6 text-muted-foreground"
          onClick={addRow}
        >
          + New
        </Button>
      </CardContent>

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        databaseId={databaseId}
        onSaved={fetchProperties}
      />
    </Card>
  );
}
