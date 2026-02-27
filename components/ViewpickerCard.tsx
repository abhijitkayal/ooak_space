
// // "use client";

// // import { useState } from "react";
// // import { useTheme } from "next-themes";
// // import { useWorkspaceStore, ViewType } from "@/app/store/WorkspaceStore";

// // const OPTIONS: {
// //   type: ViewType;
// //   title: string;
// //   desc: string;
// //   icon: string;
// // }[] = [
// //   { type: "timeline", title: "Timeline", desc: "Plan by dates", icon: "🗓" },
// //   { type: "table", title: "Table", desc: "Rows & properties", icon: "📊" },
// //   { type: "board", title: "Board", desc: "Kanban workflow", icon: "🧩" },
// //   { type: "gallery", title: "Gallery", desc: "Cards layout", icon: "🖼" },
// // ];

// // export default function ViewPickerCard({
// //   projectId,
// //   onDone,
// // }: {
// //   projectId: string;
// //   onDone: () => void;
// // }) {
// //   const { resolvedTheme } = useTheme();
// //   const isDark = resolvedTheme === "dark";

// //   const [hovered, setHovered] = useState<ViewType>("table");
// //   const [name, setName] = useState("");

// //   const { fetchDatabases } = useWorkspaceStore();

// //   const createDb = async (type: ViewType) => {
// //     const payload = {
// //       projectId,
// //       name: name.trim() || `${type[0].toUpperCase()}${type.slice(1)} Database`,
// //       icon: OPTIONS.find((o) => o.type === type)?.icon || "📄",
// //       viewType: type,
// //     };

// //     await fetch("/api/databases", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     await fetchDatabases(projectId);
// //     onDone();
// //   };

// //   return (
// //     <div className="flex gap-6 items-start w-full">
// //       {/* LEFT — PREVIEW */}
// //       <div className={`w-[300px] shrink-0 rounded-xl border p-3 ${isDark ? "bg-[#18191d] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
// //         <div className={`text-sm font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
// //           Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
// //         </div>

// //         <div className={`mt-3 rounded-xl border p-3 ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}>
// //           {hovered === "timeline" && <TimelineMiniPreview isDark={isDark} />}
// //           {hovered === "table" && <TableMiniPreview isDark={isDark} />}
// //           {hovered === "board" && <BoardMiniPreview isDark={isDark} />}
// //           {hovered === "gallery" && <GalleryMiniPreview isDark={isDark} />}
// //         </div>
// //       </div>

// //       {/* RIGHT — DATABASE */}
// //       <div className="flex-1 min-w-0 space-y-3">
// //         <div>
// //           <div className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-500"}`}>
// //             Create database
// //           </div>

// //           <input
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             placeholder="Database name..."
// //             className={`mt-2 w-full px-3 py-2 rounded-xl border outline-none focus:ring-2 text-sm ${isDark ? "bg-[#18191d] border-gray-700 text-gray-100 placeholder-gray-600 focus:ring-white/10" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-black/10"}`}
// //           />
// //         </div>

// //         <div className="grid grid-cols-2 gap-2">
// //           {OPTIONS.map((o) => (
// //             <button
// //               key={o.type}
// //               onMouseEnter={() => setHovered(o.type)}
// //               onClick={() => createDb(o.type)}
// //               className={`text-left p-3 rounded-xl border transition ${isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}
// //             >
// //               <div className="flex items-center gap-2">
// //                 <span className="text-lg">{o.icon}</span>
// //                 <span className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{o.title}</span>
// //               </div>
// //               <div className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>{o.desc}</div>
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ---------------- MINI PREVIEWS ---------------- */

// // function TimelineMiniPreview({ isDark }: { isDark: boolean }) {
// //   return (
// //     <div className="space-y-2">
// //       <div className={`flex items-center justify-between text-[10px] ${isDark ? "text-gray-500" : "text-gray-500"}`}>
// //         <span>February 2026</span>
// //         <span>Month</span>
// //       </div>

// //       <div className={`relative h-[90px] overflow-hidden rounded-lg border ${isDark ? "bg-[#18191d] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
// //         <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-red-400/70" />

// //         <div className={`absolute top-3 left-4 w-[55%] h-7 border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold ${isDark ? "bg-[#1e1f23] border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}>
// //           Card 1
// //         </div>

// //         <div className={`absolute top-11 left-10 w-[65%] h-7 border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold ${isDark ? "bg-[#1e1f23] border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}>
// //           Card 2
// //         </div>

// //         <div className={`absolute top-[68px] left-20 w-[70%] h-7 border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold ${isDark ? "bg-[#1e1f23] border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}>
// //           Card 3
// //         </div>
// //       </div>

// //       <div className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-500"}`}>
// //         Timeline shows items across a date range.
// //       </div>
// //     </div>
// //   );
// // }

// // function TableMiniPreview({ isDark }: { isDark: boolean }) {
// //   return (
// //     <div className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
// //       <div className={`grid grid-cols-3 gap-2 font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
// //         <div>Name</div>
// //         <div>Status</div>
// //         <div>Date</div>
// //       </div>

// //       <div className="mt-2 space-y-2">
// //         <div className="grid grid-cols-3 gap-2">
// //           <div>Task 1</div>
// //           <div>Todo</div>
// //           <div>11 Feb</div>
// //         </div>

// //         <div className="grid grid-cols-3 gap-2">
// //           <div>Task 2</div>
// //           <div>Doing</div>
// //           <div>12 Feb</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function BoardMiniPreview({ isDark }: { isDark: boolean }) {
// //   return (
// //     <div className="grid grid-cols-3 gap-2 text-[11px]">
// //       {["Todo", "Doing", "Done"].map((col) => (
// //         <div key={col} className={`rounded-lg border p-2 ${isDark ? "bg-[#18191d] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
// //           <div className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-700"}`}>{col}</div>

