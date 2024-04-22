import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const SectionOne: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center sendigo-main-color">
      <h1 className="text-4xl">Vart vill du skicka?</h1>
      <h2>Hitta den billigaste och snabbaste frakten nu</h2>
      <Link href="/api/auth/signin" className="btn btn-primary">
        <span>Kom igång</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </div>
  );
};

export default SectionOne;
