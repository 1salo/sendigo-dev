import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const path = new URL(request.url).pathname;

  // Routes that only non-authenticated users should access
  const publicRoutes = ["/sign-in", "/sign-up"];

  if (token && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const protectedRoutes = [
    "/dashboard",
    "/orders",
    "/newshipment",
    "/profile",
    "/settings",
    "/newshipment/compare",
    "/contacts",
  ];

  // Check if the current route is protected, not an API route, and no token is found
  if (
    protectedRoutes.includes(path) &&
    !path.startsWith("/api/") && // Check if it's not an API route
    !token
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

// You can include both public and protected routes in the matcher if needed
export const config = {
  matcher: [
    "/dashboard",
    "/orders",
    "/newshipment",
    "/profile",
    "/settings",
    "/sign-in",
    "/sign-up",
    "/newshipment/compare",
    "/contacts",
  ],
};
