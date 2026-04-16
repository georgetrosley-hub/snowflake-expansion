"use client";

import type { AccountConfig, TabKey } from "@/types";
import { AccountGlyph } from "@/components/icons/AccountGlyph";

const TABS: TabKey[] = ["territory", "deal-view", "personas", "usecases", "demo", "outreach", "exec-triggers"];

const TAB_LABELS: Record<TabKey, string> = {
  territory: "Territory",
  "deal-view": "Deal View",
  personas: "Stakeholders",
  usecases: "Wedges",
  demo: "Demo",
  outreach: "Touch",
  "exec-triggers": "Exec Triggers"
};

/** Sticky tab bar; account identity lives in Account Overview above. */
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
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-sf-border bg-sf-surface-muted text-sf-foreground-muted shadow-panel"
            aria-hidden="true"
          >
            <AccountGlyph size={18} />
          </div>
          <div className="min-w-0 text-xs text-sf-foreground-muted">
            <span className="font-medium text-sf-foreground">Territory run</span>
            <span className="mx-1.5 text-slate-300">·</span>
            <span className="truncate">{breadcrumb}</span>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: account.color }} />
          <div className="text-xs text-sf-foreground-muted">Everything below is this account</div>
        </div>
      </div>

      <div className="flex items-end gap-1 overflow-x-auto border-t border-sf-border/80 bg-sf-surface-muted/50 px-4 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => {
          const selected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={[
                "relative shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-medium transition",
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
