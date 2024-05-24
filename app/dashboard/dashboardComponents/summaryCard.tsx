import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShipmentDetails } from "@/types";

interface SummaryCardProps {
  details: ShipmentDetails;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ details }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderDimensions = () => {
    if (details.packageDetails && details.packageDetails.dimensions) {
      const { dimensions } = details.packageDetails;
      if (dimensions.length && dimensions.width && dimensions.height) {
        return `${dimensions.length} x ${dimensions.width} x ${dimensions.height} cm, `;
      }
    }
    return "";
  };

  const calculateVolume = () => {
    if (details.packageDetails && details.packageDetails.dimensions) {
      const { dimensions } = details.packageDetails;
      if (dimensions.length && dimensions.width && dimensions.height) {
        const length = dimensions.length;
        const width = dimensions.width;
        const height = dimensions.height;
        const volumeCm3 = length * width * height;
        const volumeM3 = volumeCm3 / 1000000;
        const decimalPlaces = volumeM3 > 0.9 ? 1 : 2;
        const roundedVolume =
          Math.round(volumeM3 * Math.pow(10, decimalPlaces)) /
          Math.pow(10, decimalPlaces);
        return `${roundedVolume.toFixed(decimalPlaces)} m³`;
      }
    }
    return "0 m³";
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
        return "/images/default.png";
    }
  };

  const renderStackableStatus = () => {
    if (
      details.packageType === "Pall" ||
      details.packageType === "Ospecificerat"
    ) {
      return details.packageDetails.isStackable
        ? "Stapelbart"
        : "Icke stapelbart";
    }
    return "";
  };

  return (
    <div className="card w-72 bg-white mx-auto h-80 flex flex-col justify-between shadow-lg">
      <div className="card-body">
        <div className="flex flex-row justify-between mb-4">
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
            <div className="text-gray-600 text-sm">
              {renderDimensions()}
              {details.packageDetails?.weight
                ? `${details.packageDetails.weight} kg`
                : "0 kg"}
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
            {details.packageDetails?.weight
              ? `${details.packageDetails.weight} kg`
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
