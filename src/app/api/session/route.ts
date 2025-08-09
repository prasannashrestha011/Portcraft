import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token } = body;
  try {
    const expiresIn = 1.5 * 24 * 60 * 60 * 1000; // 1.5 days in milliseconds (36 hours)

    const tokenStr = jwt.sign(token, process.env.JWT_SECRET!, {
      expiresIn: "36h", // 36 hours = 1.5 days
    });
    console.log("JWT TOKEN ", tokenStr);
    const cookie = serialize("session", tokenStr, {
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
