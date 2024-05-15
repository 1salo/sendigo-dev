import { NextRequest, NextResponse } from "next/server";
import { fetchShippingRates } from "../../services/shippingService";

// Använd POST metoden för att hantera inkommande förfrågningar
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const rates = await fetchShippingRates(data);

    return new NextResponse(JSON.stringify(rates), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API call failed:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Om andra HTTP metoder än POST anropas, svara med 405 Method Not Allowed
export function middleware(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(null, { status: 405 });
  }
}
