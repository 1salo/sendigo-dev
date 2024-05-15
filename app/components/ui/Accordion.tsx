import React, { FunctionComponent, useState } from "react";
import { LuPackage } from "react-icons/lu";
import { LuPackageOpen } from "react-icons/lu";

interface AccordionProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const Accordion: FunctionComponent<AccordionProps> = ({
  title,
  content,
  isOpen,
  onClick,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleToggle = () => {
    setIsBouncing(true);
    setTimeout(() => {
      onClick(); 
      setIsBouncing(false); 
    }, 500); 
  };

  return (
    <div className="border-b border-black w-full">
      <button
        className="flex justify-between items-center w-full py-8 px-6 focus:outline-none"
        onClick={handleToggle}
      >
        <span className="font-medium text-2xl">{title}</span>
        {isOpen ? (
          <LuPackageOpen className={`text-2xl ${isBouncing ? "bounce" : ""}`} />
        ) : (
          <LuPackage className={`text-2xl ${isBouncing ? "bounce" : ""}`} />
        )}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-auto" : "max-h-0"
        } overflow-hidden`}
      >
        <div
          className={`transition-opacity duration-500 ease-linear ${
            isOpen ? "opacity-100" : "opacity-0"
          } px-6 py-8`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
