import React from "react";
import { useSession } from "next-auth/react";
import { COUNTRIES } from "@/app/_lib/countries";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

const MyProfileCompany = () => {
  const { data: session } = useSession();

  if (!session) {
    return <LoadingSpinner />;
  }

  const userCountry = COUNTRIES.find(
    (country) => country.value === session.user.country
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 mt-20 font-medium">Företagsinfo</h1>
      <label className="flex-col flex w-72">
        <span>Företagsnamn</span>
        <input
          type="text"
          name="companyName"
          className="input input-bordered focus:outline-none bg-gray-100 mt-2"
          value={session.user.companyName || ""}
          readOnly
        />
      </label>
      <label className="flex-col flex w-72">
        <span>Organisationsnummer</span>
        <input
          type="text"
          name="organizationNumber"
          className="input input-bordered focus:outline-none bg-gray-100 mt-2"
          value={session.user.organizationNumber || ""}
          readOnly
        />
      </label>
      <label className="flex-col flex w-72">
        <span>Adress</span>
        <input
          type="text"
          name="address"
          className="input input-bordered focus:outline-none bg-gray-100 mt-2"
          value={session.user.street || ""}
          readOnly
        />
      </label>
      <label className="flex-col flex w-72">
        <span>Stad</span>
        <input
          type="text"
          name="city"
          className="input input-bordered focus:outline-none bg-gray-100 mt-2"
          value={session.user.city || ""}
          readOnly
        />
      </label>
      <label className="flex-col flex w-72">
        <span>Postnummer</span>
        <input
          type="text"
          name="postalCode"
          className="input input-bordered focus:outline-none bg-gray-100 mt-2"
          value={session.user.postalCode || ""}
          readOnly
        />
      </label>
      <span>Land</span>
      <div className="flex items-center gap-2 input input-bordered w-72 focus:outline-none bg-gray-100">
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

export default MyProfileCompany;