// //           <div className="mt-2 space-y-2">
// //             <div className={`h-7 rounded-md border ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`} />
// //             <div className={`h-7 rounded-md border ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`} />
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // function GalleryMiniPreview({ isDark }: { isDark: boolean }) {
// //   return (
// //     <div className="grid grid-cols-3 gap-2">
// //       {[1, 2, 3].map((i) => (
// //         <div key={i} className={`rounded-lg border overflow-hidden ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}>
// //           <div className={`h-10 ${isDark ? "bg-[#18191d]" : "bg-gray-100"}`} />
// //           <div className={`p-2 text-[11px] font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
// //             Card {i}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// // "use client";

// // import { useState } from "react";
// // import { useWorkspaceStore, ViewType } from "@/app/store/WorkspaceStore";

// // const OPTIONS: {
// //   type: ViewType;
// //   title: string;
// //   desc: string;
// //   icon: string;
// // }[] = [
// //   { type: "timeline", title: "Timeline", desc: "Plan by dates", icon: "🗓" },
// //   { type: "table", title: "Table", desc: "Rows & properties", icon: "📊" },
// //   { type: "board", title: "Board", desc: "Kanban workflow", icon: "🧩" },
// //   { type: "gallery", title: "Gallery", desc: "Cards layout", icon: "🖼" },
// //   { type: "todo", title: "ToDo", desc: "Task list", icon: "✅" },
// //   { type: "text", title: "Text", desc: "Text content", icon: "📝" },
// //   { type: "heading", title: "Heading", desc: "Heading content", icon: "📌" },
// //   { type: "bullatedlist", title: "Bulleted List", desc: "Bulleted list content", icon: "•" },
// //   { type: "numberlist", title: "Numbered List", desc: "Numbered list content", icon: "1." },
// // ];

// // export default function ViewPickerCard({
// //   projectId,
// //   onDone,
// // }: {
// //   projectId: string;
// //   onDone: () => void;
// // }) {
// //   const [hovered, setHovered] = useState<ViewType>("table");
// //   const [name, setName] = useState("");

// //   const { fetchDatabases } = useWorkspaceStore();

// //   const createDb = async (type: ViewType) => {
// //     const payload = {
// //       projectId,
// //       name: name.trim() || `${type[0].toUpperCase()}${type.slice(1)} Database`,
// //       icon: OPTIONS.find((o) => o.type === type)?.icon || "📄",
// //       viewType: type,
// //     };

// //     await fetch("/api/databases", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     await fetchDatabases(projectId);
// //     onDone();
// //   };

// //   return (
// //     <div className="space-y-3">
// //       <div>
// //         <div className="text-xs font-bold text-gray-500 uppercase tracking-widest Recognized">
// //           Create database
// //         </div>

// //         <input
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           placeholder="Database name..."
// //           className="mt-2 w-full px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-black/10"
// //         />
// //       </div>

// //       <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
// //         {OPTIONS.map((o) => (
// //           <button
// //             key={o.type}
// //             onMouseEnter={() => setHovered(o.type)}
// //             onClick={() => createDb(o.type)}
// //             className="text-left p-3 rounded-xl border hover:bg-gray-50 transition"
// //           >
// //             <div className="flex items-center gap-2">
// //               <span className="text-lg">{o.icon}</span>
// //               <span className="font-semibold text-sm">{o.title}</span>
// //             </div>
// //             <div className="text-xs text-gray-500 mt-1">{o.desc}</div>
// //           </button>
// //         ))}
// //       </div>

// //       {/* Hover preview card */}
// //       {/* <div className="rounded-xl border p-3 bg-gray-50">
// //         <div className="text-sm font-bold">
// //           Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
// //         </div>
// //         <div className="text-xs text-gray-600 mt-1">
// //           This is a Notion-style preview card. You can later render real UI for
// //           each view type.
// //         </div>

// //         <div className="mt-3 rounded-lg bg-white border p-3 text-xs text-gray-500">
// //           Example layout preview for <b>{hovered}</b> view...
// //         </div>
// //       </div> */}

// //       {/* Hover preview card */}
// // <div className="rounded-xl border p-3 bg-gray-50">
// //   <div className="text-sm font-bold">
// //     Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
// //   </div>

// //   <div className="mt-3 rounded-x5l bg-white border p-3">
// //     {hovered === "timeline" && <TimelineMiniPreview />}
// //     {hovered === "table" && <TableMiniPreview />}
// //     {hovered === "board" && <BoardMiniPreview />}
// //     {hovered === "gallery" && <GalleryMiniPreview />}
// //     {hovered === "todo" && <TodominiPreview />}
// //     {hovered === "text" && <TextMiniPreview />}
// //     {hovered === "heading" && <HeadingMiniPreview />}
// //     {hovered === "bullatedlist" && <BulletedListMiniPreview />}
// //     {hovered === "numberlist" && <NumberListMiniPreview />}
// //   </div>
// // </div>

// //     </div>
// //   );
// // }



// // function TimelineMiniPreview() {
// //   return (
// //     <div className="space-y-2">
// //       <div className="flex items-center justify-between text-[10px] text-gray-500">
// //         <span>February 2026</span>
// //         <span>Month</span>
// //       </div>

// //       <div className="relative h-[90px] overflow-hidden rounded-lg bg-gray-50 border">
// //         {/* vertical today line */}
// //         <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-red-400/70" />

// //         {/* cards */}
// //         <div className="absolute top-3 left-4 w-[55%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
// //           Card 1
// //         </div>

// //         <div className="absolute top-11 left-10 w-[65%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
// //           Card 2
// //         </div>

// //         <div className="absolute top-19 left-20 w-[70%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
// //           Card 3
// //         </div>
// //       </div>

// //       <div className="text-[10px] text-gray-500">
// //         Timeline shows items across a date range.
// //       </div>
// //     </div>
// //   );
// // }

