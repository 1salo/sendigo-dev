import { NextRequest, NextResponse } from "next/server";

interface PostalCodeResponse {
  success: boolean;
  data: any;
}

const CACHE_DURATION = 3600 * 1000;
const memoryCache = new Map<
  string,
  { data: PostalCodeResponse; expiry: number }
>();

async function getPostalCodeInfo(
  countryCode: string,
  postalCode: string
): Promise<PostalCodeResponse> {
  const apiKey = process.env.DHL_API_KEY;
  if (!apiKey) {
    throw new Error("DHL API key is not configured");
  }

  const url = `https://test-api.freight-logistics.dhl.com/postalcodeapi/v1/postalcodes/${countryCode}/${postalCode}/route`;
  const response = await fetch(url, {
    headers: {
      "client-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch postal codes from DHL API");
  }

  return response.json();
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const countryCode = url.searchParams.get("countryCode");
  const postalCode = url.searchParams.get("postalCode");

  if (!countryCode || !postalCode) {
    return new NextResponse(
      JSON.stringify({ error: "Country code and postal code are required" }),
      { status: 400 }
    );
  }

  const cacheKey = `postalcode:${countryCode}:${postalCode}`;
  const cachedResult = memoryCache.get(cacheKey);

  if (cachedResult && Date.now() < cachedResult.expiry) {
    return new NextResponse(JSON.stringify(cachedResult.data), { status: 200 });
  }

  try {
    const data = await getPostalCodeInfo(countryCode, postalCode);
    memoryCache.set(cacheKey, { data, expiry: Date.now() + CACHE_DURATION });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process your request" }),
      { status: 500 }
    );
  }
}
