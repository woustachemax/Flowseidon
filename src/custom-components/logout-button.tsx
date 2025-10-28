"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <div className="relative group">
      <div 
        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'conic-gradient(from var(--r, 0deg), transparent 0%, rgb(244, 63, 94) 10%, transparent 20%)',
          animation: 'rotating 3s linear infinite paused'
        }}
      />
      <Button
        onClick={handleLogout}
        className={`relative px-12 py-3 transition-colors
          bg-transparent text-neutral-800
          dark:bg-transparent dark:text-neutral-200
          border border-rose-500/50
          hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50
          hover:border-transparent
          shadow-none
          m-[2px]`}
      >
        Logout
      </Button>
      <style jsx>{`
        @property --r {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        .group:hover > div {
          animation: rotating 3s linear infinite !important;
        }
        @keyframes rotating {
          0% {
            --r: 0deg;
          }
          100% {
            --r: 360deg;
          }
        }
      `}</style>
    </div>
  );
}