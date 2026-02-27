// // // 'use client';

// // // import React, { useRef, useEffect } from 'react';
// // // import { useTheme } from 'next-themes';
// // // import { MoreVertical } from 'lucide-react';

// // // // --- Type Definitions ---
// // // interface TimelineTask {
// // //       id: string;
// // //       title: string;
// // //       date: string;
// // //       startTime: string; // e.g., "10:00"
// // //       endTime: string;   // e.g., "12:00"
// // //       tags: { label: string; color: string }[];
// // //       avatars: string[];
// // //       column: number; // 0 to 6 (Mon-Sun)
// // //       row: number;    // Vertical position index to avoid overlap
// // // }

// // // const days = [
// // //       { name: 'MON', date: '20' },
// // //       { name: 'TUE', date: '21' },
// // //       { name: 'WED', date: '22' },
// // //       { name: 'THU', date: '23' },
// // //       { name: 'FRI', date: '24' },
// // //       { name: 'SAT', date: '25' },
// // //       { name: 'SUN', date: '26' },
// // // ];

// // // const tasks: TimelineTask[] = [
// // //       {
// // //             id: '1',
// // //             title: 'Plan project launch',
// // //             date: 'Nov 4, 2023 at 12:13 am',
// // //             startTime: '10:00',
// // //             endTime: '12:00',
// // //             tags: [{ label: 'Research', color: 'default' }, { label: 'Low', color: 'green' }],
// // //             avatars: ['bg-gray-400', 'bg-gray-500'],
// // //             column: 0, // MON
// // //             row: 0
// // //       },
// // //       {
// // //             id: '2',
// // //             title: 'Develop marketing strategy',
// // //             date: 'Feb 10, 2024 at 6:00 pm',
// // //             startTime: '14:00',
// // //             endTime: '16:00',
// // //             tags: [{ label: 'Research', color: 'default' }, { label: 'Medium', color: 'yellow' }],
// // //             avatars: ['bg-gray-400', 'bg-gray-500'],
// // //             column: 2, // WED (spanning to THU visually in design, but let's place it)
// // //             row: 1
// // //       },
// // //       {
// // //             id: '3',
// // //             title: 'Design user interface',
// // //             date: 'Dec 15, 2023 at 3:45 pm',
// // //             startTime: '16:00',
// // //             endTime: '18:00',
// // //             tags: [{ label: 'Design Process', color: 'default' }, { label: 'High', color: 'pink' }],
// // //             avatars: ['bg-gray-400', 'bg-gray-500'],
// // //             column: 3, // THU
// // //             row: 2
// // //       },
// // //       {
// // //             id: '4',
// // //             title: 'Outline content structure',
// // //             date: 'Nov 4, 2023 at 12:13 am',
// // //             startTime: '11:00',
// // //             endTime: '13:00',
// // //             tags: [{ label: 'Research', color: 'default' }, { label: 'High', color: 'pink' }],
// // //             avatars: ['bg-gray-400', 'bg-gray-500'],
// // //             column: 5, // SAT
// // //             row: 1
// // //       },
// // //       {
// // //             id: '5',
// // //             title: 'Product market research',
// // //             date: 'Jan 20, 2024 at 9:30 am',
// // //             startTime: '09:00',
// // //             endTime: '11:00',
// // //             tags: [{ label: 'Research', color: 'default' }, { label: 'Low', color: 'pink' }],
// // //             avatars: ['bg-gray-400', 'bg-gray-500'],
// // //             column: 0, // MON (bottom one)
// // //             row: 3
// // //       },
// // //       {
// // //             id: '6',
// // //             title: 'Review team progress',
// // //             date: 'Mar 5, 2024 at 11:15 am',
// // //             startTime: '15:00',
// // //             endTime: '17:00',
// // //             tags: [{ label: 'Research', color: 'default' }, { label: 'High', color: 'pink' }],
// // //             avatars: ['bg-gray-400', 'bg-gray-500'],
// // //             column: 6, // SUN
// // //             row: 3
// // //       },
// // // ];

// // // export default function TimelineView() {
// // //       const { resolvedTheme } = useTheme();
// // //       const isDark = resolvedTheme === 'dark';
// // //       const scrollContainerRef = useRef<HTMLDivElement>(null);

// // //       // Center the view on mount (optional, but good for timeline)
// // //       useEffect(() => {
// // //             if (scrollContainerRef.current) {
// // //                   const scrollWidth = scrollContainerRef.current.scrollWidth;
// // //                   const clientWidth = scrollContainerRef.current.clientWidth;
// // //                   scrollContainerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
// // //             }
// // //       }, []);

// // //       const getTagStyles = (color: string) => {
// // //             switch (color) {
// // //                   case 'green': return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700';
// // //                   case 'yellow': return isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
// // //                   case 'pink': return isDark ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700';
// // //                   default: return isDark ? 'border border-gray-700 text-gray-400' : 'border border-gray-200 text-gray-600';
// // //             }
// // //       };

// // //       return (
// // //             <div className="flex-1 overflow-hidden flex flex-col h-full relative" style={{ minHeight: '600px' }}>
// // //                   {/* Current Time Indicator Line - Absolute Positioned over the whole grid */}
// // //                   <div className="absolute top-0 bottom-0 left-1/2 w-px bg-red-400 z-10 hidden md:block">
// // //                         <div className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-red-400"></div>
// // //                   </div>

// // //                   <div ref={scrollContainerRef} className="flex-1 overflow-x-auto overflow-y-auto">
// // //                         <div className="min-w-[1400px] h-full flex flex-col">
// // //                               {/* Header Row */}
// // //                               <div className={`flex border-b sticky top-0 z-20 ${isDark ? 'bg-slate-950 border-gray-800' : 'bg-rose-50 border-gray-100'}`}>
// // //                                     {days.map((day, index) => (
// // //                                           <div
// // //                                                 key={index}
// // //                                                 className={`flex-1 py-4 text-center border-r last:border-r-0 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
// // //                                           >
// // //                                                 <span className={`text-xs font-medium uppercase mr-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{day.name}</span>
// // //                                                 <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{day.date}</span>
// // //                                           </div>
// // //                                     ))}
// // //                               </div>

// // //                               {/* Grid Content */}
// // //                               <div className="flex-1 flex relative">
// // //                                     {/* Vertical Grid Lines */}
// // //                                     {days.map((_, index) => (
// // //                                           <div
// // //                                                 key={index}
// // //                                                 className={`flex-1 border-r last:border-r-0 h-full ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
// // //                                           ></div>
// // //                                     ))}

// // //                                     {/* Tasks Layer */}
// // //                                     <div className="absolute inset-0 p-4">
// // //                                           {tasks.map((task) => {
// // //                                                 // Calculate position based on column and row
// // //                                                 // This is a simplified positioning logic. In a real app, you'd calculate this dynamically.
// // //                                                 const left = `${(task.column / 7) * 100}%`;
// // //                                                 const width = '300px'; // Fixed width for cards as per design
// // //                                                 const top = `${task.row * 160 + 40}px`; // Staggered rows

// // //                                                 // Adjust left position to center in the column or span
// // //                                                 // For this demo, we'll just offset it slightly to look like the design
// // //                                                 const style = {
// // //                                                       left: `calc(${left} + 20px)`,
// // //                                                       top: top,
// // //                                                       width: width
// // //                                                 };

// // //                                                 return (
// // //                                                       <div
// // //                                                             key={task.id}
// // //                                                             style={style}
// // //                                                             className={`absolute p-4 rounded-2xl border shadow-sm transition-all hover:shadow-md cursor-pointer group
// // //                                             ${isDark ? 'bg-[#1F2125] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-100 hover:border-gray-200'}
// // //                                         `}
// // //                                                       >
// // //                                                             <div className="flex justify-between items-start mb-1">
// // //                                                                   <div className={`w-1 h-8 rounded-full mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
// // //                                                                   <div className="flex-1">
// // //                                                                         <h3 className={`font-semibold text-sm mb-0.5 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{task.title}</h3>
// // //                                                                         <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{task.date}</p>
// // //                                                                   </div>
// // //                                                                   <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
// // //                                                                         <MoreVertical size={14} />
// // //                                                                   </button>
// // //                                                             </div>

// // //                                                             <div className="flex items-center justify-between mt-4 pl-4">
// // //                                                                   <div className="flex gap-2">
// // //                                                                         {task.tags.map((tag, i) => (
// // //                                                                               <span key={i} className={`text-[10px] px-2 py-1 rounded-md font-medium ${getTagStyles(tag.color)}`}>
// // //                                                                                     {tag.label}
// // //                                                                               </span>
// // //                                                                         ))}
// // //                                                                   </div>

