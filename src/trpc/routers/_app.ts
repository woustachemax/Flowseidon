import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import client from '@/lib/db';


export const appRouter = createTRPCRouter({
  testai: baseProcedure.mutation(async (ctx)=>{
      await inngest.send({
        name: 'execute/ai'
      })

      return {success: true, message: 'job queued'}
  }),

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