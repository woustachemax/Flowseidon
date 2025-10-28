# Development Process Log

## Day 1: Project Foundation & Core Setup

Initialized a Next.js project with Turbopack for faster development builds and integrated shadcn/ui for the component library. Set up a PostgreSQL database with Prisma ORM, defining the initial schema and creating a `lib/db.ts` file with a Prisma singleton pattern to prevent multiple client instances during hot reload. Added Code Rabbit for automated code reviews. Configured tRPC following the official [documentation](https://trpc.io/docs/client/tanstack-react-query/server-components) to establish end-to-end typesafe APIs with TanStack React Query for server component integration. Integrated Better Auth as the authentication provider and designed the authentication pages for login and signup functionality.

## Day 2: Authentication UI & Theme Implementation

Built login and signup pages using Better Auth for authentication handling and shadcn/ui components for the UI foundation. Implemented Framer Motion animations to add smooth transitions and micro-interactions throughout the authentication flows. Established a dark mode theme system across the entire application with emerald accent colors featuring glow effects for visual emphasis and modern aesthetic appeal.

## Day 3: Background Jobs & tRPC Client Configuration

Created a workflow model in Prisma schema and attempted implementing background jobs. Initial approach using `await new Promise((resolve)=>{setTimeout(resolve, 5000)})` proved problematic - failures forced users to restart the entire process and wait again, creating a frustrating loop. Solution: integrated Inngest for reliable background job processing with automatic retries and failure handling.

Encountered major debugging session with tRPC client configuration. Initial setup used `createTRPCContext` from `@trpc/tanstack-react-query` which caused conflicts when mixing `"use client"` components with server-only code (`next/headers` in auth utilities). After extensive troubleshooting, switched to the standard `createTRPCReact` API which properly exports tRPC hooks (`trpc.useQuery()`, `trpc.useMutation()`, `trpc.useUtils()`). This resolved the client/server boundary issues and enabled proper React Query integration in client components.

Integrated Vercel AI SDK with multiple AI providers: Anthropic (Claude), OpenAI (GPT), and Google Gemini for workflow automation features. Key learning: Next.js App Router requires strict separation between server components (which can use `next/headers` and tRPC server calls) and client components (which use React hooks and tRPC client). Can't mix both in the same component without proper abstraction layers.

## Day 4: Added Sentry and Sidebar

Added sentry to have greater understanding of errors and why the errors were made, with session replay, logs and monitoring