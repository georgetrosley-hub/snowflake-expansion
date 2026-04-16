import type { AccountConfig, Persona } from "@/types";

/** Build a stable persona id and substitute [Account] in loom scripts. */
export function persona(
  accountId: string,
  accountName: string,
  slug: string,
  fields: Omit<Persona, "id">
): Persona {
  return {
    id: `${accountId}__${slug}`,
    ...fields,
    loomScript: fields.loomScript.replaceAll("[Account]", accountName)
  };
}

/** Validate account-defined personas and wedges; color and industry live on each account. */
export function buildAccount(
  spec: Omit<AccountConfig, "execTriggers"> & { execTriggers?: string[] }
): AccountConfig {
  const ids = new Set(spec.personas.map((p) => p.id));
  for (const uc of spec.useCases) {
    if (!ids.has(uc.demoPersonaId)) {
      throw new Error(
        `Use case "${uc.id}" references demoPersonaId "${uc.demoPersonaId}" — not found in this account's personas`
      );
    }
  }
  const pm = spec.primaryMotion;
  const primaryPersona = spec.personas.find((p) => p.id === pm.personaId);
  if (!primaryPersona) {
    throw new Error(`primaryMotion.personaId "${pm.personaId}" not found on account "${spec.id}"`);
  }
  const primaryUseCase = spec.useCases.find((u) => u.id === pm.useCaseId);
  if (!primaryUseCase) {
    throw new Error(`primaryMotion.useCaseId "${pm.useCaseId}" not found on account "${spec.id}"`);
  }
  if (primaryUseCase.demoPersonaId !== pm.personaId) {
    throw new Error(
      `Account "${spec.id}" primaryMotion: use case "${primaryUseCase.id}" must use personaId as demoPersonaId`
    );
  }
  return {
    ...spec,
    execTriggers: spec.execTriggers ?? []
  };
}
