import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Database from "@/lib/models/Database";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) return NextResponse.json([]);

  const dbs = await Database.find({ projectId }).sort({ createdAt: 1 });
  return NextResponse.json(dbs);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const db = await Database.create(body);
  return NextResponse.json(db);
}
