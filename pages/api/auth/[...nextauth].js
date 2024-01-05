import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;

        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

        const res = await fetch(`${serverUrl}/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email, password }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session.user) {
          console.log(session.user);
          token.user = session.user;
        }
      } else if (user) {
        token.user = user;
      }
      return token;
    },
  },

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/", // Displays signin buttons at /auth
  },
});
