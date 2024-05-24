"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserInfo {
  companyName: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  contactName: string;
  email: string;
  phone: string;
}

interface UserInfoContextProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const UserInfoContext = createContext<UserInfoContextProps | undefined>(
  undefined
);

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    companyName: "",
    address: "",
    postcode: "",
    city: "",
    country: "",
    contactName: "",
    email: "",
    phone: "",
  });

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
