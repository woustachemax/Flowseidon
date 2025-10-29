import client from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const workFlowsRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ ctx }) => {
        return client.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.session.user.id,
            }
        });
    }),

    getMany: protectedProcedure.query(async ({ ctx }) => {
        return client.workflow.findMany({
            where: {
                userId: ctx.session.user.id,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
    }),

    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const workflow = await client.workflow.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.session.user.id,
                }
            });

            if (!workflow) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Workflow not found'
                });
            }

            return workflow;
        }),

    update: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            const workflow = await client.workflow.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.session.user.id,
                }
            });

            if (!workflow) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Workflow not found'
                });
            }

            return client.workflow.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                }
            });
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const workflow = await client.workflow.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.session.user.id,
                }
            });

            if (!workflow) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Workflow not found'
                });
            }

            return client.workflow.delete({
                where: { id: input.id }
            });
        }),
});