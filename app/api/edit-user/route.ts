import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request: NextRequest) {
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
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phonenumber: true,
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ user: user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(
      JSON.stringify({
        message: `Failed to retrieve user: ${message}`,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

  const requestData = await request.json();
  const userId = token.sub;
  const { firstName, lastName, phonenumber } = requestData;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, phonenumber },
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
      { status: 500 }
    );
  }
}
