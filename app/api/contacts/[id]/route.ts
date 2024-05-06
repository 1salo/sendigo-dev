import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  const pathSegments = req.nextUrl.pathname.split("/");
  const contactId = parseInt(pathSegments[pathSegments.length - 1]);

  if (isNaN(contactId)) {
    return new NextResponse(
      JSON.stringify({
        message: "Contact ID is required and must be a valid number",
      }),
      { status: 400 }
    );
  }

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return new NextResponse(
      JSON.stringify({ message: "Server misconfiguration, secret not set" }),
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
    const contactData = await req.json();
    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: contactData,
    });

    return new NextResponse(JSON.stringify(updatedContact), { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      JSON.stringify({
        message: "Failed to update contact",
        error: errorMessage,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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
    const id = req.nextUrl.pathname.split("/").pop();

    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
      select: { userId: true },
    });

    if (!contact || contact.userId !== token.id) {
      return new NextResponse(
        JSON.stringify({ message: "Contact not found or unauthorized" }),
        { status: 404 }
      );
    }

    await prisma.contact.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(JSON.stringify({ message: "Contact deleted" }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      JSON.stringify({
        message: "Failed to delete contact",
        error: errorMessage,
      }),
      { status: 500 }
    );
  }
}
