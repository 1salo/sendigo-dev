"use client";

import SubscriptionCard from "@/app/components/SubscriptionCard";
import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import EditPassword from "@/app/dashboard/dashboardComponents/EditPassword";
import MyProfileCompany from "@/app/dashboard/dashboardComponents/MyProfileCompany";
import MyProfileUser from "@/app/dashboard/dashboardComponents/MyProfileUser";
import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>("Free");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<"user" | "plans">("user");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    fetchSubscriptionPlan();
    // Show tooltip initially and hide it after 20 seconds
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const fetchSubscriptionPlan = async () => {
    try {
      const response = await fetch("/api/user/subscription");
      if (response.ok) {
        const data = await response.json();
        setSubscriptionPlan(data.plan);
      }
    } catch (error) {
      console.error("Error fetching subscription plan:", error);
    }
  };

  const handleUpgrade = async (planId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });
      if (response.ok) {
        fetchSubscriptionPlan();
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white">
      <h1 className="mt-5 ml-5 font-medium text-3xl">Mina sidor</h1>
      <DashboardNavBar />
      <div className="flex justify-center pb-4 mr-10 relative">
        <button
          className={`px-4 py-2 mx-2 ${
            view === "user"
              ? "border-b-2 border-black hover:bg-gray-100"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => setView("user")}
        >
          Användare
        </button>
        <div className="relative">
          {showTooltip && (
            <div
              className="tooltip tooltip-open tooltip-top absolute left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 animate-bounce"
              data-tip="Här kan du uppgradera och hitta din nuvarande prisplan"
              style={{ marginLeft: "-6rem" }}
            ></div>
          )}
          <button
            className={`px-4 py-2 mx-2 ${
              view === "plans"
                ? "border-b-2 border-black hover:bg-gray-100"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setView("plans")}
          >
            Prisplaner
          </button>
        </div>
      </div>

      {view === "user" ? (
        <div className="flex px-10">
          <div className="flex flex-col w-1/2 border-r border-gray-300">
            <MyProfileUser />
            <div className="mt-8">
              <EditPassword />
            </div>
          </div>
          <div className="flex flex-col w-1/2 ml-4 pl-6">
            <MyProfileCompany />
          </div>
        </div>
      ) : (
        <div className="flex justify-center px-10">
          <div className="flex flex-col w-3/4">
            <SubscriptionCard
              currentPlan={subscriptionPlan}
              onUpgrade={handleUpgrade}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
