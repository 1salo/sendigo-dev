import React, { useState, useRef, useEffect } from "react";
import { COUNTRIES } from "../_lib/countries";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

interface Country {
  title: string;
  engTitle: string;
  value: string;
}

interface CountryDropdownProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  selectedCountry,
  onSelectCountry,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelectCountry = (country: Country) => {
    onSelectCountry(country);
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
    const handleMouseDown = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="input input-bordered w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <div className="flex items-center">
          <img
            alt={`${selectedCountry.value} flag`}
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
            {COUNTRIES.map((country) => (
              <div
                key={country.value}
                className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                onClick={() => handleSelectCountry(country)}
              >
                <img
                  alt={`${country.value} flag`}
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

export default CountryDropdown;