// // //                                                                   <div className="flex -space-x-1.5">
// // //                                                                         {task.avatars.map((_, i) => (
// // //                                                                               <div key={i} className={`w-5 h-5 rounded-full border bg-gray-300 ${isDark ? 'border-[#1F2125]' : 'border-white'}`}>
// // //                                                                                     <img src={`https://i.pravatar.cc/150?u=${task.id}${i}`} alt="avatar" className="w-full h-full rounded-full" />
// // //                                                                               </div>
// // //                                                                         ))}
// // //                                                                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] ${isDark ? 'bg-red-500/20 border-[#1F2125] text-red-400' : 'bg-red-100 border-white text-red-500'}`}>
// // //                                                                               +2
// // //                                                                         </div>
// // //                                                                   </div>
// // //                                                             </div>
// // //                                                       </div>
// // //                                                 );
// // //                                           })}
// // //                                     </div>
// // //                               </div>
// // //                         </div>
// // //                   </div>
// // //             </div>
// // //       );
// // // }


// // "use client";

// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import TimelineItemModal from "@/components/TimelineItemmodal";

// // type TimelineItem = {
// //   _id: string;
// //   title: string;
// //   startDate: string;
// //   endDate: string;
// //   assignedTo?: string;
// //   status?: string;
// //   comment?: string;
// // };

// // function startOfMonth(d: Date) {
// //   return new Date(d.getFullYear(), d.getMonth(), 1);
// // }

// // function endOfMonth(d: Date) {
// //   return new Date(d.getFullYear(), d.getMonth() + 1, 0);
// // }

// // function addDays(d: Date, days: number) {
// //   const x = new Date(d);
// //   x.setDate(x.getDate() + days);
// //   return x;
// // }

// // function daysBetween(a: Date, b: Date) {
// //   return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
// // }

// // function formatMonthYear(d: Date) {
// //   return d.toLocaleString("en-US", { month: "long", year: "numeric" });
// // }

// // export default function TimelineView({
// //   databaseId,
// //   isDark = false,
// // }: {
// //   databaseId: string;
// //   isDark?: boolean;
// // }) {
// //   const router = useRouter();
// //   const gridRef = useRef<HTMLDivElement | null>(null);

// //   const [items, setItems] = useState<TimelineItem[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentMonth, setCurrentMonth] = useState(new Date()); // Track current viewed month

// //   const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
// //   const [modalOpen, setModalOpen] = useState(false);

// //   const fetchItems = async () => {
// //     setLoading(true);
// //     const res = await fetch(`/api/timeline?databaseId=${databaseId}`);
// //     const data = await res.json();
// //     setItems(data);
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchItems();
// //   }, [databaseId]);

// //   const monthDate = useMemo(() => currentMonth, [currentMonth]);

// //   const monthStart = useMemo(() => startOfMonth(monthDate), [monthDate]);
// //   const monthEnd = useMemo(() => endOfMonth(monthDate), [monthDate]);

// //   const rangeStart = useMemo(() => addDays(monthStart, -3), [monthStart]);
// //   const rangeEnd = useMemo(() => addDays(monthEnd, 2), [monthEnd]);

// //   const totalDays = Math.max(1, daysBetween(rangeStart, rangeEnd) + 1);

// //   const today = new Date();
// //   today.setHours(0, 0, 0, 0); // Normalize to start of day
// //   const todayOffset = daysBetween(rangeStart, today);
// //   const todayPercent = (todayOffset / totalDays) * 100;

// //   // Navigation functions
// //   const goToPrevMonth = () => {
// //     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
// //   };

// //   const goToNextMonth = () => {
// //     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
// //   };

// //   const goToToday = () => {
// //     setCurrentMonth(new Date());
// //   };

// //   const ROW_HEIGHT = 56;
// //   const DAY_COL_WIDTH = 70;
// //   const GRID_WIDTH = totalDays * DAY_COL_WIDTH;

// //   // ✅ click empty grid = create 4-day card
// //   const createByClick = async (e: React.MouseEvent) => {
// //     if (!gridRef.current) return;

// //     // do not create if clicking on card
// //     const target = e.target as HTMLElement;
// //     if (target.closest("[data-timeline-card]")) return;

// //     const rect = gridRef.current.getBoundingClientRect();
// //     const x = e.clientX - rect.left;

// //     const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
// //     const start = addDays(rangeStart, dayIndex);
// //     const end = addDays(start, 3); // 4 days duration

// //     const res = await fetch("/api/timeline", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         databaseId,
// //         title: "New",
// //         startDate: start.toISOString(),
// //         endDate: end.toISOString(),
// //         status: "Todo",
// //         assignedTo: "",
// //         comment:"",
// //       }),
// //     });

// //     const created = await res.json();

// //     await fetchItems();

// //     // open modal immediately
// //     setSelectedItem(created);
// //     setModalOpen(true);
// //   };

// //   const createFromNewButton = async () => {
// //       console.log("hi");
// //   const start = new Date();
// //   const end = addDays(start, 3); // 4 days duration

// //   const res = await fetch("/api/timeline", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({
// //       databaseId,
// //       title: "New",
// //       startDate: start.toISOString(),
// //       endDate: end.toISOString(),
// //       status: "Todo",
// //       assignedTo: "",
// //       comment:"",
// //     }),
// //   });

// //   const created = await res.json();

// //   await fetchItems();

// //   setSelectedItem(created);
// //   setModalOpen(true);
// // };


// //   if (loading) {
// //     return <div className="p-6 text-sm text-gray-600">Loading timeline...</div>;
// //   }

// //   return (
// //     <>
// //       <div className="rounded-2xl border bg-white overflow-hidden">
// //         {/* header */}
// //         <div className="flex items-center justify-between px-4 py-3 border-b">
// //           <div className="flex items-center gap-3">
// //             <button className="text-gray-500 hover:text-gray-800">»</button>
// //             <div className="font-semibold">{formatMonthYear(monthStart)}</div>
// //           </div>

// //           <div className="flex items-center gap-4 text-sm">
// //             {/* ✅ Manage in Calendar */}
// //             <button
// //               onClick={() => router.push(`/schedule?databaseId=${databaseId}`)}
// //               className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 font-semibold"
// //             >
// //               Manage in Calendar
// //             </button>

// //             <div className="flex items-center gap-1 text-gray-500">
// //               <span>Month</span>
// //               <span>▾</span>
// //             </div>

// //             <div className="flex items-center gap-2 text-gray-500">
// //               <button onClick={goToPrevMonth} className="hover:text-gray-800 px-2 py-1">‹</button>
// //               <button onClick={goToToday} className="hover:text-gray-800 px-3 py-1 rounded hover:bg-gray-100">Today</button>
// //               <button onClick={goToNextMonth} className="hover:text-gray-800 px-2 py-1">›</button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* grid */}
// //         <div className="relative overflow-x-auto">
// //           <div style={{ minWidth: GRID_WIDTH + 260 }}>
// //             {/* Top Day Row */}
// //             <div className="flex border-b">
// //               <div className="w-[260px] shrink-0 bg-white" />

// //               <div className="relative" style={{ width: GRID_WIDTH, height: 44 }}>
// //                 <div className="absolute inset-0 flex pointer-events-none">
// //                   {Array.from({ length: totalDays }).map((_, i) => (
// //                     <div
// //                       key={i}
// //                       className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
// //                       style={{ width: DAY_COL_WIDTH }}
// //                     />
// //                   ))}
// //                 </div>

// //                 <div className="absolute inset-0 flex pointer-events-none">
// //                   {Array.from({ length: totalDays }).map((_, i) => {
// //                     const d = addDays(rangeStart, i);
// //                     const isToday =
// //                       d.toDateString() === new Date().toDateString();

// //                     return (
// //                       <div
// //                         key={i}
// //                         className="flex items-center justify-center text-sm text-gray-500"
// //                         style={{ width: DAY_COL_WIDTH }}
// //                       >
// //                         <div
// //                           className={`w-9 h-9 flex items-center justify-center rounded-full ${
// //                             isToday
// //                               ? "bg-red-500 text-white font-bold"
// //                               : "hover:bg-gray-100"
// //                           }`}
// //                         >
// //                           {d.getDate()}
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>

