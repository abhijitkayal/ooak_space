
// "use client";

// import { title } from "process";
// import { useEffect, useMemo, useState } from "react";
// import { useTheme } from "next-themes";
// import AddPropertyModal from "../gallery/AddPropertyModal";

// type Property = {
//   _id: string;
//   name: string;
//   type: string;
//   options?: string[];
// };

// const BOARD_COLUMNS = ["In Progress", "Done", "Not Complete"];

// export default function CreateTaskModal({
//   isOpen,
//   onClose,
//   databaseId,
//   onSaved,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   databaseId: string;
//   onSaved: () => void;
// }) {
//   const { resolvedTheme } = useTheme();
//   const isDark = resolvedTheme === "dark";

//   const [properties, setProperties] = useState<Property[]>([]);
//   const [extraProps, setExtraProps] = useState<Property[]>([]);

//   const [loading, setLoading] = useState(true);

//   // values for new task
//   const [taskName, setTaskName] = useState("");
//   const [status, setStatus] = useState("In Progress");
//   const [extraValues, setExtraValues] = useState<Record<string, any>>({});

//   const fetchProps = async () => {
//     setLoading(true);
//     const res = await fetch(`/api/properties?databaseId=${databaseId}`);
//     setProperties(await res.json());
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (!isOpen) return;
//     fetchProps();
//   }, [isOpen]);

//   useEffect(() => {
//     const ensureDefaultProps = async () => {
//       if (!isOpen) return;

//       const res = await fetch(`/api/properties?databaseId=${databaseId}`);
//       const props = await res.json();

//       // title property
//       let title = props[0];

//       // status property
//       let status = props.find(
//         (p: any) => p.name.trim().toLowerCase() === "status"
//       );

//       // if no title property -> create
//       if (!title) {
//         await fetch("/api/properties", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             databaseId,
//             name: "Task Name",
//             type: "text",
//             options: [],
//           }),
//         });
//       }

//       // if no status property -> create
//       if (!status) {
//         console.log("Creating Status property with options:", BOARD_COLUMNS);
//         const statusRes = await fetch("/api/properties", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             databaseId,
//             name: "Status",
//             type: "select",
//             options: BOARD_COLUMNS,
//           }),
//         });

//         if (statusRes.ok) {
//           console.log("Status property created successfully");
//         } else {
//           console.error("Failed to create Status property:", await statusRes.text());
//         }
//       }

//       // finally reload props
//       fetchProps();
//     };

//     ensureDefaultProps();
//   }, [isOpen, databaseId]);

//   const titleProp = useMemo(() => properties[0], [properties]);

//   const createProperty = async () => {
//     const name = prompt("Property name?");
//     if (!name) return;

//     const type = prompt("Type? (text/date/select)") || "text";

//     const options =
//       type === "select"
//         ? prompt("Options comma separated?")?.split(",").map((x) => x.trim()) ||
//           []
//         : [];

//     const res = await fetch("/api/properties", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         databaseId,
//         name,
//         type,
//         options,
//       }),
//     });

//     const created = await res.json();

//     // store inside modal only (single time)
//     setExtraProps((prev) => [...prev, created]);

//     // refresh global list too
//     fetchProps();
//   };

//   const createTask = async () => {
//     console.log("Creating task with status:", status);
//     console.log("titleProp:", titleProp);

//     if (!titleProp) {
//       alert("Title or Status property missing!");
//       console.log("Missing properties - titleProp:", titleProp);
//       return;
//     }

//     const values: any = {
//       [titleProp._id]: taskName || "Untitled task",
//       Status: status,
//     };

//     console.log("Task values to save:", values);

//     for (const p of extraProps) {
//       values[p._id] = extraValues[p._id] ?? "";
//     }

//     const res = await fetch("/api/board_items", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         databaseId,
//         values,
//       }),
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       console.log("Create task failed:", err);
//       alert("Task create failed. Check console.");
//       return;
//     }

//     onSaved();
//     onClose();
//   };

//   const [showAddProperty, setShowAddProperty] = useState(false);

//   const inputClass = `w-full border rounded-lg px-3 py-2 outline-none text-sm ${
//     isDark
//       ? "bg-[#18191d] border-gray-700 text-gray-100 placeholder-gray-600"
//       : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
//   }`;

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
//       <div className={`w-full max-w-lg rounded-2xl border shadow-xl p-5 ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}>
//         <div className="flex items-center justify-between">
//           <div className={`font-semibold text-lg ${isDark ? "text-gray-100" : "text-gray-900"}`}>
//             New Task
//           </div>

//           <button
//             onClick={onClose}
//             className={`text-sm px-2 py-1 rounded-md ${isDark ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}`}
//           >
//             ✕
//           </button>
//         </div>

//         {loading ? (
//           <div className={`p-6 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
//             Loading...
//           </div>
//         ) : (
//           <div className="mt-4 space-y-4">
//             {/* ALWAYS FIELD 1 */}
//             <div>
//               <div className={`text-xs mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
//                 Task name
//               </div>
//               <input
//                 value={taskName}
//                 onChange={(e) => setTaskName(e.target.value)}
//                 className={inputClass}
//                 placeholder="Untitled task"
//               />
//             </div>

//             {/* ALWAYS FIELD 2 */}
//             <div>
//               <div className={`text-xs mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
//                 Status
//               </div>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className={inputClass}
//               >
//                 {BOARD_COLUMNS.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* EXTRA FIELDS (only this session) */}
//             {extraProps.map((p) => (
//               <div key={p._id}>
//                 <div className={`text-xs mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
//                   {p.name}
//                 </div>

