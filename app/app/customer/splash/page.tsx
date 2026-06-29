"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Milk } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/customer/login"), 2000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary relative overflow-hidden">
      {/* Background circles for depth */}
      <div className="absolute size-80 rounded-full bg-white/5 -top-20 -right-20" />
      <div className="absolute size-60 rounded-full bg-white/5 -bottom-16 -left-16" />

      <div className="flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-700 z-10">
        <div className="flex items-center justify-center size-24 rounded-3xl bg-white/20 shadow-xl">
          <Milk className="size-12 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">Milk Farmers</h1>
          <p className="text-white/70 text-base mt-1">Fresh. Pure. Delivered.</p>
        </div>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white animate-bounce [animation-delay:0ms]" />
          <span className="size-2 rounded-full bg-white/60 animate-bounce [animation-delay:150ms]" />
          <span className="size-2 rounded-full bg-white/30 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
