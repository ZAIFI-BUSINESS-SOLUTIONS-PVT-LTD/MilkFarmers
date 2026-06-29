"use client";

import { useEffect, useReducer } from "react";
import { useRouter, usePathname } from "next/navigation";

function authReducer(_: boolean, action: "allow" | "redirect"): boolean {
  return action === "allow";
}

export default function CustomerGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, dispatch] = useReducer(authReducer, false);

  useEffect(() => {
    const isPublic = pathname === "/customer/splash" || pathname === "/customer/login";
    const isAuthed = !isPublic && sessionStorage.getItem("customer_auth") === "1";
    if (isPublic || isAuthed) {
      dispatch("allow");
    } else {
      dispatch("redirect");
      router.replace("/customer/splash");
    }
  }, [pathname, router]);

  if (!ok) return null;
  return <>{children}</>;
}
