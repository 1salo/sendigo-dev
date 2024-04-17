"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { status, data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault(); // Prevent the default link behavior
    await signOut({ redirect: false }); // Sign out without automatic redirection
    window.location.href = "/"; // Manually redirect to homepage
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 p-5 flex items-center justify-between transition-all duration-200 ${
        isScrolled ? "bg-white bg-opacity-80 backdrop-blur" : "bg-transparent"
      }`}
    >
      <Link href="/" className="mr-5">
        <img
          src="/images/sendigologo.png"
          alt="Logo"
          style={{ width: "120px", height: "auto" }}
        />
      </Link>
      <div className="flex justify-evenly space-x-20">
        <Link href="/safunkardet">Så funkar det</Link>
        <Link href="/priceplan">Prisplaner</Link>
        <Link href="/help">Hjälp</Link>
      </div>
      <div className="flex items-center space-x-4">
        {status === "unauthenticated" ? (
          <>
            <Link href="/sign-up" className="btn btn-primary rounded-full">
              Kom igång
            </Link>
            <Link href="/sign-in" className="btn btn-outline rounded-full">
              Logga in
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <span>{session?.user?.email || null}</span>
            <button
              onClick={handleSignOut}
              className="btn btn-outline rounded-full"
            >
              Logga ut
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
