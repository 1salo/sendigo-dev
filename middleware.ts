import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Assuming you're using next-auth for handling JWT.

export async function middleware(request: NextRequest) {
  // Extract the token from the request cookies
  const token = await getToken({ req: request });

  // List of protected routes
  const protectedRoutes = [
    "/dashboard",
    "/orders",
    "/newshipment",
    "/profile",
    "/settings",
  ];

  // Check if the current route is protected
  if (protectedRoutes.includes(new URL(request.url).pathname)) {
    if (!token) {
      // Redirect to sign-in page if no token is found
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Allow the request to proceed if the route is not protected or if a valid token exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/orders", "/newshipment", "/profile", "/settings"],
};
