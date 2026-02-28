
// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useTheme } from "next-themes";
// import {
//   DndContext,
//   DragEndEvent,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// import TaskCard from "./TaskCard";
// import CreateTaskModal from "./CreateTaskModel";

// type Property = {
//   _id: string;
//   databaseId: string;
//   name: string;
//   type: string;
//   options?: string[];
// };

// type Item = {
//   _id: string;
//   databaseId: string;
//   values: Record<string, any>;
// };

// const BOARD_COLUMNS = ["In Progress", "Done", "Not Complete"];

// export default function BoardView({ databaseId }: { databaseId: string }) {
//   const { resolvedTheme } = useTheme();
//   const isDark = resolvedTheme === "dark";

//   const [properties, setProperties] = useState<Property[]>([]);
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showCreateTask, setShowCreateTask] = useState(false);
//   const [showAddProperty, setShowAddProperty] = useState(false);

//   const sensors = useSensors(useSensor(PointerSensor));

//   const fetchAll = useCallback(async () => {
//     if (!databaseId) {
//       console.error("BoardView: databaseId is missing");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     try {
//       const [pRes, iRes] = await Promise.all([
//         fetch(`/api/properties?databaseId=${databaseId}`),
//         fetch(`/api/board_items?databaseId=${databaseId}`),
//       ]);

//       const pData = await pRes.json();
//       const iData = await iRes.json();

//       setProperties(pData);
//       setItems(iData);
//     } catch (error) {
//       console.error("Error fetching board data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [databaseId]);

//   useEffect(() => {
//     fetchAll();
//   }, [fetchAll]);

//   // Ensure Status property exists
//   useEffect(() => {
//     const ensureStatus = async () => {
//       if (loading) return;
//       if (properties.length === 0) return;

//       const exists = properties.find(
//         (p) => p.name.toLowerCase() === "status"
//       );

//       if (exists) return;

//       console.log("BoardView: Status property missing, creating it...");
//       try {
//         const res = await fetch("/api/properties", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             databaseId,
//             name: "Status",
//             type: "select",
//             options: BOARD_COLUMNS,
//           }),
//         });

//         if (!res.ok) {
//           console.error("BoardView: Failed to create Status property:", await res.text());
//           return;
//         }

//         console.log("BoardView: Status property created successfully");
//         fetchAll();
//       } catch (error) {
//         console.error("BoardView: Error creating Status property:", error);
//       }
//     };

//     ensureStatus();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [properties.length, databaseId, loading]);

//   const titleProp = useMemo(() => properties[0], [properties]);

//   const statusProp = useMemo(() => {
//     return properties.find((p) => p.name.toLowerCase() === "status");
//   }, [properties]);

//   const grouped = useMemo(() => {
//     const map: Record<string, Item[]> = {
//       "In Progress": [],
//       Done: [],
//       "Not Complete": [],
//     };

//     for (const it of items) {
//       // Try to get status from either the literal "Status" key or the property ID
//       let st = it.values?.Status || (statusProp ? it.values?.[statusProp._id] : null) || "In Progress";
      
//       // Ensure it's a valid column, default to "In Progress"
//       const safe = BOARD_COLUMNS.includes(st) ? st : "In Progress";
//       map[safe].push(it);
//     }

//     console.log("Board grouped items:", map);
//     return map;
//   }, [items, statusProp]);

//   const updateItemValue = async (itemId: string, values: any) => {
//     await fetch(`/api/items/${itemId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ values }),
//     });
//   };

//   const onDragEnd = async (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over) return;

//     const activeId = String(active.id);
//     const overId = String(over.id);

//     if (!BOARD_COLUMNS.includes(overId)) return;

//     const item = items.find((x) => x._id === activeId);
//     if (!item) return;

//     console.log(`Moving task "${item._id}" to column "${overId}"`);

//     const newValues = {
//       ...item.values,
//       Status: overId, // Store with literal "Status" key
//       ...(statusProp ? { [statusProp._id]: overId } : {}), // Also store with property ID if available
//     };

//     // Optimistically update UI
//     setItems((prev) =>
//       prev.map((x) => (x._id === item._id ? { ...x, values: newValues } : x))
//     );

//     // Save to database
//     await updateItemValue(item._id, newValues);
//     console.log(`Task status updated to: ${overId}`);
//   };

//   if (loading) {
//     return (
//       <div className={`p-6 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
//         Loading board...
//       </div>
//     );
//   }

//   return (
//     <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-[#18191d] border-gray-800" : "bg-white border-gray-200"}`}>
//       {/* HEADER */}
//       <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
//         <div className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>Board</div>

//         <button
//           onClick={() => setShowCreateTask(true)}
//           className={`px-3 py-1.5 rounded-lg text-sm font-medium ${isDark ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-black text-white hover:bg-gray-900"}`}
//         >
//           + New
//         </button>
//       </div>

//       {/* BOARD */}
//       <DndContext sensors={sensors} onDragEnd={onDragEnd}>
//         <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//           {BOARD_COLUMNS.map((col) => (
//             <div
//               key={col}
//               id={col}
//               className={`rounded-xl border p-3 min-h-[450px] ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-gray-50 border-gray-200"}`}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{col}</div>
//                 <div className={`text-xs px-2 py-1 rounded-md ${isDark ? "text-gray-400 bg-[#18191d]" : "text-gray-500 bg-white"}`}>
//                   {grouped[col].length}
//                 </div>
//               </div>

