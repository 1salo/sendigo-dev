"use client";

import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

const SectionThree: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items: AccordionItem[] = [
    {
      title: "Vad kostar det att boka frakt med Sendigo?",
      content:
        "Med Sendigo bokar företag med upp till 85 % rabatterade fraktpriser både inom Sverige och utrikes. Alla spårbara tillägg ingår i fraktpriset du ser när du bokar, så att du slipper otrevliga överraskningar på fakturan.",
    },
    {
      title: "Vilka transportörer kan jag frakta med i Sendigo?",
      content:
        "I Sendigo kan du boka billig frakt med DHL, TNT, FedEx, UPS och DSV – i ett och samma bokningssystem! Du får direkt tillgång billiga fraktpriser och behöver inte lägga tid på att förhandla fraktavtal.",
    },
    {
      title: "Vem kan frakta med Sendigo?",
      content:
        "Sendigo är till för företag som vill frakta billigt och smart. Kom ihåg att mottagaren kan vara både privatperson och företag, men att du inte kan frakta med Sendigo som privatperson.",
    },
  ];

  return (
    <div className="bg-white h-72 flex justify-center items-center">
      <div className="w-full max-w-md mx-auto">
        <h1>Vanliga frågor</h1>
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleItem(index)}
              className="flex justify-between w-full p-4 focus:outline-none"
            >
              <span className="font-medium">{item.title}</span>
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionThree;