//                 {p.type === "date" ? (
//                   <input
//                     type="date"
//                     value={extraValues[p._id] || ""}
//                     onChange={(e) =>
//                       setExtraValues((prev) => ({
//                         ...prev,
//                         [p._id]: e.target.value,
//                       }))
//                     }
//                     className={inputClass}
//                   />
//                 ) : p.type === "select" ? (
//                   <select
//                     value={extraValues[p._id] || ""}
//                     onChange={(e) =>
//                       setExtraValues((prev) => ({
//                         ...prev,
//                         [p._id]: e.target.value,
//                       }))
//                     }
//                     className={inputClass}
//                   >
//                     <option value="">Select...</option>
//                     {(p.options || []).map((opt) => (
//                       <option key={opt} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     value={extraValues[p._id] || ""}
//                     onChange={(e) =>
//                       setExtraValues((prev) => ({
//                         ...prev,
//                         [p._id]: e.target.value,
//                       }))
//                     }
//                     className={inputClass}
//                     placeholder="Enter value"
//                   />
//                 )}
//               </div>
//             ))}

//             {/* BUTTONS */}
//             <div className="flex items-center justify-between pt-2">
//               <button
//                 onClick={() => setShowAddProperty(true)}
//                 className={`text-sm px-3 py-2 rounded-lg border ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
//               >
//                 + Add property
//               </button>

//               <button
//                 onClick={createTask}
//                 className={`text-sm px-4 py-2 rounded-lg font-medium ${isDark ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-black text-white hover:bg-gray-900"}`}
//               >
//                 Create task
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       {showAddProperty && (
//         <AddPropertyModal
//           isOpen={showAddProperty}
//           onClose={() => setShowAddProperty(false)}
//           databaseId={databaseId}
//           onSaved={fetchProps}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";

import AddPropertyModal from "../gallery/AddPropertyModal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Property = {
  _id: string;
  name: string;
  type: string;
  options?: string[];
};

const BOARD_COLUMNS = ["In Progress", "Done", "Not Complete"] as const;

export default function CreateTaskModal({
  isOpen,
  onClose,
  databaseId,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  databaseId: string;
  onSaved: () => void;
}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [extraProps, setExtraProps] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // values for new task
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] =
    useState<(typeof BOARD_COLUMNS)[number]>("In Progress");
  const [extraValues, setExtraValues] = useState<Record<string, any>>({});

  const [showAddProperty, setShowAddProperty] = useState(false);

  const fetchProps = async () => {
    setLoading(true);
    const res = await fetch(`/api/properties?databaseId=${databaseId}`);
    setProperties(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchProps();
  }, [isOpen]);

  // Ensure default properties exist
  useEffect(() => {
    const ensureDefaultProps = async () => {
      if (!isOpen) return;

      const res = await fetch(`/api/properties?databaseId=${databaseId}`);
      const props = await res.json();

      const title = props[0];

      const statusProp = props.find(
        (p: any) => p.name.trim().toLowerCase() === "status"
      );

      // create title property if missing
      if (!title) {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            databaseId,
            name: "Task Name",
            type: "text",
            options: [],
          }),
        });
      }

      // create status property if missing
      if (!statusProp) {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            databaseId,
            name: "Status",
            type: "select",
            options: [...BOARD_COLUMNS],
          }),
        });
      }

      fetchProps();
    };

    ensureDefaultProps();
  }, [isOpen, databaseId]);

  const titleProp = useMemo(() => properties[0], [properties]);

  const createTask = async () => {
    if (!titleProp) return;

    const values: any = {
      [titleProp._id]: taskName || "Untitled task",
      Status: status,
    };

    for (const p of extraProps) {
      values[p._id] = extraValues[p._id] ?? "";
    }

    const res = await fetch("/api/board_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        databaseId,
        values,
      }),
    });

    if (!res.ok) {
      alert("Task create failed. Check console.");
      return;
    }

    onSaved();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
          </DialogHeader>

          <Separator />

          {loading ? (
            <div className="py-6 text-sm text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-5">
              {/* Task Name */}
              <div className="space-y-2">
                <Label>Task name</Label>
                <Input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Untitled task"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={status}
                  onValueChange={(val) =>
                    setStatus(val as (typeof BOARD_COLUMNS)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {BOARD_COLUMNS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Extra properties (only this session) */}
              {extraProps.map((p) => (
                <div key={p._id} className="space-y-2">
                  <Label>{p.name}</Label>

                  {p.type === "date" ? (
                    <Input
                      type="date"
                      value={extraValues[p._id] || ""}
                      onChange={(e) =>
                        setExtraValues((prev) => ({
                          ...prev,
                          [p._id]: e.target.value,
                        }))
                      }
                    />
                  ) : p.type === "select" ? (
                    <Select
                      value={extraValues[p._id] || ""}
                      onValueChange={(val) =>
                        setExtraValues((prev) => ({
                          ...prev,
                          [p._id]: val,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>

                      <SelectContent>
                        {(p.options || []).map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={extraValues[p._id] || ""}
                      onChange={(e) =>
                        setExtraValues((prev) => ({
                          ...prev,
                          [p._id]: e.target.value,
                        }))
                      }
                      placeholder="Enter value"
                    />
                  )}
                </div>
              ))}

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddProperty(true)}
                >
                  + Add property
                </Button>

                <Button onClick={createTask}>Create task</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Property Modal */}
      {showAddProperty && (
        <AddPropertyModal
          isOpen={showAddProperty}
          onClose={() => setShowAddProperty(false)}
          databaseId={databaseId}
          onSaved={fetchProps}
        />
      )}
    </>
  );
}
