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
  | "phone"
  | "formula";

export type Column = {
  _id: string;
  databaseId: string;
  name: string;
  type: ColumnType;
  options: { label: string; color: string }[];
  order: number;
  formula?: string;
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
  formulaColumn: Column | null;

  fetchColumns: (databaseId: string) => Promise<void>;
  fetchRows: (databaseId: string) => Promise<void>;

  addColumn: (databaseId: string) => Promise<void>;
  addRow: (databaseId: string) => Promise<void>;

  updateCell: (rowId: string, columnId: string, value: any) => Promise<void>;
  setFormulaColumn: (column: Column | null) => void;
  updateColumn: (columnId: string, updates: Partial<Column>) => Promise<void>;
};


export const useTableStore = create<Store>((set, get) => ({
  columns: [],
  rows: [],
  formulaColumn: null,

  fetchColumns: async (databaseId) => {
    const res = await fetch(`/api/columns?databaseId=${databaseId}`);
    const data = await res.json();
    
    // If no columns exist, create dummy columns
    if (data.length === 0) {
      const dummyColumns = [
        { name: "Name", type: "text", order: 0 },
        { name: "Status", type: "select", order: 1, options: [
          { label: "Not Started", color: "gray" },
          { label: "In Progress", color: "blue" },
          { label: "Completed", color: "green" }
        ]},
        { name: "Priority", type: "select", order: 2, options: [
          { label: "Low", color: "blue" },
          { label: "Medium", color: "yellow" },
          { label: "High", color: "red" }
        ]},
        { name: "Due Date", type: "date", order: 3 },
        { name: "Assignee", type: "person", order: 4 }
      ];
      
      const createdColumns = [];
      for (const col of dummyColumns) {
        const response = await fetch(`/api/columns`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ databaseId, ...col }),
        });
        const created = await response.json();
        createdColumns.push(created);
      }
      set({ columns: createdColumns });
    } else {
      set({ columns: data });
    }
  },

  fetchRows: async (databaseId) => {
    const res = await fetch(`/api/rows?databaseId=${databaseId}`);
    const data = await res.json();
    
    // If no rows exist, create dummy rows
    if (data.length === 0) {
      const columns = get().columns;
      if (columns.length > 0) {
        const dummyRowsData = [
          { 
            0: "Task 1",
            1: "Not Started",
            2: "Medium",
            3: new Date().toISOString(),
            4: "User 1"
          },
          { 
            0: "Task 2",
            1: "In Progress",
            2: "High",
            3: new Date(Date.now() + 86400000).toISOString(),
            4: "User 2"
          },
          { 
            0: "Task 3",
            1: "Completed",
            2: "Low",
            3: new Date(Date.now() + 172800000).toISOString(),
            4: "User 3"
          }
        ];
        
        const createdRows = [];
        for (const rowData of dummyRowsData) {
          const cells: Record<string, any> = {};
          columns.forEach((col, index) => {
            if (rowData[index as keyof typeof rowData] !== undefined) {
              cells[col._id] = rowData[index as keyof typeof rowData];
            }
          });
          
          const response = await fetch(`/api/rows`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ databaseId }),
          });
          const created = await response.json();
          
          // Update cells for the created row
          for (const [columnId, value] of Object.entries(cells)) {
            await fetch(`/api/cell`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ rowId: created._id, columnId, value }),
            });
          }
          
          created.cells = cells;
          createdRows.push(created);
        }
        set({ rows: createdRows });
      } else {
        set({ rows: data });
      }
    } else {
      set({ rows: data });
    }
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

  setFormulaColumn: (column) => {
    set({ formulaColumn: column });
  },

  updateColumn: async (columnId, updates) => {
    const updatedColumns = get().columns.map((c) =>
      c._id === columnId ? { ...c, ...updates } : c
    );
    set({ columns: updatedColumns });

    await fetch(`/api/columns/${columnId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  },
}));
