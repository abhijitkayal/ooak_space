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

import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
import DatabaseViewRenderer from "./DatabaseViewrenderer";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DatabaseTabs({ projectId, isViewOnly = false }: { projectId: string; isViewOnly?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { databasesByProject } = useWorkspaceStore();
  const dbs = databasesByProject[projectId] || [];

  if (dbs.length === 0) {
    return (
      <Card className={`shadow-sm ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
        <CardContent className="p-6 sm:p-8 md:p-10 text-center">
          <div className="text-4xl sm:text-5xl mb-3 opacity-40">📊</div>
          <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {isViewOnly 
              ? "This project has no databases yet."
              : "No databases yet. Click New Database to get started."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {dbs.map((db, index) => (
        <div key={db._id}>
          <Card className={`shadow-md hover:shadow-lg transition-shadow ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
            <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl shrink-0">{db.icon}</span>
                <h3 className={`text-base sm:text-lg md:text-xl font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                  {db.name}
                </h3>
              </div>
            </CardHeader>
            <CardContent className="pt-2 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
              <DatabaseViewRenderer db={db} isViewOnly={isViewOnly} />
            </CardContent>
          </Card>
          {index < dbs.length - 1 && (
            <Separator className={`my-4 sm:my-6 md:my-8 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}