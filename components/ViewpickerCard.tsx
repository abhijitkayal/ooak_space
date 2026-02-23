
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

"use client";

import { useState } from "react";
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
  { type: "todo", title: "ToDo", desc: "Task list", icon: "✅" },
  { type: "text", title: "Text", desc: "Text content", icon: "📝" },
  { type: "heading", title: "Heading", desc: "Heading content", icon: "📌" },
  { type: "bullatedlist", title: "Bulleted List", desc: "Bulleted list content", icon: "•" },
  { type: "numberlist", title: "Numbered List", desc: "Numbered list content", icon: "1." },
];

export default function ViewPickerCard({
  projectId,
  onDone,
}: {
  projectId: string;
  onDone: () => void;
}) {
  const [hovered, setHovered] = useState<ViewType>("table");
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState<ViewType | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const { fetchDatabases } = useWorkspaceStore();

  // ---------- CREATE DEFAULT ----------
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

  const handleDefaultCreate = async () => {
    if (!selectedType) return;
    await createDb(selectedType);
    setShowOptions(false);
  };

  // ---------- SAMPLE ----------
  const handleSampleCreate = async () => {
    if (!selectedType) return;

    const payload = {
      projectId,
      name: `Sample ${selectedType}`,
      icon: OPTIONS.find((o) => o.type === selectedType)?.icon || "📄",
      viewType: selectedType,
      rows: [
        { name: "Task 1", status: "Todo", date: "2026-02-10" },
        { name: "Task 2", status: "Doing", date: "2026-02-12" },
        { name: "Task 3", status: "Done", date: "2026-02-15" },
      ],
    };

    await fetch("/api/databases/sample", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await fetchDatabases(projectId);
    setShowOptions(false);
    onDone();
  };

  // ---------- CSV ----------
  const handleCsvImport = async () => {
    if (!csvFile || !selectedType) return;

    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("projectId", projectId);
    formData.append("viewType", selectedType);

    await fetch("/api/databases/import-csv", {
      method: "POST",
      body: formData,
    });

    await fetchDatabases(projectId);
    setShowOptions(false);
    onDone();
  };

  return (
    <>
      {/* MAIN LAYOUT (LEFT PREVIEW / RIGHT OPTIONS) */}
      <div className="flex gap-6">

        {/* ---------- LEFT SIDE PREVIEW ---------- */}
        <div className="w-[260px]">
          <div className="rounded-xl border p-3 bg-gray-50">
            <div className="text-sm font-bold">
              Preview: {OPTIONS.find((o) => o.type === hovered)?.title}
            </div>

            <div className="mt-3 rounded-xl bg-white border p-3">
              {hovered === "timeline" && <TimelineMiniPreview />}
              {hovered === "table" && <TableMiniPreview />}
              {hovered === "board" && <BoardMiniPreview />}
              {hovered === "gallery" && <GalleryMiniPreview />}
              {hovered === "todo" && <TodominiPreview />}
              {hovered === "text" && <TextMiniPreview />}
              {hovered === "heading" && <HeadingMiniPreview />}
              {hovered === "bullatedlist" && <BulletedListMiniPreview />}
              {hovered === "numberlist" && <NumberListMiniPreview />}
            </div>
          </div>
        </div>

        {/* ---------- RIGHT SIDE CONTENT ---------- */}
        <div className="flex-1 space-y-3">

          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Create database
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Database name..."
              className="mt-2 w-full px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* view options */}
          <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-2">
            {OPTIONS.map((o) => (
              <button
                key={o.type}
                onMouseEnter={() => setHovered(o.type)}
                onClick={() => {
                  setSelectedType(o.type);
                  setShowOptions(true);
                }}
                className="text-left p-3 rounded-xl border hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{o.icon}</span>
                  <span className="font-semibold text-sm">{o.title}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{o.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- OPTIONS MODAL ---------- */}
      {showOptions && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-[320px] space-y-3 shadow-xl">
            <div className="text-lg font-semibold">
              Create {selectedType} database
            </div>

            <button
              onClick={handleDefaultCreate}
              className="w-full border rounded-lg p-3 text-left hover:bg-gray-50"
            >
              <div className="font-semibold">Default</div>
              <div className="text-xs text-gray-500">Empty database</div>
            </button>

            <button
              onClick={handleSampleCreate}
              className="w-full border rounded-lg p-3 text-left hover:bg-gray-50"
            >
              <div className="font-semibold">Sample Data</div>
              <div className="text-xs text-gray-500">Create with dummy rows</div>
            </button>

            <div className="border rounded-lg p-3 space-y-2">
              <div className="font-semibold">Import CSV</div>

              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                className="text-xs border rounded-md border-gray-900 p-1 w-full"
              />

              <button
                onClick={handleCsvImport}
                disabled={!csvFile}
                className="w-full bg-black text-white rounded-md py-2 disabled:opacity-40"
              >
                Upload CSV
              </button>
            </div>

            <button
              onClick={() => setShowOptions(false)}
              className="text-xs text-gray-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* -------- MINI PREVIEWS -------- */



function TimelineMiniPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <span>February 2026</span>
        <span>Month</span>
      </div>

      <div className="relative h-[90px] overflow-hidden rounded-lg bg-gray-50 border">
        {/* vertical today line */}
        <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-red-400/70" />

        {/* cards */}
        <div className="absolute top-3 left-4 w-[55%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
          Card 1
        </div>

        <div className="absolute top-11 left-10 w-[65%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
          Card 2
        </div>

        <div className="absolute top-19 left-20 w-[70%] h-7 bg-white border rounded-lg shadow-sm flex items-center px-3 text-[11px] font-semibold">
          Card 3
        </div>
      </div>

      <div className="text-[10px] text-gray-500">
        Timeline shows items across a date range.
      </div>
    </div>
  );
}

function TableMiniPreview() {
  return (
    <div className="text-[11px] text-gray-600">
      <div className="grid grid-cols-3 gap-2 font-semibold">
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

function BoardMiniPreview() {
  return (
    <div className="grid grid-cols-3 gap-2 text-[11px]">
      {["Todo", "Doing", "Done"].map((col) => (
        <div key={col} className="rounded-lg border bg-gray-50 p-2">
          <div className="font-semibold text-gray-700">{col}</div>
          <div className="mt-2 space-y-2">
            <div className="h-7 rounded-md bg-white border" />
            <div className="h-7 rounded-md bg-white border" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryMiniPreview() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border bg-white overflow-hidden">
          <div className="h-10 bg-gray-100" />
          <div className="p-2 text-[11px] font-semibold text-gray-700">
            Card {i}
          </div>
        </div>
      ))}
    </div>
  );
}
function TodominiPreview() {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="px-3 py-2 bg-gray-50 border-b text-[11px] font-semibold text-gray-600">
        To-do
      </div>

      <div className="p-3 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-2">
            {/* checkbox */}
            <div className="w-4 h-4 mt-[2px] rounded border bg-white flex items-center justify-center">
              {i === 2 && (
                <div className="w-2.5 h-2.5 rounded-sm bg-gray-900" />
              )}
            </div>

            {/* text */}
            <div className="flex-1">
              <div
                className={`text-[12px] font-medium ${
                  i === 2 ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                Task {i}
              </div>

              <div className="text-[10px] text-gray-400">Due: Feb {10 + i}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextMiniPreview() {
  const cards = [
    {
      title: "Design homepage",
      tags: ["UI", "Website"],
      status: "In Progress",
    },
    {
      title: "Client meeting notes",
      tags: ["Work"],
      status: "Done",
    },
    {
      title: "Content ideas",
      tags: ["Marketing", "Ideas"],
      status: "Todo",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {cards.map((c, i) => (
        <div
          key={i}
          className="rounded-lg border bg-white overflow-hidden hover:shadow-sm transition"
        >
          {/* cover */}
          <div className="h-10 bg-gray-100" />

          <div className="p-2 space-y-1">
            {/* title */}
            <div className="text-[11px] font-semibold text-gray-800 line-clamp-2">
              {c.title}
            </div>

            {/* tags */}
            <div className="flex flex-wrap gap-1">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-1.5 py-[2px] rounded bg-gray-100 text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* status */}
            <div className="text-[9px] text-gray-500">
              Status: <span className="font-medium">{c.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function HeadingMiniPreview() {
  const cards = [
    {
      title: "Design homepage",
      tags: ["UI", "Website"],
      status: "In Progress",
    },
    { title: "Client meeting notes", tags: ["Work"], status: "Done" },
    { title: "Content ideas", tags: ["Marketing", "Ideas"], status: "Todo" },
  ];

  return (
    <div className="space-y-2">
      {/* ✅ Heading */}
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-gray-800">Gallery</div>
        <div className="text-[10px] text-gray-500">{cards.length} cards</div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-2">
        {cards.map((c, i) => (
          <div
            key={i}
            className="rounded-lg border bg-white overflow-hidden hover:shadow-sm transition"
          >
            {/* cover */}
            <div className="h-10 bg-gray-100" />

            <div className="p-2 space-y-1">
              {/* title */}
              <div className="text-[11px] font-semibold text-gray-800 line-clamp-2">
                {c.title}
              </div>

              {/* tags */}
              <div className="flex flex-wrap gap-1">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] px-1.5 py-[2px] rounded bg-gray-100 text-gray-600"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* status */}
              <div className="text-[9px] text-gray-500">
                Status: <span className="font-medium">{c.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BulletedListMiniPreview() {
  const items = [
    "Welcome to your page",
    "Click to edit anything",
    "Type / to see commands",
  ];

  return (
    <div className="space-y-2">
      {/* ✅ Heading */}
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-gray-800">
          Bulleted list
        </div>
        <div className="text-[10px] text-gray-500">{items.length} items</div>
      </div>

      {/* ✅ List */}
      <div className="rounded-lg border bg-white p-2">
        <div className="space-y-1">
          {items.map((text, i) => (
            <div key={i} className="flex items-start gap-2">
              {/* bullet */}
              <div className="w-3 flex justify-center pt-[3px]">
                <div className="w-[5px] h-[5px] rounded-full bg-gray-500" />
              </div>

              {/* text */}
              <div className="text-[11px] text-gray-700 leading-snug line-clamp-1">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NumberListMiniPreview() {
  const items = [
    "Write project overview",
    "Create database schema",
    "Build UI components",
  ];

  return (
    <div className="space-y-2">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-gray-800">
          Numbered list
        </div>
        <div className="text-[10px] text-gray-500">{items.length} items</div>
      </div>

      {/* List Box */}
      <div className="rounded-lg border bg-white p-2">
        <div className="space-y-1">
          {items.map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-md px-1 py-1 hover:bg-gray-50"
            >
              {/* Number */}
              <div className="w-4 text-[11px] text-gray-500 font-medium">
                {i + 1}.
              </div>

              {/* Text */}
              <div className="text-[11px] text-gray-700 leading-snug line-clamp-1">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}