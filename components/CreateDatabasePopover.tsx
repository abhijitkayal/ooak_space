// "use client";

import * as Popover from "@radix-ui/react-popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
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
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
          <Plus size={16} />
          <span className="text-sm font-semibold">New Database</span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          className={`border shadow-xl rounded-2xl p-3 w-full ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}
        >
          <ViewPickerCard
            projectId={projectId}
            onDone={() => setOpen(false)}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}