'use client'

import { trpc } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { MotionButton } from "@/custom-components/custom-button";
import { toast } from "./custom-toast";
import LogoutButton from "@/custom-components/logout-button";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

type RouterOutput = inferRouterOutputs<AppRouter>;
type WorkflowsData = RouterOutput["getWorkflows"];

export default function WorkflowClient({ data }: { data: WorkflowsData }) {
  const utils = trpc.useUtils();
  
  const testai = trpc.testai.useMutation({
    onSuccess: () => toast.success("AI test successful"),
    onError: () => toast.error("AI test failed"),
    });

  const create = trpc.createWorkflows.useMutation({
    onSuccess: () => {
      toast.success("Workflow created!");
      utils.getWorkflows.invalidate(); 
    },
    onError: () => toast.error("Failed to create workflow"),
  });

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-neutral-100 text-2xl mb-6">Session Data</h1>
        <pre className="bg-neutral-900 text-cyan-400 shadow-gray-200 p-6 rounded-lg overflow-auto border border-neutral-800">
          {JSON.stringify(data, null, 2)}
        </pre>
        <div className="mt-6">
          <MotionButton 
            onClick={() => testai.mutate()}
            disabled={testai.isPending}>
            Generate Slop
          </MotionButton>
        </div>

        <div className="mt-6">
          <MotionButton 
            onClick={() => create.mutate()}
            disabled={create.isPending}>
            Create Workflow
          </MotionButton>
        </div>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
