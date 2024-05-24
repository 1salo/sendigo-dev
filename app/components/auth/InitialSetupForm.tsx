import Image from "next/image";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CountryDropdown from "../CountryDropdown";

interface FormValues {
  firstName: string;
  lastName: string;
  organizationNumber: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface InitialSetupFormProps {
  onSubmit: SubmitHandler<FormValues>;
  isLoading: boolean;
  onClose: () => void;
}

const InitialSetupForm: React.FC<InitialSetupFormProps> = ({
  onSubmit,
  isLoading,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      country: "SE", // Set default country to Sweden
    },
  });

  const [selectedCountry, setSelectedCountry] = React.useState({
    title: "Sverige",
    engTitle: "Sweden",
    value: "SE",
  });

  const handleSelectCountry = (country: {
    title: string;
    engTitle: string;
    value: string;
  }) => {
    setSelectedCountry(country);
    setValue("country", country.value); // Update form value when a country is selected
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-md w-2/3 h-4/5 mb-4 p-4 mt-10 relative overflow-y-auto flex">
        <div className="w-2/3 p-4 rounded max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label>Förnamn</label>
              <input
                className="input input-bordered focus:outline-none mt-2 max-w-96"
                {...register("firstName", {
                  required: "Du måste ange ett förnamn.",
                })}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col mt-3">
              <label>Efternamn</label>
              <input
                className="input input-bordered focus:outline-none mt-2 max-w-96"
                {...register("lastName", {
                  required: "Du måste ange ett efternamn.",
                })}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <div className="flex flex-col mt-3">
              <label>Orgnr</label>
              <input
                className="input input-bordered focus:outline-none mt-2 max-w-96"
                {...register("organizationNumber", {
                  required: "Du måste ange ett organisationsnummer.",
                })}
              />
              {errors.organizationNumber && (
                <p>{errors.organizationNumber.message}</p>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <label>Adress</label>
              <input
                className="input input-bordered focus:outline-none mt-2 max-w-96"
                {...register("street", {
                  required: "Du måste ange en adress.",
                })}
              />
              {errors.street && <p>{errors.street.message}</p>}
            </div>
            <div className="flex flex-col mt-3">
              <label>Stad</label>
              <input
                className="input input-bordered focus:outline-none mt-2 max-w-96"
                {...register("city", { required: "Du måste ange en stad." })}
              />
              {errors.city && <p>{errors.city.message}</p>}
            </div>
            <div className="flex flex-col mt-3">
              <label>Postnummer</label>
              <input
                className="input input-bordered focus:outline-none mt-2 max-w-96"
                {...register("postalCode", {
                  required: "Du måste ange ett postnummer.",
                })}
              />
              {errors.postalCode && <p>{errors.postalCode.message}</p>}
            </div>
            <div className="flex flex-col mt-3 max-w-96">
              <label>Land</label>
              <CountryDropdown
                selectedCountry={selectedCountry}
                onSelectCountry={handleSelectCountry}
              />
              {errors.country && <p>{errors.country.message}</p>}
            </div>
            <div className="flex justify-between mt-20 gap-28 pb-4">
              <button
                type="button"
                onClick={onClose}
                className="btn text-red-500 bg-white border-red-500 hover:bg-red-200 w-96"
              >
                Stäng
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-outline w-96"
              >
                Spara
              </button>
            </div>
          </form>
        </div>

        <div className="w-1/3 flex flex-col p-4 border-l h-screen">
          <div className="flex justify-end">
            <Image
              src="/images/sendigologo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </div>
          <h1 className="mt-32 ml-10 font-light text-4xl w-96">
            Komplettera dina uppgifter för att fullt utnyttja de möjligheter som
            Sendigo erbjuder
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InitialSetupForm;
