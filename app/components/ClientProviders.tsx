"use client";

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { TemporaryShipmentProvider } from "../context/TemporaryShipmentContext";
import { CartProvider } from "../context/CartContext";
import { UserInfoProvider } from "../context/UserInfoContext";

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserInfoProvider>
          <CartProvider>
            <TemporaryShipmentProvider>{children}</TemporaryShipmentProvider>
          </CartProvider>
        </UserInfoProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default ClientProviders;
