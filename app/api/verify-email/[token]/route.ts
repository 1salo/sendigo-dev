import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = req.nextUrl.pathname.split("/").pop();
  console.log("Extracted token:", token);

  // Get the base URL from environment variables or default to localhost for development
  const baseUrl = process.env.DOMAIN || "http://localhost:3000";

  if (!token) {
    console.error("Token is required");
    return NextResponse.redirect(
      `${baseUrl}/verification-failed?reason=token_required`
    );
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!verificationToken) {
    console.error("Token not found");
    // Replace "/verification-failed?reason=token_not_found"
    // with the full URL, for example:
    return NextResponse.redirect(
      "http://localhost:3000/verification-failed?reason=token_not_found"
    );
  }

  if (new Date() > verificationToken.expires) {
    console.error("Token has expired");
    return NextResponse.redirect(
      `${baseUrl}/verification-failed?reason=token_expired`
    );
  }

  // Update user's verification status
  await prisma.user.update({
    where: { id: verificationToken.user.id },
    data: { emailVerified: new Date() },
  });

  // Delete the verification token after use
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  console.log("User verification status updated");
  return NextResponse.redirect(`${baseUrl}/verification-success`);
}
