import Link from "next/link";
import { MapPin, User, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/shared/StatusBadge";
import routesData from "@/data/routes.json";
import type { Route } from "@/types";

const route = (routesData as Route[])[0];

export default function RoutePage() {
  const total = route.stops.length;
  const delivered = route.stops.filter((s) => s.status === "delivered").length;
  const pct = Math.round((delivered / total) * 100);

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Route Overview */}
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

          <Progress value={pct} className="h-2 rounded-full" />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="size-3" />
              <span>{route.execName}</span>
            </div>
            <span>{delivered} of {total} delivered</span>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <p className="text-sm font-semibold text-foreground">Customer Stops</p>

      <div className="space-y-2">
        {route.stops.map((stop, idx) => (
          <Card key={stop.customerId} className="border-0 shadow-sm">
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
        ))}
      </div>

      {/* CTA to status page */}
      <Link
        href="/delivery/status"
        className="flex items-center justify-between w-full p-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm"
      >
        <span>Update Delivery Status</span>
        <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}
