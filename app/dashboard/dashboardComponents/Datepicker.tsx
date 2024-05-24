"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateShipmentDetails } from "@/app/store/shipmentDetailsSlice";
import { addToCart } from "@/app/store/cartSlice";
import { Product } from "@/types";

interface DatepickerProps {
  onDateChange: (date: Date) => void;
  onOpenDrawer: () => void;
}

const Datepicker: React.FC<DatepickerProps> = ({
  onDateChange,
  onOpenDrawer,
}) => {
  const dispatch = useDispatch();
  const shipmentDetails = useSelector(
    (state: RootState) => state.shipmentDetails
  );
  const [startDate, setStartDate] = useState<Date>(
    shipmentDetails.date ? new Date(shipmentDetails.date) : new Date()
  );

  useEffect(() => {
    if (shipmentDetails.date) {
      setStartDate(new Date(shipmentDetails.date));
    } else {
      setStartDate(new Date());
    }
  }, [shipmentDetails.date]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      dispatch(updateShipmentDetails({ date: date.toISOString() })); // Store the date as a string
      onDateChange(date);
    }
  };

  const handleAddToShipmentList = () => {
    if (
      !shipmentDetails ||
      !shipmentDetails.sender ||
      !shipmentDetails.receiver ||
      !shipmentDetails.packageDetails ||
      !shipmentDetails.packageDetails.weight ||
      !shipmentDetails.packageDetails.dimensions.length ||
      !shipmentDetails.packageDetails.dimensions.width ||
      !shipmentDetails.packageDetails.dimensions.height ||
      !shipmentDetails.packageDetails.content
    ) {
      console.warn("Shipment details are incomplete:", shipmentDetails);
      return;
    }

    const newProduct: Product = {
      id: `${shipmentDetails.sender.postcode}-${
        shipmentDetails.receiver.postcode
      }-${Date.now()}`,
      name: "Shipment",
      price: 0,
      quantity: shipmentDetails.count || 1,
      date: startDate.toISOString(), // Store date as a string
      sender: shipmentDetails.sender,
      receiver: shipmentDetails.receiver,
      packageDetails: {
        weight: shipmentDetails.packageDetails.weight,
        dimensions: {
          length: shipmentDetails.packageDetails.dimensions.length,
          width: shipmentDetails.packageDetails.dimensions.width,
          height: shipmentDetails.packageDetails.dimensions.height,
        },
        content: shipmentDetails.packageDetails.content,
      },
    };

    dispatch(addToCart(newProduct)); // Dispatch the addToCart action
    onOpenDrawer(); // Open the drawer after adding the shipment
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bottom-0 border-t w-full right-0 z-10 bg-white rounded shadow-xl md:h-20 lg:h-20 md:static md:mx-auto md:bg-white lg:sticky lg:bottom-0 lg:right-auto lg:p-0">
      <div className="flex flex-col sm:flex-row justify-center items-center p-4 gap-4">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          minDate={new Date()}
          customInput={
            <button className="btn btn-outline flex items-center mb-4 sm:mb-0">
              <img
                src="/images/calendar.png"
                alt="Calendar"
                className="w-4 h-4 mr-2"
              />
              {formatDate(startDate)}
            </button>
          }
        />
        <button
          className="btn btn-primary w-auto"
          onClick={handleAddToShipmentList}
        >
          Lägg i sändningslistan
        </button>
      </div>
    </div>
  );
};

export default Datepicker;
