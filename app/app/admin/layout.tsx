"use client";

import { usePathname } from "next/navigation";
import AdminShell from "@/components/shells/AdminShell";
import AdminGuard from "@/components/shells/AdminGuard";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminGuard>
  );
}
