import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { getToken } from "next-auth/jwt";
import { z } from "zod";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

const updatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, "Lösenordet måste bestå av minst 8 tecken"),
});

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  if (!token || !token.sub) {
    return new NextResponse(
      JSON.stringify({ message: "Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const requestData = await request.json();
  const parseResult = updatePasswordSchema.safeParse(requestData);

  if (!parseResult.success) {
    return new NextResponse(
      JSON.stringify({ errors: parseResult.error.errors }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { currentPassword, newPassword } = parseResult.data;

  const user = await prisma.user.findUnique({
    where: { id: token.sub },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const passwordIsValid = await compare(currentPassword, user.hashedPassword);
  if (!passwordIsValid) {
    return new NextResponse(JSON.stringify({ message: "Felaktigt lösenord" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const hashedNewPassword = await hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { hashedPassword: hashedNewPassword },
  });

  return new NextResponse(
    JSON.stringify({ message: "Lösenordet har uppdaterats" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
