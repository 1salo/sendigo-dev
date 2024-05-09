"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import InitialSetupForm from "../components/auth/InitialSetupForm";
import DashboardNavBar from "./dashboardComponents/DashboardNavBar";
import DashboardDrawer from "./dashboardComponents/DashboardDrawer";
import DashboardShippingPackageForm from "./dashboardComponents/DashboardShippingPackageForm";
import DashboardShippingZipForm from "./dashboardComponents/DashboardShippingZipForm";
import DashboardStickyFooter from "./dashboardComponents/DashboardStickyFooter";

const DashboardPage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
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

    if (session) {
      fetchUserData();
    }
  }, [session, router]);

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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!showSetupForm && <DashboardNavBar />}
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row p-4 md:p-8">
          <div className="w-full md:w-1/4 xl:w-1/5">
            <DashboardDrawer />
          </div>
          <div className="flex flex-col w-full md:w-3/4 xl:w-4/5">
            <div className="ml-auto mr-0 md:mr-4 lg:mr-8 xl:mr-16 max-w-4xl">
              <DashboardShippingZipForm />
              <div className="my-4"></div>
              <DashboardShippingPackageForm />
              <div className="my-4"></div>
              {!showSetupForm && (
                <DashboardStickyFooter buttonLabel="Beräkna pris" />
              )}
              <div className="my-4"></div>
            </div>
          </div>
        </div>
      </div>
      {showSetupForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center w-screen">
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
