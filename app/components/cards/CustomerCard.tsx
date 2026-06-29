import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import type { Customer } from "@/types";

const PLAN_LABELS: Record<string, string> = {
  toned: "Toned",
  full_cream: "Full Cream",
  a2_gir: "A2 Gir",
};

interface CustomerCardProps {
  customer: Customer;
  onClick?: () => void;
  className?: string;
}

export default function CustomerCard({ customer, onClick, className }: CustomerCardProps) {
  const { name, phone, area, subscription } = customer;
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <Card
      className={cn("border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow", className)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-accent text-primary font-semibold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground truncate">{name}</p>
              <StatusBadge status={subscription.status} />
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{area}</p>
            <p className="text-xs text-muted-foreground">
              {PLAN_LABELS[subscription.plan]} · {subscription.quantityMl}ml · {phone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
