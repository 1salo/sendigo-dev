import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoCart } from "react-icons/io5";
import Drawer from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { clearCart } from "@/app/store/cartSlice";

const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  await signOut({ redirect: false });
  window.location.href = "/";
};

const DashboardNavBar = () => {
  const { data: session } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(
    "/images/default-profilepic.jpeg"
  );

  useEffect(() => {
    if (session?.user?.image) {
      const userImage = session.user.image;
      if (userImage.startsWith("http://") || userImage.startsWith("https://")) {
        setUserProfileImage(userImage);
      }
    }
  }, [session]);

  useEffect(() => {
    document.body.style.paddingTop = "4rem";
    return () => {
      document.body.style.paddingTop = "";
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCartEmpty = () => {
    dispatch(clearCart());
  };

  if (!isMounted) {
    return null; // or a loading indicator
  }

  return (
    <div className="navbar divide-x-2 shadow-sm h-16 z-50 bg-white fixed top-0 left-0 w-full">
      <div className="flex-1 flex items-center">
        <Link href="/dashboard" className="flex items-center ml-5">
          <Image
            src="/images/sendigologo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
        <ul className="menu menu-horizontal ml-5">
          <li>
            <Link href="/dashboard" className="p-2">
              Beräkna pris
            </Link>
          </li>
          <li>
            <Link href="/newshipment" className="p-2 ml-2">
              Ny sändning
            </Link>
          </li>
          <li>
            <Link href="/orders" className="p-2 ml-2">
              Sändningar
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost" onClick={toggleDrawer}>
            <div className="indicator">
              <IoCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="badge badge-sm indicator-item">
                  {cart.length}
                </span>
              )}
            </div>
          </label>
        </div>
        <Link
          href="/contacts"
          className="btn btn-ghost flex items-center justify-center text-2xl mr-2"
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
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default DashboardNavBar;
