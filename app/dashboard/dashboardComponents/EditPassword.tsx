import React, { useState, useEffect } from "react";

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("Det nya lösenordet matchar inte bekräftelsen.");
      return;
    }

    try {
      const response = await fetch("/api/edit-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (
          data.errors &&
          typeof data.errors === "object" &&
          !Array.isArray(data.errors)
        ) {
          const errorMessages = Object.values(data.errors)
            .map((err) =>
              Array.isArray(err) ? err.join(", ") : "Invalid error format"
            )
            .join("; ");
          setError(errorMessages);
        } else {
          setError(data.message || "Något gick fel");
        }
        return;
      }

      setSuccessMessage("Lösenordet har uppdaterats.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Kommunikationsfel med servern.");
      }
    }
  };

  return (
    <div className="bg-white">
      <h1 className="my-4 font-medium">Lösenord</h1>
      <label className="flex-col flex w-72">
        Befintligt lösenord
        <input
          type="password"
          className="input input-bordered focus:outline-none"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </label>
      <label className="flex-col flex w-72">
        Nytt lösenord
        <input
          type="password"
          className="input input-bordered focus:outline-none"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <label className="flex-col flex w-72">
        Bekräfta lösenord
        <input
          type="password"
          className="input input-bordered focus:outline-none"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </label>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && (
        <div className="alert alert-success w-72 mt-2">{successMessage}</div>
      )}
      <button
        className="btn btn-primary mt-4 w-72 mb-4"
        onClick={handleUpdatePassword}
      >
        Uppdatera lösenord
      </button>
    </div>
  );
};

export default EditPassword;
