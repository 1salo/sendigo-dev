import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    companyName: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  }

  interface Session {
    user: User;
    accessToken?: string; // Include accessToken in the session object
    token: {
      firstName: string | null;
      lastName: string | null;
      companyName: string | null;
    };
  }
}
