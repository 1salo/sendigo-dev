"use client";
import React, { useState, useRef, useEffect } from "react";
import DashboardDrawer from "./dashboardComponents/DashboardDrawer";
import DashboardNavBar from "./dashboardComponents/DashboardNavBar";
import DashboardShippingPackageForm from "./dashboardComponents/DashboardShippingPackageForm";
import DashboardShippingZipForm from "./dashboardComponents/DashboardShippingZipForm";
import DashboardStickyFooter from "./dashboardComponents/DashboardStickyFooter";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardNavBar />
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
              <DashboardStickyFooter />
              <div className="my-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
