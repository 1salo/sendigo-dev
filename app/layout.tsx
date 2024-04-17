import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import Footer from "./Footer";

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
        className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}
      >
        <AuthProvider>
          <NavBar />
          <main className="flex flex-col flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
