// "use client";

// import { useState } from "react";
// import { useWorkspaceStore, ViewType } from "@/app/store/WorkspaceStore";

// const OPTIONS: {
//   type: ViewType;
//   title: string;
//   desc: string;
//   icon: string;
// }[] = [
//   { type: "timeline", title: "Timeline", desc: "Plan by dates", icon: "🗓" },
//   { type: "table", title: "Table", desc: "Rows & properties", icon: "📊" },
//   { type: "board", title: "Board", desc: "Kanban workflow", icon: "🧩" },
//   { type: "gallery", title: "Gallery", desc: "Cards layout", icon: "🖼" },
// ];

// export default function ViewPickerCard({
//   projectId,
//   onDone,
// }: {
//   projectId: string;
//   onDone: () => void;
// }) {
//   const [hovered, setHovered] = useState<ViewType>("table");
//   const [name, setName] = useState("");

//   const { fetchDatabases } = useWorkspaceStore();

//   const createDb = async (type: ViewType) => {
//     const payload = {
//       projectId,
//       name: name.trim() || `${type[0].toUpperCase()}${type.slice(1)} Database`,
//       icon: OPTIONS.find((o) => o.type === type)?.icon || "📄",
//       viewType: type,
//     };

//     await fetch("/api/databases", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     await fetchDatabases(projectId);
//     onDone();
//   };

//   return (
//     <div className="space-y-3">
//       <div>
//         <div className="text-xs font-bold text-gray-500 uppercase tracking-widest Recognized">
//           Create database
//         </div>

//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Database name..."
//           className="mt-2 w-full px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-black/10"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-2">
//         {OPTIONS.map((o) => (
//           <button
//             key={o.type}
//             onMouseEnter={() => setHovered(o.type)}
//             onClick={() => createDb(o.type)}
//             className="text-left p-3 rounded-xl border hover:bg-gray-50 transition"
//           >
//             <div className="flex items-center gap-2">
//               <span className="text-lg">{o.icon}</span>
//               <span className="font-semibold text-sm">{o.title}</span>
//             </div>
//             <div className="text-xs text-gray-500 mt-1">{o.desc}</div>
//           </button>
//         ))}
//       </div>

//       {/* Hover preview card */}
//       {/* <div className="rounded-xl border p-3 bg-gray-50">
//         <div className="text-sm font-bold">
//           Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
//         </div>
//         <div className="text-xs text-gray-600 mt-1">
//           This is a Notion-style preview card. You can later render real UI for
//           each view type.
//         </div>

//         <div className="mt-3 rounded-lg bg-white border p-3 text-xs text-gray-500">
//           Example layout preview for <b>{hovered}</b> view...
//         </div>
//       </div> */}

//       {/* Hover preview card */}
// <div className="rounded-xl border p-3 bg-gray-50">
//   <div className="text-sm font-bold">
//     Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
//   </div>

//   <div className="mt-3 rounded-xl bg-white border p-3">
//     {hovered === "timeline" && <TimelineMiniPreview />}
//     {hovered === "table" && <TableMiniPreview />}
//     {hovered === "board" && <BoardMiniPreview />}
//     {hovered === "gallery" && <GalleryMiniPreview />}
//   </div>
// </div>

//     </div>
//   );
// }



// function TimelineMiniPreview() {
//   return (
//     <div className="space-y-2">
//       <div className="flex items-center justify-between text-[10px] text-gray-500">
//         <span>February 2026</span>
//         <span>Month</span>
//       </div>

//       <div className="relative h-[90px] overflow-hidden rounded-lg bg-gray-50 border">
//         {/* vertical today line */}
//         <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-red-400/70" />

//         {/* cards */}
//         <div className="absolute top-3 left-4 w-[55%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
//           Card 1
//         </div>

//         <div className="absolute top-11 left-10 w-[65%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
//           Card 2
//         </div>