// // function TableMiniPreview() {
// //   return (
// //     <div className="text-[11px] text-gray-600">
// //       <div className="grid grid-cols-3 gap-2 font-semibold">
// //         <div>Name</div>
// //         <div>Status</div>
// //         <div>Date</div>
// //       </div>
// //       <div className="mt-2 space-y-2">
// //         <div className="grid grid-cols-3 gap-2">
// //           <div>Task 1</div>
// //           <div>Todo</div>
// //           <div>11 Feb</div>
// //         </div>
// //         <div className="grid grid-cols-3 gap-2">
// //           <div>Task 2</div>
// //           <div>Doing</div>
// //           <div>12 Feb</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function BoardMiniPreview() {
// //   return (
// //     <div className="grid grid-cols-3 gap-2 text-[11px]">
// //       {["Todo", "Doing", "Done"].map((col) => (
// //         <div key={col} className="rounded-lg border bg-gray-50 p-2">
// //           <div className="font-semibold text-gray-700">{col}</div>
// //           <div className="mt-2 space-y-2">
// //             <div className="h-7 rounded-md bg-white border" />
// //             <div className="h-7 rounded-md bg-white border" />
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // function GalleryMiniPreview() {
// //   return (
// //     <div className="grid grid-cols-3 gap-2">
// //       {[1, 2, 3].map((i) => (
// //         <div key={i} className="rounded-lg border bg-white overflow-hidden">
// //           <div className="h-10 bg-gray-100" />
// //           <div className="p-2 text-[11px] font-semibold text-gray-700">
// //             Card {i}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// // function TodominiPreview() {
// //   return (
// //     <div className="rounded-lg border bg-white overflow-hidden">
// //       <div className="px-3 py-2 bg-gray-50 border-b text-[11px] font-semibold text-gray-600">
// //         To-do
// //       </div>

// //       <div className="p-3 space-y-2">
// //         {[1, 2, 3].map((i) => (
// //           <div key={i} className="flex items-start gap-2">
// //             {/* checkbox */}
// //             <div className="w-4 h-4 mt-[2px] rounded border bg-white flex items-center justify-center">
// //               {i === 2 && (
// //                 <div className="w-2.5 h-2.5 rounded-sm bg-gray-900" />
// //               )}
// //             </div>

// //             {/* text */}
// //             <div className="flex-1">
// //               <div
// //                 className={`text-[12px] font-medium ${
// //                   i === 2 ? "line-through text-gray-400" : "text-gray-800"
// //                 }`}
// //               >
// //                 Task {i}
// //               </div>

// //               <div className="text-[10px] text-gray-400">
// //                 Due: Feb {10 + i}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // function TextMiniPreview() {
// //   const cards = [
// //     {
// //       title: "Design homepage",
// //       tags: ["UI", "Website"],
// //       status: "In Progress",
// //     },
// //     {
// //       title: "Client meeting notes",
// //       tags: ["Work"],
// //       status: "Done",
// //     },
// //     {
// //       title: "Content ideas",
// //       tags: ["Marketing", "Ideas"],
// //       status: "Todo",
// //     },
// //   ];

// //   return (
// //     <div className="grid grid-cols-3 gap-2">
// //       {cards.map((c, i) => (
// //         <div
// //           key={i}
// //           className="rounded-lg border bg-white overflow-hidden hover:shadow-sm transition"
// //         >
// //           {/* cover */}
// //           <div className="h-10 bg-gray-100" />

// //           <div className="p-2 space-y-1">
// //             {/* title */}
// //             <div className="text-[11px] font-semibold text-gray-800 line-clamp-2">
// //               {c.title}
// //             </div>

// //             {/* tags */}
// //             <div className="flex flex-wrap gap-1">
// //               {c.tags.map((t) => (
// //                 <span
// //                   key={t}
// //                   className="text-[9px] px-1.5 py-[2px] rounded bg-gray-100 text-gray-600"
// //                 >
// //                   {t}
// //                 </span>
// //               ))}
// //             </div>

// //             {/* status */}
// //             <div className="text-[9px] text-gray-500">
// //               Status: <span className="font-medium">{c.status}</span>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// // function HeadingMiniPreview() {
// //   const cards = [
// //     { title: "Design homepage", tags: ["UI", "Website"], status: "In Progress" },
// //     { title: "Client meeting notes", tags: ["Work"], status: "Done" },
// //     { title: "Content ideas", tags: ["Marketing", "Ideas"], status: "Todo" },
// //   ];

// //   return (
// //     <div className="space-y-2">
// //       {/* ✅ Heading */}
// //       <div className="flex items-center justify-between">
// //         <div className="text-[12px] font-semibold text-gray-800">Gallery</div>
// //         <div className="text-[10px] text-gray-500">{cards.length} cards</div>
// //       </div>

// //       {/* Cards */}
// //       <div className="grid grid-cols-3 gap-2">
// //         {cards.map((c, i) => (
// //           <div
// //             key={i}
// //             className="rounded-lg border bg-white overflow-hidden hover:shadow-sm transition"
// //           >
// //             {/* cover */}
// //             <div className="h-10 bg-gray-100" />

// //             <div className="p-2 space-y-1">
// //               {/* title */}
// //               <div className="text-[11px] font-semibold text-gray-800 line-clamp-2">
// //                 {c.title}
// //               </div>

// //               {/* tags */}
// //               <div className="flex flex-wrap gap-1">
// //                 {c.tags.map((t) => (
// //                   <span
// //                     key={t}
// //                     className="text-[9px] px-1.5 py-[2px] rounded bg-gray-100 text-gray-600"
// //                   >
// //                     {t}
// //                   </span>
// //                 ))}
// //               </div>

// //               {/* status */}
// //               <div className="text-[9px] text-gray-500">
// //                 Status: <span className="font-medium">{c.status}</span>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// // function BulletedListMiniPreview() {
// //   const items = [
// //     "Welcome to your page",
// //     "Click to edit anything",
// //     "Type / to see commands",
// //   ];

// //   return (
// //     <div className="space-y-2">
// //       {/* ✅ Heading */}
// //       <div className="flex items-center justify-between">
// //         <div className="text-[12px] font-semibold text-gray-800">
// //           Bulleted list
// //         </div>
// //         <div className="text-[10px] text-gray-500">{items.length} items</div>
// //       </div>

