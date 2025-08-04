import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.next(); // skip auth checks in dev
  }
  const sessionCookie = request.cookies.get("session")?.value;
  if (!sessionCookie) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/home/:path*"],
};
