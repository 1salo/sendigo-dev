import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { paymentIntentId, planId } = await req.json();

    // Retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if the payment was successful
    if (paymentIntent.status === "succeeded") {
      // Update the user's subscription plan
      const user = await prisma.user.update({
        where: { email: token.email! },
        data: { subscriptionPlanId: planId },
      });

      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Payment not successful" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
