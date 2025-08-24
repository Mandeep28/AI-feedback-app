// middleware.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const { pathname } = new URL(req.url);

  // Protect only /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = req.headers.get("cookie")?.match(/accessToken=([^;]+)/)?.[1];

    if (!token) {
      // No token → redirect to home
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      await jwtVerify(token, secret); // throws if invalid
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};