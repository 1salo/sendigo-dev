import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    companyName: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    organizationNumber: string | null;
    postalCode: string | null;
    city: string | null;
    country: string | null;
    street: string | null;
    phonenumber: string | null;
  }

  interface Session {
    user: User;
    accessToken?: string;
    token: {
      firstName: string | null;
      lastName: string | null;
      companyName: string | null;
    };
  }
}
