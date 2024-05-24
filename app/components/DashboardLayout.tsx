import React from "react";
import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardNavBar />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
