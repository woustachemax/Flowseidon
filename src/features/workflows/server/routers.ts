import client from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { PAGINATION } from "@/config/constants";

export const workFlowsRouter = createTRPCRouter({
    create: premiumProcedure.mutation(async ({ ctx }) => {
        return client.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.session.user.id,
            }
        });
    }),

    getMany: protectedProcedure
        .input(
            z.object({
                page: z.number().min(1).default(PAGINATION.DEAFAULT_PAGE),
                pageSize: z.number()
                    .min(PAGINATION.MIN_PAGE_SIZE)
                    .max(PAGINATION.MAX_PAGE_SIZE)
                    .default(PAGINATION.DEAFAULT_PAGE_SIZE),
                search: z.string().default("")
            })
        )
        .query(async ({ ctx, input }) => {  
            const { page, pageSize, search } = input; 

            const skip = (page - 1) * pageSize;

            const [items, totalCount] = await Promise.all([
                client.workflow.findMany({
                    skip,
                    take: pageSize,
                    where: {
                        userId: ctx.session.user.id,
                        ...(search && {
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        })
                    },
                    orderBy: {
                        updatedAt: "desc"
                    }
                }),
                client.workflow.count({
                    where: {
                        userId: ctx.session.user.id,
                        ...(search && {
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        })
                    }
                })
            ]);

            const totalPages = Math.ceil(totalCount / pageSize);
            const hasNextPage = page < totalPages;
            const hasPreviousPage = page > 1;
            const isFirstPage = page === 1;
            const isLastPage = page === totalPages || totalCount === 0;
            const isEmpty = totalCount === 0;
            const startIndex = isEmpty ? 0 : skip + 1;
            const endIndex = isEmpty ? 0 : Math.min(skip + pageSize, totalCount);

            return {
                items,
                pagination: {
                    page,
                    pageSize,
                    totalCount,
                    totalPages,
                    hasNextPage,
                    hasPreviousPage,
                    isFirstPage,
                    isLastPage,
                    isEmpty,
                    startIndex,
                    endIndex,
                    nextPage: hasNextPage ? page + 1 : null,
                    previousPage: hasPreviousPage ? page - 1 : null
                }
            };
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

    duplicate: protectedProcedure
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

            return client.workflow.create({
                data: {
                    name: `${workflow.name} (Copy)`,
                    userId: ctx.session.user.id,
                }
            });
        }),
});