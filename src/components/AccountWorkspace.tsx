"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Gauge,
  Mail,
  Play,
  Send,
  Sparkles,
  Target,
  Users,
  Video
} from "lucide-react";
import type { AccountConfig, AccountUseCase, EmailDraft, MotionKey, Persona } from "@/types";
import { MOTION_DISPLAY } from "@/lib/motionLabels";

function Kpi({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="min-w-0 border-l border-sf-border pl-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        {label}
      </div>
      <div className="mt-1 truncate text-sm font-semibold text-sf-foreground">{value}</div>
    </div>
  );
}

function BriefPoint({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-sf-border pl-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        {label}
      </div>
      <div className="mt-1 text-sm leading-relaxed text-sf-foreground">{children}</div>
    </div>
  );
}

function Step({
  index,
  label,
  complete,
  active
}: {
  index: number;
  label: string;
  complete: boolean;
  active: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span
        className={[
          "grid h-6 w-6 shrink-0 place-items-center rounded-md border text-xs font-semibold",
          complete
            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
            : active
              ? "border-sky-200 bg-sky-50 text-sky-900"
              : "border-sf-border bg-sf-surface-muted text-sf-foreground-muted"
        ].join(" ")}
      >
        {complete ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : index}
      </span>
      <span className="truncate text-sm font-medium text-sf-foreground">{label}</span>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  primary = false
}: {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        primary
          ? "border-sf-primary bg-sf-primary text-white hover:bg-sf-primary-deep"
          : "border-sf-border bg-white text-sf-foreground hover:bg-sf-surface-muted"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function AccountWorkspace({
  account,
  selectedPersona,
  selectedUseCase,
  motion,
  email,
  onPersonaSelect,
  onUseCaseSelect,
  onUseRecommendedPath,
  onCopy,
  onExportTxt
}: {
  account: AccountConfig;
  selectedPersona: Persona | null;
  selectedUseCase: AccountUseCase | null;
  motion: MotionKey;
  email: EmailDraft | null;
  onPersonaSelect: (persona: Persona) => void;
  onUseCaseSelect: (useCase: AccountUseCase) => void;
  onUseRecommendedPath: () => void;
  onCopy: (text: string, label: string) => Promise<void>;
  onExportTxt: (draft: EmailDraft) => void;
}) {
  const primaryPersona =
    account.personas.find((persona) => persona.id === account.primaryMotion.personaId) ?? null;
  const primaryUseCase =
    account.useCases.find((useCase) => useCase.id === account.primaryMotion.useCaseId) ?? null;
  const primaryPathSelected =
    selectedPersona?.id === account.primaryMotion.personaId &&
    selectedUseCase?.id === account.primaryMotion.useCaseId;
  const copyTouch = () => {
    if (!email) return;
    void onCopy(`Subject: ${email.subject}\n\n${email.body}`, "Touch");
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-sf-surface-muted">
      <section
        className="border-b border-sf-border bg-white px-5 py-5 sm:px-6 lg:px-8"
        style={{ borderTopColor: account.color, borderTopWidth: 3 }}
      >
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
              Account
            </div>
            <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-sf-foreground md:text-3xl">
              {account.name}
            </h1>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-sf-foreground-muted">
              <span className="font-semibold text-sf-foreground">{account.industry}</span>
              {" - "}
              {account.briefDescriptor}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:w-[34rem]">
            <Kpi label="ACV">{account.pipelineSnapshot.estimatedAcvRange}</Kpi>
            <Kpi label="Likelihood">
              <span
                className={[
                  "rounded-md border px-2 py-0.5 text-xs",
                  account.pipelineSnapshot.dealLikelihood === "High"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : account.pipelineSnapshot.dealLikelihood === "Medium"
                      ? "border-amber-200 bg-amber-50 text-amber-950"
                      : "border-sf-border bg-sf-surface-muted text-sf-foreground"
                ].join(" ")}
              >
                {account.pipelineSnapshot.dealLikelihood}
              </span>
            </Kpi>
            <Kpi label="Timeline">{account.pipelineSnapshot.timeline}</Kpi>
            <Kpi label="First meeting">{account.pipelineSnapshot.firstMeetingTarget}</Kpi>
          </div>
        </div>
      </section>

      <div className="space-y-6 px-5 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
                  <Sparkles className="h-4 w-4" style={{ color: account.color }} aria-hidden />
                  Best first move
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sf-foreground-muted">
                  {primaryPersona?.title ?? "Target stakeholder"} through{" "}
                  <span className="font-semibold text-sf-foreground">
                    {primaryUseCase?.title ?? account.primaryMotion.demoLabel}
                  </span>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={onUseRecommendedPath}
                className="shrink-0 rounded-lg border border-sf-border bg-white px-3 py-2 text-xs font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
              >
                Use path
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              <Step
                index={1}
                label={selectedPersona?.title ?? "Pick stakeholder"}
                complete={Boolean(selectedPersona)}
                active={!selectedPersona}
              />
              <Step
                index={2}
                label={selectedUseCase?.title ?? "Pick wedge"}
                complete={Boolean(selectedUseCase)}
                active={Boolean(selectedPersona && !selectedUseCase)}
              />
              <Step
                index={3}
                label="Copy touch"
                complete={Boolean(email)}
                active={Boolean(selectedPersona && selectedUseCase)}
              />
            </div>

            <div className="mt-5 rounded-lg border border-sf-border bg-sf-surface-muted px-3 py-2 text-xs leading-relaxed text-sf-foreground-muted">
              Motion: <span className="font-semibold text-sf-foreground">{MOTION_DISPLAY[motion]}</span>
              {primaryPathSelected ? " - recommended path selected." : " - tune the path below."}
            </div>
          </div>

          <div className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
              <Target className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
              Decision brief
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <BriefPoint label="Why now">{account.why_now}</BriefPoint>
              <BriefPoint label="Broken">{account.whats_broken}</BriefPoint>
              <BriefPoint label="Proof">{account.proof_point}</BriefPoint>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
                  <Users className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
                  Stakeholder
                </div>
                <p className="mt-1 text-xs text-sf-foreground-muted">Pick the person in the room.</p>
              </div>
              <div className="text-xs font-semibold text-sf-foreground-muted">{account.personas.length} mapped</div>
            </div>

            <div className="mt-4 grid gap-2">
              {account.personas.map((persona) => {
                const selected = selectedPersona?.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => onPersonaSelect(persona)}
                    className={[
                      "group rounded-lg border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      selected
                        ? "bg-white shadow-sm"
                        : "border-sf-border bg-white hover:border-slate-300 hover:bg-sf-surface-muted/50"
                    ].join(" ")}
                    style={
                      selected
                        ? {
                            borderColor: `${account.color}77`,
                            boxShadow: `0 0 0 1px ${account.color}22`
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-sf-foreground">{persona.title}</div>
                        <div className="mt-0.5 text-xs text-sf-foreground-muted">
                          {persona.dept} - {persona.level}
                        </div>
                      </div>
                      <span
                        className="rounded-md px-2 py-1 text-[11px] font-semibold"
                        style={{ backgroundColor: `${account.color}14`, color: account.color }}
                      >
                        {persona.loomLead}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-sf-foreground-muted">
                      {persona.trigger}
                    </p>
                    <div className="mt-2 text-xs font-medium text-sf-foreground">
                      Demo: {persona.anchorDemo}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
                  <Gauge className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
                  Wedge
                </div>
                <p className="mt-1 text-xs text-sf-foreground-muted">Pick the first workload to prove.</p>
              </div>
              <div className="text-xs font-semibold text-sf-foreground-muted">{account.useCases.length} options</div>
            </div>

            <div className="mt-4 grid gap-2">
              {account.useCases.map((useCase) => {
                const selected = selectedUseCase?.id === useCase.id;
                const demoPersona = account.personas.find((persona) => persona.id === useCase.demoPersonaId);
                return (
                  <button
                    key={useCase.id}
                    type="button"
                    onClick={() => onUseCaseSelect(useCase)}
                    className={[
                      "group rounded-lg border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      selected
                        ? "bg-white shadow-sm"
                        : "border-sf-border bg-white hover:border-slate-300 hover:bg-sf-surface-muted/50"
                    ].join(" ")}
                    style={
                      selected
                        ? {
                            borderColor: `${account.color}77`,
                            boxShadow: `0 0 0 1px ${account.color}22`
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-sf-foreground">{useCase.title}</div>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-sf-foreground-muted">
                          {useCase.summary}
                        </p>
                      </div>
                      <ArrowRight
                        className={[
                          "mt-1 h-4 w-4 shrink-0 transition",
                          selected ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        ].join(" ")}
                        style={{ color: account.color }}
                        aria-hidden
                      />
                    </div>
                    <div className="mt-2 text-xs leading-relaxed text-sf-foreground">
                      <span className="font-semibold">First workload:</span> {useCase.first_workload}
                    </div>
                    {demoPersona ? (
                      <div className="mt-1 text-xs text-sf-foreground-muted">
                        Proves with: <span className="font-medium text-sf-foreground">{demoPersona.title}</span>
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
                  <Video className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
                  Demo
                </div>
                <p className="mt-1 text-xs text-sf-foreground-muted">
                  Proof the buyer can feel, not a feature tour.
                </p>
              </div>
              {selectedPersona ? (
                <span className="rounded-md border border-sf-border bg-sf-surface-muted px-2 py-1 text-xs font-semibold text-sf-foreground">
                  {selectedPersona.loomLead} records
                </span>
              ) : null}
            </div>

            {selectedPersona ? (
              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-base font-semibold text-sf-foreground">
                    {selectedPersona.demoRecipe.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-sf-foreground-muted">
                    {selectedPersona.demoRecipe.businessProblem}
                  </p>
                </div>
                <BriefPoint label="Show moment">{selectedPersona.demoRecipe.showMoment}</BriefPoint>
                <BriefPoint label="Next step">{selectedPersona.demoRecipe.nextStepTrigger}</BriefPoint>
                <details className="rounded-lg border border-sf-border bg-sf-surface-muted">
                  <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-sf-foreground">
                    Loom script
                  </summary>
                  <div className="border-t border-sf-border p-4">
                    <div className="mb-3 flex justify-end">
                      <ActionButton onClick={() => void onCopy(selectedPersona.loomScript, "Loom script")}>
                        <Copy className="h-4 w-4" aria-hidden />
                        Copy
                      </ActionButton>
                    </div>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-sf-foreground">
                      {selectedPersona.loomScript}
                    </div>
                  </div>
                </details>
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-sf-border bg-sf-surface-muted p-4 text-sm text-sf-foreground-muted">
                Pick a stakeholder to load the demo recipe.
              </div>
            )}
          </div>

          <div id="touch" className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
                  <Mail className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
                  Touch
                </div>
                <p className="mt-1 text-xs text-sf-foreground-muted">
                  {selectedPersona && selectedUseCase
                    ? `${selectedPersona.title} - ${selectedUseCase.title}`
                    : "Pick a stakeholder and wedge to draft the touch."}
                </p>
              </div>
              {email ? (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <ActionButton onClick={copyTouch}>
                    <Copy className="h-4 w-4" aria-hidden />
                    Copy touch
                  </ActionButton>
                  <ActionButton onClick={() => onExportTxt(email)} primary>
                    <Download className="h-4 w-4" aria-hidden />
                    Save
                  </ActionButton>
                </div>
              ) : null}
            </div>

            {email ? (
              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                    Subject
                  </div>
                  <div className="mt-2 rounded-lg border border-sf-border bg-sf-surface-muted px-4 py-3 text-sm font-semibold text-sf-foreground">
                    {email.subject}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                    Body
                  </div>
                  <div className="mt-2 whitespace-pre-wrap rounded-lg border border-sf-border bg-sf-surface-muted p-4 text-sm leading-relaxed text-sf-foreground">
                    {email.body}
                  </div>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
                  Before sending: search{" "}
                  <span className="font-semibold">
                    {`"[Account] + ${account.execTriggers[0]?.split(" ").slice(0, 4).join(" ") ?? "news"}"`}
                  </span>{" "}
                  on Google News and LinkedIn.
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-sf-border bg-sf-surface-muted p-4 text-sm text-sf-foreground-muted">
                The touch appears here as soon as the path is complete.
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
              <Play className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
              Close path
            </div>
            <ol className="mt-4 space-y-3">
              {account.deal_path.expansionFlow.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-sf-foreground">
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-xs font-semibold text-white"
                    style={{ backgroundColor: account.color }}
                  >
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-sf-border bg-white p-5 shadow-panel">
            <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
              <Send className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
              Why reach out today
            </div>
            <div className="mt-4 grid gap-3">
              {account.execTriggers.slice(0, 3).map((trigger) => (
                <div
                  key={trigger}
                  className="border-l-2 pl-3 text-sm leading-relaxed text-sf-foreground"
                  style={{ borderColor: account.color }}
                >
                  {trigger}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-sf-border bg-sf-surface-muted px-4 py-3 text-sm leading-relaxed text-sf-foreground">
              <span className="font-semibold">Economic impact:</span> {account.economic_impact}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
