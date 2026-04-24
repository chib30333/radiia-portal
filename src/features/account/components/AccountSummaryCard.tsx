import { Card } from "@/components/ui/card";
import type { CustomerAccount } from "@/types/account";

type AccountSummaryCardProps = {
  account: CustomerAccount;
};

export function AccountSummaryCard({ account }: AccountSummaryCardProps) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{account.companyName}</p>
        <p className="text-sm text-muted-foreground">{account.buyerName}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-muted p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Tier</p>
          <p className="mt-1 font-medium text-foreground">{account.tier}</p>
        </div>
        <div className="rounded-2xl bg-muted p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Currency</p>
          <p className="mt-1 font-medium text-foreground">{account.currency}</p>
        </div>
        <div className="rounded-2xl bg-muted p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Status</p>
          <p className="mt-1 font-medium text-success">Active account</p>
        </div>
      </div>
    </Card>
  );
}
