import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import TodoProperty from "@/lib/models/TodoProperty";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();

  const updated = await TodoProperty.findByIdAndUpdate(
    params.id,
    { $set: body },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await TodoProperty.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}
