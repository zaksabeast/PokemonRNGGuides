import { describe, expect, it } from "vitest";
import { pick } from "lodash-es";
import { openTranslationGuide } from "./guides/translationHelper";

const DPPT_TID_GUIDE = {
  category: "Diamond, Pearl, and Platinum",
  title: "Diamond, Pearl, & Platinum Cute Charm Glitch TID/SID RNG",
};

const FRENCH_DPPT_TID_FRONT_MATTER = [
  '- title: "Diamond, Pearl, & Platinum Cute Charm Glitch TID/SID RNG"',
  '  navDrawerTitle: "Cute Charm & TID/SID RNG"',
  '  description: "Learn how to use the Cute Charm Glitch and obtain a specific Trainer ID (TID) and Secret ID (SID) combo on Retail for Diamond, Pearl, & Platinum."',
  '  slug: "fr-dppt-tid-sid"',
  "  translation:",
  '    enSlug: "dppt-tid-sid"',
  '    language: "fr"',
].join("\n");

describe("Translation helper", () => {
  it("starts a guide translation in the selected language", async () => {
    const guide = await openTranslationGuide();

    await guide.selectLanguage("FR");
    await guide.selectGuide(DPPT_TID_GUIDE);

    expect(guide.guideFrontMatter()).toBe(FRENCH_DPPT_TID_FRONT_MATTER);
  });

  it("copies the edited guide", async () => {
    const guide = await openTranslationGuide();
    await guide.selectLanguage("FR");
    await guide.selectGuide(DPPT_TID_GUIDE);

    guide.editGuideFile("Guide traduit");

    expect(guide.copyGuideFile()).toBe("Guide traduit");
  });

  it("starts tool translations in the selected language", async () => {
    const guide = await openTranslationGuide();

    await guide.selectLanguage("FR");
    await guide.translateTools();

    expect(guide.toolTranslation("Shiny")).toBe("Chromatique");
  });

  it("copies the edited tool translations", async () => {
    const guide = await openTranslationGuide();
    await guide.selectLanguage("FR");
    await guide.translateTools();

    guide.editToolTranslation("Shiny", "Brillant");

    expect(
      pick(guide.copyToolTranslations(), ["language", "Shiny", "Calibrate"]),
    ).toEqual({ language: "fr", Shiny: "Brillant", Calibrate: "Calibrer" });
  });
});
