import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/_lib/mail";
import crypto from "crypto";
import { createHash } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Ingen användare med den e-postadressen" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the user's email is verified
    if (!user.emailVerified) {
      return new NextResponse(
        JSON.stringify({ message: "E-postadressen är inte verifierad." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = createHash("sha256").update(token).digest("hex");

    // Save the hashed token in the database
    await prisma.resetToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiry: new Date(Date.now() + 1000 * 60 * 60), // Expires in one hour
      },
    });

    // Assume sending reset token to the user's email
    await sendEmail(
      email,
      "Återställ ditt lösenord",
      `<p>För att återställa ditt lösenord, klicka på länken: <a href="http://localhost:3000/reset-password?token=${token}&email=${email}">Återställ lösenord</a></p>`
    );

    return new NextResponse(
      JSON.stringify({
        message: "Ett mejl med återställningslänken har skickats",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Något gick fel, försök igen senare." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
