// "use client";

// import * as Tabs from "@radix-ui/react-tabs";
// import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
// import DatabaseViewRenderer from "./DatabaseViewrenderer";

// export default function DatabaseTabs({ projectId }: { projectId: string }) {
//   const { databasesByProject } = useWorkspaceStore();
//   const dbs = databasesByProject[projectId] || [];

//   if (dbs.length === 0) {
//     return (
//       <div className="p-10 border rounded-2xl text-gray-500">
//         No databases yet. Click “New Database”.
//       </div>
//     );
//   }

//   return (
//     <Tabs.Root defaultValue={dbs[0]._id}>
//       <Tabs.List className="flex gap-2 border-b pb-2">
//         {dbs.map((db) => (
//           <Tabs.Trigger
//             key={db._id}
//             value={db._id}
//             className="px-3 py-2 text-sm rounded-xl data-[state=active]:bg-gray-100"
//           >
//             <span className="mr-2">{db.icon}</span>
//             {db.name}
//           </Tabs.Trigger>
//         ))}
//       </Tabs.List>

//       {dbs.map((db) => (
//         <Tabs.Content key={db._id} value={db._id} className="pt-6 w-full">
//           <DatabaseViewRenderer db={db} />
//         </Tabs.Content>
//       ))}
//     </Tabs.Root>
//   );
// }
"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
import DatabaseViewRenderer from "./DatabaseViewrenderer";
import { useTheme } from "next-themes";

export default function DatabaseTabs({ projectId }: { projectId: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { databasesByProject } = useWorkspaceStore();
  const dbs = databasesByProject[projectId] || [];

  if (dbs.length === 0) {
    return (
      <div className={`p-10 border rounded-2xl ${isDark ? "border-gray-700 bg-gray-900 text-gray-400" : "border-gray-200 bg-white text-gray-500"}`}>
        No databases yet. Click "New Database".
      </div>
    );
  }

  return (
    <Tabs.Root defaultValue={dbs[0]._id}>
      <Tabs.List className={`flex gap-2 border-b pb-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        {dbs.map((db) => (
          <Tabs.Trigger
            key={db._id}
            value={db._id}
            className={`px-3 py-2 text-sm rounded-xl transition-colors ${isDark ? "text-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white hover:text-gray-200" : "text-gray-600 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 hover:text-gray-900"}`}
          >
            <span className="mr-2">{db.icon}</span>
            {db.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {dbs.map((db) => (
        <Tabs.Content key={db._id} value={db._id} className="pt-6 w-full">
          <DatabaseViewRenderer db={db} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}