
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useTheme } from "next-themes";
// import AddPropertyModal from "./AddPropertyModal";
// import GalleryItemModal from "./GalleryItemModal";

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

// export default function GalleryView({ databaseId }: { databaseId: string }) {
//   const { resolvedTheme } = useTheme();
//   const isDark = resolvedTheme === "dark";

//   const [properties, setProperties] = useState<Property[]>([]);
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showAddProperty, setShowAddProperty] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<Item | null>(null);
//   const [showItemModal, setShowItemModal] = useState(false);

//   const fetchAll = async () => {
//     setLoading(true);

//     const [pRes, iRes] = await Promise.all([
//       fetch(`/api/properties?databaseId=${databaseId}`),
//       fetch(`/api/items?databaseId=${databaseId}`),
//     ]);

//     setProperties(await pRes.json());
//     setItems(await iRes.json());
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchAll();
//   }, [databaseId]);

//   const titleProp = useMemo(() => properties[0], [properties]);
//   const cardProps = useMemo(() => properties.slice(1, 5), [properties]);

//   const createItem = async () => {
//     await fetch("/api/items", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ databaseId, values: {} }),
//     });

//     fetchAll();
//   };

//   const handleCardClick = (item: Item) => {
//     setSelectedItem(item);
//     setShowItemModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowItemModal(false);
//     setSelectedItem(null);
//   };

//   const renderValue = (prop: Property, value: any) => {
//     if (!value) return "";

//     if (prop.type === "multi_select" && Array.isArray(value)) {
//       return value.join(", ");
//     }

//     if (prop.type === "date") {
//       try {
//         return new Date(value).toLocaleDateString();
//       } catch {
//         return value;
//       }
//     }

//     return String(value);
//   };

//   if (loading) {
//     return (
//       <div className={`p-6 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
//         Loading gallery...
//       </div>
//     );
//   }

//   return (
//     <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-[#18191d] border-gray-800" : "bg-white border-gray-200"}`}>
//       {/* HEADER */}
//       <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
//         <div className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
//           Gallery
//         </div>

//         <div className="flex gap-2">
//           <button
//             onClick={() => setShowAddProperty(true)}
//             className={`px-3 py-1.5 rounded-lg border text-sm ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
//           >
//             + Property
//           </button>

//           <button
//             onClick={createItem}
//             className={`px-3 py-1.5 rounded-lg border text-sm ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
//           >
//             + New
//           </button>
//         </div>
//       </div>

//       {/* CARDS GRID */}
//       <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {items.length === 0 && (
//           <div className={`col-span-full text-center py-12 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
//             <div className="text-4xl mb-2">📦</div>
//             <div className="text-lg">No items yet</div>
//             <div className="text-sm mt-1">Click "+ New" to create your first card</div>
//           </div>
//         )}

//         {items.map((it) => {
//           const title = it.title || "Untitled";

//           return (
//             <div
//               key={it._id}
//               onClick={() => handleCardClick(it)}
//               className={`rounded-xl border shadow-sm hover:shadow-md transition p-4 cursor-pointer ${isDark ? "bg-[#1e1f23] border-gray-700 hover:bg-[#252730]" : "bg-white border-gray-200 hover:bg-gray-50"}`}
//             >
//               {/* Title */}
//               <div className={`text-base font-semibold line-clamp-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
//                 {title}
//               </div>

//               {/* Properties */}
//               <div className="mt-3 space-y-2 text-sm">
//                 {properties
//                   .filter((p) => {
//                     const v = it.values?.[p._id];
//                     const text = renderValue(p, v);
//                     return text && text.trim() !== "";
//                   })
//                   .slice(0, 4)
//                   .map((p) => {
//                     const v = it.values?.[p._id];
//                     const text = renderValue(p, v);

//                     return (
//                       <div key={p._id} className="flex items-start gap-2">
//                         <div className={`w-[90px] shrink-0 truncate text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
//                           {p.name}:
//                         </div>
//                         <div className={`font-medium line-clamp-2 flex-1 ${isDark ? "text-gray-300" : "text-gray-900"}`}>
//                           {text}
//                         </div>
//                       </div>
//                     );
//                   })}

//                 {!properties.some((p) => {
//                   const v = it.values?.[p._id];
//                   const text = renderValue(p, v);
//                   return text && text.trim() !== "";
//                 }) && (
//                   <div className={`text-xs italic mt-2 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
//                     Click to add details
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ADD PROPERTY MODAL */}
//       {showAddProperty && (
//         <AddPropertyModal
//           isOpen={showAddProperty}
//           onClose={() => setShowAddProperty(false)}
//           databaseId={databaseId}
//           onSaved={fetchAll}
//         />
//       )}

