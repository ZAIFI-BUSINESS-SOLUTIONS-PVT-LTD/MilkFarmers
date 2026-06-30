"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import CustomerCard from "@/components/cards/CustomerCard";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";
import customersData from "@/data/customers.json";
import type { Customer, SubscriptionStatus } from "@/types";
import { motion } from "framer-motion";

const PLAN_LABELS: Record<string, string> = { toned: "Toned", full_cream: "Full Cream", a2_gir: "A2 Gir" };
const FILTERS: { label: string; value: SubscriptionStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
  { label: "Churned", value: "churned" },
];

const PER_PAGE = 6;

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);

  const customers = customersData as Customer[];

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchFilter = filter === "all" || c.subscription.status === filter;
    return matchSearch && matchFilter;
  });

  const paged = filtered.slice(0, page * PER_PAGE);
  const hasMore = filtered.length > paged.length;

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <PageHeader title="Customers" subtitle={`${customers.length} total customers`} />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9 h-10 rounded-xl"
        />
      </div>

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }}>
        <TabsList className="w-full grid grid-cols-4 h-9 rounded-xl">
          {FILTERS.map((f) => (
            <TabsTrigger key={f.value} value={f.value} className="text-xs rounded-lg">
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Customer list */}
      <motion.div
        className="space-y-2"
        variants={listContainer}
        initial="hidden"
        animate="show"
      >
        {paged.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No customers found</p>
        ) : (
          paged.map((c) => (
            <motion.div key={c.id} variants={listItem} whileHover={{ x: 3 }}>
              <CustomerCard customer={c} onClick={() => setSelected(c)} />
            </motion.div>
          ))
        )}
      </motion.div>

      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="w-full text-sm font-medium text-primary py-3 hover:text-primary/80 transition-colors"
        >
          Load more ({filtered.length - paged.length} remaining)
        </button>
      )}

      {/* Detail drawer */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-sm overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                      {selected.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-bold">{selected.name}</p>
                    <p className="text-xs text-muted-foreground font-normal">+91 {selected.phone}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Subscription</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><p className="text-xs text-muted-foreground">Plan</p><p className="font-medium">{PLAN_LABELS[selected.subscription.plan]}</p></div>
                    <div><p className="text-xs text-muted-foreground">Qty</p><p className="font-medium">{selected.subscription.quantityMl}ml</p></div>
                    <div><p className="text-xs text-muted-foreground">Rate</p><p className="font-medium">₹{selected.subscription.pricePerLitre}/L</p></div>
                    <div><p className="text-xs text-muted-foreground">Status</p><StatusBadge status={selected.subscription.status} className="mt-0.5" /></div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Address</p>
                  <p className="text-sm text-foreground">{selected.flat}, {selected.building}</p>
                  <p className="text-sm text-muted-foreground">{selected.area} – {selected.pincode}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Account</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><p className="text-xs text-muted-foreground">Customer ID</p><p className="font-mono font-medium">{selected.id}</p></div>
                    <div><p className="text-xs text-muted-foreground">Route</p><p className="font-medium">{selected.routeId}</p></div>
                    <div><p className="text-xs text-muted-foreground">Member Since</p><p className="font-medium">{new Date(selected.joinDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
