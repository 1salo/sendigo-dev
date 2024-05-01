"use client";

import ContactList from "@/app/dashboard/dashboardComponents/ContactList";
import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import React from "react";

const ContactsPage = () => {
  return (
    <div className="bg-white h-screen">
      <DashboardNavBar />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
