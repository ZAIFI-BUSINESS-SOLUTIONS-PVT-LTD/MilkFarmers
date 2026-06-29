"use client";

import { useEffect, useReducer } from "react";
import { useRouter, usePathname } from "next/navigation";

function authReducer(_: boolean, action: "allow" | "redirect"): boolean {
  return action === "allow";
}

export default function DeliveryGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, dispatch] = useReducer(authReducer, false);

  useEffect(() => {
    const isLoginPage = pathname === "/delivery/login";
    const isAuthed = !isLoginPage && sessionStorage.getItem("delivery_auth") === "1";
    if (isLoginPage || isAuthed) {
      dispatch("allow");
    } else {
      dispatch("redirect");
      router.replace("/delivery/login");
    }
  }, [pathname, router]);

  if (!ok) return null;
  return <>{children}</>;
}
