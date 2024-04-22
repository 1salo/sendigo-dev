import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

// Define schema for input validation
const userSchema = z.object({
  // firstName: z.string().min(1, "Förnamn krävs").max(100),
  // lastName: z.string().min(1, "Efternamn krävs").max(100),
  email: z.string().min(1, "Email krävs").email("Felaktig email"),
  password: z
    .string()
    .min(1, "Lösenord krävs")
    .min(8, "Lösenordet måste bestå av minst än 8 tecken"),
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = userSchema.parse(body);

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Användare med denna mail finns redan" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(
      {
        email: newUser.email,
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
