import NextAuth from "next-auth/next";
import GooglePrvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
const handler = NextAuth({
  providers: [
    GooglePrvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDb();

      // check if the user already exist

      // if user doesn't exist, then create and save in Database

      return true;
    } catch (error) {
      return false;
    }
  },
});

export { handler as GET, handler as POST };
