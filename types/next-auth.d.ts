import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  }

  interface Session {
    user: User;
    token: {
      firstName: string | null;
      lastName: string | null;
    };
  }
}
