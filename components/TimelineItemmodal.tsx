"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

export default function TimelineItemModal({
  isOpen,
  onClose,
  item,
  isDark,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  isDark: boolean;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    assignedTo: "",
    status: "Todo",
    comment: "",
  });

  useEffect(() => {
    if (!item) return;

    setForm({
      title: item.title || "",
      startDate: item.startDate?.slice(0, 10) || "",
      endDate: item.endDate?.slice(0, 10) || "",
      assignedTo: item.assignedTo || "",
      status: item.status || "Todo",
      comment: item.comment || "",
    });
  }, [item]);

  const save = async () => {
    const payload = {
      title: form.title,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      assignedTo: form.assignedTo,
      status: form.status,
      comment: form.comment,
    };

    console.log('=== SAVE DEBUG ===');
    console.log('Form state:', form);
    console.log('Saving item ID:', item._id);
    console.log('Payload being sent:', JSON.stringify(payload, null, 2));

    const res = await fetch(`/api/timeline/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to save:", errorText);
      alert("Failed to save changes: " + errorText);
      return;
    }

    const result = await res.json();
    console.log('Save result from API:', result);
    console.log('assignedTo in result:', result.assignedTo);
    console.log('comment in result:', result.comment);

    onSaved();
    onClose();
  };

  const remove = async () => {
    if (!confirm("Delete this item?")) return;

    await fetch(`/api/timeline/${item._id}`, {
      method: "DELETE",
    });

    onSaved();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Timeline Card" isDark={isDark}>
      <div className="space-y-4">
        <input
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          className="w-full p-3 rounded-xl border"
          placeholder="Title"
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Start date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, startDate: e.target.value }))
              }
              onClick={(e) => {
                const target = e.target as HTMLInputElement;
                target.showPicker?.();
              }}
              className="w-full p-3 rounded-xl border cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">End date</label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, endDate: e.target.value }))
              }
              onClick={(e) => {
                const target = e.target as HTMLInputElement;
                target.showPicker?.();
              }}
              className="w-full p-3 rounded-xl border cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500">Assign</label>
          <input
            value={form.assignedTo}
            onChange={(e) =>
              setForm((p) => ({ ...p, assignedTo: e.target.value }))
            }
            className="w-full p-3 rounded-xl border"
            placeholder="Ex: Abhijit"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
            className="w-full p-3 rounded-xl border"
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
            <option>Blocked</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Comment</label>
          <textarea
            value={form.comment}
            onChange={(e) =>
              setForm((p) => ({ ...p, comment: e.target.value }))
            }
            className="w-full p-3 rounded-xl border min-h-[100px]"
            placeholder="Write comment..."
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={remove}
            className="px-4 py-2 rounded-xl border text-red-600 hover:bg-red-50"
          >
            Delete
          </button>

          <button
            onClick={save}
            className="px-5 py-2 rounded-xl bg-black text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
