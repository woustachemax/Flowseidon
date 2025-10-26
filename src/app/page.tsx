"use client"
import { requireAuth } from "@/lib/auth-utils"
import LogoutButton from "@/custom-components/logout-button";
import { trpc } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MotionButton } from "@/custom-components/custom-button";


export default function Page() {
  const session =  requireAuth();
  const queryClient =  useQueryClient()
  const {data} =  useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(trpc.createWorkflows.mutationOptions({
    onSuccess: ()=>{
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
    }
  }))

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-neutral-100 text-2xl mb-6">Session Data</h1>
        <pre className="bg-neutral-900 text-emerald-400 p-6 rounded-lg overflow-auto border border-neutral-800">
          {JSON.stringify(data)}
        </pre>
        <div className="mt-6">
          <MotionButton onClick={()=>create.mutate()}
            disabled={create.isPending}>
            Create Workflow
          </MotionButton>
        </div>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}