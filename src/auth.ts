import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // 1. Events: Email verify hone par date update karne ke liye (Optional but good)
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  // 2. Callbacks: Sirf Token aur Session modification ke liye use hote hain
  callbacks: {
    async signIn({ user, account }) {
      // Google/Github login ko allow karne ke liye true return karna padta hai
      if (account?.provider !== "credentials") return true;
      
      return true;
    },

    async session({ session, token }) {
      // Token se User ID session mein daalo
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // Token se Role session mein daalo
      if (token.role && session.user) {
        // @ts-ignore  <-- TypeScript error rokne ke liye
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      // Database se user ka role fetch karo
      const existingUser = await db.user.findUnique({
        where: { id: token.sub }
      });

      if (!existingUser) return token;

      // Token mein Role add kar diya
      token.role = existingUser.role;

      return token;
    }
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});