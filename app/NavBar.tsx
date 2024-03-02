"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/" className="mr-5">
        SENDIGO
      </Link>
      <Link href="/safunkardet">SÅ FUNKAR DET</Link>
      <Link href="/priceplan">PRISPLANER</Link>
      <Link href="/help">HJÄLP</Link>
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout" className="ml-3">
            Logga ut
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">LOGGA IN</Link>
      )}
    </div>
  );
};

export default NavBar;
