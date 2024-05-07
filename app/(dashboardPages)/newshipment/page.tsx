"use client";

import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import DashboardStickyFooter from "@/app/dashboard/dashboardComponents/DashboardStickyFooter";
import NewShipmentPackageForm from "@/app/dashboard/dashboardComponents/newshipmentPackageForm";
import ReceiverCard from "@/app/dashboard/dashboardComponents/receiverCard";
import SenderCard from "@/app/dashboard/dashboardComponents/senderCard";
import SummaryCard from "@/app/dashboard/dashboardComponents/summaryCard";
import Timeline from "@/app/dashboard/dashboardComponents/Timeline";
import { useState, useEffect } from "react";
import { ShipmentDetails } from "@/types";

const NewShipmentPage = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [shipmentDetails, setShipmentDetails] = useState({
    packageType: "",
    dimensions: { weight: "", length: "", width: "", height: "" },
    description: "",
    count: 0,
  });

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

  const handleUpdateShipmentDetails = (details: ShipmentDetails) => {
    setShipmentDetails((prev) => ({ ...prev, ...details }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavBar />

      <div className="flex-grow flex lg:flex-row px-4 py-4 lg:px-8 lg:py-6">
        {/* Timeline fixed on the left side of the page */}
        <div className="hidden lg:block lg:w-1/4 lg:fixed lg:left-0 lg:top-20 lg:h-full z-10">
          <Timeline activeStep={activeStep} />
        </div>

        {/* Main content section, centered with appropriate margins */}
        <div className="flex flex-col lg:ml-[25%] lg:w-2/3 items-center gap-4">
          <div id="package-form">
            <NewShipmentPackageForm
              details={shipmentDetails}
              updateShipmentDetails={handleUpdateShipmentDetails}
            />
          </div>
          <div id="sender-card">
            <SenderCard />
          </div>
          <div id="receiver-card">
            <ReceiverCard />
          </div>
        </div>

        {/* Summary card on the right */}
        <div className="hidden lg:flex lg:w-1/4 lg:ml-auto">
          <div className="sticky top-28 overflow-y-auto max-h-screen">
            <SummaryCard details={shipmentDetails} />
          </div>
        </div>
      </div>

      <DashboardStickyFooter buttonLabel="Lägg i sändningslistan" />
    </div>
  );
};

export default NewShipmentPage;
