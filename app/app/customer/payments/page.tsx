"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import paymentsData from "@/data/payments.json";
import type { Payment } from "@/types";
import { motion } from "framer-motion";

const ALL_PAYMENTS = (paymentsData as Payment[]).filter((p) => p.customerId === "C001");

const MONTHS = ["All", "July", "June", "May"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const rowItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 26 } },
};

export default function PaymentsPage() {
  const router = useRouter();
  const [monthFilter, setMonthFilter] = useState("All");

  const outstanding = ALL_PAYMENTS.filter((p) => p.status === "pending");
  const outstandingTotal = outstanding.reduce((sum, p) => sum + p.amount, 0);

  const filtered = monthFilter === "All"
    ? ALL_PAYMENTS
    : ALL_PAYMENTS.filter((p) => new Date(p.date).toLocaleString("en-IN", { month: "long" }) === monthFilter);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <motion.div
      className="flex flex-col min-h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button onClick={() => router.back()} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-bold">Payments</h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Outstanding balance */}
        {outstandingTotal > 0 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
          >
            <Card className="border-0 shadow-sm bg-primary text-primary-foreground">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="size-4 text-white/80" />
                  <p className="text-xs font-medium text-white/80">Outstanding Balance</p>
                </div>
                <p className="text-3xl font-bold text-white">₹{outstandingTotal.toLocaleString("en-IN")}</p>
                <p className="text-xs text-white/70 mt-1">Due by 5th of each month</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Month filter */}
        <Tabs value={monthFilter} onValueChange={setMonthFilter}>
          <TabsList className="w-full grid grid-cols-4 h-9 rounded-xl">
            {MONTHS.map((m) => (
              <TabsTrigger key={m} value={m} className="text-xs rounded-lg">{m}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Transaction list */}
        <motion.div
          className="space-y-2"
          variants={container}
          initial="hidden"
          animate="show"
          key={monthFilter}
        >
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No transactions for {monthFilter}</p>
          ) : (
            filtered.map((payment) => (
              <motion.div key={payment.id} variants={rowItem}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{payment.description}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(payment.date)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <p className="text-sm font-bold text-foreground">₹{payment.amount.toLocaleString("en-IN")}</p>
                        <StatusBadge status={payment.status} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
