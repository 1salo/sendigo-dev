"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Added state for error messages

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message on new submission
    try {
      const response = await fetch("/api/password-forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setErrorMessage(data.message); // Update state with error message from the API
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Något gick fel, försök igen senare."); // Update state with generic error message
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
        <div className="w-full max-w-md px-4">
          {!isSubmitted ? (
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center"
              >
                <span className=" mb-2">Email</span>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    autoComplete="username"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4 text-red-500 text-center">
                  {errorMessage}
                </div>
                <div className="flex items-center justify-center">
                  <button className="btn btn-primary w-full" type="submit">
                    Skicka återställningslänk
                  </button>
                </div>
              </form>
              <Link
                href="/sign-in"
                className="text-blue-500 hover:underline flex justify-center"
              >
                Tillbaka till inloggningssidan
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">
                En länk och instruktioner för lösenordsåterställning har
                skickats till din email. Se till så att det inte hamnat i
                skräppost.
              </p>
              <Link href="/sign-in" className="text-blue-500 hover:underline">
                Tillbaka till inloggningssidan
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
