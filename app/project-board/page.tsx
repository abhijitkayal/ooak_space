// // 'use client';

// // import AppShell from '@/components/AppShell';

// // export default function ProjectBoardPage() {
// //   return <AppShell defaultView="Card" activeMenu="project-board" />;
// // }



// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useWorkspaceStore } from "@/app/store/WorkspaceStore";

// export default function ProjectsBoardPage() {
//   const router = useRouter();

//   const {
//     projects,
//     fetchProjects,
//     databasesByProject,
//     fetchDatabases,
//   } = useWorkspaceStore();

//   const [activeProjectId, setActiveProjectId] = useState<string>("");

//   // load projects
//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // set first project as default
//   useEffect(() => {
//     if (!activeProjectId && projects.length > 0) {
//       setActiveProjectId(projects[0]._id);
//     }
//   }, [projects]);

//   // fetch databases when active project changes
//   useEffect(() => {
//     if (!activeProjectId) return;
//     fetchDatabases(activeProjectId);
//   }, [activeProjectId]);

//   const activeProject = useMemo(() => {
//     return projects.find((p) => p._id === activeProjectId);
//   }, [projects, activeProjectId]);

//   const tabs = databasesByProject?.[activeProjectId] || [];

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="w-full px-6 py-10">
//         {/* PAGE TITLE */}
//         <div className="text-2xl font-bold text-gray-900">
//           Projects Board
//         </div>
//         <div className="text-sm text-gray-500 mt-1">
//           Click a project → see its databases/tabs → open it.
//         </div>

//         <div className="mt-8 grid grid-cols-12 gap-6">
//           {/* LEFT: PROJECT LIST */}
//           <div className="col-span-12 md:col-span-4 lg:col-span-3">
//             <div className="rounded-2xl border bg-white overflow-hidden">
//               <div className="px-4 py-3 border-b bg-gray-50 font-semibold text-sm">
//                 Projects
//               </div>

//               <div className="p-2">
//                 {projects.map((p) => {
//                   const active = p._id === activeProjectId;

//                   return (
//                     <button
//                       key={p._id}
//                       onClick={() => setActiveProjectId(p._id)}
//                       className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${
//                         active
//                           ? "bg-black text-white"
//                           : "hover:bg-gray-50 text-gray-800"
//                       }`}
//                     >
//                      {p.emoji} {p.name}
//                     </button>
//                   );
//                 })}

//                 {projects.length === 0 && (
//                   <div className="text-sm text-gray-400 px-3 py-6">
//                     No projects found.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: DATABASE TABS */}
//           <div className="col-span-12 md:col-span-8 lg:col-span-9">
//             <div className="rounded-2xl border bg-white overflow-hidden">
//               <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
//                 <div>
//                   <div className="font-semibold text-sm text-gray-900">
//                     {activeProject?.name || "Select a project"}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Databases / Tabs inside this project
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 flex gap-4 overflow-x-auto overflow-y-hidden">
//                 {tabs.map((db: any) => (
//                   <button
//                     key={db._id}
//                     onClick={() =>
//                       router.push(`/projects/${activeProjectId}?db=${db._id}`)
//                     }
//                     className="rounded-2xl border bg-white hover:bg-gray-50 transition p-4 text-left shadow-sm hover:shadow-md flex-shrink-0 min-w-[250px]"
//                   >
//                     <div className="font-semibold text-gray-900">
//                      {db.icon} {db.name}
//                     </div>

//                     <div className="text-xs text-gray-500 mt-1">
//                       View: {db.viewType || "table"}
//                     </div>

//                     <div className="mt-3 text-xs text-gray-400">
//                       Click to open
//                     </div>
//                   </button>
//                 ))}

//                 {tabs.length === 0 && activeProjectId && (
//                   <div className="text-sm text-gray-400 py-10 text-center w-full">
//                     No databases created inside this project.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* OPTIONAL NOTE */}
//         {/* <div className="mt-6 text-xs text-gray-400">
//           Navigation path used: <b>/projects/[projectId]?db=[databaseId]</b>
//         </div> */}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";

