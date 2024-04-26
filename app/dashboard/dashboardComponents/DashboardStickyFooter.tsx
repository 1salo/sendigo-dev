import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

interface Props {
  buttonLabel: string;
}

const DashboardStickyFooter = ({ buttonLabel }: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isWindowScrolled = window.scrollY > 0;
      setIsScrolled(isWindowScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bottom-0 border-t w-full right-0 z-50 bg-white rounded shadow-xl md:h-20 lg:h-20 md:static md:mx-auto md:bg-white lg:sticky lg:bottom-0 lg:right-auto lg:p-0">
      <div className="flex flex-col sm:flex-row justify-center items-center p-4">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 mb-4 sm:mb-0">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              if (date) {
                setStartDate(date);
              }
            }}
            minDate={new Date()}
            customInput={
              <button className="btn btn-outline flex items-center mb-4 sm:mb-0">
                <img
                  src="/images/calendar.png"
                  alt="Calendar"
                  className="w-4 h-4 mr-2"
                />
                {formatDate(startDate)}
              </button>
            }
          />
          <div>
            <Link
              href="/newshipment/compare"
              className="btn btn-primary w-auto"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStickyFooter;
