"use client";

import { useTableStore, Column } from "@/app/store/TableStore";
import FormulaEditor from "./FormulaEditor";

export default function FormulaModal({ columns }: { columns: Column[] }) {
  const { formulaColumn, setFormulaColumn, updateColumn } = useTableStore();

  if (!formulaColumn) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-4 w-[500px]">
        <h2 className="text-lg font-semibold mb-3">
          Edit Formula: {formulaColumn.name}
        </h2>

        <FormulaEditor
          properties={columns}
          value={formulaColumn.formula || ""}
          onChange={(val) =>
            updateColumn(formulaColumn._id, { formula: val })
          }
        />

        <button
          onClick={() => setFormulaColumn(null)}
          className="mt-4 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}