//               <div className="mt-3 space-y-3">
//                 <SortableContext
//                   items={grouped[col].map((x) => x._id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   {grouped[col].map((it) => (
//                     <TaskCard
//                       key={it._id}
//                       item={it}
//                       titleProp={titleProp}
//                     />
//                   ))}
//                 </SortableContext>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DndContext>

//       {/* CREATE TASK MODAL */}
//       {showCreateTask && (
//         <CreateTaskModal
//           isOpen={showCreateTask}
//           onClose={() => setShowCreateTask(false)}
//           databaseId={databaseId}
//           onSaved={fetchAll}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModel";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SpinnerFullscreen } from "@/components/ui/spinner";

import { Plus } from "lucide-react";

type Property = {
  _id: string;
  databaseId: string;
  name: string;
  type: string;
  options?: string[];
};

type Item = {
  _id: string;
  databaseId: string;
  values: Record<string, any>;
};

const BOARD_COLUMNS = ["In Progress", "Done", "Not Complete"] as const;

export default function BoardView({ databaseId }: { databaseId: string }) {
  const { resolvedTheme } = useTheme();
  const [properties, setProperties] = useState<Property[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateTask, setShowCreateTask] = useState(false);

  const isDark = resolvedTheme === "dark";

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchAll = useCallback(async () => {
    if (!databaseId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [pRes, iRes] = await Promise.all([
        fetch(`/api/properties?databaseId=${databaseId}`),
        fetch(`/api/board_items?databaseId=${databaseId}`),
      ]);

      const pData = await pRes.json();
      const iData = await iRes.json();

      setProperties(pData);
      setItems(iData);
    } catch (error) {
      console.error("Error fetching board data:", error);
    } finally {
      setLoading(false);
    }
  }, [databaseId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Ensure Status property exists
  useEffect(() => {
    const ensureStatus = async () => {
      if (loading) return;
      if (properties.length === 0) return;

      const exists = properties.find((p) => p.name.toLowerCase() === "status");
      if (exists) return;

      try {
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            databaseId,
            name: "Status",
            type: "select",
            options: [...BOARD_COLUMNS],
          }),
        });

        if (!res.ok) return;

        fetchAll();
      } catch (error) {
        console.error("Error creating Status property:", error);
      }
    };

    ensureStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.length, databaseId, loading]);

  const titleProp = useMemo(() => properties[0], [properties]);

  const statusProp = useMemo(() => {
    return properties.find((p) => p.name.toLowerCase() === "status");
  }, [properties]);

  const grouped = useMemo(() => {
    const map: Record<(typeof BOARD_COLUMNS)[number], Item[]> = {
      "In Progress": [],
      Done: [],
      "Not Complete": [],
    };

    for (const it of items) {
      const raw =
        it.values?.Status ||
        (statusProp ? it.values?.[statusProp._id] : null) ||
        "In Progress";

      const safe = BOARD_COLUMNS.includes(raw) ? raw : "In Progress";
      map[safe as typeof BOARD_COLUMNS[number]].push(it);
    }

    return map;
  }, [items, statusProp]);

  const updateItemValue = async (itemId: string, values: any) => {
    await fetch(`/api/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (!BOARD_COLUMNS.includes(overId as any)) return;

    const item = items.find((x) => x._id === activeId);
    if (!item) return;

    const newValues = {
      ...item.values,
      Status: overId,
      ...(statusProp ? { [statusProp._id]: overId } : {}),
    };

    // Optimistic UI
    setItems((prev) =>
      prev.map((x) => (x._id === item._id ? { ...x, values: newValues } : x))
    );

    await updateItemValue(item._id, newValues);
  };

  if (loading) {
    return <SpinnerFullscreen text="Loading board..." />;
  }

  return (
    <Card className={`overflow-hidden shadow-md ${!isDark ? 'bg-gray-100' : ''}`}>
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4">
        <CardTitle className="text-lg sm:text-xl">Board</CardTitle>

        <Button size="sm" onClick={() => setShowCreateTask(true)} className="touch-manipulation w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </CardHeader>

      <Separator />

      {/* Board */}
      <CardContent className="p-0">
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4">
            {BOARD_COLUMNS.map((col) => (
              <Card key={col} id={col} className={`shadow-sm ${!isDark ? 'bg-rose-50' : 'bg-muted/40'}`}>
                <CardHeader className="py-3 sm:py-4 px-3 sm:px-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs sm:text-sm font-semibold truncate">{col}</div>
                    <Badge variant="secondary" className="text-xs">{grouped[col].length}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 px-2 sm:px-4 pb-2 sm:pb-4">
                  <ScrollArea className="h-[300px] sm:h-[420px] pr-2">
                    <SortableContext
                      items={grouped[col].map((x) => x._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2 sm:space-y-3">
                        {grouped[col].map((it) => (
                          <TaskCard
                            key={it._id}
                            item={it}
                            titleProp={titleProp}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </DndContext>
      </CardContent>

      {/* Create Task Modal */}
      {showCreateTask && (
        <CreateTaskModal
          isOpen={showCreateTask}
          onClose={() => setShowCreateTask(false)}
          databaseId={databaseId}
          onSaved={fetchAll}
        />
      )}
    </Card>
  );
}
