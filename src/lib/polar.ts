import { Polar } from "@polar-sh/sdk";

// console.log('=== POLAR TOKEN DEBUG ===');
// console.log('Raw token:', process.env.POLAR_ACCESS_TOKEN);
// console.log('Token length:', process.env.POLAR_ACCESS_TOKEN?.length);
// console.log('First 15 chars:', process.env.POLAR_ACCESS_TOKEN?.substring(0, 15));
// console.log('Last 5 chars:', process.env.POLAR_ACCESS_TOKEN?.slice(-5));
// console.log('========================');

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
    server: "sandbox"
});