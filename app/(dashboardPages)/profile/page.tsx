"use client";

import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import EditPassword from "@/app/dashboard/dashboardComponents/EditPassword";
import MyProfileCompany from "@/app/dashboard/dashboardComponents/MyProfileCompany";
import MyProfileUser from "@/app/dashboard/dashboardComponents/MyProfileUser";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="h-screen bg-white">
      <DashboardNavBar />
      <div className="flex px-10">
        <div className="flex flex-col w-1/2 border-r border-gray-300">
          <MyProfileUser />
          <div className="mt-8">
            <EditPassword />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-1/2 ml-4 pl-6">
            <MyProfileCompany />
          </div>
          <div className="mr-10">
            <Image
              src="/images/diliverytruck.gif"
              alt={"Shipping"}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
