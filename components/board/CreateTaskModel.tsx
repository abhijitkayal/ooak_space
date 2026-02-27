"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import AddPropertyModal from "../gallery/AddPropertyModal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Property = {
  _id: string;
  name: string;
  type: string;
  options?: string[];
};

const BOARD_COLUMNS = ["In Progress", "Done", "Not Complete"] as const;

export default function CreateTaskModal({
  isOpen,
  onClose,
  databaseId,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  databaseId: string;
  onSaved: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [properties, setProperties] = useState<Property[]>([]);
  const [extraProps, setExtraProps] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // values for new task
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] =
    useState<(typeof BOARD_COLUMNS)[number]>("In Progress");
  const [extraValues, setExtraValues] = useState<Record<string, any>>({});

  const [showAddProperty, setShowAddProperty] = useState(false);

  const fetchProps = async () => {
    setLoading(true);
    const res = await fetch(`/api/properties?databaseId=${databaseId}`);
    setProperties(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchProps();
  }, [isOpen]);

  // Ensure default properties exist
  useEffect(() => {
    const ensureDefaultProps = async () => {
      if (!isOpen) return;

      const res = await fetch(`/api/properties?databaseId=${databaseId}`);
      const props = await res.json();

      const title = props[0];

      const statusProp = props.find(
        (p: any) => p.name.trim().toLowerCase() === "status"
      );

      // create title property if missing
      if (!title) {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            databaseId,
            name: "Task Name",
            type: "text",
            options: [],
          }),
        });
      }

      // create status property if missing
      if (!statusProp) {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            databaseId,
            name: "Status",
            type: "select",
            options: [...BOARD_COLUMNS],
          }),
        });
      }

      fetchProps();
    };

    ensureDefaultProps();
  }, [isOpen, databaseId]);

  const titleProp = useMemo(() => properties[0], [properties]);

  const createTask = async () => {
    if (!titleProp) return;

    const values: any = {
      [titleProp._id]: taskName || "Untitled task",
      Status: status,
    };

    for (const p of extraProps) {
      values[p._id] = extraValues[p._id] ?? "";
    }

    const res = await fetch("/api/board_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        databaseId,
        values,
      }),
    });

    if (!res.ok) {
      alert("Task create failed. Check console.");
      return;
    }

    onSaved();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
          </DialogHeader>

          <Separator />

          {loading ? (
            <div className="py-6 text-sm text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-5">
              {/* Task Name */}
              <div className="space-y-2">
                <Label>Task name</Label>
                <Input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Untitled task"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={status}
                  onValueChange={(val) =>
                    setStatus(val as (typeof BOARD_COLUMNS)[number])
                  }
                >
                  <SelectTrigger className={isDark ? "bg-[#18191d]" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className={isDark ? "bg-[#1e1f23] border-gray-700" : ""}>
                    {BOARD_COLUMNS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Extra properties (only this session) */}
              {extraProps.map((p) => (
                <div key={p._id} className="space-y-2">
                  <Label>{p.name}</Label>

                  {p.type === "date" ? (
                    <Input
                      type="date"
                      value={extraValues[p._id] || ""}
                      onChange={(e) =>
                        setExtraValues((prev) => ({
                          ...prev,
                          [p._id]: e.target.value,
                        }))
                      }
                    />
                  ) : p.type === "select" ? (
                    <Select
                      value={extraValues[p._id] || ""}
                      onValueChange={(val) =>
                        setExtraValues((prev) => ({
                          ...prev,
                          [p._id]: val,
                        }))
                      }
                    >
                      <SelectTrigger className={isDark ? "bg-[#18191d]" : ""}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>

                      <SelectContent className={isDark ? "bg-[#1e1f23] border-gray-700" : ""}>
                        {(p.options || []).map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={extraValues[p._id] || ""}
                      onChange={(e) =>
                        setExtraValues((prev) => ({
                          ...prev,
                          [p._id]: e.target.value,
                        }))
                      }
                      placeholder="Enter value"
                    />
                  )}
                </div>
              ))}

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddProperty(true)}
                >
                  + Add property
                </Button>

                <Button onClick={createTask}>Create task</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Property Modal */}
      {showAddProperty && (
        <AddPropertyModal
          isOpen={showAddProperty}
          onClose={() => setShowAddProperty(false)}
          databaseId={databaseId}
          onSaved={fetchProps}
        />
      )}
    </>
  );
}