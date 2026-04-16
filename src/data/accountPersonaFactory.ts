import type { AccountUseCase, Persona, PlaybookKey } from "@/types";
import { INDUSTRY_PLAYBOOKS } from "@/data/territoryPlaybooks";

/** Clone industry-library personas for one account with stable IDs: `${accountId}__${templateId}`. */
export function clonePlaybookPersonas(
  accountId: string,
  accountName: string,
  playbook: PlaybookKey,
  indices: number[]
): Persona[] {
  const src = INDUSTRY_PLAYBOOKS[playbook].personas;
  return indices.map((idx) => {
    const p = src[idx];
    if (!p) throw new Error(`Invalid persona index ${idx} for playbook ${playbook}`);
    const id = `${accountId}__${p.id}`;
    return {
      ...p,
      id,
      trigger: `${p.trigger} — ${accountName}`,
      loomScript: p.loomScript.replace(/\[Account\]/g, accountName)
    };
  });
}

export type AccountUseCaseInput = Omit<AccountUseCase, "demoPersonaId"> & {
  /** Original id in `INDUSTRY_PLAYBOOKS[playbook].personas` (e.g. pharma-vp-data-science). */
  demoPersonaTemplateId: string;
};

export function resolveUseCases(accountId: string, items: AccountUseCaseInput[]): AccountUseCase[] {
  return items.map((uc) => {
    const { demoPersonaTemplateId, ...rest } = uc;
    return {
      ...rest,
      demoPersonaId: `${accountId}__${demoPersonaTemplateId}`
    };
  });
}
