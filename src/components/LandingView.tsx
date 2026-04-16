"use client";

import { ArrowRight } from "lucide-react";
import type { AccountConfig } from "@/types";
import { AccountGlyph } from "@/components/icons/AccountGlyph";

const TIER_LABELS: Record<AccountConfig["tier"], string> = {
  1: "Tier 1",
  2: "Tier 2",
  "2B": "Tier 2B",
  3: "Tier 3"
};

const TIER_ORDER: AccountConfig["tier"][] = [1, 2, "2B", 3];

export function LandingView({
  accounts,
  onSelectAccount
}: {
  accounts: AccountConfig[];
  onSelectAccount: (id: string) => void;
}) {
  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    items: accounts.filter((account) => account.tier === tier).sort((a, b) => a.name.localeCompare(b.name))
  }));

  return (
    <div className="min-h-[calc(100vh-73px)] bg-white px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            Expansion workspace
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-sf-foreground md:text-4xl">
            Choose the account.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sf-foreground-muted">
            Each account opens with a recommended stakeholder, wedge, demo, and touch ready to tune.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {byTier.map(({ tier, items }) =>
            items.length === 0 ? null : (
              <section key={tier}>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                  {TIER_LABELS[tier]}
                </div>
                <div className="grid gap-2">
                  {items.map((account) => {
                    const persona = account.personas.find(
                      (item) => item.id === account.primaryMotion.personaId
                    );
                    const useCase = account.useCases.find(
                      (item) => item.id === account.primaryMotion.useCaseId
                    );
                    return (
                      <button
                        key={account.id}
                        type="button"
                        onClick={() => onSelectAccount(account.id)}
                        className="group rounded-lg border border-sf-border bg-white px-4 py-3 text-left shadow-panel transition hover:border-slate-300 hover:bg-sf-surface-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-sf-border bg-sf-surface-muted"
                            style={{ color: account.color }}
                            aria-hidden="true"
                          >
                            <AccountGlyph size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <div className="truncate text-base font-semibold text-sf-foreground">
                                {account.name}
                              </div>
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: account.color }}
                                aria-hidden="true"
                              />
                            </div>
                            <div className="mt-1 truncate text-xs text-sf-foreground-muted">
                              {persona?.title ?? account.pipelineSnapshot.firstMeetingTarget}
                              {" - "}
                              {useCase?.title ?? account.primaryMotion.demoLabel}
                            </div>
                          </div>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-sf-foreground-muted opacity-0 transition group-hover:opacity-100"
                            aria-hidden
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )
          )}
        </div>
      </div>
    </div>
  );
}