// //       {/* ✅ List */}
// //       <div className="rounded-lg border bg-white p-2">
// //         <div className="space-y-1">
// //           {items.map((text, i) => (
// //             <div key={i} className="flex items-start gap-2">
// //               {/* bullet */}
// //               <div className="w-3 flex justify-center pt-[3px]">
// //                 <div className="w-[5px] h-[5px] rounded-full bg-gray-500" />
// //               </div>

// //               {/* text */}
// //               <div className="text-[11px] text-gray-700 leading-snug line-clamp-1">
// //                 {text}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function NumberListMiniPreview() {
// //   const items = [
// //     "Write project overview",
// //     "Create database schema",
// //     "Build UI components",
// //   ];

// //   return (
// //     <div className="space-y-2">
// //       {/* Heading */}
// //       <div className="flex items-center justify-between">
// //         <div className="text-[12px] font-semibold text-gray-800">
// //           Numbered list
// //         </div>
// //         <div className="text-[10px] text-gray-500">{items.length} items</div>
// //       </div>

// //       {/* List Box */}
// //       <div className="rounded-lg border bg-white p-2">
// //         <div className="space-y-1">
// //           {items.map((text, i) => (
// //             <div
// //               key={i}
// //               className="flex items-start gap-2 rounded-md px-1 py-1 hover:bg-gray-50"
// //             >
// //               {/* Number */}
// //               <div className="w-4 text-[11px] text-gray-500 font-medium">
// //                 {i + 1}.
// //               </div>

// //               {/* Text */}
// //               <div className="text-[11px] text-gray-700 leading-snug line-clamp-1">
// //                 {text}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

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
//   { type: "todo", title: "ToDo", desc: "Task list", icon: "✅" },
//   { type: "text", title: "Text", desc: "Text content", icon: "📝" },
//   { type: "heading", title: "Heading", desc: "Heading content", icon: "📌" },
//   { type: "bullatedlist", title: "Bulleted List", desc: "Bulleted list content", icon: "•" },
//   { type: "numberlist", title: "Numbered List", desc: "Numbered list content", icon: "1." },
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

//   // ⭐ new states
//   const [selectedType, setSelectedType] = useState<ViewType | null>(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [csvFile, setCsvFile] = useState<File | null>(null);

//   const { fetchDatabases } = useWorkspaceStore();

//   // ---------------- CREATE DEFAULT DATABASE ----------------
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

//   // ---------------- DEFAULT OPTION ----------------
//   const handleDefaultCreate = async () => {
//     if (!selectedType) return;
//     await createDb(selectedType);
//     setShowOptions(false);
//   };

//   // ---------------- SAMPLE DATA OPTION ----------------
//   const handleSampleCreate = async () => {
//     if (!selectedType) return;

//     const payload = {
//       projectId,
//       name: `Sample ${selectedType}`,
//       icon: OPTIONS.find((o) => o.type === selectedType)?.icon || "📄",
//       viewType: selectedType,
//       rows: [
//         { name: "Task 1", status: "Todo", date: "2026-02-10" },
//         { name: "Task 2", status: "Doing", date: "2026-02-12" },
//         { name: "Task 3", status: "Done", date: "2026-02-15" },
//       ],
//     };

//     await fetch("/api/databases/sample", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     await fetchDatabases(projectId);
//     setShowOptions(false);
//     onDone();
//   };

//   // ---------------- CSV IMPORT OPTION ----------------
//   const handleCsvImport = async () => {
//     if (!csvFile || !selectedType) return;

//     const formData = new FormData();
//     formData.append("file", csvFile);
//     formData.append("projectId", projectId);
//     formData.append("viewType", selectedType);

//     await fetch("/api/databases/import-csv", {
//       method: "POST",
//       body: formData,
//     });

//     await fetchDatabases(projectId);
//     setShowOptions(false);
//     onDone();
//   };

//   return (
//     <div className="space-y-3">
//       {/* Header */}
//       <div>
//         <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
//           Create database
//         </div>

//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Database name..."
//           className="mt-2 w-full px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-black/10"
//         />
//       </div>

//       {/* View options */}
//       <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-2">
//         {OPTIONS.map((o) => (
//           <button
//             key={o.type}
//             onMouseEnter={() => setHovered(o.type)}
//             onClick={() => {
//               setSelectedType(o.type);
//               setShowOptions(true);
//             }}
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

//       {/* Preview card */}
//       <div className="rounded-xl border p-3 bg-gray-50">
//         <div className="text-sm font-bold">
//           Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
//         </div>

//         <div className="mt-3 rounded-xl bg-white border p-3">
//           {hovered === "timeline" && <TimelineMiniPreview />}
//           {hovered === "table" && <TableMiniPreview />}
//           {hovered === "board" && <BoardMiniPreview />}
//           {hovered === "gallery" && <GalleryMiniPreview />}
//           {hovered === "todo" && <TodominiPreview />}
//           {hovered === "text" && <TextMiniPreview />}
//           {hovered === "heading" && <HeadingMiniPreview />}
//           {hovered === "bullatedlist" && <BulletedListMiniPreview />}
//           {hovered === "numberlist" && <NumberListMiniPreview />}
//         </div>
//       </div>

//       {/* ---------------- OPTIONS MODAL ---------------- */}
//       {showOptions && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-5 w-[320px] space-y-3 shadow-xl">
//             <div className="text-lg font-semibold">
//               Create {selectedType} database
//             </div>

//             {/* Default */}
//             <button
//               onClick={handleDefaultCreate}
//               className="w-full border rounded-lg p-3 text-left hover:bg-gray-50"
//             >
//               <div className="font-semibold">Default</div>
//               <div className="text-xs text-gray-500">Empty database</div>
//             </button>

//             {/* Sample */}
//             <button
//               onClick={handleSampleCreate}
//               className="w-full border rounded-lg p-3 text-left hover:bg-gray-50"
//             >
//               <div className="font-semibold">Sample Data</div>
//               <div className="text-xs text-gray-500">
//                 Create with dummy rows
//               </div>
//             </button>

//             {/* CSV Import */}
//             <div className="border rounded-lg p-3 space-y-2">
//               <div className="font-semibold">Import CSV</div>

