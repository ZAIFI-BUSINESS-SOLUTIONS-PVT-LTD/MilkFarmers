"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuantitySelector from "@/components/shared/QuantitySelector";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import customersData from "@/data/customers.json";
import type { Customer } from "@/types";
import { motion } from "framer-motion";

const PLANS = [
  { id: "toned", label: "Toned Milk", desc: "Low fat, everyday use", price: 60 },
  { id: "full_cream", label: "Full Cream", desc: "Rich & creamy, for tea/coffee", price: 72 },
  { id: "a2_gir", label: "A2 Gir", desc: "Premium, indigenous breed", price: 110 },
] as const;

const customer = (customersData as Customer[])[0];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const planItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};

export default function SubscriptionPage() {
  const router = useRouter();
  const [plan, setPlan] = useState(customer.subscription.plan);
  const [qty, setQty] = useState(customer.subscription.quantityMl / 500);

  const selectedPlan = PLANS.find((p) => p.id === plan)!;
  const quantityMl = qty * 500;
  const monthly = Math.round((quantityMl / 1000) * selectedPlan.price * 30);

  const handleSave = () => {
    toast.success("Subscription updated successfully!");
    router.back();
  };

  return (
    <motion.div
      className="flex flex-col min-h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button onClick={() => router.back()} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="size-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">Manage Subscription</h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5">
        {/* Plan selection */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">Select Plan</p>
          <motion.div
            className="space-y-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {PLANS.map((p) => (
              <motion.div
                key={p.id}
                variants={planItem}
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => setPlan(p.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all",
                    plan === p.id
                      ? "border-primary bg-accent"
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center size-6 rounded-full border-2 shrink-0 transition-colors",
                    plan === p.id ? "border-primary bg-primary" : "border-border"
                  )}>
                    {plan === p.id && <Check className="size-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-primary shrink-0">₹{p.price}/L</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quantity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Daily Quantity</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{quantityMl}ml</p>
                  <p className="text-xs text-muted-foreground">per day · 6:00 AM delivery</p>
                </div>
                <QuantitySelector value={qty} onChange={setQty} min={1} max={4} step={1} unit="×500ml" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Card className="border-0 shadow-sm bg-accent">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground">Estimated monthly charge</p>
              <p className="text-3xl font-bold text-primary mt-1">₹{monthly.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {quantityMl}ml × ₹{selectedPlan.price}/L × 30 days
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Save */}
      <div className="px-4 pb-6 pt-2">
        <motion.div whileTap={{ scale: 0.97 }}>
          <Button onClick={handleSave} className="w-full h-12 text-base font-semibold rounded-xl">
            Save Subscription
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
