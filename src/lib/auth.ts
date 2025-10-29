import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import client from "./db"; 
import { polarClient } from "./polar";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";

export const auth = betterAuth({
  database: prismaAdapter(client, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({ 
            products:[{
                productId: "50c1d3e6-5181-4501-a00b-99f7ffe2e930",
                slug: "Flowseidon-Pro"
             }
            ],
            successUrl: process.env.POLAR_SUCCESS_URL,
            authenticatedUsersOnly: true

         }),
        portal(),
        usage(),
        
      ],
    }),
  ],
});
