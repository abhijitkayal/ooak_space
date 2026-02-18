// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
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
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showCreateTask, setShowCreateTask] = useState(false);

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
//       // Wait for initial properties fetch
//       if (loading) return;
      
//       // Need at least the title property before checking
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
//       // Get status value from item
//       const st = statusProp ? it.values?.[statusProp._id] : "In Progress";
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
//     if (!item || !statusProp) return;

//     console.log(`Moving task "${item._id}" to column "${overId}"`);

//     const newValues = {
//       ...item.values,
//       [statusProp._id]: overId, // Update the status to the column name
//     };

//     // Optimistically update UI
//     setItems((prev) =>
//       prev.map((x) => (x._id === item._id ? { ...x, values: newValues } : x))
//     );

//     // Save to database
//     await updateItemValue(item._id, newValues);
//     console.log(`Task status updated to: ${overId}`);
//   };

//   if (loading) return <div className="p-6">Loading board...</div>;

//   return (
//     <div className="rounded-2xl border bg-white overflow-hidden">
//       {/* HEADER */}
//       <div className="flex items-center justify-between px-4 py-3 border-b">
//         <div className="font-semibold">Board</div>

//         <button
//           onClick={() => setShowCreateTask(true)}
//           className="px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-900 text-sm"
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
//               className="rounded-xl border bg-gray-50 p-3 min-h-[450px]"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className="font-semibold text-sm">{col}</div>
//                 <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md">
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

const BOARD_COLUMNS = ["In Progress", "Done", "Not Complete"];

export default function BoardView({ databaseId }: { databaseId: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [properties, setProperties] = useState<Property[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchAll = useCallback(async () => {
    if (!databaseId) {
      console.error("BoardView: databaseId is missing");
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

      const exists = properties.find(
        (p) => p.name.toLowerCase() === "status"
      );

      if (exists) return;

      console.log("BoardView: Status property missing, creating it...");
      try {
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            databaseId,
            name: "Status",
            type: "select",
            options: BOARD_COLUMNS,
          }),
        });

        if (!res.ok) {
          console.error("BoardView: Failed to create Status property:", await res.text());
          return;
        }

        console.log("BoardView: Status property created successfully");
        fetchAll();
      } catch (error) {
        console.error("BoardView: Error creating Status property:", error);
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
    const map: Record<string, Item[]> = {
      "In Progress": [],
      Done: [],
      "Not Complete": [],
    };

    for (const it of items) {
      // Try to get status from either the literal "Status" key or the property ID
      let st = it.values?.Status || (statusProp ? it.values?.[statusProp._id] : null) || "In Progress";
      
      // Ensure it's a valid column, default to "In Progress"
      const safe = BOARD_COLUMNS.includes(st) ? st : "In Progress";
      map[safe].push(it);
    }

    console.log("Board grouped items:", map);
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

    if (!BOARD_COLUMNS.includes(overId)) return;

    const item = items.find((x) => x._id === activeId);
    if (!item) return;

    console.log(`Moving task "${item._id}" to column "${overId}"`);

    const newValues = {
      ...item.values,
      Status: overId, // Store with literal "Status" key
      ...(statusProp ? { [statusProp._id]: overId } : {}), // Also store with property ID if available
    };

    // Optimistically update UI
    setItems((prev) =>
      prev.map((x) => (x._id === item._id ? { ...x, values: newValues } : x))
    );

    // Save to database
    await updateItemValue(item._id, newValues);
    console.log(`Task status updated to: ${overId}`);
  };

  if (loading) {
    return (
      <div className={`p-6 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading board...
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-[#18191d] border-gray-800" : "bg-white border-gray-200"}`}>
      {/* HEADER */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <div className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>Board</div>

        <button
          onClick={() => setShowCreateTask(true)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${isDark ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-black text-white hover:bg-gray-900"}`}
        >
          + New
        </button>
      </div>

      {/* BOARD */}
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {BOARD_COLUMNS.map((col) => (
            <div
              key={col}
              id={col}
              className={`rounded-xl border p-3 min-h-[450px] ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{col}</div>
                <div className={`text-xs px-2 py-1 rounded-md ${isDark ? "text-gray-400 bg-[#18191d]" : "text-gray-500 bg-white"}`}>
                  {grouped[col].length}
                </div>
              </div>

              <div className="mt-3 space-y-3">
                <SortableContext
                  items={grouped[col].map((x) => x._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {grouped[col].map((it) => (
                    <TaskCard
                      key={it._id}
                      item={it}
                      titleProp={titleProp}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>
          ))}
        </div>
      </DndContext>

      {/* CREATE TASK MODAL */}
      {showCreateTask && (
        <CreateTaskModal
          isOpen={showCreateTask}
          onClose={() => setShowCreateTask(false)}
          databaseId={databaseId}
          onSaved={fetchAll}
        />
      )}
    </div>
  );
}