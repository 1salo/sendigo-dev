import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import EditContactModal from "./EditContactModal";
import AddContactModal from "./AddContacModal";
interface Contact {
  id: number;
  companyName: string;
  name: string;
  street: string | null;
  city: string | null;
  country: string | null;
  email: string | null;
  phone: string | null;
  postalcode: string | null;
  userId: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isAddContactModalOpen, setIsAddContactModalOpen] =
    useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (status === "loading" || !session || !session.user?.id) {
          setIsLoading(true);
          return;
        }

        const response = await fetch("/api/contacts", {
          headers: {
            "X-User-ID": session.user.id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [session, status]);

  const handleCheckboxChange = (contactId: number, isChecked: boolean) => {
    setSelectedContacts((current) =>
      isChecked
        ? [...current, contactId]
        : current.filter((id) => id !== contactId)
    );
  };

  const handleDeleteSelectedContacts = async () => {
    try {
      await Promise.all(
        selectedContacts.map((id) =>
          fetch(`/api/contacts/${id}`, { method: "DELETE" })
        )
      );
      setContacts((current) =>
        current.filter((contact) => !selectedContacts.includes(contact.id))
      );
      setSelectedContacts([]);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete contacts"
      );
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleAddContact = () => {
    setIsAddContactModalOpen(true);
  };

  const closeAddContactModal = () => {
    setIsAddContactModalOpen(false);
  };

  const closeEditModal = () => {
    setEditingContact(null);
  };

  const toggleAllContacts = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedContacts(contacts.map((contact) => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const saveContact = async (updatedContact: Contact) => {
    try {
      let response;
      if (updatedContact.id) {
        response = await fetch(`/api/contacts/${updatedContact.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedContact),
        });
      } else {
        response = await fetch("/api/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedContact),
        });
      }

      if (!response.ok) {
        throw new Error(
          updatedContact.id
            ? "Failed to update contact."
            : "Failed to create contact."
        );
      }

      const data: Contact = await response.json();
      if (updatedContact.id) {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === updatedContact.id ? data : contact
          )
        );
      } else {
        setContacts((prevContacts) => [...prevContacts, data]);
      }

      closeEditModal();
      setIsAddContactModalOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-10/12">
      <h1 className="mb-4 font-medium">Min adressbok</h1>
      <button className="btn btn-primary mr-4 hover:bg-gray-900" onClick={handleAddContact}>
        Lägg till kontakt
      </button>
      <button
        className="btn text-red-500 bg-white border-red-500 hover:bg-red-200"
        onClick={handleDeleteSelectedContacts}
        disabled={selectedContacts.length === 0}
      >
        Radera
      </button>
      <div className="flex flex-col px-4">
        <div className="grid grid-cols-3 gap-4 text-sm font-light my-8">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              className="checkbox mr-4"
              onChange={(e) => toggleAllContacts(e.target.checked)}
              checked={
                contacts.length > 0 &&
                selectedContacts.length === contacts.length
              }
            />
            <p>Kontakt</p>
          </div>
          <p>Kontaktperson</p>
          <p className="ml-36">Redigera</p>
        </div>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="border-b py-4 grid grid-cols-3 gap-4 items-center"
            >
              <div className="flex items-start space-x-2">
                <div className="flex items-center mr-4 mt-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(contact.id, e.target.checked)
                    }
                    checked={selectedContacts.includes(contact.id)}
                  />
                </div>
                <div>
                  <p className="font-medium">{contact.companyName}</p>
                  <p className="text-sm text-gray-500">{contact.street}</p>
                </div>
              </div>

              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
              </div>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline"
                  onClick={() => handleEdit(contact)}
                >
                  Redigera
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 font-semibold">Inga kontakter hittades</p>
        )}
        {editingContact && (
          <EditContactModal
            contact={editingContact}
            isOpen={!!editingContact}
            onClose={closeEditModal}
            onSave={saveContact}
          />
        )}
      </div>
      {isAddContactModalOpen && (
        <AddContactModal
          isOpen={isAddContactModalOpen}
          onClose={closeAddContactModal}
          onSave={saveContact}
        />
      )}
    </div>
  );
};

export default ContactList;
