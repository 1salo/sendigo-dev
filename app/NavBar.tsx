"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { status, data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  const userProfileImage =
    session?.user?.image?.startsWith("http://") ||
    session?.user?.image?.startsWith("https://")
      ? session.user.image
      : "/images/default-profilepic.jpeg";

  return (
    <div
      className={`fixed navbar transition-all duration-200 z-50 ${
        isScrolled
          ? "bg-white bg-opacity-80 backdrop-blur h-24 z-50 shadow-sm"
          : "bg-transparent h-24 z-50"
      }`}
    >
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center ml-5">
          <Image
            src="/images/sendigologo.png"
            alt="Logo"
            width={100}
            height={50}
            className="mr-5"
          />
        </Link>
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/safunkardet">Så funkar det</Link>
          </li>
          <li>
            <Link href="/priceplan">Prisplaner</Link>
          </li>
          <li>
            <Link href="/help">Hjälp</Link>
          </li>
        </ul>
      </div>

      {status === "unauthenticated" ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/sign-up"
            className="btn btn-primary rounded-full transition-transform duration-300 hover:scale-105"
          >
            Kom igång
          </Link>
          <Link href="/sign-in" className="btn btn-outline rounded-full">
            Logga in
          </Link>
        </div>
      ) : (
        <div className="relative flex items-center space-x-4">
          <div>
            <p>{session?.user?.companyName}</p>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={userProfileImage}
                  alt="Profile Picture"
                  width={100}
                  height={50}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/profile">Mina sidor</Link>
              </li>
              <li>
                <Link href="/" onClick={handleSignOut}>
                  Logga ut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
