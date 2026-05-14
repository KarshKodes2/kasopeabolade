import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from 'db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! })],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // @ts-expect-error extended
        session.user.role = user.role;
      }
      return session;
    },
    signIn({ user }) {
      // Only SUPER_ADMIN can access admin
      // @ts-expect-error extended
      return user.role === 'SUPER_ADMIN';
    },
  },
  pages: { signIn: '/auth/signin' },
});
