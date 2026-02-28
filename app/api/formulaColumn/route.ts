import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FormulaColumn from "@/models/FormulaColumn";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await FormulaColumn.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Formula column not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update formula column" },
      { status: 500 }
    );
  }
}