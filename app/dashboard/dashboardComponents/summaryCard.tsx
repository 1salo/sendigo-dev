import React from "react";
import Image from "next/image";
import { ShipmentDetails } from "@/types"; // Ensure this is correctly imported

interface SummaryCardProps {
  details: ShipmentDetails;
  updateShipmentDetails?: (details: ShipmentDetails) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  details,
  updateShipmentDetails,
}) => {
  const handleUpdateDetails = (updatedDetails: ShipmentDetails) => {
    if (updateShipmentDetails) {
      updateShipmentDetails(updatedDetails);
    }
  };

  const renderStackableStatus = () => {
    if (
      details.packageType === "Pall" ||
      details.packageType === "Ospecificerat"
    ) {
      return details.isStackable ? "Stapelbart" : "Inte stapelbart";
    }
    return "";
  };

  const renderPackageTypeImage = () => {
    switch (details.packageType) {
      case "Paket":
        return "/images/packageship.png";
      case "Pall":
        return "/images/palletship.png";
      case "Ospecificerat":
        return "/images/question.png";
      default:
        return "";
    }
  };

  const renderDimensions = () => {
    const { dimensions } = details;
    if (
      dimensions &&
      dimensions.length &&
      dimensions.width &&
      dimensions.height
    ) {
      return `${dimensions.length} x ${dimensions.width} x ${dimensions.height} cm, `;
    }
    return "";
  };

  const calculateVolume = () => {
    const { dimensions } = details;
    if (
      dimensions &&
      dimensions.length &&
      dimensions.width &&
      dimensions.height
    ) {
      const length = parseFloat(dimensions.length);
      const width = parseFloat(dimensions.width);
      const height = parseFloat(dimensions.height);
      if (!isNaN(length) && !isNaN(width) && !isNaN(height)) {
        const volumeCm3 = length * width * height; // Volume in cubic cm
        const volumeM3 = volumeCm3 / 1000000; // Convert to cubic meters
        const decimalPlaces = volumeM3 > 0.9 ? 1 : 2;
        const roundedVolume =
          Math.round(volumeM3 * Math.pow(10, decimalPlaces)) /
          Math.pow(10, decimalPlaces);
        return `${roundedVolume.toFixed(decimalPlaces)} m³`;
      }
    }
    return "m³";
  };

  return (
    <div className="card w-72 bg-white mx-auto items-center h-80 flex flex-col justify-between shadow-lg">
      <div className="card-body">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="card-title font-normal">Sammanfattning</h2>
        </div>
        <div className="flex mb-4">
          <Image
            src={renderPackageTypeImage()}
            alt="Package Type"
            width={100}
            height={100}
            className="mr-2 w-8 h-8"
          />
          <div>
            <div className="font-medium">Kolli</div>
            <div>{details.packageType}</div>
            <div className="text-gray-600 text-sm">
              {renderDimensions()}
              {details.dimensions?.weight
                ? `${details.dimensions.weight} kg`
                : ""}
              <div className="font-sm">{details.description}</div>
              <div>{renderStackableStatus()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t pt-2 w-full flex-row flex justify-around pb-2">
        <div className="text-center">
          <div className="font-sm">{details.count} Kolli</div>
        </div>
        <div className="text-center">
          <div className="font-sm">
            {details.dimensions?.weight
              ? `${details.dimensions.weight} kg`
              : "0 kg"}
          </div>
        </div>
        <div className="text-center">
          <div className="font-sm">{calculateVolume()}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
