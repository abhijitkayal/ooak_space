"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Column, Row, useTableStore } from "@/app/store/TableStore";
import { evaluateFormula } from "@/lib/formula/EvaluteFormula";

export default function TableCell({ row, col, isViewOnly = false }: { row: Row; col: Column; isViewOnly?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const value = row.cells?.[col._id];
  const { updateCell, columns, setFormulaColumn } = useTableStore();

  const [local, setLocal] = useState(value ?? "");

  useEffect(() => {
    if (value !== local) {
      setLocal(value ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const save = async () => {
    if (isViewOnly) return; // Block save in view-only mode
    await updateCell(row._id, col._id, local);
  };

  const inputClass = `w-full outline-none text-sm bg-transparent ${isDark ? "text-gray-200 placeholder-gray-600" : "text-gray-900 placeholder-gray-400"} ${isViewOnly ? "cursor-not-allowed" : ""}`;

  // checkbox
  if (col.type === "checkbox") {
    return (
      <div className="px-3 py-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => !isViewOnly && updateCell(row._id, col._id, e.target.checked)}
          disabled={isViewOnly}
          className={`${isDark ? "accent-blue-500" : "accent-blue-600"} ${isViewOnly ? "cursor-not-allowed opacity-50" : ""}`}
          aria-label={col.name}
        />
      </div>
    );
  }

  // date
  if (col.type === "date") {
    return (
      <div className="px-3 py-2">
        <input
          type="date"
          value={local ? String(local).slice(0, 10) : ""}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          disabled={isViewOnly}
          className={`${inputClass} ${isDark ? "color-scheme-dark" : ""}`}
          aria-label={col.name}
        />
      </div>
    );
  }
  // email
if (col.type === "email") {

  const sendEmail = async (email: string) => {
    if (isViewOnly) return; // Block email send in view-only mode
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Email send failed", err);
    }
  };

  const handleBlur = async () => {
    await save(); // save to DB

    if (local && !isViewOnly) {
      await sendEmail(local); // ✅ API CALL HERE
    }
  };

  return (
    <div className="px-3 py-2 space-y-1">
      <input
        type="email"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={handleBlur} // ✅ trigger here
        placeholder="email@example.com"
        disabled={isViewOnly}
        className={inputClass}
        aria-label={col.name}
      />

      {value && !isViewOnly && (
        <button
          onClick={() => sendEmail(value)}
          className={`text-xs ${
            isDark ? "text-blue-400" : "text-blue-600"
          } hover:underline`}
        >
          Send Email →
        </button>
      )}
    </div>
  );
}

  // number
  if (col.type === "number") {
    return (
      <div className="px-3 py-2">
        <input
          type="number"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          disabled={isViewOnly}
          className={inputClass}
          aria-label={col.name}
        />
      </div>
    );
  }

  // select
  if (col.type === "select") {
    return (
      <div className="px-3 py-2">
        <select
          value={local || ""}
          onChange={(e) => {
            if (isViewOnly) return;
            setLocal(e.target.value);
            updateCell(row._id, col._id, e.target.value);
          }}
          disabled={isViewOnly}
          className={`w-full outline-none text-sm bg-transparent ${isDark ? "text-gray-200 bg-[#18191d]" : "text-gray-900 bg-white"} border ${isDark ? "border-gray-700" : "border-gray-300"} rounded px-2 py-1 ${isViewOnly ? "cursor-not-allowed opacity-50" : ""}`}
          aria-label={col.name}
        >
          <option value="">Select...</option>
          {col.options?.map((opt, idx) => (
            <option key={idx} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // multi_select
  if (col.type === "multi_select") {
    const selectedValues = Array.isArray(value) ? value : [];
    
    const toggleOption = (option: string) => {
      if (isViewOnly) return;
      let newValues;
      if (selectedValues.includes(option)) {
        newValues = selectedValues.filter((v) => v !== option);
      } else {
        newValues = [...selectedValues, option];
      }
      updateCell(row._id, col._id, newValues);
    };

    return (
      <div className="px-3 py-2">
        <div className="flex flex-wrap gap-1">
          {selectedValues.map((val, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center px-2 py-1 text-xs rounded ${isDark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"}`}
            >
              {val}
              {!isViewOnly && (
                <button
                  onClick={() => toggleOption(val)}
                  className="ml-1 hover:text-red-500"
                  aria-label={`Remove ${val}`}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {!isViewOnly && (
          <select
            onChange={(e) => {
              if (e.target.value) {
                toggleOption(e.target.value);
                e.target.value = "";
              }
            }}
            className={`w-full mt-1 outline-none text-sm ${isDark ? "text-gray-200 bg-[#18191d]" : "text-gray-900 bg-white"} border ${isDark ? "border-gray-700" : "border-gray-300"} rounded px-2 py-1`}
            aria-label={`Add option to ${col.name}`}
          >
            <option value="">Add option...</option>
            {col.options?.map((opt, idx) => (
              <option key={idx} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }

  // url
  if (col.type === "url") {
    return (
      <div className="px-3 py-2">
        <input
          type="url"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          placeholder="https://..."
          disabled={isViewOnly}
          className={inputClass}
          aria-label={col.name}
        />
        {value && (
          <a
            href={String(value)}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs ${isDark ? "text-blue-400" : "text-blue-600"} hover:underline`}
          >
            Open →
          </a>
        )}
      </div>
    );
  }

  // phone
  if (col.type === "phone") {
    return (
      <div className="px-3 py-2">
        <input
          type="tel"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          placeholder="+1 (555) 123-4567"
          disabled={isViewOnly}
          className={inputClass}
          aria-label={col.name}
        />
      </div>
    );
  }

  // person
  if (col.type === "person") {
    return (
      <div className="px-3 py-2">
        <input
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          placeholder="Person name"
          disabled={isViewOnly}
          className={inputClass}
          aria-label={col.name}
        />
      </div>
    );
  }

  // formula (read-only, clickable to edit)
  if (col.type === "formula") {
    const handleOpen = () => {
      if (isViewOnly) return; // Don't open formula editor in view-only mode
      setFormulaColumn(col);
    };

    const calculatedValue = col.formula
      ? evaluateFormula(col.formula, row, columns)
      : "";

    const isError = String(calculatedValue).startsWith("Error");

    return (
      <div
        onClick={handleOpen}
        className={`px-3 py-2 text-sm ${
          isViewOnly ? "cursor-default" : "cursor-pointer"
        } ${
          isError 
            ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
            : isDark ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
        }`}
        title={isError ? (isViewOnly ? "Formula error" : "Click to edit formula") : String(calculatedValue)}
      >
        {calculatedValue === "" ? "—" : String(calculatedValue)}
      </div>
    );
  }

  // default text
  return (
    <div className="px-3 py-2">
      <input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={save}
        disabled={isViewOnly}
        className={inputClass}
        placeholder="Enter text"
        aria-label={col.name}
      />
    </div>
  );
}