import React, { useState, useEffect } from "react";
import CountryDropdown from "@/app/components/CountryDropdown";
import { Country } from "./EditContactModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: any, country: Country) => void;
}

const AddContactModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [editedContact, setEditedContact] = useState<any>({
    companyName: "",
    name: "",
    street: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    postalcode: "",
  });
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    title: "Sverige",
    value: "SE",
    engTitle: "",
  });

  const handleSave = () => {
    const contactData = { ...editedContact, country: selectedCountry.value };
    onSave(contactData, selectedCountry);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedContact((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    if (!isOpen) {
      setEditedContact({
        companyName: "",
        name: "",
        street: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        postalcode: "",
      });
      setSelectedCountry({
        title: "Sverige",
        value: "SE",
        engTitle: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-10">
      <div
        className="bg-white shadow-xl mx-auto rounded w-4/12 max-w-xl h-5/6 p-4 mt-10 relative z-20"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="mb-6">
          <button
            className="absolute top-2 right-2 text-lg font-bold w-8 hover:bg-gray-200"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 border p-4">
            <div className="form-group">
              <label className="label-text">Företagsnamn</label>
              <input
                type="text"
                name="companyName"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="label-text">Adress (Ej boxadress)</label>
              <input
                type="text"
                name="street"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="label-text">Postnummer</label>
                <input
                  type="text"
                  name="postalcode"
                  className="input input-bordered w-44"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="label-text">Stad</label>
                <input
                  type="text"
                  name="city"
                  className="input input-bordered w-44"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label-text">Land</label>
              <CountryDropdown
                selectedCountry={selectedCountry}
                onSelectCountry={handleSelectCountry}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border p-4">
            <div className="form-group">
              <label className="label-text">Kontaktnamn</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="label-text">Telefon</label>
              <input
                type="text"
                name="phone"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-4">
              <label className="label-text">E-postadress</label>
              <input
                type="text"
                name="email"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button className="btn btn-secondary mx-2" onClick={onClose}>
              Avbryt
            </button>

            <button className="btn btn-primary" onClick={handleSave}>
              Lägg till kontakt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
