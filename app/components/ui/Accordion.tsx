import React, { FunctionComponent, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi";

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
  const [isRotating, setIsRotating] = useState(false);
  const [closeIconRotating, setCloseIconRotating] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      setIsRotating(true);
      setTimeout(() => {
        onClick(); // Change the state to open after rotation completes
        setIsRotating(false); // Reset rotation state after it completes
      }, 700); // This matches the duration of the rotation
    } else {
      // Start rotation for closing
      setCloseIconRotating(true);
      setTimeout(() => {
        onClick(); // Close the accordion after the rotation
        setCloseIconRotating(false); // Reset rotation state
      }, 700); // Rotation duration for closing
    }
  };

  return (
    <div className="border-b border-black w-full">
      <button
        className="flex justify-between items-center w-full py-8 px-6 focus:outline-none"
        onClick={handleToggle}
      >
        <span className="font-medium text-2xl">{title}</span>
        {isOpen ? (
          <IoCloseOutline
            className={`text-2xl transition-transform duration-1000 ease-in-out ${
              closeIconRotating ? "rotate-[-45deg]" : ""
            }`}
          />
        ) : (
          <HiOutlinePlus
            className={`text-2xl transition-transform duration-1000 ease-in-out ${
              isRotating ? "rotate-45" : ""
            }`}
          />
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
