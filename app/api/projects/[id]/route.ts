import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Project from "@/lib/models/Project";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const body = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      body,
      { new: true } // return updated doc
    );

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}