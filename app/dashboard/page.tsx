"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import InitialSetupForm from "../components/auth/InitialSetupForm";
import DashboardNavBar from "./dashboardComponents/DashboardNavBar";
import DashboardShippingPackageForm from "./dashboardComponents/DashboardShippingPackageForm";
import DashboardShippingZipForm from "./dashboardComponents/DashboardShippingZipForm";
import DashboardStickyFooter from "./dashboardComponents/DashboardStickyFooter";
import styles from "../components/ui/animation.module.css";

interface ShippingData {
  fromZip: string;
  toZip: string;
  fromCountry: string;
  toCountry: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  stackable: boolean;
}

const DashboardPage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSetupForm, setShowSetupForm] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/initialSetup");
      if (response.ok) {
        const userData = await response.json();
        setShowSetupForm(!userData.hasCompletedInitialSetup);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInitialSetupSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await fetch("/api/initialSetup", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setIsLoading(false);
    if (response.ok) {
      setShowSetupForm(false);
    }
  };

  const [shippingData, setShippingData] = useState<ShippingData>({
    fromZip: "",
    toZip: "",
    fromCountry: "SE",
    toCountry: "SE",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    stackable: false,
  });

  const handleUpdateShippingData = (data: Partial<ShippingData>) => {
    setShippingData((prev) => ({ ...prev, ...data }));
  };

  const calculateShippingPrice = () => {
    setAnimate(true);
    setTimeout(() => {
      console.log("Shipping Data for Price Calculation:", shippingData);
      setAnimate(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {!showSetupForm && <DashboardNavBar />}
      <div
        className={`content-wrapper ${showSetupForm ? "blur-background" : ""}`}
      >
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row p-4 md:p-8">
            <div className="flex-grow">
              <DashboardShippingZipForm
                updateShippingData={handleUpdateShippingData}
                animationClass={animate ? styles.foldAndFly : ""}
              />
              <DashboardShippingPackageForm
                updateShippingData={handleUpdateShippingData}
                animationClass={animate ? styles.foldAndFly : ""}
              />
              {!showSetupForm && (
                <DashboardStickyFooter
                  buttonLabel="Beräkna pris"
                  onSubmit={calculateShippingPrice}
                  animationTrigger={() => setAnimate(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showSetupForm && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-30">
          <InitialSetupForm
            onSubmit={handleInitialSetupSubmit}
            isLoading={isLoading}
            onClose={() => setShowSetupForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
