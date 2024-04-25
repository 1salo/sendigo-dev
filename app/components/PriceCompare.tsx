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

    // Default plan
    let selectedPlanIndex = 0;

    if (packages <= 59 && pallets < 5) {
      selectedPlanIndex = 0; // Free Plan
    } else if (packages > 59 || pallets > 1) {
      selectedPlanIndex = 1;
    } else pallets > 373 && packages > 6 
    selectedPlanIndex = 2;

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
