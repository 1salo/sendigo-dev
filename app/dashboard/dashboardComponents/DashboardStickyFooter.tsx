import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  buttonLabel: string;
  onSubmit: () => void;
  animationTrigger: () => void;
}

const DashboardStickyFooter = ({
  buttonLabel,
  onSubmit,
  animationTrigger,
}: Props) => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) setStartDate(date);
  };

  const handleSubmit = () => {
    animationTrigger(); // Trigga animationen
    onSubmit(); // Skicka formuläret
  };

  return (
    <div className="bottom-0 border-t w-full right-0 z-50 bg-white rounded shadow-xl md:h-20 lg:h-20 md:static md:mx-auto md:bg-white lg:sticky lg:bottom-0 lg:right-auto lg:p-0">
      <div className="flex flex-col sm:flex-row justify-center items-center p-4">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
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
        <button onClick={handleSubmit} className="btn btn-primary w-auto">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default DashboardStickyFooter;
