"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface VerificationFailedProps {
  reason?: string;
}

const VerificationFailed: React.FC<VerificationFailedProps> = ({ reason }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessage = () => {
      switch (reason) {
        case "token_required":
          return "No verification token was provided.";
        case "token_not_found":
          return "The verification token is invalid.";
        case "token_expired":
          return "The verification token has expired.";
        default:
          return "Failed to verify email.";
      }
    };

    setMessage(getMessage());
  }, [reason]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1>Det gick inte att verifiera din e-post</h1>
      <p>{message}</p>
      <Link href="/" className="text-blue-500 hover:underline mt-4">
        Gå tillbaka
      </Link>
    </div>
  );
};

export default VerificationFailed;
