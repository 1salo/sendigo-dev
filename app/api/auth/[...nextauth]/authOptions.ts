import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { MyUser } from "@/types";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          image: user.image || null,
          companyName: user.companyName || null,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
          organizationNumber: user.organizationNumber || null,
          postalCode: user.postalCode || null,
          city: user.city || null,
          country: user.country || null,
          street: user.street || null,
          phonenumber: user.phonenumber || null,
        } as MyUser;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // Uppdatera token med uppdaterade användaruppgifter
        token.id = user.id;
        token.email = user.email;
        token.name = `${user.firstName} ${user.lastName}`;
        token.image = user.image || null;
        token.companyName = user.companyName || null;
        token.firstName = user.firstName || null;
        token.lastName = user.lastName || null;
        token.organizationNumber = user.organizationNumber || null;
        token.postalCode = user.postalCode || null;
        token.city = user.city || null;
        token.country = user.country || null;
        token.street = user.street || null;
        token.phonenumber = user.phonenumber || null;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // Uppdatera sessionen med de uppdaterade användaruppgifterna
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.image as string | null,
          companyName: token.companyName as string | null,
          firstName: token.firstName as string | null,
          lastName: token.lastName as string | null,
          organizationNumber: token.organizationNumber as string | null,
          postalCode: token.postalCode as string | null,
          street: token.street as string | null,
          city: token.city as string | null,
          country: token.country as string | null,
          phonenumber: token.phonenumber as string | null,
        };
      }
      session.accessToken = JSON.stringify(token); // Inkludera JWT i sessionen för klientanvändning
      return session;
    },
  },
};
