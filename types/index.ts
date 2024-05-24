import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type IToken = {
  accessToken: string;
  refreshToken?: string;
};

export interface CurrentUserProps {
  currentUser?: {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password: string | null;
    isAdmin: boolean;
  } | null;
}

// MyUser interface
export interface MyUser {
  id: string;
  companyName: string | null;
  name: string;
  email: string | null;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  organizationNumber: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  street: string | null;
  phonenumber: string | null;
  hasCompletedInitialSetup: boolean;
  hashedPassword: string | null;
}

export type MyToken = MyUser;

interface AddressDetails {
  companyName: string;
  contactName: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShipmentDetails {
  sender: AddressDetails;
  receiver: AddressDetails;
  packageDetails: {
    weight: number; // Ensure weight is not optional
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    content: string;
    isStackable: boolean;
  };
  date: string; // Ensure date is a string
  description: string;
  count: number;
  packageType: string;
}

export interface PackageDetails {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  content: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  date: string;
  sender: AddressDetails;
  receiver: AddressDetails;
  packageDetails: PackageDetails;
}

export interface ShippingData {
  fromZip: string;
  toZip: string;
  fromCountry: string;
  toCountry: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  stackable: boolean;
}

export interface Contact {
  id: number;
  companyName: string;
  name: string;
  street?: string;
  postalcode?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
}

export interface Country {
  title: string;
  engTitle: string;
  value: string;
}

export interface Prediction {
  formatted_address: string;
  place_id: string;
  postal_code: string;
  city: string;
  street: string;
  country: string;
}
