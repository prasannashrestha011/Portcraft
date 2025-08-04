import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { admin } from "@/configs/firebase/firebase-admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token } = body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const cookie = serialize("session", token, {
      httpOnly: true,
      maxAge: expiresIn / 1000,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    const response = new NextResponse(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
