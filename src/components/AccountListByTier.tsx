"use client";

import type { AccountConfig } from "@/types";
import { AccountGlyph } from "@/components/icons/AccountGlyph";
import { TIER_HEADINGS, TIER_ORDER } from "@/lib/accountTier";

type Variant = "landing" | "sidebar";

export function AccountListByTier({
  accounts,
  selectedAccountId,
  onSelectAccount,
  variant
}: {
  accounts: AccountConfig[];
  selectedAccountId: string | null;
  onSelectAccount: (id: string) => void;
  variant: Variant;
}) {
  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    items: accounts.filter((a) => a.tier === tier).sort((a, b) => a.name.localeCompare(b.name))
  }));

  return (
    <div className="flex flex-col gap-5">
      {byTier.map(({ tier, items }) =>
        items.length === 0 ? null : (
          <div key={tier}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sf-foreground-muted/90">
              {TIER_HEADINGS[tier]}
            </div>
            <div className="mt-2 flex flex-col gap-1">
              {items.map((a) => {
                const selected = selectedAccountId === a.id;
                if (variant === "landing") {
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => onSelectAccount(a.id)}
                      className="group flex w-full items-center gap-3 rounded-xl border border-sf-border bg-sf-surface px-4 py-3 text-left text-sm text-sf-foreground shadow-panel transition duration-150 hover:border-sf-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <AccountGlyph className="shrink-0 opacity-90" size={18} />
                      <span className="flex-1 font-medium">{a.name}</span>
                      <span
                        className="h-2 w-2 shrink-0 rounded-full opacity-60 transition group-hover:opacity-100"
                        style={{ backgroundColor: a.color }}
                        aria-hidden="true"
                      />
                    </button>
                  );
                }
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => onSelectAccount(a.id)}
                    className={[
                      "group relative flex w-full items-center gap-2 rounded-xl py-2 pl-3 pr-2 text-left text-sm transition duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sf-surface-muted",
                      selected
                        ? "bg-white text-sf-foreground shadow-panel ring-1 ring-sf-border"
                        : "text-sf-foreground-muted hover:bg-white/80 hover:text-sf-foreground"
                    ].join(" ")}
                  >
                    <span
                      className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full transition-opacity"
                      style={{
                        backgroundColor: a.color,
                        opacity: selected ? 1 : 0
                      }}
                      aria-hidden="true"
                    />
                    <AccountGlyph className="shrink-0 opacity-90" size={18} />
                    <span className="flex-1 pl-1">{a.name}</span>
                    <span
                      className={[
                        "h-2 w-2 shrink-0 rounded-full transition",
                        selected ? "" : "opacity-0 group-hover:opacity-50"
                      ].join(" ")}
                      style={{ backgroundColor: a.color }}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
}