// //                 {todayOffset >= 0 && todayOffset <= totalDays && (
// //                   <div
// //                     className="absolute top-[38px] w-3 h-3 rounded-full bg-red-500"
// //                     style={{
// //                       left: `calc(${todayPercent}% - 6px)`,
// //                     }}
// //                   />
// //                 )}
// //               </div>
// //             </div>

// //             {/* Body */}
// //             <div className="relative flex">
// //               {/* left */}
// //               <div className="w-[260px] shrink-0 border-r bg-white">
// //                 <div style={{ height: items.length * ROW_HEIGHT }} />

// //                 <button
// //   onClick={createFromNewButton}
// //   className="flex items-center gap-2 px-4 py-4 text-gray-500 hover:text-gray-800"
// // >
// //   <span className="text-xl">+</span>
// //   <span className="text-base">New</span>
// // </button>

// //               </div>

// //               {/* canvas */}
// //               <div
// //                 ref={gridRef}
// //                 onClick={createByClick}
// //                 className="relative cursor-crosshair"
// //                 style={{
// //                   width: GRID_WIDTH,
// //                   height: items.length * ROW_HEIGHT + 64,
// //                 }}
// //               >
// //                 <div className="absolute inset-0 flex">
// //                   {Array.from({ length: totalDays }).map((_, i) => (
// //                     <div
// //                       key={i}
// //                       className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
// //                       style={{ width: DAY_COL_WIDTH }}
// //                     />
// //                   ))}
// //                 </div>

// //                 {todayOffset >= 0 && todayOffset <= totalDays && (
// //                   <div
// //                     className="absolute top-0 bottom-0 w-[3px] bg-red-500 shadow-lg"
// //                     style={{
// //                       left: `calc(${todayPercent}% - 1.5px)`,
// //                       boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
// //                       zIndex: 20,
// //                     }}
// //                   />
// //                 )}

// //                 <div className="relative">
// //                   {items.map((it) => {
// //                     const s = new Date(it.startDate);
// //                     const e = new Date(it.endDate);

// //                     const startOffset = daysBetween(rangeStart, s);
// //                     const duration = Math.max(1, daysBetween(s, e) + 1);

// //                     const leftPx = startOffset * DAY_COL_WIDTH;
// //                     const widthPx = Math.max(duration * DAY_COL_WIDTH, 180);

// //                     return (
// //                       <div key={it._id} className="relative" style={{ height: ROW_HEIGHT }}>
// //                         <div
// //                           data-timeline-card
// //                           onClick={(ev) => {
// //                             ev.stopPropagation();
// //                             setSelectedItem(it);
// //                             setModalOpen(true);
// //                           }}
// //                           className="absolute top-[10px] h-[44px] rounded-xl border bg-white shadow-sm flex items-center px-4 font-semibold text-gray-800 hover:bg-gray-50 cursor-pointer"
// //                           style={{
// //                             left: leftPx,
// //                             width: widthPx,
// //                           }}
// //                         >
// //                           {it.title}
// //                           <div className="ml-auto flex items-center">
// //                             <div className="w-2 h-2 rounded-full bg-gray-300" />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>

// //                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[120px] h-2 rounded-full bg-gray-300/60" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* modal */}
// //       {selectedItem && (
// //         <TimelineItemModal
// //           isOpen={modalOpen}
// //           onClose={() => setModalOpen(false)}
// //           item={selectedItem}
// //           isDark={isDark}
// //           onSaved={fetchItems}
// //         />
// //       )}
// //     </>
// //   );
// // }
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import TimelineItemModal from "@/components/TimelineItemmodal";

// type TimelineItem = {
//   _id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   assignedTo?: string;
//   status?: string;
//   comment?: string;
// };

// function startOfMonth(d: Date) {
//   return new Date(d.getFullYear(), d.getMonth(), 1);
// }

// function endOfMonth(d: Date) {
//   return new Date(d.getFullYear(), d.getMonth() + 1, 0);
// }

// function addDays(d: Date, days: number) {
//   const x = new Date(d);
//   x.setDate(x.getDate() + days);
//   return x;
// }

// function daysBetween(a: Date, b: Date) {
//   return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
// }

// function formatMonthYear(d: Date) {
//   return d.toLocaleString("en-US", { month: "long", year: "numeric" });
// }

// export default function TimelineView({
//   databaseId,
//   isDark = false,
// }: {
//   databaseId: string;
//   isDark?: boolean;
// }) {
//   const router = useRouter();
//   const gridRef = useRef<HTMLDivElement | null>(null);

//   const [items, setItems] = useState<TimelineItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState(new Date()); // Track current viewed month

//   const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   // Dragging state for +New button
//   const [isDraggingNew, setIsDraggingNew] = useState(false);
//   const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
//   const [ghostPosition, setGhostPosition] = useState({ left: 0, top: 0 });

//   // Dragging state for existing cards
//   const [draggingCard, setDraggingCard] = useState<TimelineItem | null>(null);
//   const [draggedCardDuration, setDraggedCardDuration] = useState(0);
//   const [cardDragOffset, setCardDragOffset] = useState({ x: 0, y: 0 });

//   const fetchItems = async () => {
//     setLoading(true);
//     const res = await fetch(`/api/timeline?databaseId=${databaseId}`);
//     const data = await res.json();
//     setItems(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (databaseId) {
//       (async () => {
//         setLoading(true);
//         const res = await fetch(`/api/timeline?databaseId=${databaseId}`);
//         const data = await res.json();
//         setItems(data);
//         setLoading(false);
//       })();
//     }
//   }, [databaseId]);

//   const monthDate = useMemo(() => currentMonth, [currentMonth]);

//   const monthStart = useMemo(() => startOfMonth(monthDate), [monthDate]);
//   const monthEnd = useMemo(() => endOfMonth(monthDate), [monthDate]);

//   const rangeStart = useMemo(() => addDays(monthStart, -3), [monthStart]);
//   const rangeEnd = useMemo(() => addDays(monthEnd, 2), [monthEnd]);

//   const totalDays = Math.max(1, daysBetween(rangeStart, rangeEnd) + 1);

//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Normalize to start of day
//   const todayOffset = daysBetween(rangeStart, today);
//   const todayPercent = (todayOffset / totalDays) * 100;

//   // Navigation functions
//   const goToPrevMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
//   };

//   const goToToday = () => {
//     setCurrentMonth(new Date());
//   };

//   const ROW_HEIGHT = 56;
//   const DAY_COL_WIDTH = 70;
//   const GRID_WIDTH = totalDays * DAY_COL_WIDTH;

//   // ✅ Drag handlers for +New button
//   const handleNewButtonMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsDraggingNew(true);
//     setDragPosition({ x: e.clientX, y: e.clientY });
//   };

//   // ✅ Drag handlers for existing cards
//   const handleCardMouseDown = (e: React.MouseEvent, item: TimelineItem) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const s = new Date(item.startDate);
//     const endDate = new Date(item.endDate);
//     const duration = Math.max(1, daysBetween(s, endDate) + 1);

//     setDraggingCard(item);
//     setDraggedCardDuration(duration);
//     setDragPosition({ x: e.clientX, y: e.clientY });

//     // Calculate offset from card's left edge
//     const target = e.currentTarget as HTMLElement;
//     const rect = target.getBoundingClientRect();
//     setCardDragOffset({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   useEffect(() => {
//     if (!isDraggingNew && !draggingCard) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       setDragPosition({ x: e.clientX, y: e.clientY });

//       // Calculate ghost position relative to grid
//       if (gridRef.current) {
//         const rect = gridRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         // Snap to day columns
//         const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
//         const rowIndex = Math.max(0, Math.floor(y / ROW_HEIGHT));

//         const leftPx = dayIndex * DAY_COL_WIDTH;
//         const topPx = rowIndex * ROW_HEIGHT + 10;

//         setGhostPosition({ left: leftPx, top: topPx });
//       }
//     };

//     const handleMouseUp = async (e: MouseEvent) => {
//       if (gridRef.current) {
//         const rect = gridRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left;

//         // Only create/update if dropped inside the grid
//         if (x >= 0 && x <= GRID_WIDTH) {
//           const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
//           const start = addDays(rangeStart, dayIndex);

//           if (isDraggingNew) {
//             // Create new task
//             const end = addDays(start, 3); // 4 days duration

//             const res = await fetch("/api/timeline", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 databaseId,
//                 title: "New",
//                 startDate: start.toISOString(),
//                 endDate: end.toISOString(),
//                 status: "Todo",
//                 assignedTo: "",
//                 comment: "",
//               }),
//             });

//             const created = await res.json();

//             await fetchItems();

