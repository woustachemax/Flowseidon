import { inngest } from '@/inngest/client';
import {  createTRPCRouter } from '../init';
import { workFlowsRouter } from '@/features/workflows/server/routers';


export const appRouter = createTRPCRouter({
  workflows: workFlowsRouter


});

export type AppRouter = typeof appRouter;