import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  try {
    const apiKey = "AIzaSyD3p1hSPb6Ce54DJGq6oSWuS0wVQdsEPxs";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Google Places API");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


//Keep like a guide