"use client";

import { useTheme } from "next-themes";

interface Property {
  id: string;
  name: string;
  type: string;
  formula?: string;
}

interface Row {
  id: string;
  values: {
    [key: string]: any;
  };
}

interface TableProps {
  properties: Property[];
  rows: Row[];
}

export default function Table({ properties, rows }: TableProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="p-6">
      <div
        className={`w-full border rounded-2xl overflow-hidden ${
          isDark ? "bg-[#18191d] border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div
            className={`font-semibold ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Table View
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <th
                  className={`px-4 py-3 text-left text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Row ID
                </th>
                {properties.map((property) => (
                  <th
                    key={property.id}
                    className={`px-4 py-3 text-left text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {property.name}
                    <span
                      className={`ml-2 text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      ({property.type})
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b ${
                    isDark
                      ? "border-gray-800 hover:bg-gray-800/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td
                    className={`px-4 py-3 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {row.id}
                  </td>
                  {properties.map((property) => (
                    <td
                      key={property.id}
                      className={`px-4 py-3 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {property.type === "formula" ? (
                        <span
                          className={`italic ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Formula: {property.formula}
                        </span>
                      ) : (
                        row.values[property.id] ?? "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
