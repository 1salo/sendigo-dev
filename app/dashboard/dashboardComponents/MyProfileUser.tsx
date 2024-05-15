import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import React, { ChangeEvent, useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phonenumber?: string;
}

const MyProfileUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/edit-user");
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      setError("No user data to update.");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch("/api/edit-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Användare uppdaterad");
        setUser(data.user);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setError(error.message || "Något gick fel");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="my-4 font-medium">Kontakt</h1>
      <label className="flex flex-col w-72">
        <span>Förnamn</span>
        <input
          type="text"
          className="input input-bordered focus:outline-none mt-2"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label className="flex flex-col w-72 mt-4">
        <span>Efternamn</span>
        <input
          type="text"
          className="input input-bordered focus:outline-none mt-2"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label className="flex flex-col w-72 mt-4">
        <span>Email</span>
        <input
          type="text"
          className="input input-bordered focus:outline-none bg-gray-100 mt-2"
          name="email"
          value={user.email}
          readOnly
        />
      </label>
      <label className="flex flex-col w-72 mt-4">
        <span>Telefon</span>
        <input
          type="text"
          className="input input-bordered focus:outline-none mt-2"
          name="phonenumber"
          value={user.phonenumber || ""}
          onChange={handleInputChange}
        />
      </label>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && (
        <div className="alert alert-success w-72 mt-2" role="alert">
          <span>{successMessage}</span>
        </div>
      )}
      <button
        className="btn btn-primary w-72 mt-4"
        onClick={handleUpdateProfile}
        disabled={isUpdating}
      >
        {isUpdating ? "Uppdaterar uppgifter..." : "Spara"}
      </button>
    </div>
  );
};

export default MyProfileUser;
