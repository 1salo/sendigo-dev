"use client";

import { usePathname } from "next/navigation";
import MainLayout from "../layouts/MainLayout/MainLayout";
import DashboardLayout from "./DashboardLayout";
import { ReactNode } from "react";

const LayoutSwitcher = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const Layout = isDashboard ? DashboardLayout : MainLayout;

  return <Layout>{children}</Layout>;
};

export default LayoutSwitcher;
