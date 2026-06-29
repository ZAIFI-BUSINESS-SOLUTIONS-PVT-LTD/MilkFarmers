"use client";

import Link from "next/link";
import { Milk, User, Truck, LayoutDashboard, ChevronRight } from "lucide-react";

const roles = [
  {
    label: "Customer",
    href: "/customer/splash",
    icon: User,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    desc: "View subscriptions, orders & payments",
  },
  {
    label: "Delivery Executive",
    href: "/delivery/login",
    icon: Truck,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    desc: "Access your route & delivery updates",
  },
  {
    label: "Admin",
    href: "/admin/login",
    icon: LayoutDashboard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    desc: "Manage customers, routes & collections",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center size-10 rounded-xl bg-white/20">
            <Milk className="size-5 text-white" />
          </div>
          <p className="text-white font-bold text-xl">Milk Farmers</p>
        </div>
        <h1 className="text-2xl font-bold text-white mt-4">Welcome</h1>
        <p className="text-white/70 text-sm mt-1">Choose your role to continue</p>
      </div>

      {/* Role cards */}
      <div className="flex-1 px-6 pt-8 space-y-4">
        {roles.map(({ label, href, icon: Icon, iconBg, iconColor, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 bg-white shadow-sm p-4 rounded-2xl"
          >
            <div className={`flex items-center justify-center size-12 rounded-xl ${iconBg} shrink-0`}>
              <Icon className={`size-6 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base text-foreground">{label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground shrink-0" />
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground pb-8 px-6 mt-8">
        Milk Farmers © 2024
      </p>
    </div>
  );
}
