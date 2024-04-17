import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

// Define schema for input validation

const userSchema = z.object({
  firstName: z.string().min(1, "Firstname is required").max(100),
  lastName: z.string().min(1, "Lastname is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, password } = userSchema.parse(body);

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exist" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        message: "User created succesfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
