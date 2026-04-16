"use client";

import { Target } from "lucide-react";
import type { AccountConfig } from "@/types";

export function ExecTriggersPanel({ account }: { account: AccountConfig }) {
  return (
    <div className="animate-fade-in space-y-3">
      <div className="mb-2">
        <div className="text-sm font-semibold text-sf-foreground">Exec triggers</div>
        <div className="text-xs text-sf-foreground-muted">
          Use these as “why now” hooks. Lead with the trigger, not the product.
        </div>
      </div>

      {account.execTriggers.map((trigger) => (
        <div key={trigger} className="flex gap-4 rounded-xl border border-sf-border bg-white p-4 shadow-panel">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-sf-border bg-sf-surface-muted"
            style={{ color: account.color }}
            aria-hidden="true"
          >
            <Target className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-sf-foreground">{trigger}</div>
            <div className="mt-1 text-xs text-sf-foreground-muted">
              Search{" "}
              <span className="font-semibold text-sf-foreground">
                {`"[Account] + ${trigger.split(" ").slice(0, 3).join(" ")}"`}
              </span>{" "}
              on Google News and LinkedIn before outreach.
            </div>
          </div>
        </div>
      ))}

      <div className="mt-3 rounded-xl border border-sf-border bg-sf-surface-muted p-4 text-sm text-sf-foreground-muted">
        If you find a match on any of these triggers, that’s your reason to reach out today instead of next
        week.
      </div>
    </div>
  );
}
