"use client";

import React, { useState, useEffect } from "react";
import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import NewShipmentPackageForm from "@/app/dashboard/dashboardComponents/newshipmentPackageForm";
import ReceiverCard from "@/app/dashboard/dashboardComponents/receiverCard";
import SenderCard from "@/app/dashboard/dashboardComponents/senderCard";
import SummaryCard from "@/app/dashboard/dashboardComponents/summaryCard";
import Timeline from "@/app/dashboard/dashboardComponents/Timeline";
import Datepicker from "@/app/dashboard/dashboardComponents/Datepicker";
import Drawer from "@/app/dashboard/dashboardComponents/Drawer";
import { PackageDetails, Product } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateShipmentDetails } from "@/app/store/shipmentDetailsSlice";
import { useCart } from "@/app/context/CartContext";

const NewShipmentPage = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const shipmentDetails = useSelector(
    (state: RootState) => state.shipmentDetails
  );
  const { addToCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const packageTop = document
        .getElementById("package-form")
        ?.getBoundingClientRect().top;
      const senderTop = document
        .getElementById("sender-card")
        ?.getBoundingClientRect().top;
      const receiverTop = document
        .getElementById("receiver-card")
        ?.getBoundingClientRect().top;

      if (receiverTop && receiverTop <= 150) setActiveStep(3);
      else if (senderTop && senderTop <= 180) setActiveStep(2);
      else if (packageTop && packageTop <= 180) setActiveStep(1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    const newProduct: Product = {
      id: `${shipmentDetails.sender.postcode}-${
        shipmentDetails.receiver.postcode
      }-${Date.now()}`,
      name: "Shipment",
      price: 0,
      quantity: 1,
      date: shipmentDetails.date || "",
      sender: shipmentDetails.sender,
      receiver: shipmentDetails.receiver,
      packageDetails: shipmentDetails.packageDetails as PackageDetails,
    };

    addToCart(newProduct);
    setFormSubmitted(true);
  };

  const handleCartEmpty = () => {
    setFormSubmitted(false);
  };

  return (
    <div className="relative flex flex-col sendigo-gray-color">
      <DashboardNavBar />
      <div className="flex-grow flex lg:flex-row px-4 py-4 lg:px-8 lg:py-6">
        <div className="hidden lg:block lg:w-1/4 lg:fixed lg:left-0 lg:top-20 lg:h-full z-10">
          <Timeline activeStep={activeStep} />
        </div>
        <div className="flex flex-col lg:ml-[25%] lg:w-2/3 items-center gap-4">
          <div id="package-form">
            <NewShipmentPackageForm />
          </div>
          <div id="sender-card">
            <SenderCard
              formSubmitted={formSubmitted}
              setSenderComplete={(complete) => {
                if (!complete) setFormSubmitted(false);
              }}
            />
          </div>
          <div id="receiver-card">
            <ReceiverCard
              formSubmitted={formSubmitted}
              setReceiverComplete={(complete) => {
                if (!complete) setFormSubmitted(false);
              }}
            />
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/4 lg:ml-auto lg:mr-14">
          <div className="sticky top-28 overflow-y-auto max-h-screen">
            <SummaryCard details={shipmentDetails} />
          </div>
        </div>
      </div>
      <Datepicker
        onDateChange={(date) =>
          dispatch(updateShipmentDetails({ date: date.toISOString() }))
        }
        onOpenDrawer={handleAddToCart}
      />
      <Drawer isOpen={formSubmitted} onClose={() => setFormSubmitted(false)} />
    </div>
  );
};

export default NewShipmentPage;
