
// "use client";

// import React, { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import Modal from "./Modal";
// import { FiChevronsRight } from "react-icons/fi";
// import dynamic from "next/dynamic";
// import type { EmojiClickData } from "emoji-picker-react";

// import {
//   LayoutGrid,
//   Search,
//   Calendar,
//   Activity,
//   Inbox,
//   Plus,
//   Settings,
//   Moon,
//   Sun,
//   Folder,
//   FileText,
//   Link as LinkIcon,
//   Wallet,
//   Bookmark,
//   Layout,
//   Store,
//   Menu,
//   X,
// } from "lucide-react";
// import ProjectRow from "./ProjectsRow";

// // Dynamically import EmojiPicker to avoid SSR issues
// const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
//   ssr: false,
// });

// /* ================= TYPES ================= */

// type MenuKey =
//   | "dashboard"
//   | "project-board"
//   | "task-board"
//   | "schedule"
//   | "activities"
//   | "inbox"
//   | "template"
//   | "market-places";

// type SidebarPage = {
//   _id: string;
//   pageName: string;
//   menuKey: MenuKey;
//   emoji: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type Project = {
//   _id: string;
//   name: string;
//   emoji: string;
//   createdAt?: string;
//   updatedAt?: string;
// };

// interface SidebarProps {
//   view: string;
//   setView: (view: string) => void;
// }

// export default function Sidebar({ view, setView }: SidebarProps) {
//   const { setTheme, resolvedTheme } = useTheme();
//   const router = useRouter();
//   const pathname = usePathname();

//   const [mounted, setMounted] = useState(false);
//   const [open, setOpen] = useState(true);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const [pages, setPages] = useState<SidebarPage[]>([]);

//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [selectedMenuKey, setSelectedMenuKey] = useState<MenuKey | null>(null);
//   const [projects, setProjects] = useState<Project[]>([]);

//   const [pageForm, setPageForm] = useState<{
//     pageName: string;
//     menuKey: MenuKey | "";
//     emoji: string;
//   }>({
//     pageName: "",
//     menuKey: "",
//     emoji: "📄",
//   });

//   const [emojiOpen, setEmojiOpen] = useState(false);
//   const [lastSavedName, setLastSavedName] = useState("");
//   const [currentPageId, setCurrentPageId] = useState<string | null>(null);
//   const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
//   const [projectForm, setProjectForm] = useState({
//     name: "",
//     emoji: "📁",
//   });

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch("/api/projects");
//         const data = await res.json();
//         setProjects(data);
//       } catch (err) {
//         console.log("Error fetching projects:", err);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const isDark = resolvedTheme === "dark";

//   const setGlobalTheme = (dark: boolean) => {
//     setTheme(dark ? "dark" : "light");
//   };

//   const navigateTo = (path: string) => {
//     if (pathname !== path) router.push(path);
//     setMobileOpen(false); // Close mobile menu after navigation
//   };

//   /* ================= FETCH PAGES ================= */
//   const fetchPages = async () => {
//     try {
//       const res = await fetch("/api/sidebar");
//       const data = await res.json();
//       setPages(data);
//       console.log("Fetched pages with emojis:", data);
//     } catch (err) {
//       console.log("Error fetching pages:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   /* ================= CREATE MODAL ================= */
//   const openCreateModal = (menuKey: MenuKey) => {
//     setSelectedMenuKey(menuKey);
//     setPageForm({ pageName: "", menuKey, emoji: "📄" });
//     setLastSavedName("");
//     setCurrentPageId(null);
//     setCreateModalOpen(true);
//   };

//   const closeCreateModal = () => {
//     setCreateModalOpen(false);
//     setSelectedMenuKey(null);
//     setEmojiOpen(false);
//     setPageForm({ pageName: "", menuKey: "", emoji: "📄" });
//     setLastSavedName("");
//     setCurrentPageId(null);
//   };

//   const handleCreateOrUpdatePage = async () => {
//     if (!pageForm.pageName.trim()) return;
//     if (pageForm.pageName === lastSavedName) return;

//     console.log("Saving page:", { currentPageId, pageName: pageForm.pageName });

//     try {
//       if (currentPageId) {
//         const res = await fetch(`/api/sidebar?id=${currentPageId}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             pageName: pageForm.pageName,
//             emoji: pageForm.emoji,
//           }),
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data?.message || "Failed to update");

