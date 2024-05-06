"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      setError("Token saknas eller är ogiltig.");
      return;
    }

    try {
      const response = await fetch("/api/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.message || "Ett fel uppstod.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Nätverksfel, försök igen senare.");
    }
  };

  return (
    <div className="bg-white">
      <div className="ml-8 mt-8">
        <Link href="/">
          <Image
            src="/images/sendigologo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex justify-center items-center w-full h-screen bg-white">
        {!isSubmitted ? (
          <div className="w-full max-w-md px-4">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center"
            >
              <div className="flex flex-col mb-4">
                <span className="label-text">Lösenord</span>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="input input-bordered min-w-64"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <span className="label-text">Lösenord igen</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="input input-bordered min-w-64"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="btn btn-primary mt-4">
                Ändra lösenord
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-center">Ditt lösenord har uppdaterats</p>
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Tillbaka till inloggningssidan
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
