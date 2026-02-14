// "use client";

// import { useEffect } from "react";
// import { useTableStore } from "@/app/store/TableStore";
// import TableCell from "@/components/TableCell";
// import ColumnTypePicker from "../../components/ColumnTypepicker";
// import TableColumnHeader from "../../components/TablecolumnHeader";


// export default function TableView({ databaseId }: { databaseId: string }) {
//   const {
//     columns,
//     rows,
//     fetchColumns,
//     fetchRows,
//     addColumn,
//     addRow,
//   } = useTableStore();

//   useEffect(() => {
//     fetchColumns(databaseId);
//     fetchRows(databaseId);
//   }, [databaseId]);

//   return (
//     <div className="border rounded-2xl overflow-hidden bg-white">
//       {/* header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b">
//         <div className="font-semibold">Table</div>

//         <div className="flex gap-2">
//           <button
//             onClick={() => addColumn(databaseId)}
//             className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
//           >
//             + Column
//           </button>

//           <button
//             onClick={() => addRow(databaseId)}
//             className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
//           >
//             + Row
//           </button>
//         </div>
//       </div>

//       {/* grid */}
//       <div className="overflow-auto">
//         <div className="min-w-[900px]">
//           {/* columns */}
//           <div className="flex border-b bg-gray-50">
//             <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-gray-500 border-r">
//               #
//             </div>

//             {/* {columns.map((col) => (
//               <div
//                 key={col._id}
//                 className="w-[220px] shrink-0 border-r px-3 py-2"
//               >
//                 <div className="flex items-center justify-between gap-2">
//                   <input
//                     className="font-semibold text-sm w-full bg-transparent outline-none"
//                     value={col.name}
//                     readOnly
//                   />
//                   <ColumnTypePicker
//                     value={col.type}
//                     onChange={async (t) => {
//                       await fetch(`/api/columns/${col._id}`, {
//                         method: "PATCH",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ type: t }),
//                       });
//                       fetchColumns(databaseId);
//                     }}
//                   />
//                 </div>
//               </div>
//             ))} */}

//             {columns.map((col) => (
//   <TableColumnHeader
//     key={col._id}
//     col={col}
//     databaseId={databaseId}
//     refreshColumns={() => fetchColumns(databaseId)}
//   />
// ))}

//           </div>

//           {/* rows */}
//           {rows.map((row, index) => (
//             <div key={row._id} className="flex border-b">
//               <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-gray-500 border-r">
//                 {index + 1}
//               </div>

//               {columns.map((col) => (
//                 <div key={col._id} className="w-[220px] shrink-0 border-r">
//                   <TableCell row={row} col={col} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* footer add row */}
//       <button
//         onClick={() => addRow(databaseId)}
//         className="w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50"
//       >
//         + New
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useTableStore } from "@/app/store/TableStore";
import TableCell from "@/components/TableCell";
import ColumnTypePicker from "../../components/ColumnTypepicker";
import TableColumnHeader from "../../components/TablecolumnHeader";


export default function TableView({ databaseId }: { databaseId: string }) {
  const {
    columns,
    rows,
    fetchColumns,
    fetchRows,
    addColumn,
    addRow,
  } = useTableStore();

  useEffect(() => {
    fetchColumns(databaseId);
    fetchRows(databaseId);
  }, [databaseId]);

  return (
    <div className="w-full border rounded-2xl overflow-hidden bg-white">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="font-semibold">Table</div>

        <div className="flex gap-2">
          <button
            onClick={() => addColumn(databaseId)}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          >
            + Column
          </button>

          <button
            onClick={() => addRow(databaseId)}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          >
            + Row
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="overflow-auto">
        <div className="w-full">
          {/* columns */}
          <div className="flex border-b bg-gray-50">
            <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-gray-500 border-r">
              #
            </div>

            {/* {columns.map((col) => (
              <div
                key={col._id}
                className="w-[220px] shrink-0 border-r px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    className="font-semibold text-sm w-full bg-transparent outline-none"
                    value={col.name}
                    readOnly
                  />
                  <ColumnTypePicker
                    value={col.type}
                    onChange={async (t) => {
                      await fetch(`/api/columns/${col._id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ type: t }),
                      });
                      fetchColumns(databaseId);
                    }}
                  />
                </div>
              </div>
            ))} */}

            {columns.map((col) => (
  <TableColumnHeader
    key={col._id}
    col={col}
    databaseId={databaseId}
    refreshColumns={() => fetchColumns(databaseId)}
  />
))}

          </div>

          {/* rows */}
          {rows.map((row, index) => (
            <div key={row._id} className="flex border-b">
              <div className="w-[60px] shrink-0 px-3 py-2 text-xs text-gray-500 border-r">
                {index + 1}
              </div>

              {columns.map((col) => (
                <div key={col._id} className="flex-1 min-w-[220px] border-r">
                  <TableCell row={row} col={col} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* footer add row */}
      <button
        onClick={() => addRow(databaseId)}
        className="w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50"
      >
        + New
      </button>
    </div>
  );
}
