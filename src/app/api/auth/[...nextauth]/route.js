import Connection from "@/lib/Connection";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (credentials.fromSignup) {
          return credentials;
        } else {
          await Connection();
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const passMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (passMatch) {
              credentials.name = user.name;
              return credentials;
            } else {
              throw new Error("Incorrect Password");
            }
          } else {
            throw new Error("User does not exist");
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await Connection();

        if (account.provider === "credentials") {
          return true;
        }
        const response = await User.findOne({ email: profile.email });
        if (!response) {
          const create = await User.create({
            username: profile.name,
            email: profile.email,
            picture: profile.picture,
            loginType: "google",
          });
        }
        return true;
      } catch (error) {
        console.log(error)
        return false;
      }
    },
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser?._id;
        session.user.username = sessionUser?.username;
        session.user.picture = sessionUser?.picture;
        return session;
      } catch (error) {
        throw new Error("Something went wrong while creating the session.");
      }
    },
  },
});

export { handler as GET, handler as POST };
