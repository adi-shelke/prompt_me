import NextAuth from "next-auth/next";
import GooglePrvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/user";
const handler = NextAuth({
  providers: [
    GooglePrvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const user = await User.findOne({ email: session.user.email });
    session.user.id = user._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDb();

      // check if the user already exist
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      // if user doesn't exist, then create and save in Database

      return true;
    } catch (error) {
      return false;
    }
  },
});

export { handler as GET, handler as POST };
