import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "@/types";

interface RouteCardProps {
  route: Route;
  onClick?: () => void;
  className?: string;
}

export default function RouteCard({ route, onClick, className }: RouteCardProps) {
  const total = route.stops.length;
  const delivered = route.stops.filter((s) => s.status === "delivered").length;
  const pct = total > 0 ? Math.round((delivered / total) * 100) : 0;

  return (
    <Card
      className={cn("border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow", className)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">{route.name}</p>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span>{route.area}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-primary bg-accent px-2 py-0.5 rounded-full">
            {pct}%
          </span>
        </div>

        <div className="mt-3">
          <Progress value={pct} className="h-1.5" />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="size-3" />
              <span>{route.execName}</span>
            </div>
            <span>{delivered}/{total} delivered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
