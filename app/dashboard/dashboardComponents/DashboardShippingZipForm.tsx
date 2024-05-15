import React, { useState } from "react";
import CountryDropdownForUI from "@/app/components/ui/CountryDropdownforUI";

interface DashboardShippingZipFormProps {
  updateShippingData: (data: {
    fromZip: string;
    toZip: string;
    fromCountry: string;
    toCountry: string;
  }) => void;
  animationClass?: string;
}

const DashboardShippingZipForm: React.FC<DashboardShippingZipFormProps> = ({
  updateShippingData,
  animationClass,
}) => {
  const [fromZip, setFromZip] = useState("");
  const [toZip, setToZip] = useState("");
  const [fromCountry, setFromCountry] = useState("SE");
  const [toCountry, setToCountry] = useState("SE");

  const handleInputChange =
    (field: "fromZip" | "toZip") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (field === "fromZip") {
        setFromZip(newValue);
        updateShippingData({
          fromZip: newValue,
          toZip,
          fromCountry,
          toCountry,
        });
      } else {
        setToZip(newValue);
        updateShippingData({
          fromZip,
          toZip: newValue,
          fromCountry,
          toCountry,
        });
      }
    };

  const handleCountryChange = (country: string, isFrom: boolean) => {
    if (isFrom) {
      setFromCountry(country);
      updateShippingData({ fromZip, toZip, fromCountry: country, toCountry });
    } else {
      setToCountry(country);
      updateShippingData({ fromZip, toZip, fromCountry, toCountry: country });
    }
  };

  return (
    <div
      className={`card max-w-lg bg-base-100 shadow-xl mx-auto ${animationClass}`}
    >
      <div className="card-body">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="card-title">Prisförfrågan</h2>
          <button
            className="btn text-red-500 bg-white border-red-500 hover:bg-red-200"
            onClick={() => {
              setFromZip("");
              setToZip("");
              setFromCountry("SE");
              setToCountry("SE");
              updateShippingData({
                fromZip: "",
                toZip: "",
                fromCountry: "SE",
                toCountry: "SE",
              });
            }}
          >
            Rensa
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col mb-4 md:mb-0 w-56">
            <span className="label-text">Från</span>
            <CountryDropdownForUI
              onChange={(country) => handleCountryChange(country, true)}
            />
          </div>
          <div className="flex flex-col">
            <span className="label-text">Postnummer</span>
            <input
              type="text"
              placeholder="Postnummer"
              value={fromZip}
              onChange={handleInputChange("fromZip")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col mb-4 md:mb-0 w-56">
            <span className="label-text">Till</span>
            <CountryDropdownForUI
              onChange={(country) => handleCountryChange(country, false)}
            />
          </div>
          <div className="flex flex-col">
            <span className="label-text">Postnummer</span>
            <input
              type="text"
              placeholder="Postnummer"
              value={toZip}
              onChange={handleInputChange("toZip")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        {/* Radio buttons */}
        <div className="form-control">
          <span className="text-sm font-semibold mb-4 mt-4">
            Typ av mottagare
          </span>
          <label className="flex items-center mb-4">
            <input
              type="radio"
              name="recipientType"
              className="radio checked:bg-black"
              value="foretag"
            />
            <span className="text-sm ml-2">Företag</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="recipientType"
              className="radio checked:bg-black"
              value="privatperson"
            />
            <span className="text-sm ml-2">Privatperson</span>
          </label>
        </div>
        <div className="card-actions justify-end mt-4"></div>
      </div>
    </div>
  );
};

export default DashboardShippingZipForm;
