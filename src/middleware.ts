import { NextRequest, NextResponse } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;
  console.log("Session cookie in middleware:", sessionCookie);

  if (!sessionCookie) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const { payload } = await jwtVerify(
      sessionCookie,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    console.log(payload);
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/home/:path*", "/editor/:path*"],
};
