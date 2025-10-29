import { trpc } from "@/trpc/client";

export const useSuspenseWorkflows = () => {
    return trpc.workflows.list.useSuspenseQuery();
};