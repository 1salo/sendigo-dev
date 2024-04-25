import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface PricePlanCardProps {
  title: string;
  price: string;
  features: string[];
  buttonLabel: string;
  buttonLink?: string;
}

const PriceplanCard = ({
  title,
  price,
  features,
  buttonLabel,
  buttonLink,
}: PricePlanCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mailWindowOpened, setMailWindowOpened] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isLoading) {
        setIsLoading(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoading]);

  const handleButtonClick = async () => {
    setIsLoading(true);
    if (buttonLink && buttonLink.startsWith("mailto:")) {
      // Open mail window
      setMailWindowOpened(true);
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-2xl bg-white text-center p-6 flex flex-col w-full mx-auto my-4">
      <div className="font-bold text-4xl mb-2">{title}</div>
      <p className="text-2xl mb-4">{price}</p>
      <a href={buttonLink}>
        <button
          onClick={handleButtonClick}
          className={`btn btn-primary btn-outline mb-4 w-2/3 md:w-44${
            isLoading ? "cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <span>{buttonLabel}</span>
              <ArrowRightIcon className="w-5 hidden md:block" />
            </>
          )}
        </button>
      </a>
      <ul className="text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <img
              alt="Checkmark"
              src="/images/checkmark.svg"
              className="w-4 h-4 mr-2"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceplanCard;
