import { NextRequest, NextResponse } from "next/server";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodeResult {
  formatted_address: string;
  place_id: string;
  address_components: AddressComponent[];
}

interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
  error_message?: string;
}

interface AddressSuggestion {
  formatted_address: string;
  place_id: string;
  postal_code: string;
  city: string;
  street: string;
  country: string;
}

// Simple in-memory cache with TTL
const memoryCache = new Map<
  string,
  { data: AddressSuggestion[]; expiry: number }
>();

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 3600 * 1000;

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google API key not configured" },
      { status: 500 }
    );
  }

  const cacheKey = `geocode:${input}`;
  const cachedData = memoryCache.get(cacheKey);

  if (cachedData && Date.now() < cachedData.expiry) {
    console.log("Returning cached data");
    console.log("Contents of memoryCache:", memoryCache);
    return NextResponse.json(cachedData.data, { status: 200 });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data: GeocodeResponse = await response.json();

    if (response.ok && data.status === "OK") {
      const suggestions: AddressSuggestion[] = data.results.map((result) => ({
        formatted_address: result.formatted_address,
        place_id: result.place_id,
        postal_code:
          result.address_components.find((comp) =>
            comp.types.includes("postal_code")
          )?.short_name || "",
        city:
          result.address_components.find((comp) =>
            comp.types.includes("locality")
          )?.long_name || "",
        street:
          result.address_components.find((comp) => comp.types.includes("route"))
            ?.long_name || "",
        country:
          result.address_components.find((comp) =>
            comp.types.includes("country")
          )?.long_name || "",
      }));

      // Store in cache with expiry
      const expiry = Date.now() + CACHE_DURATION;
      memoryCache.set(cacheKey, { data: suggestions, expiry });
      return NextResponse.json(suggestions, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message:
            data.error_message || "Failed to fetch from Google Geocoding API",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching from Google Geocoding API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
