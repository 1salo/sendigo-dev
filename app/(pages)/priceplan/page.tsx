"use client";

import Priceplan from "@/app/components/Priceplan";
import Accordion from "@/app/components/ui/Accordion";
import Footer from "@/app/Footer";
import NavBar from "@/app/NavBar";
import React, { useState } from "react";

const faqs = [
  {
    question: "Hur kommer jag igång med Sendigo Free?",
    answer:
      "För att komma igång med Sendigo Free registrerar du ditt företag kostnadsfritt i våran tjänst genom att klicka här. Därefter jag du söka, jämföra och boka frakt direkt.",
  },
  {
    question: "Hur aktiverar jag Sendigo Plus?",
    answer:
      "Du kan aktivera Sendigo Plus direkt genom att logga in på ditt konto i Sendigo. Dina nya fraktpriser aktiveras direkt och du bokar frakt precis som vanligt. Logga in på ditt konto i Sendigo. Gå till inställningar och klicka på Sendigo Plus. Betala Sendigo Plus med kort och aktivera direkt! Aktivera Sendigo Plus",
  },
  {
    question: "Hur kommer jag igång med Sendigo Pro?",
    answer:
      "Eftersom Sendigo Pro är en skräddarsydd plan börjar du med att kontakta oss genom att maila oss här. Sedan kommer vi tillsammans att gå genom dina fraktflöden och hitta de bästa priserna och lösningarna för just ditt företag.",
  },
];

const PricePlanPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="flex flex-col sendigo-sec-color min-h-screen">
      <NavBar />
      <div className="w-full">
        {/* The price plan section should maintain its background and max-width */}
        <div className="mx-auto px-4 md:px-6 lg:px-8 my-32 lg:my-32">
          <h1 className=" text-6xl font-normal mb-8 mt-8 text-center">
            Prisplaner för alla typer av fraktbehov
          </h1>
          <div className="flex flex-wrap justify-center items-stretch mx-4 md:mx-0 gap-4">
            <Priceplan />
          </div>
        </div>
        {/* Full-width white background for the FAQ section */}
        <div className="bg-white">
          {/* Content centered and constrained within max-width */}
          <div className="mx-9 pt-10 pb-40">
            <h1 className="text-5xl font-normal pt-10">Vanliga frågor</h1>
            {faqs.map((item, index) => (
              <Accordion
                key={index}
                title={item.question}
                content={item.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricePlanPage;
