"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ShipmentDetails } from "@/types";

interface TemporaryShipmentContextProps {
  shipmentDetails: ShipmentDetails;
  setShipmentDetails: (
    details:
      | Partial<ShipmentDetails>
      | ((prev: ShipmentDetails) => Partial<ShipmentDetails>)
  ) => void;
  clearShipmentDetails: () => void;
}

const TemporaryShipmentContext = createContext<
  TemporaryShipmentContextProps | undefined
>(undefined);

export const useTemporaryShipment = () => {
  const context = useContext(TemporaryShipmentContext);
  if (!context) {
    throw new Error(
      "useTemporaryShipment must be used within a TemporaryShipmentProvider"
    );
  }
  return context;
};

const initialShipmentDetails: ShipmentDetails = {
  sender: {
    companyName: "",
    address: "",
    postcode: "",
    city: "",
    country: "",
    contactName: "",
    email: "",
    phone: "",
  },
  receiver: {
    companyName: "",
    address: "",
    postcode: "",
    city: "",
    country: "",
    contactName: "",
    email: "",
    phone: "",
  },
  packageDetails: {
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    content: "",
    isStackable: true,
  },
  date: new Date(),
  description: "",
  count: 1,
  packageType: "Paket",
};

export const TemporaryShipmentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [shipmentDetails, setShipmentDetailsState] = useState<ShipmentDetails>(
    () => {
      const storedDetails = localStorage.getItem("shipmentDetails");
      return storedDetails ? JSON.parse(storedDetails) : initialShipmentDetails;
    }
  );

  useEffect(() => {
    localStorage.setItem("shipmentDetails", JSON.stringify(shipmentDetails));
  }, [shipmentDetails]);

  const updateShipmentDetails = (
    details:
      | Partial<ShipmentDetails>
      | ((prev: ShipmentDetails) => Partial<ShipmentDetails>)
  ) => {
    setShipmentDetailsState((prev) =>
      typeof details === "function"
        ? { ...prev, ...details(prev) }
        : { ...prev, ...details }
    );
  };

  const clearShipmentDetails = () => {
    setShipmentDetailsState(initialShipmentDetails);
    localStorage.removeItem("shipmentDetails");
  };

  return (
    <TemporaryShipmentContext.Provider
      value={{
        shipmentDetails,
        setShipmentDetails: updateShipmentDetails,
        clearShipmentDetails,
      }}
    >
      {children}
    </TemporaryShipmentContext.Provider>
  );
};
