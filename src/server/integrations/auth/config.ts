import { verify } from "@node-rs/argon2";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/server/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = String(creds?.email ?? "").toLowerCase();
        const password = String(creds?.password ?? "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.status !== "APPROVED") return null;

        const ok = await verify(user.passwordHash, password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
          companyId: user.companyId
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.companyId = (user as { companyId?: string | null }).companyId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string | undefined;
        (session.user as { companyId?: string | null }).companyId =
          token.companyId as string | null | undefined;
      }
      return session;
    }
  }
});
