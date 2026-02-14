"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useWorkspaceStore } from "@/app/store/WorkspaceStore";
import DatabaseViewRenderer from "./DatabaseViewrenderer";

export default function DatabaseTabs({ projectId }: { projectId: string }) {
  const { databasesByProject } = useWorkspaceStore();
  const dbs = databasesByProject[projectId] || [];

  if (dbs.length === 0) {
    return (
      <div className="p-10 border rounded-2xl text-gray-500">
        No databases yet. Click “New Database”.
      </div>
    );
  }

  return (
    <Tabs.Root defaultValue={dbs[0]._id}>
      <Tabs.List className="flex gap-2 border-b pb-2">
        {dbs.map((db) => (
          <Tabs.Trigger
            key={db._id}
            value={db._id}
            className="px-3 py-2 text-sm rounded-xl data-[state=active]:bg-gray-100"
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
