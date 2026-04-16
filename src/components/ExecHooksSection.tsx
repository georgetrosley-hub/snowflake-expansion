"use client";

import { Target } from "lucide-react";
import type { AccountConfig } from "@/types";

/** Exec triggers embedded in account overview (replaces standalone tab). */
export function ExecHooksSection({ account }: { account: AccountConfig }) {
  return (
    <div className="border-t border-sf-border px-6 py-8 md:px-8">
      <div className="mb-4">
        <p className="text-sf-eyebrow font-semibold uppercase text-sf-foreground-muted">Exec hooks</p>
        <p className="mt-1 text-xs text-sf-foreground-muted">
          Use as “why now” — lead with the trigger, not the product.
        </p>
      </div>

      <div className="space-y-3">
        {account.execTriggers.map((trigger) => (
          <div
            key={trigger}
            className="flex gap-4 rounded-xl border border-sf-border bg-sf-surface px-4 py-3 shadow-panel"
          >
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-sf-border bg-sf-surface-muted"
              style={{ color: account.color }}
              aria-hidden="true"
            >
              <Target className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-sf-foreground">{trigger}</div>
              <div className="mt-0.5 text-xs text-sf-foreground-muted">
                Search{" "}
                <span className="font-semibold text-sf-foreground">
                  {`"[Account] + ${trigger.split(" ").slice(0, 3).join(" ")}"`}
                </span>{" "}
                on Google News / LinkedIn before outreach.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