//               <input
//                 type="file"
//                 placeholder="uplaod"
//                 accept=".csv"
//                 onChange={(e) =>
//                   setCsvFile(e.target.files?.[0] || null)
//                 }
//                 className="text-xs border rounded-md border-gray-900 p-1 w-full" 
//               />

//               <button
//                 onClick={handleCsvImport}
//                 disabled={!csvFile}
//                 className="w-full bg-black text-white rounded-md py-2 disabled:opacity-40"
//               >
//                 📂 🢁
//               </button>
//             </div>

//             <button
//               onClick={() => setShowOptions(false)}
//               className="text-xs text-gray-500 w-full"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------------- MINI PREVIEWS ---------------- */

// function TimelineMiniPreview() {
//   return (
//     <div className="space-y-2 text-[11px] text-gray-600">
//       Timeline preview layout
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
//       </div>
//     </div>
//   );
// }

// function BoardMiniPreview() {
//   return <div className="text-[11px] text-gray-600">Board preview</div>;
// }

// function GalleryMiniPreview() {
//   return <div className="text-[11px] text-gray-600">Gallery preview</div>;
// }

// function TodominiPreview() {
//   return <div className="text-[11px] text-gray-600">Todo preview</div>;
// }

// function TextMiniPreview() {
//   return <div className="text-[11px] text-gray-600">Text preview</div>;
// }

// function HeadingMiniPreview() {
//   return <div className="text-[11px] text-gray-600">Heading preview</div>;
// }

// function BulletedListMiniPreview() {
//   return <div className="text-[11px] text-gray-600">Bulleted list preview</div>;
// }

// function NumberListMiniPreview() {
//   return <div className="text-[11px] text-gray-600">Numbered list preview</div>;
// }

// "use client";

// import { useState } from "react";
// import { useWorkspaceStore, ViewType } from "@/app/store/WorkspaceStore";
// import { Search, X } from "lucide-react";

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
//   { type: "todo", title: "ToDo", desc: "Task list", icon: "✅" },
//   { type: "text", title: "Text", desc: "Text content", icon: "📝" },
//   { type: "heading", title: "Heading", desc: "Heading content", icon: "📌" },
//   { type: "bullatedlist", title: "Bulleted List", desc: "Bulleted list content", icon: "•" },
//   { type: "numberlist", title: "Numbered List", desc: "Numbered list content", icon: "1." },
// ];

// // Template data for each view type
// const TEMPLATES = {
//   table: [
//     { id: 1, name: "Blank Table", desc: "Start from scratch" },
//     { id: 2, name: "Project Tracker", desc: "Track project status and deadlines" },
//     { id: 3, name: "Budget Tracking", desc: "Monitor expenses and budgets" },
//   ],
//   board: [
//     { id: 1, name: "Blank Board", desc: "Start from scratch" },
//     { id: 2, name: "Sprint Planning", desc: "Organize sprint tasks" },
//     { id: 3, name: "Content Calendar", desc: "Plan your content strategy" },
//   ],
//   timeline: [
//     { id: 1, name: "Blank Timeline", desc: "Start from scratch" },
//     { id: 2, name: "Project Timeline", desc: "Gantt chart for project planning" },
//     { id: 3, name: "Product Roadmap", desc: "Visualize product development" },
//   ],
//   gallery: [
//     { id: 1, name: "Blank Gallery", desc: "Start from scratch" },
//     { id: 2, name: "Design Portfolio", desc: "Showcase your designs" },
//     { id: 3, name: "Product Catalog", desc: "Display products in cards" },
//   ],
//   todo: [
//     { id: 1, name: "Blank Todo", desc: "Start from scratch" },
//     { id: 2, name: "Daily Tasks", desc: "Organize your daily work" },
//     { id: 3, name: "Checklist", desc: "Simple checklist template" },
//   ],
//   text: [
//     { id: 1, name: "Blank Text", desc: "Start from scratch" },
//     { id: 2, name: "Documentation", desc: "Create documentation" },
//     { id: 3, name: "Meeting Notes", desc: "Take notes during meetings" },
//   ],
//   heading: [
//     { id: 1, name: "Blank Heading", desc: "Start from scratch" },
//     { id: 2, name: "Section Header", desc: "Organize content sections" },
//   ],
//   bullatedlist: [
//     { id: 1, name: "Blank List", desc: "Start from scratch" },
//     { id: 2, name: "Feature List", desc: "List product features" },
//   ],
//   numberlist: [
//     { id: 1, name: "Blank List", desc: "Start from scratch" },
//     { id: 2, name: "Step by Step", desc: "Create ordered instructions" },
//   ],
// };

// export default function ViewPickerCard({
//   projectId,
//   onDone,
// }: {
//   projectId: string;
//   onDone: () => void;
// }) {
//   const [selectedCategory, setSelectedCategory] = useState<ViewType>("table");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

//   const { fetchDatabases } = useWorkspaceStore();

//   const createDbFromTemplate = async (templateId: number) => {
//     const template = (TEMPLATES[selectedCategory] || []).find(t => t.id === templateId);
//     if (!template) return;

//     const payload = {
//       projectId,
//       name: template.name,
//       icon: OPTIONS.find((o) => o.type === selectedCategory)?.icon || "📄",
//       viewType: selectedCategory,
//       ...(templateId > 1 && {
//         rows: [
//           { name: "Task 1", status: "Todo", date: "2026-02-10" },
//           { name: "Task 2", status: "Doing", date: "2026-02-12" },
//           { name: "Task 3", status: "Done", date: "2026-02-15" },
//         ],
//       }),
//     };

//     await fetch("/api/databases", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     await fetchDatabases(projectId);
//     onDone();
//   };

//   const templates = TEMPLATES[selectedCategory] || [];

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 sm:p-6">
//       <div className="w-full max-w-7xl h-[90vh] overflow-hidden rounded-2xl border bg-white shadow-2xl flex flex-col">
//         {/* Header */}
//         <div className="border-b px-6 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Create a design</h1>
//           <button onClick={onDone} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Close">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Search Bar */}
//         {/* <div className="px-6 py-4 border-b">
//           <div className="relative max-w-xl">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="What would you like to create?"
//               className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div> */}

