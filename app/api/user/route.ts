import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/app/_lib/mail"; 
import * as z from "zod";
import crypto from "crypto"; 

const userSchema = z.object({
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
      where: { email },
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

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    await prisma.verificationToken.create({
      data: {
        userId: newUser.id,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      {
        email: newUser.email,
        message: "User created successfully. Verification email sent.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
