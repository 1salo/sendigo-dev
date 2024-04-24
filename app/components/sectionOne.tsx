import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const SectionOne: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center sendigo-main-color">
      <div className="flex justify-center items-center">
        <div className="mr-4">
          <h1 className="text-7xl font-medium">Vart vill du skicka?</h1>
          <h2>Hitta den billigaste eller snabbaste frakten nu</h2>
          <Link
            href="/sign-up"
            className="btn btn-primary mt-4 transition-transform duration-300 hover:scale-105"
          >
            <span>Kom igång</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="ml-8 md:ml-12 lg:ml-16">
          <Image src="/images/test.jpg" alt="lol" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
