"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import ViewPickerCard from "./ViewpickerCard";

export default function CreateDatabasePopover({
  projectId,
  defaultOpen,
}: {
  projectId: string;
  defaultOpen?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <>
      <Button 
        variant="outline" 
        className={`gap-2 ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
        onClick={() => setOpen(true)}
      >
        <Plus size={16} />
        <span className="text-sm font-semibold">New</span>
      </Button>

      {open && (
        <ViewPickerCard
          projectId={projectId}
          onDone={() => setOpen(false)}
        />
      )}
    </>
  );
}