//         <div className="absolute top-19 left-20 w-[70%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
//           Card 3
//         </div>
//       </div>

//       <div className="text-[10px] text-gray-500">
//         Timeline shows items across a date range.
//       </div>
//     </div>
//   );
// }

// function TableMiniPreview() {
//   return (
//     <div className="text-[11px] text-gray-600">
//       <div className="grid grid-cols-3 gap-2 font-semibold">
//         <div>Name</div>
//         <div>Status</div>
//         <div>Date</div>
//       </div>
//       <div className="mt-2 space-y-2">
//         <div className="grid grid-cols-3 gap-2">
//           <div>Task 1</div>
//           <div>Todo</div>
//           <div>11 Feb</div>
//         </div>
//         <div className="grid grid-cols-3 gap-2">
//           <div>Task 2</div>
//           <div>Doing</div>
//           <div>12 Feb</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function BoardMiniPreview() {
//   return (
//     <div className="grid grid-cols-3 gap-2 text-[11px]">
//       {["Todo", "Doing", "Done"].map((col) => (
//         <div key={col} className="rounded-lg border bg-gray-50 p-2">
//           <div className="font-semibold text-gray-700">{col}</div>
//           <div className="mt-2 space-y-2">
//             <div className="h-7 rounded-md bg-white border" />
//             <div className="h-7 rounded-md bg-white border" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function GalleryMiniPreview() {
//   return (
//     <div className="grid grid-cols-3 gap-2">
//       {[1, 2, 3].map((i) => (
//         <div key={i} className="rounded-lg border bg-white overflow-hidden">
//           <div className="h-10 bg-gray-100" />
//           <div className="p-2 text-[11px] font-semibold text-gray-700">
//             Card {i}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { useWorkspaceStore, ViewType } from "@/app/store/WorkspaceStore";

// const OPTIONS: {
//   type: ViewType;
//   title: string;
//   desc: string;
//   icon: string;
// }[] = [
//   { type: "timeline", title: "Timeline", desc: "Plan by dates", icon: "🗓" },
//   { type: "table", title: "Table", desc: "Rows & properties", icon: "📊" },
//   { type: "board", title: "Board", desc: "Kanban workflow", icon: "🧩" },
//   { type: "gallery", title: "Gallery", desc: "Cards layout", icon: "🖼" },
// ];

// export default function ViewPickerCard({
//   projectId,
//   onDone,
// }: {
//   projectId: string;
//   onDone: () => void;
// }) {
//   const [hovered, setHovered] = useState<ViewType>("table");
//   const [name, setName] = useState("");

//   const { fetchDatabases } = useWorkspaceStore();

//   const createDb = async (type: ViewType) => {
//     const payload = {
//       projectId,
//       name: name.trim() || `${type[0].toUpperCase()}${type.slice(1)} Database`,
//       icon: OPTIONS.find((o) => o.type === type)?.icon || "📄",
//       viewType: type,
//     };

//     await fetch("/api/databases", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     await fetchDatabases(projectId);
//     onDone();
//   };

//   return (
//     <div className="flex gap-6 items-start w-full">
      
//       {/* LEFT — PREVIEW (fixed size, never shrink) */}
//       <div className="w-[300px] shrink-0 rounded-xl border p-3 bg-gray-50">
//         <div className="text-sm font-bold">
//           Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
//         </div>

//         <div className="mt-3 rounded-xl bg-white border p-3">
//           {hovered === "timeline" && <TimelineMiniPreview />}
//           {hovered === "table" && <TableMiniPreview />}
//           {hovered === "board" && <BoardMiniPreview />}
//           {hovered === "gallery" && <GalleryMiniPreview />}
//         </div>
//       </div>

//       {/* RIGHT — DATABASE (dynamic width, grows freely) */}
//       <div className="flex-1 min-w-0  space-y-3">
//         <div>
//           <div className="text-xs  font-bold text-gray-500 uppercase tracking-widest">
//             Create database
//           </div>

