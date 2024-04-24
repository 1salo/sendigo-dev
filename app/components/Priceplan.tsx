"use client";
import React from "react";
import PriceplanCard from "./PriceplanCard";

const Priceplan = () => {
  const plans = [
    {
      title: "Free",
      price: "0 kr/månad",
      features: [
        "Upp till 20% lägre fraktpriser",
        "Boka med DHL, DSV, TNT, UPS & Fedex",
        "Skicka paket, pall & container",
        "Jämför fraktlösningar automatiskt",
        "Spara favoritkontakter & adresser",
        "Support via telefon, chatt & mail",
      ],
      buttonLabel: "Kom igång",
      // Define the actual button click handler function here
      onButtonClick: () => console.log("Free Plan selected"),
    },
    {
      title: "Plus",
      price: "299 kr/månad",
      features: [
        "Allt som du får med Free, samt:",
        "Ytterligare 30% billigare inrikesfrakt",
        "Ytterligare 30% billigare utrikesfrakt",
      ],
      buttonLabel: "Aktivera Sendigo Plus",
      onButtonClick: () => console.log("Plus Plan selected"),
    },
    {
      title: "Pro",
      price: "Pris vid förfrågan",
      features: [
        "Allt som du får med Plus, samt:",
        "Skräddarsydd prisplan",
        "Dedikerad fraktexpert",
      ],
      buttonLabel: "Aktivera Sendigo Pro",
      onButtonClick: () => console.log("Plus Plan selected"),
    },
    // Add your Pro plan details here
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-8">
      {plans.map((plan, index) => (
        <PriceplanCard key={index} {...plan} />
      ))}
    </div>
  );
};

export default Priceplan;