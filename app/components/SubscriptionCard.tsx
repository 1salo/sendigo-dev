import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface Plan {
  name: string;
  title: string;
  features: string[];
  price: string;
  id: number;
}

interface SubscriptionCardProps {
  currentPlan: string;
  onUpgrade: (planId: number) => void;
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Free",
    title: "En prisplan som passar de flesta",
    features: [
      "Upp till 20% lägre fraktpriser",
      "Boka med DHL, DSV, TNT, UPS & Fedex",
      "Skicka paket, pall & container",
      "Jämför fraktlösningar automatiskt",
      "Spara favoritkontakter & adresser",
      "Support via telefon, chatt & mail",
    ],
    price: "0 kr/mån",
  },
  {
    id: 2,
    name: "Plus",
    title: "Allt som du får med Free, samt:",
    features: [
      "Ytterligare 30% billigare inrikesfrakt",
      "Ytterligare 30% billigare utrikesfrakt",
    ],
    price: "299 kr/mån",
  },
  {
    id: 3,
    name: "Pro",
    title: "Allt som du får med Plus, samt:",
    features: ["Skräddarsydd prisplan", "Dedikerad fraktexpert"],
    price: "Pris vid förfrågan",
  },
];

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  currentPlan,
  onUpgrade,
}) => {
  return (
    <div className="flex space-x-4 justify-center">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`card flex-grow min-w-80 bg-base-100 shadow-xl mx-auto my-4 ${
            currentPlan === plan.name ? "border-2 border-green-500" : ""
          }`}
        >
          <div className="card-body flex flex-col">
            <h1 className="card-title text-lg mb-4 justify-center">
              {plan.name}
            </h1>
            <p className="text-center text-3xl mb-4">{plan.price}</p>
            <p className="text-medium font-semibold mb-4 text-center">
              {plan.title}
            </p>
            <ul className="list-none flex-grow">
              {plan.features.map((feature, index) => (
                <li className="flex items-center mb-2" key={index}>
                  <IoMdCheckmarkCircle className="text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              {plan.name === "Pro" ? (
                <button
                  onClick={() =>
                    (window.location.href = "mailto:sales@sendigo.se")
                  }
                  className="btn btn-outline"
                  disabled={currentPlan === "Pro"}
                >
                  Begär offert
                </button>
              ) : (
                <button
                  onClick={() => onUpgrade(plan.id)}
                  className="btn btn-outline"
                  disabled={currentPlan === plan.name}
                >
                  {plan.name === "Free"
                    ? "Välj Sendigo Free"
                    : plan.name === "Plus"
                    ? "Välj Sendigo Plus"
                    : "Uppgradera"}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionCard;
