"use client";

import type { AccountConfig, MotionKey, Persona } from "@/types";
import { TerritoryGlyph } from "@/components/icons/TerritoryGlyph";

const MOTIONS: MotionKey[] = [
  "Mix of all three",
  "New persona outreach",
  "Exec escalation",
  "Use case mapping"
];

const TIER_HEADINGS: Record<AccountConfig["tier"], string> = {
  1: "Tier 1 · Primary focus",
  2: "Tier 2 · Active expansion",
  3: "Tier 3 · Monitor / opportunistic"
};

function stepState(hasPersona: boolean, hasUseCase: boolean) {
  if (!hasPersona) return 1;
  if (!hasUseCase) return 2;
  return 3;
}

export function Sidebar({
  accounts,
  selectedAccount,
  onAccountSelect,
  motion,
  onMotionSelect,
  selectedPersona,
  selectedUseCaseId
}: {
  accounts: AccountConfig[];
  selectedAccount: AccountConfig | null;
  onAccountSelect: (id: string) => void;
  motion: MotionKey;
  onMotionSelect: (motion: MotionKey) => void;
  selectedPersona: Persona | null;
  selectedUseCaseId: string | null;
}) {
  const currentStep = stepState(Boolean(selectedPersona), Boolean(selectedUseCaseId));

  const byTier = [1, 2, 3].map((tier) => ({
    tier: tier as AccountConfig["tier"],
    items: accounts.filter((a) => a.tier === tier).sort((a, b) => a.name.localeCompare(b.name))
  }));

  return (
    <aside className="flex h-full flex-col border-r border-sf-border bg-sf-surface-muted p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        Accounts
      </div>

      <div className="mt-3 flex flex-col gap-5">
        {byTier.map(({ tier, items }) =>
          items.length === 0 ? null : (
            <div key={tier}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sf-foreground-muted/90">
                {TIER_HEADINGS[tier]}
              </div>
              <div className="mt-2 flex flex-col gap-1">
                {items.map((a) => {
                  const selected = selectedAccount?.id === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => onAccountSelect(a.id)}
                      className={[
                        "group relative flex w-full items-center gap-2 rounded-lg py-2 pl-3 pr-2 text-left text-sm transition",
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
                      <TerritoryGlyph iconKey={a.iconKey} className="shrink-0 text-sf-foreground-muted" size={18} />
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

      <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-sf-foreground">Progress</div>
          <div className="text-[11px] text-sf-foreground-muted">Step {currentStep} of 3</div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
          {[
            { label: "Persona", done: Boolean(selectedPersona) },
            { label: "Use case", done: Boolean(selectedUseCaseId) },
            { label: "Outreach", done: Boolean(selectedPersona && selectedUseCaseId) }
          ].map((s, idx) => (
            <div
              key={s.label}
              className={[
                "rounded-lg border px-2 py-2 text-center font-medium",
                s.done
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : idx + 1 === currentStep
                    ? "border-sky-200 bg-sky-50 text-sky-900"
                    : "border-sf-border bg-sf-surface-muted text-sf-foreground-muted"
              ].join(" ")}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {selectedAccount ? (
        <>
          <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            Motion
          </div>

          <div className="mt-3 flex flex-col gap-1">
            {MOTIONS.map((m) => {
              const selected = motion === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => onMotionSelect(m)}
                  className={[
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                    selected
                      ? "bg-white font-medium text-sf-foreground shadow-panel ring-1 ring-sf-border"
                      : "text-sf-foreground-muted hover:bg-white/80 hover:text-sf-foreground"
                  ].join(" ")}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {selectedPersona ? (
            <div
              className="mt-6 rounded-xl border p-3"
              style={{
                borderColor: `${selectedAccount.color}44`,
                backgroundColor: `${selectedAccount.color}0d`
              }}
            >
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: selectedAccount.color }}
              >
                Selected persona
              </div>
              <div className="mt-1 text-sm font-semibold text-sf-foreground">{selectedPersona.title}</div>
              <div className="mt-0.5 text-xs text-sf-foreground-muted">
                {selectedPersona.dept} · {selectedPersona.level}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
              Pick a persona to unlock the demo recipe and outreach flow.
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
          Choose an account to load territory context.
        </div>
      )}

      <div className="mt-auto pt-6 text-xs text-sf-foreground-muted">
        Territory console — account → persona → demo → outreach.
      </div>
    </aside>
  );
}
