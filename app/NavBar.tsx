import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex bg-slate-200 p-5">
      <Link href="/" className="mr-5">
        SENDIGO
      </Link>
      <Link href="/safunkardet">SÅ FUNKAR DET</Link>
      <Link href="/priceplan">PRISPLANER</Link>
      <Link href="/help">HJÄLP</Link>
    </div>
  );
};

export default NavBar;
