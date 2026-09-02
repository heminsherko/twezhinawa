import { NextResponse } from "next/server";
import { signAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Check if the provided password matches the ADMIN_PASSWORD environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // Fallback for dev

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "وشەی تێپەڕ هەڵەیە" }, // "Incorrect password" in Kurdish
        { status: 401 }
      );
    }

    // Generate JWT
    const token = await signAuth({ admin: true, expires: "7d" });

    // Set cookie
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    response.cookies.set({
      name: "admin-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "هەڵەیەک ڕوویدا" },
      { status: 500 }
    );
  }
}