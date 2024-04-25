"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ShippingForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const handleButtonClick = async () => {
    setIsLoading(true);
    route.push("/sign-up");
  };

  return (
    <form className="flex flex-wrap gap-4 items-center justify-center">
      <div className="flex flex-col md:mb-0">
        <span className="label-text mb-2">Från land</span>
        <span className="{`se`}" />
        <input
          type="text"
          placeholder="Land"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="flex flex-col md:mb-0">
        <span className="label-text mb-2">Till land</span>
        <input
          type="text"
          placeholder="Land"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="flex flex-col md:mb-0">
        <span className="label-text mb-2">Välj godstyp</span>
        <div>
          <select className="select select-bordered">
            <option disabled>Välj godstyp</option>
            <option>Paket</option>
            <option>Pall</option>
            <option>Ospecificerat</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:mb-0 relative">
        <span className="label-text mb-2">Vikt</span>
        <input
          type="text"
          placeholder="Vikt"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center pointer-events-none">
          <span>kg</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleButtonClick}
          className={` w-44 btn btn-primary ${
            isLoading ? "w-44 relative" : ""
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
