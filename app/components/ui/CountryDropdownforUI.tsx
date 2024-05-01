import React, { useState, useRef, useEffect } from "react";
import { COUNTRIES } from "@/app/_lib/countries";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

interface Country {
  title: string;
  value: string;
}

const CountryDropdownForUI = () => {
  const defaultCountry: Country = { title: "Sverige", value: "SE" };

  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayCountries = isDropdownVisible ? COUNTRIES : [];

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="input input-bordered w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        {/* Always show the selected country, defaulting to Sweden */}
        <div className="flex items-center">
          <img
            alt={selectedCountry.value}
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.value}.svg`}
            className="inline h-4 rounded-sm mr-2"
          />
          <span>{selectedCountry.title}</span>
        </div>
        <span className="ml-2">
          {isDropdownVisible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </span>
      </div>
      {isDropdownVisible && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded shadow-md">
          <div className="max-h-60 overflow-y-auto">
            {displayCountries.map((country) => (
              <div
                key={country.value}
                className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                onClick={() => handleSelectCountry(country)}
              >
                <img
                  alt={country.value}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.value}.svg`}
                  className="inline h-4 rounded-sm mr-2"
                />
                {country.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDropdownForUI;
