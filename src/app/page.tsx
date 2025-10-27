import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import WorkflowClient from "@/custom-components/workflows-client";
export default async function Page() {
  const session = await requireAuth();

  const c = await caller(); 
  const workflows = await c.getWorkflows(); 
  
  return <WorkflowClient data={workflows} />;
}
