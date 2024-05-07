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

// New MyUser interface
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
}

// Assuming `token` has the same structure as `MyUser`
export type MyToken = MyUser;

export interface ShipmentDetails {
  packageType?: string;
  dimensions?: {
    weight: string;
    length: string;
    width: string;
    height: string;
  };
  description?: string;
  count?: number;
  isStackable?: boolean; // Make it nullable
}
