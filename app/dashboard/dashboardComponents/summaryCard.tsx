import React from "react";

const SummaryCard = () => {
  return (
    <div className="card w-72 bg-white mx-auto items-center h-80 flex flex-col justify-between">
      <div className="card-body">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="card-title font-normal">Sammanfattning</h2>
        </div>
        <div className="flex items-center mb-4">
          <div>
            <div className="font-medium">Kolli</div>
            <div className="text-gray-600">{}</div>
          </div>
        </div>
      </div>
      <div className=" border-t pt-2 w-full flex-row flex justify-around pb-2">
        <div className="text-center">
          <div className="font-bold">10</div>
        </div>
        <div className="text-center">
          <div className="font-bold">10</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;