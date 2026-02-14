"use client";

const TYPES = [
  { type: "text", label: "Text" },
  { type: "number", label: "Number" },
  { type: "select", label: "Select" },
  { type: "multi_select", label: "Multi-select" },
  { type: "status", label: "Status" },
  { type: "date", label: "Date" },
  { type: "person", label: "Person" },
  { type: "files", label: "Files & media" },
  { type: "checkbox", label: "Checkbox" },
  { type: "url", label: "URL" },
  { type: "email", label: "Email" },
  { type: "phone", label: "Phone" },
  { type: "formula", label: "Formula" },
  { type: "relation", label: "Relation" },
];

export default function PropertyTypePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (t: string) => void;
}) {
  return (
    <select
      className="border rounded-lg px-2 py-1 text-xs"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {TYPES.map((t) => (
        <option key={t.type} value={t.type}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
