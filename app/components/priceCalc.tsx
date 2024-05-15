import React from "react";
import ShippingForm from "./CalcShippingForm";

const PriceCalculator: React.FC = () => {
  return (
    <div className="sendigo-gray-color h-60 flex justify-center items-center">
      <ShippingForm />
    </div>
  );
};

export default PriceCalculator;