//             // open modal immediately
//             setSelectedItem(created);
//             setModalOpen(true);
//           } else if (draggingCard) {
//             // Update existing card position
//             const end = addDays(start, draggedCardDuration - 1);

//             await fetch("/api/timeline", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 _id: draggingCard._id,
//                 startDate: start.toISOString(),
//                 endDate: end.toISOString(),
//               }),
//             });

//             await fetchItems();
//           }
//         }
//       }

//       setIsDraggingNew(false);
//       setDraggingCard(null);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDraggingNew, draggingCard, draggedCardDuration, databaseId, rangeStart, GRID_WIDTH, DAY_COL_WIDTH, ROW_HEIGHT]);

//   // ✅ click empty grid = create 4-day card
//   const createByClick = async (e: React.MouseEvent) => {
//     if (!gridRef.current) return;

//     // do not create if clicking on card
//     const target = e.target as HTMLElement;
//     if (target.closest("[data-timeline-card]")) return;

//     const rect = gridRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;

//     const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
//     const start = addDays(rangeStart, dayIndex);
//     const end = addDays(start, 3); // 4 days duration

//     const res = await fetch("/api/timeline", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         databaseId,
//         title: "New",
//         startDate: start.toISOString(),
//         endDate: end.toISOString(),
//         status: "Todo",
//         assignedTo: "",
//         comment:"",
//       }),
//     });

//     const created = await res.json();

//     await fetchItems();

//     // open modal immediately
//     setSelectedItem(created);
//     setModalOpen(true);
//   };

//   const createFromNewButton = async () => {
//       console.log("hi");
//   const start = new Date();
//   const end = addDays(start, 3); // 4 days duration

//   const res = await fetch("/api/timeline", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       databaseId,
//       title: "New",
//       startDate: start.toISOString(),
//       endDate: end.toISOString(),
//       status: "Todo",
//       assignedTo: "",
//       comment:"",
//     }),
//   });

//   const created = await res.json();

//   await fetchItems();

//   setSelectedItem(created);
//   setModalOpen(true);
// };


//   if (loading) {
//     return <div className="p-6 text-sm text-gray-600">Loading timeline...</div>;
//   }

//   return (
//     <>
//       <div className="rounded-2xl border bg-white overflow-hidden">
//         {/* header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <div className="flex items-center gap-3">
//             <button className="text-gray-500 hover:text-gray-800">»</button>
//             <div className="font-semibold">{formatMonthYear(monthStart)}</div>
//           </div>

//           <div className="flex items-center gap-4 text-sm">
//             {/* ✅ Manage in Calendar */}
//             <button
//               onClick={() => router.push(`/schedule?databaseId=${databaseId}`)}
//               className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 font-semibold"
//             >
//               Manage in Calendar
//             </button>

//             <div className="flex items-center gap-1 text-gray-500">
//               <span>Month</span>
//               <span>▾</span>
//             </div>

//             <div className="flex items-center gap-2 text-gray-500">
//               <button onClick={goToPrevMonth} className="hover:text-gray-800 px-2 py-1">‹</button>
//               <button onClick={goToToday} className="hover:text-gray-800 px-3 py-1 rounded hover:bg-gray-100">Today</button>
//               <button onClick={goToNextMonth} className="hover:text-gray-800 px-2 py-1">›</button>
//             </div>
//           </div>
//         </div>

//         {/* grid */}
//         <div className="relative overflow-x-auto">
//           <div style={{ minWidth: GRID_WIDTH + 260 }}>
//             {/* Top Day Row */}
//             <div className="flex border-b">
//               <div className="w-[260px] shrink-0 bg-white" />

//               <div className="relative" style={{ width: GRID_WIDTH, height: 44 }}>
//                 <div className="absolute inset-0 flex pointer-events-none">
//                   {Array.from({ length: totalDays }).map((_, i) => (
//                     <div
//                       key={i}
//                       className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                       style={{ width: DAY_COL_WIDTH }}
//                     />
//                   ))}
//                 </div>

//                 <div className="absolute inset-0 flex pointer-events-none">
//                   {Array.from({ length: totalDays }).map((_, i) => {
//                     const d = addDays(rangeStart, i);
//                     const isToday =
//                       d.toDateString() === new Date().toDateString();

//                     return (
//                       <div
//                         key={i}
//                         className="flex items-center justify-center text-sm text-gray-500"
//                         style={{ width: DAY_COL_WIDTH }}
//                       >
//                         <div
//                           className={`w-9 h-9 flex items-center justify-center rounded-full ${
//                             isToday
//                               ? "bg-red-500 text-white font-bold"
//                               : "hover:bg-gray-100"
//                           }`}
//                         >
//                           {d.getDate()}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {todayOffset >= 0 && todayOffset <= totalDays && (
//                   <div
//                     className="absolute top-[38px] w-3 h-3 rounded-full bg-red-500"
//                     style={{
//                       left: `calc(${todayPercent}% - 6px)`,
//                     }}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Body */}
//             <div className="relative flex">
//               {/* left */}
//               <div className="w-[260px] shrink-0 border-r bg-white">
//                 <div style={{ height: items.length * ROW_HEIGHT }} />

//                 <button
//                   onMouseDown={handleNewButtonMouseDown}
//                   onClick={!isDraggingNew ? createFromNewButton : undefined}
//                   className="flex items-center gap-2 px-4 py-4 text-gray-500 hover:text-gray-800 cursor-grab active:cursor-grabbing"
//                 >
//                   <span className="text-xl">+</span>
//                   <span className="text-base">New</span>
//                 </button>

//               </div>

//               {/* canvas */}
//               <div
//                 ref={gridRef}
//                 onClick={createByClick}
//                 className="relative cursor-crosshair"
//                 style={{
//                   width: GRID_WIDTH,
//                   height: items.length * ROW_HEIGHT + 64,
//                 }}
//               >
//                 <div className="absolute inset-0 flex">
//                   {Array.from({ length: totalDays }).map((_, i) => (
//                     <div
//                       key={i}
//                       className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                       style={{ width: DAY_COL_WIDTH }}
//                     />
//                   ))}
//                 </div>

//                 {todayOffset >= 0 && todayOffset <= totalDays && (
//                   <div
//                     className="absolute top-0 bottom-0 w-[3px] bg-red-500 shadow-lg"
//                     style={{
//                       left: `calc(${todayPercent}% - 1.5px)`,
//                       boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
//                       zIndex: 20,
//                     }}
//                   />
//                 )}

//                 {/* Ghost preview while dragging new button */}
//                 {isDraggingNew && (
//                   <div
//                     className="absolute h-[44px] rounded-xl border-2 border-dashed border-blue-400 bg-blue-50/50 flex items-center px-4 font-semibold text-blue-600 pointer-events-none"
//                     style={{
//                       left: ghostPosition.left,
//                       top: ghostPosition.top,
//                       width: 4 * DAY_COL_WIDTH, // 4 days duration
//                       zIndex: 30,
//                     }}
//                   >
//                     New
//                     <div className="ml-auto flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-400" />
//                     </div>
//                   </div>
//                 )}

//                 {/* Ghost preview while dragging existing card */}
//                 {draggingCard && (
//                   <div
//                     className="absolute h-[44px] rounded-xl border-2 border-dashed border-green-400 bg-green-50/50 flex items-center px-4 font-semibold text-green-600 pointer-events-none"
//                     style={{
//                       left: ghostPosition.left,
//                       top: ghostPosition.top,
//                       width: Math.max(draggedCardDuration * DAY_COL_WIDTH, 180),
//                       zIndex: 30,
//                     }}
//                   >
//                     {draggingCard.title}
//                     <div className="ml-auto flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-green-400" />
//                     </div>
//                   </div>
//                 )}

//                 <div className="relative">
//                   {items.map((it) => {
//                     const s = new Date(it.startDate);
//                     const e = new Date(it.endDate);

//                     const startOffset = daysBetween(rangeStart, s);
//                     const duration = Math.max(1, daysBetween(s, e) + 1);

//                     const leftPx = startOffset * DAY_COL_WIDTH;
//                     const widthPx = Math.max(duration * DAY_COL_WIDTH, 180);

//                     // Hide card if it's being dragged
//                     const isBeingDragged = draggingCard?._id === it._id;

