"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
import { useRouter } from "next/navigation";

export default function ProjectRow({ project, isDark }: any) {
  const router = useRouter();

  const {
    databasesByProject,
    fetchDatabases,
    setActiveProject,
    setActiveDatabase,
  } = useWorkspaceStore();

  const dbs = databasesByProject[project._id] || [];

  useEffect(() => {
    fetchDatabases(project._id);
  }, []);

  return (
    <div className="space-y-1">
      {/* PROJECT */}
      <div
        onClick={() => {
          setActiveProject(project._id);
          router.push(`/projects/${project._id}`);
        }}
        className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition ${
          isDark ? "hover:bg-white/5" : "hover:bg-white"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg">{project.emoji}</span>
          <span className="text-sm font-semibold truncate">{project.name}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects/${project._id}?createDb=1`);
          }}
          className={`p-1 rounded-md ${
            isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* DATABASES */}
      <div className="pl-8 space-y-1">
        {dbs.map((db: any) => (
          <div
            key={db._id}
            onClick={() => {
              setActiveDatabase(db._id);
              router.push(`/projects/${project._id}?db=${db._id}`);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer ${
              isDark ? "hover:bg-white/5" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-base">{db.icon}</span>
            <span className="truncate">{db.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
