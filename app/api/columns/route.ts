import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import DatabaseColumn from "@/lib/models/TableColumn";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const databaseId = searchParams.get("databaseId");

  if (!databaseId) return NextResponse.json([], { status: 200 });

  const cols = await DatabaseColumn.find({ databaseId }).sort({ order: 1 });
  return NextResponse.json(cols);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const col = await DatabaseColumn.create({
    databaseId: body.databaseId,
    name: body.name || "New column",
    type: body.type || "text",
    options: body.options || [],
    order: body.order || 0,
  });

  return NextResponse.json(col);
}
