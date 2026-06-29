"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Milk } from "lucide-react";
import DeliveryLogoutButton from "@/components/shells/DeliveryLogoutButton";

const TITLES: Record<string, string> = {
  "/delivery/route": "Today's Route",
  "/delivery/status": "Delivery Status",
};

export default function DeliveryShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const title = TITLES[pathname] ?? "Delivery";
  const canGoBack = pathname !== "/delivery/route";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shadow-sm">
        {canGoBack ? (
          <button
            onClick={() => router.back()}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
        ) : (
          <div className="flex items-center justify-center size-7 rounded bg-white/20">
            <Milk className="size-4" />
          </div>
        )}
        <h1 className="text-base font-semibold">{title}</h1>
        <DeliveryLogoutButton />
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
