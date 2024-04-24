"use client";

import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavBar />
      <div className="flex-grow flex justify-center items-center px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <h1>Mina kontakter</h1>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
