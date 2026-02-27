"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
  _id: string;
  name: string;
  emoji?: string;
}

export function LinkProject({ taskId }: { taskId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Fetch all projects
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        console.log('Fetched projects:', data);
      });
  }, []);

  // Fetch already linked projects
  useEffect(() => {
    fetch(`/api/task/${taskId}`)
      .then((res) => res.json())
      .then((data) => setSelected(data.linkedProjectIds || []));
  }, [taskId]);

  const toggleProject = async (id: string) => {
    let updated;

    if (selected.includes(id)) {
      updated = selected.filter((i) => i !== id);
    } else {
      updated = [...selected, id];
    }

    setSelected(updated);

    // Save to backend
    await fetch("/api/link-project", {
      method: "POST",
      body: JSON.stringify({
        taskId,
        projectIds: updated,
      }),
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Button */}
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex gap-2 items-center">
            <Link2 className="w-4 h-4" />
            Link Project
          </div>
        </Button>
      </PopoverTrigger>

      {/* Dropdown */}
      <PopoverContent className="w-[320px] p-0">
        <Command>
          <CommandInput placeholder="Search project..." />

          <CommandEmpty>No project found</CommandEmpty>

          <CommandGroup>
           {projects.map((p) => (
<CommandItem
  key={p._id}
  onSelect={() => toggleProject(p._id)}
>
  <div className="flex items-center gap-2 w-full">
    
    {/* Navigate */}
    <Link
      href={`/projects/${p._id}`}
      className="flex gap-2 items-center hover:underline"
      onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
    >
      <span>{p.emoji || "📄"}</span>
      {p.name}
    </Link>

    {/* Check icon */}
    <Check
      className={cn(
        "ml-auto h-4 w-4",
        selected.includes(p._id)
          ? "opacity-100"
          : "opacity-0"
      )}
    />
  </div>
</CommandItem>
))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}