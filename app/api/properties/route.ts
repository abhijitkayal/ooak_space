import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import DatabaseProperty from "@/lib/models/GalleryProperty";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const databaseId = searchParams.get("databaseId");

  if (!databaseId) {
    return NextResponse.json({ message: "databaseId missing" }, { status: 400 });
  }

  const properties = await DatabaseProperty.find({ databaseId }).sort({
    createdAt: 1,
  });

  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const created = await DatabaseProperty.create(body);
  return NextResponse.json(created);
}
