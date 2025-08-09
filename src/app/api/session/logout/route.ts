import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("session", "", {
    expires: new Date(0), // Expire immediately
    path: "/", // Same path as original
    httpOnly: true, // If originally set
    secure: process.env.NODE_ENV === "production", // Only secure in prod
    sameSite: "strict", // Match original
  });

  return response;
}
