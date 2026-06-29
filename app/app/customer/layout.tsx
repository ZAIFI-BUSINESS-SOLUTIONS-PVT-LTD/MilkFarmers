import CustomerShell from "@/components/shells/CustomerShell";
import CustomerGuard from "@/components/shells/CustomerGuard";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomerGuard>
      <CustomerShell>{children}</CustomerShell>
    </CustomerGuard>
  );
}
