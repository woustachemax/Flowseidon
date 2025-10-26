import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import client from '@/lib/db';
import { email } from 'zod';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ctx}) => {
        return client.workflow.findMany()
    }),

  createWorkflows: protectedProcedure.mutation(async ({ctx})=>{
    await inngest.send({
      name: 'test/hello.world',
      data:{
        email: 'sid@example.com'
      }
    })
    return client.workflow.create({
      data:{
        name: 'joker'
      }
    })
  })

});

export type AppRouter = typeof appRouter;