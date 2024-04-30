import React from "react";
import ShippingForm from "./CalcShippingForm";

const PriceCalculator: React.FC = () => {
  return (
    <div className="bg-stone-100 h-52 flex justify-center items-center">
      <ShippingForm />
    </div>
  );
};

export default PriceCalculator;
