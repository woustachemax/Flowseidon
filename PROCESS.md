# Development Process Log

## Day 1: Project Foundation & Core Setup

Initialized a Next.js project with Turbopack for faster development builds and integrated shadcn/ui for the component library. Set up a PostgreSQL database with Prisma ORM, defining the initial schema and creating a `lib/db.ts` file with a Prisma singleton pattern to prevent multiple client instances during hot reload. Added Code Rabbit for automated code reviews. Configured tRPC following the official [documentation](https://trpc.io/docs/client/tanstack-react-query/server-components) to establish end-to-end typesafe APIs with TanStack React Query for server component integration. Integrated Better Auth as the authentication provider and designed the authentication pages for login and signup functionality.

## Day 2: Authentication UI & Theme Implementation

Built login and signup pages using Better Auth for authentication handling and shadcn/ui components for the UI foundation. Implemented Framer Motion animations to add smooth transitions and micro-interactions throughout the authentication flows. Established a dark mode theme system across the entire application with emerald accent colors featuring glow effects for visual emphasis and modern aesthetic appeal.

## Day 3: Background Jobs

Created a workflow model in prisma schema, tried implementing background jobs, but the only way to do those were to add `await new Promise((resolve)=>{setTimeout(resolve, 5000)})`, which if failed lead to the user having to redo the process and wait again for it to happen until it becomes a vicious cycle, to solve that though, we'll be using `Inngest`