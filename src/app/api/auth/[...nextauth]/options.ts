import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/src/models";
import { dbConnect } from "@/src/lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
        async authorize(credentials: Partial<Record<"email" | "password", string>>) {
          if (!credentials?.email || !credentials?.password) return null;

          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user || !user.password) return null;

          const isMatch = await user.comparePassword(credentials.password);
          if (!isMatch) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: typeof user.images === "string" ? user.images : "",
            role: user.role ?? "user",
            wishlist: user.wishlist?.map((id: any) => id.toString()) ?? []
          };
        }

    })
  ],
  callbacks: {
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.role = (user as any).role;
    token.wishlist = (user as any).wishlist || [];
  } else {
    const dbUser = await User.findById(token.id);
    token.wishlist = dbUser?.wishlist?.map(id => id.toString()) || [];
  }
  return token;
},
async session({ session, token }) {
  if (session.user) {
    session.user.id = token.id as string;
    session.user.role = token.role as string;
    session.user.wishlist = token.wishlist || [];
  }
  return session;
}
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  secret: process.env.AUTH_SECRET
});
