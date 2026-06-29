"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function DeliveryLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("delivery_auth");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-auto p-1 rounded-lg hover:bg-white/20 transition-colors"
      aria-label="Logout"
    >
      <LogOut className="size-4 text-white/70" />
    </button>
  );
}
