"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  error?: boolean;
  className?: string;
}

export default function OTPInput({ value, onChange, length = 4, error, className }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const handleChange = (index: number, char: string) => {
    const cleaned = char.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, i) => (i === index ? cleaned : d)).join("");
    onChange(next);
    if (cleaned && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted.padEnd(length, "").slice(0, length).replace(/\s/g, ""));
    if (pasted.length > 0) {
      const focusIdx = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIdx]?.focus();
    }
  };

  return (
    <div className={cn("flex gap-3", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "flex-1 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-card outline-none transition-colors",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error
              ? "border-destructive text-destructive focus:border-destructive focus:ring-destructive/20"
              : digits[i]
              ? "border-primary text-primary"
              : "border-border text-foreground"
          )}
        />
      ))}
    </div>
  );
}
