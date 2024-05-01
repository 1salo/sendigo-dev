"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CountryDropdown from "./CountryDropdown";
import GoodsTypeDropdown from "./GoodstypeDropdown";
import CountryDropdownForUI from "./ui/CountryDropdownforUI";

const ShippingForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const handleButtonClick = async () => {
    setIsLoading(true);
    route.push("/sign-up");
  };

  return (
    <form className="flex flex-wrap gap-4 items-end justify-center">
      <div className="flex flex-col md:mb-0 w-56">
        <span className="label-text mb-2">Från land</span>
        <CountryDropdownForUI />
      </div>

      <div className="flex flex-col md:mb-0 w-56">
        <span className="label-text mb-2">Till land</span>
        <CountryDropdownForUI />
      </div>

      <div className="flex flex-col md:mb-0 w-56">
        <GoodsTypeDropdown />
      </div>

      <div className="flex flex-col md:mb-0 relative">
        <span className="label-text mb-2">Vikt</span>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Vikt"
            className="input input-bordered w-full no-spinners"
            maxLength={5}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/[^0-9.]/g, "")
                .slice(0, 5);
            }}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span>kg</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:mb-0 self-end">
        <button
          onClick={handleButtonClick}
          className={`btn btn-primary h-full w-44 ${
            isLoading ? "relative" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            "Beräkna pris"
          )}
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;
