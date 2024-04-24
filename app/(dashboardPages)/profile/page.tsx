"use client";

import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavBar />
      <div className="flex-grow flex justify-center items-center px-4 md:px-6 lg:px-8">
        <h1>Mina sidor {session?.user.companyName}</h1>
        <div className="w-full max-w-4xl">Add content here</div>
      </div>
    </div>
  );
};

export default ProfilePage;
