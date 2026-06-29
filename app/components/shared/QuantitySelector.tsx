"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 100,
  step = 1,
  unit,
  className,
}: QuantitySelectorProps) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center size-9 rounded-xl border border-border bg-card",
          "text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
        )}
      >
        <Minus className="size-4" />
      </button>

      <span className="min-w-[3.5rem] text-center text-base font-bold text-foreground">
        {value}{unit && <span className="text-xs font-normal text-muted-foreground ml-0.5">{unit}</span>}
      </span>

      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center size-9 rounded-xl border border-border bg-card",
          "text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
        )}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
