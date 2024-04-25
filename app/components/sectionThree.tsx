"use client";

import React, { useState } from "react";
import Accordion from "./ui/Accordion";

const faqs = [
  {
    question: "Vad kostar det att boka frakt med Sendigo?",
    answer:
      "Sendigo erbjuder företag möjligheten att boka frakt med rabatter upp till 85 %, såväl inrikes som till och från utlandet. Det pris du ser vid bokning inkluderar alla spårbara tillägg, vilket säkerställer att det inte dyker upp några oväntade kostnader på er faktura.",
  },
  {
    question: "Vilka transportörer kan jag frakta med i Sendigo?",
    answer:
      "Sendigo ger dig tillgång till ett enkelt bokningssystem där du kan arrangera prisvärda transporter med välkända fraktbolag som DHL, TNT, FedEx, UPS och DSV. Njut av direkt tillgång till förmånliga fraktpriser utan tidskrävande förhandlingar om fraktavtal.",
  },
  {
    question: "Vem kan frakta med Sendigo?",
    answer:
      "Sendigo är utformat för företag som önskar en kostnadseffektiv och smart fraktlösning. Tänk på att även om både privatpersoner och företag kan vara mottagare, kan endast företag använda Sendigos tjänster för att skicka paket. Privatpersoner kan inte frakta genom Sendigo.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <h1 className="text-6xl font-normal my-8 mx-8">Vanliga frågor</h1>
      <div className="flex flex-col gap-10 mx-9 pt-10 pb-40">
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
