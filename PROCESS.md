# Development Process Log

## Day 1: Project Foundation & Core Setup

Initialized a Next.js project with Turbopack for faster development builds and integrated shadcn/ui for the component library. Set up a PostgreSQL database with Prisma ORM, defining the initial schema and creating a `lib/db.ts` file with a Prisma singleton pattern to prevent multiple client instances during hot reload. Added Code Rabbit for automated code reviews. Configured tRPC following the official [documentation](https://trpc.io/docs/client/tanstack-react-query/server-components) to establish end-to-end typesafe APIs with TanStack React Query for server component integration. Integrated Better Auth as the authentication provider and designed the authentication pages for login and signup functionality.

## Day 2: Authentication UI & Theme Implementation

Built login and signup pages using Better Auth for authentication handling and shadcn/ui components for the UI foundation. Implemented Framer Motion animations to add smooth transitions and micro-interactions throughout the authentication flows. Established a dark mode theme system across the entire application with emerald accent colors featuring glow effects for visual emphasis and modern aesthetic appeal.

## Day 3: Background Jobs & tRPC Client Configuration

Created a workflow model in Prisma schema and attempted implementing background jobs. Initial approach using `await new Promise((resolve)=>{setTimeout(resolve, 5000)})` proved problematic - failures forced users to restart the entire process and wait again, creating a frustrating loop. Solution: integrated Inngest for reliable background job processing with automatic retries and failure handling.

Encountered major debugging session with tRPC client configuration. Initial setup used `createTRPCContext` from `@trpc/tanstack-react-query` which caused conflicts when mixing `"use client"` components with server-only code (`next/headers` in auth utilities). After extensive troubleshooting, switched to the standard `createTRPCReact` API which properly exports tRPC hooks (`trpc.useQuery()`, `trpc.useMutation()`, `trpc.useUtils()`). This resolved the client/server boundary issues and enabled proper React Query integration in client components.

Integrated Vercel AI SDK with multiple AI providers: Anthropic (Claude), OpenAI (GPT), and Google Gemini for workflow automation features. Key learning: Next.js App Router requires strict separation between server components (which can use `next/headers` and tRPC server calls) and client components (which use React hooks and tRPC client). Can't mix both in the same component without proper abstraction layers.

## Day 4: Design System & Navigation Implementation

Added Sentry for comprehensive error tracking and monitoring, implementing session replay, detailed logs, and performance monitoring to better understand error patterns and their root causes. This provides real-time visibility into production issues and user experience problems.

Developed a cohesive design system with custom components following a mellow, premium aesthetic. Created `MotionButton` component featuring subtle inset shadows, cyan-to-fuchsia gradient accents, and animated rotating glow effects on hover using conic gradients and CSS animations. Modified `MellowInput` component with similar styling, incorporating rotating border glows on focus (cyan for normal state, rose for error state) and bottom gradient indicators for visual feedback.

Implemented application sidebar navigation using shadcn/ui Sidebar components with custom styling to match the design system. Added three main navigation items (Workflows, Credentials, Executions) with active state indicators and hover effects. Integrated animated cyan glow on the header border that continuously flows across using CSS keyframe animations. Added footer section with "Upgrade to Pro" (highlighted in cyan), "Billing Portal", and "Logout" options. The logout button features a transparent red liquid glass effect on hover with backdrop blur, gradient shimmer animation, and rose color transitions.

Resolved Better Auth `trustedOrigins` configuration issue where requests from `localhost:3001` were being rejected. Updated `src/lib/auth.ts` to include multiple trusted origins for development environments, fixing the 403 errors on sign-out requests. Key learning: Better Auth requires explicit origin whitelisting for security, and all development ports need to be included in the `trustedOrigins` array.

Refined component architecture to properly handle flex layouts, ensuring buttons maintain correct sizing when used both individually and in flex containers with gaps. Added proper wrapper div configurations with `flex-1` and `w-full` classes to enable buttons to grow equally in side-by-side layouts while maintaining their mellow glow effects.

## Day 5: Payments Integration & Subscription System

Set up payment processing using Polar.sh for Pro subscription tier management. Created a sandbox account for development mode and integrated it with Better Auth using the `@polar-sh/better-auth` plugin. Configured the Polar SDK client in `src/lib/polar.ts` with Personal Access Token (PAT) authentication pointing to the sandbox environment.

Integrated Polar plugin into Better Auth configuration with checkout, portal, and usage features. Configured product checkout with specific product ID and slug ("Flowseidon-Pro"), enabling authenticated-only checkout flows with custom success URL redirect. Implemented client-side Polar integration by adding `polarClient()` plugin to the auth client for frontend subscription interactions.

Created subscription status hook (`useHasActiveSubscription`) to check user's subscription state and conditionally render UI elements. Updated sidebar to show "Upgrade to Pro" and "Billing Portal" buttons only for non-subscribed users, hiding them once a user has an active subscription. Encountered and resolved several integration issues including token authentication errors (401) caused by invalid product IDs and understanding the distinction between server-side Polar SDK client (custom instance) versus client-side plugin (from `@polar-sh/better-auth` package).

Implemented complete CRUD operations for workflows using tRPC with `protectedProcedure` middleware. Created router with create, list, getById, updateName, and remove endpoints, all scoped to authenticated users. Established naming convention to use `ctx.session` instead of `ctx.auth` to align with Better Auth's standard practices. Integrated `random-word-slugs` for automatic workflow name generation on creation.

Built tRPC query infrastructure with proper type inference using `inferRouterInputs<AppRouter>` for input types. Created custom React hooks in `hooks/use-workflow.ts` with `useSuspenseWorkflows()` utilizing `useSuspenseQuery` for automatic loading states. Set up server-side prefetching utilities in `trpc/prefetch.ts` to enable SSR data hydration, allowing workflows to be pre-fetched on the server and seamlessly hydrated on the client through `HydrateClient` wrapper component. This architecture ensures optimal performance with no loading spinners on initial page load while maintaining full type safety across the client-server boundary.