export default function ProjectsBoardPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set first project as default
  useEffect(() => {
    if (!activeProjectId && projects.length > 0) {
      setActiveProjectId(projects[0]._id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length]);

  // fetch databases when active project changes
  useEffect(() => {
    if (!activeProjectId) return;
    fetchDatabases(activeProjectId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProjectId]);

  const activeProject = useMemo(() => {
    return projects.find((p) => p._id === activeProjectId);
  }, [projects, activeProjectId]);

  const tabs = databasesByProject?.[activeProjectId] || [];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-10">
        {/* PAGE TITLE */}
        <div className={`text-xl sm:text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Projects Board
        </div>
        <div className={`text-xs sm:text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Click a project → see its databases/tabs → open it.
        </div>

        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* LEFT: PROJECT LIST */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className={`rounded-xl sm:rounded-2xl border overflow-hidden shadow-sm ${isDark ? "bg-[#1F2125] border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`px-3 sm:px-4 py-1 sm:py-3  font-semibold text-xs sm:text-sm ${isDark ? "bg-[#1e1f23] border-gray-800 text-gray-100" : "bg-rose-50 border-rose-100 text-gray-900"}`}>
                Projects
              </div>
              <p className={`px-3 sm:px-4 py-1 border-b font-mono text-xs sm:text-sm ${isDark ? "bg-[#1e1f23] border-gray-800 text-gray-100" : "bg-rose-50 border-rose-100 text-gray-500"}`}>{projects.length} projects</p>

              
              <div className="p-2 max-h-[300px] sm:max-h-[400px] md:h-[calc(93vh-180px)] overflow-y-auto">
                {projects.map((p) => {
                  const active = p._id === activeProjectId;

                  return (
                    <button
                      key={p._id}
                      onClick={() => setActiveProjectId(p._id)}
                      className={`w-full text-left px-3 py-2.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all touch-manipulation font-medium ${
                        active
                          ? isDark
                            ? "bg-gradient-to-r from-teal-600 to-rose-600 text-white shadow-md"
                            : "bg-gradient-to-r from-teal-600 to-rose-600 text-white shadow-md"
                          : isDark
                            ? "text-gray-300 hover:bg-gradient-to-r hover:from-teal-600/70 hover:to-rose-600/70 hover:text-white"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-1.5 sm:mr-2">{p.emoji}</span>
                      <span className="truncate">{p.name}</span>
                    </button>
                  );
                })}

                {projects.length === 0 && (
                  <div className={`text-xs sm:text-sm px-3 py-6 text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    No projects found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: DATABASE TABS */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className={`rounded-xl sm:rounded-2xl border overflow-hidden flex flex-col max-h-[600px] sm:max-h-[700px] md:h-[calc(100vh-180px)] shadow-sm ${isDark ? "bg-[#18191d] border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0 ${isDark ? "bg-[#1e1f23] border-gray-800" : "bg-rose-50 border-rose-100"}`}>
                <div className="w-full sm:w-auto">
                  <div className={`font-semibold text-xs sm:text-sm truncate ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                    <span className="mr-1.5">{activeProject?.emoji}</span>
                    {activeProject?.name || "Select a project"}
                  </div>
                  <div className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {tabs.length > 0 ? `${tabs.length} database${tabs.length > 1 ? 's' : ''}` : 'No databases'}
                  </div>
                </div>
              </div>

              <div className="p-2 sm:p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 overflow-y-auto flex-1">
                {tabs.map((db: { _id: string; icon: string; name: string; viewType?: string }) => (
                  <button
                    key={db._id}
                    onClick={() =>
                      router.push(`/projects/${activeProjectId}?db=${db._id}`)
                    }
                    className={`rounded-xl sm:rounded-2xl border transition-all p-3 sm:p-4 text-left shadow-sm hover:shadow-lg h-fit touch-manipulation group ${isDark ? "bg-[#1e1f23] border-gray-700 hover:bg-[#252730] hover:border-gray-600" : "bg-rose-50 border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl sm:text-2xl shrink-0">{db.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm sm:text-base truncate ${isDark ? "text-gray-100 group-hover:text-white" : "text-gray-900 group-hover:text-gray-950"}`}>
                          {db.name}
                        </div>
                        <div className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          View: {db.viewType || "table"}
                        </div>
                      </div>
                    </div>

                    <div className={`mt-3 text-xs flex items-center gap-1.5 ${isDark ? "text-gray-500 group-hover:text-gray-400" : "text-gray-400 group-hover:text-gray-500"}`}>
                      <span>→</span>
                      <span>Click to open</span>
                    </div>
                  </button>
                ))}

                {tabs.length === 0 && activeProjectId && (
                  <div className={`col-span-full flex flex-col items-center justify-center py-10 sm:py-16 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    <div className="text-4xl sm:text-5xl mb-3 opacity-50">📊</div>
                    <div className="text-xs sm:text-sm text-center px-4">
                      No databases in this project yet.
                    </div>
                  </div>
                )}
                
                {!activeProjectId && (
                  <div className={`col-span-full flex flex-col items-center justify-center py-10 sm:py-16 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    <div className="text-4xl sm:text-5xl mb-3 opacity-50">👈</div>
                    <div className="text-xs sm:text-sm text-center px-4">
                      Select a project to view its databases
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}