//         console.log("Page updated:", data);
//         await fetchPages();
//         setLastSavedName(pageForm.pageName);
//       } else {
//         const res = await fetch("/api/sidebar", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(pageForm),
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data?.message || "Failed to create");

//         console.log("Page created:", data);
//         setCurrentPageId(data._id);
//         await fetchPages();
//         setLastSavedName(pageForm.pageName);
//       }
//     } catch (err: unknown) {
//       const error = err as Error;
//       console.error("Error saving page:", error.message);
//     }
//   };

//   useEffect(() => {
//     if (pageForm.pageName.trim() && createModalOpen && pageForm.pageName !== lastSavedName) {
//       const timer = setTimeout(() => {
//         handleCreateOrUpdatePage();
//       }, 800);

//       return () => clearTimeout(timer);
//     }
//   }, [pageForm.pageName, pageForm.emoji, createModalOpen]);

//   const handleDeletePage = async (pageId: string) => {
//     try {
//       const res = await fetch(`/api/sidebar?id=${pageId}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Failed to delete");

//       await fetchPages();
//     } catch (err: unknown) {
//       const error = err as Error;
//       alert(error.message);
//     }
//   };

//   if (!mounted) return null;

//   const hoverClass = isDark ? "hover:bg-white/5" : "hover:bg-rose-200/50";

//   /* ================= MENU CONFIG ================= */
//   const menuItems: {
//     key: MenuKey;
//     label: string;
//     path: string;
//     icon: React.ReactNode;
//   }[] = [
//     { key: "dashboard", label: "Dashboard", path: "/", icon: <LayoutGrid size={open ? 20 : 22} /> },
//     { key: "project-board", label: "Project Board", path: "/project-board", icon: <Folder size={open ? 20 : 22} /> },
//     { key: "task-board", label: "Task Board", path: "/task-board", icon: <FileText size={open ? 20 : 22} /> },
//     { key: "schedule", label: "Schedule", path: "/schedule", icon: <Calendar size={open ? 20 : 22} /> },
//     { key: "activities", label: "Activities", path: "/activities", icon: <Activity size={open ? 20 : 22} /> },
//     { key: "inbox", label: "Inbox", path: "/inbox", icon: <Inbox size={open ? 20 : 22} /> },
//     { key: "template", label: "Template", path: "/template", icon: <Layout size={open ? 20 : 22} /> },
//     { key: "market-places", label: "Market Places", path: "/market-places", icon: <Store size={open ? 20 : 22} /> },
//   ];

//   const SidebarContent = () => (
//     <>
//       <div className="flex-1 overflow-y-auto pb-16">
//         {/* ================= SEARCH ================= */}
//         <div className={`${open ? "p-6 pb-2" : "p-4 pb-2"}`}>
//           {open && (
//             <motion.div className="relative group">
//               <Search
//                 className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
//                   isDark ? "text-gray-500" : "text-gray-600"
//                 }`}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className={`w-full text-sm pl-10 pr-10 py-3 rounded-2xl border focus:outline-none ${
//                   isDark
//                     ? "bg-[#18191d] text-gray-200 border-transparent focus:border-white/10 placeholder:text-gray-600"
//                     : "bg-white text-gray-900 border-rose-100 focus:border-rose-300 placeholder:text-gray-500 shadow-sm"
//                 }`}
//               />
//             </motion.div>
//           )}
//         </div>

//         {/* ================= NAVIGATION ================= */}
//         <div className={`${open ? "px-6 py-2" : "px-2 py-2"}`}>
//           <div className="space-y-2">
//             {menuItems.map((item) => {
//               const isActive = pathname === item.path;

