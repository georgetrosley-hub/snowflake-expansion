"use client";

import type { AccountConfig, TabKey } from "@/types";
import { TerritoryGlyph } from "@/components/icons/TerritoryGlyph";

const TABS: TabKey[] = ["territory", "personas", "usecases", "demo", "outreach", "exec-triggers"];

const TAB_LABELS: Record<TabKey, string> = {
  territory: "Territory",
  personas: "Personas",
  usecases: "Use Cases",
  demo: "Demo Recipe",
  outreach: "Outreach",
  "exec-triggers": "Exec Triggers"
};

const TIER_LABEL: Record<AccountConfig["tier"], string> = {
  1: "Tier 1 · Primary focus",
  2: "Tier 2 · Active expansion",
  3: "Tier 3 · Monitor / opportunistic"
};

export function AccountHeader({
  account,
  activeTab,
  onTabChange,
  breadcrumb
}: {
  account: AccountConfig;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  breadcrumb: string;
}) {
  return (
    <div className="sticky top-0 z-10 border-b border-sf-border bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-sf-border bg-sf-surface-muted text-sf-foreground-muted shadow-panel"
            aria-hidden="true"
          >
            <TerritoryGlyph iconKey={account.iconKey} size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="truncate text-base font-semibold text-sf-foreground">{account.name}</div>
              <span
                className="shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                style={{ borderColor: `${account.color}44`, backgroundColor: `${account.color}12`, color: account.color }}
              >
                {TIER_LABEL[account.tier]}
              </span>
            </div>
            <div className="truncate text-xs text-sf-foreground-muted">{account.industry}</div>
            <div className="truncate text-xs text-sf-foreground-muted">{breadcrumb}</div>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: account.color }} />
          <div className="text-xs text-sf-foreground-muted">Workspace locked to this account</div>
        </div>
      </div>

      <div className="flex items-end gap-1 border-t border-sf-border/80 bg-sf-surface-muted/50 px-4">
        {TABS.map((tab) => {
          const selected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={[
                "relative rounded-t-lg px-4 py-2.5 text-sm font-medium transition",
                selected ? "bg-white text-sf-foreground" : "text-sf-foreground-muted hover:bg-white/60 hover:text-sf-foreground"
              ].join(" ")}
            >
              <span className="relative z-10">{TAB_LABELS[tab]}</span>
              <span
                className={[
                  "absolute inset-x-3 bottom-0 h-0.5 rounded-full transition-opacity",
                  selected ? "opacity-100" : "opacity-0"
                ].join(" ")}
                style={{ backgroundColor: account.color }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
