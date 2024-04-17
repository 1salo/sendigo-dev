import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error:
        "Password must be a string with a minimum length of 6 and maximum length of 20",
    })
    .min(6)
    .max(20),
  firstName: z.string({ required_error: "Name is required" }).max(30),
  lastName: z.string({ required_error: "Lastname is required" }).max(30),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (user)
    return NextResponse.json({ error: "User already exist" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
      firstName: body.firstName,
      lastName: body.lastName,
    },
  });

  return NextResponse.json({
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });
}
