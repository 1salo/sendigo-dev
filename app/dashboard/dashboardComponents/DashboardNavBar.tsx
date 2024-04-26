import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/components/ui/Logo";
import Image from "next/image";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TbTrolley } from "react-icons/tb";

const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  await signOut({ redirect: false });
  window.location.href = "/";
};

const DashboardNavBar = () => {
  useEffect(() => {
    document.body.style.paddingTop = "4rem";
    return () => {
      document.body.style.paddingTop = "";
    };
  }, []);

  const currentPath = usePathname();
  const { data: session } = useSession();
  const userProfileImage =
    session?.user?.image &&
    (session.user.image.startsWith("http://") ||
      session.user.image.startsWith("https://"))
      ? session.user.image
      : "/images/default-profilepic.jpeg";

  return (
    <div className="navbar divide-x-2 border-b-2 h-16 z-50 bg-white fixed top-0 left-0 w-full">
      <div className="flex-1 flex items-center">
        <Link href="/dashboard" className="flex items-center ml-5">
          <Logo />
        </Link>
        <ul className="menu menu-horizontal ml-5">
          <li>
            <Link
              href="/dashboard"
              className={
                currentPath === "/dashboard"
                  ? "border-b-2 border-black p-2"
                  : "p-2"
              }
            >
              Beräkna pris
            </Link>
          </li>
          <li>
            <Link
              href="/newshipment"
              className={
                currentPath === "/newshipment"
                  ? "border-b-2 border-black p-2 ml-2"
                  : "p-2 ml-2"
              }
            >
              Ny sändning
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className={
                currentPath === "/orders"
                  ? "border-b-2 border-black p-2 ml-2"
                  : "p-2 ml-2"
              }
            >
              Sändningar
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <div className="indicator">
              <TbTrolley className="h-5 w-5 rotate-hover" />
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <button className="btn btn-primary btn-block">
                Visa kundkorg
              </button>
            </div>
          </div>
        </div>
        <Link
          href="/contacts"
          className={
            currentPath === "/contacts"
              ? "border-b-black border-b-2 btn btn-ghost flex items-center justify-center text-2xl mr-2"
              : "btn btn-ghost flex items-center justify-center text-2xl mr-2"
          }
          // className="btn btn-ghost flex items-center justify-center text-2xl mr-2"
        >
          <RiContactsBook3Fill className="shake" />
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={userProfileImage}
                alt="Profile Picture"
                width={50}
                height={50}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
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
    </div>
  );
};

export default DashboardNavBar;
