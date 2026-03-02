import NextAuth from "next-auth";
import { type DefaultSession } from "next-auth";

// Modifies the native NextAuth types to include "role" and "id" from the database.
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        role: string;
    }
}
