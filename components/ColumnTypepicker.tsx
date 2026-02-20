// "use client";

// import * as Popover from "@radix-ui/react-popover";
// import { ColumnType } from "@/app/store/TableStore";

// const TYPES: { type: ColumnType; label: string; icon: string }[] = [
//   { type: "text", label: "Text", icon: "≡" },
//   { type: "number", label: "Number", icon: "#" },
//   { type: "select", label: "Select", icon: "◉" },
//   { type: "multi_select", label: "Multi-select", icon: "☰" },
//   { type: "status", label: "Status", icon: "✳" },
//   { type: "date", label: "Date", icon: "📅" },
//   { type: "person", label: "Person", icon: "👤" },
//   { type: "checkbox", label: "Checkbox", icon: "☑" },
//   { type: "url", label: "URL", icon: "🔗" },
//   { type: "email", label: "Email", icon: "@" },
//   { type: "phone", label: "Phone", icon: "📞" },
// ];

// export default function ColumnTypePicker({
//   value,
//   onChange,
// }: {
//   value: ColumnType;
//   onChange: (t: ColumnType) => void;
// }) {
//   return (
//     <Popover.Root>
//       <Popover.Trigger asChild>
//         <button className="text-xs px-2 py-1 rounded-md hover:bg-gray-100 border">
//           {value} ▾
//         </button>
//       </Popover.Trigger>

//       <Popover.Portal>
//         <Popover.Content
//           sideOffset={6}
//           className="w-[320px] bg-white border rounded-xl shadow-lg p-2 z-[999]"
//         >
//           <div className="text-xs font-semibold text-gray-500 px-2 py-2">
//             Select type
//           </div>

//           <div className="grid grid-cols-2 gap-1">
//             {TYPES.map((t) => (
//               <button
//                 key={t.type}
//                 onClick={() => onChange(t.type)}
//                 className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
//               >
//                 <span className="w-6 text-center text-gray-500">{t.icon}</span>
//                 <span className="text-sm">{t.label}</span>
//               </button>
//             ))}
//           </div>
//         </Popover.Content>
//       </Popover.Portal>
//     </Popover.Root>
//   );
// }



// "use client";

// import * as Popover from "@radix-ui/react-popover";
// import { useState } from "react";
// import { ColumnType } from "@/app/store/TableStore";

// const TYPES: { type: ColumnType; label: string; icon: string }[] = [
//   { type: "text", label: "Text", icon: "≡" },
//   { type: "number", label: "Number", icon: "#" },
//   { type: "select", label: "Select", icon: "◉" },
//   { type: "multi_select", label: "Multi-select", icon: "☰" },
//   { type: "status", label: "Status", icon: "✳" },
//   { type: "date", label: "Date", icon: "📅" },
//   { type: "person", label: "Person", icon: "👤" },
//   { type: "checkbox", label: "Checkbox", icon: "☑" },
//   { type: "url", label: "URL", icon: "🔗" },
//   { type: "email", label: "Email", icon: "@" },
//   { type: "phone", label: "Phone", icon: "📞" },
// ];

// export default function ColumnTypePicker({
//   value,
//   onChange,
// }: {
//   value: ColumnType;
//   onChange: (t: ColumnType) => void;
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Popover.Root open={open} onOpenChange={setOpen}>
//       <Popover.Trigger asChild>
//         <button className="text-xs px-2 py-1 rounded-md hover:bg-gray-100 border">
//           {value} ▾
//         </button>
//       </Popover.Trigger>

//       <Popover.Portal>
//         <Popover.Content
//           sideOffset={6}
//           className="w-[320px] bg-white border rounded-xl shadow-lg p-2 z-[999]"
//         >
//           <div className="text-xs font-semibold text-gray-500 px-2 py-2">
//             Select type
//           </div>

//           <div className="grid grid-cols-2 gap-1">
//             {TYPES.map((t) => (
//               <button
//                 key={t.type}
//                 onClick={() => {
//                   onChange(t.type);
//                   setOpen(false); // ✅ close popup after select
//                 }}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
//                   value === t.type ? "bg-gray-100" : "hover:bg-gray-100"
//                 }`}
//               >
//                 <span className="w-6 text-center text-gray-500">{t.icon}</span>
//                 <span className="text-sm">{t.label}</span>
//               </button>
//             ))}
//           </div>
//         </Popover.Content>
//       </Popover.Portal>
//     </Popover.Root>
//   );
// }
"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { useTheme } from "next-themes";
import { ColumnType } from "@/app/store/TableStore";

const TYPES: { type: ColumnType; label: string; icon: string }[] = [
  { type: "text", label: "Text", icon: "≡" },
  { type: "number", label: "Number", icon: "#" },
  { type: "select", label: "Select", icon: "◉" },
  { type: "multi_select", label: "Multi-select", icon: "☰" },
  { type: "status", label: "Status", icon: "✳" },
  { type: "date", label: "Date", icon: "📅" },
  { type: "person", label: "Person", icon: "👤" },
  { type: "checkbox", label: "Checkbox", icon: "☑" },
  { type: "url", label: "URL", icon: "🔗" },
  { type: "email", label: "Email", icon: "@" },
  { type: "phone", label: "Phone", icon: "📞" },
  { type: "formula" , label: "Formula",icon:"x" },
];

export default function ColumnTypePicker({
  value,
  onChange,
}: {
  value: ColumnType;
  onChange: (t: ColumnType) => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className={`text-xs px-2 py-1 rounded-md border ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
          {value} ▾
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          className={`w-[320px] border rounded-xl shadow-lg p-2 z-[999] ${isDark ? "bg-[#1e1f23] border-gray-700" : "bg-white border-gray-200"}`}
        >
          <div className={`text-xs font-semibold px-2 py-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Select type
          </div>

          <div className="grid grid-cols-2 gap-1">
            {TYPES.map((t) => (
              <button
                key={t.type}
                onClick={() => {
                  onChange(t.type);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                  value === t.type
                    ? isDark ? "bg-gray-800" : "bg-gray-100"
                    : isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <span className={`w-6 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.icon}</span>
                <span className={`text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>{t.label}</span>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}