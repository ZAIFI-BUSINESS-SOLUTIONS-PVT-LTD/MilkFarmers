"use client";

import Link from "next/link";
import {
  CalendarCheck,
  ShoppingBag,
  PauseCircle,
  CreditCard,
  User,
  ChevronRight,
  Milk,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SubscriptionCard from "@/components/cards/SubscriptionCard";
import StatusBadge from "@/components/shared/StatusBadge";
import customersData from "@/data/customers.json";
import type { Customer } from "@/types";
import { motion } from "framer-motion";

const customer = (customersData as Customer[])[0];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const QUICK_ACTIONS = [
  { href: "/customer/subscription", icon: CalendarCheck, label: "Subscription", color: "bg-emerald-50 text-emerald-600" },
  { href: "/customer/extra-order", icon: ShoppingBag, label: "Extra Order", color: "bg-blue-50 text-blue-600" },
  { href: "/customer/pause", icon: PauseCircle, label: "Pause / Resume", color: "bg-amber-50 text-amber-600" },
  { href: "/customer/payments", icon: CreditCard, label: "Payments", color: "bg-purple-50 text-purple-600" },
  { href: "/customer/profile", icon: User, label: "My Profile", color: "bg-rose-50 text-rose-600" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const tileItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};

export default function HomePage() {
  const { name, subscription } = customer;
  const firstName = name.split(" ")[0];
  const deliveryStatus = subscription.status === "paused" ? "skipped" : "delivered";

  return (
    <motion.div
      className="flex flex-col min-h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        className="bg-primary px-5 pt-10 pb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Milk className="size-4 text-white/80" />
          <span className="text-white/80 text-xs font-medium">Milk Farmers</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{getGreeting()}, {firstName} 👋</h1>
        <p className="text-white/70 text-sm mt-0.5">Your fresh milk is on the way</p>
      </motion.div>

      <div className="flex-1 px-4 py-4 space-y-4 -mt-3">
        {/* Today's Delivery Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Today&apos;s Delivery</p>
                  <p className="text-base font-semibold text-foreground mt-0.5">
                    {subscription.quantityMl >= 1000
                      ? `${subscription.quantityMl / 1000}L`
                      : `${subscription.quantityMl}ml`}{" "}
                    · 6:00 AM
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Expected at your doorstep</p>
                </div>
                <StatusBadge status={deliveryStatus} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <SubscriptionCard subscription={subscription} />
        </motion.div>

        {/* Quick Actions */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">Quick Actions</p>
          <motion.div
            className="grid grid-cols-2 gap-2.5"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {QUICK_ACTIONS.map(({ href, icon: Icon, label, color }) => (
              <motion.div
                key={href}
                variants={tileItem}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={href}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`flex items-center justify-center size-9 rounded-xl shrink-0 ${color}`}>
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
                      </div>
                      <ChevronRight className="size-3 text-muted-foreground shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