//               return (
//                 <div key={item.key} className="rounded-xl overflow-hidden">
//                   {/* ================= MAIN MENU ROW ================= */}
//                   <div
//                     className="relative cursor-pointer group"
//                     onClick={() => navigateTo(item.path)}
//                   >
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 ${
//                         isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
//                       }`}
//                     />

//                     <div
//                       className={`relative flex items-center ${
//                         open ? "gap-3 px-4" : "justify-center px-2"
//                       } py-2 ${
//                         isActive
//                           ? "text-white"
//                           : isDark
//                           ? "text-gray-400"
//                           : "text-gray-700"
//                       }`}
//                     >
//                       {pages.filter((p) => p.menuKey === item.key).length > 0 && (
//                         <span
//                           className="text-xl flex-shrink-0"
//                           title="Menu emoji from first page"
//                         >
//                           {pages.filter((p) => p.menuKey === item.key)[0]?.emoji ||
//                             "📄"}
//                         </span>
//                       )}

//                       {pages.filter((p) => p.menuKey === item.key).length === 0 && (
//                         <motion.div
//                           layout
//                           className={`grid h-full ${
//                             open ? "w-10" : "w-full"
//                           } place-content-center text-lg`}
//                         >
//                           {item.icon}
//                         </motion.div>
//                       )}

//                       {open && (
//                         <div className="flex items-center justify-between w-full">
//                           <motion.span layout className="font-medium">
//                             {item.label}
//                           </motion.span>

//                           <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 openCreateModal(item.key);
//                               }}
//                               className={`p-1 rounded-md ${hoverClass}`}
//                             >
//                               <Plus size={16} />
//                             </button>

//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 alert("Options coming soon...");
//                               }}
//                               className={`p-1 rounded-md ${hoverClass}`}
//                             >
//                               <span className="text-lg leading-none">⋯</span>
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* ================= SUBTABS ================= */}
//                   {/* ================= SUBTABS ================= */}
// {open && (
//   <>
//     {item.key === "project-board" ? (
//       <div className="pl-6 pb-2 space-y-2 relative">
//         {projects.length === 0 ? (
//           <div
//             className={`text-xs px-3 py-2 rounded-xl ${
//               isDark
//                 ? "text-gray-500 bg-white/5"
//                 : "text-gray-600 bg-white"
//             }`}
//           >
//             No projects yet. Create one.
//           </div>
//         ) : (
//           projects.map((project: Project, index: number) => (
//             <div key={project._id} className="relative">
//               {/* L-connector */}
//               <div 
//                 className={`absolute left-[7px] ${
//                   index === 0 ? '-top-3' : '-top-1'
//                 } w-4 h-6 border-b border-l rounded-bl-lg ${
//                   isDark ? 'border-gray-600' : 'border-gray-400'
//                 }`}
//               ></div>
//               <ProjectRow
//                 project={project}
//                 isDark={isDark}
//               />
//             </div>
//           ))
//         )}
//       </div>
//     ) : (
//       <div className="pl-14 pb-2 space-y-1 relative">
//         {pages
//           .filter((p) => p.menuKey === item.key)
//           .slice(0, 5)
//           .map((p, index) => {
//             const bgColors = [
//               isDark ? "bg-purple-500/10" : "bg-purple-100",
//               isDark ? "bg-blue-500/10" : "bg-blue-100",
//               isDark ? "bg-green-500/10" : "bg-green-100",
//               isDark ? "bg-orange-500/10" : "bg-orange-100",
//               isDark ? "bg-pink-500/10" : "bg-pink-100",
//             ];

//             const bgColor = bgColors[index % bgColors.length];

//             return (
//               <div
//                 key={p._id}
//                 className="relative"
//               >
//                 {/* L-connector */}
//                 <div 
//                   className={`absolute -left-8 ${
//                     index === 0 ? '-top-3' : '-top-1'
//                   } w-4 h-6 border-b border-l rounded-bl-lg ${
//                     isDark ? 'border-gray-600' : 'border-gray-400'
//                   }`}
//                 ></div>
                
