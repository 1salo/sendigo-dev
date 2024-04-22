"use client";

import React, { useState } from "react";
import Accordion from "./ui/Accordion";

const faqs = [
  {
    question: "Vad kostar det att boka frakt med Sendigo?",
    answer:
      "Med Sendigo bokar företag med upp till 85 % rabatterade fraktpriser både inom Sverige och utrikes. Alla spårbara tillägg ingår i fraktpriset du ser när du bokar, så att du slipper otrevliga överraskningar på fakturan.",
  },
  {
    question: "Vilka transportörer kan jag frakta med i Sendigo?",
    answer:
      "I Sendigo kan du boka billig frakt med DHL, TNT, FedEx, UPS och DSV – i ett och samma bokningssystem! Du får direkt tillgång billiga fraktpriser och behöver inte lägga tid på att förhandla fraktavtal.",
  },
  {
    question: "Vem kan frakta med Sendigo?",
    answer:
      "Sendigo är till för företag som vill frakta billigt och smart. Kom ihåg att mottagaren kan vara både privatperson och företag, men att du inte kan frakta med Sendigo som privatperson.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-6xl font-normal mb-8">Vanliga frågor</h1>
      <div className="flex flex-col gap-8">
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
  );
};

export default Faq;
