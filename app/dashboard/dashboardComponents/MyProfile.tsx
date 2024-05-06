import React from "react";
import { useSession } from "next-auth/react";
import { COUNTRIES } from "@/app/_lib/countries";

const MyProfile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  const userCountry = COUNTRIES.find(
    (country) => country.value === session.user.country
  );

  return (
    <div className="flex flex-col gap-4">
      <label>
        Företagsnamn:
        <input
          type="text"
          name="companyName"
          className="input input-bordered focus:outline-none"
          value={session.user.companyName || ""}
          readOnly
        />
      </label>
      <label>
        Organisationsnummer:
        <input
          type="text"
          name="organizationNumber"
          className="input input-bordered focus:outline-none"
          value={session.user.organizationNumber || ""}
          readOnly
        />
      </label>
      <label>
        Adress:
        <input
          type="text"
          name="address"
          className="input input-bordered focus:outline-none"
          value={session.user.street || ""}
          readOnly
        />
      </label>
      <label>
        Stad:
        <input
          type="text"
          name="city"
          className="input input-bordered focus:outline-none"
          value={session.user.city || ""}
          readOnly
        />
      </label>
      <label>
        Postnummer:
        <input
          type="text"
          name="postalCode"
          className="input input-bordered focus:outline-none"
          value={session.user.postalCode || ""}
          readOnly
        />
      </label>
      <span>Land:</span>
      <div className="flex items-center gap-2 input input-bordered w-52 focus:outline-none">
        {userCountry && (
          <>
            <img
              alt={`${userCountry.value} flag`}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${userCountry.value}.svg`}
              className="h-4 rounded-sm"
            />
            <span>{userCountry.title}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
