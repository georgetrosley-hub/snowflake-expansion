"use client";

import { useCallback, useEffect, useMemo } from "react";
import { ACCOUNTS, ACCOUNTS_BY_ID, DEFAULT_ACCOUNT_ID } from "@/data/accounts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { buildEmail } from "@/lib/email";
import type { MotionKey, Persona, TabKey } from "@/types";
import { ProductMark } from "@/components/ProductMark";
import { Sidebar } from "@/components/Sidebar";
import { AccountHeader } from "@/components/AccountHeader";
import { TerritoryPanel } from "@/components/TerritoryPanel";
import { PersonaGrid } from "@/components/PersonaGrid";
import { UseCaseSelector } from "@/components/UseCaseSelector";
import { DemoPanel } from "@/components/DemoPanel";
import { OutreachPanel } from "@/components/OutreachPanel";
import { ExecTriggersPanel } from "@/components/ExecTriggersPanel";
import { ToastProvider, useToast } from "@/components/ToastProvider";

const DEFAULT_MOTION: MotionKey = "Mix of all three";
const DEFAULT_TAB: TabKey = "territory";

const VALID_TABS: TabKey[] = [
  "territory",
  "personas",
  "usecases",
  "demo",
  "outreach",
  "exec-triggers"
];

function resolveAccountId(stored: string | null): string | null {
  if (!stored) return null;
  return ACCOUNTS_BY_ID[stored] ? stored : null;
}

function AppInner() {
  const toast = useToast();

  const [selectedAccountId, setSelectedAccountId] = useLocalStorage<string | null>(
    "see:selectedAccountId",
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

  useEffect(() => {
    if (!VALID_TABS.includes(activeTab)) setActiveTab(DEFAULT_TAB);
  }, [activeTab, setActiveTab]);

  const accountId = resolveAccountId(selectedAccountId) ?? DEFAULT_ACCOUNT_ID;
  const account = ACCOUNTS_BY_ID[accountId] ?? null;

  useEffect(() => {
    if (selectedAccountId && !ACCOUNTS_BY_ID[selectedAccountId] && DEFAULT_ACCOUNT_ID) {
      setSelectedAccountId(DEFAULT_ACCOUNT_ID);
    }
  }, [selectedAccountId, setSelectedAccountId]);

  const selectedPersona = useMemo(() => {
    if (!account || !selectedPersonaId) return null;
    return account.personas.find((p) => p.id === selectedPersonaId) ?? null;
  }, [account, selectedPersonaId]);

  useEffect(() => {
    if (!account) return;
    if (!selectedPersonaId) return;
    const stillExists = account.personas.some((p) => p.id === selectedPersonaId);
    if (!stillExists) setSelectedPersonaId(null);
  }, [account, selectedPersonaId, setSelectedPersonaId]);

  const email = useMemo(() => {
    if (!selectedPersona || !selectedUseCase || !account) return null;
    return buildEmail(motion, selectedPersona, selectedUseCase, account.industry);
  }, [motion, selectedPersona, selectedUseCase, account]);

  const breadcrumb = useMemo(() => {
    const parts: string[] = [];
    if (selectedPersona) parts.push(selectedPersona.title);
    if (selectedUseCase) parts.push(selectedUseCase.split("(")[0].trim());
    if (parts.length === 0) return "Territory brief → personas → plays";
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

  const handleAccountSelect = useCallback(
    (id: string) => {
      setSelectedAccountId(id);
      setSelectedPersonaId(null);
      setSelectedUseCase(null);
      setPersonaSearch("");
      setActiveTab("territory");
    },
    [setActiveTab, setPersonaSearch, setSelectedAccountId, setSelectedPersonaId, setSelectedUseCase]
  );

  const handlePersonaSelect = useCallback(
    (persona: Persona) => {
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
              Territory Operating Console
            </div>
            <div className="truncate text-xs text-sf-foreground-muted">
              Named accounts · tiered coverage · persona → demo → outreach
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 bg-white md:grid-cols-[280px_1fr] md:border-x md:border-sf-border">
        <Sidebar
          accounts={ACCOUNTS}
          selectedAccount={account}
          onAccountSelect={handleAccountSelect}
          motion={motion}
          onMotionSelect={setMotion}
          selectedPersona={selectedPersona}
          selectedUseCase={selectedUseCase}
        />

        <main className="min-h-[calc(100vh-73px)] bg-sf-surface-muted">
          {!account ? (
            <div className="grid h-full place-items-center px-6 py-16">
              <div className="max-w-xl text-center">
                <div className="mx-auto mb-6 flex justify-center">
                  <ProductMark className="h-16 w-16" />
                </div>
                <div className="text-xl font-semibold text-sf-foreground">No account data</div>
                <div className="mt-2 text-sm text-sf-foreground-muted">
                  Add accounts in the data layer, then reload.
                </div>
              </div>
            </div>
          ) : (
            <>
              <AccountHeader
                account={account}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                breadcrumb={breadcrumb}
              />

              <div className="px-6 py-6">
                {activeTab === "territory" && <TerritoryPanel account={account} />}

                {activeTab === "personas" && (
                  <PersonaGrid
                    account={account}
                    personas={account.personas}
                    selectedPersonaId={selectedPersona?.id ?? null}
                    search={personaSearch}
                    onSearchChange={setPersonaSearch}
                    onPersonaSelect={(p) => handlePersonaSelect(p)}
                  />
                )}

                {activeTab === "usecases" && (
                  <UseCaseSelector
                    account={account}
                    selectedPersona={selectedPersona}
                    selectedUseCase={selectedUseCase}
                    onSelectUseCase={handleUseCaseSelect}
                  />
                )}

                {activeTab === "demo" && (
                  <DemoPanel
                    account={account}
                    selectedPersona={selectedPersona}
                    onPickPersona={() => setActiveTab("personas")}
                    onCopy={handleCopy}
                  />
                )}

                {activeTab === "outreach" && (
                  <OutreachPanel
                    account={account}
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

                {activeTab === "exec-triggers" && <ExecTriggersPanel account={account} />}

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
                      onClick={() => setActiveTab("territory")}
                      className="rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
                    >
                      Territory
                    </button>
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
