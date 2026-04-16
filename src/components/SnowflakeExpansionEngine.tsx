"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { VERTICALS } from "@/data/verticals";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { buildEmail } from "@/lib/email";
import type { MotionKey, TabKey, VerticalKey } from "@/types";
import { ProductMark } from "@/components/ProductMark";
import { Sidebar } from "@/components/Sidebar";
import { VerticalHeader } from "@/components/VerticalHeader";
import { PersonaGrid } from "@/components/PersonaGrid";
import { UseCaseSelector } from "@/components/UseCaseSelector";
import { DemoPanel } from "@/components/DemoPanel";
import { OutreachPanel } from "@/components/OutreachPanel";
import { ExecTriggersPanel } from "@/components/ExecTriggersPanel";
import { ToastProvider, useToast } from "@/components/ToastProvider";

const DEFAULT_MOTION: MotionKey = "Mix of all three";
const DEFAULT_TAB: TabKey = "personas";

function AppInner() {
  const toast = useToast();

  const [selectedVertical, setSelectedVertical] = useLocalStorage<VerticalKey | null>(
    "see:selectedVertical",
    null
  );
  const [selectedPersonaId, setSelectedPersonaId] = useLocalStorage<string | null>(
    "see:selectedPersonaId",
    null
  );
  const [selectedUseCase, setSelectedUseCase] = useLocalStorage<string | null>(
    "see:selectedUseCase",
    null
  );
  const [motion, setMotion] = useLocalStorage<MotionKey>("see:motion", DEFAULT_MOTION);
  const [activeTab, setActiveTab] = useLocalStorage<TabKey>("see:activeTab", DEFAULT_TAB);
  const [personaSearch, setPersonaSearch] = useLocalStorage<string>("see:personaSearch", "");

  const vd = selectedVertical ? VERTICALS[selectedVertical] : null;

  const selectedPersona = useMemo(() => {
    if (!vd || !selectedPersonaId) return null;
    return vd.personas.find((p) => p.id === selectedPersonaId) ?? null;
  }, [vd, selectedPersonaId]);

  useEffect(() => {
    if (!vd) return;
    if (!selectedPersonaId) return;
    const stillExists = vd.personas.some((p) => p.id === selectedPersonaId);
    if (!stillExists) setSelectedPersonaId(null);
  }, [vd, selectedPersonaId, setSelectedPersonaId]);

  const email = useMemo(() => {
    if (!selectedPersona || !selectedUseCase || !selectedVertical) return null;
    return buildEmail(motion, selectedPersona, selectedUseCase, selectedVertical);
  }, [motion, selectedPersona, selectedUseCase, selectedVertical]);

  const breadcrumb = useMemo(() => {
    const parts: string[] = [];
    if (selectedPersona) parts.push(selectedPersona.title);
    if (selectedUseCase) parts.push(selectedUseCase.split("(")[0].trim());
    if (parts.length === 0) return "Persona → demo recipe → outreach";
    return parts.join(" · ");
  }, [selectedPersona, selectedUseCase]);

  const handleCopy = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast.push({ tone: "success", title: `${label} copied` });
      } catch {
        toast.push({ tone: "error", title: "Copy failed (browser blocked clipboard)" });
      }
    },
    [toast]
  );

  const handleExportTxt = useCallback(
    (draft: NonNullable<typeof email>) => {
      const persona = selectedPersona?.title ?? "persona";
      const useCase = selectedUseCase?.split("(")[0].trim() ?? "use-case";
      const safe = (s: string) =>
        s
          .toLowerCase()
          .replaceAll(/[^a-z0-9]+/g, "-")
          .replaceAll(/(^-|-$)/g, "")
          .slice(0, 80);

      const content = `Subject: ${draft.subject}\n\n${draft.body}\n`;
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `outreach-${safe(persona)}-${safe(useCase)}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.push({ tone: "success", title: "Exported .txt" });
    },
    [selectedPersona?.title, selectedUseCase, toast]
  );

  const handleVerticalSelect = useCallback(
    (name: VerticalKey) => {
      setSelectedVertical(name);
      setSelectedPersonaId(null);
      setSelectedUseCase(null);
      setPersonaSearch("");
      setActiveTab("personas");
    },
    [setActiveTab, setPersonaSearch, setSelectedPersonaId, setSelectedUseCase, setSelectedVertical]
  );

  const handlePersonaSelect = useCallback(
    (persona: NonNullable<typeof selectedPersona>) => {
      setSelectedPersonaId(persona.id);
      setActiveTab("demo");
    },
    [setActiveTab, setSelectedPersonaId]
  );

  const handleUseCaseSelect = useCallback(
    (useCase: string) => {
      setSelectedUseCase(useCase);
      setActiveTab("outreach");
    },
    [setActiveTab, setSelectedUseCase]
  );

  return (
    <div className="min-h-screen bg-sf-surface-muted">
      <header className="border-b border-sf-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <ProductMark className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <div className="truncate text-base font-semibold tracking-tight text-sf-foreground">
              Snowflake Expansion Engine
            </div>
            <div className="truncate text-xs text-sf-foreground-muted">
              Persona · Demo recipe · Loom script · Outreach
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 bg-white md:grid-cols-[280px_1fr] md:border-x md:border-sf-border">
        <Sidebar
          verticals={VERTICALS}
          selectedVertical={selectedVertical}
          selectedVerticalData={vd}
          onVerticalSelect={handleVerticalSelect}
          motion={motion}
          onMotionSelect={setMotion}
          selectedPersona={selectedPersona}
          selectedUseCase={selectedUseCase}
        />

        <main className="min-h-[calc(100vh-73px)] bg-sf-surface-muted">
          {!selectedVertical || !vd ? (
            <div className="grid h-full place-items-center px-6 py-16">
              <div className="max-w-xl text-center">
                <div className="mx-auto mb-6 flex justify-center">
                  <ProductMark className="h-16 w-16" />
                </div>
                <div className="text-xl font-semibold text-sf-foreground">Select a vertical to begin</div>
                <div className="mt-2 text-sm text-sf-foreground-muted">
                  Pick a persona, choose a use case, then generate a demo recipe and outreach draft.
                </div>
                <div className="mt-6 rounded-xl border border-sf-border bg-white p-5 text-left text-sm text-sf-foreground-muted shadow-panel">
                  <div className="font-semibold text-sf-foreground">Suggested flow</div>
                  <ol className="mt-3 list-decimal space-y-1 pl-5">
                    <li>Choose a vertical in the sidebar</li>
                    <li>Select a persona (searchable)</li>
                    <li>Select a use case, then review outreach</li>
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            <>
              <VerticalHeader
                selectedVertical={selectedVertical}
                vd={vd}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                breadcrumb={breadcrumb}
              />

              <div className="px-6 py-6">
                {activeTab === "personas" && (
                  <PersonaGrid
                    vd={vd}
                    personas={vd.personas}
                    selectedPersonaId={selectedPersona?.id ?? null}
                    search={personaSearch}
                    onSearchChange={setPersonaSearch}
                    onPersonaSelect={(p) => handlePersonaSelect(p)}
                  />
                )}

                {activeTab === "usecases" && (
                  <UseCaseSelector
                    vd={vd}
                    selectedPersona={selectedPersona}
                    selectedUseCase={selectedUseCase}
                    onSelectUseCase={handleUseCaseSelect}
                  />
                )}

                {activeTab === "demo" && (
                  <DemoPanel
                    vd={vd}
                    selectedPersona={selectedPersona}
                    onPickPersona={() => setActiveTab("personas")}
                    onCopy={handleCopy}
                  />
                )}

                {activeTab === "outreach" && (
                  <OutreachPanel
                    vd={vd}
                    selectedPersona={selectedPersona}
                    selectedUseCase={selectedUseCase}
                    motion={motion}
                    email={email}
                    onPickPersona={() => setActiveTab("personas")}
                    onPickUseCase={() => setActiveTab("usecases")}
                    onCopy={handleCopy}
                    onExportTxt={handleExportTxt}
                  />
                )}

                {activeTab === "exec-triggers" && <ExecTriggersPanel vd={vd} />}

                <div className="mt-10 flex flex-col gap-3 rounded-xl border border-sf-border bg-white p-5 shadow-panel sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-sf-foreground-muted">
                    <span className="font-semibold text-sf-foreground">Next step:</span>{" "}
                    {!selectedPersona
                      ? "Pick a persona."
                      : !selectedUseCase
                        ? "Pick a use case to generate outreach."
                        : "Copy or export the outreach email."}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setActiveTab("personas")}
                      className="rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
                    >
                      Personas
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("usecases")}
                      className="rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
                    >
                      Use cases
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("outreach")}
                      className="rounded-lg border border-sf-border bg-sf-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sf-primary-deep"
                    >
                      Outreach
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SnowflakeExpansionEngine() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
