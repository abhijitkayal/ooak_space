import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Project from "@/lib/models/Project";

export async function GET() {
  try {
    await connectDB();
    // ✅ Sort by sortOrder first, fallback to createdAt
    const projects = await Project.find().sort({ sortOrder: 1, createdAt: -1 });
    return NextResponse.json(projects);
  } catch (err: any) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    // ✅ New projects go to the end of the list
    const count = await Project.countDocuments();
    const project = await Project.create({ ...body, sortOrder: count });
    return NextResponse.json(project);
  } catch (err: any) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}