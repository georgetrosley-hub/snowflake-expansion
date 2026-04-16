"use client";

import type { ReactNode } from "react";
import { Layers, User } from "lucide-react";
import type { AccountConfig, AccountUseCase, EmailDraft, MotionKey, Persona } from "@/types";

function Pill({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  return (
    <div
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tone === "accent"
          ? "border-sf-border bg-sf-surface-muted text-sf-foreground"
          : "border-sf-border bg-white text-sf-foreground-muted"
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function OutreachPanel({
  account,
  selectedPersona,
  selectedUseCase,
  motion,
  email,
  onPickPersona,
  onPickUseCase,
  onCopy,
  onExportTxt
}: {
  account: AccountConfig;
  selectedPersona: Persona | null;
  selectedUseCase: AccountUseCase | null;
  motion: MotionKey;
  email: EmailDraft | null;
  onPickPersona: () => void;
  onPickUseCase: () => void;
  onCopy: (text: string, label: string) => Promise<void>;
  onExportTxt: (draft: EmailDraft) => void;
}) {
  if (!selectedPersona || !selectedUseCase || !email) {
    return (
      <div className="animate-fade-in rounded-xl border border-sf-border bg-white p-8 text-center shadow-panel">
        <div className="text-sm font-semibold text-sf-foreground">Select a persona and account use case</div>
        <div className="mt-1 text-sm text-sf-foreground-muted">
          We’ll generate an outreach email draft for this account’s wedge and proving persona.
        </div>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onPickPersona}
            className="rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
          >
            Persona
          </button>
          <button
            type="button"
            onClick={onPickUseCase}
            className="rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
          >
            Use case
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="accent">
          <User className="h-3.5 w-3.5 text-sf-foreground-muted" aria-hidden />
          {selectedPersona.title}
        </Pill>
        <Pill>
          <Layers className="h-3.5 w-3.5 text-sf-foreground-muted" aria-hidden />
          {selectedUseCase.title}
        </Pill>
        <div className="ml-auto">
          <div
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
            style={{ borderColor: `${account.color}44`, backgroundColor: `${account.color}12`, color: account.color }}
          >
            {motion}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-sf-border bg-sf-surface-muted/60 px-4 py-3 text-xs leading-relaxed text-sf-foreground">
        <span className="font-semibold">Wedge:</span> {selectedUseCase.summary}
        <br />
        <span className="font-semibold">First workload:</span> {selectedUseCase.first_workload}
      </div>

      <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-sf-foreground">Subject</div>
            <div className="text-xs text-sf-foreground-muted">Copy into your email client.</div>
          </div>
          <button
            type="button"
            onClick={() => onCopy(email.subject, "Subject")}
            className="rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
          >
            Copy subject
          </button>
        </div>
        <div className="mt-4 rounded-lg border border-sf-border bg-sf-surface-muted px-4 py-3 text-sm text-sf-foreground">
          {email.subject}
        </div>
      </div>

      <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-sf-foreground">Email body</div>
            <div className="text-xs text-sf-foreground-muted">Personalize the bracket fields, then send.</div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onCopy(email.body, "Email body")}
              className="rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
            >
              Copy body
            </button>
            <button
              type="button"
              onClick={() => onExportTxt(email)}
              className="rounded-lg border border-sf-border bg-sf-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sf-primary-deep"
            >
              Export .txt
            </button>
          </div>
        </div>
        <div className="mt-4 whitespace-pre-wrap rounded-lg border border-sf-border bg-sf-surface-muted p-4 text-sm leading-relaxed text-sf-foreground">
          {email.body}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-sf-border bg-white p-4 text-sm shadow-panel">
          <div className="text-xs font-semibold text-sf-foreground">Reference on the call</div>
          <div className="mt-2">
            <span className="font-semibold" style={{ color: account.color }}>
              {selectedPersona.unconsumedSurface.join(" · ")}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <div className="text-xs font-semibold text-amber-900">Next step before sending</div>
          <div className="mt-2 text-amber-900/90">
            Search: <span className="font-semibold text-amber-950">{`"[Account] + ${account.execTriggers[0]?.split(" ").slice(0, 4).join(" ") ?? "news"}]"`}</span>
            {" "}
            on Google News and LinkedIn before outreach.
          </div>
        </div>
      </div>
    </div>
  );
}
