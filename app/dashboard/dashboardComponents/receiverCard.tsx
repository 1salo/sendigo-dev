"use client";

import React, { useEffect, useState, useRef } from "react";
import { COUNTRIES } from "@/app/_lib/countries";
import CountryDropdown from "@/app/components/CountryDropdown";
import LoadingSkeleton from "@/app/components/ui/LoadingSkeleton";
import { useSession } from "next-auth/react";
import { Contact, Country, Prediction, ShipmentDetails } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateShipmentDetails } from "@/app/store/shipmentDetailsSlice";

interface ReceiverCardProps {
  formSubmitted: boolean;
  setReceiverComplete: (complete: boolean) => void;
}

const ReceiverCard: React.FC<ReceiverCardProps> = ({
  formSubmitted,
  setReceiverComplete,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.shipmentDetails);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState(details.receiver?.address || "");
  const [postcode, setPostcode] = useState(details.receiver?.postcode || "");
  const [companyName, setCompanyName] = useState(
    details.receiver?.companyName || ""
  );
  const [city, setCity] = useState(details.receiver?.city || "");
  const [contactName, setContactName] = useState(
    details.receiver?.contactName || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(details.receiver?.phone || "");
  const [email, setEmail] = useState(details.receiver?.email || "");
  const [country, setCountry] = useState<Country>({
    title: "Sverige",
    engTitle: details.receiver?.country || "Sweden",
    value: "SE",
  });
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPrivatePerson, setIsPrivatePerson] = useState(true);
  const lastUserInput = useRef("");
  const [saveInAddressBook, setSaveInAddressBook] = useState(false);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ShipmentDetails["receiver"]
  ) => {
    const value = e.target.value;
    const updatedReceiver = { ...details.receiver, [field]: value };
    dispatch(updateShipmentDetails({ receiver: updatedReceiver }));
    setErrors((prev) => ({ ...prev, [field]: !value }));

    if (field === "address") setAddress(value);
    if (field === "postcode") setPostcode(value);
    if (field === "companyName") setCompanyName(value);
    if (field === "city") setCity(value);
    if (field === "contactName") setContactName(value);
    if (field === "phone") setPhoneNumber(value);
    if (field === "email") setEmail(value);
  };

  const handleCountryChange = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    dispatch(
      updateShipmentDetails({
        receiver: {
          ...details.receiver,
          country: selectedCountry.engTitle,
        },
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
        receiver: {
          ...details.receiver,
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
    setReceiverComplete(false);
    dispatch(
      updateShipmentDetails({
        receiver: {
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

  const handleSaveInAddressBookChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSaveInAddressBook(e.target.checked);
    if (e.target.checked) {
      saveContact();
    }
  };

  const handleToggle = () => {
    setIsPrivatePerson((prev) => !prev);
    validateFields();
  };

  const saveContact = async () => {
    const contactData = {
      companyName,
      name: contactName,
      street: address,
      postalcode: postcode,
      city,
      country: country.engTitle,
      email,
      phone: phoneNumber,
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error("Failed to save contact");
      }

      const data = await response.json();
      console.log("Contact saved:", data);
    } catch (error) {
      console.error("Error saving contact:", error);
    }
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
    setReceiverComplete(allFieldsValid);
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

  const handleSelectContact = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    const contact = contacts.find((c) => c.id === selectedId);
    if (contact) {
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
          receiver: {
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
    const foundCountry = COUNTRIES.find((c) => c.value === countryCode);
    if (foundCountry) {
      setCountry(foundCountry);
    } else {
      setCountry({
        title: "Sverige",
        engTitle: "Sweden",
        value: "SE",
      });
    }
  };

  useEffect(() => {
    validateFields();
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  if (error) return <div>Error: {error}</div>;

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

          <div>
            <p>Använd en kontakt från din adressbok</p>
            <select
              className="select select-bordered w-full"
              onChange={handleSelectContact}
            >
              <option value="">Välj en kontakt</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.companyName} - {contact.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control my-4">
            <label className="label cursor-pointer">
              <span className="label-text font-medium">
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
                className={`input input-bordered w-full ${
                  formSubmitted && errors.companyName ? "border-red-500" : ""
                }`}
                value={companyName}
                required
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  handleInputChange(e, "companyName");
                }}
              />
              {formSubmitted && errors.companyName && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
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
                className={`input input-bordered w-full ${
                  formSubmitted && errors.address ? "border-red-500" : ""
                }`}
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  handleInputChange(e, "address");
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {formSubmitted && errors.address && (
                <p className="text-red-500">Fältet är obligatoriskt</p>
              )}
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
                  className={`input input-bordered w-32 mr-3 max-w-xs ${
                    formSubmitted && errors.postcode ? "border-red-500" : ""
                  }`}
                  value={postcode}
                  required
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    handleInputChange(e, "postcode");
                  }}
                />
                {formSubmitted && errors.postcode && (
                  <p className="text-red-500">Fältet är obligatoriskt</p>
                )}
              </div>

              <div className="flex flex-col mb-4 md:mb-0">
                <span className="label-text">Stad</span>
                <input
                  type="text"
                  className={`input input-bordered min-w-64 ${
                    formSubmitted && errors.city ? "border-red-500" : ""
                  }`}
                  value={city}
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                    handleInputChange(e, "city");
                  }}
                />
                {formSubmitted && errors.city && (
                  <p className="text-red-500">Fältet är obligatoriskt</p>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
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

          {isPrivatePerson ? (
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
                  onChange={(e) => {
                    setContactName(e.target.value);
                    handleInputChange(e, "contactName");
                  }}
                />
                {formSubmitted && errors.contactName && (
                  <p className="text-red-500">Fältet är obligatoriskt</p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <span className="label-text">Telefon</span>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    formSubmitted && errors.phone ? "border-red-500" : ""
                  }`}
                  value={phoneNumber}
                  required
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    handleInputChange(e, "phone");
                  }}
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
          ) : (
            <div className="border-2 rounded py-4 px-4 border-gray-200">
              <div className="flex flex-col mb-4">
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
          )}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Spara mottagare i adressboken</span>
              <input
                type="checkbox"
                className="toggle"
                checked={saveInAddressBook}
                onChange={handleSaveInAddressBookChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverCard;
