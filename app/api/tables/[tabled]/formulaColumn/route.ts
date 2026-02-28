import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FormulaColumn from "@/models/FormulaColumn";

export async function GET(
  req: Request,
  { params }: { params: { tableId: string } }
) {
  try {
    await connectDB();

    const columns = await FormulaColumn.find({
      tableId: params.tableId,
    });

    return NextResponse.json(columns);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch formula columns" },
      { status: 500 }
    );
  }
}