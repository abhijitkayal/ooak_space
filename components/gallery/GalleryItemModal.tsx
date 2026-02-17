// "use client";

// import { useEffect, useState } from "react";
// import PropertyTypepicker from "./PropertyTypepicker";
// import AddPropertyModal from "./AddPropertyModal";

// type Property = {
//   _id: string;
//   databaseId: string;
//   name: string;
//   type: string;
//   options?: Array<{ label: string; color: string }>;
// };

// type Item = {
//   _id: string;
//   databaseId: string;
//   title?: string;
//   values: Record<string, any>;
// };

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   item: Item;
//   databaseId: string;
//   properties: Property[];
//   onSaved: () => void;
// };

// export default function GalleryItemModal({
//   isOpen,
//   onClose,
//   item,
//   databaseId,
//   properties,
//   onSaved,
// }: Props) {
//   const [title, setTitle] = useState(item.title || "Untitled");
//   const [values, setValues] = useState<Record<string, any>>(item.values || {});
//   const [saving, setSaving] = useState(false);
//   const [showAddProperty, setShowAddProperty] = useState(false);

//   useEffect(() => {
//     setTitle(item.title || "Untitled");
//     setValues(item.values || {});
//   }, [item]);

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       console.log("Saving item:", { id: item._id, title, values });
      
//       const response = await fetch(`/api/items/${item._id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title,
//           values,
//         }),
//       });
      
//       if (!response.ok) {
//         const error = await response.text();
//         console.error("Save failed:", error);
//         alert("Failed to save changes");
//         return;
//       }
      
//       const updated = await response.json();
//       console.log("Saved successfully:", updated);
      
//       onSaved();
//       onClose();
//     } catch (error) {
//       console.error("Failed to save:", error);
//       alert("Error saving changes");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleValueChange = (propertyId: string, value: any) => {
//     setValues((prev) => ({
//       ...prev,
//       [propertyId]: value,
//     }));
//   };

//   const renderPropertyInput = (prop: Property) => {
//     const currentValue = values[prop._id];

//     switch (prop.type) {
//       case "text":
//       case "email":
//       case "phone":
//       case "url":
//         return (
//           <input
//             type="text"
//             value={currentValue || ""}
//             onChange={(e) => handleValueChange(prop._id, e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder={`Enter ${prop.name.toLowerCase()}`}
//           />
//         );

//       case "number":
//         return (
//           <input
//             type="number"
//             value={currentValue || ""}
//             onChange={(e) => handleValueChange(prop._id, e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder={`Enter ${prop.name.toLowerCase()}`}
//           />
//         );

//       case "date":
//         const dateValue = currentValue
//           ? new Date(currentValue).toISOString().split("T")[0]
//           : "";
//         return (
//           <input
//             type="date"
//             value={dateValue}
//             onChange={(e) => handleValueChange(prop._id, e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         );

//       case "checkbox":
//         return (
//           <input
//             type="checkbox"
//             checked={currentValue || false}
//             onChange={(e) => handleValueChange(prop._id, e.target.checked)}
//             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//           />
//         );

