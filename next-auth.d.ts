import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
  interface User {
    id: string;
    role: string;
    wishlist: string[];
  } 


declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    wishlist?: string[];
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      wishlist: string[];
    } & DefaultSession["user"];
  }
}
