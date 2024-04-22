import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { MyUser, MyToken } from "../../../../types/index";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
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

        // Return user info conforming to the MyUser type
        return {
          id: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          email: user.email,
          image: user.image || null,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
        } as MyUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Cast user to MyUser to satisfy TypeScript's type checking
      if (user) {
        token = {
          ...token,
          ...(user as MyUser),
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Cast token to MyToken to ensure proper type handling
      if (token) {
        session.user = {
          ...session.user,
          ...(token as unknown as MyToken),
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? `${baseUrl}/dashboard` : baseUrl;
    },
  },
};

// Type-safe API handler exports with capitalized method names
export const GET: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, authOptions);
export const POST: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, authOptions);
export const PUT: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, authOptions);
export const DELETE: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, authOptions);
