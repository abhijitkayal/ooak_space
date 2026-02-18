import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import DatabaseItem from "@/lib/models/DatabaseItem";

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();

  const { id } = context.params;
  const body = await req.json();

  const updated = await DatabaseItem.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );

  return NextResponse.json(updated);
}