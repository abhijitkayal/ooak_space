// "use client";

// import { useEffect, useMemo, useState } from "react";

// type TodoTask = {
//   _id: string;
//   databaseId: string;
//   title: string;
//   completed: boolean;
// };

// export default function TodoView({ databaseId }: { databaseId: string }) {
//   const [tasks, setTasks] = useState<TodoTask[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Default tasks (always visible, not saved in DB)
//   const defaultTasks = useMemo(
//     () => [
//       {
//         _id: "default-1",
//         databaseId,
//         title: "Welcome to your to-do list",
//         completed: false,
//       },
//       {
//         _id: "default-2",
//         databaseId,
//         title: "Click + New to add a task",
//         completed: false,
//       },
//       {
//         _id: "default-3",
//         databaseId,
//         title: "Click the checkbox to complete a task",
//         completed: false,
//       },
//     ],
//     [databaseId]
//   );

//   const fetchAll = async () => {
//     setLoading(true);
//     const res = await fetch(`/api/todo?databaseId=${databaseId}`);
//     const data = await res.json();
//     setTasks(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchAll();
//   }, [databaseId]);

//   const createTask = async () => {
//     await fetch("/api/todo", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ databaseId, title: "New task" }),
//     });

//     fetchAll();
//   };

//   const updateTask = async (id: string, body: any) => {
//     await fetch(`/api/todo/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//   };

//   const toggleCompleted = async (task: TodoTask) => {
//     // ❌ block default tasks from updating DB
//     if (task._id.startsWith("default-")) return;

//     const newCompleted = !task.completed;

//     setTasks((prev) =>
//       prev.map((t) =>
//         t._id === task._id ? { ...t, completed: newCompleted } : t
//       )
//     );

//     await updateTask(task._id, { completed: newCompleted });
//   };

//   const updateTitle = async (task: TodoTask, title: string) => {
//     // ❌ block default tasks from updating DB
//     if (task._id.startsWith("default-")) return;

//     setTasks((prev) =>
//       prev.map((t) => (t._id === task._id ? { ...t, title } : t))
//     );

//     await updateTask(task._id, { title });
//   };

//   // ✅ Merge default + db tasks
//   const allTasks = [...defaultTasks, ...tasks];

//   if (loading) return <div className="p-6 text-sm">Loading...</div>;

//   return (
//     <div className="rounded-xl border bg-white overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
//         <div className="font-semibold text-gray-800">To-do</div>

//         <button
//           onClick={createTask}
//           className="text-sm px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-900"
//         >
//           + New
//         </button>
//       </div>

//       {/* List */}
//       <div className="p-4 space-y-2">
//         {allTasks.map((task) => (
//           <div
//             key={task._id}
//             className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-gray-50"
//           >
//             {/* Checkbox */}
//             <button
//               onClick={() => toggleCompleted(task)}
//               className="w-5 h-5 mt-[2px] rounded border flex items-center justify-center"
//             >
//               {task.completed && (
//                 <div className="w-3 h-3 rounded-sm bg-black" />
//               )}
//             </button>

//             {/* Title */}
//             <input
//               value={task.title}
//               readOnly={task._id.startsWith("default-")}
//               onChange={(e) => updateTitle(task, e.target.value)}
//               className={`flex-1 bg-transparent outline-none text-sm font-medium ${
//                 task.completed
//                   ? "line-through text-gray-400"
//                   : "text-gray-800"
//               } ${task._id.startsWith("default-") ? "text-gray-500" : ""}`}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TodoTaskModal from "./TodoTaskModal";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus } from "lucide-react";

type Property = {
  _id: string;
  databaseId: string;
  name: string;
  type: string;
  options?: string[];
};

type Task = {
  _id: string;
  databaseId: string;
  title?: string;
  completed?: boolean;
  values: Record<string, any>;
};

