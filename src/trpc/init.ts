import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import { polarClient } from '@/lib/polar';

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  return { 
    session,
    userId: session?.user?.id 
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized'
    });
  }

  return next({ ctx: { ...ctx, session } });
});

export const premiumProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized'
    });
  }

  const user = session.user as any;
  
  const hasActiveSubscription = user.hasActiveSubscription || false;

  if (!hasActiveSubscription) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Premium subscription required'
    });
  }

  return next({ 
    ctx: { 
      ...ctx, 
      session
    } 
  });
});