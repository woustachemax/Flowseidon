import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
export const createTRPCContext = cache(async () => {
 
  return { userId: 'user_123' };
});

const t = initTRPC.create({

});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ctx, 
  next})=>{
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!session){
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'unauthorized'
    })
  }

  return next({ctx: { ...ctx, auth:session}});

})