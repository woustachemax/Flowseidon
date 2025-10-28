import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import client from "./db";

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql", 
    }),
    emailAndPassword:{
        enabled: true,
        autoSignIn: true
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001",
        process.env.NEXT_PUBLIC_APP_URL || ""
    ].filter(Boolean)
});