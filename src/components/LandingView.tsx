"use client";

import type { AccountConfig } from "@/types";
import { AccountListByTier } from "@/components/AccountListByTier";

export function LandingView({
  accounts,
  onSelectAccount
}: {
  accounts: AccountConfig[];
  onSelectAccount: (id: string) => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-sf-foreground md:text-4xl">
          Expansion Territory Operating Plan
        </h1>
        <div className="mt-6 space-y-3 text-sm leading-relaxed text-sf-foreground-muted">
          <p>Data exists across these accounts, but it is not operationalized at decision speed.</p>
          <p>Snowflake is present, but not the operating layer.</p>
        </div>
        <p className="mt-8 border-l-4 border-sf-primary/40 pl-4 text-sm text-sf-foreground-muted">
          Each motion starts with one workload, one proof point, and expands from there
        </p>
      </div>

      <div className="mx-auto mt-12 w-full max-w-xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
          Accounts
        </div>
        <div className="mt-4">
          <AccountListByTier
            accounts={accounts}
            selectedAccountId={null}
            onSelectAccount={onSelectAccount}
            variant="landing"
          />
        </div>
      </div>
    </div>
  );
}
