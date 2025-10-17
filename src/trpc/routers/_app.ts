import { baseProcedure, createTRPCRouter } from '../init';
import client from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: baseProcedure
   
    .query(() => {
        return client.user.findMany()
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;