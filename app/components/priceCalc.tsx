import React from "react";
import ShippingForm from "./CalcShippingForm";

const PriceCalculator: React.FC = () => {
  return (
    <div className="bg-stone-100 h-56 flex justify-center items-center">
      <ShippingForm />
    </div>
  );
};

export default PriceCalculator;
