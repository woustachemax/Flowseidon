import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
    return trpc.workflows.getMany.useSuspenseQuery();
};

export const useCreateWorkflow = () => {
    const router = useRouter();
    const utils = trpc.useUtils();
    
    return trpc.workflows.create.useMutation({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" created`);
            router.push(`/workflows/${data.id}`);
            utils.workflows.getMany.invalidate();
        },
        onError: () => {
            toast.error("Failed to create workflow");
        }
    });
}