export default function TodoView({ databaseId }: { databaseId: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const hasSeeded = useRef(false);

  // modal
  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    console.log("TodoView.fetchAll - Starting fetch for databaseId:", databaseId);
    setLoading(true);

    const [pRes, tRes] = await Promise.all([
      fetch(`/api/todo/properties?databaseId=${databaseId}`),
      fetch(`/api/todo/tasks?databaseId=${databaseId}`),
    ]);

    const propsData = await pRes.json();
    const tasksData = await tRes.json();
    
    console.log("TodoView.fetchAll - Properties fetched:", propsData);
    console.log("TodoView.fetchAll - Tasks fetched:", tasksData);
    
    setProperties(propsData);
    setTasks(tasksData);

    setLoading(false);
  }, [databaseId]);

  // Reset seeding flag when database changes
  useEffect(() => {
    hasSeeded.current = false;
  }, [databaseId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // title prop
  const titleProp = useMemo(
    () => properties.find((p) => p.type === "title"),
    [properties]
  );

  // completed prop
  const completedProp = useMemo(
    () => properties.find((p) => p.type === "checkbox"),
    [properties]
  );

  // due date prop
  const dueDateProp = useMemo(
    () => properties.find((p) => p.type === "date"),
    [properties]
  );

  // ✅ seed defaults only once
  useEffect(() => {
    const seedDefaults = async () => {
      if (!databaseId) return;
      if (hasSeeded.current) return; // already seeded
      if (loading) return; // wait for initial load
      if (properties.length > 0) {
        hasSeeded.current = true;
        return; // already has properties
      }

      hasSeeded.current = true;

      const defaults = [
        { name: "Name", type: "title" },
        { name: "Completed", type: "checkbox" },
        { name: "Due date", type: "date" },
        {
          name: "Status",
          type: "select",
          options: ["Not started", "In progress", "Done"],
        },
        { name: "Assignee", type: "person" },
        { name: "Tags", type: "multi_select", options: ["Work", "Personal"] },
      ];

      await Promise.all(
        defaults.map((p) =>
          fetch("/api/todo/properties", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ databaseId, ...p }),
          })
        )
      );

      fetchAll();
    };

    seedDefaults();
  }, [databaseId, loading, properties.length, fetchAll]);

  const createTask = async () => {
    const values: any = {};

    // Initialize title property with empty string if it exists
    if (titleProp) values[titleProp._id] = "";

    // Initialize completed checkbox to false
    if (completedProp) values[completedProp._id] = false;

    const res = await fetch("/api/todo/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        databaseId, 
        title: "new task", // Default title
        values 
      }),
    });

    const created = await res.json();
    setTasks((prev) => [created, ...prev]);
    
    // Auto-open the modal for editing
    setSelectedTaskId(created._id);
    setOpen(true);
  };

  const toggleCompleted = async (task: Task) => {
    const newCompleted = !task.completed;

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, completed: newCompleted } : t))
    );

    // Update in database
    await fetch(`/api/todo/tasks/${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newCompleted }),
    });
  };

  if (loading) return <div className="p-6 text-sm">Loading...</div>;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>To-do</CardTitle>

          <Button onClick={createTask} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <ScrollArea className="h-[360px]">
            <div className="p-4 space-y-2">
              {tasks.map((task) => {
                // Use direct title field from schema
                const title = task.title || "";

                // Use direct completed field from schema
                const done = task.completed || false;
                  
                const dueDate = dueDateProp
                  ? task.values?.[dueDateProp._id]
                  : "";

                return (
                  <div
                    key={task._id}
                    className="flex items-center border gap-3 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={!!done}
                      onCheckedChange={() => toggleCompleted(task)}
                    />

                    {/* click opens modal */}
                    <button
                      onClick={() => {
                        setSelectedTaskId(task._id);
                        setOpen(true);
                      }}
                      className="flex-1 text-left"
                    >
                      <div
                        className={[
                          "text-sm font-medium",
                          done ? "line-through text-muted-foreground" : "",
                          !title ? "text-gray-400 italic" : "",
                        ].join(" ")}
                      >
                        {title || "new task"}
                      </div>
                    </button>
                    
                    {/* Due Date */}
                    {dueDateProp && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 min-w-[120px]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {dueDate ? new Date(dueDate).toLocaleDateString() : "No date"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <TodoTaskModal
        isOpen={open}
        onClose={() => setOpen(false)}
        databaseId={databaseId}
        taskId={selectedTaskId}
        properties={properties}
        onUpdated={fetchAll}
      />
    </>
  );
}
