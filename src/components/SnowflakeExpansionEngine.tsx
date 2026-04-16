"use client";

import { useCallback, useEffect, useMemo } from "react";
import { ACCOUNTS, ACCOUNTS_BY_ID } from "@/data/accounts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { buildEmail } from "@/lib/email";
import type { AccountUseCase, MotionKey, Persona, TabKey } from "@/types";
import { ProductMark } from "@/components/ProductMark";
import { Sidebar } from "@/components/Sidebar";
import { AccountHeader } from "@/components/AccountHeader";
import { AccountOverview } from "@/components/AccountOverview";
import { TerritoryPanel } from "@/components/TerritoryPanel";
import { PersonaGrid } from "@/components/PersonaGrid";
import { UseCaseSelector } from "@/components/UseCaseSelector";
import { DemoPanel } from "@/components/DemoPanel";
import { OutreachPanel } from "@/components/OutreachPanel";
import { LandingView } from "@/components/LandingView";
import { ToastProvider, useToast } from "@/components/ToastProvider";

const DEFAULT_MOTION: MotionKey = "Mix of all three";
const DEFAULT_TAB: TabKey = "territory";

const VALID_TABS: TabKey[] = ["territory", "personas", "usecases", "demo", "outreach"];

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
  const [selectedUseCaseId, setSelectedUseCaseId] = useLocalStorage<string | null>(
    "see:selectedUseCaseId",
    null
  );
  const [motion, setMotion] = useLocalStorage<MotionKey>("see:motion", DEFAULT_MOTION);
  const [activeTab, setActiveTab] = useLocalStorage<TabKey>("see:activeTab", DEFAULT_TAB);
  const [personaSearch, setPersonaSearch] = useLocalStorage<string>("see:personaSearch", "");

  useEffect(() => {
    const raw = activeTab as string;
    if (raw === "deal-view" || raw === "exec-triggers") {
      setActiveTab("territory");
      return;
    }
    if (!VALID_TABS.includes(activeTab)) setActiveTab(DEFAULT_TAB);
  }, [activeTab, setActiveTab]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const acc = params.get("account");
    const tab = params.get("tab");
    if (acc && ACCOUNTS_BY_ID[acc]) setSelectedAccountId(acc);
    if (tab && VALID_TABS.includes(tab as TabKey)) setActiveTab(tab as TabKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- URL wins over localStorage once on mount
  }, []);

  const resolvedAccountId = resolveAccountId(selectedAccountId);
  const account = resolvedAccountId ? ACCOUNTS_BY_ID[resolvedAccountId] ?? null : null;

  useEffect(() => {
    if (selectedAccountId && !ACCOUNTS_BY_ID[selectedAccountId]) {
      setSelectedAccountId(null);
    }
  }, [selectedAccountId, setSelectedAccountId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!resolvedAccountId) {
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }
    const params = new URLSearchParams();
    params.set("account", resolvedAccountId);
    params.set("tab", activeTab);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [resolvedAccountId, activeTab]);

  const selectedPersona = useMemo(() => {
    if (!account || !selectedPersonaId) return null;
    return account.personas.find((p) => p.id === selectedPersonaId) ?? null;
  }, [account, selectedPersonaId]);

  const selectedUseCase = useMemo((): AccountUseCase | null => {
    if (!account || !selectedUseCaseId) return null;
    return account.useCases.find((u) => u.id === selectedUseCaseId) ?? null;
  }, [account, selectedUseCaseId]);

  useEffect(() => {
    if (!account) return;
    if (!selectedPersonaId) return;
    const stillExists = account.personas.some((p) => p.id === selectedPersonaId);
    if (!stillExists) setSelectedPersonaId(null);
  }, [account, selectedPersonaId, setSelectedPersonaId]);

  useEffect(() => {
    if (!account || !selectedUseCaseId) return;
    if (!account.useCases.some((u) => u.id === selectedUseCaseId)) setSelectedUseCaseId(null);
  }, [account, selectedUseCaseId, setSelectedUseCaseId]);

  const email = useMemo(() => {
    if (!selectedPersona || !selectedUseCase || !account) return null;
    return buildEmail(motion, selectedPersona, selectedUseCase, account.industry);
  }, [motion, selectedPersona, selectedUseCase, account]);

  const breadcrumb = useMemo(() => {
    const parts: string[] = [];
    if (selectedPersona) parts.push(selectedPersona.title);
    if (selectedUseCase) parts.push(selectedUseCase.title);
    if (parts.length === 0) return "Territory brief → stakeholders → wedges";
    return parts.join(" · ");
  }, [selectedPersona, selectedUseCase]);

  const nextStep = useMemo(() => {
    if (!selectedPersona) return { label: "Next: Stakeholders", tab: "personas" as TabKey };
    if (!selectedUseCase) return { label: "Next: Wedges", tab: "usecases" as TabKey };
    return { label: "Next: Touch", tab: "outreach" as TabKey };
  }, [selectedPersona, selectedUseCase]);

  const handleNextStep = useCallback(() => {
    setActiveTab(nextStep.tab);
  }, [nextStep.tab, setActiveTab]);

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
      const useCase = selectedUseCase?.id ?? "use-case";
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
      a.download = `touch-${safe(persona)}-${safe(useCase)}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.push({ tone: "success", title: "Touch saved as .txt" });
    },
    [selectedPersona?.title, selectedUseCase?.id, toast]
  );

  const handleAccountSelect = useCallback(
    (id: string) => {
      setSelectedAccountId(id);
      const acct = ACCOUNTS_BY_ID[id];
      if (acct?.primaryMotion) {
        setSelectedPersonaId(acct.primaryMotion.personaId);
        setSelectedUseCaseId(acct.primaryMotion.useCaseId);
      } else {
        setSelectedPersonaId(null);
        setSelectedUseCaseId(null);
      }
      setPersonaSearch("");
      setActiveTab("territory");
    },
    [setActiveTab, setPersonaSearch, setSelectedAccountId, setSelectedPersonaId, setSelectedUseCaseId]
  );

  useEffect(() => {
    if (!account?.primaryMotion) return;
    const personaValid =
      selectedPersonaId != null && account.personas.some((p) => p.id === selectedPersonaId);
    const useCaseValid =
      selectedUseCaseId != null && account.useCases.some((u) => u.id === selectedUseCaseId);
    if (personaValid && useCaseValid) return;
    setSelectedPersonaId(account.primaryMotion.personaId);
    setSelectedUseCaseId(account.primaryMotion.useCaseId);
  }, [
    account,
    selectedPersonaId,
    selectedUseCaseId,
    setSelectedPersonaId,
    setSelectedUseCaseId
  ]);

  const handlePersonaSelect = useCallback(
    (persona: Persona) => {
      setSelectedPersonaId(persona.id);
      setActiveTab("demo");
    },
    [setActiveTab, setSelectedPersonaId]
  );

  const handleUseCaseSelect = useCallback(
    (useCase: AccountUseCase) => {
      setSelectedUseCaseId(useCase.id);
      setSelectedPersonaId(useCase.demoPersonaId);
      setActiveTab("outreach");
    },
    [setActiveTab, setSelectedPersonaId, setSelectedUseCaseId]
  );

  const showLanding = ACCOUNTS.length > 0 && !account;

  return (
    <div className="min-h-screen bg-sf-surface-muted">
      <header className="border-b border-sf-border bg-sf-surface">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <ProductMark className="h-10 w-10 shrink-0" size={40} priority />
          {showLanding ? (
            <span className="sr-only">Expansion Territory Operating Plan</span>
          ) : (
            <div className="min-w-0">
              <div className="truncate text-base font-semibold tracking-tight text-sf-foreground">
                Territory Operating Console
              </div>
              <div className="truncate text-xs text-sf-foreground-muted">
                Named accounts · tiered coverage · stakeholder → wedge → demo → touch
              </div>
            </div>
          )}
        </div>
      </header>

      {showLanding ? (
        <main className="mx-auto max-w-6xl bg-white md:border-x md:border-sf-border">
          <LandingView accounts={ACCOUNTS} onSelectAccount={handleAccountSelect} />
        </main>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 bg-white md:grid-cols-[280px_1fr] md:border-x md:border-sf-border">
          <Sidebar
            accounts={ACCOUNTS}
            selectedAccount={account}
            onAccountSelect={handleAccountSelect}
            motion={motion}
            onMotionSelect={setMotion}
            selectedPersona={selectedPersona}
            selectedUseCaseId={selectedUseCaseId}
            onNextStep={handleNextStep}
            nextStepLabel={nextStep.label}
          />

          <main className="min-h-[calc(100vh-73px)] bg-sf-surface-muted">
            {!account ? (
              <div className="grid h-full place-items-center px-6 py-16">
                <div className="max-w-xl text-center">
                  <div className="mx-auto mb-6 flex justify-center">
                    <ProductMark className="h-16 w-16" size={64} />
                  </div>
                  <div className="text-xl font-semibold text-sf-foreground">No account data</div>
                  <div className="mt-2 text-sm text-sf-foreground-muted">
                    No accounts in the data layer yet — add them and refresh.
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="px-6 pt-6">
                  <div
                    className="rounded-xl border border-sf-border bg-sf-surface shadow-panel"
                    style={{ borderLeftWidth: 4, borderLeftColor: account.color }}
                  >
                    <AccountOverview account={account} />
                    <AccountHeader
                      account={account}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      breadcrumb={breadcrumb}
                    />
                  </div>
                </div>

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
                      selectedUseCaseId={selectedUseCaseId}
                      onSelectUseCase={handleUseCaseSelect}
                    />
                  )}

                  {activeTab === "demo" && (
                    <DemoPanel
                      account={account}
                      selectedPersona={selectedPersona}
                      selectedUseCase={selectedUseCase}
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
                </div>
              </>
            )}
          </main>
        </div>
      )}
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