//         {/* Main Content */}
//         <div className="flex flex-1 overflow-hidden">
//         {/* Left Sidebar */}
//         <div className="w-64 border-r bg-gray-50 overflow-y-auto">
//           <div className="p-4">
//             <div className="mb-4">
//               <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold">
//                 ✨ For you
//               </div>
//             </div>

//             <div className="space-y-1">
//               {OPTIONS.map((option) => (
//                 <button
//                   key={option.type}
//                   onClick={() => setSelectedCategory(option.type)}
//                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition ${
//                     selectedCategory === option.type
//                       ? "bg-white shadow-sm font-medium"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <span className="text-xl">{option.icon}</span>
//                   <div className="flex-1">
//                     <div className="text-sm font-medium">{option.title}</div>
//                     <div className="text-xs text-gray-500">{option.desc}</div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Content Area */}
//         <div className="flex-1 overflow-y-auto bg-white">
//           <div className="p-8">
//             {/* Section Title */}
//             <div className="mb-6">
//               <h2 className="text-xl font-bold mb-2">
//                 {OPTIONS.find((o) => o.type === selectedCategory)?.title} templates
//               </h2>
//               <p className="text-sm text-gray-600">
//                 {OPTIONS.find((o) => o.type === selectedCategory)?.desc}
//               </p>
//             </div>

//             {/* Templates Grid */}
//             <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
//               {templates.map((template) => (
//                 <button
//                   key={template.id}
//                   onClick={() => createDbFromTemplate(template.id)}
//                   onMouseEnter={() => setSelectedTemplate(template.id)}
//                   onMouseLeave={() => setSelectedTemplate(null)}
//                   className="group relative aspect-4/3 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-500 transition-all hover:shadow-lg"
//                 >
//                   {/* Preview Area */}
//                   <div className="absolute inset-0 bg-linear-to-br from-gray-50 to-gray-100 p-4">
//                     <div className="h-full flex items-center justify-center">
//                       {selectedCategory === "table" && (
//                         <TableTemplatePreview templateId={template.id} />
//                       )}
//                       {selectedCategory === "board" && (
//                         <BoardTemplatePreview templateId={template.id} />
//                       )}
//                       {selectedCategory === "timeline" && (
//                         <TimelineTemplatePreview templateId={template.id} />
//                       )}
//                       {selectedCategory === "gallery" && (
//                         <GalleryTemplatePreview templateId={template.id} />
//                       )}
//                       {selectedCategory === "todo" && (
//                         <TodoTemplatePreview templateId={template.id} />
//                       )}
//                       {(selectedCategory === "text" ||
//                         selectedCategory === "heading" ||
//                         selectedCategory === "bullatedlist" ||
//                         selectedCategory === "numberlist") && (
//                         <GenericTemplatePreview type={selectedCategory} />
//                       )}
//                     </div>
//                   </div>

//                   {/* Template Info */}
//                   <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t">
//                     <h3 className="font-semibold text-sm">{template.name}</h3>
//                     <p className="text-xs text-gray-600 mt-1">{template.desc}</p>
//                   </div>

//                   {/* Hover Overlay */}
//                   {selectedTemplate === template.id && (
//                     <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
//                       <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
//                         Create
//                       </div>
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------- TEMPLATE PREVIEW COMPONENTS -------- */

// function TableTemplatePreview({ templateId }: { templateId: number }) {
//   if (templateId === 1) {
//     return (
//       <div className="w-full bg-white rounded-lg p-3 text-[10px]">
//         <div className="grid grid-cols-3 gap-2 font-semibold text-gray-700">
//           <div>Name</div>
//           <div>Status</div>
//           <div>Date</div>
//         </div>
//         <div className="mt-2 space-y-1">
//           <div className="h-5 bg-gray-100 rounded" />
//           <div className="h-5 bg-gray-100 rounded" />
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="w-full bg-white rounded-lg p-3 text-[10px]">
//       <div className="grid grid-cols-3 gap-2 font-semibold text-gray-700">
//         <div>Task</div>
//         <div>Status</div>
//         <div>Due</div>
//       </div>
//       <div className="mt-2 space-y-1">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="grid grid-cols-3 gap-2">
//             <div>Task {i}</div>
//             <div className="text-green-600">●</div>
//             <div>Feb {10 + i}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function BoardTemplatePreview({ templateId }: { templateId: number }) {
//   return (
//     <div className="w-full grid grid-cols-3 gap-2 text-[9px]">
//       {["Todo", "Doing", "Done"].map((col) => (
//         <div key={col} className="rounded-md bg-white p-2">
//           <div className="font-semibold text-gray-700">{col}</div>
//           <div className="mt-2 space-y-1">
//             {templateId === 1 ? (
//               <div className="h-6 bg-gray-100 rounded" />
//             ) : (
//               <>
//                 <div className="h-6 bg-blue-100 rounded flex items-center px-1 text-[8px]">
//                   Task {col[0]}
//                 </div>
//                 <div className="h-6 bg-purple-100 rounded flex items-center px-1 text-[8px]">
//                   Task {col[1]}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function TimelineTemplatePreview({ templateId }: { templateId: number }) {
//   return (
//     <div className="w-full bg-white rounded-lg p-3">
//       <div className="text-[9px] text-gray-500 mb-2">
//         {templateId === 1 ? "Empty timeline" : "Feb 2026"}
//       </div>
//       <div className="relative h-16">
//         <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-300" />
//         {templateId > 1 && (
//           <>
//             <div className="absolute top-1 left-2 right-1/2 h-5 bg-blue-200 rounded-sm text-[8px] flex items-center px-1">
//               Task 1
//             </div>
//             <div className="absolute top-7 left-8 right-1/3 h-5 bg-green-200 rounded-sm text-[8px] flex items-center px-1">
//               Task 2
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function GalleryTemplatePreview({ templateId }: { templateId: number }) {
//   return (
//     <div className="w-full grid grid-cols-3 gap-2">
//       {[1, 2, 3].map((i) => (
//         <div key={i} className="rounded-md bg-white overflow-hidden">
//           <div className={`h-12 ${templateId === 1 ? "bg-gray-100" : "bg-linear-to-br from-blue-100 to-purple-100"}`} />
//           <div className="p-1 text-[8px] font-semibold">
//             {templateId === 1 ? "" : `Item ${i}`}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function TodoTemplatePreview({ templateId }: { templateId: number }) {
//   return (
//     <div className="w-full bg-white rounded-lg p-3">
//       <div className="space-y-2">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="flex items-center gap-2 text-[10px]">
//             <div className="w-3 h-3 rounded border-2 border-gray-300" />
//             <div className="text-gray-700">
//               {templateId === 1 ? `Task ${i}` : `Daily task ${i}`}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function GenericTemplatePreview({ type }: { type: string }) {
//   return (
//     <div className="w-full bg-white rounded-lg p-4 flex items-center justify-center">
//       <div className="text-4xl">
//         {type === "text" && "📝"}
//         {type === "heading" && "📌"}
//         {type === "bullatedlist" && "•"}
//         {type === "numberlist" && "1."}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useWorkspaceStore, ViewType } from "@/app/store/WorkspaceStore";
import { Search, X } from "lucide-react";

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
  { type: "todo", title: "ToDo", desc: "Task list", icon: "✅" },
  { type: "text", title: "Text", desc: "Text content", icon: "📝" },
  { type: "heading", title: "Heading", desc: "Heading content", icon: "📌" },
  { type: "bullatedlist", title: "Bulleted List", desc: "Bulleted list content", icon: "•" },
  { type: "numberlist", title: "Numbered List", desc: "Numbered list content", icon: "1." },
];

