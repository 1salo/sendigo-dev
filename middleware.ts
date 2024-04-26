import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Assuming you're using next-auth for handling JWT.

export async function middleware(request: NextRequest) {
  // Extract the token from the request cookies
  const token = await getToken({ req: request });

  // Current path
  const path = new URL(request.url).pathname;

  // Routes that only non-authenticated users should access
  const publicRoutes = ["/sign-in", "/sign-up"];

  // If the token exists and the user is trying to access a public route, redirect to dashboard
  if (token && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // List of protected routes
  const protectedRoutes = [
    "/dashboard",
    "/orders",
    "/newshipment",
    "/profile",
    "/settings",
    "/newshipment/compare",
  ];

  // Check if the current route is protected and no token is found
  if (protectedRoutes.includes(path) && !token) {
    // Redirect to sign-in page
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to proceed if none of the above conditions are met
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
  ],
};
