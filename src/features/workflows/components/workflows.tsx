"use client"

import { useSuspenseWorkflows } from "../hooks/use-workflows";
import { Suspense } from "react";

function WorkflowList() {
    const [workflows] = useSuspenseWorkflows();
    
    return (
        <div>
            {workflows.map(workflow => (
                <div key={workflow.id}>{workflow.name}</div>
            ))}
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowList />
        </Suspense>
    );
}