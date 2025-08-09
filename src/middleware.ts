import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;
  console.log("Session cookie in middleware:", sessionCookie);

  if (!sessionCookie) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next({
    headers: {
      "Cache-Control": "no-store", // Prevent cached authenticated pages
    },
  });
}
export const config = {
  matcher: ["/home/:path*"],
};
