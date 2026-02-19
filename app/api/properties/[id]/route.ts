// import { NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnect";
// import DatabaseProperty from "@/lib/models/GalleryProperty";

// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   await connectDB();
//   const { id } = await context.params;
//   const body = await req.json();

//   const updated = await DatabaseProperty.findByIdAndUpdate(
//     id,
//     { $set: body },
//     { new: true }
//   );

//   return NextResponse.json(updated);
// }

// export async function DELETE(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   await connectDB();
//   const { id } = await context.params;
//   await DatabaseProperty.findByIdAndDelete(id);

//   return NextResponse.json({ success: true });
// }



import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import DatabaseProperty from "@/lib/models/DatabaseProperty";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const updated = await DatabaseProperty.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  await DatabaseProperty.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