//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Database name..."
//             className="mt-2 w-full px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-black/10"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           {OPTIONS.map((o) => (
//             <button
//               key={o.type}
//               onMouseEnter={() => setHovered(o.type)}
//               onClick={() => createDb(o.type)}
//               className="text-left p-3 rounded-xl border hover:bg-gray-50 transition"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-lg">{o.icon}</span>
//                 <span className="font-semibold text-sm">{o.title}</span>
//               </div>
//               <div className="text-xs text-gray-500 mt-1">{o.desc}</div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- MINI PREVIEWS ---------------- */

// function TimelineMiniPreview() {
//   return (
//     <div className="space-y-2">
//       <div className="flex items-center justify-between text-[10px] text-gray-500">
//         <span>February 2026</span>
//         <span>Month</span>
//       </div>

//       <div className="relative h-[90px] overflow-hidden rounded-lg bg-gray-50 border">
//         <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-red-400/70" />

//         <div className="absolute top-3 left-4 w-[55%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
//           Card 1
//         </div>

//         <div className="absolute top-11 left-10 w-[65%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
//           Card 2
//         </div>

//         <div className="absolute top-[68px] left-20 w-[70%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
//           Card 3
//         </div>
//       </div>

//       <div className="text-[10px] text-gray-500">
//         Timeline shows items across a date range.
//       </div>
//     </div>
//   );
// }

// function TableMiniPreview() {
//   return (
//     <div className="text-[11px] text-gray-600">
//       <div className="grid grid-cols-3 gap-2 font-semibold">
//         <div>Name</div>
//         <div>Status</div>
//         <div>Date</div>
//       </div>

//       <div className="mt-2 space-y-2">
//         <div className="grid grid-cols-3 gap-2">
//           <div>Task 1</div>
//           <div>Todo</div>
//           <div>11 Feb</div>
//         </div>

//         <div className="grid grid-cols-3 gap-2">
//           <div>Task 2</div>
//           <div>Doing</div>
//           <div>12 Feb</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function BoardMiniPreview() {
//   return (
//     <div className="grid grid-cols-3 gap-2 text-[11px]">
//       {["Todo", "Doing", "Done"].map((col) => (
//         <div key={col} className="rounded-lg border bg-gray-50 p-2">
//           <div className="font-semibold text-gray-700">{col}</div>

//           <div className="mt-2 space-y-2">
//             <div className="h-7 rounded-md bg-white border" />
//             <div className="h-7 rounded-md bg-white border" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function GalleryMiniPreview() {
//   return (
//     <div className="grid grid-cols-3 gap-2">
//       {[1, 2, 3].map((i) => (
//         <div key={i} className="rounded-lg border bg-white overflow-hidden">
//           <div className="h-10 bg-gray-100" />
//           <div className="p-2 text-[11px] font-semibold text-gray-700">
//             Card {i}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useWorkspaceStore, ViewType } from "@/app/store/WorkspaceStore";

const OPTIONS: {
  type: ViewType;
  title: string;
  desc: string;
  icon: string;
}[] = [
  { type: "timeline", title: "Timeline", desc: "Plan by dates", icon: "🗓" },
  { type: "table", title: "Table", desc: "Rows & properties", icon: "📊" },
  { type: "board", title: "Board", desc: "Kanban workflow", icon: "🧩" },
  { type: "gallery", title: "Gallery", desc: "Cards layout", icon: "🖼" },
];

