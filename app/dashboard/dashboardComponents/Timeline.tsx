import React from "react";

interface TimelineProps {
  activeStep: number;
}

const Timeline: React.FC<TimelineProps> = ({ activeStep }) => {
  const steps = [
    { id: 1, label: "Kolli", ref: "package-form" },
    { id: 2, label: "Avsändare", ref: "sender-card" },
    { id: 3, label: "Mottagare", ref: "receiver-card" },
  ];

  const scrollToComponent = (refId: string) => {
    const element = document.getElementById(refId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ul className="timeline timeline-vertical absolute left-0 top-20 ">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="mb-4 cursor-pointer"
          onClick={() => scrollToComponent(step.ref)}
        >
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${
                activeStep === step.id ? "text-black" : "text-gray-300"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end">{step.label}</div>
          {index < steps.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
