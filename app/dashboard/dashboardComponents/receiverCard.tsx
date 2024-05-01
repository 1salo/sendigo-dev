import { COUNTRIES } from "@/app/_lib/countries";
import CountryDropdown from "@/app/components/CountryDropdown";
import React, { useState, useEffect, useRef } from "react";

interface Prediction {
  formatted_address: string;
  place_id: string;
  postal_code: string;
  city: string;
  street: string;
  country: string; // This should hold the English name as returned by the API
}

interface Country {
  title: string; // Swedish title
  engTitle: string; // English title
  value: string;
}

const ReceiverCard = () => {
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<Country>({
    title: "Sverige",
    engTitle: "Sweden",
    value: "SE",
  });
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPrivatePerson, setIsPrivatePerson] = useState(true);
  const lastUserInput = useRef("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleSuggestionClick = (suggestion: Prediction) => {
    setAddress(suggestion.street);
    setPostcode(suggestion.postal_code);
    setCity(suggestion.city);
    lastUserInput.current = suggestion.street;

    const foundCountry = COUNTRIES.find(
      (c) => c.engTitle === suggestion.country
    );
    if (foundCountry) {
      setCountry(foundCountry);
    }
    setShowSuggestions(false);
  };

  const handleToggle = () => {
    setIsPrivatePerson((prev) => !prev); // Toggle the state
  };

  const handleClearFields = () => {
    setAddress("");
    setPostcode("");
    setCity("");
    setCountry({
      title: "Sverige",
      engTitle: "Sweden",
      value: "SE",
    });
    setContactName("");
    setPhoneNumber("");
    setCompanyName("");
    setEmail("");
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (address && address !== lastUserInput.current) {
      timerId = setTimeout(() => {
        fetch(`/api/google?input=${address}`)
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data);
            setShowSuggestions(true);
          })
          .catch((error) => {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
            setShowSuggestions(false);
          });
      }, 500);
    } else {
      setShowSuggestions(false);
    }

    return () => clearTimeout(timerId);
  }, [address]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".receiver-suggestion-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="card bg-white shadow-xl mx-auto items-center w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="card-body">
          <div className="flex flex-row justify-between mb-4 items-center ">
            <h2 className="card-title font-normal">
              {isPrivatePerson ? "Mottagare företag" : "Mottagare privatperson"}
            </h2>
            <button
              className="btn text-red-500 bg-white border-red-500 hover:bg-red-200"
              onClick={handleClearFields}
            >
              Rensa
            </button>
          </div>

          <div className="form-control mt-4">
            <label className="label cursor-pointer">
              <span className="label-text font-sans">
                Skicka till privatperson
              </span>
              <input
                type="checkbox"
                className="toggle"
                onChange={handleToggle}
              />
            </label>
          </div>

          <div className="border rounded py-4 px-4 shadow-inner mb-4">
            <div className="flex flex-col  mb-4">
              <span className="label-text">
                {isPrivatePerson ? "Företagsnamn" : "Kontaktnamn"}
              </span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={companyName}
                onChange={handleCompanyNameChange}
              />
            </div>

            {isPrivatePerson ? (
              <div className="my-2 py-2 bg-gray-200 w-96">
                <p className="text-xs px-1">
                  OBS: Använd prefixet "Firma" för enskild firma för att undvika
                  extra avgifter och förtydliga att det inte är en privatperson{" "}
                </p>
              </div>
            ) : (
              ""
            )}

            <div className="relative mb-4">
              <span className="label-text">Adress (Ej boxadress)</span>
              <input
                type="text"
                className="input input-bordered w-full"
                required
                value={address}
                onChange={handleAddressChange}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="bg-white border rounded shadow-lg w-full absolute z-10 top-full mt-1 receiver-suggestion-dropdown max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.place_id}
                      className="p-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.formatted_address}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex mb-4">
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="label-text">Postnummer</span>
                <input
                  type="text"
                  className="input input-bordered w-32 mr-3 max-w-xs"
                  value={postcode}
                  onChange={handlePostcodeChange}
                />
              </div>

              <div className="flex flex-col mb-4 md:mb-0">
                <span className="label-text">Stad</span>
                <input
                  type="text"
                  className="input input-bordered min-w-64"
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
              <span className="label-text">Land</span>
              <CountryDropdown
                selectedCountry={country}
                onSelectCountry={setCountry}
              />
            </div>
          </div>

          {isPrivatePerson ? (
            <div className="border-2 rounded py-4 px-4 border-gray-200">
              <div className="flex flex-col mb-4">
                <span className="label-text">Kontaknamn</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={contactName}
                  onChange={handleContactNameChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <span className="label-text">Telefon</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <span className="label-text">E-postadress</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          ) : (
            <div className="border-2 rounded py-4 px-4 border-gray-200">
              <div className="flex flex-col mb-4">
                <span className="label-text">Telefon</span>
                <input type="text" className="input input-bordered w-full" />
              </div>
              <div className="flex flex-col mb-4">
                <span className="label-text">E-postadress</span>
                <input type="text" className="input input-bordered w-full" />
              </div>
            </div>
          )}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Spara mottagare i adressboken</span>
              <input
                type="checkbox"
                className="toggle"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverCard;