export default function ViewPickerCard({
  projectId,
  onDone,
}: {
  projectId: string;
  onDone: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [hovered, setHovered] = useState<ViewType>("table");
  const [name, setName] = useState("");

  const { fetchDatabases } = useWorkspaceStore();

  const createDb = async (type: ViewType) => {
    const payload = {
      projectId,
      name: name.trim() || `${type[0].toUpperCase()}${type.slice(1)} Database`,
      icon: OPTIONS.find((o) => o.type === type)?.icon || "📄",
      viewType: type,
    };

    await fetch("/api/databases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await fetchDatabases(projectId);
    onDone();
  };

  return (
    <div className="flex gap-6 items-start w-full">
      {/* LEFT — PREVIEW */}
      <div className={`w-[300px] shrink-0 rounded-xl border p-3 ${isDark ? "bg-[#18191d] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
        <div className={`text-sm font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
        </div>

        <div className={`mt-3 rounded-xl border p-3 ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}>
          {hovered === "timeline" && <TimelineMiniPreview isDark={isDark} />}
          {hovered === "table" && <TableMiniPreview isDark={isDark} />}
          {hovered === "board" && <BoardMiniPreview isDark={isDark} />}
          {hovered === "gallery" && <GalleryMiniPreview isDark={isDark} />}
        </div>
      </div>

      {/* RIGHT — DATABASE */}
      <div className="flex-1 min-w-0 space-y-3">
        <div>
          <div className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Create database
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Database name..."
            className={`mt-2 w-full px-3 py-2 rounded-xl border outline-none focus:ring-2 text-sm ${isDark ? "bg-[#18191d] border-gray-700 text-gray-100 placeholder-gray-600 focus:ring-white/10" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-black/10"}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {OPTIONS.map((o) => (
            <button
              key={o.type}
              onMouseEnter={() => setHovered(o.type)}
              onClick={() => createDb(o.type)}
              className={`text-left p-3 rounded-xl border transition ${isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{o.icon}</span>
                <span className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{o.title}</span>
              </div>
              <div className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>{o.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MINI PREVIEWS ---------------- */

function TimelineMiniPreview({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-2">
      <div className={`flex items-center justify-between text-[10px] ${isDark ? "text-gray-500" : "text-gray-500"}`}>
        <span>February 2026</span>
        <span>Month</span>
      </div>

      <div className={`relative h-[90px] overflow-hidden rounded-lg border ${isDark ? "bg-[#18191d] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
        <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-red-400/70" />

        <div className={`absolute top-3 left-4 w-[55%] h-7 border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold ${isDark ? "bg-[#1e1f23] border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}>
          Card 1
        </div>

        <div className={`absolute top-11 left-10 w-[65%] h-7 border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold ${isDark ? "bg-[#1e1f23] border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}>
          Card 2
        </div>

        <div className={`absolute top-[68px] left-20 w-[70%] h-7 border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold ${isDark ? "bg-[#1e1f23] border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}>
          Card 3
        </div>
      </div>

      <div className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-500"}`}>
        Timeline shows items across a date range.
      </div>
    </div>
  );
}

function TableMiniPreview({ isDark }: { isDark: boolean }) {
  return (
    <div className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
      <div className={`grid grid-cols-3 gap-2 font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        <div>Name</div>
        <div>Status</div>
        <div>Date</div>
      </div>

      <div className="mt-2 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <div>Task 1</div>
          <div>Todo</div>
          <div>11 Feb</div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>Task 2</div>
          <div>Doing</div>
          <div>12 Feb</div>
        </div>
      </div>
    </div>
  );
}

function BoardMiniPreview({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-[11px]">
      {["Todo", "Doing", "Done"].map((col) => (
        <div key={col} className={`rounded-lg border p-2 ${isDark ? "bg-[#18191d] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
          <div className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-700"}`}>{col}</div>

          <div className="mt-2 space-y-2">
            <div className={`h-7 rounded-md border ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`} />
            <div className={`h-7 rounded-md border ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryMiniPreview({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`rounded-lg border overflow-hidden ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}>
          <div className={`h-10 ${isDark ? "bg-[#18191d]" : "bg-gray-100"}`} />
          <div className={`p-2 text-[11px] font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Card {i}
          </div>
        </div>
      ))}
    </div>
  );
}