"use client";

import ContactList from "@/app/dashboard/dashboardComponents/ContactList";
import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import React from "react";



const ContactsPage = () => {
  return (
    <div className="bg-white h-screen">
      <DashboardNavBar />
      <div className="mt-20 flex justify-center">
        <ContactList />
      </div>
    </div>
  );
};

export default ContactsPage;
