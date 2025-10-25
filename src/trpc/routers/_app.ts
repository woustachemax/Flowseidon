import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import client from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure
   
    .query(({ctx}) => {
      console.log({userId: ctx.auth.user.id})
        return client.user.findMany({
          where:{
            id: ctx.auth.user.id
          }
        })
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;