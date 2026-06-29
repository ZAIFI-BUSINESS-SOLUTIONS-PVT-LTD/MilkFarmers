import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "active" | "paused" | "churned" | "delivered" | "pending" | "skipped" | "paid" | "failed";

const CONFIG: Record<Status, { label: string; className: string }> = {
  active:    { label: "Active",    className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  paused:    { label: "Paused",    className: "bg-amber-100 text-amber-700 border-amber-200" },
  churned:   { label: "Churned",   className: "bg-red-100 text-red-700 border-red-200" },
  delivered: { label: "Delivered", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  pending:   { label: "Pending",   className: "bg-blue-100 text-blue-700 border-blue-200" },
  skipped:   { label: "Skipped",   className: "bg-slate-100 text-slate-600 border-slate-200" },
  paid:      { label: "Paid",      className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  failed:    { label: "Failed",    className: "bg-red-100 text-red-700 border-red-200" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = CONFIG[status as Status] ?? { label: status, className: "bg-muted text-muted-foreground" };
  return (
    <Badge
      variant="outline"
      className={cn("text-[0.65rem] font-semibold px-1.5 py-0 border capitalize shrink-0", cfg.className, className)}
    >
      {cfg.label}
    </Badge>
  );
}
