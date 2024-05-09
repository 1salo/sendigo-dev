// app/api/initialSetup/PUT.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(request: NextRequest) {
  if (request.method !== "PUT") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "PUT",
      },
    });
  }

  const token = await getToken({ req: request, secret });
  if (!token || !token.sub) {
    return new NextResponse(
      JSON.stringify({ message: "Authentication required" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      organizationNumber,
      street,
      city,
      postalCode,
      country,
    } = data;

    const updatedUser = await prisma.user.update({
      where: { id: token.sub },
      data: {
        firstName,
        lastName,
        organizationNumber,
        street,
        city,
        postalCode,
        country,
        hasCompletedInitialSetup: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully",
        user: updatedUser,
        shouldRefreshSession: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(
      JSON.stringify({
        message: `Failed to update user: ${message}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "GET",
      },
    });
  }

  const token = await getToken({ req: request, secret });
  if (!token || !token.sub) {
    return new NextResponse(
      JSON.stringify({ message: "Authentication required" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: token.sub },
      select: { hasCompletedInitialSetup: true },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(
      JSON.stringify({
        hasCompletedInitialSetup: user.hasCompletedInitialSetup,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(
      JSON.stringify({
        message: `Failed to fetch user data: ${message}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
