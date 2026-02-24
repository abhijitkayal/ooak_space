"use client";

import { useState } from "react";

type Property = {
  _id: string;
  name: string;
  type: string;
};

const PROPERTY_TYPES = [
  { type: "text", label: "Text", icon: "T" },
  { type: "number", label: "Number", icon: "#" },
  { type: "select", label: "Select", icon: "▼" },
  { type: "multi_select", label: "Multi-select", icon: "☰" },
  { type: "date", label: "Date", icon: "📅" },
  { type: "checkbox", label: "Checkbox", icon: "☑" },
  { type: "url", label: "URL", icon: "🔗" },
  { type: "email", label: "Email", icon: "✉" },
  { type: "person", label: "Person", icon: "👤" },
  { type: "files", label: "Files & Media", icon: "📁" },
  { type: "formula", label: "Formula", icon: "∑" },
];

export default function AddPropertyPicker({
  properties,
  visiblePropIds,
  databaseId,
  onPick,
  onPropertyCreated,
  onClose,
}: {
  properties: Property[];
  visiblePropIds: string[];
  databaseId: string;
  onPick: (propId: string) => void;
  onPropertyCreated: () => void;
  onClose: () => void;
}) {
  const [creating, setCreating] = useState(false);

  const createAndAddProperty = async (type: string, label: string) => {
    console.log("Creating property:", type, label);
    setCreating(true);

    const options =
      type === "select"
        ? ["Not started", "In progress", "Done"]
        : type === "multi_select"
        ? ["Work", "Personal", "Important"]
        : [];

    try {
      const res = await fetch("/api/todo/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          databaseId,
          name: label,
          type,
          options,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Failed to create property:", error);
        alert(`Failed to create property: ${error.error || 'Unknown error'}`);
        setCreating(false);
        return;
      }

      const newProp = await res.json();
      console.log("Property created successfully:", newProp);

      setCreating(false);
      
      // Call onPropertyCreated and wait for parent to refresh
      await onPropertyCreated();
      
      // Close modal after parent has refreshed
      onClose();
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property. Please try again.");
      setCreating(false);
    }
  };

  const hiddenProps = properties.filter(
    (p) => p.type !== "title" && !visiblePropIds.includes(p._id)
  );

  return (
    <div 
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/20"
      onClick={() => {
        console.log("Backdrop clicked");
        onClose();
      }}
    >
      <div 
        className="w-full max-w-md bg-white rounded-xl border shadow-xl overflow-hidden"
        onClick={(e) => {
          console.log("Modal content clicked");
          e.stopPropagation();
        }}
      >
        <div className="px-4 py-3 border-b">
          <div className="text-sm font-semibold">Add a property</div>
          <div className="text-xs text-gray-500 mt-1">
            Click a type to create a new property
          </div>
        </div>

        <div className="max-h-[400px] overflow-auto">
          {/* Existing hidden properties */}
          {hiddenProps.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                EXISTING PROPERTIES
              </div>
              {hiddenProps.map((p) => (
                <button
                  key={p._id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Existing property clicked:", p._id, p.name);
                    onPick(p._id);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-50 border-b cursor-pointer"
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {p.type.replace("_", " ")}
                  </div>
                </button>
              ))}
            </>
          )}

          {/* Property types to create */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
            CREATE NEW PROPERTY
          </div>
          {PROPERTY_TYPES.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Button clicked:", type, label);
                createAndAddProperty(type, label);
              }}
              disabled={creating}
              className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-blue-50 border-b disabled:opacity-50 cursor-pointer"
            >
              <span className="text-lg w-6 text-center">{icon}</span>
              <div className="flex-1 font-medium">{label}</div>
              <div className="text-xs text-gray-400">Click to add</div>
            </button>
          ))}
        </div>

        <div className="px-4 py-3 border-t flex justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Close button clicked");
              onClose();
            }}
            className="text-sm px-4 py-2 rounded-md border hover:bg-gray-50 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
