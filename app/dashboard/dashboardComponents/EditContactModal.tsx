import React, { useState, useEffect } from "react";
import CountryDropdown from "@/app/components/CountryDropdown";
import { Contact } from "@prisma/client";

export interface Country {
  title: string;
  value: string;
  engTitle: string;
}

interface ModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Contact, country: Country) => void;
}

const EditContactModal: React.FC<ModalProps> = ({
  contact,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedContact, setEditedContact] = useState<Contact>(contact);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    title: contact.country || "Välj land",
    value: contact.country || "",
    engTitle: "",
  });

  // Update contact when the prop changes
  useEffect(() => {
    setEditedContact(contact);
    setSelectedCountry({
      title: contact.country || "Välj land",
      value: contact.country || "",
      engTitle: "",
    });
  }, [contact]);

  const handleSave = (selectedCountry: Country) => {
    onSave(
      { ...editedContact, country: selectedCountry.value },
      selectedCountry
    );
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div
        className="bg-white shadow-xl mx-auto rounded w-4/12 max-w-xl h-5/6 p-4 mt-10 relative"
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
                value={editedContact.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="label-text">Adress (Ej boxadress)</label>
              <input
                type="text"
                name="street"
                className="input input-bordered w-full"
                value={editedContact.street || ""}
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
                  value={editedContact.postalcode || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="label-text">Stad</label>
                <input
                  type="text"
                  name="city"
                  className="input input-bordered w-44"
                  value={editedContact.city || ""}
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
                value={editedContact.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="label-text">Telefon</label>
              <input
                type="text"
                name="phone"
                className="input input-bordered w-full"
                value={editedContact.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-4">
              <label className="label-text">E-postadress</label>
              <input
                type="text"
                name="email"
                className="input input-bordered w-full"
                value={editedContact.email || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button className="btn btn-secondary mx-2" onClick={onClose}>
              Avbryt
            </button>

            <button
              className="btn btn-primary"
              onClick={() => handleSave(selectedCountry)}
            >
              Spara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