// Template data for each view type
const TEMPLATES = {
  table: [
    { id: 1, name: "Blank Table", desc: "Start from scratch" },
    { id: 2, name: "Project Tracker", desc: "Track project status and deadlines" },
    { id: 3, name: "Budget Tracking", desc: "Monitor expenses and budgets" },
  ],
  board: [
    { id: 1, name: "Blank Board", desc: "Start from scratch" },
    { id: 2, name: "Sprint Planning", desc: "Organize sprint tasks" },
    { id: 3, name: "Content Calendar", desc: "Plan your content strategy" },
  ],
  timeline: [
    { id: 1, name: "Blank Timeline", desc: "Start from scratch" },
    { id: 2, name: "Project Timeline", desc: "Gantt chart for project planning" },
    { id: 3, name: "Product Roadmap", desc: "Visualize product development" },
  ],
  gallery: [
    { id: 1, name: "Blank Gallery", desc: "Start from scratch" },
    { id: 2, name: "Design Portfolio", desc: "Showcase your designs" },
    { id: 3, name: "Product Catalog", desc: "Display products in cards" },
  ],
  todo: [
    { id: 1, name: "Blank Todo", desc: "Start from scratch" },
    { id: 2, name: "Daily Tasks", desc: "Organize your daily work" },
    { id: 3, name: "Checklist", desc: "Simple checklist template" },
  ],
  text: [
    { id: 1, name: "Blank Text", desc: "Start from scratch" },
    { id: 2, name: "Documentation", desc: "Create documentation" },
    { id: 3, name: "Meeting Notes", desc: "Take notes during meetings" },
  ],
  heading: [
    { id: 1, name: "Blank Heading", desc: "Start from scratch" },
    { id: 2, name: "Section Header", desc: "Organize content sections" },
  ],
  bullatedlist: [
    { id: 1, name: "Blank List", desc: "Start from scratch" },
    { id: 2, name: "Feature List", desc: "List product features" },
  ],
  numberlist: [
    { id: 1, name: "Blank List", desc: "Start from scratch" },
    { id: 2, name: "Step by Step", desc: "Create ordered instructions" },
  ],
};

