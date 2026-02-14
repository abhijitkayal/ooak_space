import { create } from "zustand";

export type ColumnType =
  | "text"
  | "number"
  | "select"
  | "multi_select"
  | "status"
  | "date"
  | "person"
  | "checkbox"
  | "url"
  | "email"
  | "phone";

export type Column = {
  _id: string;
  databaseId: string;
  name: string;
  type: ColumnType;
  options: { label: string; color: string }[];
  order: number;
};

export type Row = {
  _id: string;
  databaseId: string;
  cells: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

type Store = {
  columns: Column[];
  rows: Row[];

  fetchColumns: (databaseId: string) => Promise<void>;
  fetchRows: (databaseId: string) => Promise<void>;

  addColumn: (databaseId: string) => Promise<void>;
  addRow: (databaseId: string) => Promise<void>;

  updateCell: (rowId: string, columnId: string, value: any) => Promise<void>;
};

export const useTableStore = create<Store>((set, get) => ({
  columns: [],
  rows: [],

  fetchColumns: async (databaseId) => {
    const res = await fetch(`/api/columns?databaseId=${databaseId}`);
    const data = await res.json();
    set({ columns: data });
  },

  fetchRows: async (databaseId) => {
    const res = await fetch(`/api/rows?databaseId=${databaseId}`);
    const data = await res.json();
    set({ rows: data });
  },

  addColumn: async (databaseId) => {
    const order = get().columns.length;

    const res = await fetch(`/api/columns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        databaseId,
        name: "Name",
        type: "text",
        order,
      }),
    });

    const created = await res.json();
    set({ columns: [...get().columns, created] });
  },

  addRow: async (databaseId) => {
    const res = await fetch(`/api/rows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ databaseId }),
    });

    const created = await res.json();
    set({ rows: [...get().rows, created] });
  },

  updateCell: async (rowId, columnId, value) => {
    // optimistic update
    set({
      rows: get().rows.map((r) =>
        r._id === rowId
          ? { ...r, cells: { ...r.cells, [columnId]: value } }
          : r
      ),
    });

    await fetch(`/api/cell`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowId, columnId, value }),
    });
  },
}));
