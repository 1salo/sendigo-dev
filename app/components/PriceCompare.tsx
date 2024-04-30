"use client";

import React, { useState } from "react";
import PricePlanCardSingle from "./PricePlanCardSingle";

interface Plan {
  title: string;
  price: string;
  desc: string;
  features: string[];
  buttonLabel: string;
  buttonLink: string;
  onButtonClick: () => void;
}

const plans: Plan[] = [
  {
    title: "Free",
    price: "0 kr/månad",
    desc: "För dig som fraktar sällan",
    features: [
      "Upp till 20% lägre fraktpriser",
      "Boka med DHL, DSV, TNT, UPS & Fedex",
      "Skicka paket, pall & container",
      "Jämför fraktlösningar automatiskt",
      "Spara favoritkontakter & adresser",
      "Support chatt & mail",
    ],
    buttonLabel: "Kom igång",
    buttonLink: "/sign-up",
    onButtonClick: () => console.log("Free Plan selected"),
  },
  {
    title: "Plus",
    price: "299kr/månad",
    desc: "För dig som fraktar varje vecka",
    features: [
      "Inrikesfrakt: 30% billigare än Sendify Free",
      "Utrikesfrakt: 30% billigare än Sendify Free",
      "Boka med DHL, DSV, TNT, UPS & Fedex",
      "Skicka paket, pall & container",
      "Jämför fraktlösningar automatiskt",
      "Spara favoritkontakter & adresser",
      "Support via chatt & mail",
    ],
    buttonLabel: "Aktivera Sendigo Plus",
    buttonLink: "/dashboard",
    onButtonClick: () => console.log("Plus Plan selected"),
  },
  {
    title: "Pro",
    price: "Pris vid förfrågan",
    desc: "Anpassad plan för dig som fraktar mycket",
    features: [
      "Skräddarsydd prisplan",
      "Dedikerad fraktexpert",
      "Boka med DHL, DSV, TNT, UPS & Fedex",
      "Skicka paket, pall & container",
      "Jämför fraktlösningar automatiskt",
      "Spara favoritkontakter & adresser",
      "Support via telefon, chatt & mail",
    ],
    buttonLabel: "Kontakta sälj",
    buttonLink: "mailto:sendigo@example.com",
    onButtonClick: () => console.log("Pro Plan selected"),
  },
];

const PriceCompare = () => {
  const [packageCount, setPackageCount] = useState<number | undefined>(
    undefined
  );
  const [palletCount, setPalletCount] = useState<number | undefined>(undefined);
  const [showPlan, setShowPlan] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const handlePackageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? undefined : parseInt(e.target.value, 10);
    setPackageCount(value);
    setHasInteracted(true);
  };

  const handlePalletInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? undefined : parseInt(e.target.value, 10);
    setPalletCount(value);
    setHasInteracted(true);
  };

  const findRightPlan = () => {
    setShowPlan(true);
    const packages = packageCount ?? 0;
    const pallets = palletCount ?? 0;

    // Default plan is Free Plan (index 0)
    let selectedPlanIndex = 0;

    // Check for Pro Plan first (highest priority)
    if (
      (pallets > 374 && packages === 0) ||
      (packages > 374 && packages > 4) ||
      packages > 2307 ||
      (packages > 2301 && pallets === 1) ||
      (packages > 2295 && pallets === 2) ||
      (packages > 2289 && pallets === 3) ||
      (packages > 2283 && pallets === 4) ||
      (packages > 2283 && pallets > 4)
    ) {
      selectedPlanIndex = 2; // Pro Plan
    }
    // Then check for Plus Plan conditions
    else if (
      pallets > 4 ||
      (pallets === 1 && packages > 45) ||
      (pallets === 2 && packages > 33) ||
      (pallets === 3 && packages > 21) ||
      (pallets === 4 && packages > 9) ||
      (pallets === 0 && packages > 58)
    ) {
      selectedPlanIndex = 1; // Plus Plan
    }

    setSelectedPlan(plans[selectedPlanIndex]);

    // Reset inputs after calculation
    setPackageCount(undefined);
    setPalletCount(undefined);

    // Disable the button after calculation
    setHasInteracted(false);

    // Set inputs again to display to the user
    setTimeout(() => {
      setPackageCount(packages);
      setPalletCount(pallets);
    }, 0);
  };

  return (
    <div className="sendigo-four-color h-auto flex flex-row items-start justify-center p-8 gap-4">
      <div className="flex-1">
        <h1 className="text-4xl font-normal mb-6">
          Hitta rätt prisplan för dig
        </h1>
        <div className="flex items-center mb-4">
          <label htmlFor="packages" className="block text-lg mr-4">
            Hur många paket skickar du per månad?
          </label>
          <input
            type="number"
            id="packages"
            className="input input-bordered w-32"
            placeholder="5"
            value={packageCount}
            onChange={handlePackageInput}
            min={0}
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="pallets" className="block text-lg mr-4">
            Hur många pallar skickar du per månad?
          </label>
          <input
            type="number"
            id="pallets"
            className="input input-bordered w-32"
            placeholder="10"
            value={palletCount}
            onChange={handlePalletInput}
            min={0}
          />
        </div>
        {!showPlan ? (
          <button className="btn btn-primary w-44 mt-4" onClick={findRightPlan}>
            Hitta rätt prisplan
          </button>
        ) : (
          <button
            className="btn btn-secondary w-44 mt-4"
            onClick={findRightPlan}
            disabled={!hasInteracted}
          >
            Räkna om
          </button>
        )}
      </div>
      {showPlan && selectedPlan && (
        <div className="flex-shrink-0 w-full lg:w-5/12 p-4 ">
          <PricePlanCardSingle {...selectedPlan} />
        </div>
      )}
    </div>
  );
};

export default PriceCompare;
