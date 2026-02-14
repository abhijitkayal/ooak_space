"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
import ProjectHeader from "@/components/ProjectHeader";
import DatabaseTabs from "@/components/DatabaseTabs";
import CreateDatabasePopover from "@/components/CreateDatabasePopover";

export default function ProjectPage() {
  const params = useParams();
  const search = useSearchParams();

  const projectId = params.projectId as string;
  const createDb = search.get("createDb") === "1";

  const { projects, fetchProjects, databasesByProject, fetchDatabases } =
    useWorkspaceStore();

  const project = useMemo(
    () => projects.find((p) => p._id === projectId),
    [projects, projectId]
  );

  useEffect(() => {
    fetchProjects();
    fetchDatabases(projectId);
  }, [projectId]);

  if (!project) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 py-10">
        <ProjectHeader project={project} />

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500">Databases</h2>
          <CreateDatabasePopover projectId={projectId} defaultOpen={createDb} />
        </div>

        <div className="mt-6">
          <DatabaseTabs projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
