import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Ensure that secret is defined
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return new NextResponse(
      JSON.stringify({ message: "Server misconfiguration" }),
      { status: 500 }
    );
  }

  const token = await getToken({ req, secret });

  if (!token || !token.id) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized or invalid token" }),
      { status: 401 }
    );
  }

  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId: token.id, // Use the user ID from the token
      },
    });

    return new NextResponse(JSON.stringify(contacts), { status: 200 });
  } catch (error) {
    // Assume it's an instance of Error
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      JSON.stringify({
        message: "Failed to retrieve contacts",
        error: errorMessage,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return new NextResponse(
      JSON.stringify({ message: "Server misconfiguration" }),
      { status: 500 }
    );
  }

  const token = await getToken({ req, secret });

  if (!token || !token.id) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized or invalid token" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { companyName, name, email, phone, country, ...otherFields } = body;

    const createdContact = await prisma.contact.create({
      data: {
        companyName,
        name,
        email,
        phone,
        country,
        userId: token.id,
        ...otherFields,
      },
    });

    return new NextResponse(JSON.stringify(createdContact), { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      JSON.stringify({
        message: "Failed to create contact",
        error: errorMessage,
      }),
      { status: 500 }
    );
  }
}