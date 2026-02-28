export const sections = [
  // General concepts that apply to multiple guides
  "getting_started", // General info for people new to RNG (e.g. glossary of terms)
  "rng_technique", // Specific techniques (e.g. advancing the rng)

  // Guides that result in obtaining something through RNG
  "pokemon_rng", // Obtaining a Pokemon (e.g. shiny legendary)
  "other_rng", // Obtaining things that aren't Pokemon (e.g. trainer IDs)

  // Pages that supply additional knowledge
  "supporting_info", // Pages that provide general game info (e.g. Island Scan encounters)
  "technical_info", // Pages that provide technical information about the games (e.g. how Pokerus works)

  // Pages about game companions or enhancements
  "tool", // Software that exists outside the game (e.g. PokeFinder)
  "patch", // Game patches (e.g. ORAS time penalty remover patch)

  // Pages that support the site itself, rather than providing info
  "site_info", // Pages about the site itself (e.g. home page)
  "challenge", // Pages focused on a specific RNG challenge (e.g. USUM challenges)
] as const;

export const rngGuideSections = [
  "pokemon_rng",
  "other_rng",
  "rng_technique",
] as const;

export const rngGuideVariants = ["retail", "cfw-emu"] as const;

export const isRngGuideSection = (
  section: string,
): section is (typeof rngGuideSections)[number] => {
  return (rngGuideSections as readonly string[]).includes(section);
};