export default function ViewPickerCard({
  projectId,
  onDone,
}: {
  projectId: string;
  onDone: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [selectedCategory, setSelectedCategory] = useState<ViewType>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const { fetchDatabases } = useWorkspaceStore();

  const createDbFromTemplate = async (templateId: number) => {
    const template = (TEMPLATES[selectedCategory] || []).find(t => t.id === templateId);
    if (!template) return;

    const payload = {
      projectId,
      name: template.name,
      icon: OPTIONS.find((o) => o.type === selectedCategory)?.icon || "📄",
      viewType: selectedCategory,
      ...(templateId > 1 && {
        rows: [
          { name: "Task 1", status: "Todo", date: "2026-02-10" },
          { name: "Task 2", status: "Doing", date: "2026-02-12" },
          { name: "Task 3", status: "Done", date: "2026-02-15" },
        ],
      }),
    };

    await fetch("/api/databases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await fetchDatabases(projectId);
    onDone();
  };

  const templates = TEMPLATES[selectedCategory] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className={`w-full max-w-7xl h-[90vh] overflow-hidden rounded-2xl border shadow-2xl flex flex-col ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}>
        {/* Header */}
        <div className={`border-b px-6 py-4 flex items-center justify-between ${isDark ? "border-gray-800" : "border-gray-200"}`}>
          <h1 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>Create a design</h1>
          <button onClick={onDone} className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className={`w-64 border-r overflow-y-auto ${isDark ? "bg-[#18191d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
            <div className="p-4">
              <div className="mb-4">
                <div className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  ✨ For you
                </div>
              </div>

              <div className="space-y-1">
                {OPTIONS.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedCategory(option.type)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition ${
                      selectedCategory === option.type
                        ? isDark
                          ? "bg-[#1e1f23] shadow-sm font-medium text-gray-100"
                          : "bg-white shadow-sm font-medium text-gray-900"
                        : isDark
                          ? "hover:bg-[#1e1f23] text-gray-400"
                          : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{option.title}</div>
                      <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className={`flex-1 overflow-y-auto ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
            <div className="p-8">
              {/* Section Title */}
              <div className="mb-6">
                <h2 className={`text-xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                  {OPTIONS.find((o) => o.type === selectedCategory)?.title} templates
                </h2>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {OPTIONS.find((o) => o.type === selectedCategory)?.desc}
                </p>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => createDbFromTemplate(template.id)}
                    onMouseEnter={() => setSelectedTemplate(template.id)}
                    onMouseLeave={() => setSelectedTemplate(null)}
                    className={`group relative aspect-4/3 rounded-xl border-2 overflow-hidden hover:border-blue-500 transition-all hover:shadow-lg ${isDark ? "border-gray-700" : "border-gray-200"}`}
                  >
                    {/* Preview Area */}
                    <div className={`absolute inset-0 p-4 ${isDark ? "bg-gradient-to-br from-[#18191d] to-[#1e1f23]" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}>
                      <div className="h-full flex items-center justify-center">
                        {selectedCategory === "table" && (
                          <TableTemplatePreview templateId={template.id} isDark={isDark} />
                        )}
                        {selectedCategory === "board" && (
                          <BoardTemplatePreview templateId={template.id} isDark={isDark} />
                        )}
                        {selectedCategory === "timeline" && (
                          <TimelineTemplatePreview templateId={template.id} isDark={isDark} />
                        )}
                        {selectedCategory === "gallery" && (
                          <GalleryTemplatePreview templateId={template.id} isDark={isDark} />
                        )}
                        {selectedCategory === "todo" && (
                          <TodoTemplatePreview templateId={template.id} isDark={isDark} />
                        )}
                        {(selectedCategory === "text" ||
                          selectedCategory === "heading" ||
                          selectedCategory === "bullatedlist" ||
                          selectedCategory === "numberlist") && (
                          <GenericTemplatePreview type={selectedCategory} />
                        )}
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className={`absolute bottom-0 left-0 right-0 backdrop-blur-sm p-4 border-t ${isDark ? "bg-[#1e1f23]/95 border-gray-700" : "bg-white/95 border-gray-200"}`}>
                      <h3 className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>{template.name}</h3>
                      <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{template.desc}</p>
                    </div>

                    {/* Hover Overlay */}
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
                          Create
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- TEMPLATE PREVIEW COMPONENTS -------- */

function TableTemplatePreview({ templateId, isDark }: { templateId: number; isDark: boolean }) {
  if (templateId === 1) {
    return (
      <div className={`w-full rounded-lg p-3 text-[10px] ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
        <div className={`grid grid-cols-3 gap-2 font-semibold ${isDark ? "text-gray-400" : "text-gray-700"}`}>
          <div>Name</div>
          <div>Status</div>
          <div>Date</div>
        </div>
        <div className="mt-2 space-y-1">
          <div className={`h-5 rounded ${isDark ? "bg-[#18191d]" : "bg-gray-100"}`} />
          <div className={`h-5 rounded ${isDark ? "bg-[#18191d]" : "bg-gray-100"}`} />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full rounded-lg p-3 text-[10px] ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
      <div className={`grid grid-cols-3 gap-2 font-semibold ${isDark ? "text-gray-400" : "text-gray-700"}`}>
        <div>Task</div>
        <div>Status</div>
        <div>Due</div>
      </div>
      <div className="mt-2 space-y-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`grid grid-cols-3 gap-2 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
            <div>Task {i}</div>
            <div className="text-green-600">●</div>
            <div>Feb {10 + i}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoardTemplatePreview({ templateId, isDark }: { templateId: number; isDark: boolean }) {
  return (
    <div className="w-full grid grid-cols-3 gap-2 text-[9px]">
      {["Todo", "Doing", "Done"].map((col) => (
        <div key={col} className={`rounded-md p-2 ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
          <div className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-700"}`}>{col}</div>
          <div className="mt-2 space-y-1">
            {templateId === 1 ? (
              <div className={`h-6 rounded ${isDark ? "bg-[#18191d]" : "bg-gray-100"}`} />
            ) : (
              <>
                <div className="h-6 bg-blue-100 rounded flex items-center px-1 text-[8px]">
                  Task {col[0]}
                </div>
                <div className="h-6 bg-purple-100 rounded flex items-center px-1 text-[8px]">
                  Task {col[1]}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineTemplatePreview({ templateId, isDark }: { templateId: number; isDark: boolean }) {
  return (
    <div className={`w-full rounded-lg p-3 ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
      <div className={`text-[9px] mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
        {templateId === 1 ? "Empty timeline" : "Feb 2026"}
      </div>
      <div className="relative h-16">
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-300" />
        {templateId > 1 && (
          <>
            <div className="absolute top-1 left-2 right-1/2 h-5 bg-blue-200 rounded-sm text-[8px] flex items-center px-1">
              Task 1
            </div>
            <div className="absolute top-7 left-8 right-1/3 h-5 bg-green-200 rounded-sm text-[8px] flex items-center px-1">
              Task 2
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GalleryTemplatePreview({ templateId, isDark }: { templateId: number; isDark: boolean }) {
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`rounded-md overflow-hidden ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
          <div className={`h-12 ${templateId === 1 ? (isDark ? "bg-[#18191d]" : "bg-gray-100") : "bg-gradient-to-br from-blue-100 to-purple-100"}`} />
          <div className={`p-1 text-[8px] font-semibold ${isDark ? "text-gray-400" : "text-gray-700"}`}>
            {templateId === 1 ? "" : `Item ${i}`}
          </div>
        </div>
      ))}
    </div>
  );
}

function TodoTemplatePreview({ templateId, isDark }: { templateId: number; isDark: boolean }) {
  return (
    <div className={`w-full rounded-lg p-3 ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 text-[10px]">
            <div className={`w-3 h-3 rounded border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
            <div className={isDark ? "text-gray-400" : "text-gray-700"}>
              {templateId === 1 ? `Task ${i}` : `Daily task ${i}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericTemplatePreview({ type }: { type: string }) {
  return (
    <div className="w-full bg-white rounded-lg p-4 flex items-center justify-center">
      <div className="text-4xl">
        {type === "text" && "📝"}
        {type === "heading" && "📌"}
        {type === "bullatedlist" && "•"}
        {type === "numberlist" && "1."}
      </div>
    </div>
  );
}