"use client";

import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import MyProfile from "@/app/dashboard/dashboardComponents/MyProfile";
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <DashboardNavBar />
      <h1 className="mb-4 font-medium">
        Mina sidor {session?.user.companyName}
      </h1>
      <MyProfile />
    </div>
  );
};

export default ProfilePage;
