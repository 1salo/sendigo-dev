import NavBar from "@/app/NavBar";
import React from "react";

const SaFunkarDetPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex justify-center items-center px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <h1>Så funkar det</h1>
        </div>
      </div>
    </div>
  );
};

export default SaFunkarDetPage;
