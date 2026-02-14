import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import DatabaseItem from "@/lib/models/GalleryItem";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const databaseId = searchParams.get("databaseId");

  if (!databaseId) {
    return NextResponse.json({ message: "databaseId missing" }, { status: 400 });
  }

  const items = await DatabaseItem.find({ databaseId }).sort({ createdAt: 1 });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const created = await DatabaseItem.create({
    databaseId: body.databaseId,
    title: body.title || "Untitled",
    values: body.values || {},
  });

  return NextResponse.json(created);
}
