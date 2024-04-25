import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const SectionOne: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center sendigo-main-color relative">
      <div className="absolute inset-0 z-10 flex justify-start items-center px-8 md:px-12 lg:px-16">
        <div className="bg-white p-8 shadow-xl">
          <h1 className="text-7xl font-medium">Vart vill du skicka?</h1>
          <h2>Hitta den billigaste eller snabbaste frakten nu</h2>
          <Link
            href="/sign-up"
            className="btn btn-primary mt-4 transition-transform duration-300 hover:scale-105"
          >
            <span>Kom igång</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="ml-8 md:ml-12 lg:ml-16">
          <Image
            src="/images/falling-packages.png"
            alt="packagesfalling"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
