"use client";

import { useState } from "react";
import { Check, SkipForward } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import routesData from "@/data/routes.json";
import type { Route, DeliveryStatus } from "@/types";

const route = (routesData as Route[])[0];

type StopState = { status: DeliveryStatus; skipReason?: string };

const initial: Record<string, StopState> = Object.fromEntries(
  route.stops.map((s) => [s.customerId, { status: s.status as DeliveryStatus }])
);

const SKIP_REASONS = ["Customer absent", "Gate locked", "Wrong address", "Customer request", "Other"];

export default function DeliveryStatusPage() {
  const [stops, setStops] = useState<Record<string, StopState>>(initial);
  const [submitted, setSubmitted] = useState(false);

  const delivered = Object.values(stops).filter((s) => s.status === "delivered").length;
  const total = route.stops.length;
  const pct = Math.round((delivered / total) * 100);

  const mark = (id: string, status: DeliveryStatus) =>
    setStops((prev) => ({ ...prev, [id]: { ...prev[id], status } }));

  const setReason = (id: string, reason: string) =>
    setStops((prev) => ({ ...prev, [id]: { ...prev[id], skipReason: reason } }));

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Day report submitted! Great work today.");
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Today&apos;s Progress</p>
            <p className="text-sm font-bold text-primary">{delivered}/{total} delivered</p>
          </div>
          <Progress value={pct} className="h-2.5 rounded-full" />
          <p className="text-xs text-muted-foreground">{pct}% complete</p>
        </CardContent>
      </Card>

      {/* Stop list */}
      <div className="space-y-2">
        {route.stops.map((stop) => {
          const state = stops[stop.customerId];
          return (
            <Card key={stop.customerId} className={cn("border-0 shadow-sm", submitted && "opacity-70")}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{stop.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{stop.address}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stop.plan} · {stop.quantityMl}ml
                    </p>
                  </div>
                </div>

                {!submitted && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => mark(stop.customerId, "delivered")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all border",
                        state.status === "delivered"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-card border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-700"
                      )}
                    >
                      <Check className="size-3.5" />
                      Delivered
                    </button>
                    <button
                      onClick={() => mark(stop.customerId, "skipped")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all border",
                        state.status === "skipped"
                          ? "bg-slate-500 text-white border-slate-500"
                          : "bg-card border-border text-muted-foreground hover:border-slate-400"
                      )}
                    >
                      <SkipForward className="size-3.5" />
                      Skip
                    </button>
                  </div>
                )}

                {state.status === "skipped" && !submitted && (
                  <Select value={state.skipReason ?? ""} onValueChange={(v) => setReason(stop.customerId, v ?? "")}>
                    <SelectTrigger className="h-9 text-xs rounded-xl">
                      <SelectValue placeholder="Select reason for skipping…" />
                    </SelectTrigger>
                    <SelectContent>
                      {SKIP_REASONS.map((r) => (
                        <SelectItem key={r} value={r} className="text-xs">{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {submitted && (
                  <p className={cn(
                    "text-xs font-semibold",
                    state.status === "delivered" ? "text-emerald-600" : "text-slate-500"
                  )}>
                    {state.status === "delivered" ? "✓ Delivered" : `Skipped${state.skipReason ? ` — ${state.skipReason}` : ""}`}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!submitted ? (
        <Button onClick={handleSubmit} className="w-full h-12 font-semibold rounded-xl">
          Submit Day Report
        </Button>
      ) : (
        <Card className="border-0 shadow-sm bg-emerald-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-bold text-emerald-700">Day report submitted!</p>
            <p className="text-xs text-emerald-600 mt-0.5">Great work today, {route.execName}.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
