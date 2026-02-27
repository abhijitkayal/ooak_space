import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Project from "@/lib/models/Project";
import crypto from "crypto";

// Generate a share link
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const { permission } = await req.json(); // "view" or "edit"

    console.log("🔗 API: Generating share link for project:", id, "with permission:", permission);

    if (!["view", "edit"].includes(permission)) {
      console.error("❌ API: Invalid permission:", permission);
      return NextResponse.json(
        { error: "Invalid permission type" },
        { status: 400 }
      );
    }

    // Generate unique token
    const token = crypto.randomBytes(16).toString("hex");
    console.log("🎲 API: Generated token:", token);

    // Update project with new share link
    const project = await Project.findByIdAndUpdate(
      id,
      {
        $push: {
          shareLinks: {
            token,
            permission,
            createdAt: new Date(),
            expiresAt: null, // null = never expires
          },
        },
      },
      { new: true }
    );

    if (!project) {
      console.error("❌ API: Project not found:", id);
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    console.log("✅ API: Share link saved to project");

    // Generate full URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const shareUrl = `${baseUrl}/shared/${token}`;

    console.log("🔗 API: Generated share URL:", shareUrl);

    return NextResponse.json({
      success: true,
      token,
      shareUrl,
      permission,
    });
  } catch (error) {
    console.error("Share link creation error:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    );
  }
}

// Get all share links for a project
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;

    const project = await Project.findById(id).select("shareLinks");

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      shareLinks: project.shareLinks || [],
    });
  } catch (error) {
    console.error("Get share links error:", error);
    return NextResponse.json(
      { error: "Failed to fetch share links" },
      { status: 500 }
    );
  }
}

// Delete a share link
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const { token } = await req.json();

    const project = await Project.findByIdAndUpdate(
      id,
      {
        $pull: {
          shareLinks: { token },
        },
      },
      { new: true }
    );

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Share link deleted",
    });
  } catch (error) {
    console.error("Delete share link error:", error);
    return NextResponse.json(
      { error: "Failed to delete share link" },
      { status: 500 }
    );
  }
}
