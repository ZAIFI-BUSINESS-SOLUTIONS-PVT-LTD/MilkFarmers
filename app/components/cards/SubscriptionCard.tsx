import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import type { Subscription } from "@/types";

const PLAN_LABELS: Record<string, string> = {
  toned: "Toned Milk",
  full_cream: "Full Cream",
  a2_gir: "A2 Gir",
};

interface SubscriptionCardProps {
  subscription: Subscription;
  className?: string;
}

export default function SubscriptionCard({ subscription, className }: SubscriptionCardProps) {
  const { plan, quantityMl, pricePerLitre, status } = subscription;
  const monthlyAmount = Math.round((quantityMl / 1000) * pricePerLitre * 30);

  return (
    <Card className={cn("border-0 shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-semibold text-foreground">{PLAN_LABELS[plan] ?? plan}</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {quantityMl >= 1000 ? `${quantityMl / 1000}L` : `${quantityMl}ml`} daily
              · ₹{pricePerLitre}/L
            </p>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Est. monthly</p>
          <p className="text-lg font-bold text-primary">₹{monthlyAmount.toLocaleString("en-IN")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
