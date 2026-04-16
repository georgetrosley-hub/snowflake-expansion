"use client";

import type { AccountConfig, MotionKey, Persona } from "@/types";
import { MOTION_DISPLAY } from "@/lib/motionLabels";
import { AccountListByTier } from "@/components/AccountListByTier";

const MOTIONS: MotionKey[] = [
  "Mix of all three",
  "New persona outreach",
  "Exec escalation",
  "Use case mapping"
];

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
  selectedUseCaseId,
  onNextStep,
  nextStepLabel
}: {
  accounts: AccountConfig[];
  selectedAccount: AccountConfig | null;
  onAccountSelect: (id: string) => void;
  motion: MotionKey;
  onMotionSelect: (motion: MotionKey) => void;
  selectedPersona: Persona | null;
  selectedUseCaseId: string | null;
  onNextStep: () => void;
  nextStepLabel: string;
}) {
  const currentStep = stepState(Boolean(selectedPersona), Boolean(selectedUseCaseId));

  return (
    <aside className="flex h-full flex-col border-r border-sf-border bg-sf-surface-muted p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        Accounts
      </div>

      <div className="mt-3">
        <AccountListByTier
          accounts={accounts}
          selectedAccountId={selectedAccount?.id ?? null}
          onSelectAccount={onAccountSelect}
          variant="sidebar"
        />
      </div>

      <div className="mt-6 rounded-xl border border-sf-border bg-sf-surface p-3 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-sf-foreground">Coverage</div>
          <div className="text-[11px] text-sf-foreground-muted">Step {currentStep} of 3</div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
          {[
            { label: "Stakeholder", done: Boolean(selectedPersona) },
            { label: "Wedge", done: Boolean(selectedUseCaseId) },
            { label: "Touch", done: Boolean(selectedPersona && selectedUseCaseId) }
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

        <button
          type="button"
          onClick={onNextStep}
          className="mt-3 w-full rounded-lg border border-sf-primary bg-sf-primary px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-sf-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sf-surface"
        >
          {nextStepLabel}
        </button>
      </div>

      {selectedAccount ? (
        <>
          <div
            className="mt-4 rounded-xl border p-3 shadow-panel"
            style={{
              borderColor: `${selectedAccount.color}44`,
              backgroundColor: `${selectedAccount.color}0a`
            }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
              This deal&apos;s start
            </div>
            <div className="mt-2 text-sm font-medium leading-snug text-sf-foreground">
              {selectedAccount.personas.find((p) => p.id === selectedAccount.primaryMotion.personaId)?.title ?? "—"}
              <span className="font-normal text-sf-foreground-muted"> · </span>
              {selectedAccount.useCases.find((u) => u.id === selectedAccount.primaryMotion.useCaseId)?.title ?? "—"}
            </div>
            <div className="mt-1.5 text-xs text-sf-foreground-muted">
              Demo focus: <span className="font-medium text-sf-foreground">{selectedAccount.primaryMotion.demoLabel}</span>
            </div>
          </div>

          <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            Run this motion
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
                    "w-full rounded-xl px-3 py-2 text-left text-sm transition duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sf-surface-muted",
                    selected
                      ? "bg-white font-medium text-sf-foreground shadow-panel ring-1 ring-sf-border"
                      : "text-sf-foreground-muted hover:bg-white/80 hover:text-sf-foreground"
                  ].join(" ")}
                >
                  {MOTION_DISPLAY[m]}
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
                Target stakeholder
              </div>
              <div className="mt-1 text-sm font-semibold text-sf-foreground">{selectedPersona.title}</div>
              <div className="mt-0.5 text-xs text-sf-foreground-muted">
                {selectedPersona.dept} · {selectedPersona.level}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
              Name a stakeholder to pull the demo script and touch.
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
          Open an account to load territory context.
        </div>
      )}

      <div className="mt-auto pt-6 text-xs text-sf-foreground-muted">
        Account → stakeholder → wedge → demo → touch.
      </div>
    </aside>
  );
}
