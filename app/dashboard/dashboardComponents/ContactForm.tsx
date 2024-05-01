import React, { useState } from "react";
import { ContactFormData } from "@/types";

interface ContactFormProps {
  onSave: (formData: ContactFormData, userId: string) => void;
  userId: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, userId }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    street: "",
    phone: "",
    companyName: "",
    userId: userId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, userId);
    setFormData({
      name: "",
      email: "",
      street: "",
      phone: "",
      companyName: "",
      userId: userId,
    });
  };

  return (
    <div className="card bg-white rounded shadow-lg">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control mb-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control mb-2"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="form-control mb-2"
          />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
