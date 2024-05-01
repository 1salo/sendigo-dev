import React from "react";

const ContactItem = ({
  contact,
  onEdit,
}: {
  contact: any;
  onEdit: () => void;
}) => {
  const handleEditClick = () => {
    onEdit();
  };

  return (
    <div>
      <div className="p-4 border-b rounded mb-2 flex flex-row justify-between">
        <div>
          <p>{contact.companyName}</p>
          <p>{contact.street}</p>
        </div>
        <div>
          <p>{contact.name}</p>
          <p>{contact.email}</p>
        </div>
        <div>
          <button className="btn btn-outline" onClick={handleEditClick}>
            Redigera
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
