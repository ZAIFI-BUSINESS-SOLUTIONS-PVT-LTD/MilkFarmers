import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";
import routesData from "@/data/routes.json";
import type { Route } from "@/types";

const route = (routesData as Route[])[0];

export default function CustomersPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Customer Stops" />

      <div className="space-y-2">
        {route.stops.map((stop, idx) => (
          <Card key={stop.customerId} className="border-0 shadow-sm rounded-2xl">
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
