import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";

import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async signIn({ user, account, profile, email, credentials }) {
      // TODO: ENABLE THIS L8R
      if (account?.provider !== "credentials") return true;
      // return !!user.emailVerified;

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },

  events: {
    createUser: async ({ user, account }) => {
      if (account && account.provider === "github") {
        await db.user
          .update({
            where: {
              email: user.email,
            },
            data: {
              emailVerified: new Date(),
            },
          })
          .catch((e) => {
            console.error("Failed to update user's emailVerified status", e);
          });
      }
    },
  },

  ...authConfig,
});
