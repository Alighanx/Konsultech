"use client";
import { SessionProvider } from "next-auth/react";
import ClientOnly from "@/components/ClientOnly";

export default function CustomSessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <SessionProvider>{children}</SessionProvider>
    </ClientOnly>
  );
}
