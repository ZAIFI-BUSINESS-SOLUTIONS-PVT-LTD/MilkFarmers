"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PauseCircle, PlayCircle, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import customersData from "@/data/customers.json";
import type { Customer } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const customer = (customersData as Customer[])[0];
const isPaused = customer.subscription.status === "paused";

type Step = "action" | "start-date" | "end-date" | "confirm";

export default function PausePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("action");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (d?: Date) =>
    d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  const diffDays = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)
    : 0;

  const handleResume = () => {
    toast.success("Subscription resumed! Deliveries restart tomorrow.");
    router.replace("/customer/home");
  };

  const handlePauseConfirm = () => {
    toast.success(`Subscription paused from ${formatDate(startDate)} to ${formatDate(endDate)}.`);
    router.replace("/customer/home");
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
        <button
          onClick={() => (step === "action" ? router.back() : setStep("action"))}
          className="p-1.5 rounded-lg hover:bg-muted"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-bold">
          {step === "action" ? "Pause / Resume" : step === "start-date" ? "Select Start Date" : step === "end-date" ? "Select End Date" : "Confirm Pause"}
        </h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <AnimatePresence mode="wait">
          {step === "action" && (
            <motion.div
              key="action"
              className="space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isPaused ? (
                <Card className="border-0 shadow-sm bg-amber-50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <PauseCircle className="size-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Subscription is paused</p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Paused from {formatDate(customer.subscription.pauseFrom ? new Date(customer.subscription.pauseFrom) : undefined)} to {formatDate(customer.subscription.pauseTo ? new Date(customer.subscription.pauseTo) : undefined)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <motion.button
                onClick={() => setStep("start-date")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary/40 text-left transition-all"
              >
                <div className="size-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <PauseCircle className="size-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Pause Subscription</p>
                  <p className="text-xs text-muted-foreground">Temporarily stop deliveries</p>
                </div>
              </motion.button>

              {isPaused && (
                <motion.button
                  onClick={handleResume}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary/40 text-left transition-all"
                >
                  <div className="size-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <PlayCircle className="size-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Resume Subscription</p>
                    <p className="text-xs text-muted-foreground">Restart your daily deliveries</p>
                  </div>
                </motion.button>
              )}
            </motion.div>
          )}

          {step === "start-date" && (
            <motion.div
              key="start-date"
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-muted-foreground">When should the pause begin?</p>
              <Card className="border-0 shadow-sm flex justify-center">
                <CardContent className="p-2">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(d) => d < today}
                    className="rounded-xl"
                  />
                </CardContent>
              </Card>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setStep("end-date")}
                  disabled={!startDate}
                  className="w-full h-12 font-semibold rounded-xl"
                >
                  Next: Select End Date
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === "end-date" && (
            <motion.div
              key="end-date"
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-muted-foreground">When should deliveries resume?</p>
              <Card className="border-0 shadow-sm flex justify-center">
                <CardContent className="p-2">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(d) => !startDate || d <= startDate}
                    className="rounded-xl"
                  />
                </CardContent>
              </Card>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!endDate}
                  className="w-full h-12 font-semibold rounded-xl"
                >
                  Review Pause
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-amber-50 flex items-center justify-center">
                        <CalendarX className="size-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-foreground">Confirm Pause</p>
                        <p className="text-xs text-muted-foreground">Review your pause schedule</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-muted">
                        <p className="text-xs text-muted-foreground">Start Date</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{formatDate(startDate)}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted">
                        <p className="text-xs text-muted-foreground">End Date</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{formatDate(endDate)}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-xs text-amber-800 font-medium">
                        {diffDays} delivery day{diffDays !== 1 ? "s" : ""} will be skipped. No charges for paused days.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileTap={{ scale: 0.97 }}>
                <Button onClick={handlePauseConfirm} className="w-full h-12 font-semibold rounded-xl">
                  Confirm Pause
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button variant="outline" onClick={() => setStep("action")} className="w-full h-12 font-semibold rounded-xl">
                  Cancel
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
