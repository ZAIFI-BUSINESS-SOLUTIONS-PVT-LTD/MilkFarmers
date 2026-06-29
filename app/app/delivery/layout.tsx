import DeliveryShell from "@/components/shells/DeliveryShell";
import DeliveryGuard from "@/components/shells/DeliveryGuard";

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeliveryGuard>
      <DeliveryShell>{children}</DeliveryShell>
    </DeliveryGuard>
  );
}
