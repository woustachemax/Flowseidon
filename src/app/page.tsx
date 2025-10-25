import { requireAuth } from "@/lib/auth-utils"
import LogoutButton from "@/custom-components/logout-button";
import { caller } from "@/trpc/server";


export default async function Page() {
  const session = await requireAuth();
  const data = await caller.getUsers();

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-neutral-100 text-2xl mb-6">Session Data</h1>
        <pre className="bg-neutral-900 text-emerald-400 p-6 rounded-lg overflow-auto border border-neutral-800">
          {JSON.stringify(data)}
        </pre>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}