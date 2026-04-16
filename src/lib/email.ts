import type { EmailDraft, MotionKey, Persona } from "@/types";

export function buildEmail(
  motion: MotionKey,
  persona: Persona,
  useCase: string,
  industryLabel: string
): EmailDraft {
  const shortIndustry = industryLabel.split("/")[0].trim();
  const shortUseCase = useCase.split("(")[0].trim();
  const firstUnconsumed = persona.unconsumedSurface[0];

  switch (motion) {
    case "Exec escalation":
      return {
        subject: `Snowflake + [Account] -- ${shortUseCase}`,
        body: [
          "Hi [Name],",
          "",
          `Your team has been running Snowflake for [X] months. There's meaningful platform surface that hasn't been activated -- specifically around ${useCase.toLowerCase()}.`,
          "",
          `For ${shortIndustry} organizations at your scale, the gap usually shows up as consumption concentrated in one team while adjacent functions work around it. ${firstUnconsumed} is live in your contract and hasn't been turned on.`,
          "",
          "I'd like to bring a short brief directly to you -- 20 minutes. I'll have my SE walk through a working demo we built for this exact use case. No deck, just a working session.",
          "",
          "[Your name]"
        ].join("\n")
      };

    case "New persona outreach":
      return {
        subject: `${shortIndustry} data question -- ${persona.title}`,
        body: [
          "Hi [Name],",
          "",
          `I support [Account]'s Snowflake relationship on the ${shortIndustry} side.`,
          "",
          `I've been looking at where the platform is being underutilized relative to what your ${persona.dept} team could be doing -- specifically around ${useCase.toLowerCase()}. The gap is usually a persona problem: the platform was stood up by data engineering, but ${persona.dept} never got a seat at the table.`,
          "",
          "My SE built a working demo of this use case. I'd like to show it to you directly before we even talk about next steps. 20 minutes.",
          "",
          "[Your name]"
        ].join("\n")
      };

    case "Use case mapping":
      return {
        subject: `[Account] -- ${firstUnconsumed} opportunity`,
        body: [
          "Hi [Name],",
          "",
          `Quick note -- I was reviewing [Account]'s Snowflake footprint and ${firstUnconsumed} hasn't been activated yet.`,
          "",
          `For ${persona.dept} teams in ${shortIndustry}, that's typically where ${shortUseCase.toLowerCase()} starts. The build time is shorter than most expect and it layers directly on what your data engineering team has already stood up.`,
          "",
          "My SE built a working version of this. Happy to walk through it -- even a quick call works. I'd rather show it than describe it.",
          "",
          "[Your name]"
        ].join("\n")
      };

    default:
      return {
        subject: `${shortUseCase} -- ${persona.dept} opportunity at [Account]`,
        body: [
          "Hi [Name],",
          "",
          `I support [Account]'s Snowflake relationship and have been looking at where the platform is underutilized relative to what your ${persona.dept} team could be doing.`,
          "",
          `The short version: ${useCase.toLowerCase()} is a natural next layer for where [Account] is today, and the path there is shorter than most expect. ${firstUnconsumed} is already in your contract and hasn't been activated.`,
          "",
          "My SE built a working demo of this use case. I'd rather show it than pitch it -- 20 minutes this week?",
          "",
          "[Your name]"
        ].join("\n")
      };
  }
}

