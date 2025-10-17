import { caller } from "@/trpc/server";

export default async function Home () {
  const users = await caller.getUsers();
  return (
    <div className="font-serif grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {JSON.stringify(users)}
    </div>
  );
}
