import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import client from "./db";

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql", 
    }),
    emailAndPassword:{
        enabled: true
    }
});