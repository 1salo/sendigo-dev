import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Contact {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  companyName: string;
  street: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession(); // Get session data and loading status from NextAuth

  useEffect(() => {
    if (status === "loading") {
      // Session data is still loading
      setIsLoading(true);
    } else if (session && session.user?.id) {
      // Ensure the session and user ID are available
      const fetchContacts = async () => {
        try {
          const response = await fetch("/api/contacts", {
            headers: {
              // Using the user ID in a custom header or as a part of the query
              "X-User-ID": session.user.id, // Using custom header for demonstration
            },
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to fetch contacts");
          }
          const data = await response.json();
          setContacts(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchContacts();
    } else {
      // User is not authenticated
      setError("User is not authenticated.");
      setIsLoading(false);
    }
  }, [session, status]);

  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="grid grid-cols-3 gap-4 mb-4 w-full max-w-4xl border-b">
        <p className="font-semibold ">Kontakt</p>
        <p className="font-semibold ">Kontaktperson</p>
        <p className="font-semibold text-center">Redigera</p>
      </div>
      {contacts.length > 0 ? (
        <div className="w-full max-w-4xl">
          {contacts.map((contact, index) => (
            <div key={index} className="border-b py-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <p className="font-semibold">{contact.companyName}</p>
                  <p className="text-sm text-gray-600">{contact.street}</p>
                </div>
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                </div>
                <div className="flex justify-center">
                  <button className="btn btn-outline">Redigera</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No contacts found</p>
      )}
    </div>
  );
};

export default ContactList;
