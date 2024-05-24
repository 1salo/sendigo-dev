"use client";

import React, { useEffect, useState, useRef } from "react";
import CountryDropdown from "@/app/components/CountryDropdown";
import { COUNTRIES } from "@/app/_lib/countries";
import { useSession } from "next-auth/react";
import LoadingSkeleton from "@/app/components/ui/LoadingSkeleton";
import { ShipmentDetails, Contact, Country, Prediction } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateShipmentDetails } from "@/app/store/shipmentDetailsSlice";

interface SenderCardProps {
  formSubmitted: boolean;
  setSenderComplete: (complete: boolean) => void;
}

const SenderCard: React.FC<SenderCardProps> = ({
  formSubmitted,
  setSenderComplete,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.shipmentDetails);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<Country>({
    title: "Sverige",
    engTitle: "Sweden",
    value: "SE",
  });
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const lastUserInput = useRef<string>("");

  const [errors, setErrors] = useState({
    companyName: false,
    address: false,
    postcode: false,
    city: false,
    contactName: false,
    phone: false,
    email: false,
    country: false,
  });

  useEffect(() => {
    if (details.sender) {
      setAddress(details.sender.address || "");
      setCompanyName(details.sender.companyName || "");
      setPostcode(details.sender.postcode || "");
      setCity(details.sender.city || "");
      setContactName(details.sender.contactName || "");
      setPhoneNumber(details.sender.phone || "");
      setEmail(details.sender.email || "");
      setCountry({
        title: "Sverige",
        engTitle: details.sender.country || "Sweden",
        value:
          COUNTRIES.find((c) => c.engTitle === details.sender.country)?.value ||
          "SE",
      });
    }
  }, [details]);

  const useHomeAddress = () => {
    if (session?.user) {
      const {
        street,
        postalCode,
        city,
        country,
        companyName,
        email,
        name,
        phonenumber,
      } = session.user;
      setCompanyName(companyName || "");
      setPhoneNumber(phonenumber || "");
      setContactName(name || "");
      setEmail(email || "");
      setAddress(street || "");
      setPostcode(postalCode || "");
      setCity(city || "");
      const foundCountry = COUNTRIES.find((c) => c.engTitle === country);
      if (foundCountry) {
        setCountry(foundCountry);
      } else {
        setCountry({ title: "Sverige", engTitle: "Sweden", value: "SE" });
      }
      dispatch(
        updateShipmentDetails({
          sender: {
            companyName: companyName || "",
            contactName: name || "",
            address: street || "",
            postcode: postalCode || "",
            city: city || "",
            country: foundCountry ? foundCountry.engTitle : "Sweden",
            email: email || "",
            phone: phonenumber || "",
          },
        })
      );
      setErrors({
        companyName: !companyName,
        address: !street,
        postcode: !postalCode,
        city: !city,
        contactName: !name,
        phone: !phonenumber,
        email: !email,
        country: !country,
      });
      setSenderComplete(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ShipmentDetails["sender"]
  ) => {
    const value = e.target.value;
    const updatedSender = { ...details.sender, [field]: value };
    dispatch(updateShipmentDetails({ sender: updatedSender }));
    setErrors((prev) => ({ ...prev, [field]: !value }));

    if (field === "address") setAddress(value);
    if (field === "companyName") setCompanyName(value);
    if (field === "postcode") setPostcode(value);
    if (field === "city") setCity(value);
    if (field === "contactName") setContactName(value);
    if (field === "phone") setPhoneNumber(value);
    if (field === "email") setEmail(value);
  };

  const handleCountryChange = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    dispatch(
      updateShipmentDetails({
        sender: { ...details.sender, country: selectedCountry.engTitle },
      })
    );
  };

  const handleSuggestionClick = (suggestion: Prediction) => {
    setAddress(suggestion.street);
    setPostcode(suggestion.postal_code);
    setCity(suggestion.city);
    const foundCountry = COUNTRIES.find(
      (c) => c.engTitle === suggestion.country
    );
    if (foundCountry) {
      setCountry(foundCountry);
    }
    dispatch(
      updateShipmentDetails({
        sender: {
          ...details.sender,
          address: suggestion.street,
          postcode: suggestion.postal_code,
          city: suggestion.city,
          country: foundCountry ? foundCountry.engTitle : "Sweden",
        },
      })
    );
    setErrors({
      companyName: false,
      address: false,
      postcode: false,
      city: false,
      contactName: false,
      phone: false,
      email: false,
      country: false,
    });
    setShowSuggestions(false);
  };

  const handleClearFields = () => {
    setSelectedContact("");
    setAddress("");
    setPostcode("");
    setCity("");
    setCountry({ title: "Sverige", engTitle: "Sweden", value: "SE" });
    setContactName("");
    setPhoneNumber("");
    setEmail("");
    setCompanyName("");
    setErrors({
      companyName: true,
      address: true,
      postcode: true,
      city: true,
      contactName: true,
      phone: true,
      email: true,
      country: true,
    });
    setSenderComplete(false); // Prevent form submission logic
    dispatch(
      updateShipmentDetails({
        sender: {
          companyName: "",
          contactName: "",
          address: "",
          postcode: "",
          city: "",
          country: "Sweden",
          email: "",
          phone: "",
        },
      })
    );
  };

  useEffect(() => {
    validateFields();
  }, [address, companyName, postcode, city, contactName, phoneNumber, email]);

  const validateFields = () => {
    const newErrors = {
      companyName: !companyName,
      address: !address,
      postcode: !postcode,
      city: !city,
      contactName: !contactName,
      phone: !phoneNumber,
      email: !email,
      country: !country,
    };

    setErrors(newErrors);

    const allFieldsValid = Object.values(newErrors).every((error) => !error);
    setSenderComplete(allFieldsValid);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/contacts?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setContacts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch contacts", err);
          setError("Failed to fetch contacts");
          setIsLoading(false);
        });
    }
  }, [session?.user?.id]);

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
      }, 300);
    } else {
      setShowSuggestions(false);
    }

    return () => clearTimeout(timerId);
  }, [address]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".suggestion-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectContact = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    const contact = contacts.find((c) => c.id === selectedId);
    if (contact) {
      setSelectedContact(contact.companyName);
      setCompanyName(contact.companyName);
      setContactName(contact.name);
      setAddress(contact.street || "");
      setPostcode(contact.postalcode || "");
      setCity(contact.city || "");
      setEmail(contact.email || "");
      setPhoneNumber(contact.phone || "");
      setContactCountry(contact.country);
      dispatch(
        updateShipmentDetails({
          sender: {
            companyName: contact.companyName,
            contactName: contact.name,
            address: contact.street || "",
            postcode: contact.postalcode || "",
            city: contact.city || "",
            email: contact.email || "",
            phone: contact.phone || "",
            country: contact.country || "",
          },
        })
      );
      setErrors({
        companyName: false,
        address: false,
        postcode: false,
        city: false,
        contactName: false,
        phone: false,
        email: false,
        country: false,
      });
    } else {
      handleClearFields();
    }
  };

  const setContactCountry = (countryCode: string | undefined) => {
    if (countryCode) {
      const foundCountry = COUNTRIES.find((c) => c.value === countryCode);
      if (foundCountry) {
        setCountry(foundCountry);
      } else {
        setCountry({ title: "Sverige", engTitle: "Sweden", value: "SE" });
      }
    } else {
      setCountry({ title: "Sverige", engTitle: "Sweden", value: "SE" });
    }
  };

  useEffect(() => {
    validateFields();
  }, []);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card bg-white shadow-xl mx-auto max-w-lg w-full">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="card-body">
          <div className="flex flex-row justify-between mb-4 items-center ">
            <h2 className="card-title font-normal">Avsändare</h2>
            <button
              className="btn text-red-500 bg-white border-red-500 hover:bg-red-200"
              onClick={handleClearFields}
            >
              Rensa
            </button>
          </div>
          <button
            className="btn btn-primary btn-sm w-44 font-mono font-thin mb-2"
            onClick={useHomeAddress}
          >
            Använd hemadress
          </button>

          <div className="border rounded py-4 px-4 shadow-inner mb-4">
            <div className="flex flex-col  mb-4">
              <span className="label-text">Företagsnamn</span>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  formSubmitted && errors.companyName ? "border-red-500" : ""
                }`}
                value={companyName}
                required
                onChange={(e) => handleInputChange(e, "companyName")}
              />
              {formSubmitted && errors.companyName && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
            </div>

            <div className="relative mb=4">
              <span className="label-text">Adress (Ej boxadress)</span>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  formSubmitted && errors.address ? "border-red-500" : ""
                }`}
                required
                value={address}
                onChange={(e) => handleInputChange(e, "address")}
                onFocus={() => setShowSuggestions(true)}
              />
              {formSubmitted && errors.address && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <div className="bg-white border rounded shadow-lg w-full absolute z-10 top-full mt-1 suggestion-dropdown max-h-60 overflow-y-auto">
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
                  className={`input input-bordered w-32 mr-3 max-w-xs ${
                    formSubmitted && errors.postcode ? "border-red-500" : ""
                  }`}
                  value={postcode}
                  required
                  onChange={(e) => handleInputChange(e, "postcode")}
                />
                {formSubmitted && errors.postcode && (
                  <p className="text-red-500">Fältet är obligatoriskt</p>
                )}
              </div>

              <div className="flex flex-col  md:mb-0">
                <span className="label-text">Stad</span>
                <input
                  type="text"
                  className={`input input-bordered min-w-64 ${
                    formSubmitted && errors.city ? "border-red-500" : ""
                  }`}
                  value={city}
                  required
                  onChange={(e) => handleInputChange(e, "city")}
                />
                {formSubmitted && errors.city && (
                  <p className="text-red-500">Fältet är obligatoriskt</p>
                )}
              </div>
            </div>
            <div className="flex flex-col  md:mb-0">
              <span className="label-text">Land</span>
              <CountryDropdown
                selectedCountry={country}
                onSelectCountry={handleCountryChange}
              />
              {formSubmitted && errors.country && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
            </div>
          </div>

          <div className="border-2 rounded py-4 px-4 border-gray-200">
            <div className="flex flex-col mb-4">
              <span className="label-text">Kontaktnamn</span>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  formSubmitted && errors.contactName ? "border-red-500" : ""
                }`}
                value={contactName}
                required
                onChange={(e) => handleInputChange(e, "contactName")}
              />
              {formSubmitted && errors.contactName && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
            </div>
            <div className="flex flex-col  mb-4">
              <span className="label-text">Telefon</span>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  formSubmitted && errors.phone ? "border-red-500" : ""
                }`}
                value={phoneNumber}
                required
                onChange={(e) => handleInputChange(e, "phone")}
              />
              {formSubmitted && errors.phone && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <span className="label-text">E-postadress</span>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  formSubmitted && errors.email ? "border-red-500" : ""
                }`}
                value={email}
                required
                onChange={(e) => handleInputChange(e, "email")}
              />
              {formSubmitted && errors.email && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderCard;
