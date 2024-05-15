import Image from "next/image";
import React from "react";

const SectionTwo = () => {
  return (
    <div className="bg-white h-auto flex justify-center items-center flex-col">
      <div className="grid grid-cols-2 mt-40 justify-items-center">
        <div className="w-3/4 ml-10">
          <h1 className="text-5xl font-medium">
            Skicka paket, pall och container
          </h1>
          <p className="text-2xl text-gray-600 mt-4">
            Skicka paket, pall och container enkelt, säkert och snabbt, både
            inrikes och utrikes. <br /> Vårt praktiska system låter dig boka
            frakt direkt online. Vi samarbetar med ledande globala
            transportföretag, vilket säkerställer effektiv och trygg frakt.
            Upptäck bekvämligheten med Sendigo – Vart vill du skicka?
          </p>
        </div>
        <div className="w-full">
          <Image
            className="rounded-t-full shadow-2xl"
            src="/images/truckfrakt.gif"
            alt="diliverytruck"
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-72 justify-items-center">
        <div className="w-full">
          <Image
            className="rounded-ss-full shadow-2xl ml-10"
            src="/images/truckfrakt4.gif"
            alt="diliverytruck"
            width={600}
            height={600}
          />
        </div>
        <div className="w-full">
          <h1 className="text-5xl font-medium">Frakta billigt och snabbt</h1>
          <p className="text-2xl text-gray-600 mt-4">
            Med vår samlade köpkraft från flera företag sänker <br /> vi dina
            fraktkostnader. <br /> Upplev fördelarna med en smart digital
            plattform, konkurrenskraftiga priser, personlig service och
            kostnadseffektiv frakt anpassad efter dina behov.
            <br />
            <br />
            Sendigo – När varje leverans räknas!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 my-72 justify-items-center">
        <div className="w-3/4 ml-10">
          <h1 className="text-5xl font-medium">Varför Sendigo?</h1>
          <p className="text-2xl text-gray-600 mt-4">
            Välj Sendigo för en frakttjänst med en familjär känsla, grundat i
            Småland av far och son. <br />
            Vi strävar efter att göra frakt krångelfritt, snabbt och enkelt. Med
            Sendigo får du kostnadseffektiva lösningar, möjlighet att jämföra
            priser och undvika onödigt krångel. Vi är här för att förenkla och
            förbättra ditt sätt att hantera frakt.
            <br />
            Sendigo – framtiden för effektiv frakt!
          </p>
        </div>
        <div className="w-full">
          <Image
            className="rounded-b-full shadow-2xl mt-12"
            src="/images/truckfrakt3.gif"
            alt="diliverytruck"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
