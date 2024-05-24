import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShipmentDetails } from "@/types";

const initialShipmentState: ShipmentDetails = {
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
  date: new Date().toISOString(), // Initialize as ISO string
  description: "",
  count: 1,
  packageType: "Paket",
};

const shipmentDetailsSlice = createSlice({
  name: "shipmentDetails",
  initialState: initialShipmentState,
  reducers: {
    updateShipmentDetails: (
      state,
      action: PayloadAction<Partial<ShipmentDetails>>
    ) => {
      return { ...state, ...action.payload };
    },
    clearShipmentDetails: () => initialShipmentState,
  },
});

export const { updateShipmentDetails, clearShipmentDetails } =
  shipmentDetailsSlice.actions;
export default shipmentDetailsSlice.reducer;
