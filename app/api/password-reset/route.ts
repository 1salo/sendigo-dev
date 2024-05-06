import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import * as z from "zod";

const prisma = new PrismaClient();

const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8, "Lösenordet måste bestå av minst 8 tecken"),
});

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    // Hash token before comparison
    const hashedToken = createHash("sha256").update(token).digest("hex");

    const resetToken = await prisma.resetToken.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    });

    if (!resetToken || new Date() > resetToken.expiry) {
      return new NextResponse(
        JSON.stringify({ message: "Ogiltig eller utgången token" }),
        { status: 401 }
      );
    }

    const hashedPassword = await hash(newPassword, 10);
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: {
        hashedPassword,
      },
    });

    // Delete the reset token after successful password reset
    await prisma.resetToken.delete({
      where: { id: resetToken.id },
    });

    return new NextResponse(
      JSON.stringify({ message: "Ditt lösenord har uppdaterats" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Något gick fel, försök igen senare." }),
      { status: 500 }
    );
  }
}
