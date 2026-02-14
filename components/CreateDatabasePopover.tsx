"use client";

import * as Popover from "@radix-ui/react-popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import ViewPickerCard from "./ViewpickerCard";

export default function CreateDatabasePopover({
  projectId,
  defaultOpen,
}: {
  projectId: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-gray-50">
          <Plus size={16} />
          <span className="text-sm font-semibold">New Database</span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          className="bg-white border shadow-xl rounded-2xl p-3 w-full "
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
