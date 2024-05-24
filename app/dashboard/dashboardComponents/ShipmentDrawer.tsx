import React from "react";
import { ShipmentDetails } from "@/types";
import { IoClose, IoTrash, IoSend } from "react-icons/io5";
import Flag from "react-world-flags";
import { COUNTRIES } from "@/app/_lib/countries";

interface ShipmentDrawerProps {
  shipmentData: ShipmentDetails | null;
  onClose: () => void;
  isOpen: boolean;
  selectedDate: Date;
}

const ShipmentDrawer: React.FC<ShipmentDrawerProps> = ({
  shipmentData,
  onClose,
  isOpen,
  selectedDate,
}) => {
  const getCountryCode = (countryNameOrCode: string) => {
    const country = COUNTRIES.find(
      (c) => c.engTitle === countryNameOrCode || c.value === countryNameOrCode
    );
    return country ? country.value : "";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const calculateVolume = (dimensions: {
    length: number;
    width: number;
    height: number;
  }) => {
    const { length, width, height } = dimensions;
    if (length && width && height) {
      const volumeCm3 = length * width * height; // Volume in cubic cm
      const volumeM3 = volumeCm3 / 1000000; // Convert to cubic meters
      const decimalPlaces = volumeM3 > 0.9 ? 1 : 2;
      const roundedVolume =
        Math.round(volumeM3 * Math.pow(10, decimalPlaces)) /
        Math.pow(10, decimalPlaces);
      return `${roundedVolume.toFixed(decimalPlaces)} m³`;
    }
    return "0 m³";
  };

  if (!shipmentData) {
    return null;
  }

  return (
    <>
      <div
        className={`shipment-drawer ${
          isOpen ? "open" : ""
        } fixed right-0 top-0 bg-white shadow-lg z-50`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl">Sändningslista</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-4 flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">{shipmentData.count} kolli</p>
            {shipmentData.packageDetails.dimensions && (
              <p className="text-sm text-gray-600">
                {shipmentData.packageDetails.weight} kg,{" "}
                {calculateVolume(shipmentData.packageDetails.dimensions)}
              </p>
            )}
          </div>
          <p className="text-sm text-gray-600">{formatDate(selectedDate)}</p>
        </div>

        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Avsändare</h3>
          <div className="text-sm mt-2">
            <p className="text-base font-normal">
              {shipmentData.sender.companyName}
            </p>
            <p className="text-base font-light">
              {shipmentData.sender.address}, {shipmentData.sender.postcode}{" "}
              {shipmentData.sender.city}
            </p>
            <div className="flex items-center mt-2">
              <Flag
                code={getCountryCode(shipmentData.sender.country)}
                className="inline-block w-6 h-4 mr-2"
              />
              <p className="text-xs text-gray-500">
                {shipmentData.sender.contactName}, {shipmentData.sender.email},{" "}
                {shipmentData.sender.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Mottagare</h3>
          <div className="text-sm mt-2">
            <p className="text-base font-normal">
              {shipmentData.receiver.companyName}
            </p>
            <p className="text-base font-light">
              {shipmentData.receiver.address}, {shipmentData.receiver.postcode}{" "}
              {shipmentData.receiver.city}
            </p>
            <div className="flex items-center mt-2">
              <Flag
                code={getCountryCode(shipmentData.receiver.country)}
                className="inline-block w-6 h-4 mr-2"
              />
              <p className="text-xs text-gray-500">
                {shipmentData.receiver.contactName},{" "}
                {shipmentData.receiver.email}, {shipmentData.receiver.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center">
            <button className="btn btn-outline">
              <IoSend size={20} className="mr-2" />
              Skicka till utkast
            </button>
            <button className="btn text-red-500 bg-white border-red-500 hover:bg-red-200">
              <IoTrash size={20} className="mr-2" />
              Ta bort
            </button>
          </div>
        </div>

        <div className="border-t mt-4 pt-4 p-4">
          <div className="flex flex-row mb-4">
            <p className="text-sm">Totalt:</p>
            <p className="text-sm text-right">{shipmentData.count} kolli</p>
          </div>
          <button className="btn btn-primary w-full mt-2">Beräkna pris</button>
        </div>
      </div>

      {isOpen && (
        <div
          className="shipment-overlay fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default ShipmentDrawer;