//                 <div
//                   className={`group text-xs px-3 py-2 rounded-lg cursor-pointer transition-all ${bgColor} ${
//                     isDark
//                       ? "text-gray-300 hover:brightness-125"
//                       : "text-gray-800 hover:brightness-95"
//                   }`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     alert(`Open page: ${p.pageName}`);
//                   }}
//                 >
//                   <div className="flex items-center gap-2 justify-between">
//                     <div className="flex items-center gap-2 flex-1 min-w-0">
//                       <span
//                         className="text-lg flex-shrink-0"
//                         title={`Emoji: ${p.emoji}`}
//                       >
//                         {p.emoji || "📄"}
//                       </span>
//                       <span className="truncate font-medium">
//                         {p.pageName}
//                       </span>
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (confirm(`Delete "${p.pageName}"?`)) {
//                           handleDeletePage(p._id);
//                         }
//                       }}
//                       className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
//                         isDark
//                           ? "hover:bg-white/10"
//                           : "hover:bg-white/50"
//                       }`}
//                     >
//                       <span className="text-xs">✕</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     )}
//   </>
// )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= BOTTOM THEME TOGGLE ================= */}
//         <div className={`mt-auto ${open ? "p-6 pb-4" : "p-4 pb-2"}`}>
//           <div
//             className={`flex items-center justify-center rounded-full p-1 border transition-all duration-300 ${
//               isDark ? "bg-black/40 border-gray-800" : "bg-gray-100 border-rose-200"
//             }`}
//           >
//             <button
//               onClick={() => setGlobalTheme(false)}
//               className={`p-1.5 rounded-full transition-all duration-300 ${
//                 !isDark
//                   ? "bg-white text-amber-500 shadow-sm"
//                   : "text-gray-600 hover:text-gray-400"
//               }`}
//             >
//               <Sun size={16} />
//             </button>
//             <button
//               onClick={() => setGlobalTheme(true)}
//               className={`p-1.5 rounded-full transition-all duration-300 ${
//                 isDark
//                   ? "bg-[#2c2d31] text-white shadow-sm"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               <Moon size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= SIDEBAR TOGGLE (Desktop Only) ================= */}
//       <motion.button
//         layout
//         onClick={() => setOpen((pv) => !pv)}
//         className={`hidden lg:flex fixed bottom-0 left-0 border-t z-50 ${
//           isDark
//             ? "border-gray-800 bg-[#0F1014] hover:bg-[#1a1b1e]"
//             : "border-rose-200 bg-rose-50 hover:bg-rose-100"
//         }`}
//         style={{ width: open ? "300px" : "80px" }}
//       >
//         <div
//           className={`flex items-center ${
//             open ? "justify-start px-4" : "justify-center"
//           } p-2`}
//         >
//           <motion.div
//             layout
//             className={`grid ${open ? "size-10" : "size-8"} place-content-center text-lg`}
//           >
//             <FiChevronsRight
//               className={`${!open && "rotate-180"} ${
//                 isDark ? "text-gray-400" : "text-gray-600"
//               }`}
//               size={open ? 20 : 18}
//             />
//           </motion.div>
//           {open && (
//             <motion.span layout className="text-xs font-medium">
//               Hide
//             </motion.span>
//           )}
//         </div>
//       </motion.button>
//     </>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button - Fixed top right, doesn't overlap header */}
//       <button
//         onClick={() => setMobileOpen(!mobileOpen)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl shadow-lg ${
//           isDark
//             ? "bg-[#0F1014] text-gray-300 border border-gray-800"
//             : "bg-white text-gray-900 border border-rose-200"
//         }`}
//       >
//         {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Mobile Backdrop */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setMobileOpen(false)}
//             className="lg:hidden fixed inset-0 bg-black/50 z-40"
//           />
//         )}
//       </AnimatePresence>

//       {/* Mobile Sidebar */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.nav
//             initial={{ x: -300 }}
//             animate={{ x: 0 }}
//             exit={{ x: -300 }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className={`lg:hidden fixed top-0 left-0 h-screen w-[300px] z-40 flex flex-col font-sans border-r ${
//               isDark
//                 ? "bg-[#0F1014] text-gray-300 border-gray-800"
//                 : "bg-rose-50 text-gray-900 border-rose-200"
//             }`}
//           >
//             <SidebarContent />
//           </motion.nav>
//         )}
//       </AnimatePresence>

//       {/* Desktop Sidebar */}
//       <motion.nav
//         layout
//         className={`hidden lg:flex h-screen flex-col font-sans shrink-0 relative border-t ${
//           isDark
//             ? "bg-[#0F1014] text-gray-300 border-gray-800"
//             : "bg-rose-50 text-gray-900 border-rose-200"
//         }`}
//         style={{
//           width: open ? "300px" : "80px",
//           minWidth: open ? "300px" : "80px",
//         }}
//       >
//         <SidebarContent />
//       </motion.nav>

//       {/* ================= CREATE PAGE MODAL ================= */}
//       {createModalOpen && (
//         <Modal
//           isOpen={createModalOpen}
//           onClose={() => setCreateModalOpen(false)}
//           title="New Project"
//           isDark={isDark}
//         >
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <button className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-rose-500 text-2xl flex items-center justify-center">
//                 {projectForm.emoji}
//               </button>

//               <input
//                 value={projectForm.name}
//                 onChange={(e) =>
//                   setProjectForm((pv) => ({ ...pv, name: e.target.value }))
//                 }
//                 placeholder="Project name..."
//                 className={`w-full p-4 rounded-2xl border outline-none ${
//                   isDark
//                     ? "bg-white/5 border-white/10 text-white"
//                     : "bg-white border-rose-100 text-gray-900"
//                 }`}
//               />
//             </div>

//             <button
//               onClick={async () => {
//                 if (!projectForm.name.trim()) return;

//                 await fetch("/api/projects", {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({
//                     name: projectForm.name,
//                     emoji: projectForm.emoji,
//                   }),
//                 });

//                 const res = await fetch("/api/projects");
//                 const data = await res.json();
//                 setProjects(data);

//                 setProjectForm({ name: "", emoji: "📁" });
//                 setCreateProjectModalOpen(false);
//               }}
//               className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-rose-600 text-white font-semibold"
//             >
//               Create Project
//             </button>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// }"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { FiChevronsRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";

import {
  LayoutGrid,
  Search,
  Calendar,
  Activity,
  Inbox,
  Plus,
  Settings,
  Moon,
  Sun,
  Folder,
  FileText,
  Link as LinkIcon,
  Wallet,
  Bookmark,
  Layout,
  Store,
  Menu,
  X,
} from "lucide-react";
import ProjectRow from "./ProjectsRow";

// Dynamically import EmojiPicker to avoid SSR issues
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

/* ================= TYPES ================= */

type MenuKey =
  | "dashboard"
  | "project-board"
  | "task-board"
  | "schedule"
  | "activities"
  | "inbox"
  | "template"
  | "market-places";

type SidebarPage = {
  _id: string;
  pageName: string;
  menuKey: MenuKey;
  emoji: string;
  createdAt: string;
  updatedAt: string;
};

type Project = {
  _id: string;
  name: string;
  emoji: string;
  createdAt?: string;
  updatedAt?: string;
};

interface SidebarProps {
  view: string;
  setView: (view: string) => void;
}

export default function Sidebar({ view, setView }: SidebarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [pages, setPages] = useState<SidebarPage[]>([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState<MenuKey | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const [pageForm, setPageForm] = useState<{
    pageName: string;
    menuKey: MenuKey | "";
    emoji: string;
  }>({
    pageName: "",
    menuKey: "",
    emoji: "📄",
  });

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [lastSavedName, setLastSavedName] = useState("");
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: "",
    emoji: "📁",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.log("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const isDark = resolvedTheme === "dark";

  const setGlobalTheme = (dark: boolean) => {
    setTheme(dark ? "dark" : "light");
  };

  const navigateTo = (path: string) => {
    if (pathname !== path) router.push(path);
    setMobileOpen(false); // Close mobile menu after navigation
  };

  /* ================= FETCH PAGES ================= */
  const fetchPages = async () => {
    try {
      const res = await fetch("/api/sidebar");
      const data = await res.json();
      setPages(data);
      console.log("Fetched pages with emojis:", data);
    } catch (err) {
      console.log("Error fetching pages:", err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  /* ================= CREATE MODAL ================= */
  const openCreateModal = (menuKey: MenuKey) => {
    setSelectedMenuKey(menuKey);
    setPageForm({ pageName: "", menuKey, emoji: "📄" });
    setLastSavedName("");
    setCurrentPageId(null);
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setSelectedMenuKey(null);
    setEmojiOpen(false);
    setPageForm({ pageName: "", menuKey: "", emoji: "📄" });
    setLastSavedName("");
    setCurrentPageId(null);
  };

  const handleCreateOrUpdatePage = async () => {
    if (!pageForm.pageName.trim()) return;
    if (pageForm.pageName === lastSavedName) return;

    console.log("Saving page:", { currentPageId, pageName: pageForm.pageName });

    try {
      if (currentPageId) {
        const res = await fetch(`/api/sidebar?id=${currentPageId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pageName: pageForm.pageName,
            emoji: pageForm.emoji,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to update");

        console.log("Page updated:", data);
        await fetchPages();
        setLastSavedName(pageForm.pageName);
      } else {
        const res = await fetch("/api/sidebar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pageForm),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to create");

        console.log("Page created:", data);
        setCurrentPageId(data._id);
        await fetchPages();
        setLastSavedName(pageForm.pageName);
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error saving page:", error.message);
    }
  };

  useEffect(() => {
    if (pageForm.pageName.trim() && createModalOpen && pageForm.pageName !== lastSavedName) {
      const timer = setTimeout(() => {
        handleCreateOrUpdatePage();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [pageForm.pageName, pageForm.emoji, createModalOpen]);

  const handleDeletePage = async (pageId: string) => {
    try {
      const res = await fetch(`/api/sidebar?id=${pageId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete");

      await fetchPages();
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message);
    }
  };

  if (!mounted) return null;

  const hoverClass = isDark ? "hover:bg-white/5" : "hover:bg-rose-200/50";

  /* ================= MENU CONFIG ================= */
  const menuItems: {
    key: MenuKey;
    label: string;
    path: string;
    icon: React.ReactNode;
  }[] = [
    { key: "dashboard", label: "Dashboard", path: "/", icon: <LayoutGrid size={open ? 20 : 22} /> },
    { key: "project-board", label: "Project Board", path: "/project-board", icon: <Folder size={open ? 20 : 22} /> },
    { key: "task-board", label: "Task Board", path: "/task-board", icon: <FileText size={open ? 20 : 22} /> },
    { key: "schedule", label: "Schedule", path: "/schedule", icon: <Calendar size={open ? 20 : 22} /> },
    { key: "activities", label: "Activities", path: "/activities", icon: <Activity size={open ? 20 : 22} /> },
    { key: "inbox", label: "Inbox", path: "/inbox", icon: <Inbox size={open ? 20 : 22} /> },
    { key: "template", label: "Template", path: "/template", icon: <Layout size={open ? 20 : 22} /> },
    { key: "market-places", label: "Market Places", path: "/market-places", icon: <Store size={open ? 20 : 22} /> },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex-1 overflow-y-auto pb-16">
        {/* ================= SEARCH ================= */}
        <div className={`${open ? "p-6 pb-2" : "p-4 pb-2"}`}>
          {open && (
            <motion.div className="relative group">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  isDark ? "text-gray-500" : "text-gray-600"
                }`}
              />
              <input
                type="text"
                placeholder="Search..."
                className={`w-full text-sm pl-10 pr-10 py-3 rounded-2xl border focus:outline-none ${
                  isDark
                    ? "bg-[#18191d] text-gray-200 border-transparent focus:border-white/10 placeholder:text-gray-600"
                    : "bg-white text-gray-900 border-rose-100 focus:border-rose-300 placeholder:text-gray-500 shadow-sm"
                }`}
              />
            </motion.div>
          )}
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className={`${open ? "px-6 py-2" : "px-2 py-2"}`}>
          <div className="space-y-2 relative">
            {/* Main vertical connector line running through all menu items */}
            {open && (
              <div 
                className={`absolute left-[18px] top-0 bottom-0 w-[2px] ${
                  isDark ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              />
            )}
            
            {menuItems.map((item, menuIndex) => {
              const isActive = pathname === item.path;
              const hasSubItems = item.key === "project-board" 
                ? projects.length > 0 
                : pages.filter((p) => p.menuKey === item.key).length > 0;

              return (
                <div key={item.key} className="rounded-xl overflow-visible relative">
                  {/* Curved L-shaped connector from vertical line to menu item */}
                  {open && (
                    <div 
                      className={`absolute left-[18px] top-[12px] w-[24px] h-[16px] border-l-2 border-b-2 rounded-bl-lg ${
                        isDark ? 'border-gray-700' : 'border-gray-300'
                      }`}
                    />
                  )}
                  
                  {/* ================= MAIN MENU ROW ================= */}
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => navigateTo(item.path)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 rounded-xl ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                      }`}
                    />

                    <div
                      className={`relative flex items-center ${
                        open ? "gap-3 px-4" : "justify-center px-2"
                      } py-2 ${
                        isActive
                          ? "text-white"
                          : isDark
                          ? "text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {pages.filter((p) => p.menuKey === item.key).length > 0 && (
                        <span
                          className="text-xl flex-shrink-0"
                          title="Menu emoji from first page"
                        >
                          {pages.filter((p) => p.menuKey === item.key)[0]?.emoji ||
                            "📄"}
                        </span>
                      )}

                      {pages.filter((p) => p.menuKey === item.key).length === 0 && (
                        <motion.div
                          layout
                          className={`grid h-full ${
                            open ? "w-10" : "w-full"
                          } place-content-center text-lg`}
                        >
                          {item.icon}
                        </motion.div>
                      )}

                      {open && (
                        <div className="flex items-center justify-between w-full">
                          <motion.span layout className="font-medium">
                            {item.label}
                          </motion.span>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openCreateModal(item.key);
                              }}
                              className={`p-1 rounded-md ${hoverClass}`}
                            >
                              <Plus size={16} />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert("Options coming soon...");
                              }}
                              className={`p-1 rounded-md ${hoverClass}`}
                            >
                              <span className="text-lg leading-none">⋯</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================= SUBTABS ================= */}
                  {open && (
                    <>
                      {item.key === "project-board" ? (
                        <div className="pl-6 pb-2 space-y-2 relative">
                          {/* Vertical line for project submenu */}
                          {projects.length > 0 && (
                            <div 
                              className={`absolute left-[18px] top-2 bottom-0 w-[2px] ${
                                isDark ? 'bg-gray-600' : 'bg-gray-400'
                              }`}
                            />
                          )}
                          
                          {projects.length === 0 ? (
                            <div
                              className={`text-xs px-3 py-2 rounded-xl ml-[20px] ${
                                isDark
                                  ? "text-gray-500 bg-white/5"
                                  : "text-gray-600 bg-white"
                              }`}
                            >
                              No projects yet. Create one.
                            </div>
                          ) : (
                            projects.map((project: Project, index: number) => (
                              <div key={project._id} className="relative">
                                {/* Curved L-connector from submenu vertical line */}
                                <div 
                                  className={`absolute left-[18px] top-[6px] w-[22px] h-[18px] border-l-2 border-b-2 rounded-bl-lg ${
                                    isDark ? 'border-gray-600' : 'border-gray-400'
                                  }`}
                                ></div>
                                <div className="ml-[20px]">
                                  <ProjectRow
                                    project={project}
                                    isDark={isDark}
                                  />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        <div className="pl-6 pb-2 space-y-1 relative">
                          {/* Vertical line for pages submenu */}
                          {pages.filter((p) => p.menuKey === item.key).length > 0 && (
                            <div 
                              className={`absolute left-[18px] top-2 bottom-0 w-[2px] ${
                                isDark ? 'bg-gray-600' : 'bg-gray-400'
                              }`}
                            />
                          )}
                          
                          {pages
                            .filter((p) => p.menuKey === item.key)
                            .slice(0, 5)
                            .map((p, index) => {
                              const bgColors = [
                                isDark ? "bg-purple-500/10" : "bg-purple-100",
                                isDark ? "bg-blue-500/10" : "bg-blue-100",
                                isDark ? "bg-green-500/10" : "bg-green-100",
                                isDark ? "bg-orange-500/10" : "bg-orange-100",
                                isDark ? "bg-pink-500/10" : "bg-pink-100",
                              ];

                              const bgColor = bgColors[index % bgColors.length];

                              return (
                                <div
                                  key={p._id}
                                  className="relative"
                                >
                                  {/* Curved L-connector from submenu vertical line */}
                                  <div 
                                    className={`absolute left-[18px] top-[6px] w-[22px] h-[16px] border-l-2 border-b-2 rounded-bl-lg ${
                                      isDark ? 'border-gray-600' : 'border-gray-400'
                                    }`}
                                  ></div>
                                  
                                  <div
                                    className={`group text-xs px-3 py-2 rounded-lg cursor-pointer transition-all ml-[20px] ${bgColor} ${
                                      isDark
                                        ? "text-gray-300 hover:brightness-125"
                                        : "text-gray-800 hover:brightness-95"
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      alert(`Open page: ${p.pageName}`);
                                    }}
                                  >
                                    <div className="flex items-center gap-2 justify-between">
                                      <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <span
                                          className="text-lg flex-shrink-0"
                                          title={`Emoji: ${p.emoji}`}
                                        >
                                          {p.emoji || "📄"}
                                        </span>
                                        <span className="truncate font-medium">
                                          {p.pageName}
                                        </span>
                                      </div>

                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (confirm(`Delete "${p.pageName}"?`)) {
                                            handleDeletePage(p._id);
                                          }
                                        }}
                                        className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
                                          isDark
                                            ? "hover:bg-white/10"
                                            : "hover:bg-white/50"
                                        }`}
                                      >
                                        <span className="text-xs">✕</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM THEME TOGGLE ================= */}
        <div className={`mt-auto ${open ? "p-6 pb-4" : "p-4 pb-2"}`}>
          <div
            className={`flex items-center justify-center rounded-full p-1 border transition-all duration-300 ${
              isDark ? "bg-black/40 border-gray-800" : "bg-gray-100 border-rose-200"
            }`}
          >
            <button
              onClick={() => setGlobalTheme(false)}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                !isDark
                  ? "bg-white text-amber-500 shadow-sm"
                  : "text-gray-600 hover:text-gray-400"
              }`}
            >
              <Sun size={16} />
            </button>
            <button
              onClick={() => setGlobalTheme(true)}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-[#2c2d31] text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Moon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= SIDEBAR TOGGLE (Desktop Only) ================= */}
      <motion.button
        layout
        onClick={() => setOpen((pv) => !pv)}
        className={`hidden lg:flex fixed bottom-0 left-0 border-t z-50 ${
          isDark
            ? "border-gray-800 bg-[#0F1014] hover:bg-[#1a1b1e]"
            : "border-rose-200 bg-rose-50 hover:bg-rose-100"
        }`}
        style={{ width: open ? "300px" : "80px" }}
      >
        <div
          className={`flex items-center ${
            open ? "justify-start px-4" : "justify-center"
          } p-2`}
        >
          <motion.div
            layout
            className={`grid ${open ? "size-10" : "size-8"} place-content-center text-lg`}
          >
            <FiChevronsRight
              className={`${!open && "rotate-180"} ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
              size={open ? 20 : 18}
            />
          </motion.div>
          {open && (
            <motion.span layout className="text-xs font-medium">
              Hide
            </motion.span>
          )}
        </div>
      </motion.button>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - Fixed top right, doesn't overlap header */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl shadow-lg ${
          isDark
            ? "bg-[#0F1014] text-gray-300 border border-gray-800"
            : "bg-white text-gray-900 border border-rose-200"
        }`}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed top-0 left-0 h-screen w-[300px] z-40 flex flex-col font-sans border-r ${
              isDark
                ? "bg-[#0F1014] text-gray-300 border-gray-800"
                : "bg-rose-50 text-gray-900 border-rose-200"
            }`}
          >
            <SidebarContent />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.nav
        layout
        className={`hidden lg:flex h-screen flex-col font-sans shrink-0 relative border-t ${
          isDark
            ? "bg-[#0F1014] text-gray-300 border-gray-800"
            : "bg-rose-50 text-gray-900 border-rose-200"
        }`}
        style={{
          width: open ? "300px" : "80px",
          minWidth: open ? "300px" : "80px",
        }}
      >
        <SidebarContent />
      </motion.nav>

      {/* ================= CREATE PAGE MODAL ================= */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="New Project"
          isDark={isDark}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-rose-500 text-2xl flex items-center justify-center">
                {projectForm.emoji}
              </button>

              <input
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm((pv) => ({ ...pv, name: e.target.value }))
                }
                placeholder="Project name..."
                className={`w-full p-4 rounded-2xl border outline-none ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-white border-rose-100 text-gray-900"
                }`}
              />
            </div>

            <button
              onClick={async () => {
                if (!projectForm.name.trim()) return;

                await fetch("/api/projects", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: projectForm.name,
                    emoji: projectForm.emoji,
                  }),
                });

                const res = await fetch("/api/projects");
                const data = await res.json();
                setProjects(data);

                setProjectForm({ name: "", emoji: "📁" });
                setCreateProjectModalOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-rose-600 text-white font-semibold"
            >
              Create Project
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}