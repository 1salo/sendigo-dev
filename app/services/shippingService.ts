// Anta att denna funktion tar emot den data som krävs för DHL's PriceQuote API.
export async function fetchShippingRates(data: any) {
  const url =
    "https://test-api.freight-logistics.dhl.com/pricequoteapi/v1/pricequote/quoteforgrossprice";

  // Skapa en request body enligt DHL's API-specifikationer
  const requestBody = {
    shipment: {
      dhlProductCode: data.dhlProductCode,
      totalNumberOfPieces: data.totalNumberOfPieces,
      totalWeight: data.totalWeight,
      totalVolume: data.totalVolume,
      totalLoadingMeters: data.totalLoadingMeters,
      totalPalletPlaces: data.totalPalletPlaces,
      piece: [
        {
          numberOfPieces: data.numberOfPieces,
          weight: data.weight,
          volume: data.volume,
          width: data.width,
          height: data.height,
          length: data.length,
          stackable: data.stackable,
        },
      ],
      parties: [
        {
          id: "shipperID",
          type: "Consignor",
          address: {
            cityName: data.cityName,
            postalCode: data.postalCode,
            countryCode: data.countryCode,
          },
        },
        {
          id: "receiverID",
          type: "Consignee",
          address: {
            cityName: data.destinationCityName,
            postalCode: data.destinationPostalCode,
            countryCode: data.destinationCountryCode,
          },
        },
      ],
      additionalServices: {
        priorityServiceG10: true, // Exempel på tilläggstjänst
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Du behöver eventuellt lägga till autentiseringsuppgifter här, t.ex. API-nycklar eller tokens
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`DHL API call failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch DHL price quote:", error);
    throw error;
  }
}
