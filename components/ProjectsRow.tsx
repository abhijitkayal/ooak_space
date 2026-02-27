"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
import { useRouter } from "next/navigation";
import ViewPickerCard from "./ViewpickerCard";

export default function ProjectRow({ project, isDark }: any) {
  const router = useRouter();
  const [showCreateDbModal, setShowCreateDbModal] = useState(false);

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
            setShowCreateDbModal(true);
          }}
          className={`p-1 rounded-md ${
            isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* DATABASES */}
      <div className="pl-8 space-y-1 relative">
        {dbs.length > 0 && (
          <div
            className={`absolute left-[8px] top-0 bottom-0 w-[2px] ${
              isDark ? "bg-gray-600" : "bg-gray-400"
            }`}
          />
        )}
        {dbs.map((db: any, idx: number) => (
          <div key={db._id} className="relative">
            <div
              className={`absolute -ml-6 top-2 w-[24px] h-[12px] border-l-2 border-b-2 rounded-bl-lg ${
                isDark ? "border-gray-600" : "border-gray-400"
              }`}
            />
            <div
              onClick={() => {
                setActiveDatabase(db._id);
                router.push(`/projects/${project._id}?db=${db._id}`);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer ml-[28px] ${
                isDark ? "hover:bg-white/5" : "hover:bg-gray-100"
              }`}
            >
              <span className="text-base -ml-8">{db.icon}</span>
              <span className="truncate">{db.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE DATABASE MODAL */}
      {showCreateDbModal && (
        <ViewPickerCard
          projectId={project._id}
          onDone={() => {
            setShowCreateDbModal(false);
            fetchDatabases(project._id);
          }}
        />
      )}
    </div>
  );
}
