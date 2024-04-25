import Link from "next/link";
import React from "react";

interface PricePlanCardProps {
  title: string;
  desc: string;
  price: string;
  features: string[];
  buttonLabel: string;
  buttonLink: string;
}

const PricePlanCardSingle = ({
  title,
  desc,
  price,
  features,
  buttonLabel,
  buttonLink,
}: PricePlanCardProps) => {
  return (
    <div
      className="rounded overflow-hidden shadow-2xl bg-white text-center p-6 flex flex-col mx-auto my-4"
      style={{ minWidth: "400px", maxWidth: "500px", height: "auto" }}
    >
      <div className="font-bold text-4xl mb-2">{title}</div>
      <p className="text-base mb-2">{desc}</p>
      <p className="font-bold text-xl mb-4">{price}</p>
      <Link href={buttonLink} className="btn btn-primary btn-outline mb-4">
        {buttonLabel}
      </Link>
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
      <Link
        href="/priceplan"
        className="text-center mt-7 text-blue-600 underline dark:text-blue-500 hover:no-underline"
      >
        Utforska prisplaner
      </Link>
    </div>
  );
};

export default PricePlanCardSingle;