//                     return (
//                       <div key={it._id} className="relative" style={{ height: ROW_HEIGHT }}>
//                         <div
//                           data-timeline-card
//                           onMouseDown={(e) => handleCardMouseDown(e, it)}
//                           onClick={(ev) => {
//                             ev.stopPropagation();
//                             if (!draggingCard) {
//                               setSelectedItem(it);
//                               setModalOpen(true);
//                             }
//                           }}
//                           className={`absolute top-[10px] h-[44px] rounded-xl border bg-white shadow-sm flex items-center px-4 font-semibold text-gray-800 hover:bg-gray-50 cursor-grab active:cursor-grabbing transition-opacity ${
//                             isBeingDragged ? 'opacity-30' : 'opacity-100'
//                           }`}
//                           style={{
//                             left: leftPx,
//                             width: widthPx,
//                           }}
//                         >
//                           {it.title}
//                           <div className="ml-auto flex items-center">
//                             <div className="w-2 h-2 rounded-full bg-gray-300" />
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[120px] h-2 rounded-full bg-gray-300/60" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating cursor preview while dragging +New */}
//       {isDraggingNew && (
//         <div
//           className="fixed pointer-events-none z-50 bg-white border-2 border-blue-400 rounded-xl shadow-lg px-4 py-2 font-semibold text-blue-600"
//           style={{
//             left: dragPosition.x + 10,
//             top: dragPosition.y + 10,
//           }}
//         >
//           + New Task
//         </div>
//       )}

//       {/* Floating cursor preview while dragging existing card */}
//       {draggingCard && (
//         <div
//           className="fixed pointer-events-none z-50 bg-white border-2 border-green-400 rounded-xl shadow-lg px-4 py-2 font-semibold text-green-600"
//           style={{
//             left: dragPosition.x + 10,
//             top: dragPosition.y + 10,
//           }}
//         >
//           📅 {draggingCard.title}
//         </div>
//       )}

//       {/* modal */}
//       {selectedItem && (
//         <TimelineItemModal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           item={selectedItem}
//           isDark={isDark}
//           onSaved={fetchItems}
//         />
//       )}
//     </>
//   );
// }
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import TimelineItemModal from "@/components/TimelineItemmodal";

// type TimelineItem = {
//   _id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   assignedTo?: string;
//   status?: string;
//   comment?: string;
// };

// function startOfMonth(d: Date) {
//   return new Date(d.getFullYear(), d.getMonth(), 1);
// }

// function endOfMonth(d: Date) {
//   return new Date(d.getFullYear(), d.getMonth() + 1, 0);
// }

// function addDays(d: Date, days: number) {
//   const x = new Date(d);
//   x.setDate(x.getDate() + days);
//   return x;
// }

// function daysBetween(a: Date, b: Date) {
//   return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
// }

// function formatMonthYear(d: Date) {
//   return d.toLocaleString("en-US", { month: "long", year: "numeric" });
// }

// export default function TimelineView({
//   databaseId,
//   isDark = false,
// }: {
//   databaseId: string;
//   isDark?: boolean;
// }) {
//   const router = useRouter();
//   const gridRef = useRef<HTMLDivElement | null>(null);

//   const [items, setItems] = useState<TimelineItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState(new Date()); // Track current viewed month

//   const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   // Dragging state for +New button
//   const [isDraggingNew, setIsDraggingNew] = useState(false);
//   const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
//   const [ghostPosition, setGhostPosition] = useState({ left: 0, top: 0 });

//   // Dragging state for existing cards
//   const [draggingCard, setDraggingCard] = useState<TimelineItem | null>(null);
//   const [draggedCardDuration, setDraggedCardDuration] = useState(0);
//   const [cardDragOffset, setCardDragOffset] = useState({ x: 0, y: 0 });

//   const fetchItems = async () => {
//     setLoading(true);
//     const res = await fetch(`/api/timeline?databaseId=${databaseId}`);
//     const data = await res.json();
//     setItems(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (databaseId) {
//       (async () => {
//         setLoading(true);
//         const res = await fetch(`/api/timeline?databaseId=${databaseId}`);
//         const data = await res.json();
//         setItems(data);
//         setLoading(false);
//       })();
//     }
//   }, [databaseId]);

//   const monthDate = useMemo(() => currentMonth, [currentMonth]);

//   const monthStart = useMemo(() => startOfMonth(monthDate), [monthDate]);
//   const monthEnd = useMemo(() => endOfMonth(monthDate), [monthDate]);

//   const rangeStart = useMemo(() => addDays(monthStart, -3), [monthStart]);
//   const rangeEnd = useMemo(() => addDays(monthEnd, 2), [monthEnd]);

//   const totalDays = Math.max(1, daysBetween(rangeStart, rangeEnd) + 1);

//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Normalize to start of day
//   const todayOffset = daysBetween(rangeStart, today);
//   const todayPercent = (todayOffset / totalDays) * 100;

//   // Navigation functions
//   const goToPrevMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
//   };

//   const goToToday = () => {
//     setCurrentMonth(new Date());
//   };

//   const ROW_HEIGHT = 56;
//   const DAY_COL_WIDTH = 70;
//   const GRID_WIDTH = totalDays * DAY_COL_WIDTH;

//   // ✅ Drag handlers for +New button
//   const handleNewButtonMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsDraggingNew(true);
//     setDragPosition({ x: e.clientX, y: e.clientY });
//   };

//   // ✅ Drag handlers for existing cards
//   const handleCardMouseDown = (e: React.MouseEvent, item: TimelineItem) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const s = new Date(item.startDate);
//     const endDate = new Date(item.endDate);
//     const duration = Math.max(1, daysBetween(s, endDate) + 1);

//     setDraggingCard(item);
//     setDraggedCardDuration(duration);
//     setDragPosition({ x: e.clientX, y: e.clientY });

//     // Calculate offset from card's left edge
//     const target = e.currentTarget as HTMLElement;
//     const rect = target.getBoundingClientRect();
//     setCardDragOffset({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   useEffect(() => {
//     if (!isDraggingNew && !draggingCard) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       setDragPosition({ x: e.clientX, y: e.clientY });

//       // Calculate ghost position relative to grid
//       if (gridRef.current) {
//         const rect = gridRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         // Snap to day columns
//         const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
//         const rowIndex = Math.max(0, Math.floor(y / ROW_HEIGHT));

//         const leftPx = dayIndex * DAY_COL_WIDTH;
//         const topPx = rowIndex * ROW_HEIGHT + 10;

//         setGhostPosition({ left: leftPx, top: topPx });
//       }
//     };

//     const handleMouseUp = async (e: MouseEvent) => {
//       if (gridRef.current) {
//         const rect = gridRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left;

//         // Only create/update if dropped inside the grid
//         if (x >= 0 && x <= GRID_WIDTH) {
//           const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
//           const start = addDays(rangeStart, dayIndex);

//           if (isDraggingNew) {
//             // Create new task
//             const end = addDays(start, 3); // 4 days duration

//             const res = await fetch("/api/timeline", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 databaseId,
//                 title: "New",
//                 startDate: start.toISOString(),
//                 endDate: end.toISOString(),
//                 status: "Todo",
//                 assignedTo: "",
//                 comment: "",
//               }),
//             });

//             const created = await res.json();

//             await fetchItems();

//             // open modal immediately
//             setSelectedItem(created);
//             setModalOpen(true);
//           } else if (draggingCard) {
//             // Update existing card position
//             const end = addDays(start, draggedCardDuration - 1);

//             await fetch("/api/timeline", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 _id: draggingCard._id,
//                 startDate: start.toISOString(),
//                 endDate: end.toISOString(),
//               }),
//             });

//             await fetchItems();
//           }
//         }
//       }

//       setIsDraggingNew(false);
//       setDraggingCard(null);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDraggingNew, draggingCard, draggedCardDuration, databaseId, rangeStart, GRID_WIDTH, DAY_COL_WIDTH, ROW_HEIGHT]);

//   // ✅ click empty grid = create 4-day card
//   const createByClick = async (e: React.MouseEvent) => {
//     if (!gridRef.current) return;

//     // do not create if clicking on card
//     const target = e.target as HTMLElement;
//     if (target.closest("[data-timeline-card]")) return;

//     const rect = gridRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;

//     const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
//     const start = addDays(rangeStart, dayIndex);
//     const end = addDays(start, 3); // 4 days duration

//     const res = await fetch("/api/timeline", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         databaseId,
//         title: "New",
//         startDate: start.toISOString(),
//         endDate: end.toISOString(),
//         status: "Todo",
//         assignedTo: "",
//         comment:"",
//       }),
//     });

//     const created = await res.json();

//     await fetchItems();

//     // open modal immediately
//     setSelectedItem(created);
//     setModalOpen(true);
//   };

