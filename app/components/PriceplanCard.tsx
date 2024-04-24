"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PricePlanCardProps {
  title: string;
  price: string;
  features: string[];
  buttonLabel: string;
}

const PriceplanCard = ({
  title,
  price,
  features,
  buttonLabel,
}: PricePlanCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleButtonClick = async () => {
    setIsLoading(true);
    router.push("/sign-up");
  };

  return (
    <div className="rounded overflow-hidden shadow-2xl bg-white text-center p-6 flex flex-col w-full mx-auto my-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-2xl mb-4">{price}</p>
      <button
        onClick={handleButtonClick}
        className={`btn btn-primary btn-outline mb-4 ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <span>{buttonLabel}</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </>
        )}
      </button>
      <ul className="text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <img
              alt="Checkmark"
              src="/images/checkmark.svg"
              className="w-4 h-4 mr-2"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceplanCard;
