import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import DatabaseRow from "@/lib/models/TableRow";

export async function PATCH(req: Request) {
  await connectDB();
  const body = await req.json();

  const { rowId, columnId, value } = body;

  const updated = await DatabaseRow.findByIdAndUpdate(
    rowId,
    {
      $set: {
        [`cells.${columnId}`]: value,
        updatedAt: new Date(),
      },
    },
    { new: true }
  );

  return NextResponse.json(updated);
}