//   const createFromNewButton = async () => {
//       console.log("hi");
//   const start = new Date();
//   const end = addDays(start, 3); // 4 days duration

//   const res = await fetch("/api/timeline", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       databaseId,
//       title: "New",
//       startDate: start.toISOString(),
//       endDate: end.toISOString(),
//       status: "Todo",
//       assignedTo: "",
//       comment:"",
//     }),
//   });

//   const created = await res.json();

//   await fetchItems();

//   setSelectedItem(created);
//   setModalOpen(true);
// };


//   if (loading) {
//     return (
//       <div className={`p-6 text-sm ${
//         isDark ? 'text-gray-400' : 'text-gray-600'
//       }`}>
//         Loading timeline...
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className={`rounded-2xl border overflow-hidden ${
//         isDark 
//           ? 'bg-[#18191d] border-gray-800' 
//           : 'bg-white border-gray-200'
//       }`}>
//         {/* header */}
//         <div className={`flex items-center justify-between px-4 py-3 border-b ${
//           isDark ? 'border-gray-800' : 'border-gray-200'
//         }`}>
//           <div className="flex items-center gap-3">
//             <button className={`${
//               isDark 
//                 ? 'text-gray-400 hover:text-gray-200' 
//                 : 'text-gray-500 hover:text-gray-800'
//             }`}>»</button>
//             <div className={`font-semibold ${
//               isDark ? 'text-gray-100' : 'text-gray-900'
//             }`}>{formatMonthYear(monthStart)}</div>
//           </div>

//           <div className="flex items-center gap-4 text-sm">
//             {/* ✅ Manage in Calendar */}
//             <button
//               onClick={() => router.push(`/schedule?databaseId=${databaseId}`)}
//               className={`px-3 py-1.5 rounded-lg border font-semibold ${
//                 isDark
//                   ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
//                   : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               Manage in Calendar
//             </button>

//             <div className={`flex items-center gap-1 ${
//               isDark ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               <span>Month</span>
//               <span>▾</span>
//             </div>

//             <div className={`flex items-center gap-2 ${
//               isDark ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               <button onClick={goToPrevMonth} className={`px-2 py-1 ${
//                 isDark ? 'hover:text-gray-200' : 'hover:text-gray-800'
//               }`}>‹</button>
//               <button onClick={goToToday} className={`px-3 py-1 rounded ${
//                 isDark 
//                   ? 'hover:text-gray-200 hover:bg-gray-800' 
//                   : 'hover:text-gray-800 hover:bg-gray-100'
//               }`}>Today</button>
//               <button onClick={goToNextMonth} className={`px-2 py-1 ${
//                 isDark ? 'hover:text-gray-200' : 'hover:text-gray-800'
//               }`}>›</button>
//             </div>
//           </div>
//         </div>

//         {/* grid */}
//         <div className="relative overflow-x-auto">
//           <div style={{ minWidth: GRID_WIDTH + 260 }}>
//             {/* Top Day Row */}
//             <div className={`flex border-b ${
//               isDark ? 'border-gray-800' : 'border-gray-200'
//             }`}>
//               <div className={`w-[260px] shrink-0 ${
//                 isDark ? 'bg-[#18191d]' : 'bg-white'
//               }`} />

//               <div className="relative" style={{ width: GRID_WIDTH, height: 44 }}>
//                 <div className="absolute inset-0 flex pointer-events-none">
//                   {Array.from({ length: totalDays }).map((_, i) => (
//                     <div
//                       key={i}
//                       className={isDark 
//                         ? (i % 2 === 0 ? "bg-[#18191d]" : "bg-[#1a1b1f]")
//                         : (i % 2 === 0 ? "bg-white" : "bg-gray-50")
//                       }
//                       style={{ width: DAY_COL_WIDTH }}
//                     />
//                   ))}
//                 </div>

//                 <div className="absolute inset-0 flex pointer-events-none">
//                   {Array.from({ length: totalDays }).map((_, i) => {
//                     const d = addDays(rangeStart, i);
//                     const isToday =
//                       d.toDateString() === new Date().toDateString();

//                     return (
//                       <div
//                         key={i}
//                         className={`flex items-center justify-center text-sm ${
//                           isDark ? 'text-gray-400' : 'text-gray-500'
//                         }`}
//                         style={{ width: DAY_COL_WIDTH }}
//                       >
//                         <div
//                           className={`w-9 h-9 flex items-center justify-center rounded-full ${
//                             isToday
//                               ? "bg-red-500 text-white font-bold"
//                               : isDark 
//                                 ? "hover:bg-gray-800"
//                                 : "hover:bg-gray-100"
//                           }`}
//                         >
//                           {d.getDate()}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {todayOffset >= 0 && todayOffset <= totalDays && (
//                   <div
//                     className="absolute top-[38px] w-3 h-3 rounded-full bg-red-500"
//                     style={{
//                       left: `calc(${todayPercent}% - 6px)`,
//                     }}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Body */}
//             <div className="relative flex">
//               {/* left */}
//               <div className={`w-[260px] shrink-0 border-r ${
//                 isDark 
//                   ? 'bg-[#18191d] border-gray-800' 
//                   : 'bg-white border-gray-200'
//               }`}>
//                 <div style={{ height: items.length * ROW_HEIGHT }} />

//                 <button
//                   onMouseDown={handleNewButtonMouseDown}
//                   onClick={!isDraggingNew ? createFromNewButton : undefined}
//                   className={`flex items-center gap-2 px-4 py-4 cursor-grab active:cursor-grabbing ${
//                     isDark 
//                       ? 'text-gray-400 hover:text-gray-200' 
//                       : 'text-gray-500 hover:text-gray-800'
//                   }`}
//                 >
//                   <span className="text-xl">+</span>
//                   <span className="text-base">New</span>
//                 </button>

//               </div>

//               {/* canvas */}
//               <div
//                 ref={gridRef}
//                 onClick={createByClick}
//                 className="relative cursor-crosshair"
//                 style={{
//                   width: GRID_WIDTH,
//                   height: items.length * ROW_HEIGHT + 64,
//                 }}
//               >
//                 <div className="absolute inset-0 flex">
//                   {Array.from({ length: totalDays }).map((_, i) => (
//                     <div
//                       key={i}
//                       className={isDark 
//                         ? (i % 2 === 0 ? "bg-[#18191d]" : "bg-[#1a1b1f]")
//                         : (i % 2 === 0 ? "bg-white" : "bg-gray-50")
//                       }
//                       style={{ width: DAY_COL_WIDTH }}
//                     />
//                   ))}
//                 </div>

//                 {todayOffset >= 0 && todayOffset <= totalDays && (
//                   <div
//                     className="absolute top-0 bottom-0 w-[3px] bg-red-500 shadow-lg"
//                     style={{
//                       left: `calc(${todayPercent}% - 1.5px)`,
//                       boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
//                       zIndex: 20,
//                     }}
//                   />
//                 )}

//                 {/* Ghost preview while dragging new button */}
//                 {isDraggingNew && (
//                   <div
//                     className={`absolute h-[44px] rounded-xl border-2 border-dashed flex items-center px-4 font-semibold pointer-events-none ${
//                       isDark
//                         ? 'border-blue-500 bg-blue-500/20 text-blue-400'
//                         : 'border-blue-400 bg-blue-50/50 text-blue-600'
//                     }`}
//                     style={{
//                       left: ghostPosition.left,
//                       top: ghostPosition.top,
//                       width: 4 * DAY_COL_WIDTH, // 4 days duration
//                       zIndex: 30,
//                     }}
//                   >
//                     New
//                     <div className="ml-auto flex items-center">
//                       <div className={`w-2 h-2 rounded-full ${
//                         isDark ? 'bg-blue-500' : 'bg-blue-400'
//                       }`} />
//                     </div>
//                   </div>
//                 )}

//                 {/* Ghost preview while dragging existing card */}
//                 {draggingCard && (
//                   <div
//                     className={`absolute h-[44px] rounded-xl border-2 border-dashed flex items-center px-4 font-semibold pointer-events-none ${
//                       isDark
//                         ? 'border-green-500 bg-green-500/20 text-green-400'
//                         : 'border-green-400 bg-green-50/50 text-green-600'
//                     }`}
//                     style={{
//                       left: ghostPosition.left,
//                       top: ghostPosition.top,
//                       width: Math.max(draggedCardDuration * DAY_COL_WIDTH, 180),
//                       zIndex: 30,
//                     }}
//                   >
//                     {draggingCard.title}
//                     <div className="ml-auto flex items-center">
//                       <div className={`w-2 h-2 rounded-full ${
//                         isDark ? 'bg-green-500' : 'bg-green-400'
//                       }`} />
//                     </div>
//                   </div>
//                 )}