//       {/* EDIT ITEM MODAL */}
//       {showItemModal && selectedItem && (
//         <GalleryItemModal
//           isOpen={showItemModal}
//           onClose={handleCloseModal}
//           item={selectedItem}
//           databaseId={databaseId}
//           properties={properties}
//           onSaved={fetchAll}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";

import AddPropertyModal from "./AddPropertyModal";
import GalleryItemModal from "./GalleryItemModal";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { Plus } from "lucide-react";
import { SpinnerFullscreen } from "../ui/spinner";

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
  values: Record<string, unknown>;
};

export default function GalleryView({ databaseId }: { databaseId: string }) {
  const { resolvedTheme } = useTheme();
  const [properties, setProperties] = useState<Property[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddProperty, setShowAddProperty] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);

  const isDark = resolvedTheme === "dark";

  const fetchAll = useCallback(async () => {
    const [pRes, iRes] = await Promise.all([
      fetch(`/api/properties?databaseId=${databaseId}`),
      fetch(`/api/items?databaseId=${databaseId}`),
    ]);

    setProperties(await pRes.json());
    setItems(await iRes.json());
  }, [databaseId]);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      setLoading(true);
      
      const [pRes, iRes] = await Promise.all([
        fetch(`/api/properties?databaseId=${databaseId}`),
        fetch(`/api/items?databaseId=${databaseId}`),
      ]);

      if (mounted) {
        setProperties(await pRes.json());
        setItems(await iRes.json());
        setLoading(false);
      }
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, [databaseId]);

  const createItem = async () => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ databaseId, values: {} }),
    });

    const created = await res.json();
    setItems((prev) => [created, ...prev]);
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleCloseModal = () => {
    setShowItemModal(false);
    setSelectedItem(null);
  };

  const renderValue = (prop: Property, value: unknown): string => {
    if (!value) return "";

    if (prop.type === "multi_select" && Array.isArray(value)) {
      return value.join(", ");
    }

    if (prop.type === "date") {
      try {
        if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
          return new Date(value).toLocaleDateString();
        }
        return String(value);
      } catch {
        return String(value);
      }
    }

    return String(value);
  };

  if (loading) {
    return <SpinnerFullscreen text="Loading gallery..." />;
  }

  return (
    <Card className={`overflow-hidden ${isDark ? "bg-black border-white" : "bg-gray-100 border-gray-200"}`}>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gallery</CardTitle>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddProperty(true)}
          >
            + Property
          </Button>

          <Button size="sm" onClick={createItem}>
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        </div>
      </CardHeader>

      <Separator />

      {/* Grid */}
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 && (
            <div className="col-span-full py-14 text-center text-muted-foreground">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-lg font-medium">No items yet</div>
              <div className="text-sm mt-1">
                Click “New” to create your first card
              </div>
            </div>
          )}

          {items.map((it) => {
            const title = it.title || "Untitled";

            const filledProps = properties
              .filter((p) => {
                const v = it.values?.[p._id];
                const text = renderValue(p, v);
                return text && text.trim() !== "";
              })
              .slice(0, 4);

            return (
              <Card
                key={it._id}
                onClick={() => handleCardClick(it)}
                className={`cursor-pointer transition border ${
                  isDark
                    ? "bg-transparent border-white hover:bg-gray-800"
                    : "bg-rose-50 border-gray-200 hover:bg-rose-100"
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  {/* Title */}
                  <div className="text-base font-semibold line-clamp-2">
                    {title}
                  </div>

                  {/* Props */}
                  <div className="space-y-2 text-sm">
                    {filledProps.map((p) => {
                      const v = it.values?.[p._id];
                      const text = renderValue(p, v);

                      return (
                        <div key={p._id} className="flex items-start gap-2 ">
                          <Badge variant="secondary" className="shrink-0">
                            {p.name}
                          </Badge>

                          <div className="font-medium line-clamp-2 text-muted-foreground">
                            {text}
                          </div>
                        </div>
                      );
                    })}

                    {filledProps.length === 0 && (
                      <div className="text-xs italic text-muted-foreground">
                        Click to add details
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>

      {/* Add property modal */}
      {showAddProperty && (
        <AddPropertyModal
          isOpen={showAddProperty}
          onClose={() => setShowAddProperty(false)}
          databaseId={databaseId}
          onSaved={fetchAll}
        />
      )}

      {/* Edit item modal */}
      {showItemModal && selectedItem && (
        <GalleryItemModal
          isOpen={showItemModal}
          onClose={handleCloseModal}
          item={selectedItem}
          databaseId={databaseId}
          properties={properties}
          onSaved={fetchAll}
        />
      )}
    </Card>
  );
}
