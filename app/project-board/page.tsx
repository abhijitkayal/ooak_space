// 'use client';

// import AppShell from '@/components/AppShell';

// export default function ProjectBoardPage() {
//   return <AppShell defaultView="Card" activeMenu="project-board" />;
// }



"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";

export default function ProjectsBoardPage() {
  const router = useRouter();

  const {
    projects,
    fetchProjects,
    databasesByProject,
    fetchDatabases,
  } = useWorkspaceStore();

  const [activeProjectId, setActiveProjectId] = useState<string>("");

  // load projects
  useEffect(() => {
    fetchProjects();
  }, []);

  // set first project as default
  useEffect(() => {
    if (!activeProjectId && projects.length > 0) {
      setActiveProjectId(projects[0]._id);
    }
  }, [projects]);

  // fetch databases when active project changes
  useEffect(() => {
    if (!activeProjectId) return;
    fetchDatabases(activeProjectId);
  }, [activeProjectId]);

  const activeProject = useMemo(() => {
    return projects.find((p) => p._id === activeProjectId);
  }, [projects, activeProjectId]);

  const tabs = databasesByProject?.[activeProjectId] || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-6 py-10">
        {/* PAGE TITLE */}
        <div className="text-2xl font-bold text-gray-900">
          Projects Board
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Click a project → see its databases/tabs → open it.
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">
          {/* LEFT: PROJECT LIST */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 font-semibold text-sm">
                Projects
              </div>

              <div className="p-2">
                {projects.map((p) => {
                  const active = p._id === activeProjectId;

                  return (
                    <button
                      key={p._id}
                      onClick={() => setActiveProjectId(p._id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${
                        active
                          ? "bg-black text-white"
                          : "hover:bg-gray-50 text-gray-800"
                      }`}
                    >
                     {p.emoji} {p.name}
                    </button>
                  );
                })}

                {projects.length === 0 && (
                  <div className="text-sm text-gray-400 px-3 py-6">
                    No projects found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: DATABASE TABS */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-gray-900">
                    {activeProject?.name || "Select a project"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Databases / Tabs inside this project
                  </div>
                </div>
              </div>

              <div className="p-4 flex gap-4 overflow-x-auto overflow-y-hidden">
                {tabs.map((db: any) => (
                  <button
                    key={db._id}
                    onClick={() =>
                      router.push(`/projects/${activeProjectId}?db=${db._id}`)
                    }
                    className="rounded-2xl border bg-white hover:bg-gray-50 transition p-4 text-left shadow-sm hover:shadow-md flex-shrink-0 min-w-[250px]"
                  >
                    <div className="font-semibold text-gray-900">
                     {db.icon} {db.name}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      View: {db.viewType || "table"}
                    </div>

                    <div className="mt-3 text-xs text-gray-400">
                      Click to open
                    </div>
                  </button>
                ))}

                {tabs.length === 0 && activeProjectId && (
                  <div className="text-sm text-gray-400 py-10 text-center w-full">
                    No databases created inside this project.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* OPTIONAL NOTE */}
        {/* <div className="mt-6 text-xs text-gray-400">
          Navigation path used: <b>/projects/[projectId]?db=[databaseId]</b>
        </div> */}
      </div>
    </div>
  );
}
