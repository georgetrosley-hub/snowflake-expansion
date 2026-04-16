"use client";

import type { AccountConfig } from "@/types";
import { TerritoryGlyph } from "@/components/icons/TerritoryGlyph";

const TIER_HEADINGS: Record<AccountConfig["tier"], string> = {
  1: "Tier 1 · Primary focus",
  2: "Tier 2 · Active expansion",
  3: "Tier 3 · Monitor / opportunistic"
};

export function LandingView({
  accounts,
  onSelectAccount
}: {
  accounts: AccountConfig[];
  onSelectAccount: (id: string) => void;
}) {
  const byTier = [1, 2, 3].map((tier) => ({
    tier: tier as AccountConfig["tier"],
    items: accounts.filter((a) => a.tier === tier).sort((a, b) => a.name.localeCompare(b.name))
  }));

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
        <p className="mt-8 border-l-2 border-sf-border pl-4 text-sm text-sf-foreground-muted">
          Each motion starts with one workload, one proof point, and expands from there
        </p>
      </div>

      <div className="mx-auto mt-12 w-full max-w-xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
          Accounts
        </div>
        <div className="mt-4 flex flex-col gap-8">
          {byTier.map(({ tier, items }) =>
            items.length === 0 ? null : (
              <div key={tier}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sf-foreground-muted/90">
                  {TIER_HEADINGS[tier]}
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  {items.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => onSelectAccount(a.id)}
                      className="group flex w-full items-center gap-3 rounded-lg border border-sf-border bg-white px-4 py-3 text-left text-sm text-sf-foreground shadow-panel transition hover:border-slate-300"
                    >
                      <TerritoryGlyph iconKey={a.iconKey} className="shrink-0 text-sf-foreground-muted" size={18} />
                      <span className="flex-1 font-medium">{a.name}</span>
                      <span
                        className="h-2 w-2 shrink-0 rounded-full opacity-60 transition group-hover:opacity-100"
                        style={{ backgroundColor: a.color }}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
