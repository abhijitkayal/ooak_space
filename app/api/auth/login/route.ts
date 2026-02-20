import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import  dbConnect  from "@/lib/dbConnect";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // check email verification
    if (!user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email first",
        },
        { status: 403 }
      );
    }
 const token = signToken({
      userId: user._id,
      email: user.email,
    });
      const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true, // can't be accessed by JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}