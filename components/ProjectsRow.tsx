"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
import { useRouter } from "next/navigation";
import ViewPickerCard from "./ViewpickerCard";


export default function ProjectRow({ project, isDark, pathname }: any) {
  const router = useRouter();
  const [showCreateDbModal, setShowCreateDbModal] = useState(false);

  // Check if this project is active
  const isProjectActive = pathname?.startsWith(`/projects/${project._id}`);

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
        className="relative cursor-pointer group"
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 rounded-xl ${
            isProjectActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
          }`}
        />
        
        <div className={`relative flex items-center justify-between px-3 py-2 rounded-xl transition ${
          isProjectActive ? "text-white" : isDark ? "text-gray-300" : "text-gray-700"
        }`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg">{project.emoji}</span>
          <span className="text-sm font-semibold truncate">{project.name}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCreateDbModal(true);
          }}
          className={`p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
            isDark ? "hover:bg-white/10" : "hover:bg-white/20"
          }`}
        >
          <Plus size={16} />
        </button>
        </div>
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
        {dbs.map((db: any, idx: number) => {
          // Check if this database is active
          const isDatabaseActive = pathname?.includes(`db=${db._id}`);
          
          return (
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer ml-[28px] transition ${
                isDatabaseActive 
                  ? "bg-gradient-to-r from-teal-600/20 to-rose-600/20 font-semibold" 
                  : isDark ? "hover:bg-white/5" : "hover:bg-gray-100"
              }`}
            >
              <span className="text-base -ml-8">{db.icon}</span>
              <span className="truncate">{db.name}</span>
            </div>
          </div>
          );
        })}
      </div>

      {/* CREATE DATABASE MODAL */}
      {showCreateDbModal && (
        <ViewPickerCard
          projectId={project._id}
          isDark={isDark}
          onDone={() => {
            setShowCreateDbModal(false);
            fetchDatabases(project._id);
          }}
        />
      )}
    </div>
  );
}
