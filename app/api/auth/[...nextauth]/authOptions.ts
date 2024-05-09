import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { MyUser } from "@/types"; // Ensure this type is correctly defined as needed

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
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            companyName: true,
            organizationNumber: true,
            postalCode: true,
            city: true,
            country: true,
            street: true,
            phonenumber: true,
            hashedPassword: true,
            hasCompletedInitialSetup: true,
          },
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

        // Construct MyUser type object from user data
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          image: user.image,
          companyName: user.companyName,
          firstName: user.firstName,
          lastName: user.lastName,
          organizationNumber: user.organizationNumber,
          postalCode: user.postalCode,
          city: user.city,
          country: user.country,
          street: user.street,
          phonenumber: user.phonenumber,
          hasCompletedInitialSetup: user.hasCompletedInitialSetup,
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
        // Assign user properties to token
        Object.assign(token, {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          companyName: user.companyName,
          firstName: user.firstName,
          lastName: user.lastName,
          organizationNumber: user.organizationNumber,
          postalCode: user.postalCode,
          city: user.city,
          country: user.country,
          street: user.street,
          phonenumber: user.phonenumber,
          hasCompletedInitialSetup: user.hasCompletedInitialSetup,
        });
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        ...token,
      };
      session.accessToken = JSON.stringify(token);
      return session;
    },
  },
};
