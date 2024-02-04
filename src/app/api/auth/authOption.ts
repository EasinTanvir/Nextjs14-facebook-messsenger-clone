import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../prismaClient";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials: any, req) {
        let user;

        user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("No user found");
        }

        let hashPass;

        hashPass = await bcrypt.compare(credentials.password, user.password);

        if (!hashPass) {
          throw new Error("Invalid Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        (token.id = user?.id), (token.name = user?.userName);
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token?.id;
      session.user.name = token?.name;

      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: "1",
};