//       case "select":
//       case "status":
//         return (
//           <select
//             value={currentValue || ""}
//             onChange={(e) => handleValueChange(prop._id, e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select {prop.name.toLowerCase()}</option>
//             {prop.options?.map((opt) => (
//               <option key={opt.label} value={opt.label}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "multi_select":
//         const multiValues = Array.isArray(currentValue) ? currentValue : [];
//         return (
//           <div className="space-y-2">
//             {prop.options?.map((opt) => (
//               <label key={opt.label} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={multiValues.includes(opt.label)}
//                   onChange={(e) => {
//                     const newValues = e.target.checked
//                       ? [...multiValues, opt.label]
//                       : multiValues.filter((v) => v !== opt.label);
//                     handleValueChange(prop._id, newValues);
//                   }}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span>{opt.label}</span>
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return (
//           <input
//             type="text"
//             value={currentValue || ""}
//             onChange={(e) => handleValueChange(prop._id, e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder={`Enter ${prop.name.toLowerCase()}`}
//           />
//         );
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="px-6 py-4 border-b space-y-3">
//           <div className="flex items-center justify-between">
//             <div className="flex-1">
//               <div className="text-xs text-gray-400 mb-1">TITLE</div>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="text-2xl font-bold focus:outline-none border-b-2 border-transparent focus:border-blue-500 transition-colors w-full"
//                 placeholder="Untitled"
//               />
//             </div>
//             <button
//               onClick={onClose}
//               className="ml-4 text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         {/* Properties */}
//         <div className="flex-1 overflow-y-auto px-6 py-4">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-sm font-semibold text-gray-700 uppercase">Properties</h3>
//             <button
//               onClick={() => setShowAddProperty(true)}
//               className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600"
//             >
//               + Add Property
//             </button>
//           </div>

//           {properties.length === 0 && (
//             <div className="text-center py-8 text-gray-400">
//               <p>No properties available yet.</p>
//               <p className="text-sm mt-1">Click "+ Add Property" to create fields for your cards.</p>
//             </div>
//           )}

//           {/* Filled Properties */}
//           {properties.filter((p) => {
//             const v = values[p._id];
//             return v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0);
//           }).length > 0 && (
//             <div className="space-y-6 mb-6">
//               <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
//                 Filled Properties
//               </div>
//               {properties
//                 .filter((p) => {
//                   const v = values[p._id];
//                   return v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0);
//                 })
//                 .map((prop) => (
//                   <div key={prop._id} className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       {prop.name}
//                       <span className="ml-2 text-xs text-gray-400 font-normal">
//                         ({prop.type})
//                       </span>
//                     </label>
//                     {renderPropertyInput(prop)}
//                   </div>
//                 ))}
//             </div>
//           )}

//           {/* Empty Properties */}
//           {properties.filter((p) => {
//             const v = values[p._id];
//             return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
//           }).length > 0 && (
//             <div className="space-y-6">
//               <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
//                 Empty Properties (Available to fill)
//               </div>
//               {properties
//                 .filter((p) => {
//                   const v = values[p._id];
//                   return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
//                 })
//                 .map((prop) => (
//                   <div key={prop._id} className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
//                     <label className="block text-sm font-medium text-gray-500">
//                       {prop.name}
//                       <span className="ml-2 text-xs text-gray-400 font-normal">
//                         ({prop.type})
//                       </span>
//                     </label>
//                     {renderPropertyInput(prop)}
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition-colors"
//             disabled={saving}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
//           >
//             {saving ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>

//       {/* ADD PROPERTY MODAL */}
//       {showAddProperty && (
//         <AddPropertyModal
//           isOpen={showAddProperty}
//           onClose={() => setShowAddProperty(false)}
//           databaseId={databaseId}
//           onSaved={() => {
//             setShowAddProperty(false);
//             onSaved();
//           }}
//         />
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import PropertyTypepicker from "./PropertyTypepicker";
import AddPropertyModal from "./AddPropertyModal";

type Property = {
  _id: string;
  databaseId: string;
  name: string;
  type: string;
  options?: Array<{ label: string; color: string }>;
};

type Item = {
  _id: string;
  databaseId: string;
  title?: string;
  values: Record<string, any>;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
  databaseId: string;
  properties: Property[];
  onSaved: () => void;
};

export default function GalleryItemModal({
  isOpen,
  onClose,
  item,
  databaseId,
  properties,
  onSaved,
}: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [title, setTitle] = useState(item.title || "Untitled");
  const [values, setValues] = useState<Record<string, any>>(item.values || {});
  const [saving, setSaving] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);

  useEffect(() => {
    setTitle(item.title || "Untitled");
    setValues(item.values || {});
  }, [item]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/items/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, values }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Save failed:", error);
        alert("Failed to save changes");
        return;
      }

      onSaved();
      onClose();
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  const handleValueChange = (propertyId: string, value: any) => {
    setValues((prev) => ({ ...prev, [propertyId]: value }));
  };

  const inputClass = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
    isDark
      ? "bg-[#18191d] border-gray-700 text-gray-100 placeholder-gray-500"
      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
  }`;

  const renderPropertyInput = (prop: Property) => {
    const currentValue = values[prop._id];

    switch (prop.type) {
      case "text":
      case "email":
      case "phone":
      case "url":
        return (
          <input
            type="text"
            value={currentValue || ""}
            onChange={(e) => handleValueChange(prop._id, e.target.value)}
            className={inputClass}
            placeholder={`Enter ${prop.name.toLowerCase()}`}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={currentValue || ""}
            onChange={(e) => handleValueChange(prop._id, e.target.value)}
            className={inputClass}
            placeholder={`Enter ${prop.name.toLowerCase()}`}
          />
        );

      case "date":
        const dateValue = currentValue
          ? new Date(currentValue).toISOString().split("T")[0]
          : "";
        return (
          <input
            type="date"
            value={dateValue}
            onChange={(e) => handleValueChange(prop._id, e.target.value)}
            className={inputClass}
          />
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={currentValue || false}
            onChange={(e) => handleValueChange(prop._id, e.target.checked)}
            className={`w-5 h-5 rounded focus:ring-blue-500 ${isDark ? "accent-blue-500 border-gray-600" : "border-gray-300 text-blue-600"}`}
          />
        );

      case "select":
      case "status":
        return (
          <select
            value={currentValue || ""}
            onChange={(e) => handleValueChange(prop._id, e.target.value)}
            className={inputClass}
          >
            <option value="">Select {prop.name.toLowerCase()}</option>
            {prop.options?.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "multi_select":
        const multiValues = Array.isArray(currentValue) ? currentValue : [];
        return (
          <div className="space-y-2">
            {prop.options?.map((opt) => (
              <label key={opt.label} className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <input
                  type="checkbox"
                  checked={multiValues.includes(opt.label)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...multiValues, opt.label]
                      : multiValues.filter((v) => v !== opt.label);
                    handleValueChange(prop._id, newValues);
                  }}
                  className={`rounded focus:ring-blue-500 ${isDark ? "accent-blue-500 border-gray-600" : "border-gray-300 text-blue-600"}`}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={currentValue || ""}
            onChange={(e) => handleValueChange(prop._id, e.target.value)}
            className={inputClass}
            placeholder={`Enter ${prop.name.toLowerCase()}`}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col ${isDark ? "bg-[#1e1f23]" : "bg-white"}`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b space-y-3 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>TITLE</div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`text-2xl font-bold focus:outline-none border-b-2 border-transparent focus:border-blue-500 transition-colors w-full bg-transparent ${isDark ? "text-gray-100" : "text-gray-900"}`}
                placeholder="Untitled"
              />
            </div>
            <button
              onClick={onClose}
              className={`ml-4 text-2xl ${isDark ? "text-gray-500 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`}
            >
              ×
            </button>
          </div>
        </div>

        {/* Properties */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold uppercase ${isDark ? "text-gray-400" : "text-gray-700"}`}>
              Properties
            </h3>
            <button
              onClick={() => setShowAddProperty(true)}
              className={`text-sm px-3 py-1.5 rounded-lg border ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
            >
              + Add Property
            </button>
          </div>

          {properties.length === 0 && (
            <div className={`text-center py-8 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              <p>No properties available yet.</p>
              <p className="text-sm mt-1">Click "+ Add Property" to create fields for your cards.</p>
            </div>
          )}

          {/* Filled Properties */}
          {properties.filter((p) => {
            const v = values[p._id];
            return v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0);
          }).length > 0 && (
            <div className="space-y-6 mb-6">
              <div className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
                Filled Properties
              </div>
              {properties
                .filter((p) => {
                  const v = values[p._id];
                  return v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0);
                })
                .map((prop) => (
                  <div key={prop._id} className="space-y-2">
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {prop.name}
                      <span className={`ml-2 text-xs font-normal ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        ({prop.type})
                      </span>
                    </label>
                    {renderPropertyInput(prop)}
                  </div>
                ))}
            </div>
          )}

          {/* Empty Properties */}
          {properties.filter((p) => {
            const v = values[p._id];
            return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
          }).length > 0 && (
            <div className="space-y-6">
              <div className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                Empty Properties (Available to fill)
              </div>
              {properties
                .filter((p) => {
                  const v = values[p._id];
                  return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
                })
                .map((prop) => (
                  <div key={prop._id} className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {prop.name}
                      <span className={`ml-2 text-xs font-normal ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        ({prop.type})
                      </span>
                    </label>
                    {renderPropertyInput(prop)}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${isDark ? "border-gray-800 bg-[#18191d]" : "border-gray-200 bg-gray-50"}`}>
          <button
            onClick={onClose}
            disabled={saving}
            className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {showAddProperty && (
        <AddPropertyModal
          isOpen={showAddProperty}
          onClose={() => setShowAddProperty(false)}
          databaseId={databaseId}
          onSaved={() => {
            setShowAddProperty(false);
            onSaved();
          }}
        />
      )}
    </div>
  );
}