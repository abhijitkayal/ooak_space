"use client";

import { useEffect, useMemo, useState } from "react";
import AddPropertyModal from "./AddPropertyModal";
import GalleryItemModal from "./GalleryItemModal";

type Property = {
  _id: string;
  databaseId: string;
  name: string;
  type: string; // text, select, multi_select, date...
  options?: Array<{ label: string; color: string }>;
};

type Item = {
  _id: string;
  databaseId: string;
  title?: string;
  values: Record<string, any>;
};

export default function GalleryView({ databaseId }: { databaseId: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddProperty, setShowAddProperty] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);


  const fetchAll = async () => {
    setLoading(true);

    const [pRes, iRes] = await Promise.all([
      fetch(`/api/properties?databaseId=${databaseId}`),
      fetch(`/api/items?databaseId=${databaseId}`),
    ]);

    setProperties(await pRes.json());
    setItems(await iRes.json());
    // console.log(await pRes.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [databaseId]);

  // first property = title
  const titleProp = useMemo(() => properties[0], [properties]);

  // show only some properties inside card
  const cardProps = useMemo(() => properties.slice(1, 5), [properties]);

  const createItem = async () => {
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        databaseId,
        values: {},
      }),
    });

    fetchAll();
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleCloseModal = () => {
    setShowItemModal(false);
    setSelectedItem(null);
  };

  const renderValue = (prop: Property, value: any) => {
    if (!value) return "";

    if (prop.type === "multi_select" && Array.isArray(value)) {
      return value.join(", ");
    }

    if (prop.type === "date") {
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    }

    return String(value);
  };

  if (loading) return <div className="p-6">Loading gallery...</div>;

  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="font-semibold">Gallery</div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddProperty(true)}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          >
            + Property
          </button>

          <button
            onClick={createItem}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          >
            + New
          </button>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-lg">No items yet</div>
            <div className="text-sm mt-1">Click "+ New" to create your first card</div>
          </div>
        )}

        {items.map((it) => {
          const title = it.title || "Untitled";

          return (
            <div
              key={it._id}
              onClick={() => handleCardClick(it)}
              className="rounded-xl border bg-white shadow-sm hover:shadow-md transition p-4 cursor-pointer"
            >
              {/* Title */}
              <div className="text-base font-semibold text-gray-900 line-clamp-2">
                {title}
              </div>

              {/* Properties - Only show properties with values */}
              <div className="mt-3 space-y-2 text-sm">
                {properties
                  .filter((p) => {
                    const v = it.values?.[p._id];
                    const text = renderValue(p, v);
                    return text && text.trim() !== "";
                  })
                  .slice(0, 4) // Show max 4 properties
                  .map((p) => {
                    const v = it.values?.[p._id];
                    const text = renderValue(p, v);

                    return (
                      <div key={p._id} className="flex items-start gap-2">
                        <div className="text-gray-500 w-[90px] shrink-0 truncate text-xs">
                          {p.name}:
                        </div>
                        <div className="text-gray-900 font-medium line-clamp-2 flex-1">
                          {text}
                        </div>
                      </div>
                    );
                  })}

                {/* If no properties have values */}
                {!properties.some((p) => {
                  const v = it.values?.[p._id];
                  const text = renderValue(p, v);
                  return text && text.trim() !== "";
                }) && (
                  <div className="text-gray-400 text-xs italic mt-2">
                    Click to add details
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD PROPERTY MODAL */}
      {showAddProperty && (
        <AddPropertyModal
          isOpen={showAddProperty}
          onClose={() => setShowAddProperty(false)}
          databaseId={databaseId}
          onSaved={fetchAll}
        />
      )}

      {/* EDIT ITEM MODAL */}
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
    </div>
  );
}
