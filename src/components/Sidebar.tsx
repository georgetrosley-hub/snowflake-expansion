"use client";

import type { AccountConfig, MotionKey } from "@/types";
import { AccountGlyph } from "@/components/icons/AccountGlyph";
import { MOTION_DISPLAY } from "@/lib/motionLabels";

const MOTIONS: MotionKey[] = [
  "Mix of all three",
  "New persona outreach",
  "Exec escalation",
  "Use case mapping"
];

const TIER_LABELS: Record<AccountConfig["tier"], string> = {
  1: "Tier 1",
  2: "Tier 2",
  "2B": "Tier 2B",
  3: "Tier 3"
};

const TIER_ORDER: AccountConfig["tier"][] = [1, 2, "2B", 3];

export function Sidebar({
  accounts,
  selectedAccount,
  onAccountSelect,
  motion,
  onMotionSelect
}: {
  accounts: AccountConfig[];
  selectedAccount: AccountConfig | null;
  onAccountSelect: (id: string) => void;
  motion: MotionKey;
  onMotionSelect: (motion: MotionKey) => void;
}) {
  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    items: accounts.filter((account) => account.tier === tier).sort((a, b) => a.name.localeCompare(b.name))
  }));

  return (
    <aside className="border-b border-sf-border bg-white p-3 md:sticky md:top-0 md:h-[calc(100vh-73px)] md:overflow-y-auto md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
          Accounts
        </div>
        <div className="text-xs font-medium text-sf-foreground-muted">{accounts.length}</div>
      </div>

      <div className="mt-3 space-y-4">
        {byTier.map(({ tier, items }) =>
          items.length === 0 ? null : (
            <div key={tier}>
              <div className="px-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sf-foreground-muted">
                {TIER_LABELS[tier]}
              </div>
              <div className="mt-1 grid gap-1">
                {items.map((account) => {
                  const selected = selectedAccount?.id === account.id;
                  return (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => onAccountSelect(account.id)}
                      className={[
                        "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        selected
                          ? "bg-sf-surface-muted font-semibold text-sf-foreground ring-1 ring-sf-border"
                          : "text-sf-foreground-muted hover:bg-sf-surface-muted hover:text-sf-foreground"
                      ].join(" ")}
                    >
                      <AccountGlyph className="shrink-0 opacity-80" size={17} />
                      <span className="min-w-0 flex-1 truncate">{account.name}</span>
                      <span
                        className={[
                          "h-2 w-2 shrink-0 rounded-full transition",
                          selected ? "opacity-100" : "opacity-30 group-hover:opacity-70"
                        ].join(" ")}
                        style={{ backgroundColor: account.color }}
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

      {selectedAccount ? (
        <div className="mt-6 border-t border-sf-border pt-5">
          <div className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            Touch style
          </div>
          <div className="mt-2 grid gap-1">
            {MOTIONS.map((item) => {
              const selected = motion === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onMotionSelect(item)}
                  className={[
                    "rounded-lg px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    selected
                      ? "bg-sf-foreground font-semibold text-white"
                      : "text-sf-foreground-muted hover:bg-sf-surface-muted hover:text-sf-foreground"
                  ].join(" ")}
                >
                  {MOTION_DISPLAY[item]}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
