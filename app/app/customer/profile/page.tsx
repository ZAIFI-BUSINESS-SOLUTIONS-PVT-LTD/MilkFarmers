"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit2, LogOut, Check, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import customersData from "@/data/customers.json";
import type { Customer } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const PLAN_LABELS: Record<string, string> = {
  toned: "Toned Milk",
  full_cream: "Full Cream",
  a2_gir: "A2 Gir",
};

const original = (customersData as Customer[])[0];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cardItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};

export default function ProfilePage() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [flat, setFlat] = useState(original.flat);
  const [building, setBuilding] = useState(original.building);
  const [area, setArea] = useState(original.area);
  const [pincode, setPincode] = useState(original.pincode);

  const initials = original.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const handleSave = () => {
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    toast.info("Logged out");
    router.replace("/customer/splash");
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
        <button onClick={() => router.back()} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-bold flex-1">My Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <Edit2 className="size-3.5" />
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="flex-1 px-4 py-6 space-y-4">
        {/* Avatar */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        >
          <Avatar className="size-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{original.name}</p>
            <p className="text-sm text-muted-foreground">+91 {original.phone}</p>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Personal Details */}
          <motion.div variants={cardItem}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Personal Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{original.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{original.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Delivery Address */}
          <motion.div variants={cardItem}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Delivery Address</p>

                <AnimatePresence mode="wait">
                  {editing ? (
                    <motion.div
                      key="editing"
                      className="space-y-2.5"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Flat / Door No.</p>
                        <Input value={flat} onChange={(e) => setFlat(e.target.value)} className="h-10 rounded-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Building / Society</p>
                        <Input value={building} onChange={(e) => setBuilding(e.target.value)} className="h-10 rounded-xl" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Area</p>
                          <Input value={area} onChange={(e) => setArea(e.target.value)} className="h-10 rounded-xl" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Pincode</p>
                          <Input value={pincode} onChange={(e) => setPincode(e.target.value)} className="h-10 rounded-xl" maxLength={6} />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button onClick={handleSave} className="flex-1 h-10 rounded-xl gap-1.5">
                          <Check className="size-4" /> Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditing(false)} className="flex-1 h-10 rounded-xl gap-1.5">
                          <X className="size-4" /> Cancel
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="viewing"
                      className="space-y-0.5"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-sm text-foreground">{flat}, {building}</p>
                      <p className="text-sm text-muted-foreground">{area} – {pincode}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subscription Summary */}
          <motion.div variants={cardItem}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subscription</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {PLAN_LABELS[original.subscription.plan] ?? original.subscription.plan}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Daily Qty</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{original.subscription.quantityMl}ml</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rate</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">₹{original.subscription.pricePerLitre}/L</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {new Date(original.joinDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItem}>
            <Separator />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors py-1 mt-2"
            >
              <LogOut className="size-4" />
              Log Out
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
