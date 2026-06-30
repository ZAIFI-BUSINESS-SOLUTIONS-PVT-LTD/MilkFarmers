"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Route,
  Banknote,
  ChevronLeft,
  ChevronRight,
  Milk,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/routes", icon: Route, label: "Routes" },
  { href: "/admin/collections", icon: Banknote, label: "Collections" },
];

interface SidebarProps {
  pathname: string;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
  onLogout: () => void;
}

function Sidebar({ pathname, collapsed, setCollapsed, setMobileOpen, onLogout }: SidebarProps) {
  return (
    <nav className="flex flex-col h-full">
      <div className={cn("flex items-center gap-2 px-4 py-5 border-b border-border", collapsed && "justify-center px-2")}>
        <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground shrink-0">
          <Milk className="size-4" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-foreground leading-none">Milk Farmers</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        )}
      </div>

      <div className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="admin-nav-bg"
                  className="absolute inset-0 rounded-xl bg-primary"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-border px-2 py-2">
        <button
          onClick={onLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-destructive hover:bg-accent",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <div className="hidden md:flex border-t border-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>
    </nav>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "hidden md:flex flex-col bg-card border-r border-border transition-all duration-200 shrink-0",
          collapsed ? "w-16" : "w-56"
        )}
      >
        <Sidebar pathname={pathname} collapsed={collapsed} setCollapsed={setCollapsed} setMobileOpen={setMobileOpen} onLogout={handleLogout} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-56 bg-card border-r border-border flex flex-col transition-transform duration-200 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar pathname={pathname} collapsed={false} setCollapsed={setCollapsed} setMobileOpen={setMobileOpen} onLogout={handleLogout} />
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-accent">
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-6 rounded bg-primary text-primary-foreground">
              <Milk className="size-3" />
            </div>
            <span className="text-sm font-bold">Milk Farmers Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