//                 <div className="relative">
//                   {items.map((it) => {
//                     const s = new Date(it.startDate);
//                     const e = new Date(it.endDate);

//                     const startOffset = daysBetween(rangeStart, s);
//                     const duration = Math.max(1, daysBetween(s, e) + 1);

//                     const leftPx = startOffset * DAY_COL_WIDTH;
//                     const widthPx = Math.max(duration * DAY_COL_WIDTH, 180);

//                     // Hide card if it's being dragged
//                     const isBeingDragged = draggingCard?._id === it._id;

//                     return (
//                       <div key={it._id} className="relative" style={{ height: ROW_HEIGHT }}>
//                         <div
//                           data-timeline-card
//                           onMouseDown={(e) => handleCardMouseDown(e, it)}
//                           onClick={(ev) => {
//                             ev.stopPropagation();
//                             if (!draggingCard) {
//                               setSelectedItem(it);
//                               setModalOpen(true);
//                             }
//                           }}
//                           className={`absolute top-[10px] h-[44px] rounded-xl border shadow-sm flex items-center px-4 font-semibold cursor-grab active:cursor-grabbing transition-opacity ${
//                             isBeingDragged ? 'opacity-30' : 'opacity-100'
//                           } ${
//                             isDark
//                               ? 'bg-[#1e1f23] border-gray-700 text-gray-200 hover:bg-[#252730]'
//                               : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
//                           }`}
//                           style={{
//                             left: leftPx,
//                             width: widthPx,
//                           }}
//                         >
//                           {it.title}
//                           <div className="ml-auto flex items-center">
//                             <div className={`w-2 h-2 rounded-full ${
//                               isDark ? 'bg-gray-600' : 'bg-gray-300'
//                             }`} />
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[120px] h-2 rounded-full ${
//                   isDark ? 'bg-gray-700/60' : 'bg-gray-300/60'
//                 }`} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating cursor preview while dragging +New */}
//       {isDraggingNew && (
//         <div
//           className={`fixed pointer-events-none z-50 border-2 rounded-xl shadow-lg px-4 py-2 font-semibold ${
//             isDark
//               ? 'bg-[#1e1f23] border-blue-500 text-blue-400'
//               : 'bg-white border-blue-400 text-blue-600'
//           }`}
//           style={{
//             left: dragPosition.x + 10,
//             top: dragPosition.y + 10,
//           }}
//         >
//           + New Task
//         </div>
//       )}

//       {/* Floating cursor preview while dragging existing card */}
//       {draggingCard && (
//         <div
//           className={`fixed pointer-events-none z-50 border-2 rounded-xl shadow-lg px-4 py-2 font-semibold ${
//             isDark
//               ? 'bg-[#1e1f23] border-green-500 text-green-400'
//               : 'bg-white border-green-400 text-green-600'
//           }`}
//           style={{
//             left: dragPosition.x + 10,
//             top: dragPosition.y + 10,
//           }}
//         >
//           📅 {draggingCard.title}
//         </div>
//       )}

//       {/* modal */}
//       {selectedItem && (
//         <TimelineItemModal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           item={selectedItem}
//           isDark={isDark}
//           onSaved={fetchItems}
//         />
//       )}
//     </>
//   );
// }
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import TimelineItemModal from "@/components/TimelineItemmodal";

type TimelineItem = {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  assignedTo?: string;
  status?: string;
  comment?: string;
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatMonthYear(d: Date) {
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export default function TimelineView({ databaseId }: { databaseId: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const router = useRouter();
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [isDraggingNew, setIsDraggingNew] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [ghostPosition, setGhostPosition] = useState({ left: 0, top: 0 });

  const [draggingCard, setDraggingCard] = useState<TimelineItem | null>(null);
  const [draggedCardDuration, setDraggedCardDuration] = useState(0);
  const [cardDragOffset, setCardDragOffset] = useState({ x: 0, y: 0 });
  const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch(`/api/timeline?databaseId=${databaseId}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    if (databaseId) {
      (async () => {
        setLoading(true);
        const res = await fetch(`/api/timeline?databaseId=${databaseId}`);
        const data = await res.json();
        setItems(data);
        setLoading(false);
      })();
    }
  }, [databaseId]);

  const monthDate = useMemo(() => currentMonth, [currentMonth]);
  const monthStart = useMemo(() => startOfMonth(monthDate), [monthDate]);
  const monthEnd = useMemo(() => endOfMonth(monthDate), [monthDate]);
  const rangeStart = useMemo(() => addDays(monthStart, -3), [monthStart]);
  const rangeEnd = useMemo(() => addDays(monthEnd, 2), [monthEnd]);

  const totalDays = Math.max(1, daysBetween(rangeStart, rangeEnd) + 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOffset = daysBetween(rangeStart, today);
  const todayPercent = (todayOffset / totalDays) * 100;

  const goToPrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const ROW_HEIGHT = 56;
  const DAY_COL_WIDTH = 70;
  const GRID_WIDTH = totalDays * DAY_COL_WIDTH;

  const handleNewButtonMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingNew(true);
    setDragPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCardMouseDown = (e: React.MouseEvent, item: TimelineItem) => {
    e.preventDefault();
    e.stopPropagation();

    setMouseDownPos({ x: e.clientX, y: e.clientY });
    setHasMoved(false);

    const s = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const duration = Math.max(1, daysBetween(s, endDate) + 1);

    setDraggingCard(item);
    setDraggedCardDuration(duration);
    setDragPosition({ x: e.clientX, y: e.clientY });

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setCardDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!isDraggingNew && !draggingCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - mouseDownPos.x);
      const dy = Math.abs(e.clientY - mouseDownPos.y);
      
      if (dx > 5 || dy > 5) {
        setHasMoved(true);
      }

      setDragPosition({ x: e.clientX, y: e.clientY });

      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
        const rowIndex = Math.max(0, Math.floor(y / ROW_HEIGHT));

        const leftPx = dayIndex * DAY_COL_WIDTH;
        const topPx = rowIndex * ROW_HEIGHT + 10;

        setGhostPosition({ left: leftPx, top: topPx });
      }
    };

    const handleMouseUp = async (e: MouseEvent) => {
      if (gridRef.current && hasMoved) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;

        if (x >= 0 && x <= GRID_WIDTH) {
          const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
          const start = addDays(rangeStart, dayIndex);

          if (isDraggingNew) {
            const end = addDays(start, 3);

            const res = await fetch("/api/timeline", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                databaseId,
                title: "New",
                startDate: start.toISOString(),
                endDate: end.toISOString(),
                status: "Todo",
                assignedTo: "",
                comment: "",
              }),
            });

            const created = await res.json();
            await fetchItems();
            setSelectedItem(created);
            setModalOpen(true);
          } else if (draggingCard) {
            const end = addDays(start, draggedCardDuration - 1);

            await fetch("/api/timeline", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                _id: draggingCard._id,
                startDate: start.toISOString(),
                endDate: end.toISOString(),
              }),
            });

            await fetchItems();
          }
        }
      }

      setIsDraggingNew(false);
      setDraggingCard(null);
      setHasMoved(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingNew, draggingCard, draggedCardDuration, databaseId, rangeStart, GRID_WIDTH, DAY_COL_WIDTH, ROW_HEIGHT, hasMoved, mouseDownPos]);

  const createByClick = async (e: React.MouseEvent) => {
    if (!gridRef.current) return;

    const target = e.target as HTMLElement;
    if (target.closest("[data-timeline-card]")) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const dayIndex = Math.max(0, Math.floor(x / DAY_COL_WIDTH));
    const start = addDays(rangeStart, dayIndex);
    const end = addDays(start, 3);

    const res = await fetch("/api/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        databaseId,
        title: "New",
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        status: "Todo",
        assignedTo: "",
        comment: "",
      }),
    });

    const created = await res.json();
    await fetchItems();
    setSelectedItem(created);
    setModalOpen(true);
  };

  const createFromNewButton = async () => {
    console.log("hi");
    const start = new Date();
    const end = addDays(start, 3);

    const res = await fetch("/api/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        databaseId,
        title: "New",
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        status: "Todo",
        assignedTo: "",
        comment: "",
      }),
    });

    const created = await res.json();
    await fetchItems();
    setSelectedItem(created);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className={`p-6 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading timeline...
      </div>
    );
  }

  return (
    <>
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-[#18191d] border-gray-800" : "bg-white border-gray-200"}`}>
        {/* header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <button className={isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"}>»</button>
            <div className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
              {formatMonthYear(monthStart)}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => router.push(`/schedule?databaseId=${databaseId}`)}
              className={`px-3 py-1.5 rounded-lg border font-semibold ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            >
              Manage in Calendar
            </button>

            <div className={`flex items-center gap-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              <span>Month</span>
              <span>▾</span>
            </div>

            <div className={`flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              <button onClick={goToPrevMonth} className={`px-2 py-1 ${isDark ? "hover:text-gray-200" : "hover:text-gray-800"}`}>‹</button>
              <button onClick={goToToday} className={`px-3 py-1 rounded ${isDark ? "hover:text-gray-200 hover:bg-gray-800" : "hover:text-gray-800 hover:bg-gray-100"}`}>Today</button>
              <button onClick={goToNextMonth} className={`px-2 py-1 ${isDark ? "hover:text-gray-200" : "hover:text-gray-800"}`}>›</button>
            </div>
          </div>
        </div>

        {/* grid */}
        <div className="relative overflow-x-auto">
          <div style={{ minWidth: GRID_WIDTH + 260 }}>
            {/* Top Day Row */}
            <div className={`flex border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
              <div className={`w-[260px] shrink-0 ${isDark ? "bg-[#18191d]" : "bg-white"}`} />

              <div className="relative" style={{ width: GRID_WIDTH, height: 44 }}>
                <div className="absolute inset-0 flex pointer-events-none">
                  {Array.from({ length: totalDays }).map((_, i) => (
                    <div
                      key={i}
                      className={isDark ? (i % 2 === 0 ? "bg-[#18191d]" : "bg-[#1a1b1f]") : (i % 2 === 0 ? "bg-white" : "bg-gray-50")}
                      style={{ width: DAY_COL_WIDTH }}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex pointer-events-none">
                  {Array.from({ length: totalDays }).map((_, i) => {
                    const d = addDays(rangeStart, i);
                    const isToday = d.toDateString() === new Date().toDateString();

                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        style={{ width: DAY_COL_WIDTH }}
                      >
                        <div
                          className={`w-9 h-9 flex items-center justify-center rounded-full ${
                            isToday
                              ? "bg-red-500 text-white font-bold"
                              : isDark
                              ? "hover:bg-gray-800"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {d.getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {todayOffset >= 0 && todayOffset <= totalDays && (
                  <div
                    className="absolute top-[38px] w-3 h-3 rounded-full bg-red-500"
                    style={{ left: `calc(${todayPercent}% - 6px)` }}
                  />
                )}
              </div>
            </div>

            {/* Body */}
            <div className="relative flex">
              {/* left */}
              <div className={`w-[260px] shrink-0 border-r ${isDark ? "bg-[#18191d] border-gray-800" : "bg-white border-gray-200"}`}>
                <div style={{ height: items.length * ROW_HEIGHT }} />

                <button
                  onMouseDown={handleNewButtonMouseDown}
                  onClick={!isDraggingNew ? createFromNewButton : undefined}
                  className={`flex items-center gap-2 px-4 py-4 cursor-grab active:cursor-grabbing ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"}`}
                >
                  <span className="text-xl">+</span>
                  <span className="text-base">New</span>
                </button>
              </div>

              {/* canvas */}
              <div
                ref={gridRef}
                onClick={createByClick}
                className="relative cursor-crosshair"
                style={{ width: GRID_WIDTH, height: items.length * ROW_HEIGHT + 64 }}
              >
                <div className="absolute inset-0 flex">
                  {Array.from({ length: totalDays }).map((_, i) => (
                    <div
                      key={i}
                      className={isDark ? (i % 2 === 0 ? "bg-[#18191d]" : "bg-[#1a1b1f]") : (i % 2 === 0 ? "bg-white" : "bg-gray-50")}
                      style={{ width: DAY_COL_WIDTH }}
                    />
                  ))}
                </div>

                {todayOffset >= 0 && todayOffset <= totalDays && (
                  <div
                    className="absolute top-0 bottom-0 w-[3px] bg-red-500 shadow-lg"
                    style={{
                      left: `calc(${todayPercent}% - 1.5px)`,
                      boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
                      zIndex: 20,
                    }}
                  />
                )}

                {/* Ghost preview while dragging new button */}
                {isDraggingNew && (
                  <div
                    className={`absolute h-[44px] rounded-xl border-2 border-dashed flex items-center px-4 font-semibold pointer-events-none ${isDark ? "border-blue-500 bg-blue-500/20 text-blue-400" : "border-blue-400 bg-blue-50/50 text-blue-600"}`}
                    style={{
                      left: ghostPosition.left,
                      top: ghostPosition.top,
                      width: 4 * DAY_COL_WIDTH,
                      zIndex: 30,
                    }}
                  >
                    New
                    <div className="ml-auto flex items-center">
                      <div className={`w-2 h-2 rounded-full ${isDark ? "bg-blue-500" : "bg-blue-400"}`} />
                    </div>
                  </div>
                )}

                {/* Ghost preview while dragging existing card */}
                {draggingCard && (
                  <div
                    className={`absolute h-[44px] rounded-xl border-2 border-dashed flex items-center px-4 font-semibold pointer-events-none ${isDark ? "border-green-500 bg-green-500/20 text-green-400" : "border-green-400 bg-green-50/50 text-green-600"}`}
                    style={{
                      left: ghostPosition.left,
                      top: ghostPosition.top,
                      width: Math.max(draggedCardDuration * DAY_COL_WIDTH, 180),
                      zIndex: 30,
                    }}
                  >
                    {draggingCard.title}
                    <div className="ml-auto flex items-center">
                      <div className={`w-2 h-2 rounded-full ${isDark ? "bg-green-500" : "bg-green-400"}`} />
                    </div>
                  </div>
                )}

                <div className="relative">
                  {items.map((it) => {
                    const s = new Date(it.startDate);
                    const e = new Date(it.endDate);

                    const startOffset = daysBetween(rangeStart, s);
                    const duration = Math.max(1, daysBetween(s, e) + 1);

                    const leftPx = startOffset * DAY_COL_WIDTH;
                    const widthPx = Math.max(duration * DAY_COL_WIDTH, 180);

                    const isBeingDragged = draggingCard?._id === it._id;

                    return (
                      <div key={it._id} className="relative" style={{ height: ROW_HEIGHT }}>
                        <div
                          data-timeline-card
                          onMouseDown={(e) => handleCardMouseDown(e, it)}
                          onClick={(ev) => {
                            ev.stopPropagation();
                            if (!hasMoved) {
                              setSelectedItem(it);
                              setModalOpen(true);
                            }
                          }}
                          className={`absolute top-[10px] h-[44px] rounded-xl border shadow-sm flex items-center px-4 font-semibold cursor-pointer transition-opacity ${
                            isBeingDragged ? "opacity-30" : "opacity-100"
                          } ${isDark ? "bg-[#1e1f23] border-gray-700 text-gray-200 hover:bg-[#252730]" : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"}`}
                          style={{ left: leftPx, width: widthPx }}
                        >
                          {it.title}
                          <div className="ml-auto flex items-center">
                            <div className={`w-2 h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[120px] h-2 rounded-full ${isDark ? "bg-gray-700/60" : "bg-gray-300/60"}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cursor preview while dragging +New */}
      {isDraggingNew && (
        <div
          className={`fixed pointer-events-none z-50 border-2 rounded-xl shadow-lg px-4 py-2 font-semibold ${isDark ? "bg-[#1e1f23] border-blue-500 text-blue-400" : "bg-white border-blue-400 text-blue-600"}`}
          style={{ left: dragPosition.x + 10, top: dragPosition.y + 10 }}
        >
          + New Task
        </div>
      )}

      {/* Floating cursor preview while dragging existing card */}
      {draggingCard && (
        <div
          className={`fixed pointer-events-none z-50 border-2 rounded-xl shadow-lg px-4 py-2 font-semibold ${isDark ? "bg-[#1e1f23] border-green-500 text-green-400" : "bg-white border-green-400 text-green-600"}`}
          style={{ left: dragPosition.x + 10, top: dragPosition.y + 10 }}
        >
          📅 {draggingCard.title}
        </div>
      )}

      {/* modal */}
      {selectedItem && (
        <TimelineItemModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={selectedItem}
          isDark={isDark}
          onSaved={fetchItems}
        />
      )}
    </>
  );
}