import React from "react";

const DashboardShippingZipForm = () => {
  return (
    <div className="card max-w-lg bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="card-title">Prisförfrågan</h2>
          <button className="btn text-red-500 bg-white border-red-500 hover:bg-red-200">
            Rensa
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col mb-4 md:mb-0">
            <span className="label-text">Från</span>
            <input
              type="text"
              placeholder="Land"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col">
            <span className="label-text">Postnummer</span>
            <input
              type="text"
              placeholder="Postnummer"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col mb-4 md:mb-0">
            <span className="label-text">Till</span>
            <input
              type="text"
              placeholder="Land"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col">
            <span className="label-text">Postnummer</span>
            <input
              type="text"
              placeholder="Postnummer"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        {/* //Radio buttons */}
        <div className="form-control">
          <span className="text-sm font-semibold mb-4 mt-4">
            Typ av mottagare
          </span>
          <label className="flex items-center mb-4">
            <input
              type="radio"
              name="recipientType"
              className="radio checked:bg-black"
              value="foretag"
              // Checked state should be dynamically set based on state or form library
            />
            <span className="text-sm ml-2">Företag</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="recipientType"
              className="radio checked:bg-black"
              value="privatperson"
              // Checked state should be dynamically set based on state or form library
            />
            <span className="text-sm ml-2">Privatperson</span>
          </label>
        </div>

        <div className="card-actions justify-end mt-4"></div>
      </div>
    </div>
  );
};

export default DashboardShippingZipForm;
