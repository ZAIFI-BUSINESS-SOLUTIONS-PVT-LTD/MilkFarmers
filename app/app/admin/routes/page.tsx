"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import RouteCard from "@/components/cards/RouteCard";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";
import routesData from "@/data/routes.json";
import type { Route } from "@/types";

const EXECS = ["Mohan Das", "Raju Singh", "Prakash Rao", "Sunil Kumar"];

export default function AdminRoutesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Route | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries((routesData as Route[]).map((r) => [r.id, r.execName]))
  );

  const routes = routesData as Route[];
  const filtered = routes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Routes" subtitle={`${routes.length} active routes`} />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by route name or area…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-10 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((route) => (
          <RouteCard
            key={route.id}
            route={{ ...route, execName: assignments[route.id] }}
            onClick={() => setSelected(route)}
          />
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-sm overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>
                  <p className="text-base font-bold">{selected.name}</p>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">{selected.area}</p>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Assign Executive</p>
                  <Select
                    value={assignments[selected.id]}
                    onValueChange={(v) => setAssignments((prev) => ({ ...prev, [selected.id]: v ?? "" }))}
                  >
                    <SelectTrigger className="h-10 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXECS.map((e) => (
                        <SelectItem key={e} value={e}>{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Stops ({selected.stops.length})
                  </p>
                  <div className="space-y-2">
                    {selected.stops.map((stop, idx) => (
                      <div key={stop.customerId} className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-6 rounded-full bg-muted text-xs font-bold text-muted-foreground shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{stop.name}</p>
                          <p className="text-xs text-muted-foreground">{stop.plan} · {stop.quantityMl}ml</p>
                        </div>
                        <StatusBadge status={stop.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
