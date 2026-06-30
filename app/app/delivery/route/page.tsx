"use client";

import Link from "next/link";
import { MapPin, User, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import routesData from "@/data/routes.json";
import type { Route } from "@/types";
import { motion } from "framer-motion";

const route = (routesData as Route[])[0];

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function RoutePage() {
  const total = route.stops.length;
  const delivered = route.stops.filter((s) => s.status === "delivered").length;
  const pct = Math.round((delivered / total) * 100);

  return (
    <motion.div
      className="px-4 py-4 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Route Overview */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-bold text-foreground">{route.name}</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  <span>{route.area}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-primary bg-accent px-2.5 py-1 rounded-full">
                {pct}% done
              </span>
            </div>

            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="size-3" />
                <span>{route.execName}</span>
              </div>
              <span>{delivered} of {total} delivered</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customer List */}
      <p className="text-sm font-semibold text-foreground">Customer Stops</p>

      <motion.div
        className="space-y-2"
        variants={listContainer}
        initial="hidden"
        animate="show"
      >
        {route.stops.map((stop, idx) => (
          <motion.div key={stop.customerId} variants={listItem}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-7 rounded-full bg-muted text-xs font-bold text-muted-foreground shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{stop.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{stop.address}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stop.plan} · {stop.quantityMl}ml
                    </p>
                  </div>
                  <StatusBadge status={stop.status} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA to status page */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Link
          href="/delivery/customers"
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm"
        >
          <span>View Customer List</span>
          <ChevronRight className="size-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
