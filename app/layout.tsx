import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import LayoutSwitcher from "./components/LayoutSwitcher";
import ClientProviders from "./components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sendigo",
  description: "Sendigo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-slate-50`}
      >
        <AuthProvider>
          <ClientProviders>
            <LayoutSwitcher>{children}</LayoutSwitcher>
          </ClientProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
