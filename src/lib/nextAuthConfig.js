import GoogleProvider from "next-auth/providers/google";

/**@type {import('next-auth').NextAuthOptions} */
export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    newUser: "/auth/register",
  },
};
