"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QuantitySelector from "@/components/shared/QuantitySelector";
import EmptyState from "@/components/shared/EmptyState";
import { toast } from "sonner";
import ordersData from "@/data/orders.json";
import type { Order } from "@/types";

const products = ordersData as Order[];

export default function ExtraOrderPage() {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [confirmed, setConfirmed] = useState(false);

  const setQty = (id: string, val: number) =>
    setQuantities((prev) => ({ ...prev, [id]: val }));

  const cartItems = products.filter((p) => (quantities[p.id] ?? 0) > 0);
  const total = cartItems.reduce((sum, p) => sum + (quantities[p.id] ?? 0) * p.pricePerUnit, 0);

  const handleConfirm = () => {
    setConfirmed(true);
    toast.success("Extra order placed! Delivered tomorrow by 6 AM.");
    setTimeout(() => router.replace("/customer/home"), 1500);
  };

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full gap-4 px-6">
        <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <ShoppingBag className="size-8 text-emerald-600" />
        </div>
        <p className="text-lg font-bold text-foreground">Order Confirmed!</p>
        <p className="text-sm text-muted-foreground text-center">Redirecting to home…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button onClick={() => router.back()} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-bold">Extra Order</h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 pb-40">
        <p className="text-sm text-muted-foreground">Add items for tomorrow's delivery</p>

        {products.map((product) => {
          const qty = quantities[product.id] ?? 0;
          return (
            <Card key={product.id} className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.unit} · ₹{product.pricePerUnit}</p>
                </div>
                {qty === 0 ? (
                  <button
                    onClick={() => setQty(product.id, 1)}
                    className="text-xs font-semibold text-primary border border-primary rounded-lg px-3 py-1.5 hover:bg-accent transition-colors"
                  >
                    Add
                  </button>
                ) : (
                  <QuantitySelector
                    value={qty}
                    onChange={(v) => setQty(product.id, v)}
                    min={0}
                    max={10}
                    step={1}
                  />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Order Summary */}
      {cartItems.length === 0 ? null : (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-3">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Order Summary</p>
              <div className="space-y-1.5 mb-3">
                {cartItems.map((p) => (
                  <div key={p.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{p.name} × {quantities[p.id]}</span>
                    <span className="font-medium">₹{(quantities[p.id] ?? 0) * p.pricePerUnit}</span>
                  </div>
                ))}
              </div>
              <Separator className="mb-3" />
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-lg font-bold text-primary">₹{total}</span>
              </div>
              <Button onClick={handleConfirm} className="w-full h-11 font-semibold rounded-xl">
                Confirm Order
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {cartItems.length === 0 && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center px-4 pb-4">
          <EmptyState
            icon={ShoppingBag}
            title="No items selected"
            description="Tap Add next to any item to build your order"
          />
        </div>
      )}
    </div>
  );
}
