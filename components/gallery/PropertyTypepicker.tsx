// "use client";

// const TYPES = [
//   { type: "text", label: "Text" },
//   { type: "number", label: "Number" },
//   { type: "select", label: "Select" },
//   { type: "multi_select", label: "Multi-select" },
//   { type: "status", label: "Status" },
//   { type: "date", label: "Date" },
//   { type: "person", label: "Person" },
//   { type: "files", label: "Files & media" },
//   { type: "checkbox", label: "Checkbox" },
//   { type: "url", label: "URL" },
//   { type: "email", label: "Email" },
//   { type: "phone", label: "Phone" },
//   { type: "formula", label: "Formula" },
//   { type: "relation", label: "Relation" },
// ];

// export default function PropertyTypePicker({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (t: string) => void;
// }) {
//   return (
//     <select
//       className="border rounded-lg px-2 py-1 text-xs"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     >
//       {TYPES.map((t) => (
//         <option key={t.type} value={t.type}>
//           {t.label}
//         </option>
//       ))}
//     </select>
//   );
// }


"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPES = [
  { type: "text", label: "Text" },
  { type: "number", label: "Number" },
  { type: "select", label: "Select" },
  { type: "multi_select", label: "Multi-select" },
  { type: "date", label: "Date" },
  { type: "person", label: "Person" },
  { type: "files", label: "Files & media" },
  { type: "checkbox", label: "Checkbox" },
  { type: "url", label: "URL" },
  { type: "email", label: "Email" },
  { type: "formula", label: "Formula" },
];

export default function PropertyTypePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (t: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>

      <SelectContent className="bg-white max-h-60 overflow-y-auto">
        {TYPES.map((t) => (
          <SelectItem key={t.type} value={t.type}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
