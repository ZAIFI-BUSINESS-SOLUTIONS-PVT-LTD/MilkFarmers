"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";
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

export default function CustomersPage() {
  return (
    <motion.div
      className="px-4 py-4 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <PageHeader title="Customer Stops" />

      <motion.div
        className="space-y-2"
        variants={listContainer}
        initial="hidden"
        animate="show"
      >
        {route.stops.map((stop, idx) => (
          <motion.div
            key={stop.customerId}
            variants={listItem}
            whileHover={{ x: 4 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl">
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

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Link
          href="/delivery/status"
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm"
        >
          <span>Update Delivery Status</span>
          <ChevronRight className="size-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
