import React from "react";
import { memoize } from "lodash-es";

export const guides = {
  "/": {
    meta: {
      id: "/",
      categories: ["Home"],
      section: "site_info",
      guideVariants: null,
      guideKey: "/",
      isNew: false,
      title: "Pokemon RNG - Become The Very Best",
      navDrawerTitle: "Pokemon RNG - Become The Very Best",
      description:
        "Learn retail and emulator RNG with our Pokémon guides and tools",
      slug: "/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Home.mdx",
      translations: null,
      guideGroupId: "en:/:Home",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Home.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Home.mdx?raw");
      return file.default;
    }),
  },
  "/3ds-alt-settings/": {
    meta: {
      id: "/3ds-alt-settings/",
      categories: ["HeartGold and SoulSilver", "Diamond, Pearl, and Platinum"],
      section: "tool",
      guideVariants: null,
      guideKey: "/3ds-alt-settings/",
      isNew: false,
      title: "3DS Alt Settings - 3DS Settings App for RNG",
      navDrawerTitle: "3DS Alt Settings",
      description:
        "Set 3DS system time without rebooting - useful for faster, more consistent Pokemon RNG attempts.",
      slug: "/3ds-alt-settings/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS Alt Settings.mdx",
      translations: { en: "/3ds-alt-settings/", zh: "/zh-3ds-alt-settings/" },
      guideGroupId:
        "en:/3ds-alt-settings/:Diamond, Pearl, and Platinum|HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/3DS Alt Settings.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/3DS Alt Settings.mdx?raw");
      return file.default;
    }),
  },
  "/3ds-helper/": {
    meta: {
      id: "/3ds-helper/",
      categories: [
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/3ds-helper/",
      isNew: false,
      title: "3DS Timer Helper",
      navDrawerTitle: "3DS Timer Helper",
      description:
        "Easier 3DS RNG without homebrew using precise timer starts.",
      slug: "/3ds-helper/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS Helper.mdx",
      translations: { en: "/3ds-helper/", zh: "/zh-3ds-helper/" },
      guideGroupId:
        "en:/3ds-helper/:Black 2 and White 2|Black and White|Diamond, Pearl, and Platinum|HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/3DS Helper.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/3DS Helper.mdx?raw");
      return file.default;
    }),
  },
  "/about/": {
    meta: {
      id: "/about/",
      categories: ["Home"],
      section: "site_info",
      guideVariants: null,
      guideKey: "/about/",
      isNew: false,
      title: "About us",
      navDrawerTitle: "About us",
      description:
        "Learn retail and emulator RNG with our Pokémon guides and tools",
      slug: "/about/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/About.mdx",
      translations: null,
      guideGroupId: "en:/about/:Home",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/About.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/About.mdx?raw");
      return file.default;
    }),
  },
  "/azahar-setup/": {
    meta: {
      id: "/azahar-setup/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/azahar-setup/",
      isNew: false,
      title: "Azahar Setup - Install Pokemon CIAs",
      navDrawerTitle: "Azahar Setup",
      description: "Learn how to dump and install Pokemon CIAs on Azahar.",
      slug: "/azahar-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Azahar Setup.mdx",
      translations: null,
      guideGroupId:
        "en:/azahar-setup/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Azahar Setup.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Azahar Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/bdsp-advance-rng/": {
    meta: {
      id: "/bdsp-advance-rng/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "advance-rng",
      isNew: false,
      title: "Advancing the RNG in Brilliant Diamond and Shining Pearl",
      navDrawerTitle: "Advancing the RNG",
      description:
        "How RNG advances work in Brilliant Diamond and Shining Pearl. Learn what advances the RNG and how to control it for perfect Pokémon.",
      slug: "/bdsp-advance-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx",
      translations: { en: "/bdsp-advance-rng/", fr: "/fr-bdsp-advance-rng/" },
      guideGroupId: "en:advance-rng:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/bdsp-advance-rng/" },
        cfwEmu: { type: "slug", slug: "/bdsp-advance-rng/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/bdsp-chatot/": {
    meta: {
      id: "/bdsp-chatot/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "tool",
      guideVariants: null,
      guideKey: "/bdsp-chatot/",
      isNew: false,
      title: "How to Use Chatot for Brilliant Diamond and Shining Pearl",
      navDrawerTitle: "Chatot RNG Tool",
      description:
        "How to use the chatot.pokemonrng.com website for RNG in Brilliant Diamond and Shining Pearl.",
      slug: "/bdsp-chatot/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx",
      translations: null,
      guideGroupId: "en:/bdsp-chatot/:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: null,
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx?raw"
      );
      return file.default;
    }),
  },
  "/bdsp-emulator-setup/": {
    meta: {
      id: "/bdsp-emulator-setup/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "tool",
      guideVariants: null,
      guideKey: "/bdsp-emulator-setup/",
      isNew: false,
      title: "How to set up Ryujinx & CheatEngine",
      navDrawerTitle: "Ryujinx Set Up",
      description:
        "How to set up Ryujinx or Yuzu and Cheat Engine to RNG in Brilliant Diamond and Shining Pearl using lua scripts.",
      slug: "/bdsp-emulator-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx",
      translations: null,
      guideGroupId:
        "en:/bdsp-emulator-setup/:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/bdsp-pokefinder/": {
    meta: {
      id: "/bdsp-pokefinder/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "tool",
      guideVariants: null,
      guideKey: "/bdsp-pokefinder/",
      isNew: false,
      title: "BDSP RNG Guide - Setup PokeFinder for shiny hunting",
      navDrawerTitle: "PokeFinder Setup",
      description:
        "Step-by-step guide to set up PokeFinder for RNG abuse in Brilliant Diamond and Shining Pearl.",
      slug: "/bdsp-pokefinder/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx",
      translations: null,
      guideGroupId: "en:/bdsp-pokefinder/:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx?raw"
      );
      return file.default;
    }),
  },
  "/black-2-and-white-2/": {
    meta: {
      id: "/black-2-and-white-2/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/black-2-and-white-2/",
      isNew: false,
      title: "Black 2 and White 2",
      navDrawerTitle: "Black 2 and White 2",
      description: "Black 2 and White 2 Resources",
      slug: "/black-2-and-white-2/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/black-2-and-white-2/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/black-and-white/": {
    meta: {
      id: "/black-and-white/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/black-and-white/",
      isNew: false,
      title: "Black and White",
      navDrawerTitle: "Black and White",
      description: "Black and White Resources",
      slug: "/black-and-white/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/black-and-white/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/brilliant-diamond-and-shining-pearl/": {
    meta: {
      id: "/brilliant-diamond-and-shining-pearl/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/brilliant-diamond-and-shining-pearl/",
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl",
      navDrawerTitle: "Brilliant Diamond and Shining Pearl",
      description: "Brilliant Diamond and Shining Pearl Resources",
      slug: "/brilliant-diamond-and-shining-pearl/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/brilliant-diamond-and-shining-pearl/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/bw-calibration/": {
    meta: {
      id: "/bw-calibration/",
      categories: ["Black and White"],
      section: "tool",
      guideVariants: null,
      guideKey: "/bw-calibration/",
      isNew: true,
      title: "Black and White Calibration Helper",
      navDrawerTitle: "Calibration Helper",
      description:
        "A tool to help with calibrating your RNG setup for Black and White.",
      slug: "/bw-calibration/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-28",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-28",
      type: "baseGuide",
      file: "guides/Gen 5/Calibration.mdx",
      translations: null,
      guideGroupId: "en:/bw-calibration/:Black and White",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Calibration.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Calibration.mdx?raw");
      return file.default;
    }),
  },
  "/bw-emu-starter/": {
    meta: {
      id: "/bw-emu-starter/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "starter",
      isNew: true,
      title: "Black and White Starter RNG",
      navDrawerTitle: "Starter RNG",
      description:
        "Learn how to RNG starters in Black and White for shiny, high-IV Pokémon.",
      slug: "/bw-emu-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-25",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-26",
      type: "baseGuide",
      file: "guides/Gen 5/BW Emu Starter.mdx",
      translations: null,
      guideGroupId: "en:starter:Black and White",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-bw-starter/" },
        cfwEmu: { type: "slug", slug: "/bw-emu-starter/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/BW Emu Starter.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/BW Emu Starter.mdx?raw");
      return file.default;
    }),
  },
  "/bw2-calibration/": {
    meta: {
      id: "/bw2-calibration/",
      categories: ["Black 2 and White 2"],
      section: "tool",
      guideVariants: null,
      guideKey: "/bw2-calibration/",
      isNew: true,
      title: "Black 2 and White 2 Calibration Helper",
      navDrawerTitle: "Calibration Helper",
      description:
        "A tool to help with calibrating your RNG setup for Black 2 and White 2.",
      slug: "/bw2-calibration/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-28",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-28",
      type: "baseGuide",
      file: "guides/Gen 5/Calibration.mdx",
      translations: null,
      guideGroupId: "en:/bw2-calibration/:Black 2 and White 2",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Calibration.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Calibration.mdx?raw");
      return file.default;
    }),
  },
  "/bw2-egg/": {
    meta: {
      id: "/bw2-egg/",
      categories: ["Black 2 and White 2"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "egg",
      isNew: false,
      title: "Black 2 and White 2 Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Black 2 and White 2 for shiny, high-IV Pokémon.",
      slug: "/bw2-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 5/BW2 Egg.mdx",
      translations: { en: "/bw2-egg/", zh: "/zh-bw2-egg/" },
      guideGroupId: "en:egg:Black 2 and White 2",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/bw2-egg/" },
        cfwEmu: { type: "slug", slug: "/bw2-egg/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/BW2 Egg.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/BW2 Egg.mdx?raw");
      return file.default;
    }),
  },
  "/cfw-bdsp-egg/": {
    meta: {
      id: "/cfw-bdsp-egg/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/cfw-bdsp-egg/",
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs in Brilliant Diamond and Shining Pearl on a CFW Switch for shiny perfect Pokemon.",
      slug: "/cfw-bdsp-egg/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Egg.mdx",
      translations: null,
      guideGroupId: "en:/cfw-bdsp-egg/:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/cfw-bdsp-egg/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Brilliant Diamond and Shining Pearl/Egg.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/cfw-bdsp-stationary/": {
    meta: {
      id: "/cfw-bdsp-stationary/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/cfw-bdsp-stationary/",
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG flawless or shiny legendaries in Brilliant Diamond and Shining Pearl using CFW.",
      slug: "/cfw-bdsp-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Stationary.mdx",
      translations: null,
      guideGroupId:
        "en:/cfw-bdsp-stationary/:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/cfw-bdsp-stationary/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/Stationary.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/Stationary.mdx?raw"
      );
      return file.default;
    }),
  },
  "/cfw-bdsp-tidandsid/": {
    meta: {
      id: "/cfw-bdsp-tidandsid/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/cfw-bdsp-tidandsid/",
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl TID/SID RNG",
      navDrawerTitle: "TID/SID RNG",
      description:
        "Learn how to RNG your Trainer and Secret ID in Brilliant Diamond and Shining Pearl with CFW.",
      slug: "/cfw-bdsp-tidandsid/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx",
      translations: null,
      guideGroupId:
        "en:/cfw-bdsp-tidandsid/:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/cfw-bdsp-tidandsid/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/cfw-bdsp-wild/": {
    meta: {
      id: "/cfw-bdsp-wild/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/cfw-bdsp-wild/",
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "RNG wild Pokémon in Brilliant Diamond and Shining Pearl using CFW.",
      slug: "/cfw-bdsp-wild/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Wild.mdx",
      translations: null,
      guideGroupId: "en:/cfw-bdsp-wild/:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/cfw-bdsp-wild/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Brilliant Diamond and Shining Pearl/Wild.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Brilliant Diamond and Shining Pearl/Wild.mdx?raw"
      );
      return file.default;
    }),
  },
  "/challenge-usum-ta/": {
    meta: {
      id: "/challenge-usum-ta/",
      categories: ["USUM Challenges"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/challenge-usum-ta/",
      isNew: false,
      title: "USUM Tool Assisted Challenge",
      navDrawerTitle: "Tool Assisted",
      description:
        "Join the leaderboard and earn rewards by completing challenges in USUM",
      slug: "/challenge-usum-ta/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Challenges.mdx",
      translations: null,
      guideGroupId: "en:/challenge-usum-ta/:USUM Challenges",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Challenges.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Challenges.mdx?raw");
      return file.default;
    }),
  },
  "/channel-jirachi/": {
    meta: {
      id: "/channel-jirachi/",
      categories: ["Gamecube"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/channel-jirachi/",
      isNew: false,
      title: "(PAL) Channel RNG",
      navDrawerTitle: "(PAL) Channel RNG",
      description: "Step-by-step guide to RNG the Channel Jirachi.",
      slug: "/channel-jirachi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gamecube/Channel.mdx",
      translations: { en: "/channel-jirachi/", zh: "/zh-channel-jirachi/" },
      guideGroupId: "en:/channel-jirachi/:Gamecube",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/channel-jirachi/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gamecube/Channel.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gamecube/Channel.mdx?raw");
      return file.default;
    }),
  },
  "/citrarng-setup/": {
    meta: {
      id: "/citrarng-setup/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/citrarng-setup/",
      isNew: false,
      title: "3DS Emulator Setup (Azahar/Lime3DS/Citra)",
      navDrawerTitle: "Azahar Setup",
      description:
        "Set up Azahar, Lime3DS, or Citra for 3DS RNG, including cart dumping and installing game updates.",
      slug: "/citrarng-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/CitraRNG Setup.mdx",
      translations: null,
      guideGroupId:
        "en:/citrarng-setup/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/CitraRNG Setup.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/CitraRNG Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/connect-dolphin-to-gba/": {
    meta: {
      id: "/connect-dolphin-to-gba/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/connect-dolphin-to-gba/",
      isNew: false,
      title: "Connect Dolphin to mGBA",
      navDrawerTitle: "Connect Dolphin to mGBA",
      description:
        "Learn how to redeem Jirachi or transfer your RNGs to a GBA game.",
      slug: "/connect-dolphin-to-gba/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "baseGuide",
      file: "guides/Tools and Emulators/Connect Dolphin To GBA.mdx",
      translations: {
        en: "/connect-dolphin-to-gba/",
        zh: "/zh-connect-dolphin-to-gba/",
      },
      guideGroupId:
        "en:/connect-dolphin-to-gba/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Tools and Emulators/Connect Dolphin To GBA.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Connect Dolphin To GBA.mdx?raw"
      );
      return file.default;
    }),
  },
  "/consistent-platinum-rng/": {
    meta: {
      id: "/consistent-platinum-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/consistent-platinum-rng/",
      isNew: false,
      title: "More consistent Platinum RNG",
      navDrawerTitle: "Consistent Platinum RNG",
      description:
        "New research for more consistent Platinum RNG—get shiny, high-IV Pokémon more easily.",
      slug: "/consistent-platinum-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Consistent Platinum RNG.mdx",
      translations: null,
      guideGroupId: "en:/consistent-platinum-rng/:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/consistent-platinum-rng/" },
        cfwEmu: { type: "slug", slug: "/consistent-platinum-rng/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Consistent Platinum RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Consistent Platinum RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/contributing/": {
    meta: {
      id: "/contributing/",
      categories: ["Home"],
      section: "site_info",
      guideVariants: null,
      guideKey: "/contributing/",
      isNew: false,
      title: "Contribute Pokémon RNG Guides",
      navDrawerTitle: "Contributing",
      description:
        "Learn how to contribute Pokémon RNG guides, translations, and tools. Help improve tutorials for RNG manipulation across Pokémon games.",
      slug: "/contributing/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-29",
      type: "baseGuide",
      file: "guides/Contributing.mdx",
      translations: null,
      guideGroupId: "en:/contributing/:Home",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Contributing.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Contributing.mdx?raw");
      return file.default;
    }),
  },
  "/crystal/": {
    meta: {
      id: "/crystal/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/crystal/",
      isNew: false,
      title: "Crystal",
      navDrawerTitle: "Crystal",
      description: "Crystal Resources",
      slug: "/crystal/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/crystal/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/de-e-tips-rng/": {
    meta: {
      id: "/e-tips-rng/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/e-tips-rng/",
      isNew: false,
      title: "Smaragd RNG Info",
      navDrawerTitle: "RNG Info",
      description:
        "Erfahre, wie man den RNG vorantreibt und die Stabilität in Pokémon Smaragd verbessert, um konstante Ergebnisse zu erzielen",
      slug: "/de-e-tips-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/e-tips-rng/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-09",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Basic Rules of RNG.mdx",
      translations: {
        de: "/de-e-tips-rng/",
        en: "/e-tips-rng/",
        it: "/it-e-tips-rng/",
        zh: "/zh-e-tips-rng/",
      },
      guideGroupId: "de:/e-tips-rng/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/de/Gen 3/Emerald/Basic Rules of RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Basic Rules of RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-advancing-rng-techniques/": {
    meta: {
      id: "/emerald-advancing-rng-techniques/",
      categories: ["Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/emerald-advancing-rng-techniques/",
      isNew: false,
      title: "Übersicht der RNG-Advancing-Techniken",
      navDrawerTitle: "Übersicht der RNG-Advancing-Techniken",
      description:
        "Verständnis der wichtigsten Konzepte zur Beschleunigung von RNG-Manipulationen mit Painting Reseeding und Kampfaufzeichnungs-Reseeding.",
      slug: "/de-emerald-advancing-rng-techniques/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emerald-advancing-rng-techniques/",
        language: "de",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Advancing RNG Techniques.mdx",
      translations: {
        de: "/de-emerald-advancing-rng-techniques/",
        en: "/emerald-advancing-rng-techniques/",
      },
      guideGroupId: "de:/emerald-advancing-rng-techniques/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/de/Gen 3/Emerald/Advancing RNG Techniques.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Advancing RNG Techniques.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-battle-video/": {
    meta: {
      id: "/emerald-battle-video/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/emerald-battle-video/",
      isNew: true,
      title: "Kampfaufzeichnung",
      navDrawerTitle: "Kampfaufzeichnung",
      description:
        "So erstellst du eine optimale Kampfaufzeichnung, um den RNG-Zustand zu speichern und wiederherzustellen.",
      slug: "/de-emerald-battle-video/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2026-03-24",
      translation: { enSlug: "/emerald-battle-video/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Battle Video.mdx",
      translations: {
        de: "/de-emerald-battle-video/",
        en: "/emerald-battle-video/",
      },
      guideGroupId: "de:/emerald-battle-video/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/de/Gen 3/Emerald/Battle Video.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Battle Video.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-mirage-island/": {
    meta: {
      id: "/emerald-mirage-island/",
      categories: ["Emerald"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "/emerald-mirage-island/",
      isNew: false,
      title: "Wundereiland in Smaragd",
      navDrawerTitle: "Wundereiland",
      description:
        "Lerne, wie du Wundereiland in Pokémon Smaragd betrittst, indem du ein Pokémon mit der richtigen PID mittels RNG-Manipulation fängst.",
      slug: "/de-emerald-mirage-island/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-11",
      translation: { enSlug: "/emerald-mirage-island/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-19",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        de: "/de-emerald-mirage-island/",
        en: "/emerald-mirage-island/",
        zh: "/zh-emerald-mirage-island/",
      },
      guideGroupId: "de:/emerald-mirage-island/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/de/Gen 3/Emerald/Mirage Island.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Mirage Island.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-overview/": {
    meta: {
      id: "/emerald-overview/",
      categories: ["Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/emerald-overview/",
      isNew: false,
      title: "Smaragd Übersicht",
      navDrawerTitle: "Smaragd Übersicht",
      description:
        "Praktische Anwendungen der RNG-Manipulation und Techniken in Pokemon Smaragd.",
      slug: "/de-emerald-overview/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/emerald-overview/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-09",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Emerald Overview.mdx",
      translations: {
        de: "/de-emerald-overview/",
        en: "/emerald-overview/",
        it: "/it-emerald-overview/",
      },
      guideGroupId: "de:/emerald-overview/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/de/Gen 3/Emerald/Emerald Overview.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Emerald Overview.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-painting-rng/": {
    meta: {
      id: "/emerald-painting-rng/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emerald-painting-rng/",
      isNew: false,
      title: "RNG-Reseed mit Gemälden",
      navDrawerTitle: "Gemälde RNG",
      description:
        "Lerne, wie du den RNG in Pokémon Smaragd mithilfe von Gemälden reseedest, um dein Wunsch-Pokémon ohne lange Wartezeiten zu erhalten.",
      slug: "/de-emerald-painting-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emerald-painting-rng/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Reseed RNG.mdx",
      translations: {
        de: "/de-emerald-painting-rng/",
        en: "/emerald-painting-rng/",
        zh: "/zh-emerald-painting-rng/",
      },
      guideGroupId: "de:/emerald-painting-rng/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Reseed RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Reseed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-pokerus-emu/": {
    meta: {
      id: "/emerald-pokerus-emu/",
      categories: ["Emerald"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emerald-pokerus-emu/",
      isNew: false,
      title: "Pokérus in Smaragd",
      navDrawerTitle: "Pokérus",
      description: "Wie man sich mit dem Pokérus infiziert",
      slug: "/de-emerald-pokerus-emu/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-09",
      translation: { enSlug: "/emerald-pokerus-emu/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        de: "/de-emerald-pokerus-emu/",
        en: "/emerald-pokerus-emu/",
        zh: "/zh-emerald-pokerus-emu/",
      },
      guideGroupId: "de:/emerald-pokerus-emu/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Pokerus.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Pokerus.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-shiny-starter/": {
    meta: {
      id: "/emerald-shiny-starter/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/emerald-shiny-starter/",
      isNew: false,
      title: "Shiny Starter",
      navDrawerTitle: "Shiny Starter",
      description: "Bestimme deine SID, indem du einen Shiny Starter fängst",
      slug: "/de-emerald-shiny-starter/",
      isRoughDraft: false,
      orderPriority: 0,
      hideFromNavDrawer: true,
      addedOn: "2025-05-03",
      translation: { enSlug: "/emerald-shiny-starter/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Shiny Starter.mdx",
      translations: {
        de: "/de-emerald-shiny-starter/",
        en: "/emerald-shiny-starter/",
        zh: "/zh-emerald-shiny-starter/",
      },
      guideGroupId: "de:/emerald-shiny-starter/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/de/Gen 3/Emerald/Shiny Starter.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Shiny Starter.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emerald-sid-feebas/": {
    meta: {
      id: "/emerald-sid-feebas/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/emerald-sid-feebas/",
      isNew: false,
      title: "SID mit Barschwa in Smaragd finden",
      navDrawerTitle: "Finde SID mit Barschwa",
      description:
        "Wie du deine Secret ID (SID) in Smaragd mithilfe von Barschwa findest.",
      slug: "/de-emerald-sid-feebas/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/emerald-sid-feebas/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        de: "/de-emerald-sid-feebas/",
        en: "/emerald-sid-feebas/",
        zh: "/zh-emerald-sid-feebas/",
      },
      guideGroupId: "de:/emerald-sid-feebas/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/de/Gen 3/Emerald/Find SID with Feebas.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Find SID with Feebas.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-emulator-emerald-egg/": {
    meta: {
      id: "/emulator-emerald-egg/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "emer-egg",
      isNew: false,
      title: "Smaragd Ei-RNG",
      navDrawerTitle: "Ei-RNG",
      description:
        "Lerne, wie du in Pokémon Smaragd Eier in der Pension RNGst. Erhalte perfekte IVs, Wesen und Shinies.",
      slug: "/de-emulator-emerald-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-09",
      translation: { enSlug: "/emulator-emerald-egg/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Egg RNG.mdx",
      translations: {
        de: "/de-emulator-emerald-egg/",
        en: "/emulator-emerald-egg/",
        it: "/it-emulator-emerald-egg/",
        zh: "/zh-emulator-emerald-egg/",
      },
      guideGroupId: "de:emer-egg:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Egg RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Egg RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-frlg-gen3-sid/": {
    meta: {
      id: "/frlg-gen3-sid/",
      categories: ["FireRed and LeafGreen"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/frlg-gen3-sid/",
      isNew: false,
      title: "Feuerrot und Blattgrün SID finden",
      navDrawerTitle: "SID finden",
      description:
        "Verschiedene Methoden, um die SID in Feuerrot und Blattgrün zu finden.",
      slug: "/de-frlg-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/frlg-gen3-sid/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-frlg-gen3-sid/",
        en: "/frlg-gen3-sid/",
        it: "/it-frlg-gen3-sid/",
        zh: "/zh-frlg-gen3-sid/",
      },
      guideGroupId: "de:/frlg-gen3-sid/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-gba-overview/": {
    meta: {
      id: "/gba-overview/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/gba-overview/",
      isNew: false,
      title: "GBA Übersicht",
      navDrawerTitle: "GBA Übersicht",
      description:
        "Besonderheiten, zentrale RNG-Konzepte und Versionsunterschiede der GBA-Spiele.",
      slug: "/de-gba-overview/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/gba-overview/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/GBA Overview.mdx",
      translations: {
        de: "/de-gba-overview/",
        en: "/gba-overview/",
        zh: "/zh-gba-overview/",
      },
      guideGroupId:
        "de:/gba-overview/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/de/Gen 3/Emerald/GBA Overview.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/GBA Overview.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-gen3-sid/": {
    meta: {
      id: "/gen3-sid/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/gen3-sid/",
      isNew: false,
      title: "Smaragd SID finden",
      navDrawerTitle: "SID finden",
      description: "Verschiedene Methoden, um die SID in Smaragd zu finden.",
      slug: "/de-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/gen3-sid/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-gen3-sid/",
        en: "/gen3-sid/",
        it: "/it-gen3-sid/",
        zh: "/zh-gen3-sid/",
      },
      guideGroupId: "de:/gen3-sid/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-retail-emerald-egg/": {
    meta: {
      id: "/retail-emerald-egg/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "emer-egg",
      isNew: false,
      title: "Retail Emerald Egg RNG",
      navDrawerTitle: "Ei RNG",
      description:
        "Lerne, wie du in Pokémon Smaragd mit Hilfe der Pokémon-Pension, Eier RNG manipulieren kannst. Erhalte perfekte IVs, Wesen, und Shinies.",
      slug: "/de-retail-emerald-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-18",
      translation: { enSlug: "/retail-emerald-egg/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Retail Egg.mdx",
      translations: {
        de: "/de-retail-emerald-egg/",
        en: "/retail-emerald-egg/",
        zh: "/zh-retail-emerald-egg/",
      },
      guideGroupId: "de:emer-egg:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Retail Egg.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Retail Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-retail-emerald-wild/": {
    meta: {
      id: "/retail-emerald-wild/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-emerald-wild/",
      isNew: false,
      title: "Smaragd Retail Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Lerne, wie du wilde Pokémon in Pokémon Smaragd auf einer Retail-Konsole für perfekte IVs, Wesen und Shinies RNGst.",
      slug: "/de-retail-emerald-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-emerald-wild/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-19",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Retail Wild RNG.mdx",
      translations: {
        de: "/de-retail-emerald-wild/",
        it: "/it-retail-emerald-wild/",
        en: "/retail-emerald-wild/",
        zh: "/zh-retail-emerald-wild/",
      },
      guideGroupId: "de:/retail-emerald-wild/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/de/Gen 3/Emerald/Retail Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Retail Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-rs-gen3-sid/": {
    meta: {
      id: "/rs-gen3-sid/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/rs-gen3-sid/",
      isNew: false,
      title: "Rubin und Saphir SID finden",
      navDrawerTitle: "SID finden",
      description:
        "Verschiedene Methoden, um die SID in Rubin und Saphir zu finden.",
      slug: "/de-rs-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-gen3-sid/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-rs-gen3-sid/",
        it: "/it-rs-gen3-sid/",
        en: "/rs-gen3-sid/",
        zh: "/zh-rs-gen3-sid/",
      },
      guideGroupId: "de:/rs-gen3-sid/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-rs-mirage-island/": {
    meta: {
      id: "/rs-mirage-island/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "/rs-mirage-island/",
      isNew: false,
      title: "Wundereiland in Rubin und Saphir",
      navDrawerTitle: "Wundereiland",
      description:
        "Lerne, wie du Wundereiland in Pokémon Rubin und Saphir betrittst, indem du ein Pokémon mit der richtigen PID mittels RNG-Manipulation fängst.",
      slug: "/de-rs-mirage-island/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-11",
      translation: { enSlug: "/rs-mirage-island/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-19",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        de: "/de-rs-mirage-island/",
        en: "/rs-mirage-island/",
        zh: "/zh-rs-mirage-island/",
      },
      guideGroupId: "de:/rs-mirage-island/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/de/Gen 3/Emerald/Mirage Island.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Mirage Island.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-rs-pokerus-emu/": {
    meta: {
      id: "/rs-pokerus-emu/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "rs-pokerus",
      isNew: false,
      title: "Pokérus in Rubin und Saphir",
      navDrawerTitle: "Pokérus",
      description: "Wie man sich mit dem Pokérus infiziert",
      slug: "/de-rs-pokerus-emu/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-09",
      translation: { enSlug: "/rs-pokerus-emu/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        de: "/de-rs-pokerus-emu/",
        en: "/rs-pokerus-emu/",
        zh: "/zh-rs-pokerus-emu/",
      },
      guideGroupId: "de:rs-pokerus:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/de/Gen 3/Emerald/Pokerus.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Pokerus.mdx?raw"
      );
      return file.default;
    }),
  },
  "/de-rs-sid-feebas/": {
    meta: {
      id: "/rs-sid-feebas/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/rs-sid-feebas/",
      isNew: false,
      title: "SID mit Barschwa in Rubin und Saphir finden",
      navDrawerTitle: "Finde SID mit Barschwa",
      description:
        "Wie du deine Secret ID (SID) in Rubin oder Saphir mithilfe von Barschwa findest.",
      slug: "/de-rs-sid-feebas/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-sid-feebas/", language: "de" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "translatedGuide",
      file: "guides/Translations/de/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        de: "/de-rs-sid-feebas/",
        en: "/rs-sid-feebas/",
        zh: "/zh-rs-sid-feebas/",
      },
      guideGroupId: "de:/rs-sid-feebas/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/de/Gen 3/Emerald/Find SID with Feebas.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/de/Gen 3/Emerald/Find SID with Feebas.mdx?raw"
      );
      return file.default;
    }),
  },
  "/delete-pokemon-save/": {
    meta: {
      id: "/delete-pokemon-save/",
      categories: [
        "Ruby and Sapphire",
        "FireRed and LeafGreen",
        "Emerald",
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
        "Sword and Shield",
        "Brilliant Diamond and Shining Pearl",
        "Legends Arceus",
      ],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/delete-pokemon-save/",
      isNew: false,
      title: "How to delete Pokemon save files",
      navDrawerTitle: "Delete Save Files",
      description: "How to delete a Pokemon save file to start a new game.",
      slug: "/delete-pokemon-save/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-10",
      type: "baseGuide",
      file: "guides/Tools and Emulators/Delete Save.mdx",
      translations: {
        en: "/delete-pokemon-save/",
        es: "/es-delete-pokemon-save/",
        zh: "/zh-delete-pokemon-save/",
      },
      guideGroupId:
        "en:/delete-pokemon-save/:Black 2 and White 2|Black and White|Brilliant Diamond and Shining Pearl|Diamond, Pearl, and Platinum|Emerald|FireRed and LeafGreen|HeartGold and SoulSilver|Legends Arceus|Omega Ruby and Alpha Sapphire|Ruby and Sapphire|Sun and Moon|Sword and Shield|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Delete Save.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Delete Save.mdx?raw"
      );
      return file.default;
    }),
  },
  "/desmume-setup/": {
    meta: {
      id: "/desmume-setup/",
      categories: [
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/desmume-setup/",
      isNew: false,
      title: "Desmume Setup",
      navDrawerTitle: "Desmume Setup",
      description:
        "Learn how to set up DeSmuME for RNG, including cart dumping, save extraction, and using lua scripts.",
      slug: "/desmume-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "baseGuide",
      file: "guides/Tools and Emulators/Desmume Setup.mdx",
      translations: { en: "/desmume-setup/", zh: "/zh-desmume-setup/" },
      guideGroupId:
        "en:/desmume-setup/:Black 2 and White 2|Black and White|Diamond, Pearl, and Platinum|HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Desmume Setup.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Desmume Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/diamond-pearl-and-platinum/": {
    meta: {
      id: "/diamond-pearl-and-platinum/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/diamond-pearl-and-platinum/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum",
      navDrawerTitle: "Diamond, Pearl, and Platinum",
      description: "Diamond, Pearl, and Platinum Resources",
      slug: "/diamond-pearl-and-platinum/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/diamond-pearl-and-platinum/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/dppt-3ds-rng/": {
    meta: {
      id: "/dppt-3ds-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/dppt-3ds-rng/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum 3DS RNG",
      navDrawerTitle: "3DS RNG",
      description:
        "Learn how to RNG using a 3DS in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.",
      slug: "/dppt-3ds-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS RNG.mdx",
      translations: { en: "/dppt-3ds-rng/", zh: "/zh-dppt-3ds-rng/" },
      guideGroupId: "en:/dppt-3ds-rng/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/3DS RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/3DS RNG.mdx?raw");
      return file.default;
    }),
  },
  "/dppt-advance-rng/": {
    meta: {
      id: "/dppt-advance-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/dppt-advance-rng/",
      isNew: false,
      title: "Advancing the RNG in Diamond, Pearl, and Platinum",
      navDrawerTitle: "Advancing the RNG",
      description:
        "Learn how to advance the RNG in Diamond, Pearl, and Platinum. This guide explains different methods like journal flips, Chatot chatters, and NPC actions.",
      slug: "/dppt-advance-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
      translations: {
        en: "/dppt-advance-rng/",
        es: "/es-dppt-advance-rng/",
        zh: "/zh-dppt-advance-rng/",
      },
      guideGroupId: "en:/dppt-advance-rng/:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-advance-rng/" },
        cfwEmu: { type: "slug", slug: "/dppt-advance-rng/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/dppt-cute-charm/": {
    meta: {
      id: "/dppt-cute-charm/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/dppt-cute-charm/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in Diamond, Pearl, and Platinum.",
      slug: "/dppt-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: { en: "/dppt-cute-charm/", zh: "/zh-dppt-cute-charm/" },
      guideGroupId: "en:/dppt-cute-charm/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Cute Charm.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Cute Charm.mdx?raw");
      return file.default;
    }),
  },
  "/dppt-initial-seed-retail/": {
    meta: {
      id: "/dppt-initial-seed-retail/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "dppt-init-seed",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Retail Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "Learn how to RNG your initial seed in Diamond, Pearl, and Platinum on a physical console.",
      slug: "/dppt-initial-seed-retail/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Retail Initial Seed.mdx",
      translations: {
        en: "/dppt-initial-seed-retail/",
        zh: "/zh-dppt-initial-seed-retail/",
      },
      guideGroupId: "en:dppt-init-seed:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-initial-seed-retail/" },
        cfwEmu: { type: "slug", slug: "/dppt-initial-seed/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Retail Initial Seed.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Retail Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/dppt-initial-seed/": {
    meta: {
      id: "/dppt-initial-seed/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "dppt-init-seed",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "Learn how to RNG your initial seed in Diamond, Pearl, and Platinum.",
      slug: "/dppt-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx",
      translations: { en: "/dppt-initial-seed/", zh: "/zh-dppt-initial-seed/" },
      guideGroupId: "en:dppt-init-seed:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-initial-seed-retail/" },
        cfwEmu: { type: "slug", slug: "/dppt-initial-seed/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/dppt-pokeradar-rng/": {
    meta: {
      id: "/dppt-pokeradar-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "pokeradar",
      isNew: false,
      title: "Diamond, Pearl, and Platinum PokeRadar RNG",
      navDrawerTitle: "PokeRadar RNG",
      description:
        "Learn two different methods for RNG manipulation with the PokéRadar in Diamond, Pearl, and Platinum.",
      slug: "/dppt-pokeradar-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx",
      translations: {
        en: "/dppt-pokeradar-rng/",
        zh: "/zh-dppt-pokeradar-rng/",
      },
      guideGroupId: "en:pokeradar:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-pokeradar-rng/" },
        cfwEmu: { type: "slug", slug: "/dppt-pokeradar-rng/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx?raw"
      );
      return file.default;
    }),
  },
  "/dppt-setup-rng/": {
    meta: {
      id: "/dppt-setup-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "honey-tree",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Honey Tree RNG",
      navDrawerTitle: "Honey Tree RNG",
      description:
        "Learn how to RNG Pokémon from Honey Trees in Diamond, Pearl, and Platinum for shiny and high-IV results.",
      slug: "/dppt-setup-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Honey.mdx",
      translations: null,
      guideGroupId: "en:honey-tree:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-setup-rng/" },
        cfwEmu: { type: "slug", slug: "/dppt-setup-rng/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Honey.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Honey.mdx?raw"
      );
      return file.default;
    }),
  },
  "/dppt-tid-sid/": {
    meta: {
      id: "/dppt-tid-sid/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "tid-sid",
      isNew: false,
      title: "Diamond, Pearl, & Platinum Cute Charm Glitch TID/SID RNG",
      navDrawerTitle: "Cute Charm & TID/SID RNG",
      description:
        "Learn how to use the Cute Charm Glitch and obtain a specific Trainer ID (TID) and Secret ID (SID) combo on Retail for Diamond, Pearl, & Platinum.",
      slug: "/dppt-tid-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-06-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-29",
      type: "baseGuide",
      file: "guides/Gen 4/Retail TID.mdx",
      translations: { en: "/dppt-tid-sid/", zh: "/zh-dppt-tid-sid/" },
      guideGroupId: "en:tid-sid:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-tid-sid/" },
        cfwEmu: { type: "slug", slug: "/emulator-dppt-tid-sid/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Retail TID.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Retail TID.mdx?raw");
      return file.default;
    }),
  },
  "/dppt-wild/": {
    meta: {
      id: "/dppt-wild/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "wild",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Wild RNG Guide",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Diamond, Pearl, and Platinum for shiny and high-IV results.",
      slug: "/dppt-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx",
      translations: { en: "/dppt-wild/", zh: "/zh-dppt-wild/" },
      guideGroupId: "en:wild:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-wild/" },
        cfwEmu: { type: "slug", slug: "/dppt-wild/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx?raw"
      );
      return file.default;
    }),
  },
  "/dream-radar-cart-patches/": {
    meta: {
      id: "/dream-radar-cart-patches/",
      categories: ["Transporter and Dream Radar"],
      section: "patch",
      guideVariants: null,
      guideKey: "/dream-radar-cart-patches/",
      isNew: false,
      title: "Pokemon Dream Radar Gen 4 Cart Patches",
      navDrawerTitle: "Gen 4 Cart Patches",
      description:
        "Trick Pokemon Dream Radar into thinking it has Diamond, Pearl, Platinum, HeartGold, or SoulSilver inserted to unlock Gen 4 Legendaries.",
      slug: "/dream-radar-cart-patches/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-17",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "baseGuide",
      file: "guides/Transporter/Gen 4 Cart Patches.mdx",
      translations: null,
      guideGroupId: "en:/dream-radar-cart-patches/:Transporter and Dream Radar",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Transporter/Gen 4 Cart Patches.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Transporter/Gen 4 Cart Patches.mdx?raw"
      );
      return file.default;
    }),
  },
  "/dream-radar-patches/": {
    meta: {
      id: "/dream-radar-patches/",
      categories: ["Transporter and Dream Radar"],
      section: "patch",
      guideVariants: null,
      guideKey: "/dream-radar-patches/",
      isNew: false,
      title: "Dream Radar No-Cart Patch",
      navDrawerTitle: "Dream Radar No-Cart Patch",
      description:
        "Learn how to patch Pokémon Dream Radar on the 3DS to load saves from TWiLightMenu, nds-bootstrap, or emulators — no game cart needed.",
      slug: "/dream-radar-patches/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Dream Radar Patches.mdx",
      translations: null,
      guideGroupId: "en:/dream-radar-patches/:Transporter and Dream Radar",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Dream Radar Patches.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Dream Radar Patches.mdx?raw"
      );
      return file.default;
    }),
  },
  "/e-tips-rng/": {
    meta: {
      id: "/e-tips-rng/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/e-tips-rng/",
      isNew: false,
      title: "Emerald RNG Info",
      navDrawerTitle: "RNG Info",
      description:
        "Learn how to advance the RNG and improve stability in Pokemon Emerald for consistent results.",
      slug: "/e-tips-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-09",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Basic Rules of RNG.mdx",
      translations: {
        de: "/de-e-tips-rng/",
        en: "/e-tips-rng/",
        it: "/it-e-tips-rng/",
        zh: "/zh-e-tips-rng/",
      },
      guideGroupId: "en:/e-tips-rng/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/e-tips-rng/" },
        cfwEmu: { type: "slug", slug: "/e-tips-rng/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Basic Rules of RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Basic Rules of RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-advancing-rng-techniques/": {
    meta: {
      id: "/emerald-advancing-rng-techniques/",
      categories: ["Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/emerald-advancing-rng-techniques/",
      isNew: false,
      title: "RNG Advancing Techniques",
      navDrawerTitle: "RNG Advancing Techniques",
      description:
        "Understanding the key concepts to speed up RNG manipulations with Painting Reseeding and Battle Video Reseeding.",
      slug: "/emerald-advancing-rng-techniques/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Advancing RNG Techniques.mdx",
      translations: {
        de: "/de-emerald-advancing-rng-techniques/",
        en: "/emerald-advancing-rng-techniques/",
      },
      guideGroupId: "en:/emerald-advancing-rng-techniques/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Advancing RNG Techniques.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Advancing RNG Techniques.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-battle-video/": {
    meta: {
      id: "/emerald-battle-video/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/emerald-battle-video/",
      isNew: true,
      title: "Battle Video",
      navDrawerTitle: "Battle Video",
      description:
        "How to create an optimal Battle Video to save and restore the RNG state.",
      slug: "/emerald-battle-video/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-24",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Battle Video.mdx",
      translations: {
        de: "/de-emerald-battle-video/",
        en: "/emerald-battle-video/",
      },
      guideGroupId: "en:/emerald-battle-video/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/emerald-battle-video/" },
        cfwEmu: null,
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Battle Video.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Battle Video.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-mirage-island/": {
    meta: {
      id: "/emerald-mirage-island/",
      categories: ["Emerald"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "/emerald-mirage-island/",
      isNew: false,
      title: "Mirage Island in Emerald",
      navDrawerTitle: "Mirage Island",
      description:
        "Learn how to access Mirage Island in Pokémon Emerald by catching a Pokémon with the correct PID using RNG manipulation.",
      slug: "/emerald-mirage-island/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-11",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-19",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        de: "/de-emerald-mirage-island/",
        en: "/emerald-mirage-island/",
        zh: "/zh-emerald-mirage-island/",
      },
      guideGroupId: "en:/emerald-mirage-island/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/emerald-mirage-island/" },
        cfwEmu: null,
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Mirage Island.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Mirage Island.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-overview/": {
    meta: {
      id: "/emerald-overview/",
      categories: ["Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/emerald-overview/",
      isNew: false,
      title: "Emerald Overview",
      navDrawerTitle: "Emerald Overview",
      description:
        "Practical applications of RNG Manipulation and techniques in Pokémon Emerald.",
      slug: "/emerald-overview/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Emerald Overview.mdx",
      translations: {
        de: "/de-emerald-overview/",
        en: "/emerald-overview/",
        it: "/it-emerald-overview/",
      },
      guideGroupId: "en:/emerald-overview/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Emerald Overview.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Emerald Overview.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-painting-rng/": {
    meta: {
      id: "/emerald-painting-rng/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emerald-painting-rng/",
      isNew: false,
      title: "Reseed the RNG using paintings",
      navDrawerTitle: "Painting RNG",
      description:
        "Learn how to reseed the RNG using paintings in Pokémon Emerald to get the Pokémon you want quickly, without the long wait.",
      slug: "/emerald-painting-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Reseed RNG.mdx",
      translations: {
        de: "/de-emerald-painting-rng/",
        en: "/emerald-painting-rng/",
        zh: "/zh-emerald-painting-rng/",
      },
      guideGroupId: "en:/emerald-painting-rng/:Emerald",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emerald-painting-rng/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Reseed RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Reseed RNG.mdx?raw");
      return file.default;
    }),
  },
  "/emerald-painting-seed-searcher/": {
    meta: {
      id: "/emerald-painting-seed-searcher/",
      categories: ["Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/emerald-painting-seed-searcher/",
      isNew: false,
      title: "Painting Seed Searcher",
      navDrawerTitle: "Painting Seed Searcher",
      description: "Painting Seed Searcher",
      slug: "/emerald-painting-seed-searcher/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-15",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Seed To Advances.mdx",
      translations: null,
      guideGroupId: "en:/emerald-painting-seed-searcher/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Seed To Advances.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Seed To Advances.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-pokerus-emu/": {
    meta: {
      id: "/emerald-pokerus-emu/",
      categories: ["Emerald"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emerald-pokerus-emu/",
      isNew: false,
      title: "Pokérus in Emerald",
      navDrawerTitle: "Pokérus",
      description: "How to be infected by Pokérus",
      slug: "/emerald-pokerus-emu/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-05-09",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        de: "/de-emerald-pokerus-emu/",
        en: "/emerald-pokerus-emu/",
        zh: "/zh-emerald-pokerus-emu/",
      },
      guideGroupId: "en:/emerald-pokerus-emu/:Emerald",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emerald-pokerus-emu/" },
      },
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Pokerus.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Pokerus.mdx?raw");
      return file.default;
    }),
  },
  "/emerald-shiny-starter/": {
    meta: {
      id: "/emerald-shiny-starter/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/emerald-shiny-starter/",
      isNew: false,
      title: "Shiny Starter",
      navDrawerTitle: "Shiny Starter",
      description: "Determine your SID by catching a shiny starter",
      slug: "/emerald-shiny-starter/",
      isRoughDraft: false,
      orderPriority: 0,
      hideFromNavDrawer: false,
      addedOn: "2025-05-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Shiny Starter.mdx",
      translations: {
        de: "/de-emerald-shiny-starter/",
        en: "/emerald-shiny-starter/",
        zh: "/zh-emerald-shiny-starter/",
      },
      guideGroupId: "en:/emerald-shiny-starter/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/emerald-shiny-starter/" },
        cfwEmu: null,
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Shiny Starter.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Shiny Starter.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-sid-feebas/": {
    meta: {
      id: "/emerald-sid-feebas/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/emerald-sid-feebas/",
      isNew: false,
      title: "Find SID with Feebas in Emerald",
      navDrawerTitle: "Find SID with Feebas",
      description: "How to find your Secret ID (SID) in Emerald using Feebas.",
      slug: "/emerald-sid-feebas/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        de: "/de-emerald-sid-feebas/",
        en: "/emerald-sid-feebas/",
        zh: "/zh-emerald-sid-feebas/",
      },
      guideGroupId: "en:/emerald-sid-feebas/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/emerald-sid-feebas/" },
        cfwEmu: null,
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Find SID with Feebas.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Find SID with Feebas.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-static/": {
    meta: {
      id: "/emerald-static/",
      categories: ["Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/emerald-static/",
      isNew: false,
      title: "Static Tool",
      navDrawerTitle: "Static Tool",
      description: "Static encounters in Emerald",
      slug: "/emerald-static/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Static.mdx",
      translations: null,
      guideGroupId: "en:/emerald-static/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Gen 3 Static.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Gen 3 Static.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-tidsid-generator/": {
    meta: {
      id: "/emerald-tidsid-generator/",
      categories: ["Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/emerald-tidsid-generator/",
      isNew: false,
      title: "TID and SID Generator",
      navDrawerTitle: "TID and SID Generator",
      description: "Generator for TID/SID in Emerald",
      slug: "/emerald-tidsid-generator/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      guideGroupId: "en:/emerald-tidsid-generator/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-wild-method-likelihood-calculator/": {
    meta: {
      id: "/emerald-wild-method-likelihood-calculator/",
      categories: ["Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/emerald-wild-method-likelihood-calculator/",
      isNew: false,
      title: "Wild Method Likelihood Calculator",
      navDrawerTitle: "Wild Method Likelihood Calculator",
      description: "Wild Method Likelihood Calculator",
      slug: "/emerald-wild-method-likelihood-calculator/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-15",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Method Likelihood Calculator.mdx",
      translations: null,
      guideGroupId: "en:/emerald-wild-method-likelihood-calculator/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 3/Emerald/Method Likelihood Calculator.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Method Likelihood Calculator.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emerald-wild/": {
    meta: {
      id: "/emerald-wild/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/emerald-wild/",
      isNew: false,
      title: "Wild Searcher",
      navDrawerTitle: "Wild Searcher",
      description: "Wild Searcher",
      slug: "/emerald-wild/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-15",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Wild.mdx",
      translations: null,
      guideGroupId: "en:/emerald-wild/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/emerald-wild/" },
        cfwEmu: null,
      },
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Gen 3 Wild.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Gen 3 Wild.mdx?raw");
      return file.default;
    }),
  },
  "/emerald/": {
    meta: {
      id: "/emerald/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/emerald/",
      isNew: false,
      title: "Emerald",
      navDrawerTitle: "Emerald",
      description: "Emerald Resources",
      slug: "/emerald/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/emerald/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/emu-bw-egg/": {
    meta: {
      id: "/emu-bw-egg/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "egg",
      isNew: true,
      title: "Black and White Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Black and White for shiny, high-IV Pokémon.",
      slug: "/emu-bw-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-24",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-24",
      type: "baseGuide",
      file: "guides/Gen 5/BW Emu Egg RNG.mdx",
      translations: null,
      guideGroupId: "en:egg:Black and White",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emu-bw-egg/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/BW Emu Egg RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/BW Emu Egg RNG.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-b2w2-dream-radar/": {
    meta: {
      id: "/emulator-b2w2-dream-radar/",
      categories: ["Black 2 and White 2", "Transporter and Dream Radar"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-b2w2-dream-radar/",
      isNew: false,
      title: "Black 2 and White 2 Dream Radar RNG",
      navDrawerTitle: "Dream Radar RNG",
      description:
        "Learn how to RNG Level 5 Dream Ball legendary Pokémon with Hidden Abilities in Black 2 and White 2.",
      slug: "/emulator-b2w2-dream-radar/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 5/Dream Radar.mdx",
      translations: {
        en: "/emulator-b2w2-dream-radar/",
        zh: "/zh-emulator-b2w2-dream-radar/",
      },
      guideGroupId:
        "en:/emulator-b2w2-dream-radar/:Black 2 and White 2|Transporter and Dream Radar",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-b2w2-dream-radar/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Dream Radar.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Dream Radar.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-b2w2-runasdate-inital-seed/": {
    meta: {
      id: "/emulator-b2w2-runasdate-inital-seed/",
      categories: ["Black 2 and White 2"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-b2w2-runasdate-inital-seed/",
      isNew: false,
      title: "Black 2 and White 2 Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description: "Learn how to RNG your initial seed in Black 2 and White 2.",
      slug: "/emulator-b2w2-runasdate-inital-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-24",
      type: "baseGuide",
      file: "guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-b2w2-runasdate-inital-seed/",
        it: "/it-emulator-b2w2-runasdate-inital-seed/",
        zh: "/zh-emulator-b2w2-runasdate-inital-seed/",
      },
      guideGroupId:
        "en:/emulator-b2w2-runasdate-inital-seed/:Black 2 and White 2",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-b2w2-runasdate-inital-seed/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-b2w2-wild/": {
    meta: {
      id: "/emulator-b2w2-wild/",
      categories: ["Black 2 and White 2"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-b2w2-wild/",
      isNew: false,
      title: "Black 2 and White 2 Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Black 2 and White 2 for shiny and high-IV results.",
      slug: "/emulator-b2w2-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-16",
      type: "baseGuide",
      file: "guides/Gen 5/Wild RNG Emu.mdx",
      translations: {
        en: "/emulator-b2w2-wild/",
        it: "/it-emulator-b2w2-wild/",
      },
      guideGroupId: "en:/emulator-b2w2-wild/:Black 2 and White 2",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-b2w2-wild/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Wild RNG Emu.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Wild RNG Emu.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-bw-entralink/": {
    meta: {
      id: "/emulator-bw-entralink/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-entralink/",
      isNew: false,
      title: "Black and White Entralink RNG",
      navDrawerTitle: "Entralink RNG",
      description:
        "Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.",
      slug: "/emulator-bw-entralink/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 5/Entralink.mdx",
      translations: {
        en: "/emulator-bw-entralink/",
        zh: "/zh-emulator-bw-entralink/",
      },
      guideGroupId: "en:/emulator-bw-entralink/:Black and White",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-bw-entralink/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Entralink.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Entralink.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-bw-find-ds-parameters/": {
    meta: {
      id: "/emulator-bw-find-ds-parameters/",
      categories: ["Black and White"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-find-ds-parameters/",
      isNew: false,
      title: "How To Find DS Parameters in Generation 5",
      navDrawerTitle: "DS Parameters",
      description:
        "Learn how to find your DS parameters for successful RNG in Pokémon Black and White.",
      slug: "/emulator-bw-find-ds-parameters/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 5/Find DS Parameters.mdx",
      translations: {
        en: "/emulator-bw-find-ds-parameters/",
        zh: "/zh-emulator-bw-find-ds-parameters/",
      },
      guideGroupId: "en:/emulator-bw-find-ds-parameters/:Black and White",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-bw-find-ds-parameters/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Find DS Parameters.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Find DS Parameters.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-bw-roamers/": {
    meta: {
      id: "/emulator-bw-roamers/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-roamers/",
      isNew: false,
      title: "Black and White Roamer RNG",
      navDrawerTitle: "Roamer RNG",
      description:
        "Learn how to RNG Tornadus and Thundurus in Black and White for shiny and high-IV results.",
      slug: "/emulator-bw-roamers/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 5/Roamers.mdx",
      translations: {
        en: "/emulator-bw-roamers/",
        zh: "/zh-emulator-bw-roamers/",
      },
      guideGroupId: "en:/emulator-bw-roamers/:Black and White",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-bw-roamers/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Roamers.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Roamers.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-bw-runasdate-initial-seed/": {
    meta: {
      id: "/emulator-bw-runasdate-initial-seed/",
      categories: ["Black and White"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-runasdate-initial-seed/",
      isNew: false,
      title: "Black and White Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description: "Learn how to RNG your initial seed in Black and White.",
      slug: "/emulator-bw-runasdate-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-b2w2-runasdate-inital-seed/",
      lastUpdated: "2026-03-24",
      type: "baseGuide",
      file: "guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-bw-runasdate-initial-seed/",
        it: "/it-emulator-bw-runasdate-initial-seed/",
        zh: "/zh-emulator-bw-runasdate-initial-seed/",
      },
      guideGroupId: "en:/emulator-bw-runasdate-initial-seed/:Black and White",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-bw-runasdate-initial-seed/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-bw-white-forest/": {
    meta: {
      id: "/emulator-bw-white-forest/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-white-forest/",
      isNew: false,
      title: "White Forest RNG",
      navDrawerTitle: "White Forest RNG",
      description:
        "Learn how to RNG Pokémon found exclusively in White Forest in Pokémon White for desired IVs, nature, and shininess.",
      slug: "/emulator-bw-white-forest/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 5/White Forest RNG (Emu).mdx",
      translations: {
        en: "/emulator-bw-white-forest/",
        zh: "/zh-emulator-bw-white-forest/",
      },
      guideGroupId: "en:/emulator-bw-white-forest/:Black and White",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-bw-white-forest/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 5/White Forest RNG (Emu).mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 5/White Forest RNG (Emu).mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-bw-wild/": {
    meta: {
      id: "/emulator-bw-wild/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-wild/",
      isNew: false,
      title: "Black and White Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Black and White for shiny and high-IV results.",
      slug: "/emulator-bw-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-08",
      translation: null,
      layout: "guide",
      canonical: "/emulator-b2w2-wild/",
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Gen 5/Wild RNG Emu.mdx",
      translations: { en: "/emulator-bw-wild/", it: "/it-emulator-bw-wild/" },
      guideGroupId: "en:/emulator-bw-wild/:Black and White",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-bw-wild/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Wild RNG Emu.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Wild RNG Emu.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-colosseum-general/": {
    meta: {
      id: "/emulator-colosseum-general/",
      categories: ["Gamecube"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-colosseum-general/",
      isNew: false,
      title: "Colosseum General RNG",
      navDrawerTitle: "Colosseum General RNG",
      description: "RNG in Colosseum",
      slug: "/emulator-colosseum-general/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gamecube/Colosseum General Guide (Emu).mdx",
      translations: null,
      guideGroupId: "en:/emulator-colosseum-general/:Gamecube",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-colosseum-general/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/Colosseum General Guide (Emu).mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gamecube/Colosseum General Guide (Emu).mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-dppt-cute-charm/": {
    meta: {
      id: "/emulator-dppt-cute-charm/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/emulator-dppt-cute-charm/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in Diamond, Pearl, and Platinum.",
      slug: "/emulator-dppt-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/dppt-cute-charm/",
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-dppt-cute-charm/",
        zh: "/zh-emulator-dppt-cute-charm/",
      },
      guideGroupId:
        "en:/emulator-dppt-cute-charm/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Cute Charm.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Cute Charm.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-dppt-egg/": {
    meta: {
      id: "/emulator-dppt-egg/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-dppt-egg/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.",
      slug: "/emulator-dppt-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx",
      translations: { en: "/emulator-dppt-egg/", zh: "/zh-emulator-dppt-egg/" },
      guideGroupId: "en:/emulator-dppt-egg/:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-dppt-egg/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-dppt-pokefinder-setup/": {
    meta: {
      id: "/emulator-dppt-pokefinder-setup/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "tool",
      guideVariants: null,
      guideKey: "/emulator-dppt-pokefinder-setup/",
      isNew: false,
      title: "How to RNG in Diamond, Pearl, and Platinum Using PokeFinder",
      navDrawerTitle: "PokeFinder Setup",
      description:
        "Step-by-step guide to RNG Pokémon in Diamond, Pearl, and Platinum using PokeFinder.",
      slug: "/emulator-dppt-pokefinder-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx",
      translations: null,
      guideGroupId:
        "en:/emulator-dppt-pokefinder-setup/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-dppt-stationary/": {
    meta: {
      id: "/emulator-dppt-stationary/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-dppt-stationary/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies.",
      slug: "/emulator-dppt-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx",
      translations: {
        en: "/emulator-dppt-stationary/",
        zh: "/zh-emulator-dppt-stationary/",
      },
      guideGroupId:
        "en:/emulator-dppt-stationary/:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-dppt-stationary/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-dppt-tid-sid/": {
    meta: {
      id: "/emulator-dppt-tid-sid/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "tid-sid",
      isNew: false,
      title: "Diamond, Pearl, and Platinum TID/SID RNG",
      navDrawerTitle: "TID/SID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Diamond, Pearl, and Platinum.",
      slug: "/emulator-dppt-tid-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx",
      translations: {
        en: "/emulator-dppt-tid-sid/",
        zh: "/zh-emulator-dppt-tid-sid/",
      },
      guideGroupId: "en:tid-sid:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/dppt-tid-sid/" },
        cfwEmu: { type: "slug", slug: "/emulator-dppt-tid-sid/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-emerald-egg/": {
    meta: {
      id: "/emulator-emerald-egg/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "emer-egg",
      isNew: false,
      title: "Emerald Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/emulator-emerald-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-09",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Egg RNG.mdx",
      translations: {
        de: "/de-emulator-emerald-egg/",
        en: "/emulator-emerald-egg/",
        it: "/it-emulator-emerald-egg/",
        zh: "/zh-emulator-emerald-egg/",
      },
      guideGroupId: "en:emer-egg:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-emerald-egg/" },
        cfwEmu: { type: "slug", slug: "/emulator-emerald-egg/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Egg RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Egg RNG.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-flrg-stationary-and-gift/": {
    meta: {
      id: "/emulator-flrg-stationary-and-gift/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-flrg-stationary-and-gift/",
      isNew: false,
      title: "FireRed and LeafGreen Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG shiny 6IV legendaries in Pokémon FireRed and LeafGreen using static encounters.",
      slug: "/emulator-flrg-stationary-and-gift/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Static RNG.mdx",
      translations: {
        en: "/emulator-flrg-stationary-and-gift/",
        zh: "/zh-emulator-flrg-stationary-and-gift/",
      },
      guideGroupId:
        "en:/emulator-flrg-stationary-and-gift/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-flrg-stationary-and-gift/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/FireRed and LeafGreen/Static RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/FireRed and LeafGreen/Static RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-frlg-egg/": {
    meta: {
      id: "/emulator-frlg-egg/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-frlg-egg/",
      isNew: false,
      title: "FireRed and LeafGreen Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs in Pokémon FireRed and LeafGreen for perfect IVs, natures, and shinies.",
      slug: "/emulator-frlg-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Egg RNG.mdx",
      translations: { en: "/emulator-frlg-egg/", zh: "/zh-emulator-frlg-egg/" },
      guideGroupId: "en:/emulator-frlg-egg/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-frlg-egg/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/FireRed and LeafGreen/Egg RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/FireRed and LeafGreen/Egg RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-frlg-stationary/": {
    meta: {
      id: "/emulator-frlg-stationary/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-frlg-stationary/",
      isNew: false,
      title: "FireRed and LeafGreen Static RNG",
      navDrawerTitle: "Static RNG",
      description: "Static v2 RNG",
      slug: "/emulator-frlg-stationary/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Stationary v2 Emu.mdx",
      translations: null,
      guideGroupId: "en:/emulator-frlg-stationary/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-frlg-stationary/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 3/FireRed and LeafGreen/Stationary v2 Emu.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/FireRed and LeafGreen/Stationary v2 Emu.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-frlg-wild-v2/": {
    meta: {
      id: "/emulator-frlg-wild-v2/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-frlg-wild-v2/",
      isNew: false,
      title: "FireRed and LeafGreen Wild RNG",
      navDrawerTitle: "FireRed and LeafGreen Wild RNG",
      description:
        "Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method.",
      slug: "/emulator-frlg-wild-v2/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-frlg-wild/",
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx",
      translations: null,
      guideGroupId: "en:/emulator-frlg-wild-v2/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-frlg-wild-v2/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-frlg-wild/": {
    meta: {
      id: "/emulator-frlg-wild/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-frlg-wild/",
      isNew: false,
      title: "FireRed and LeafGreen Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method.",
      slug: "/emulator-frlg-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx",
      translations: {
        en: "/emulator-frlg-wild/",
        zh: "/zh-emulator-frlg-wild/",
      },
      guideGroupId: "en:/emulator-frlg-wild/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-frlg-wild/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-breeding/": {
    meta: {
      id: "/emulator-hgss-breeding/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-breeding/",
      isNew: false,
      title: "HeartGold and Soulsilver Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in HeartGold and SoulSilver for shiny, high-IV Pokémon.",
      slug: "/emulator-hgss-breeding/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-hgss-egg/",
      lastUpdated: "2026-03-23",
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Egg.mdx",
      translations: null,
      guideGroupId: "en:/emulator-hgss-breeding/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-hgss-breeding/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/HeartGold and SoulSilver/Egg.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-cute-charm/": {
    meta: {
      id: "/emulator-hgss-cute-charm/",
      categories: ["HeartGold and SoulSilver"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/emulator-hgss-cute-charm/",
      isNew: false,
      title: "HeartGold and SoulSilver Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in HeartGold and SoulSilver.",
      slug: "/emulator-hgss-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/hgss-cute-charm/",
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-hgss-cute-charm/",
        zh: "/zh-emulator-hgss-cute-charm/",
      },
      guideGroupId: "en:/emulator-hgss-cute-charm/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Cute Charm.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Cute Charm.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-hgss-egg/": {
    meta: {
      id: "/emulator-hgss-egg/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-egg/",
      isNew: false,
      title: "HeartGold and Soulsilver Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in HeartGold and SoulSilver for shiny, high-IV Pokémon.",
      slug: "/emulator-hgss-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-23",
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Egg.mdx",
      translations: {
        en: "/emulator-hgss-egg/",
        it: "/it-emulator-hgss-egg/",
        zh: "/zh-emulator-hgss-egg/",
      },
      guideGroupId: "en:/emulator-hgss-egg/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-hgss-egg/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/HeartGold and SoulSilver/Egg.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-special-wild/": {
    meta: {
      id: "/emulator-hgss-special-wild/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-special-wild/",
      isNew: false,
      title: "HeartGold and SoulSilver Special Wild RNG",
      navDrawerTitle: "Special Wild RNG",
      description: "Special Wild RNG",
      slug: "/emulator-hgss-special-wild/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Special Wild Case (Emu).mdx",
      translations: null,
      guideGroupId: "en:/emulator-hgss-special-wild/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-hgss-special-wild/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Special Wild Case (Emu).mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Special Wild Case (Emu).mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-stationary/": {
    meta: {
      id: "/emulator-hgss-stationary/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-stationary/",
      isNew: false,
      title: "HeartGold and SoulSilver Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in HeartGold and SoulSilver for perfect IVs, natures, and shinies.",
      slug: "/emulator-hgss-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx",
      translations: {
        en: "/emulator-hgss-stationary/",
        zh: "/zh-emulator-hgss-stationary/",
      },
      guideGroupId: "en:/emulator-hgss-stationary/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-hgss-stationary/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-tid-sid/": {
    meta: {
      id: "/emulator-hgss-tid-sid/",
      categories: ["HeartGold and SoulSilver"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-tid-sid/",
      isNew: false,
      title: "HeartGold and SoulSilver TID/SID RNG",
      navDrawerTitle: "TID/SID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in HeartGold and SoulSilver.",
      slug: "/emulator-hgss-tid-sid/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/TID SID.mdx",
      translations: null,
      guideGroupId: "en:/emulator-hgss-tid-sid/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-hgss-tid-sid/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/HeartGold and SoulSilver/TID SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/TID SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-wild/": {
    meta: {
      id: "/emulator-hgss-wild/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-wild/",
      isNew: false,
      title: "HeartGold and SoulSilver Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Diamond, Pearl, and Platinum for shiny and high-IV results.",
      slug: "/emulator-hgss-wild/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Wild RNG - Emulator.mdx",
      translations: null,
      guideGroupId: "en:/emulator-hgss-wild/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-hgss-wild/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Wild RNG - Emulator.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Wild RNG - Emulator.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-wondercard/": {
    meta: {
      id: "/emulator-hgss-wondercard/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-wondercard/",
      isNew: false,
      title: "HeartGold and SoulSilver Wondercard RNG",
      navDrawerTitle: "Wondercard RNG",
      description: "How to RNG Wondercards",
      slug: "/emulator-hgss-wondercard/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Wondercard.mdx",
      translations: null,
      guideGroupId: "en:/emulator-hgss-wondercard/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-hgss-wondercard/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/HeartGold and SoulSilver/Wondercard.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Wondercard.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-oras-dexnav/": {
    meta: {
      id: "/emulator-oras-dexnav/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-oras-dexnav/",
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire DexNav RNG",
      navDrawerTitle: "DexNav RNG",
      description:
        "Learn how to RNG Pokémon using the DexNav feature in Omega Ruby and Alpha Sapphire.",
      slug: "/emulator-oras-dexnav/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/DexNav.mdx",
      translations: {
        en: "/emulator-oras-dexnav/",
        zh: "/zh-emulator-oras-dexnav/",
      },
      guideGroupId: "en:/emulator-oras-dexnav/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-oras-dexnav/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/DexNav.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 6/DexNav.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-rs-dead-battery-stationary/": {
    meta: {
      id: "/emulator-rs-dead-battery-stationary/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-dead-battery-stationary/",
      isNew: false,
      title: "Ruby and Sapphire Dead Battery Static RNG",
      navDrawerTitle: "Static Dead Battery RNG",
      description:
        "Learn how to RNG static Pokémon in Ruby and Sapphire for perfect IVs, natures, and shinies.",
      slug: "/emulator-rs-dead-battery-stationary/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Dead Battery Stationary RNG  (Emulator).mdx",
      translations: null,
      guideGroupId:
        "en:/emulator-rs-dead-battery-stationary/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-rs-dead-battery-stationary/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 3/Ruby and Sapphire/Dead Battery Stationary RNG  (Emulator).mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Dead Battery Stationary RNG  (Emulator).mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-rs-egg/": {
    meta: {
      id: "/emulator-rs-egg/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-egg/",
      isNew: false,
      title: "Ruby and Sapphire Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Ruby and Sapphire for shiny, high-IV Pokémon.",
      slug: "/emulator-rs-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Egg RNG.mdx",
      translations: { en: "/emulator-rs-egg/", zh: "/zh-emulator-rs-egg/" },
      guideGroupId: "en:/emulator-rs-egg/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-rs-egg/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Ruby and Sapphire/Egg RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Egg RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-rs-live-battery-tid/": {
    meta: {
      id: "/emulator-rs-live-battery-tid/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "rs-tid",
      isNew: false,
      title: "Ruby and Sapphire TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire.",
      slug: "/emulator-rs-live-battery-tid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Live Battery TID RNG.mdx",
      translations: null,
      guideGroupId: "en:rs-tid:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-rubysapphire-tid/" },
        cfwEmu: { type: "slug", slug: "/emulator-rs-live-battery-tid/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 3/Ruby and Sapphire/Live Battery TID RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Live Battery TID RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-rs-stationary/": {
    meta: {
      id: "/emulator-rs-stationary/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-stationary/",
      isNew: false,
      title: "Ruby and Sapphire Live Battery Static RNG",
      navDrawerTitle: "Static Live Battery RNG",
      description:
        "Learn how to RNG static Pokémon in Ruby and Sapphire for perfect IVs, natures, and shinies.",
      slug: "/emulator-rs-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx",
      translations: {
        en: "/emulator-rs-stationary/",
        zh: "/zh-emulator-rs-stationary/",
      },
      guideGroupId: "en:/emulator-rs-stationary/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-rs-stationary/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-rs-wild/": {
    meta: {
      id: "/emulator-rs-wild/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-wild/",
      isNew: false,
      title: "Ruby and Sapphire Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Ruby and Sapphire for shiny and high-IV results.",
      slug: "/emulator-rs-wild/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/RSE Wild RNG - Dry Battery Emulator.mdx",
      translations: null,
      guideGroupId: "en:/emulator-rs-wild/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-rs-wild/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 3/Ruby and Sapphire/RSE Wild RNG - Dry Battery Emulator.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/RSE Wild RNG - Dry Battery Emulator.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-rs-wishmaker/": {
    meta: {
      id: "/emulator-rs-wishmaker/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-wishmaker/",
      isNew: false,
      title: "Ruby and Sapphire Shiny Wishmaker Jirachi RNG",
      navDrawerTitle: "Wishmaker Jirachi RNG",
      description:
        "Learn how to RNG the Shiny Wishmaker Jirachi from the Colosseum Bonus Disc in Ruby and Sapphire.",
      slug: "/emulator-rs-wishmaker/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-18",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: {
        en: "/emulator-rs-wishmaker/",
        zh: "/zh-emulator-rs-wishmaker/",
      },
      guideGroupId: "en:/emulator-rs-wishmaker/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-rs-wishmaker/" },
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-sm-time-finder/": {
    meta: {
      id: "/emulator-sm-time-finder/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-sm-time-finder/",
      isNew: false,
      title: "Sun and Moon Time Finder (Citra)",
      navDrawerTitle: "Time Finder",
      description: "Finding times to get specific RNG seeds.",
      slug: "/emulator-sm-time-finder/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-usum-time-finder/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Time Finder.js (Citra).mdx",
      translations: {
        en: "/emulator-sm-time-finder/",
        zh: "/zh-emulator-sm-time-finder/",
      },
      guideGroupId: "en:/emulator-sm-time-finder/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-sm-time-finder/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Time Finder.js (Citra).mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Time Finder.js (Citra).mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-usum-time-finder/": {
    meta: {
      id: "/emulator-usum-time-finder/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-usum-time-finder/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Time Finder (Citra)",
      navDrawerTitle: "Time Finder",
      description: "Finding times to get specific RNG seeds.",
      slug: "/emulator-usum-time-finder/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Time Finder.js (Citra).mdx",
      translations: {
        en: "/emulator-usum-time-finder/",
        zh: "/zh-emulator-usum-time-finder/",
      },
      guideGroupId: "en:/emulator-usum-time-finder/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/emulator-usum-time-finder/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Time Finder.js (Citra).mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Time Finder.js (Citra).mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-delete-pokemon-save/": {
    meta: {
      id: "/delete-pokemon-save/",
      categories: [
        "Ruby and Sapphire",
        "FireRed and LeafGreen",
        "Emerald",
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
        "Sword and Shield",
        "Brilliant Diamond and Shining Pearl",
        "Legends Arceus",
      ],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/delete-pokemon-save/",
      isNew: false,
      title: "Como eliminar partidas de Pokémon",
      navDrawerTitle: "Como eliminar partidas de Pokémon",
      description: "Como eliminar partidas de Pokémon",
      slug: "/es-delete-pokemon-save/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/delete-pokemon-save/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Tools and Emulators/Delete Save.mdx",
      translations: {
        en: "/delete-pokemon-save/",
        es: "/es-delete-pokemon-save/",
        zh: "/zh-delete-pokemon-save/",
      },
      guideGroupId:
        "es:/delete-pokemon-save/:Black 2 and White 2|Black and White|Brilliant Diamond and Shining Pearl|Diamond, Pearl, and Platinum|Emerald|FireRed and LeafGreen|HeartGold and SoulSilver|Legends Arceus|Omega Ruby and Alpha Sapphire|Ruby and Sapphire|Sun and Moon|Sword and Shield|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/es/Tools and Emulators/Delete Save.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Tools and Emulators/Delete Save.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-dppt-advance-rng/": {
    meta: {
      id: "/dppt-advance-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/dppt-advance-rng/",
      isNew: false,
      title: "Avanzar el RNG en Diamante, Perla y Platino",
      navDrawerTitle: "Avanzar el RNG",
      description:
        "Aprende cómo avanzar el RNG en Diamante, Perla y Platino. Esta guía explica diferentes métodos como pasar páginas del diario, los “chatters” de Chatot y las acciones de los NPC.",
      slug: "/es-dppt-advance-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-advance-rng/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
      translations: {
        en: "/dppt-advance-rng/",
        es: "/es-dppt-advance-rng/",
        zh: "/zh-dppt-advance-rng/",
      },
      guideGroupId: "es:/dppt-advance-rng/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/es/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-gba-methods-lead-impact/": {
    meta: {
      id: "/gba-methods-lead-impact/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-methods-lead-impact/",
      isNew: false,
      title:
        "Impacto del Pokémon inicial en el equipo para encuentros salvajes en Esmeralda",
      navDrawerTitle: "Methods & Lead",
      description:
        "Entender por qué la carta de salida influye en qué método de Wild se activa",
      slug: "/es-gba-methods-lead-impact/",
      isRoughDraft: false,
      orderPriority: 2,
      hideFromNavDrawer: true,
      addedOn: "2025-06-18",
      translation: { enSlug: "/gba-methods-lead-impact/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 3/Emerald/GBA Methods Part2.mdx",
      translations: {
        es: "/es-gba-methods-lead-impact/",
        en: "/gba-methods-lead-impact/",
        zh: "/zh-gba-methods-lead-impact/",
      },
      guideGroupId:
        "es:/gba-methods-lead-impact/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/es/Gen 3/Emerald/GBA Methods Part2.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Gen 3/Emerald/GBA Methods Part2.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-gba-methods/": {
    meta: {
      id: "/gba-methods/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-methods/",
      isNew: false,
      title: "Métodos 1-4 en Esmeralda",
      navDrawerTitle: "Métodos 1-4",
      description:
        "Qué es un método, la razón por la que existen los métodos 1-4 y cómo afectan la generación de Pokémon.",
      slug: "/es-gba-methods/",
      isRoughDraft: false,
      orderPriority: 1,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/gba-methods/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 3/Emerald/GBA Methods.mdx",
      translations: {
        es: "/es-gba-methods/",
        en: "/gba-methods/",
        zh: "/zh-gba-methods/",
      },
      guideGroupId:
        "es:/gba-methods/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/es/Gen 3/Emerald/GBA Methods.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Gen 3/Emerald/GBA Methods.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-gen2-celebi/": {
    meta: {
      id: "/gen2-celebi/",
      categories: ["Gold, Silver, Crystal"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/gen2-celebi/",
      isNew: false,
      title: "Celebi",
      navDrawerTitle: "Celebi",
      description: "How to get a shiny Fairy",
      slug: "/es-gen2-celebi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-02",
      translation: { enSlug: "/gen2-celebi/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 2/Celebi.mdx",
      translations: {
        es: "/es-gen2-celebi/",
        en: "/gen2-celebi/",
        zh: "/zh-gen2-celebi/",
      },
      guideGroupId: "es:/gen2-celebi/:Gold, Silver, Crystal",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/es/Gen 2/Celebi.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Gen 2/Celebi.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-gen2-starters/": {
    meta: {
      id: "/gen2-starters/",
      categories: ["Gold, Silver, Crystal"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/gen2-starters/",
      isNew: false,
      title: "RNG de Iniciales en Cristal",
      navDrawerTitle: "RNG de Iniciales en Cristal",
      description: "Learn how to RNG shiny starters in Pokémon Crystal.",
      slug: "/es-gen2-starters/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/gen2-starters/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 2/Starter.mdx",
      translations: {
        es: "/es-gen2-starters/",
        en: "/gen2-starters/",
        zh: "/zh-gen2-starters/",
      },
      guideGroupId: "es:/gen2-starters/:Gold, Silver, Crystal",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/es/Gen 2/Starter.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Gen 2/Starter.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-gen3-glossary/": {
    meta: {
      id: "/gen3-glossary/",
      categories: ["Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/gen3-glossary/",
      isNew: false,
      title: "Glosario",
      navDrawerTitle: "Glosario",
      description:
        "Lista de términos importantes relacionados a la manipulación del RNG de Pokémon en los juegos de Generación III.",
      slug: "/es-gen3-glossary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-17",
      translation: { enSlug: "/gen3-glossary/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 3/Emerald/Glossary.mdx",
      translations: {
        es: "/es-gen3-glossary/",
        en: "/gen3-glossary/",
        it: "/it-gen3-glossary/",
      },
      guideGroupId: "es:/gen3-glossary/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/es/Gen 3/Emerald/Glossary.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Gen 3/Emerald/Glossary.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-hgss-rng-advance/": {
    meta: {
      id: "/hgss-rng-advance/",
      categories: ["HeartGold and SoulSilver"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "advance-rng",
      isNew: false,
      title: "Avanzar el RNG en HeartGold y SoulSilver",
      navDrawerTitle: "Avanzar el RNG",
      description:
        "Aprende cómo avanzar el RNG en HeartGold y SoulSilver. Esta guía explica diferentes métodos como los chatters de Chatot, la radio y las acciones de los NPC.",
      slug: "/es-hgss-rng-advance/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/hgss-rng-advance/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx",
      translations: {
        es: "/es-hgss-rng-advance/",
        en: "/hgss-rng-advance/",
        zh: "/zh-hgss-rng-advance/",
      },
      guideGroupId: "es:advance-rng:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/es/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/es-install-pokereader/": {
    meta: {
      id: "/install-pokereader/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/install-pokereader/",
      isNew: false,
      title: "PokeReader 3DS",
      navDrawerTitle: "PokeReader 3DS",
      description:
        "Aprende a instalar PokeReader en tu 3DS para ayudarte con el RNG y perfeccionar la caza de Pokémon.",
      slug: "/es-install-pokereader/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/install-pokereader/", language: "es" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "translatedGuide",
      file: "guides/Translations/es/Tools and Emulators/3DS PokeReader.mdx",
      translations: {
        es: "/es-install-pokereader/",
        en: "/install-pokereader/",
        it: "/it-install-pokereader/",
        zh: "/zh-install-pokereader/",
      },
      guideGroupId:
        "es:/install-pokereader/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/es/Tools and Emulators/3DS PokeReader.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/es/Tools and Emulators/3DS PokeReader.mdx?raw"
      );
      return file.default;
    }),
  },
  "/experiments/": {
    meta: {
      id: "/experiments/",
      categories: ["User Settings"],
      section: "site_info",
      guideVariants: null,
      guideKey: "/experiments/",
      isNew: false,
      title: "Experimental Features",
      navDrawerTitle: "Experimental Features",
      description: "Help us test new features and provide feedback!",
      slug: "/experiments/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Experiments.mdx",
      translations: null,
      guideGroupId: "en:/experiments/:User Settings",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Experiments.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Experiments.mdx?raw");
      return file.default;
    }),
  },
  "/fire-red-and-leaf-green/": {
    meta: {
      id: "/fire-red-and-leaf-green/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/fire-red-and-leaf-green/",
      isNew: false,
      title: "FireRed and LeafGreen",
      navDrawerTitle: "FireRed and LeafGreen",
      description: "FireRed and LeafGreen Resources",
      slug: "/fire-red-and-leaf-green/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/fire-red-and-leaf-green/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/fr-bdsp-advance-rng/": {
    meta: {
      id: "/bdsp-advance-rng/",
      categories: ["Brilliant Diamond and Shining Pearl"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "advance-rng",
      isNew: false,
      title:
        "Faire avancer la RNG sur pokemon Diamant Etincelant et Perle Scintillante",
      navDrawerTitle: "Faire avancer la rng",
      description:
        "Comment les avances de RNG fonctionnent dans pokemon Diamand Etincelant et Perle Scintillante. Apprenez comment controler ces avances pour rencontrer des pokemon parfaits!",
      slug: "/fr-bdsp-advance-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/bdsp-advance-rng/", language: "fr" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/fr/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx",
      translations: { en: "/bdsp-advance-rng/", fr: "/fr-bdsp-advance-rng/" },
      guideGroupId: "fr:advance-rng:Brilliant Diamond and Shining Pearl",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/fr/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/fr/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/fr-install-capturesight/": {
    meta: {
      id: "/install-capturesight/",
      categories: [
        "Sword and Shield",
        "Brilliant Diamond and Shining Pearl",
        "Legends Arceus",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/install-capturesight/",
      isNew: false,
      title: "Installer CaptureSight",
      navDrawerTitle: "Installer Capture Sight",
      description:
        "Apprenez a installer CaptureSight sur votre Switch pour faciliter la manipulation de RNG et attraper des Pokemon parfaits !",
      slug: "/fr-install-capturesight/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/install-capturesight/", language: "fr" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/fr/Tools and Emulators/CaptureSight Install.mdx",
      translations: {
        fr: "/fr-install-capturesight/",
        en: "/install-capturesight/",
      },
      guideGroupId:
        "fr:/install-capturesight/:Brilliant Diamond and Shining Pearl|Legends Arceus|Sword and Shield",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/fr/Tools and Emulators/CaptureSight Install.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/fr/Tools and Emulators/CaptureSight Install.mdx?raw"
      );
      return file.default;
    }),
  },
  "/frlg-gen3-sid/": {
    meta: {
      id: "/frlg-gen3-sid/",
      categories: ["FireRed and LeafGreen"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/frlg-gen3-sid/",
      isNew: false,
      title: "Find FireRed and LeafGreen SID",
      navDrawerTitle: "Find SID",
      description:
        "Various methods to finding an SID in Firered and LeafGreen.",
      slug: "/frlg-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-frlg-gen3-sid/",
        en: "/frlg-gen3-sid/",
        it: "/it-frlg-gen3-sid/",
        zh: "/zh-frlg-gen3-sid/",
      },
      guideGroupId: "en:/frlg-gen3-sid/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/frlg-gen3-sid/" },
        cfwEmu: { type: "slug", slug: "/frlg-gen3-sid/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Find SID.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Find SID.mdx?raw");
      return file.default;
    }),
  },
  "/frlg-seeding-bot/": {
    meta: {
      id: "/frlg-seeding-bot/",
      categories: ["FireRed and LeafGreen"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/frlg-seeding-bot/",
      isNew: false,
      title: "Initial Seed Botting for FireRed and LeafGreen",
      navDrawerTitle: "Initial Seed Botting",
      description:
        "Learn how to use the Initial Seed Bot in FireRed and LeafGreen for better control over your RNG results.",
      slug: "/frlg-seeding-bot/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx",
      translations: { en: "/frlg-seeding-bot/", zh: "/zh-frlg-seeding-bot/" },
      guideGroupId: "en:/frlg-seeding-bot/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/frlg-seeding-bot/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx?raw"
      );
      return file.default;
    }),
  },
  "/frlg-static/": {
    meta: {
      id: "/frlg-static/",
      categories: ["FireRed and LeafGreen"],
      section: "tool",
      guideVariants: null,
      guideKey: "/frlg-static/",
      isNew: false,
      title: "Static Tool",
      navDrawerTitle: "Static Tool",
      description: "Static encounters in FireRed and LeafGreen",
      slug: "/frlg-static/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Static.mdx",
      translations: null,
      guideGroupId: "en:/frlg-static/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Gen 3 Static.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Gen 3 Static.mdx?raw"
      );
      return file.default;
    }),
  },
  "/frlg-tidsid-generator/": {
    meta: {
      id: "/frlg-tidsid-generator/",
      categories: ["FireRed and LeafGreen"],
      section: "tool",
      guideVariants: null,
      guideKey: "/frlg-tidsid-generator/",
      isNew: false,
      title: "TID and SID Generator",
      navDrawerTitle: "TID and SID Generator",
      description: "Generator for TID and SID in FRLG",
      slug: "/frlg-tidsid-generator/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      guideGroupId: "en:/frlg-tidsid-generator/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx?raw"
      );
      return file.default;
    }),
  },
  "/frlg-tips-rng/": {
    meta: {
      id: "/frlg-tips-rng/",
      categories: ["FireRed and LeafGreen"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/frlg-tips-rng/",
      isNew: false,
      title: "Basic rules of Gen 3 RNG",
      navDrawerTitle: "Basic rules of Gen 3 RNG",
      description:
        "Learn how to advance the RNG and improve stability in Pokémon FireRed and LeafGreen for consistent results.",
      slug: "/frlg-tips-rng/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Basic Rules of RNG.mdx",
      translations: null,
      guideGroupId: "en:/frlg-tips-rng/:FireRed and LeafGreen",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/frlg-tips-rng/" },
        cfwEmu: { type: "slug", slug: "/frlg-tips-rng/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 3/FireRed and LeafGreen/Basic Rules of RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/FireRed and LeafGreen/Basic Rules of RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/gamecube/": {
    meta: {
      id: "/gamecube/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/gamecube/",
      isNew: false,
      title: "Gamecube",
      navDrawerTitle: "Gamecube",
      description: "Gamecube Resources",
      slug: "/gamecube/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/gamecube/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/gba-methods-lead-impact/": {
    meta: {
      id: "/gba-methods-lead-impact/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-methods-lead-impact/",
      isNew: false,
      title: "Lead Impact on Wild Methods in Emerald",
      navDrawerTitle: "Methods & Lead",
      description:
        "Understanding why the lead impacts which Wild method is triggered",
      slug: "/gba-methods-lead-impact/",
      isRoughDraft: false,
      orderPriority: 2,
      hideFromNavDrawer: false,
      addedOn: "2025-06-18",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/GBA Methods Part2.mdx",
      translations: {
        es: "/es-gba-methods-lead-impact/",
        en: "/gba-methods-lead-impact/",
        zh: "/zh-gba-methods-lead-impact/",
      },
      guideGroupId:
        "en:/gba-methods-lead-impact/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/GBA Methods Part2.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/GBA Methods Part2.mdx?raw"
      );
      return file.default;
    }),
  },
  "/gba-methods/": {
    meta: {
      id: "/gba-methods/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-methods/",
      isNew: false,
      title: "Methods 1-4 in Emerald",
      navDrawerTitle: "Methods 1-4",
      description:
        "What is a Method, the reason why Methods 1-4 exist, and how they impact Pokémon generation.",
      slug: "/gba-methods/",
      isRoughDraft: false,
      orderPriority: 1,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/GBA Methods.mdx",
      translations: {
        es: "/es-gba-methods/",
        en: "/gba-methods/",
        zh: "/zh-gba-methods/",
      },
      guideGroupId:
        "en:/gba-methods/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/GBA Methods.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/GBA Methods.mdx?raw"
      );
      return file.default;
    }),
  },
  "/gba-overview/": {
    meta: {
      id: "/gba-overview/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/gba-overview/",
      isNew: false,
      title: "GBA Overview",
      navDrawerTitle: "GBA Overview",
      description:
        "Particularities, key RNG concepts, and version differences of GBA games.",
      slug: "/gba-overview/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-10",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/GBA Overview.mdx",
      translations: {
        de: "/de-gba-overview/",
        en: "/gba-overview/",
        zh: "/zh-gba-overview/",
      },
      guideGroupId:
        "en:/gba-overview/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/GBA Overview.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/GBA Overview.mdx?raw"
      );
      return file.default;
    }),
  },
  "/gba-pokerus-technical/": {
    meta: {
      id: "/gba-pokerus-technical/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-pokerus-technical/",
      isNew: false,
      title: "Pokérus",
      navDrawerTitle: "Pokérus",
      description: "How Pokérus infection is triggered",
      slug: "/gba-pokerus-technical/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-05-13",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx",
      translations: {
        en: "/gba-pokerus-technical/",
        zh: "/zh-gba-pokerus-technical/",
      },
      guideGroupId:
        "en:/gba-pokerus-technical/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx?raw"
      );
      return file.default;
    }),
  },
  "/gba-vblank/": {
    meta: {
      id: "/gba-vblank/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-vblank/",
      isNew: false,
      title: "VBlank in Emerald",
      navDrawerTitle: "VBlank",
      description:
        "What are Vblanks in Emerald and their impact on Pokémon generation.",
      slug: "/gba-vblank/",
      isRoughDraft: false,
      orderPriority: 0,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Vblank.mdx",
      translations: { en: "/gba-vblank/", zh: "/zh-gba-vblank/" },
      guideGroupId:
        "en:/gba-vblank/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Vblank.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Vblank.mdx?raw");
      return file.default;
    }),
  },
  "/gc-initial/": {
    meta: {
      id: "/gc-initial/",
      categories: ["Gamecube"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/gc-initial/",
      isNew: false,
      title: "Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "How to use Dolphin to set up Initial Seed RNG for all GameCube games.",
      slug: "/gc-initial/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gamecube/Initial Seed RNG.mdx",
      translations: { en: "/gc-initial/", zh: "/zh-gc-initial/" },
      guideGroupId: "en:/gc-initial/:Gamecube",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/gc-initial/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/Initial Seed RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gamecube/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/gen2-celebi/": {
    meta: {
      id: "/gen2-celebi/",
      categories: ["Gold, Silver, Crystal"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/gen2-celebi/",
      isNew: false,
      title: "Celebi in Crystal",
      navDrawerTitle: "Celebi RNG",
      description:
        "Learn how to obtain a shiny Celebi in Pokémon Crystal using RNG manipulation.",
      slug: "/gen2-celebi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-02",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 2/Celebi.mdx",
      translations: {
        es: "/es-gen2-celebi/",
        en: "/gen2-celebi/",
        zh: "/zh-gen2-celebi/",
      },
      guideGroupId: "en:/gen2-celebi/:Gold, Silver, Crystal",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/gen2-celebi/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/Celebi.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 2/Celebi.mdx?raw");
      return file.default;
    }),
  },
  "/gen2-research/": {
    meta: {
      id: "/gen2-research/",
      categories: ["Gold, Silver, Crystal"],
      section: "site_info",
      guideVariants: null,
      guideKey: "/gen2-research/",
      isNew: false,
      title: "Gen 2 RNG Research",
      navDrawerTitle: "Gen 2 RNG Research",
      description: "Help research the Gen 2 RNG",
      slug: "/gen2-research/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 2/RngResearch.mdx",
      translations: null,
      guideGroupId: "en:/gen2-research/:Gold, Silver, Crystal",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/RngResearch.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 2/RngResearch.mdx?raw");
      return file.default;
    }),
  },
  "/gen2-starters/": {
    meta: {
      id: "/gen2-starters/",
      categories: ["Gold, Silver, Crystal"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/gen2-starters/",
      isNew: false,
      title: "Crystal Starter RNG",
      navDrawerTitle: "Starter RNG",
      description: "Learn how to RNG shiny starters in Pokémon Crystal.",
      slug: "/gen2-starters/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 2/Starter.mdx",
      translations: {
        es: "/es-gen2-starters/",
        en: "/gen2-starters/",
        zh: "/zh-gen2-starters/",
      },
      guideGroupId: "en:/gen2-starters/:Gold, Silver, Crystal",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/gen2-starters/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/Starter.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 2/Starter.mdx?raw");
      return file.default;
    }),
  },
  "/gen3-glossary/": {
    meta: {
      id: "/gen3-glossary/",
      categories: ["Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/gen3-glossary/",
      isNew: false,
      title: "Glossary",
      navDrawerTitle: "Glossary",
      description:
        "List of important terms related to Pokémon RNG manipulation in Generation III games.",
      slug: "/gen3-glossary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-05-17",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Glossary.mdx",
      translations: {
        es: "/es-gen3-glossary/",
        en: "/gen3-glossary/",
        it: "/it-gen3-glossary/",
      },
      guideGroupId: "en:/gen3-glossary/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Glossary.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Glossary.mdx?raw");
      return file.default;
    }),
  },
  "/gen3-sid/": {
    meta: {
      id: "/gen3-sid/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/gen3-sid/",
      isNew: false,
      title: "Find Emerald SID",
      navDrawerTitle: "Find SID",
      description: "Various methods to finding an SID in Emerald.",
      slug: "/gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-gen3-sid/",
        en: "/gen3-sid/",
        it: "/it-gen3-sid/",
        zh: "/zh-gen3-sid/",
      },
      guideGroupId: "en:/gen3-sid/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/gen3-sid/" },
        cfwEmu: { type: "slug", slug: "/gen3-sid/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Find SID.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Find SID.mdx?raw");
      return file.default;
    }),
  },
  "/heart-gold-and-soul-silver/": {
    meta: {
      id: "/heart-gold-and-soul-silver/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/heart-gold-and-soul-silver/",
      isNew: false,
      title: "HeartGold and SoulSilver",
      navDrawerTitle: "HeartGold and SoulSilver",
      description: "HeartGold and SoulSilver Resources",
      slug: "/heart-gold-and-soul-silver/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/heart-gold-and-soul-silver/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/help-translate/": {
    meta: {
      id: "/help-translate/",
      categories: ["Home"],
      section: "site_info",
      guideVariants: null,
      guideKey: "/help-translate/",
      isNew: false,
      title: "Translation Helper",
      navDrawerTitle: "Translation Helper",
      description:
        "Help us translate Pokémon guides and tools into your language",
      slug: "/help-translate/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Translations.mdx",
      translations: null,
      guideGroupId: "en:/help-translate/:Home",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Translations.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Translations.mdx?raw");
      return file.default;
    }),
  },
  "/hgss-3ds-rng/": {
    meta: {
      id: "/hgss-3ds-rng/",
      categories: ["HeartGold and SoulSilver"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/hgss-3ds-rng/",
      isNew: false,
      title: "HeartGold and Soulsilver 3DS RNG",
      navDrawerTitle: "3DS RNG",
      description:
        "Learn how to RNG using a 3DS in HeartGold and SoulSilver for shiny, high-IV Pokémon.",
      slug: "/hgss-3ds-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS RNG.mdx",
      translations: { en: "/hgss-3ds-rng/", zh: "/zh-hgss-3ds-rng/" },
      guideGroupId: "en:/hgss-3ds-rng/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/3DS RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/3DS RNG.mdx?raw");
      return file.default;
    }),
  },
  "/hgss-cute-charm/": {
    meta: {
      id: "/hgss-cute-charm/",
      categories: ["HeartGold and SoulSilver"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/hgss-cute-charm/",
      isNew: false,
      title: "HeartGold and SoulSilver Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in HeartGold and SoulSilver.",
      slug: "/hgss-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: { en: "/hgss-cute-charm/", zh: "/zh-hgss-cute-charm/" },
      guideGroupId: "en:/hgss-cute-charm/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Cute Charm.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Cute Charm.mdx?raw");
      return file.default;
    }),
  },
  "/hgss-initial-seed/": {
    meta: {
      id: "/hgss-initial-seed/",
      categories: ["HeartGold and SoulSilver"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/hgss-initial-seed/",
      isNew: false,
      title: "HeartGold and Soulsilver Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "Learn how to RNG your initial seed in HeartGold and SoulSilver.",
      slug: "/hgss-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx",
      translations: {
        en: "/hgss-initial-seed/",
        it: "/it-hgss-initial-seed/",
        zh: "/zh-hgss-initial-seed/",
      },
      guideGroupId: "en:/hgss-initial-seed/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/hgss-initial-seed/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/hgss-rng-advance/": {
    meta: {
      id: "/hgss-rng-advance/",
      categories: ["HeartGold and SoulSilver"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "advance-rng",
      isNew: false,
      title: "Advancing the RNG in HeartGold and SoulSilver",
      navDrawerTitle: "Advancing the RNG",
      description:
        "Learn how to advance the RNG in HeartGold and SoulSilver. This guide explains different methods like Chatot chatters, radio, and NPC actions.",
      slug: "/hgss-rng-advance/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx",
      translations: {
        es: "/es-hgss-rng-advance/",
        en: "/hgss-rng-advance/",
        zh: "/zh-hgss-rng-advance/",
      },
      guideGroupId: "en:advance-rng:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/hgss-rng-advance/" },
        cfwEmu: { type: "slug", slug: "/hgss-rng-advance/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/hgss-tid-sid/": {
    meta: {
      id: "/hgss-tid-sid/",
      categories: ["HeartGold and SoulSilver"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "tid-sid",
      isNew: false,
      title: "HeartGold and SoulSilver Cute Charm Glitch TID/SID RNG",
      navDrawerTitle: "Cute Charm & TID/SID RNG",
      description:
        "Learn how to use the Cute Charm Glitch and obtain a specific Trainer ID (TID) and Secret ID (SID) combo on Retail for HeartGold and SoulSilver.",
      slug: "/hgss-tid-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-06-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-29",
      type: "baseGuide",
      file: "guides/Gen 4/Retail TID.mdx",
      translations: { en: "/hgss-tid-sid/", zh: "/zh-hgss-tid-sid/" },
      guideGroupId: "en:tid-sid:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/hgss-tid-sid/" },
        cfwEmu: null,
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Retail TID.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Retail TID.mdx?raw");
      return file.default;
    }),
  },
  "/install-capturesight/": {
    meta: {
      id: "/install-capturesight/",
      categories: [
        "Sword and Shield",
        "Brilliant Diamond and Shining Pearl",
        "Legends Arceus",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/install-capturesight/",
      isNew: false,
      title: "Install CaptureSight",
      navDrawerTitle: "CaptureSight",
      description:
        "Learn how to install CaptureSight on your Switch to assist with RNG and perfect Pokémon hunting.",
      slug: "/install-capturesight/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/CaptureSight Install.mdx",
      translations: {
        fr: "/fr-install-capturesight/",
        en: "/install-capturesight/",
      },
      guideGroupId:
        "en:/install-capturesight/:Brilliant Diamond and Shining Pearl|Legends Arceus|Sword and Shield",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/CaptureSight Install.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/CaptureSight Install.mdx?raw"
      );
      return file.default;
    }),
  },
  "/install-pokereader-emu/": {
    meta: {
      id: "/install-pokereader-emu/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/install-pokereader-emu/",
      isNew: false,
      title: "PokeReader Azahar",
      navDrawerTitle: "PokeReader Azahar",
      description:
        "Learn how to install PokeReader on a 3DS emulator to assist with RNG and perfect Pokémon hunting.",
      slug: "/install-pokereader-emu/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Emu PokeReader.mdx",
      translations: null,
      guideGroupId:
        "en:/install-pokereader-emu/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Emu PokeReader.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Emu PokeReader.mdx?raw"
      );
      return file.default;
    }),
  },
  "/install-pokereader/": {
    meta: {
      id: "/install-pokereader/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/install-pokereader/",
      isNew: false,
      title: "PokeReader 3DS",
      navDrawerTitle: "PokeReader 3DS",
      description:
        "Learn how to install PokeReader on your 3DS to assist with RNG and perfect Pokémon hunting.",
      slug: "/install-pokereader/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/3DS PokeReader.mdx",
      translations: {
        es: "/es-install-pokereader/",
        en: "/install-pokereader/",
        it: "/it-install-pokereader/",
        zh: "/zh-install-pokereader/",
      },
      guideGroupId:
        "en:/install-pokereader/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/3DS PokeReader.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/3DS PokeReader.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-e-tips-rng/": {
    meta: {
      id: "/e-tips-rng/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/e-tips-rng/",
      isNew: false,
      title: "Info sull'RNG di Smeraldo",
      navDrawerTitle: "Info sull'RNG",
      description:
        "Impara come avanzare l'RNG migliora la stabilità su Pokemon Smeraldo per risultati consistenti.",
      slug: "/it-e-tips-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/e-tips-rng/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Basic Rules of RNG.mdx",
      translations: {
        de: "/de-e-tips-rng/",
        en: "/e-tips-rng/",
        it: "/it-e-tips-rng/",
        zh: "/zh-e-tips-rng/",
      },
      guideGroupId: "it:/e-tips-rng/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Gen 3/Emerald/Basic Rules of RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Basic Rules of RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-emerald-overview/": {
    meta: {
      id: "/emerald-overview/",
      categories: ["Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/emerald-overview/",
      isNew: false,
      title: "Panoramica di Smeraldo",
      navDrawerTitle: "Overview",
      description:
        "Applicazioni pratiche della manipolazione RNG e tecniche in Pokémon Smeraldo.",
      slug: "/it-emerald-overview/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/emerald-overview/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Emerald Overview.mdx",
      translations: {
        de: "/de-emerald-overview/",
        en: "/emerald-overview/",
        it: "/it-emerald-overview/",
      },
      guideGroupId: "it:/emerald-overview/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Gen 3/Emerald/Emerald Overview.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Emerald Overview.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-emulator-b2w2-runasdate-inital-seed/": {
    meta: {
      id: "/emulator-b2w2-runasdate-inital-seed/",
      categories: ["Black 2 and White 2"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-b2w2-runasdate-inital-seed/",
      isNew: false,
      title: "RNG dell'Initial Seed in Nero 2 e Bianco 2",
      navDrawerTitle: "RNG dell'Initial Seed",
      description:
        "Impara come manipolare il tuo initial seed in Nero 2 e Bianco 2.",
      slug: "/it-emulator-b2w2-runasdate-inital-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-b2w2-runasdate-inital-seed/",
        language: "it",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-24",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-b2w2-runasdate-inital-seed/",
        it: "/it-emulator-b2w2-runasdate-inital-seed/",
        zh: "/zh-emulator-b2w2-runasdate-inital-seed/",
      },
      guideGroupId:
        "it:/emulator-b2w2-runasdate-inital-seed/:Black 2 and White 2",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Gen 5/Using Runasdate to RNG Initial Seed.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 5/Using Runasdate to RNG Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-emulator-b2w2-wild/": {
    meta: {
      id: "/emulator-b2w2-wild/",
      categories: ["Black 2 and White 2"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-b2w2-wild/",
      isNew: false,
      title: "RNG Selvatico di Nero 2 e Bianco 2",
      navDrawerTitle: "RNG Selvatico",
      description:
        "Impara come effettuare RNG Manipulation per Pokémon selvatici in Nero 2 e Bianco 2 per risultati shiny e IV alte.",
      slug: "/it-emulator-b2w2-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2026-03-08",
      translation: { enSlug: "/emulator-b2w2-wild/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 5/Wild RNG Emu.mdx",
      translations: {
        en: "/emulator-b2w2-wild/",
        it: "/it-emulator-b2w2-wild/",
      },
      guideGroupId: "it:/emulator-b2w2-wild/:Black 2 and White 2",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 5/Wild RNG Emu.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 5/Wild RNG Emu.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-emulator-bw-runasdate-initial-seed/": {
    meta: {
      id: "/emulator-bw-runasdate-initial-seed/",
      categories: ["Black and White"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-runasdate-initial-seed/",
      isNew: false,
      title: "RNG dell'Initial Seed in Nero e Bianco",
      navDrawerTitle: "RNG dell'Initial Seed",
      description:
        "Impara come manipolare il tuo initial seed in Nero e Bianco.",
      slug: "/it-emulator-bw-runasdate-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-bw-runasdate-initial-seed/",
        language: "it",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-24",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-bw-runasdate-initial-seed/",
        it: "/it-emulator-bw-runasdate-initial-seed/",
        zh: "/zh-emulator-bw-runasdate-initial-seed/",
      },
      guideGroupId: "it:/emulator-bw-runasdate-initial-seed/:Black and White",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Gen 5/Using Runasdate to RNG Initial Seed.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 5/Using Runasdate to RNG Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-emulator-bw-wild/": {
    meta: {
      id: "/emulator-bw-wild/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-wild/",
      isNew: false,
      title: "RNG Selvatico di Nero e Bianco",
      navDrawerTitle: "RNG Selvatico",
      description:
        "Impara come effettuare RNG Manipulation per Pokémon selvatici in Nero e Bianco per risultati shiny e IV alte.",
      slug: "/it-emulator-bw-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2026-03-08",
      translation: { enSlug: "/emulator-bw-wild/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 5/Wild RNG Emu.mdx",
      translations: { en: "/emulator-bw-wild/", it: "/it-emulator-bw-wild/" },
      guideGroupId: "it:/emulator-bw-wild/:Black and White",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 5/Wild RNG Emu.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 5/Wild RNG Emu.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-emulator-emerald-egg/": {
    meta: {
      id: "/emulator-emerald-egg/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "emer-egg",
      isNew: false,
      title: "RNG UOVA SMERALDO",
      navDrawerTitle: "RNG UOVA SMERALDO",
      description:
        "Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/it-emulator-emerald-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-09",
      translation: { enSlug: "/emulator-emerald-egg/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Emulator Egg RNG.mdx",
      translations: {
        de: "/de-emulator-emerald-egg/",
        en: "/emulator-emerald-egg/",
        it: "/it-emulator-emerald-egg/",
        zh: "/zh-emulator-emerald-egg/",
      },
      guideGroupId: "it:emer-egg:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Gen 3/Emerald/Emulator Egg RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Emulator Egg RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-emulator-hgss-egg/": {
    meta: {
      id: "/emulator-hgss-egg/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-egg/",
      isNew: false,
      title: "RNG delle uova su Oro HeartGold e Argento Soulsilver",
      navDrawerTitle: "Egg RNG",
      description:
        "Impara come fare RNG Manipulation sulle uova della pensione in Oro HeartGold e Argento SoulSilver per shiny o Pokémon con IV alte.",
      slug: "/it-emulator-hgss-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-hgss-egg/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-23",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 4/HeartGold and SoulSilver/Egg.mdx",
      translations: {
        en: "/emulator-hgss-egg/",
        it: "/it-emulator-hgss-egg/",
        zh: "/zh-emulator-hgss-egg/",
      },
      guideGroupId: "it:/emulator-hgss-egg/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Gen 4/HeartGold and SoulSilver/Egg.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 4/HeartGold and SoulSilver/Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-frlg-gen3-sid/": {
    meta: {
      id: "/frlg-gen3-sid/",
      categories: ["FireRed and LeafGreen"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/frlg-gen3-sid/",
      isNew: false,
      title: "Trova il tuo SID su Rosso Fuoco e Verde Foglia",
      navDrawerTitle: "Trova SID",
      description:
        "Vari metodi per trovare il tuo SID su Rosso Fuoco e Verde Foglia.",
      slug: "/it-frlg-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/frlg-gen3-sid/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-frlg-gen3-sid/",
        en: "/frlg-gen3-sid/",
        it: "/it-frlg-gen3-sid/",
        zh: "/zh-frlg-gen3-sid/",
      },
      guideGroupId: "it:/frlg-gen3-sid/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-gen3-glossary/": {
    meta: {
      id: "/gen3-glossary/",
      categories: ["Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/gen3-glossary/",
      isNew: false,
      title: "Glossary",
      navDrawerTitle: "Glossary",
      description:
        "List of important terms related to Pokémon RNG manipulation in Generation III games.",
      slug: "/it-gen3-glossary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-17",
      translation: { enSlug: "/gen3-glossary/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Glossary.mdx",
      translations: {
        es: "/es-gen3-glossary/",
        en: "/gen3-glossary/",
        it: "/it-gen3-glossary/",
      },
      guideGroupId: "it:/gen3-glossary/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 3/Emerald/Glossary.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Glossary.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-gen3-sid/": {
    meta: {
      id: "/gen3-sid/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/gen3-sid/",
      isNew: false,
      title: "Trova il tuo SID su Smeraldo",
      navDrawerTitle: "Trova SID",
      description: "Vari metodi per trovare il tuo SID su Smeraldo.",
      slug: "/it-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/gen3-sid/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-gen3-sid/",
        en: "/gen3-sid/",
        it: "/it-gen3-sid/",
        zh: "/zh-gen3-sid/",
      },
      guideGroupId: "it:/gen3-sid/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-hgss-initial-seed/": {
    meta: {
      id: "/hgss-initial-seed/",
      categories: ["HeartGold and SoulSilver"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/hgss-initial-seed/",
      isNew: false,
      title: "RNG dell'Initial Seed in Oro HeartGold e Argento SoulSilver",
      navDrawerTitle: "RNG dell'Initial Seed",
      description:
        "Impara come manipolare il tuo initial seed in Oro HeartGold e Argento SoulSilver.",
      slug: "/it-hgss-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/hgss-initial-seed/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-24",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx",
      translations: {
        en: "/hgss-initial-seed/",
        it: "/it-hgss-initial-seed/",
        zh: "/zh-hgss-initial-seed/",
      },
      guideGroupId: "it:/hgss-initial-seed/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-install-pokereader/": {
    meta: {
      id: "/install-pokereader/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/install-pokereader/",
      isNew: false,
      title: "PokeReader 3DS",
      navDrawerTitle: "PokeReader 3DS",
      description:
        "Impara come installare PokeReader sul tuo 3DS per assisterti con l'RNG e cacciare Pokémon perfetti.",
      slug: "/it-install-pokereader/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/install-pokereader/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Tools And Emulators/3DS PokeReader.mdx",
      translations: {
        es: "/es-install-pokereader/",
        en: "/install-pokereader/",
        it: "/it-install-pokereader/",
        zh: "/zh-install-pokereader/",
      },
      guideGroupId:
        "it:/install-pokereader/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Tools And Emulators/3DS PokeReader.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Tools And Emulators/3DS PokeReader.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-pokereader/": {
    meta: {
      id: "/pokereader/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/pokereader/",
      isNew: false,
      title: "PokeReader - Overlay 3DS per RNG su Pokemon",
      navDrawerTitle: "Cos'è PokeReader",
      description:
        "PokeReader è un plugin 3GX per 3DS che aggiunge uno strumento (emulator-style) come mettere in pausa il gioco, avanzare i frame e altro - perfetto per l'RNG manipulation negli hardware originali.",
      slug: "/it-pokereader/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/pokereader/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Tools And Emulators/PokeReader.mdx",
      translations: { it: "/it-pokereader/", en: "/pokereader/" },
      guideGroupId:
        "it:/pokereader/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/it/Tools And Emulators/PokeReader.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Tools And Emulators/PokeReader.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-retail-dppt-starter/": {
    meta: {
      id: "/retail-dppt-starter/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-dppt-starter/",
      isNew: false,
      title: "RNG di Starter per Diamante, Perla e Platino",
      navDrawerTitle: "Starter RNG",
      description:
        "Impara a manipolare l'RNG degli starter in Diamante, Perla e Platino per ottenere Pokémon shiny con IV alti.",
      slug: "/it-retail-dppt-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-06-15",
      translation: { enSlug: "/retail-dppt-starter/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-dppt-starter/",
        en: "/retail-dppt-starter/",
        zh: "/zh-retail-dppt-starter/",
      },
      guideGroupId: "it:/retail-dppt-starter/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 4/Starters.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 4/Starters.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-retail-emerald-wild/": {
    meta: {
      id: "/retail-emerald-wild/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-emerald-wild/",
      isNew: false,
      title: "RNG Retail di Selvatici su Smeraldo",
      navDrawerTitle: "RNG Retail di Selvatici su Smeraldo",
      description:
        "Impara come Manipolare l'RNG di Pokémon selvatici su Pokémon Smeraldo su una console originale per IV perfette, nature, cromatici.",
      slug: "/it-retail-emerald-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-emerald-wild/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Retail Wild RNG.mdx",
      translations: {
        de: "/de-retail-emerald-wild/",
        it: "/it-retail-emerald-wild/",
        en: "/retail-emerald-wild/",
        zh: "/zh-retail-emerald-wild/",
      },
      guideGroupId: "it:/retail-emerald-wild/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/it/Gen 3/Emerald/Retail Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Retail Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-retail-hgss-starter/": {
    meta: {
      id: "/retail-hgss-starter/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-hgss-starter/",
      isNew: false,
      title: "RNG di Starter per Oro HeartGold e Argento SoulSilver",
      navDrawerTitle: "Starter RNG",
      description:
        "Impara a manipolare l'RNG degli starter in HeartGold e SoulSilver per ottenere Pokémon shiny con IV alti.",
      slug: "/it-retail-hgss-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-06-15",
      translation: { enSlug: "/retail-hgss-starter/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-hgss-starter/",
        en: "/retail-hgss-starter/",
        zh: "/zh-retail-hgss-starter/",
      },
      guideGroupId: "it:/retail-hgss-starter/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 4/Starters.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 4/Starters.mdx?raw"
      );
      return file.default;
    }),
  },
  "/it-rs-gen3-sid/": {
    meta: {
      id: "/rs-gen3-sid/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/rs-gen3-sid/",
      isNew: false,
      title: "Trova il tuo SID su Rubino e Zaffiro",
      navDrawerTitle: "Trova SID",
      description: "Vari metodi per trovare il tuo SID su Rubino e Zaffiro.",
      slug: "/it-rs-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-gen3-sid/", language: "it" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-rs-gen3-sid/",
        it: "/it-rs-gen3-sid/",
        en: "/rs-gen3-sid/",
        zh: "/zh-rs-gen3-sid/",
      },
      guideGroupId: "it:/rs-gen3-sid/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/it/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/it/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/legends-arceus/": {
    meta: {
      id: "/legends-arceus/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/legends-arceus/",
      isNew: false,
      title: "Legends Arceus",
      navDrawerTitle: "Legends Arceus",
      description: "Legends Arceus Resources",
      slug: "/legends-arceus/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/legends-arceus/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/meteor-jirachi/": {
    meta: {
      id: "/meteor-jirachi/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/meteor-jirachi/",
      isNew: false,
      title: "Ruby and Sapphire Meteor Jirachi RNG",
      navDrawerTitle: "Meteor Jirachi RNG",
      description:
        "Learn how to RNG a Meteor Jirachi with different shinies than Wishmaker.",
      slug: "/meteor-jirachi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-18",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: { en: "/meteor-jirachi/", zh: "/zh-meteor-jirachi/" },
      guideGroupId: "en:/meteor-jirachi/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/meteor-jirachi/" },
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx?raw"
      );
      return file.default;
    }),
  },
  "/mgba-setup/": {
    meta: {
      id: "/mgba-setup/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/mgba-setup/",
      isNew: false,
      title: "mGBA Setup",
      navDrawerTitle: "mGBA Setup",
      description:
        "Learn how to set up mGBA for GBA Pokémon RNG, including lua scripting support.",
      slug: "/mgba-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/mGBA Setup.mdx",
      translations: { en: "/mgba-setup/", zh: "/zh-mgba-setup/" },
      guideGroupId:
        "en:/mgba-setup/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/mGBA Setup.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/mGBA Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/misc-3ds-installing-pcalc/": {
    meta: {
      id: "/misc-3ds-installing-pcalc/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/misc-3ds-installing-pcalc/",
      isNew: false,
      title: "How to Install PCalc",
      navDrawerTitle: "How to Install PCalc",
      description:
        "Learn how to install PCalc on your 3DS to assist with RNG in Pokémon games like X/Y, ORAS, Sun/Moon, and USUM.",
      slug: "/misc-3ds-installing-pcalc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/How to Install PCalc.mdx",
      translations: null,
      guideGroupId:
        "en:/misc-3ds-installing-pcalc/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/How to Install PCalc.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/How to Install PCalc.mdx?raw"
      );
      return file.default;
    }),
  },
  "/misc-3ds-ips-luma-citra/": {
    meta: {
      id: "/misc-3ds-ips-luma-citra/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/misc-3ds-ips-luma-citra/",
      isNew: false,
      title:
        "How to Use IPS Patches on a 3DS or Emulator (Luma3DS, Azahar, Citra)",
      navDrawerTitle: "Using IPS Patches",
      description:
        "Learn how to apply IPS patches like instant text and no outlines using Luma3DS, Azahar, or Citra. Includes 3DS setup, emulator mods, and a merge tool.",
      slug: "/misc-3ds-ips-luma-citra/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx",
      translations: null,
      guideGroupId:
        "en:/misc-3ds-ips-luma-citra/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx?raw"
      );
      return file.default;
    }),
  },
  "/misc-3ds-island-scan-sm/": {
    meta: {
      id: "/misc-3ds-island-scan-sm/",
      categories: ["Sun and Moon"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/misc-3ds-island-scan-sm/",
      isNew: false,
      title: "Island Scan Pokemon in Sun & Moon - Full List by Day & Location",
      navDrawerTitle: "Island Scan Pokemon",
      description:
        "Check out an easy-to-use list of Island Scan Pokémon for Sun and Moon, organized by day and location for quick reference.",
      slug: "/misc-3ds-island-scan-sm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan Pokemon SM.mdx",
      translations: {
        en: "/misc-3ds-island-scan-sm/",
        zh: "/zh-misc-3ds-island-scan-sm/",
      },
      guideGroupId: "en:/misc-3ds-island-scan-sm/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Island Scan Pokemon SM.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Island Scan Pokemon SM.mdx?raw"
      );
      return file.default;
    }),
  },
  "/misc-3ds-island-scan-usum/": {
    meta: {
      id: "/misc-3ds-island-scan-usum/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/misc-3ds-island-scan-usum/",
      isNew: false,
      title:
        "Island Scan Pokemon in Ultra Sun & Ultra Moon - Full List by Day & Location",
      navDrawerTitle: "Island Scan Pokemon",
      description:
        "Check out an easy-to-use list of Island Scan Pokémon for Ultra Sun and Ultra Moon, organized by day and location for quick reference.",
      slug: "/misc-3ds-island-scan-usum/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan Pokemon USUM.mdx",
      translations: {
        en: "/misc-3ds-island-scan-usum/",
        zh: "/zh-misc-3ds-island-scan-usum/",
      },
      guideGroupId: "en:/misc-3ds-island-scan-usum/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Island Scan Pokemon USUM.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Island Scan Pokemon USUM.mdx?raw"
      );
      return file.default;
    }),
  },
  "/misc-3ds-transporter-nature-tables/": {
    meta: {
      id: "/misc-3ds-transporter-nature-tables/",
      categories: ["Transporter and Dream Radar"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/misc-3ds-transporter-nature-tables/",
      isNew: false,
      title: "Transporter EXP to Nature Conversion Table (VC)",
      navDrawerTitle: "Nature Conversion Table",
      description:
        "Quickly check what nature your Virtual Console Pokémon will get when using Pokémon Transporter.",
      slug: "/misc-3ds-transporter-nature-tables/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Transporter/Nature Table.mdx",
      translations: null,
      guideGroupId:
        "en:/misc-3ds-transporter-nature-tables/:Transporter and Dream Radar",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Transporter/Nature Table.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Transporter/Nature Table.mdx?raw");
      return file.default;
    }),
  },
  "/misc-dolphin-connect-vba/": {
    meta: {
      id: "/misc-dolphin-connect-vba/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/misc-dolphin-connect-vba/",
      isNew: false,
      title: "Connect Dolphin to VBA",
      navDrawerTitle: "Connect Dolphin to VBA",
      description:
        "Learn how to redeem Jirachi or transfer your RNGs to a GBA game.",
      slug: "/misc-dolphin-connect-vba/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx",
      translations: null,
      guideGroupId:
        "en:/misc-dolphin-connect-vba/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx?raw"
      );
      return file.default;
    }),
  },
  "/misc-dolphin-gba-bios/": {
    meta: {
      id: "/misc-dolphin-gba-bios/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/misc-dolphin-gba-bios/",
      isNew: false,
      title: "GBA BIOS File - What It Is and How to Extract It for Emulators",
      navDrawerTitle: "GBA Bios",
      description:
        "Learn what the GBA BIOS is, why emulators like mGBA and VBA need it, and how to legally extract it from real hardware. Step-by-step guide included.",
      slug: "/misc-dolphin-gba-bios/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/How to Extract GBA Bios.mdx",
      translations: {
        en: "/misc-dolphin-gba-bios/",
        zh: "/zh-misc-dolphin-gba-bios/",
      },
      guideGroupId:
        "en:/misc-dolphin-gba-bios/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Tools and Emulators/How to Extract GBA Bios.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/How to Extract GBA Bios.mdx?raw"
      );
      return file.default;
    }),
  },
  "/misc-sm-wild-spots/": {
    meta: {
      id: "/misc-sm-wild-spots/",
      categories: ["Sun and Moon"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/misc-sm-wild-spots/",
      isNew: false,
      title: "Sun and Moon Wild NPC Locations and Corrections",
      navDrawerTitle: "Wild NPC Locations",
      description:
        "Where to place your character and the correction needed for each area to RNG wild Pokémon in Sun and Moon.",
      slug: "/misc-sm-wild-spots/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Wild Spots.mdx",
      translations: null,
      guideGroupId: "en:/misc-sm-wild-spots/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Wild Spots.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Wild Spots.mdx?raw");
      return file.default;
    }),
  },
  "/mystic-timer/": {
    meta: {
      id: "/mystic-timer/",
      categories: [
        "Ruby and Sapphire",
        "FireRed and LeafGreen",
        "Emerald",
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/mystic-timer/",
      isNew: false,
      title: "Mystic Timer - Online Pokémon RNG Timer for Gens 3-7",
      navDrawerTitle: "Mystic Timer",
      description:
        "Mystic Timer is a mobile-friendly alternative to Eon Timer. Perfect for Gen 3, 4, 5, 6, and 7 Pokémon RNG on any device, including Mac, Linux, iOS, and Android.",
      slug: "/mystic-timer/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-18",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Timer.mdx",
      translations: null,
      guideGroupId:
        "en:/mystic-timer/:Black 2 and White 2|Black and White|Diamond, Pearl, and Platinum|Emerald|FireRed and LeafGreen|HeartGold and SoulSilver|Omega Ruby and Alpha Sapphire|Ruby and Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Timer.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Timer.mdx?raw"
      );
      return file.default;
    }),
  },
  "/no-dolphin-patch/": {
    meta: {
      id: "/no-dolphin-patch/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "patch",
      guideVariants: null,
      guideKey: "/no-dolphin-patch/",
      isNew: false,
      title: "No Dolphin Patch",
      navDrawerTitle: "No Dolphin Patch",
      description:
        "Use this patch to RNG the Wishmaker Jirachi without needing the Dolphin emulator.",
      slug: "/no-dolphin-patch/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-03",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/No Dolphin Patch.mdx",
      translations: null,
      guideGroupId:
        "en:/no-dolphin-patch/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/No Dolphin Patch.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/No Dolphin Patch.mdx?raw"
      );
      return file.default;
    }),
  },
  "/ntr-helper-usage/": {
    meta: {
      id: "/ntr-helper-usage/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/ntr-helper-usage/",
      isNew: false,
      title: "NTR Helper Usage",
      navDrawerTitle: "NTR Helper Usage",
      description: "Learn how to use the NTR Helper Tool in 3DSRNGTool.",
      slug: "/ntr-helper-usage/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/NTR Helper Usage.mdx",
      translations: null,
      guideGroupId:
        "en:/ntr-helper-usage/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/NTR Helper Usage.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/NTR Helper Usage.mdx?raw"
      );
      return file.default;
    }),
  },
  "/omega-ruby-and-alpha-sapphire/": {
    meta: {
      id: "/omega-ruby-and-alpha-sapphire/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/omega-ruby-and-alpha-sapphire/",
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire",
      navDrawerTitle: "Omega Ruby and Alpha Sapphire",
      description: "Omega Ruby and Alpha Sapphire Resources",
      slug: "/omega-ruby-and-alpha-sapphire/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/omega-ruby-and-alpha-sapphire/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/oras-mirage-spots/": {
    meta: {
      id: "/oras-mirage-spots/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/oras-mirage-spots/",
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire Mirage Spot RNG",
      navDrawerTitle: "Mirage Spot RNG",
      description:
        "Learn how to RNG access to any Mirage Spots in Omega Ruby and Alpha Sapphire for rare encounters and shiny Pokémon.",
      slug: "/oras-mirage-spots/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-14",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Mirage Spot.mdx",
      translations: { en: "/oras-mirage-spots/", zh: "/zh-oras-mirage-spots/" },
      guideGroupId: "en:/oras-mirage-spots/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/oras-mirage-spots/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/Mirage Spot.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 6/Mirage Spot.mdx?raw");
      return file.default;
    }),
  },
  "/oras-remove-time-penalty/": {
    meta: {
      id: "/oras-remove-time-penalty/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/oras-remove-time-penalty/",
      isNew: false,
      title: "Remove Time Penalties in Omega Ruby and Alpha Sapphire",
      navDrawerTitle: "Remove Time Penalties",
      description:
        "Learn how to change the time in Omega Ruby and Alpha Sapphire without triggering time penalties.",
      slug: "/oras-remove-time-penalty/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-14",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Remove Time Penalties.mdx",
      translations: {
        en: "/oras-remove-time-penalty/",
        zh: "/zh-oras-remove-time-penalty/",
      },
      guideGroupId:
        "en:/oras-remove-time-penalty/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 6/Remove Time Penalties.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 6/Remove Time Penalties.mdx?raw"
      );
      return file.default;
    }),
  },
  "/pal-xd-eevee/": {
    meta: {
      id: "/pal-xd-eevee/",
      categories: ["Gamecube"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/pal-xd-eevee/",
      isNew: false,
      title: "XD Eevee PAL RNG",
      navDrawerTitle: "XD Eevee PAL RNG",
      description: "How to RNG the starter Eevee with a PAL Pokemon XD.",
      slug: "/pal-xd-eevee/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx",
      translations: { en: "/pal-xd-eevee/", zh: "/zh-pal-xd-eevee/" },
      guideGroupId: "en:/pal-xd-eevee/:Gamecube",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/pal-xd-eevee/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/pcalc-xy-friend-safari/": {
    meta: {
      id: "/pcalc-xy-friend-safari/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/pcalc-xy-friend-safari/",
      isNew: false,
      title: "X and Y Friend Safari RNG",
      navDrawerTitle: "Friend Safari RNG",
      description:
        "Learn how to RNG shiny 6IV Pokémon from the Friend Safari in X and Y, including Ditto and other rare species.",
      slug: "/pcalc-xy-friend-safari/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Friend Safari RNG Guide.mdx",
      translations: {
        en: "/pcalc-xy-friend-safari/",
        zh: "/zh-pcalc-xy-friend-safari/",
      },
      guideGroupId: "en:/pcalc-xy-friend-safari/:X and Y",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/pcalc-xy-friend-safari/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 6/Friend Safari RNG Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 6/Friend Safari RNG Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/pcalc-xy-tid/": {
    meta: {
      id: "/pcalc-xy-tid/",
      categories: ["X and Y"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/pcalc-xy-tid/",
      isNew: false,
      title: "X and Y TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in X and Y.",
      slug: "/pcalc-xy-tid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/XY TID.mdx",
      translations: { en: "/pcalc-xy-tid/", zh: "/zh-pcalc-xy-tid/" },
      guideGroupId: "en:/pcalc-xy-tid/:X and Y",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/pcalc-xy-tid/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/XY TID.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 6/XY TID.mdx?raw");
      return file.default;
    }),
  },
  "/pokefinder/": {
    meta: {
      id: "/pokefinder/",
      categories: [
        "Ruby and Sapphire",
        "FireRed and LeafGreen",
        "Emerald",
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
        "Sword and Shield",
        "Brilliant Diamond and Shining Pearl",
        "Legends Arceus",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/pokefinder/",
      isNew: false,
      title: "Pokemon RNG Tool - Use PokeFinder for Gens 3-5 & 8",
      navDrawerTitle: "PokeFinder",
      description:
        "Pokefinder is a cross-platform RNG tool for Pokémon Generations 3-5 & 8. Supports shiny hunting, TID/SID RNG, breeding, and more. Works for emulators and real hardware.",
      slug: "/pokefinder/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/PokeFinder.mdx",
      translations: null,
      guideGroupId:
        "en:/pokefinder/:Black 2 and White 2|Black and White|Brilliant Diamond and Shining Pearl|Diamond, Pearl, and Platinum|Emerald|FireRed and LeafGreen|HeartGold and SoulSilver|Legends Arceus|Omega Ruby and Alpha Sapphire|Ruby and Sapphire|Sun and Moon|Sword and Shield|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/PokeFinder.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/PokeFinder.mdx?raw"
      );
      return file.default;
    }),
  },
  "/pokereader/": {
    meta: {
      id: "/pokereader/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/pokereader/",
      isNew: false,
      title: "PokeReader - 3DS Overlay for Pokemon RNG",
      navDrawerTitle: "What is PokeReader",
      description:
        "PokeReader is a 3GX plugin for the 3DS that adds emulator-style tools like pausing, frame advancing, and overlays - perfect for RNG manipulation on real hardware.",
      slug: "/pokereader/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/PokeReader.mdx",
      translations: { it: "/it-pokereader/", en: "/pokereader/" },
      guideGroupId:
        "en:/pokereader/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/PokeReader.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/PokeReader.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-bw-entralink/": {
    meta: {
      id: "/retail-bw-entralink/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-bw-entralink/",
      isNew: false,
      title: "Black and White Retail Entralink RNG",
      navDrawerTitle: "Entralink RNG",
      description:
        "Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.",
      slug: "/retail-bw-entralink/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 5/Retail Entralink.mdx",
      translations: null,
      guideGroupId: "en:/retail-bw-entralink/:Black and White",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-bw-entralink/" },
        cfwEmu: null,
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Retail Entralink.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Retail Entralink.mdx?raw");
      return file.default;
    }),
  },
  "/retail-bw-starter/": {
    meta: {
      id: "/retail-bw-starter/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "starter",
      isNew: true,
      title: "Black and White Starter RNG",
      navDrawerTitle: "Starter RNG",
      description:
        "Learn how to RNG starters in Black and White for shiny, high-IV Pokémon.",
      slug: "/retail-bw-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2026-03-29",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-29",
      type: "baseGuide",
      file: "guides/Gen 5/BW Retail Starter.mdx",
      translations: null,
      guideGroupId: "en:starter:Black and White",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-bw-starter/" },
        cfwEmu: { type: "slug", slug: "/bw-emu-starter/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/BW Retail Starter.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/BW Retail Starter.mdx?raw");
      return file.default;
    }),
  },
  "/retail-dppt-starter/": {
    meta: {
      id: "/retail-dppt-starter/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-dppt-starter/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Starter RNG",
      navDrawerTitle: "Starter RNG",
      description:
        "Learn how to RNG starters in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.",
      slug: "/retail-dppt-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-06-15",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-dppt-starter/",
        en: "/retail-dppt-starter/",
        zh: "/zh-retail-dppt-starter/",
      },
      guideGroupId: "en:/retail-dppt-starter/:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-dppt-starter/" },
        cfwEmu: null,
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Starters.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Starters.mdx?raw");
      return file.default;
    }),
  },
  "/retail-dppt-static/": {
    meta: {
      id: "/retail-dppt-static/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-dppt-static/",
      isNew: false,
      title: "Diamond, Pearl, and Platinum Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies.",
      slug: "/retail-dppt-static/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "baseGuide",
      file: "guides/Gen 4/Retail Static.mdx",
      translations: null,
      guideGroupId: "en:/retail-dppt-static/:Diamond, Pearl, and Platinum",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-dppt-static/" },
        cfwEmu: null,
      },
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Retail Static.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Retail Static.mdx?raw");
      return file.default;
    }),
  },
  "/retail-emerald-egg/": {
    meta: {
      id: "/retail-emerald-egg/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "emer-egg",
      isNew: false,
      title: "Retail Emerald Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to Retail RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/retail-emerald-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-05-18",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-16",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Retail Egg.mdx",
      translations: {
        de: "/de-retail-emerald-egg/",
        en: "/retail-emerald-egg/",
        zh: "/zh-retail-emerald-egg/",
      },
      guideGroupId: "en:emer-egg:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-emerald-egg/" },
        cfwEmu: { type: "slug", slug: "/emulator-emerald-egg/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Retail Egg.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Retail Egg.mdx?raw");
      return file.default;
    }),
  },
  "/retail-emerald-wild/": {
    meta: {
      id: "/retail-emerald-wild/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-emerald-wild/",
      isNew: false,
      title: "Emerald Retail Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Pokémon Emerald on a retail console for perfect IVs, natures, and shinies.",
      slug: "/retail-emerald-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-19",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Retail Wild RNG.mdx",
      translations: {
        de: "/de-retail-emerald-wild/",
        it: "/it-retail-emerald-wild/",
        en: "/retail-emerald-wild/",
        zh: "/zh-retail-emerald-wild/",
      },
      guideGroupId: "en:/retail-emerald-wild/:Emerald",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-emerald-wild/" },
        cfwEmu: null,
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Retail Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Retail Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-hgss-starter/": {
    meta: {
      id: "/retail-hgss-starter/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-hgss-starter/",
      isNew: false,
      title: "HeartGold and SoulSilver Starter RNG",
      navDrawerTitle: "Starter RNG",
      description:
        "Learn how to RNG starters in HeartGold and SoulSilver for shiny, high-IV Pokémon.",
      slug: "/retail-hgss-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-06-15",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-hgss-starter/",
        en: "/retail-hgss-starter/",
        zh: "/zh-retail-hgss-starter/",
      },
      guideGroupId: "en:/retail-hgss-starter/:HeartGold and SoulSilver",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-hgss-starter/" },
        cfwEmu: null,
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Starters.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Starters.mdx?raw");
      return file.default;
    }),
  },
  "/retail-oras-egg-mmsc/": {
    meta: {
      id: "/retail-oras-egg-mmsc/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-oras-egg-mmsc/",
      isNew: false,
      title:
        "Omega Ruby and Alpha Sapphire Egg RNG with Masuda Method or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Omega Ruby and Alpha Sapphire for shiny, high-IV Pokémon.",
      slug: "/retail-oras-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-oras-egg-mmsc/",
        zh: "/zh-retail-oras-egg-mmsc/",
      },
      guideGroupId: "en:/retail-oras-egg-mmsc/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-oras-egg-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-oras-egg-no-mmsc/": {
    meta: {
      id: "/retail-oras-egg-no-mmsc/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-oras-egg-no-mmsc/",
      isNew: false,
      title:
        "Omega Ruby and Alpha Sapphire Egg RNG Without Masuda or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Omega Ruby and Alpha Sapphire for shiny, high-IV Pokémon.",
      slug: "/retail-oras-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-oras-egg-no-mmsc/",
        zh: "/zh-retail-oras-egg-no-mmsc/",
      },
      guideGroupId:
        "en:/retail-oras-egg-no-mmsc/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-oras-egg-no-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-oras-tid/": {
    meta: {
      id: "/retail-oras-tid/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-oras-tid/",
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Omega Ruby and Alpha Sapphire.",
      slug: "/retail-oras-tid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-13",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/ORAS TID.mdx",
      translations: { en: "/retail-oras-tid/", zh: "/zh-retail-oras-tid/" },
      guideGroupId: "en:/retail-oras-tid/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-oras-tid/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/ORAS TID.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 6/ORAS TID.mdx?raw");
      return file.default;
    }),
  },
  "/retail-rubysapphire-tid/": {
    meta: {
      id: "/retail-rubysapphire-tid/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "rs-tid",
      isNew: false,
      title: "Ruby and Sapphire Retail TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire.",
      slug: "/retail-rubysapphire-tid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx",
      translations: {
        en: "/retail-rubysapphire-tid/",
        zh: "/zh-retail-rubysapphire-tid/",
      },
      guideGroupId: "en:rs-tid:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-rubysapphire-tid/" },
        cfwEmu: { type: "slug", slug: "/emulator-rs-live-battery-tid/" },
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-egg-mmsc/": {
    meta: {
      id: "/retail-sm-egg-mmsc/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "mm-sc-egg",
      isNew: false,
      title: "Sun and Moon Egg RNG with Masuda and/or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Sun and Moon for shiny, high-IV Pokémon.",
      slug: "/retail-sm-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-egg-mmsc/",
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-sm-egg-mmsc/",
        zh: "/zh-retail-sm-egg-mmsc/",
      },
      guideGroupId: "en:mm-sc-egg:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-egg-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-egg-no-mmsc/": {
    meta: {
      id: "/retail-sm-egg-no-mmsc/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-egg-no-mmsc/",
      isNew: false,
      title: "Sun and Moon Egg RNG without Masuda and/or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Sun and Moon for shiny, high-IV Pokémon.",
      slug: "/retail-sm-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-egg-no-mmsc/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-sm-egg-no-mmsc/",
        zh: "/zh-retail-sm-egg-no-mmsc/",
      },
      guideGroupId: "en:/retail-sm-egg-no-mmsc/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-egg-no-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-egg-seed-no-cfw/": {
    meta: {
      id: "/retail-sm-egg-seed-no-cfw/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-sm-egg-seed-no-cfw/",
      isNew: false,
      title: "Sun and Moon retail finding egg seeds",
      navDrawerTitle: "Find Egg Seeds",
      description:
        "Find egg seeds for Egg RNG in Sun and Moon using the Magikarp Method — no CFW needed.",
      slug: "/retail-sm-egg-seed-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-egg-seed-no-cfw/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
      translations: {
        en: "/retail-sm-egg-seed-no-cfw/",
        zh: "/zh-retail-sm-egg-seed-no-cfw/",
      },
      guideGroupId: "en:/retail-sm-egg-seed-no-cfw/:Sun and Moon",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-sm-egg-seed-no-cfw/" },
        cfwEmu: null,
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-fidget/": {
    meta: {
      id: "/retail-sm-fidget/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-fidget/",
      isNew: false,
      title: "Sun and Moon Timeline with Fidget RNG",
      navDrawerTitle: "Timeline Fidget RNG",
      description:
        "Learn how to create a timeline with character fidgets in Sun and Moon.",
      slug: "/retail-sm-fidget/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-fidget/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline With Fidget Guide.mdx",
      translations: { en: "/retail-sm-fidget/", zh: "/zh-retail-sm-fidget/" },
      guideGroupId: "en:/retail-sm-fidget/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-fidget/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline With Fidget Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Timeline With Fidget Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-initial-seed-clocks/": {
    meta: {
      id: "/retail-sm-initial-seed-clocks/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-sm-initial-seed-clocks/",
      isNew: false,
      title: "Sun and Moon finding your initial seed in with clocks",
      navDrawerTitle: "Find Initial Seed",
      description:
        "Learn how to find your initial seed in Sun and Moon using clock patterns — no custom firmware required.",
      slug: "/retail-sm-initial-seed-clocks/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-initial-seed-clocks/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Finding Initial Seed with Clocks.mdx",
      translations: {
        en: "/retail-sm-initial-seed-clocks/",
        zh: "/zh-retail-sm-initial-seed-clocks/",
      },
      guideGroupId: "en:/retail-sm-initial-seed-clocks/:Sun and Moon",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-sm-initial-seed-clocks/" },
        cfwEmu: null,
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Finding Initial Seed with Clocks.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Finding Initial Seed with Clocks.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-island-scan/": {
    meta: {
      id: "/retail-sm-island-scan/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-island-scan/",
      isNew: false,
      title: "Sun and Moon Island Scan RNG",
      navDrawerTitle: "Island Scan RNG",
      description:
        "Learn how to RNG Island Scan Pokémon in Sun and Moon — great for getting shinies in Apricorn Balls.",
      slug: "/retail-sm-island-scan/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-island-scan/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan.mdx",
      translations: {
        en: "/retail-sm-island-scan/",
        zh: "/zh-retail-sm-island-scan/",
      },
      guideGroupId: "en:/retail-sm-island-scan/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-island-scan/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Island Scan.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Island Scan.mdx?raw");
      return file.default;
    }),
  },
  "/retail-sm-myster-gift/": {
    meta: {
      id: "/retail-sm-myster-gift/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-myster-gift/",
      isNew: false,
      title: "Sun and Moon Mystery Gift RNG",
      navDrawerTitle: "Mystery Gift RNG",
      description:
        "Learn how to RNG Mystery Gift Pokémon in Sun and Moon for perfect IVs.",
      slug: "/retail-sm-myster-gift/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-mystery-gift/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Mystery Gift.mdx",
      translations: {
        en: "/retail-sm-myster-gift/",
        zh: "/zh-retail-sm-myster-gift/",
      },
      guideGroupId: "en:/retail-sm-myster-gift/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-myster-gift/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Mystery Gift.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Mystery Gift.mdx?raw");
      return file.default;
    }),
  },
  "/retail-sm-no-cfw/": {
    meta: {
      id: "/retail-sm-no-cfw/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-sm-no-cfw/",
      isNew: false,
      title: "Sun and Moon RNGing on retail",
      navDrawerTitle: "Retail RNG",
      description:
        "RNG perfect Pokémon in Sun and Moon without using custom firmware.",
      slug: "/retail-sm-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-no-cfw/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/RNGing Without Custom Firmware.mdx",
      translations: { en: "/retail-sm-no-cfw/", zh: "/zh-retail-sm-no-cfw/" },
      guideGroupId: "en:/retail-sm-no-cfw/:Sun and Moon",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-sm-no-cfw/" },
        cfwEmu: null,
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/RNGing Without Custom Firmware.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/RNGing Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-sos/": {
    meta: {
      id: "/retail-sm-sos/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-sos/",
      isNew: false,
      title: "Sun and Moon SOS RNG",
      navDrawerTitle: "SOS RNG",
      description:
        "Learn how to RNG SOS battles in Sun and Moon for shinies, IVs, and hidden abilities.",
      slug: "/retail-sm-sos/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-sos/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/SOS RNG Guide.mdx",
      translations: { en: "/retail-sm-sos/", zh: "/zh-retail-sm-sos/" },
      guideGroupId: "en:/retail-sm-sos/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-sos/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/SOS RNG Guide.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/SOS RNG Guide.mdx?raw");
      return file.default;
    }),
  },
  "/retail-sm-stationary/": {
    meta: {
      id: "/retail-sm-stationary/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-stationary/",
      isNew: false,
      title: "Sun and Moon Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in Sun and Moon for perfect IVs, natures, and shinies.",
      slug: "/retail-sm-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-stationary/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Stationary RNG.mdx",
      translations: {
        en: "/retail-sm-stationary/",
        zh: "/zh-retail-sm-stationary/",
      },
      guideGroupId: "en:/retail-sm-stationary/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-stationary/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Stationary RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Stationary RNG.mdx?raw");
      return file.default;
    }),
  },
  "/retail-sm-timeleap/": {
    meta: {
      id: "/retail-sm-timeleap/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-timeleap/",
      isNew: false,
      title: "Sun and Moon Timeline Leap RNG",
      navDrawerTitle: "Timeline Leap RNG",
      description:
        "Learn how to leap onto a specific timeline in Sun and Moon to get the Pokemon you want.",
      slug: "/retail-sm-timeleap/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-timeleap/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Leap Guide.mdx",
      translations: {
        en: "/retail-sm-timeleap/",
        zh: "/zh-retail-sm-timeleap/",
      },
      guideGroupId: "en:/retail-sm-timeleap/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-timeleap/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline Leap Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Timeline Leap Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-sm-timeline/": {
    meta: {
      id: "/retail-sm-timeline/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-timeline/",
      isNew: false,
      title: "Sun and Moon Timeline RNG",
      navDrawerTitle: "Timeline RNG",
      description: "Learn how to create a timeline in Sun and Moon.",
      slug: "/retail-sm-timeline/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-timeline/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Guide.mdx",
      translations: {
        en: "/retail-sm-timeline/",
        zh: "/zh-retail-sm-timeline/",
      },
      guideGroupId: "en:/retail-sm-timeline/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-timeline/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Timeline Guide.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Timeline Guide.mdx?raw");
      return file.default;
    }),
  },
  "/retail-sm-wild/": {
    meta: {
      id: "/retail-sm-wild/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-wild/",
      isNew: false,
      title: "Sun and Moon Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Sun and Moon for shiny and high-IV results.",
      slug: "/retail-sm-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-wild/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Wild RNG.mdx",
      translations: { en: "/retail-sm-wild/", zh: "/zh-retail-sm-wild/" },
      guideGroupId: "en:/retail-sm-wild/:Sun and Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-sm-wild/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Wild RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Wild RNG.mdx?raw");
      return file.default;
    }),
  },
  "/retail-swsh-get-seed-with-cfw/": {
    meta: {
      id: "/retail-swsh-get-seed-with-cfw/",
      categories: ["Sword and Shield"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "raid-seed",
      isNew: false,
      title: "Sword and Shield find raid seed with custom firmware",
      navDrawerTitle: "Find Raid Seed",
      description:
        "Learn how to find raid seeds in Sword and Shield using a Switch with custom firmware.",
      slug: "/retail-swsh-get-seed-with-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Sword and Shield/Get Raid Seed With CFW.mdx",
      translations: null,
      guideGroupId: "en:raid-seed:Sword and Shield",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-swsh-get-seed-without-cfw/" },
        cfwEmu: { type: "slug", slug: "/retail-swsh-get-seed-with-cfw/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Sword and Shield/Get Raid Seed With CFW.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Sword and Shield/Get Raid Seed With CFW.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-swsh-get-seed-without-cfw/": {
    meta: {
      id: "/retail-swsh-get-seed-without-cfw/",
      categories: ["Sword and Shield"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "raid-seed",
      isNew: false,
      title: "Sword and Shield - Find Raid Seed Without CFW",
      navDrawerTitle: "Find Raid Seed",
      description:
        "Learn how to find raid seeds in Sword and Shield without custom firmware.",
      slug: "/retail-swsh-get-seed-without-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Sword and Shield/Get Raid Seed Without CFW.mdx",
      translations: null,
      guideGroupId: "en:raid-seed:Sword and Shield",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-swsh-get-seed-without-cfw/" },
        cfwEmu: { type: "slug", slug: "/retail-swsh-get-seed-with-cfw/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Sword and Shield/Get Raid Seed Without CFW.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Sword and Shield/Get Raid Seed Without CFW.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-swsh-raid/": {
    meta: {
      id: "/retail-swsh-raid/",
      categories: ["Sword and Shield"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "raid",
      isNew: false,
      title: "Sword and Shield Raid RNG",
      navDrawerTitle: "Raid RNG",
      description:
        "Learn how to RNG raid Pokémon (including G-Max) in Sword and Shield Dens.",
      slug: "/retail-swsh-raid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Sword and Shield/Raid RNG.mdx",
      translations: null,
      guideGroupId: "en:raid:Sword and Shield",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-swsh-raid/" },
        cfwEmu: { type: "slug", slug: "/retail-swsh-raid/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Sword and Shield/Raid RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Sword and Shield/Raid RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-egg-mmsc/": {
    meta: {
      id: "/retail-usum-egg-mmsc/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "mm-sc-egg",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Egg RNG with Masuda and/or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Ultra Sun and Ultra Moon for shiny, high-IV Pokémon.",
      slug: "/retail-usum-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-usum-egg-mmsc/",
        zh: "/zh-retail-usum-egg-mmsc/",
      },
      guideGroupId: "en:mm-sc-egg:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-egg-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-egg-no-mmsc/": {
    meta: {
      id: "/retail-usum-egg-no-mmsc/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-egg-no-mmsc/",
      isNew: false,
      title:
        "Ultra Sun and Ultra Moon Egg RNG without Masuda and/or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Ultra Sun and Ultra Moon for shiny, high-IV Pokémon.",
      slug: "/retail-usum-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-usum-egg-no-mmsc/",
        zh: "/zh-retail-usum-egg-no-mmsc/",
      },
      guideGroupId: "en:/retail-usum-egg-no-mmsc/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-egg-no-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-egg-seed-no-cfw/": {
    meta: {
      id: "/retail-usum-egg-seed-no-cfw/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-usum-egg-seed-no-cfw/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon retail finding egg seeds",
      navDrawerTitle: "Find Egg Seeds",
      description:
        "Find egg seeds for Egg RNG in Ultra Sun and Ultra Moon using the Magikarp Method — no CFW needed.",
      slug: "/retail-usum-egg-seed-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
      translations: {
        en: "/retail-usum-egg-seed-no-cfw/",
        zh: "/zh-retail-usum-egg-seed-no-cfw/",
      },
      guideGroupId: "en:/retail-usum-egg-seed-no-cfw/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-usum-egg-seed-no-cfw/" },
        cfwEmu: null,
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-fidget/": {
    meta: {
      id: "/retail-usum-fidget/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-fidget/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Timeline with Fidget RNG",
      navDrawerTitle: "Timeline Fidget RNG",
      description:
        "Learn how to create a timeline with character fidgets in Ultra Sun and Ultra Moon.",
      slug: "/retail-usum-fidget/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline With Fidget Guide.mdx",
      translations: {
        en: "/retail-usum-fidget/",
        zh: "/zh-retail-usum-fidget/",
      },
      guideGroupId: "en:/retail-usum-fidget/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-fidget/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline With Fidget Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Timeline With Fidget Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-initial-seed-clocks/": {
    meta: {
      id: "/retail-usum-initial-seed-clocks/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-usum-initial-seed-clocks/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon finding your initial seed with clocks",
      navDrawerTitle: "Find Initial Seed",
      description:
        "Learn how to find your initial seed in Ultra Sun and Ultra Moon using clock patterns — no custom firmware required.",
      slug: "/retail-usum-initial-seed-clocks/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Finding Initial Seed with Clocks.mdx",
      translations: {
        en: "/retail-usum-initial-seed-clocks/",
        zh: "/zh-retail-usum-initial-seed-clocks/",
      },
      guideGroupId:
        "en:/retail-usum-initial-seed-clocks/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-usum-initial-seed-clocks/" },
        cfwEmu: null,
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Finding Initial Seed with Clocks.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Finding Initial Seed with Clocks.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-island-scan/": {
    meta: {
      id: "/retail-usum-island-scan/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-island-scan/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Island Scan RNG",
      navDrawerTitle: "Island Scan RNG",
      description:
        "Learn how to RNG Island Scan Pokémon in Ultra Sun and Ultra Moon — great for getting shinies in Apricorn Balls.",
      slug: "/retail-usum-island-scan/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan.mdx",
      translations: {
        en: "/retail-usum-island-scan/",
        zh: "/zh-retail-usum-island-scan/",
      },
      guideGroupId: "en:/retail-usum-island-scan/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-island-scan/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Island Scan.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Island Scan.mdx?raw");
      return file.default;
    }),
  },
  "/retail-usum-mystery-gift/": {
    meta: {
      id: "/retail-usum-mystery-gift/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-mystery-gift/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Mystery Gift RNG",
      navDrawerTitle: "Mystery Gift RNG",
      description:
        "Learn how to RNG Mystery Gift Pokémon in Ultra Sun and Ultra Moon for perfect IVs.",
      slug: "/retail-usum-mystery-gift/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Mystery Gift.mdx",
      translations: {
        en: "/retail-usum-mystery-gift/",
        zh: "/zh-retail-usum-mystery-gift/",
      },
      guideGroupId: "en:/retail-usum-mystery-gift/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-mystery-gift/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Mystery Gift.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Mystery Gift.mdx?raw");
      return file.default;
    }),
  },
  "/retail-usum-no-cfw/": {
    meta: {
      id: "/retail-usum-no-cfw/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-usum-no-cfw/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon RNGing on retail",
      navDrawerTitle: "Retail RNG",
      description:
        "RNG perfect Pokémon in Ultra Sun and Ultra Moon without using custom firmware.",
      slug: "/retail-usum-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/RNGing Without Custom Firmware.mdx",
      translations: {
        en: "/retail-usum-no-cfw/",
        zh: "/zh-retail-usum-no-cfw/",
      },
      guideGroupId: "en:/retail-usum-no-cfw/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/retail-usum-no-cfw/" },
        cfwEmu: null,
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/RNGing Without Custom Firmware.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/RNGing Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-sos/": {
    meta: {
      id: "/retail-usum-sos/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-sos/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon SOS RNG",
      navDrawerTitle: "SOS RNG",
      description:
        "Learn how to RNG SOS battles in Ultra Sun and Ultra Moon for shinies, IVs, and hidden abilities.",
      slug: "/retail-usum-sos/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/SOS RNG Guide.mdx",
      translations: { en: "/retail-usum-sos/", zh: "/zh-retail-usum-sos/" },
      guideGroupId: "en:/retail-usum-sos/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-sos/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/SOS RNG Guide.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/SOS RNG Guide.mdx?raw");
      return file.default;
    }),
  },
  "/retail-usum-stationary/": {
    meta: {
      id: "/retail-usum-stationary/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-stationary/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in Ultra Sun and Ultra Moon for perfect IVs, natures, and shinies.",
      slug: "/retail-usum-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Stationary RNG.mdx",
      translations: {
        en: "/retail-usum-stationary/",
        zh: "/zh-retail-usum-stationary/",
      },
      guideGroupId: "en:/retail-usum-stationary/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-stationary/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Stationary RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Stationary RNG.mdx?raw");
      return file.default;
    }),
  },
  "/retail-usum-timeleap/": {
    meta: {
      id: "/retail-usum-timeleap/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-timeleap/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Timeline Leap RNG",
      navDrawerTitle: "Timeline Leap RNG",
      description:
        "Learn how to leap onto a specific timeline in Ultra Sun and Ultra Moon to get the Pokemon you want.",
      slug: "/retail-usum-timeleap/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Leap Guide.mdx",
      translations: {
        en: "/retail-usum-timeleap/",
        zh: "/zh-retail-usum-timeleap/",
      },
      guideGroupId: "en:/retail-usum-timeleap/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-timeleap/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline Leap Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Timeline Leap Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-usum-timeline/": {
    meta: {
      id: "/retail-usum-timeline/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-timeline/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Timeline RNG",
      navDrawerTitle: "Timeline RNG",
      description:
        "Learn how to create a timeline in Ultra Sun and Ultra Moon.",
      slug: "/retail-usum-timeline/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Guide.mdx",
      translations: {
        en: "/retail-usum-timeline/",
        zh: "/zh-retail-usum-timeline/",
      },
      guideGroupId: "en:/retail-usum-timeline/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-timeline/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Timeline Guide.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Timeline Guide.mdx?raw");
      return file.default;
    }),
  },
  "/retail-usum-wild/": {
    meta: {
      id: "/retail-usum-wild/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-wild/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Ultra Sun and Ultra Moon for shiny and high-IV results.",
      slug: "/retail-usum-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Wild RNG.mdx",
      translations: { en: "/retail-usum-wild/", zh: "/zh-retail-usum-wild/" },
      guideGroupId: "en:/retail-usum-wild/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-wild/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Wild RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/Wild RNG.mdx?raw");
      return file.default;
    }),
  },
  "/retail-usum-wormhole/": {
    meta: {
      id: "/retail-usum-wormhole/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-wormhole/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon Wormhole RNG",
      navDrawerTitle: "Wormhole RNG",
      description:
        "RNG legendary Pokémon found in Ultra Wormholes for perfect IVs, nature, and shininess.",
      slug: "/retail-usum-wormhole/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/Stationary Wormhole RNG.mdx",
      translations: {
        en: "/retail-usum-wormhole/",
        zh: "/zh-retail-usum-wormhole/",
      },
      guideGroupId: "en:/retail-usum-wormhole/:Ultra Sun and Ultra Moon",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-usum-wormhole/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Stationary Wormhole RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 7/Stationary Wormhole RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-xy-egg-mmsc/": {
    meta: {
      id: "/retail-xy-egg-mmsc/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-xy-egg-mmsc/",
      isNew: false,
      title: "X and Y Egg RNG with Masuda Method or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in X and Y for shiny, high-IV Pokémon.",
      slug: "/retail-xy-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-oras-egg-mmsc/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-xy-egg-mmsc/",
        zh: "/zh-retail-xy-egg-mmsc/",
      },
      guideGroupId: "en:/retail-xy-egg-mmsc/:X and Y",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-xy-egg-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/retail-xy-egg-no-mmsc/": {
    meta: {
      id: "/retail-xy-egg-no-mmsc/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-xy-egg-no-mmsc/",
      isNew: false,
      title: "X and Y Egg RNG Without Masuda or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in X and Y for shiny, high-IV Pokémon.",
      slug: "/retail-xy-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-oras-egg-no-mmsc/",
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-xy-egg-no-mmsc/",
        zh: "/zh-retail-xy-egg-no-mmsc/",
      },
      guideGroupId: "en:/retail-xy-egg-no-mmsc/:X and Y",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/retail-xy-egg-no-mmsc/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-battery/": {
    meta: {
      id: "/rs-battery/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/rs-battery/",
      isNew: false,
      title: "Ruby and Sapphire Live vs Dead Battery RNG",
      navDrawerTitle: "Live vs Dead Battery",
      description:
        "Learn the differences between RNG methods on Ruby and Sapphire with live and dead batteries, and how each impacts your Pokemon results.",
      slug: "/rs-battery/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx",
      translations: { en: "/rs-battery/", zh: "/zh-rs-battery/" },
      guideGroupId: "en:/rs-battery/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/rs-battery/" },
        cfwEmu: { type: "slug", slug: "/rs-battery/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-gen3-sid/": {
    meta: {
      id: "/rs-gen3-sid/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/rs-gen3-sid/",
      isNew: false,
      title: "Find Ruby and Sapphire SID",
      navDrawerTitle: "Find SID",
      description: "Various methods to finding an SID in Ruby and Sapphire.",
      slug: "/rs-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-27",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-rs-gen3-sid/",
        it: "/it-rs-gen3-sid/",
        en: "/rs-gen3-sid/",
        zh: "/zh-rs-gen3-sid/",
      },
      guideGroupId: "en:/rs-gen3-sid/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/rs-gen3-sid/" },
        cfwEmu: { type: "slug", slug: "/rs-gen3-sid/" },
      },
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Find SID.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Find SID.mdx?raw");
      return file.default;
    }),
  },
  "/rs-initial-seed/": {
    meta: {
      id: "/rs-initial-seed/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/rs-initial-seed/",
      isNew: false,
      title: "Ruby and Sapphire Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description: "Learn how to RNG your initial seed in Ruby and Sapphire.",
      slug: "/rs-initial-seed/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Initial Seed RNG.mdx",
      translations: null,
      guideGroupId: "en:/rs-initial-seed/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/rs-initial-seed/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Ruby and Sapphire/Initial Seed RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-mirage-island/": {
    meta: {
      id: "/rs-mirage-island/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "/rs-mirage-island/",
      isNew: false,
      title: "Mirage Island in Ruby and Sapphire",
      navDrawerTitle: "Mirage Island",
      description:
        "Learn how to access Mirage Island in Pokémon Emerald by catching a Pokémon with the correct PID using RNG manipulation.",
      slug: "/rs-mirage-island/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-11",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-19",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        de: "/de-rs-mirage-island/",
        en: "/rs-mirage-island/",
        zh: "/zh-rs-mirage-island/",
      },
      guideGroupId: "en:/rs-mirage-island/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/rs-mirage-island/" },
        cfwEmu: null,
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Mirage Island.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Mirage Island.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-pokefinder-setup/": {
    meta: {
      id: "/rs-pokefinder-setup/",
      categories: ["Ruby and Sapphire"],
      section: "tool",
      guideVariants: null,
      guideKey: "/rs-pokefinder-setup/",
      isNew: false,
      title: "Ruby and Sapphire PokeFinder Setup",
      navDrawerTitle: "PokeFinder Setup",
      description: "How to set up PokeFinder",
      slug: "/rs-pokefinder-setup/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/PokeFinder Setup.mdx",
      translations: null,
      guideGroupId: "en:/rs-pokefinder-setup/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Ruby and Sapphire/PokeFinder Setup.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/PokeFinder Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-pokerus-emu/": {
    meta: {
      id: "/rs-pokerus-emu/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "rs-pokerus",
      isNew: false,
      title: "Pokérus in Ruby & Sapphire",
      navDrawerTitle: "Pokérus",
      description: "How to be infected by Pokérus",
      slug: "/rs-pokerus-emu/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-05-09",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        de: "/de-rs-pokerus-emu/",
        en: "/rs-pokerus-emu/",
        zh: "/zh-rs-pokerus-emu/",
      },
      guideGroupId: "en:rs-pokerus:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/rs-pokerus-retail/" },
        cfwEmu: { type: "slug", slug: "/rs-pokerus-emu/" },
      },
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Pokerus.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Pokerus.mdx?raw");
      return file.default;
    }),
  },
  "/rs-pokerus-retail/": {
    meta: {
      id: "/rs-pokerus-retail/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "rs-pokerus",
      isNew: false,
      title: "Pokérus in Ruby & Sapphire",
      navDrawerTitle: "Pokérus",
      description: "How to be infected by Pokérus",
      slug: "/rs-pokerus-retail/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-05-17",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx",
      translations: { en: "/rs-pokerus-retail/", zh: "/zh-rs-pokerus-retail/" },
      guideGroupId: "en:rs-pokerus:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/rs-pokerus-retail/" },
        cfwEmu: { type: "slug", slug: "/rs-pokerus-emu/" },
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-sid-feebas/": {
    meta: {
      id: "/rs-sid-feebas/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/rs-sid-feebas/",
      isNew: false,
      title: "Find SID with Feebas in Ruby and Sapphire",
      navDrawerTitle: "Find SID with Feebas",
      description:
        "How to find your Secret ID (SID) in Ruby or Sapphire using Feebas.",
      slug: "/rs-sid-feebas/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        de: "/de-rs-sid-feebas/",
        en: "/rs-sid-feebas/",
        zh: "/zh-rs-sid-feebas/",
      },
      guideGroupId: "en:/rs-sid-feebas/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/rs-sid-feebas/" },
        cfwEmu: null,
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Find SID with Feebas.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Find SID with Feebas.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-static/": {
    meta: {
      id: "/rs-static/",
      categories: ["Ruby and Sapphire"],
      section: "tool",
      guideVariants: null,
      guideKey: "/rs-static/",
      isNew: false,
      title: "Static Tool",
      navDrawerTitle: "Static Tool",
      description: "Static encounters in Ruby and Sapphire",
      slug: "/rs-static/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Static.mdx",
      translations: null,
      guideGroupId: "en:/rs-static/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Gen 3 Static.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Gen 3 Static.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-tidsid-generator/": {
    meta: {
      id: "/rs-tidsid-generator/",
      categories: ["Ruby and Sapphire"],
      section: "tool",
      guideVariants: null,
      guideKey: "/rs-tidsid-generator/",
      isNew: false,
      title: "TID and SID Generator",
      navDrawerTitle: "TID and SID Generator",
      description: "Generator for TID and SID in RS",
      slug: "/rs-tidsid-generator/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      guideGroupId: "en:/rs-tidsid-generator/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx?raw"
      );
      return file.default;
    }),
  },
  "/rs-tips-rng/": {
    meta: {
      id: "/rs-tips-rng/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/rs-tips-rng/",
      isNew: false,
      title: "Ruby and Sapphire RNG Info",
      navDrawerTitle: "RNG Info",
      description:
        "Learn how to advance the RNG and improve stability in Pokémon Ruby and Sapphire for consistent results.",
      slug: "/rs-tips-rng/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Basic Rules of RNG.mdx",
      translations: null,
      guideGroupId: "en:/rs-tips-rng/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: { type: "slug", slug: "/rs-tips-rng/" },
        cfwEmu: { type: "slug", slug: "/rs-tips-rng/" },
      },
      displayAttributes: ["rough_draft"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 3/Ruby and Sapphire/Basic Rules of RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Basic Rules of RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/ruby-and-sapphire/": {
    meta: {
      id: "/ruby-and-sapphire/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/ruby-and-sapphire/",
      isNew: false,
      title: "Ruby and Sapphire",
      navDrawerTitle: "Ruby and Sapphire",
      description: "Ruby and Sapphire Resources",
      slug: "/ruby-and-sapphire/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/ruby-and-sapphire/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/sos-call-rates/": {
    meta: {
      id: "/sos-call-rates/",
      categories: ["Ultra Sun and Ultra Moon", "Sun and Moon"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/sos-call-rates/",
      isNew: false,
      title: "Gen 7 SOS Call Rates",
      navDrawerTitle: "SOS Call Rates",
      description:
        "A searchable list of every Pokemon that can SOS and their call rates in Gen 7.",
      slug: "/sos-call-rates/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 7/SOS Call Rates.mdx",
      translations: null,
      guideGroupId: "en:/sos-call-rates/:Sun and Moon|Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/SOS Call Rates.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 7/SOS Call Rates.mdx?raw");
      return file.default;
    }),
  },
  "/sun-and-moon/": {
    meta: {
      id: "/sun-and-moon/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/sun-and-moon/",
      isNew: false,
      title: "Sun and Moon",
      navDrawerTitle: "Sun and Moon",
      description: "Sun and Moon Resources",
      slug: "/sun-and-moon/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/sun-and-moon/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/sword-and-shield/": {
    meta: {
      id: "/sword-and-shield/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/sword-and-shield/",
      isNew: false,
      title: "Sword and Shield",
      navDrawerTitle: "Sword and Shield",
      description: "Sword and Shield Resources",
      slug: "/sword-and-shield/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/sword-and-shield/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/sysbot-lpa-mmo/": {
    meta: {
      id: "/sysbot-lpa-mmo/",
      categories: ["Legends Arceus"],
      section: "tool",
      guideVariants: null,
      guideKey: "/sysbot-lpa-mmo/",
      isNew: false,
      title: "Legends Arceus MMO RNG",
      navDrawerTitle: "MMO RNG",
      description:
        "Learn how to RNG MMOs in Legends Arceus using Sysbot and PermuteMMO for shiny Pokémon.",
      slug: "/sysbot-lpa-mmo/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Legends Arceus/MMO.mdx",
      translations: null,
      guideGroupId: "en:/sysbot-lpa-mmo/:Legends Arceus",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Legends Arceus/MMO.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Legends Arceus/MMO.mdx?raw");
      return file.default;
    }),
  },
  "/transporter-dream-radar/": {
    meta: {
      id: "/transporter-dream-radar/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/transporter-dream-radar/",
      isNew: false,
      title: "Pokemon Transporter and Dream Radar",
      navDrawerTitle: "Pokemon Transporter and Dream Radar",
      description: "Pokemon Transporter and Dream Radar Resources",
      slug: "/transporter-dream-radar/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/transporter-dream-radar/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/transporter-patches/": {
    meta: {
      id: "/transporter-patches/",
      categories: ["Transporter and Dream Radar"],
      section: "patch",
      guideVariants: null,
      guideKey: "/transporter-patches/",
      isNew: false,
      title: "Pokemon Transporter Offline & Save Patches",
      navDrawerTitle: "Transporter Patches",
      description:
        "Learn how to patch Pokémon Transporter to work offline and load emulator or TWiLightMenu saves from the SD card.",
      slug: "/transporter-patches/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Transporter Patches.mdx",
      translations: null,
      guideGroupId: "en:/transporter-patches/:Transporter and Dream Radar",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Transporter Patches.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Tools and Emulators/Transporter Patches.mdx?raw"
      );
      return file.default;
    }),
  },
  "/transporter-rng-offline/": {
    meta: {
      id: "/transporter-rng-offline/",
      categories: ["Transporter and Dream Radar"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/transporter-rng-offline/",
      isNew: false,
      title: "Transporter RNG using the Offline Patch",
      navDrawerTitle: "Offline Patch RNG",
      description:
        "Use the offline patch to stabilize delay and make RNG with Pokémon Transporter more consistent.",
      slug: "/transporter-rng-offline/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Transporter/Transporter with Offline Patch.mdx",
      translations: null,
      guideGroupId: "en:/transporter-rng-offline/:Transporter and Dream Radar",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/transporter-rng-offline/" },
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Transporter/Transporter with Offline Patch.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Transporter/Transporter with Offline Patch.mdx?raw"
      );
      return file.default;
    }),
  },
  "/transporter-rng/": {
    meta: {
      id: "/transporter-rng/",
      categories: ["Transporter and Dream Radar"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/transporter-rng/",
      isNew: false,
      title: "Transporter RNG for Gen 1 and 2",
      navDrawerTitle: "Transporter RNG",
      description:
        "Learn how to RNG your Virtual Console Pokémon so they transfer to Gen 7 with perfect 6IVs.",
      slug: "/transporter-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-05-08",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Transporter/Transporter.mdx",
      translations: null,
      guideGroupId: "en:/transporter-rng/:Transporter and Dream Radar",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/transporter-rng/" },
      },
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Transporter/Transporter.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Transporter/Transporter.mdx?raw");
      return file.default;
    }),
  },
  "/ultra-sun-and-ultra-moon/": {
    meta: {
      id: "/ultra-sun-and-ultra-moon/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/ultra-sun-and-ultra-moon/",
      isNew: false,
      title: "Ultra Sun and Ultra Moon",
      navDrawerTitle: "Ultra Sun and Ultra Moon",
      description: "Ultra Sun and Ultra Moon Resources",
      slug: "/ultra-sun-and-ultra-moon/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/ultra-sun-and-ultra-moon/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/wishing-star-jirachi/": {
    meta: {
      id: "/wishing-star-jirachi/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/wishing-star-jirachi/",
      isNew: false,
      title: "Ruby and Sapphire Wishing Star Jirachi RNG",
      navDrawerTitle: "Wishing Star Jirachi RNG",
      description:
        "Learn how to RNG the Wishing Star Jirachi from the Colosseum Bonus Disc in Ruby and Sapphire.",
      slug: "/wishing-star-jirachi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-04-23",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx",
      translations: {
        en: "/wishing-star-jirachi/",
        zh: "/zh-wishing-star-jirachi/",
      },
      guideGroupId: "en:/wishing-star-jirachi/:Ruby and Sapphire",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/wishing-star-jirachi/" },
      },
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx?raw"
      );
      return file.default;
    }),
  },
  "/x-and-y/": {
    meta: {
      id: "/x-and-y/",
      categories: ["Game Hub"],
      section: "challenge",
      guideVariants: null,
      guideKey: "/x-and-y/",
      isNew: false,
      title: "X and Y",
      navDrawerTitle: "X and Y",
      description: "X and Y Resources",
      slug: "/x-and-y/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      guideGroupId: "en:/x-and-y/:Game Hub",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/xdcolo-tidsid-generator/": {
    meta: {
      id: "/xdcolo-tidsid-generator/",
      categories: ["Gamecube"],
      section: "tool",
      guideVariants: null,
      guideKey: "/xdcolo-tidsid-generator/",
      isNew: false,
      title: "TID and SID Generator",
      navDrawerTitle: "TID and SID Generator",
      description: "Generator for TID and SID in XD and Colo",
      slug: "/xdcolo-tidsid-generator/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      guideGroupId: "en:/xdcolo-tidsid-generator/:Gamecube",
      guideVariantLinks: null,
      displayAttributes: ["web_tool", "rough_draft"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx?raw"
      );
      return file.default;
    }),
  },
  "/xy-friend-safari-patch/": {
    meta: {
      id: "/xy-friend-safari-patch/",
      categories: ["X and Y"],
      section: "patch",
      guideVariants: null,
      guideKey: "/xy-friend-safari-patch/",
      isNew: false,
      title: "XY All Friend Safaris Patch",
      navDrawerTitle: "All Friend Safaris Patch",
      description:
        "How to use a game patch to unlock all Friend Safari Pokemon in Pokemon X and Y, including Ditto and Vivillon.",
      slug: "/xy-friend-safari-patch/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/Friend Safari Patch.mdx",
      translations: {
        en: "/xy-friend-safari-patch/",
        zh: "/zh-xy-friend-safari-patch/",
      },
      guideGroupId: "en:/xy-friend-safari-patch/:X and Y",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 6/Friend Safari Patch.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 6/Friend Safari Patch.mdx?raw"
      );
      return file.default;
    }),
  },
  "/xy-pokeradar/": {
    meta: {
      id: "/xy-pokeradar/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/xy-pokeradar/",
      isNew: false,
      title: "X and Y PokeRadar RNG",
      navDrawerTitle: "PokeRadar RNG",
      description:
        "Learn how to RNG using the PokéRadar in X and Y for shiny Pokémon.",
      slug: "/xy-pokeradar/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: false,
      addedOn: "2025-03-24",
      translation: null,
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-25",
      type: "baseGuide",
      file: "guides/Gen 6/PokeRadar.mdx",
      translations: { en: "/xy-pokeradar/", zh: "/zh-xy-pokeradar/" },
      guideGroupId: "en:/xy-pokeradar/:X and Y",
      guideVariantLinks: {
        retail: null,
        cfwEmu: { type: "slug", slug: "/xy-pokeradar/" },
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/PokeRadar.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 6/PokeRadar.mdx?raw");
      return file.default;
    }),
  },
  "/zh-3ds-alt-settings/": {
    meta: {
      id: "/3ds-alt-settings/",
      categories: ["HeartGold and SoulSilver", "Diamond, Pearl, and Platinum"],
      section: "tool",
      guideVariants: null,
      guideKey: "/3ds-alt-settings/",
      isNew: false,
      title: "3DS Alt Settings - 适用于乱数的 3DS 设置应用",
      navDrawerTitle: "3DS Alt Settings - 适用于乱数的 3DS 设置应用",
      description:
        "无需重启即可设置 3DS 系统时间 - 这对于更快速、更稳定地进行宝可梦乱数尝试很有用。",
      slug: "/zh-3ds-alt-settings/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-07-03",
      translation: { enSlug: "/3ds-alt-settings/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/3DS Alt Settings.mdx",
      translations: { en: "/3ds-alt-settings/", zh: "/zh-3ds-alt-settings/" },
      guideGroupId:
        "zh:/3ds-alt-settings/:Diamond, Pearl, and Platinum|HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/3DS Alt Settings.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/3DS Alt Settings.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-3ds-helper/": {
    meta: {
      id: "/3ds-helper/",
      categories: [
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/3ds-helper/",
      isNew: false,
      title: "3DS Timer Helper",
      navDrawerTitle: "3DS Timer Helper",
      description:
        "Easier 3DS RNG without homebrew using precise timer starts.",
      slug: "/zh-3ds-helper/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-07-03",
      translation: { enSlug: "/3ds-helper/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/3DS Helper.mdx",
      translations: { en: "/3ds-helper/", zh: "/zh-3ds-helper/" },
      guideGroupId:
        "zh:/3ds-helper/:Black 2 and White 2|Black and White|Diamond, Pearl, and Platinum|HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/3DS Helper.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/3DS Helper.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-bw2-egg/": {
    meta: {
      id: "/bw2-egg/",
      categories: ["Black 2 and White 2"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "egg",
      isNew: false,
      title: "黑白2孵蛋乱数",
      navDrawerTitle: "黑白2孵蛋乱数",
      description:
        "学习如何在黑白2的培育屋中进行孵蛋乱数，获取异色高个体宝可梦",
      slug: "/zh-bw2-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/bw2-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/BW2 Egg.mdx",
      translations: { en: "/bw2-egg/", zh: "/zh-bw2-egg/" },
      guideGroupId: "zh:egg:Black 2 and White 2",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 5/BW2 Egg.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/BW2 Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-channel-jirachi/": {
    meta: {
      id: "/channel-jirachi/",
      categories: ["Gamecube"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/channel-jirachi/",
      isNew: false,
      title: "(PAL) Channel 乱数",
      navDrawerTitle: "(PAL) Channel 乱数",
      description: "一步步教你乱数出 Channel 基拉祈",
      slug: "/zh-channel-jirachi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/channel-jirachi/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gamecube/Channel.mdx",
      translations: { en: "/channel-jirachi/", zh: "/zh-channel-jirachi/" },
      guideGroupId: "zh:/channel-jirachi/:Gamecube",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gamecube/Channel.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gamecube/Channel.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-connect-dolphin-to-gba/": {
    meta: {
      id: "/connect-dolphin-to-gba/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/connect-dolphin-to-gba/",
      isNew: false,
      title: "使 Dolphin 与 mGBA 联动",
      navDrawerTitle: "使 Dolphin 与 mGBA 联动",
      description: "学习如何领取基拉祈，或将你的乱数宝可梦传输至 GBA 游戏。",
      slug: "/zh-connect-dolphin-to-gba/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/connect-dolphin-to-gba/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/Connect Dolphin To GBA.mdx",
      translations: {
        en: "/connect-dolphin-to-gba/",
        zh: "/zh-connect-dolphin-to-gba/",
      },
      guideGroupId:
        "zh:/connect-dolphin-to-gba/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Tools and Emulators/Connect Dolphin To GBA.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Tools and Emulators/Connect Dolphin To GBA.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-delete-pokemon-save/": {
    meta: {
      id: "/delete-pokemon-save/",
      categories: [
        "Ruby and Sapphire",
        "FireRed and LeafGreen",
        "Emerald",
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
        "Sword and Shield",
        "Brilliant Diamond and Shining Pearl",
        "Legends Arceus",
      ],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/delete-pokemon-save/",
      isNew: false,
      title: "如何删除宝可梦存档文件",
      navDrawerTitle: "如何删除宝可梦存档文件",
      description: "如何删除宝可梦存档文件以重新开始游戏",
      slug: "/zh-delete-pokemon-save/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/delete-pokemon-save/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-10",
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/Delete Save.mdx",
      translations: {
        en: "/delete-pokemon-save/",
        es: "/es-delete-pokemon-save/",
        zh: "/zh-delete-pokemon-save/",
      },
      guideGroupId:
        "zh:/delete-pokemon-save/:Black 2 and White 2|Black and White|Brilliant Diamond and Shining Pearl|Diamond, Pearl, and Platinum|Emerald|FireRed and LeafGreen|HeartGold and SoulSilver|Legends Arceus|Omega Ruby and Alpha Sapphire|Ruby and Sapphire|Sun and Moon|Sword and Shield|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Tools and Emulators/Delete Save.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Tools and Emulators/Delete Save.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-desmume-setup/": {
    meta: {
      id: "/desmume-setup/",
      categories: [
        "Diamond, Pearl, and Platinum",
        "HeartGold and SoulSilver",
        "Black and White",
        "Black 2 and White 2",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/desmume-setup/",
      isNew: false,
      title: "设置 Desmume",
      navDrawerTitle: "设置 Desmume",
      description:
        "学习如何设置用于乱数操作的 DeSmuME，包括游戏卡带提取、存档导出以及 Lua 脚本的使用。",
      slug: "/zh-desmume-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/desmume-setup/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/Desmume Setup.mdx",
      translations: { en: "/desmume-setup/", zh: "/zh-desmume-setup/" },
      guideGroupId:
        "zh:/desmume-setup/:Black 2 and White 2|Black and White|Diamond, Pearl, and Platinum|HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Tools and Emulators/Desmume Setup.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Tools and Emulators/Desmume Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-3ds-rng/": {
    meta: {
      id: "/dppt-3ds-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/dppt-3ds-rng/",
      isNew: false,
      title: "珍钻白金3DS乱数",
      navDrawerTitle: "珍钻白金3DS乱数",
      description: "学习如何通过乱数在珍钻白金获得异色、高个体宝可梦",
      slug: "/zh-dppt-3ds-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-07-03",
      translation: { enSlug: "/dppt-3ds-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/3DS RNG.mdx",
      translations: { en: "/dppt-3ds-rng/", zh: "/zh-dppt-3ds-rng/" },
      guideGroupId: "zh:/dppt-3ds-rng/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/3DS RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/3DS RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-advance-rng/": {
    meta: {
      id: "/dppt-advance-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/dppt-advance-rng/",
      isNew: false,
      title: "乱数的帧数推进方法",
      navDrawerTitle: "乱数的帧数推进方法",
      description: "推进乱数帧数的不同方法及影响帧数的事件机制",
      slug: "/zh-dppt-advance-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-advance-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
      translations: {
        en: "/dppt-advance-rng/",
        es: "/es-dppt-advance-rng/",
        zh: "/zh-dppt-advance-rng/",
      },
      guideGroupId: "zh:/dppt-advance-rng/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-cute-charm/": {
    meta: {
      id: "/dppt-cute-charm/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/dppt-cute-charm/",
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-dppt-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: { en: "/dppt-cute-charm/", zh: "/zh-dppt-cute-charm/" },
      guideGroupId: "zh:/dppt-cute-charm/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Cute Charm.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Cute Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-initial-seed-retail/": {
    meta: {
      id: "/dppt-initial-seed-retail/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "dppt-init-seed",
      isNew: false,
      title: "钻石珍珠白金 实机初始种子乱数",
      navDrawerTitle: "钻石珍珠白金 实机初始种子乱数",
      description: "学习如何在实机上对钻石、珍珠与白金的初始种子进行乱数。",
      slug: "/zh-dppt-initial-seed-retail/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/dppt-initial-seed-retail/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Retail Initial Seed.mdx",
      translations: {
        en: "/dppt-initial-seed-retail/",
        zh: "/zh-dppt-initial-seed-retail/",
      },
      guideGroupId: "zh:dppt-init-seed:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Retail Initial Seed.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Retail Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-initial-seed/": {
    meta: {
      id: "/dppt-initial-seed/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "dppt-init-seed",
      isNew: false,
      title: "初始种子乱数",
      navDrawerTitle: "初始种子乱数",
      description: "如何在《钻石, 珍珠, 白金》中进行初始种子乱数",
      slug: "/zh-dppt-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-initial-seed/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx",
      translations: { en: "/dppt-initial-seed/", zh: "/zh-dppt-initial-seed/" },
      guideGroupId: "zh:dppt-init-seed:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-pokeradar-rng/": {
    meta: {
      id: "/dppt-pokeradar-rng/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "pokeradar",
      isNew: false,
      title: "宝可追踪乱数",
      navDrawerTitle: "宝可追踪乱数",
      description: "两种不同的宝可追踪乱数方法",
      slug: "/zh-dppt-pokeradar-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-pokeradar-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-22",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx",
      translations: {
        en: "/dppt-pokeradar-rng/",
        zh: "/zh-dppt-pokeradar-rng/",
      },
      guideGroupId: "zh:pokeradar:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-tid-sid/": {
    meta: {
      id: "/dppt-tid-sid/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "tid-sid",
      isNew: false,
      title: "珍钻白金迷人之躯漏洞TID/SID乱数",
      navDrawerTitle: "珍钻白金迷人之躯漏洞TID/SID乱数",
      description: "学习如何在珍钻中通过乱数获得迷人之躯漏洞的TID/SID组合",
      slug: "/zh-dppt-tid-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-06-08",
      translation: { enSlug: "/dppt-tid-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Retail TID.mdx",
      translations: { en: "/dppt-tid-sid/", zh: "/zh-dppt-tid-sid/" },
      guideGroupId: "zh:tid-sid:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Retail TID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Retail TID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-dppt-wild/": {
    meta: {
      id: "/dppt-wild/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "wild",
      isNew: false,
      title: "野生乱数",
      navDrawerTitle: "野生乱数",
      description: "野生乱数",
      slug: "/zh-dppt-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx",
      translations: { en: "/dppt-wild/", zh: "/zh-dppt-wild/" },
      guideGroupId: "zh:wild:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-e-tips-rng/": {
    meta: {
      id: "/e-tips-rng/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/e-tips-rng/",
      isNew: false,
      title: "乱数介绍",
      navDrawerTitle: "乱数介绍",
      description: "如何推进乱数以及提高稳定性的技巧",
      slug: "/zh-e-tips-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/e-tips-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Basic Rules of RNG.mdx",
      translations: {
        de: "/de-e-tips-rng/",
        en: "/e-tips-rng/",
        it: "/it-e-tips-rng/",
        zh: "/zh-e-tips-rng/",
      },
      guideGroupId: "zh:/e-tips-rng/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Emerald/Basic Rules of RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Basic Rules of RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emerald-mirage-island/": {
    meta: {
      id: "/emerald-mirage-island/",
      categories: ["Emerald"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "/emerald-mirage-island/",
      isNew: false,
      title: "幻之岛",
      navDrawerTitle: "幻之岛",
      description: "通过捕捉具有特定 PID 的宝可梦以进入幻之岛",
      slug: "/zh-emerald-mirage-island/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-11",
      translation: { enSlug: "/emerald-mirage-island/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        de: "/de-emerald-mirage-island/",
        en: "/emerald-mirage-island/",
        zh: "/zh-emerald-mirage-island/",
      },
      guideGroupId: "zh:/emerald-mirage-island/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emerald-painting-rng/": {
    meta: {
      id: "/emerald-painting-rng/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emerald-painting-rng/",
      isNew: false,
      title: "利用绘画重置种子",
      navDrawerTitle: "利用绘画重置种子",
      description: "利用绘画重置乱数，从而快速获得目标宝可梦，而无需长时间等待",
      slug: "/zh-emerald-painting-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emerald-painting-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Reseed RNG.mdx",
      translations: {
        de: "/de-emerald-painting-rng/",
        en: "/emerald-painting-rng/",
        zh: "/zh-emerald-painting-rng/",
      },
      guideGroupId: "zh:/emerald-painting-rng/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Reseed RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Reseed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emerald-pokerus-emu/": {
    meta: {
      id: "/emerald-pokerus-emu/",
      categories: ["Emerald"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emerald-pokerus-emu/",
      isNew: false,
      title: "绿宝石的宝可病毒",
      navDrawerTitle: "绿宝石的宝可病毒",
      description: "如何感染宝可病毒",
      slug: "/zh-emerald-pokerus-emu/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-09",
      translation: { enSlug: "/emerald-pokerus-emu/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        de: "/de-emerald-pokerus-emu/",
        en: "/emerald-pokerus-emu/",
        zh: "/zh-emerald-pokerus-emu/",
      },
      guideGroupId: "zh:/emerald-pokerus-emu/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emerald-shiny-starter/": {
    meta: {
      id: "/emerald-shiny-starter/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/emerald-shiny-starter/",
      isNew: false,
      title: "异色御三家",
      navDrawerTitle: "异色御三家",
      description: "通过捕捉异色御三家确定你的 SID",
      slug: "/zh-emerald-shiny-starter/",
      isRoughDraft: false,
      orderPriority: 0,
      hideFromNavDrawer: true,
      addedOn: "2025-05-03",
      translation: { enSlug: "/emerald-shiny-starter/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Shiny Starter.mdx",
      translations: {
        de: "/de-emerald-shiny-starter/",
        en: "/emerald-shiny-starter/",
        zh: "/zh-emerald-shiny-starter/",
      },
      guideGroupId: "zh:/emerald-shiny-starter/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 3/Emerald/Shiny Starter.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Shiny Starter.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emerald-sid-feebas/": {
    meta: {
      id: "/emerald-sid-feebas/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/emerald-sid-feebas/",
      isNew: false,
      title: "使用丑丑鱼查找 SID",
      navDrawerTitle: "使用丑丑鱼查找 SID",
      description: "如何在《绿宝石》中利用丑丑鱼查找你的里ID (SID)。",
      slug: "/zh-emerald-sid-feebas/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/emerald-sid-feebas/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        de: "/de-emerald-sid-feebas/",
        en: "/emerald-sid-feebas/",
        zh: "/zh-emerald-sid-feebas/",
      },
      guideGroupId: "zh:/emerald-sid-feebas/:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-b2w2-dream-radar/": {
    meta: {
      id: "/emulator-b2w2-dream-radar/",
      categories: ["Black 2 and White 2", "Transporter and Dream Radar"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-b2w2-dream-radar/",
      isNew: false,
      title: "第五世代AR搜寻器乱数",
      navDrawerTitle: "第五世代AR搜寻器乱数",
      description: "乱数获取等级5梦境球隐藏特性的传说宝可梦",
      slug: "/zh-emulator-b2w2-dream-radar/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-b2w2-dream-radar/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Dream Radar.mdx",
      translations: {
        en: "/emulator-b2w2-dream-radar/",
        zh: "/zh-emulator-b2w2-dream-radar/",
      },
      guideGroupId:
        "zh:/emulator-b2w2-dream-radar/:Black 2 and White 2|Transporter and Dream Radar",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 5/Dream Radar.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/Dream Radar.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-b2w2-runasdate-inital-seed/": {
    meta: {
      id: "/emulator-b2w2-runasdate-inital-seed/",
      categories: ["Black 2 and White 2"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-b2w2-runasdate-inital-seed/",
      isNew: false,
      title: "黑白2初始seed乱数",
      navDrawerTitle: "黑白2初始seed乱数",
      description: "学习如何在黑白2中乱数你的初始seed",
      slug: "/zh-emulator-b2w2-runasdate-inital-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-b2w2-runasdate-inital-seed/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-b2w2-runasdate-inital-seed/",
        it: "/it-emulator-b2w2-runasdate-inital-seed/",
        zh: "/zh-emulator-b2w2-runasdate-inital-seed/",
      },
      guideGroupId:
        "zh:/emulator-b2w2-runasdate-inital-seed/:Black 2 and White 2",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-bw-entralink/": {
    meta: {
      id: "/emulator-bw-entralink/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-entralink/",
      isNew: false,
      title: "连入之森乱数",
      navDrawerTitle: "连入之森乱数",
      description: "如何使用连入乱数获取心仪的宝可梦",
      slug: "/zh-emulator-bw-entralink/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-bw-entralink/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Entralink.mdx",
      translations: {
        en: "/emulator-bw-entralink/",
        zh: "/zh-emulator-bw-entralink/",
      },
      guideGroupId: "zh:/emulator-bw-entralink/:Black and White",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 5/Entralink.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/Entralink.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-bw-find-ds-parameters/": {
    meta: {
      id: "/emulator-bw-find-ds-parameters/",
      categories: ["Black and White"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-find-ds-parameters/",
      isNew: false,
      title: "如何在第五世代中寻找 DS 参数",
      navDrawerTitle: "如何在第五世代中寻找 DS 参数",
      description: "获取你的 DS 参数以进行第五世代乱数。",
      slug: "/zh-emulator-bw-find-ds-parameters/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-bw-find-ds-parameters/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Find DS Parameters.mdx",
      translations: {
        en: "/emulator-bw-find-ds-parameters/",
        zh: "/zh-emulator-bw-find-ds-parameters/",
      },
      guideGroupId: "zh:/emulator-bw-find-ds-parameters/:Black and White",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 5/Find DS Parameters.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/Find DS Parameters.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-bw-roamers/": {
    meta: {
      id: "/emulator-bw-roamers/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-roamers/",
      isNew: false,
      title: "第五世代游走宝可梦乱数",
      navDrawerTitle: "第五世代游走宝可梦乱数",
      description: "在模拟器中对第五世代的游走宝可梦进行乱数",
      slug: "/zh-emulator-bw-roamers/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-bw-roamers/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Roamers.mdx",
      translations: {
        en: "/emulator-bw-roamers/",
        zh: "/zh-emulator-bw-roamers/",
      },
      guideGroupId: "zh:/emulator-bw-roamers/:Black and White",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 5/Roamers.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/Roamers.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-bw-runasdate-initial-seed/": {
    meta: {
      id: "/emulator-bw-runasdate-initial-seed/",
      categories: ["Black and White"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-runasdate-initial-seed/",
      isNew: false,
      title: "黑白初始seed乱数",
      navDrawerTitle: "黑白初始seed乱数",
      description: "学习如何在黑白中乱你的初始seed",
      slug: "/zh-emulator-bw-runasdate-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-bw-runasdate-initial-seed/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-bw-runasdate-initial-seed/",
        it: "/it-emulator-bw-runasdate-initial-seed/",
        zh: "/zh-emulator-bw-runasdate-initial-seed/",
      },
      guideGroupId: "zh:/emulator-bw-runasdate-initial-seed/:Black and White",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-bw-white-forest/": {
    meta: {
      id: "/emulator-bw-white-forest/",
      categories: ["Black and White"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-bw-white-forest/",
      isNew: false,
      title: "白森林乱数",
      navDrawerTitle: "白森林乱数",
      description: "白森林乱数",
      slug: "/zh-emulator-bw-white-forest/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-bw-white-forest/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/White Forest RNG (Emu).mdx",
      translations: {
        en: "/emulator-bw-white-forest/",
        zh: "/zh-emulator-bw-white-forest/",
      },
      guideGroupId: "zh:/emulator-bw-white-forest/:Black and White",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 5/White Forest RNG (Emu).mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 5/White Forest RNG (Emu).mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-dppt-cute-charm/": {
    meta: {
      id: "/emulator-dppt-cute-charm/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/emulator-dppt-cute-charm/",
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-emulator-dppt-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-dppt-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-dppt-cute-charm/",
        zh: "/zh-emulator-dppt-cute-charm/",
      },
      guideGroupId:
        "zh:/emulator-dppt-cute-charm/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Cute Charm.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Cute Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-dppt-egg/": {
    meta: {
      id: "/emulator-dppt-egg/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-dppt-egg/",
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "如何在育婴屋进行乱数孵化",
      slug: "/zh-emulator-dppt-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-dppt-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx",
      translations: { en: "/emulator-dppt-egg/", zh: "/zh-emulator-dppt-egg/" },
      guideGroupId: "zh:/emulator-dppt-egg/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-dppt-stationary/": {
    meta: {
      id: "/emulator-dppt-stationary/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-dppt-stationary/",
      isNew: false,
      title: "定点乱数",
      navDrawerTitle: "定点乱数",
      description: "如何在钻石珍珠和白金中对固定遇敌的宝可梦进行乱数",
      slug: "/zh-emulator-dppt-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-dppt-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx",
      translations: {
        en: "/emulator-dppt-stationary/",
        zh: "/zh-emulator-dppt-stationary/",
      },
      guideGroupId:
        "zh:/emulator-dppt-stationary/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-dppt-tid-sid/": {
    meta: {
      id: "/emulator-dppt-tid-sid/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "tid-sid",
      isNew: false,
      title: "钻石、珍珠与白金版 TID/SID 乱数",
      navDrawerTitle: "钻石、珍珠与白金版 TID/SID 乱数",
      description:
        "了解如何在钻石、珍珠和白金版中通过模拟器获得你想要的训练家 ID（TID）与里 ID（SID）组合",
      slug: "/zh-emulator-dppt-tid-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-dppt-tid-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx",
      translations: {
        en: "/emulator-dppt-tid-sid/",
        zh: "/zh-emulator-dppt-tid-sid/",
      },
      guideGroupId: "zh:tid-sid:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-emerald-egg/": {
    meta: {
      id: "/emulator-emerald-egg/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "emer-egg",
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "通过培育屋进行乱数孵蛋",
      slug: "/zh-emulator-emerald-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-09",
      translation: { enSlug: "/emulator-emerald-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Egg RNG.mdx",
      translations: {
        de: "/de-emulator-emerald-egg/",
        en: "/emulator-emerald-egg/",
        it: "/it-emulator-emerald-egg/",
        zh: "/zh-emulator-emerald-egg/",
      },
      guideGroupId: "zh:emer-egg:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Egg RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Egg RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-flrg-stationary-and-gift/": {
    meta: {
      id: "/emulator-flrg-stationary-and-gift/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-flrg-stationary-and-gift/",
      isNew: false,
      title: "固定宝可梦乱数",
      navDrawerTitle: "固定宝可梦乱数",
      description: "在《火红·叶绿》中获取闪光六项个体值的传说宝可梦",
      slug: "/zh-emulator-flrg-stationary-and-gift/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-flrg-stationary-and-gift/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Static RNG.mdx",
      translations: {
        en: "/emulator-flrg-stationary-and-gift/",
        zh: "/zh-emulator-flrg-stationary-and-gift/",
      },
      guideGroupId:
        "zh:/emulator-flrg-stationary-and-gift/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Static RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Static RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-frlg-egg/": {
    meta: {
      id: "/emulator-frlg-egg/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-frlg-egg/",
      isNew: false,
      title: "火红叶绿孵化乱数",
      navDrawerTitle: "Egg RNG",
      description: "在火红/叶绿中进行蛋的乱数",
      slug: "/zh-emulator-frlg-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-frlg-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Egg RNG.mdx",
      translations: { en: "/emulator-frlg-egg/", zh: "/zh-emulator-frlg-egg/" },
      guideGroupId: "zh:/emulator-frlg-egg/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Egg RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Egg RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-frlg-wild/": {
    meta: {
      id: "/emulator-frlg-wild/",
      categories: ["FireRed and LeafGreen"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-frlg-wild/",
      isNew: false,
      title: "火红叶绿野生乱数",
      navDrawerTitle: "Wild RNG",
      description: "在《火红·叶绿》中使用甜甜香气进行野生宝可梦的乱数",
      slug: "/zh-emulator-frlg-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-frlg-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Wild RNG.mdx",
      translations: {
        en: "/emulator-frlg-wild/",
        zh: "/zh-emulator-frlg-wild/",
      },
      guideGroupId: "zh:/emulator-frlg-wild/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Wild RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-hgss-cute-charm/": {
    meta: {
      id: "/emulator-hgss-cute-charm/",
      categories: ["HeartGold and SoulSilver"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/emulator-hgss-cute-charm/",
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-emulator-hgss-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-hgss-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-hgss-cute-charm/",
        zh: "/zh-emulator-hgss-cute-charm/",
      },
      guideGroupId: "zh:/emulator-hgss-cute-charm/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Cute Charm.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Cute Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-hgss-egg/": {
    meta: {
      id: "/emulator-hgss-egg/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-egg/",
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "如何在培育屋进行孵化乱数",
      slug: "/zh-emulator-hgss-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-hgss-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Egg.mdx",
      translations: {
        en: "/emulator-hgss-egg/",
        it: "/it-emulator-hgss-egg/",
        zh: "/zh-emulator-hgss-egg/",
      },
      guideGroupId: "zh:/emulator-hgss-egg/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Egg.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-hgss-stationary/": {
    meta: {
      id: "/emulator-hgss-stationary/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-hgss-stationary/",
      isNew: false,
      title: "定点乱数",
      navDrawerTitle: "定点乱数",
      description: "定点宝可梦的乱数",
      slug: "/zh-emulator-hgss-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-hgss-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx",
      translations: {
        en: "/emulator-hgss-stationary/",
        zh: "/zh-emulator-hgss-stationary/",
      },
      guideGroupId: "zh:/emulator-hgss-stationary/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-oras-dexnav/": {
    meta: {
      id: "/emulator-oras-dexnav/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-oras-dexnav/",
      isNew: false,
      title: "欧米伽红宝石与阿尔法蓝宝石 DexNav 乱数",
      navDrawerTitle: "欧米伽红宝石与阿尔法蓝宝石 DexNav 乱数",
      description:
        "学习如何在《欧米伽红宝石 / 阿尔法蓝宝石》中利用 DexNav 功能进行宝可梦乱数。",
      slug: "/zh-emulator-oras-dexnav/",
      isRoughDraft: true,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-oras-dexnav/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/DexNav.mdx",
      translations: {
        en: "/emulator-oras-dexnav/",
        zh: "/zh-emulator-oras-dexnav/",
      },
      guideGroupId: "zh:/emulator-oras-dexnav/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 6/DexNav.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/DexNav.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-rs-egg/": {
    meta: {
      id: "/emulator-rs-egg/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-egg/",
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "从培育屋乱数孵化宝可梦蛋",
      slug: "/zh-emulator-rs-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-rs-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Egg RNG.mdx",
      translations: { en: "/emulator-rs-egg/", zh: "/zh-emulator-rs-egg/" },
      guideGroupId: "zh:/emulator-rs-egg/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Egg RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Egg RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-rs-stationary/": {
    meta: {
      id: "/emulator-rs-stationary/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-stationary/",
      isNew: false,
      title: "有电电池定点乱数",
      navDrawerTitle: "有电电池定点乱数",
      description: "在红宝石和蓝宝石中轻松乱数完美异色传说宝可梦",
      slug: "/zh-emulator-rs-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-rs-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx",
      translations: {
        en: "/emulator-rs-stationary/",
        zh: "/zh-emulator-rs-stationary/",
      },
      guideGroupId: "zh:/emulator-rs-stationary/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-rs-wishmaker/": {
    meta: {
      id: "/emulator-rs-wishmaker/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-rs-wishmaker/",
      isNew: false,
      title: "红蓝宝石 许愿星基拉祈（Wishmaker）乱数教程",
      navDrawerTitle: "红蓝宝石 许愿星基拉祈（Wishmaker）乱数教程",
      description:
        "学习如何在红宝石与蓝宝石中，通过圆形竞技场乱数出异色的许愿星基拉祈。",
      slug: "/zh-emulator-rs-wishmaker/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-18",
      translation: { enSlug: "/emulator-rs-wishmaker/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: {
        en: "/emulator-rs-wishmaker/",
        zh: "/zh-emulator-rs-wishmaker/",
      },
      guideGroupId: "zh:/emulator-rs-wishmaker/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-sm-time-finder/": {
    meta: {
      id: "/emulator-sm-time-finder/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-sm-time-finder/",
      isNew: false,
      title: "日月 模拟器初始种子时间查找器（Citra）",
      navDrawerTitle: "日月 模拟器初始种子时间查找器（Citra）",
      description: "通过时间查找特定初始乱数种子的方法。",
      slug: "/zh-emulator-sm-time-finder/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-sm-time-finder/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Time Finder.js (Citra).mdx",
      translations: {
        en: "/emulator-sm-time-finder/",
        zh: "/zh-emulator-sm-time-finder/",
      },
      guideGroupId: "zh:/emulator-sm-time-finder/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 7/Time Finder.js (Citra).mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Time Finder.js (Citra).mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-emulator-usum-time-finder/": {
    meta: {
      id: "/emulator-usum-time-finder/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/emulator-usum-time-finder/",
      isNew: false,
      title: "究极日月 模拟器初始种子时间查找器（Citra）",
      navDrawerTitle: "究极日月 模拟器初始种子时间查找器（Citra）",
      description: "通过时间查找特定初始乱数种子的方法。",
      slug: "/zh-emulator-usum-time-finder/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-usum-time-finder/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Time Finder.js (Citra).mdx",
      translations: {
        en: "/emulator-usum-time-finder/",
        zh: "/zh-emulator-usum-time-finder/",
      },
      guideGroupId: "zh:/emulator-usum-time-finder/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 7/Time Finder.js (Citra).mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Time Finder.js (Citra).mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-frlg-gen3-sid/": {
    meta: {
      id: "/frlg-gen3-sid/",
      categories: ["FireRed and LeafGreen"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/frlg-gen3-sid/",
      isNew: false,
      title: "查找第三世代 SID",
      navDrawerTitle: "查找第三世代 SID",
      description: "多种方法查找第三世代的SID",
      slug: "/zh-frlg-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/frlg-gen3-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-frlg-gen3-sid/",
        en: "/frlg-gen3-sid/",
        it: "/it-frlg-gen3-sid/",
        zh: "/zh-frlg-gen3-sid/",
      },
      guideGroupId: "zh:/frlg-gen3-sid/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-frlg-seeding-bot/": {
    meta: {
      id: "/frlg-seeding-bot/",
      categories: ["FireRed and LeafGreen"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/frlg-seeding-bot/",
      isNew: false,
      title: "初始种子自动刷取",
      navDrawerTitle: "初始种子自动刷取",
      description: "使用初始种子自动脚本，实现更高自由度的乱数控制",
      slug: "/zh-frlg-seeding-bot/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/frlg-seeding-bot/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx",
      translations: { en: "/frlg-seeding-bot/", zh: "/zh-frlg-seeding-bot/" },
      guideGroupId: "zh:/frlg-seeding-bot/:FireRed and LeafGreen",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gba-methods-lead-impact/": {
    meta: {
      id: "/gba-methods-lead-impact/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-methods-lead-impact/",
      isNew: false,
      title: "《绿宝石》野生生成方式中的队首影响",
      navDrawerTitle: "《绿宝石》野生生成方式中的队首影响",
      description: "解释为何队首影响会触发不同类型的野生生成方式",
      slug: "/zh-gba-methods-lead-impact/",
      isRoughDraft: false,
      orderPriority: 2,
      hideFromNavDrawer: true,
      addedOn: "2025-06-18",
      translation: { enSlug: "/gba-methods-lead-impact/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-18",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/GBA Methods Part2.mdx",
      translations: {
        es: "/es-gba-methods-lead-impact/",
        en: "/gba-methods-lead-impact/",
        zh: "/zh-gba-methods-lead-impact/",
      },
      guideGroupId:
        "zh:/gba-methods-lead-impact/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Emerald/GBA Methods Part2.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/GBA Methods Part2.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gba-methods/": {
    meta: {
      id: "/gba-methods/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-methods/",
      isNew: false,
      title: "绿宝石中的方式 1-4",
      navDrawerTitle: "绿宝石中的方式 1-4",
      description:
        "什么是方式、为什么会存在方式 1-4，以及它们如何影响宝可梦的生成。",
      slug: "/zh-gba-methods/",
      isRoughDraft: false,
      orderPriority: 1,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/gba-methods/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/GBA Methods.mdx",
      translations: {
        es: "/es-gba-methods/",
        en: "/gba-methods/",
        zh: "/zh-gba-methods/",
      },
      guideGroupId:
        "zh:/gba-methods/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/GBA Methods.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/GBA Methods.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gba-overview/": {
    meta: {
      id: "/gba-overview/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "getting_started",
      guideVariants: null,
      guideKey: "/gba-overview/",
      isNew: false,
      title: "GBA概述",
      navDrawerTitle: "GBA概述",
      description: "GBA游戏的特性、关键乱数概念与版本差异",
      slug: "/zh-gba-overview/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/gba-overview/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-10",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/GBA Overview.mdx",
      translations: {
        de: "/de-gba-overview/",
        en: "/gba-overview/",
        zh: "/zh-gba-overview/",
      },
      guideGroupId:
        "zh:/gba-overview/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 3/Emerald/GBA Overview.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/GBA Overview.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gba-pokerus-technical/": {
    meta: {
      id: "/gba-pokerus-technical/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-pokerus-technical/",
      isNew: false,
      title: "宝可病毒",
      navDrawerTitle: "宝可病毒",
      description: "宝可病毒的触发机制",
      slug: "/zh-gba-pokerus-technical/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-13",
      translation: { enSlug: "/gba-pokerus-technical/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx",
      translations: {
        en: "/gba-pokerus-technical/",
        zh: "/zh-gba-pokerus-technical/",
      },
      guideGroupId:
        "zh:/gba-pokerus-technical/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gba-vblank/": {
    meta: {
      id: "/gba-vblank/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/gba-vblank/",
      isNew: false,
      title: "绿宝石中的垂直空白（VBlank）",
      navDrawerTitle: "绿宝石中的垂直空白（VBlank）",
      description: "什么是 VBlank 以及它在宝可梦生成中的影响。",
      slug: "/zh-gba-vblank/",
      isRoughDraft: false,
      orderPriority: 0,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/gba-vblank/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Vblank.mdx",
      translations: { en: "/gba-vblank/", zh: "/zh-gba-vblank/" },
      guideGroupId:
        "zh:/gba-vblank/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Vblank.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Vblank.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gc-initial/": {
    meta: {
      id: "/gc-initial/",
      categories: ["Gamecube"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/gc-initial/",
      isNew: false,
      title: "初始种子乱数",
      navDrawerTitle: "初始种子乱数",
      description:
        "如何使用 Dolphin 设置适用于所有 GameCube 游戏的初始种子乱数",
      slug: "/zh-gc-initial/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/gc-initial/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gamecube/Initial Seed RNG.mdx",
      translations: { en: "/gc-initial/", zh: "/zh-gc-initial/" },
      guideGroupId: "zh:/gc-initial/:Gamecube",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gamecube/Initial Seed RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gamecube/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gen2-celebi/": {
    meta: {
      id: "/gen2-celebi/",
      categories: ["Gold, Silver, Crystal"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/gen2-celebi/",
      isNew: false,
      title: "时拉比",
      navDrawerTitle: "时拉比",
      description: "学习如何在《宝可梦 水晶版》中通过乱数操作获得异色时拉比",
      slug: "/zh-gen2-celebi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-02",
      translation: { enSlug: "/gen2-celebi/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 2/Celebi.mdx",
      translations: {
        es: "/es-gen2-celebi/",
        en: "/gen2-celebi/",
        zh: "/zh-gen2-celebi/",
      },
      guideGroupId: "zh:/gen2-celebi/:Gold, Silver, Crystal",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 2/Celebi.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 2/Celebi.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gen2-starters/": {
    meta: {
      id: "/gen2-starters/",
      categories: ["Gold, Silver, Crystal"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/gen2-starters/",
      isNew: false,
      title: "水晶初始宝可梦乱数",
      navDrawerTitle: "水晶初始宝可梦乱数",
      description: "在水晶里获得异色初始宝可梦",
      slug: "/zh-gen2-starters/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/gen2-starters/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 2/Starter.mdx",
      translations: {
        es: "/es-gen2-starters/",
        en: "/gen2-starters/",
        zh: "/zh-gen2-starters/",
      },
      guideGroupId: "zh:/gen2-starters/:Gold, Silver, Crystal",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 2/Starter.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 2/Starter.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-gen3-sid/": {
    meta: {
      id: "/gen3-sid/",
      categories: ["Emerald"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/gen3-sid/",
      isNew: false,
      title: "查找第三世代 SID",
      navDrawerTitle: "查找第三世代 SID",
      description: "多种方法查找第三世代的SID",
      slug: "/zh-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/gen3-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-gen3-sid/",
        en: "/gen3-sid/",
        it: "/it-gen3-sid/",
        zh: "/zh-gen3-sid/",
      },
      guideGroupId: "zh:/gen3-sid/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-hgss-3ds-rng/": {
    meta: {
      id: "/hgss-3ds-rng/",
      categories: ["HeartGold and SoulSilver"],
      section: "technical_info",
      guideVariants: null,
      guideKey: "/hgss-3ds-rng/",
      isNew: false,
      title: "心金魂银3DS乱数",
      navDrawerTitle: "心金魂银3DS乱数",
      description: "学习如何通过乱数在心金魂银获得异色、高个体宝可梦",
      slug: "/zh-hgss-3ds-rng/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-07-03",
      translation: { enSlug: "/hgss-3ds-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/3DS RNG.mdx",
      translations: { en: "/hgss-3ds-rng/", zh: "/zh-hgss-3ds-rng/" },
      guideGroupId: "zh:/hgss-3ds-rng/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/3DS RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/3DS RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-hgss-cute-charm/": {
    meta: {
      id: "/hgss-cute-charm/",
      categories: ["HeartGold and SoulSilver"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/hgss-cute-charm/",
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-hgss-cute-charm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/hgss-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: { en: "/hgss-cute-charm/", zh: "/zh-hgss-cute-charm/" },
      guideGroupId: "zh:/hgss-cute-charm/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Cute Charm.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Cute Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-hgss-initial-seed/": {
    meta: {
      id: "/hgss-initial-seed/",
      categories: ["HeartGold and SoulSilver"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/hgss-initial-seed/",
      isNew: false,
      title: "心金魂银初始种子乱数",
      navDrawerTitle: "心金魂银初始种子乱数",
      description: "学习如何在《心金》和《魂银》中进行初始种子乱数。",
      slug: "/zh-hgss-initial-seed/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/hgss-initial-seed/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx",
      translations: {
        en: "/hgss-initial-seed/",
        it: "/it-hgss-initial-seed/",
        zh: "/zh-hgss-initial-seed/",
      },
      guideGroupId: "zh:/hgss-initial-seed/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-hgss-rng-advance/": {
    meta: {
      id: "/hgss-rng-advance/",
      categories: ["HeartGold and SoulSilver"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "advance-rng",
      isNew: false,
      title: "推进乱数",
      navDrawerTitle: "推进乱数",
      description: "乱数推进的方法及影响乱数的机制",
      slug: "/zh-hgss-rng-advance/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/hgss-rng-advance/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx",
      translations: {
        es: "/es-hgss-rng-advance/",
        en: "/hgss-rng-advance/",
        zh: "/zh-hgss-rng-advance/",
      },
      guideGroupId: "zh:advance-rng:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-hgss-tid-sid/": {
    meta: {
      id: "/hgss-tid-sid/",
      categories: ["HeartGold and SoulSilver"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "tid-sid",
      isNew: false,
      title: "心金魂银迷人之躯漏洞TID/SID乱数",
      navDrawerTitle: "心金魂银迷人之躯漏洞TID/SID乱数",
      description: "学习如何在心金魂银中通过乱数获得迷人之躯漏洞的TID/SID组合",
      slug: "/zh-hgss-tid-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-06-08",
      translation: { enSlug: "/hgss-tid-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Retail TID.mdx",
      translations: { en: "/hgss-tid-sid/", zh: "/zh-hgss-tid-sid/" },
      guideGroupId: "zh:tid-sid:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Retail TID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Retail TID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-install-pokereader/": {
    meta: {
      id: "/install-pokereader/",
      categories: [
        "Transporter and Dream Radar",
        "X and Y",
        "Omega Ruby and Alpha Sapphire",
        "Sun and Moon",
        "Ultra Sun and Ultra Moon",
      ],
      section: "tool",
      guideVariants: null,
      guideKey: "/install-pokereader/",
      isNew: false,
      title: "3DS安装PokeReader",
      navDrawerTitle: "3DS安装PokeReader",
      description: "在3DS上安装工具来帮助乱数宝可梦",
      slug: "/zh-install-pokereader/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/install-pokereader/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/3DS PokeReader.mdx",
      translations: {
        es: "/es-install-pokereader/",
        en: "/install-pokereader/",
        it: "/it-install-pokereader/",
        zh: "/zh-install-pokereader/",
      },
      guideGroupId:
        "zh:/install-pokereader/:Omega Ruby and Alpha Sapphire|Sun and Moon|Transporter and Dream Radar|Ultra Sun and Ultra Moon|X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Tools and Emulators/3DS PokeReader.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Tools and Emulators/3DS PokeReader.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-meteor-jirachi/": {
    meta: {
      id: "/meteor-jirachi/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/meteor-jirachi/",
      isNew: false,
      title: "红蓝宝石 流星基拉祈（Meteor）乱数教程",
      navDrawerTitle: "红蓝宝石 流星基拉祈（Meteor）乱数教程",
      description: "学习如何乱数流星基拉祈，其异色判定与许愿星不同。",
      slug: "/zh-meteor-jirachi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-18",
      translation: { enSlug: "/meteor-jirachi/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: { en: "/meteor-jirachi/", zh: "/zh-meteor-jirachi/" },
      guideGroupId: "zh:/meteor-jirachi/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-mgba-setup/": {
    meta: {
      id: "/mgba-setup/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/mgba-setup/",
      isNew: false,
      title: "设置 mGBA",
      navDrawerTitle: "设置 mGBA",
      description:
        "学习如何设置适用于 GBA 宝可梦乱数操作的 mGBA，包括 Lua 脚本支持功能。",
      slug: "/zh-mgba-setup/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/mgba-setup/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/mGBA Setup.mdx",
      translations: { en: "/mgba-setup/", zh: "/zh-mgba-setup/" },
      guideGroupId:
        "zh:/mgba-setup/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Tools and Emulators/mGBA Setup.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Tools and Emulators/mGBA Setup.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-misc-3ds-island-scan-sm/": {
    meta: {
      id: "/misc-3ds-island-scan-sm/",
      categories: ["Sun and Moon"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/misc-3ds-island-scan-sm/",
      isNew: false,
      title: "《太阳／月亮》岛屿扫描宝可梦一览（按星期与地点）",
      navDrawerTitle: "《太阳／月亮》岛屿扫描宝可梦一览（按星期与地点）",
      description:
        "按星期与出现地点整理的《宝可梦 太阳／月亮》岛屿扫描宝可梦列表，方便快速查阅。",
      slug: "/zh-misc-3ds-island-scan-sm/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/misc-3ds-island-scan-sm/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Island Scan Pokemon SM.mdx",
      translations: {
        en: "/misc-3ds-island-scan-sm/",
        zh: "/zh-misc-3ds-island-scan-sm/",
      },
      guideGroupId: "zh:/misc-3ds-island-scan-sm/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 7/Island Scan Pokemon SM.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Island Scan Pokemon SM.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-misc-3ds-island-scan-usum/": {
    meta: {
      id: "/misc-3ds-island-scan-usum/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/misc-3ds-island-scan-usum/",
      isNew: false,
      title: "《究极之日／究极之月》岛屿扫描宝可梦一览（按星期与地点）",
      navDrawerTitle:
        "《究极之日／究极之月》岛屿扫描宝可梦一览（按星期与地点）",
      description:
        "按星期与出现地点整理的《宝可梦 究极之日／究极之月》岛屿扫描宝可梦列表，方便快速查阅。",
      slug: "/zh-misc-3ds-island-scan-usum/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/misc-3ds-island-scan-usum/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Island Scan Pokemon USUM.mdx",
      translations: {
        en: "/misc-3ds-island-scan-usum/",
        zh: "/zh-misc-3ds-island-scan-usum/",
      },
      guideGroupId: "zh:/misc-3ds-island-scan-usum/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Island Scan Pokemon USUM.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Island Scan Pokemon USUM.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-misc-dolphin-gba-bios/": {
    meta: {
      id: "/misc-dolphin-gba-bios/",
      categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
      section: "tool",
      guideVariants: null,
      guideKey: "/misc-dolphin-gba-bios/",
      isNew: false,
      title: "GBA BIOS 文件 - 它是什么以及如何提取给模拟器使用",
      navDrawerTitle: "GBA BIOS 文件 - 它是什么以及如何提取给模拟器使用",
      description:
        "了解什么是GBA BIOS，为什么模拟器（如mGBA、VBA）需要它，以及如何从实机中合法提取它。",
      slug: "/zh-misc-dolphin-gba-bios/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/misc-dolphin-gba-bios/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/How to Extract GBA Bios.mdx",
      translations: {
        en: "/misc-dolphin-gba-bios/",
        zh: "/zh-misc-dolphin-gba-bios/",
      },
      guideGroupId:
        "zh:/misc-dolphin-gba-bios/:Emerald|FireRed and LeafGreen|Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Tools and Emulators/How to Extract GBA Bios.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Tools and Emulators/How to Extract GBA Bios.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-oras-mirage-spots/": {
    meta: {
      id: "/oras-mirage-spots/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/oras-mirage-spots/",
      isNew: false,
      title: "欧米伽红宝石与阿尔法蓝宝石幻之地点乱数",
      navDrawerTitle: "欧米伽红宝石与阿尔法蓝宝石幻之地点乱数",
      description:
        "学习如何在《欧米伽红宝石 / 阿尔法蓝宝石》中乱数指定任意幻之地点，以遭遇稀有宝可梦与异色宝可梦。",
      slug: "/zh-oras-mirage-spots/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-14",
      translation: { enSlug: "/oras-mirage-spots/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Mirage Spot.mdx",
      translations: { en: "/oras-mirage-spots/", zh: "/zh-oras-mirage-spots/" },
      guideGroupId: "zh:/oras-mirage-spots/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 6/Mirage Spot.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Mirage Spot.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-oras-remove-time-penalty/": {
    meta: {
      id: "/oras-remove-time-penalty/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "supporting_info",
      guideVariants: null,
      guideKey: "/oras-remove-time-penalty/",
      isNew: false,
      title: "移除《欧米伽红宝石／阿尔法蓝宝石》的时间惩罚",
      navDrawerTitle: "移除《欧米伽红宝石／阿尔法蓝宝石》的时间惩罚",
      description:
        "学习如何在《欧米伽红宝石／阿尔法蓝宝石》中更改时间而不触发时间惩罚。",
      slug: "/zh-oras-remove-time-penalty/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-14",
      translation: { enSlug: "/oras-remove-time-penalty/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Remove Time Penalties.mdx",
      translations: {
        en: "/oras-remove-time-penalty/",
        zh: "/zh-oras-remove-time-penalty/",
      },
      guideGroupId:
        "zh:/oras-remove-time-penalty/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 6/Remove Time Penalties.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Remove Time Penalties.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-pal-xd-eevee/": {
    meta: {
      id: "/pal-xd-eevee/",
      categories: ["Gamecube"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/pal-xd-eevee/",
      isNew: false,
      title: "PAL 版宝可梦 XD 伊布乱数",
      navDrawerTitle: "PAL 版宝可梦 XD 伊布乱数",
      description: "如何在 PAL 版宝可梦 XD 中乱数初始伊布",
      slug: "/zh-pal-xd-eevee/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/pal-xd-eevee/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gamecube/(XD) PAL Starter Eevee RNG.mdx",
      translations: { en: "/pal-xd-eevee/", zh: "/zh-pal-xd-eevee/" },
      guideGroupId: "zh:/pal-xd-eevee/:Gamecube",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gamecube/(XD) PAL Starter Eevee RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gamecube/(XD) PAL Starter Eevee RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-pcalc-xy-friend-safari/": {
    meta: {
      id: "/pcalc-xy-friend-safari/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/pcalc-xy-friend-safari/",
      isNew: false,
      title: "X/Y 朋友狩猎区乱数教程",
      navDrawerTitle: "X/Y 朋友狩猎区乱数教程",
      description:
        "学习如何在《宝可梦 X/Y》中通过朋友狩猎区乱数获取异色六V宝可梦，包括百变怪和其他稀有种类。",
      slug: "/zh-pcalc-xy-friend-safari/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/pcalc-xy-friend-safari/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Friend Safari RNG Guide.mdx",
      translations: {
        en: "/pcalc-xy-friend-safari/",
        zh: "/zh-pcalc-xy-friend-safari/",
      },
      guideGroupId: "zh:/pcalc-xy-friend-safari/:X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 6/Friend Safari RNG Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Friend Safari RNG Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-pcalc-xy-tid/": {
    meta: {
      id: "/pcalc-xy-tid/",
      categories: ["X and Y"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/pcalc-xy-tid/",
      isNew: false,
      title: "X 与 Y TID 乱数",
      navDrawerTitle: "X 与 Y TID 乱数",
      description:
        "学习如何在《宝可梦 X／Y》中获取目标的训练家 ID（TID）与秘密 ID（SID）组合。",
      slug: "/zh-pcalc-xy-tid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/pcalc-xy-tid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/XY TID.mdx",
      translations: { en: "/pcalc-xy-tid/", zh: "/zh-pcalc-xy-tid/" },
      guideGroupId: "zh:/pcalc-xy-tid/:X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 6/XY TID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/XY TID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-dppt-starter/": {
    meta: {
      id: "/retail-dppt-starter/",
      categories: ["Diamond, Pearl, and Platinum"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-dppt-starter/",
      isNew: false,
      title: "钻石珍珠白金初始宝可梦乱数",
      navDrawerTitle: "钻石珍珠白金初始宝可梦乱数",
      description:
        "学习如何在钻石、珍珠和白金中进行初始宝可梦的乱数，以获得异色、高个体值的宝可梦。",
      slug: "/zh-retail-dppt-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-06-15",
      translation: { enSlug: "/retail-dppt-starter/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-dppt-starter/",
        en: "/retail-dppt-starter/",
        zh: "/zh-retail-dppt-starter/",
      },
      guideGroupId: "zh:/retail-dppt-starter/:Diamond, Pearl, and Platinum",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Starters.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Starters.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-emerald-egg/": {
    meta: {
      id: "/retail-emerald-egg/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "emer-egg",
      isNew: false,
      title: "Retail Emerald Egg RNG",
      navDrawerTitle: "Retail Emerald Egg RNG",
      description:
        "Learn how to Retail RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/zh-retail-emerald-egg/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-18",
      translation: { enSlug: "/retail-emerald-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Retail Egg.mdx",
      translations: {
        de: "/de-retail-emerald-egg/",
        en: "/retail-emerald-egg/",
        zh: "/zh-retail-emerald-egg/",
      },
      guideGroupId: "zh:emer-egg:Emerald",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Retail Egg.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Retail Egg.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-emerald-wild/": {
    meta: {
      id: "/retail-emerald-wild/",
      categories: ["Emerald"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-emerald-wild/",
      isNew: false,
      title: "实机野生乱数",
      navDrawerTitle: "实机野生乱数",
      description: "在真实主机上对野生宝可梦进行乱数操作",
      slug: "/zh-retail-emerald-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-emerald-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Retail Wild RNG.mdx",
      translations: {
        de: "/de-retail-emerald-wild/",
        it: "/it-retail-emerald-wild/",
        en: "/retail-emerald-wild/",
        zh: "/zh-retail-emerald-wild/",
      },
      guideGroupId: "zh:/retail-emerald-wild/:Emerald",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 3/Emerald/Retail Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Retail Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-hgss-starter/": {
    meta: {
      id: "/retail-hgss-starter/",
      categories: ["HeartGold and SoulSilver"],
      section: "pokemon_rng",
      guideVariants: ["retail"],
      guideKey: "/retail-hgss-starter/",
      isNew: false,
      title: "心金魂银初始宝可梦乱数",
      navDrawerTitle: "心金魂银初始宝可梦乱数",
      description:
        "学习如何在心金与魂银中进行初始宝可梦的乱数，以获得异色、高个体值的宝可梦。",
      slug: "/zh-retail-hgss-starter/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-06-15",
      translation: { enSlug: "/retail-hgss-starter/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-hgss-starter/",
        en: "/retail-hgss-starter/",
        zh: "/zh-retail-hgss-starter/",
      },
      guideGroupId: "zh:/retail-hgss-starter/:HeartGold and SoulSilver",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 4/Starters.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 4/Starters.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-oras-egg-mmsc/": {
    meta: {
      id: "/retail-oras-egg-mmsc/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-oras-egg-mmsc/",
      isNew: false,
      title:
        "在欧米伽红宝石与阿尔法蓝宝石中使用 Masuda 法或闪耀护符进行孵化乱数",
      navDrawerTitle:
        "在欧米伽红宝石与阿尔法蓝宝石中使用 Masuda 法或闪耀护符进行孵化乱数",
      description:
        "学习如何在欧米伽红宝石/阿尔法蓝宝石中，通过培育屋进行的孵化乱数，以获得异色或高个体值宝可梦。",
      slug: "/zh-retail-oras-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-oras-egg-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-oras-egg-mmsc/",
        zh: "/zh-retail-oras-egg-mmsc/",
      },
      guideGroupId: "zh:/retail-oras-egg-mmsc/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-oras-egg-no-mmsc/": {
    meta: {
      id: "/retail-oras-egg-no-mmsc/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-oras-egg-no-mmsc/",
      isNew: false,
      title: "不使用 Masuda 法或闪耀护符的孵化乱数（ORAS）",
      navDrawerTitle: "不使用 Masuda 法或闪耀护符的孵化乱数（ORAS）",
      description:
        "学习如何在《宝可梦 欧米伽红宝石／阿尔法蓝宝石》中通过培育屋进行孵化乱数，实现高个体或异色宝可梦孵化。",
      slug: "/zh-retail-oras-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-oras-egg-no-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-oras-egg-no-mmsc/",
        zh: "/zh-retail-oras-egg-no-mmsc/",
      },
      guideGroupId:
        "zh:/retail-oras-egg-no-mmsc/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-oras-tid/": {
    meta: {
      id: "/retail-oras-tid/",
      categories: ["Omega Ruby and Alpha Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-oras-tid/",
      isNew: false,
      title: "欧米伽红宝石与阿尔法蓝宝石 TID 乱数",
      navDrawerTitle: "欧米伽红宝石与阿尔法蓝宝石 TID 乱数",
      description:
        "学习如何在《欧米伽红宝石 / 阿尔法蓝宝石》中获取理想的训练家 ID（TID）与隐藏 ID（SID）组合。",
      slug: "/zh-retail-oras-tid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-13",
      translation: { enSlug: "/retail-oras-tid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/ORAS TID.mdx",
      translations: { en: "/retail-oras-tid/", zh: "/zh-retail-oras-tid/" },
      guideGroupId: "zh:/retail-oras-tid/:Omega Ruby and Alpha Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 6/ORAS TID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/ORAS TID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-rubysapphire-tid/": {
    meta: {
      id: "/retail-rubysapphire-tid/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "rs-tid",
      isNew: false,
      title: "红蓝宝石实机TID乱数教程",
      navDrawerTitle: "红蓝宝石实机TID乱数教程",
      description: "学习如何在红宝石和蓝宝石中获取你想要的TID和SID组合。",
      slug: "/zh-retail-rubysapphire-tid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-rubysapphire-tid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx",
      translations: {
        en: "/retail-rubysapphire-tid/",
        zh: "/zh-retail-rubysapphire-tid/",
      },
      guideGroupId: "zh:rs-tid:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-egg-mmsc/": {
    meta: {
      id: "/retail-sm-egg-mmsc/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "mm-sc-egg",
      isNew: false,
      title: "日月 使用不同语言和/或闪耀呼符的孵蛋乱数",
      navDrawerTitle: "日月 使用不同语言和/或闪耀呼符的孵蛋乱数",
      description:
        "学习如何在《日月》中使用闪耀呼符和/或不同语言亲代进行高个体异色宝可梦的孵蛋乱数。",
      slug: "/zh-retail-sm-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-egg-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-sm-egg-mmsc/",
        zh: "/zh-retail-sm-egg-mmsc/",
      },
      guideGroupId: "zh:mm-sc-egg:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-egg-no-mmsc/": {
    meta: {
      id: "/retail-sm-egg-no-mmsc/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-egg-no-mmsc/",
      isNew: false,
      title: "日月无不同语言/无闪耀呼符孵蛋乱数",
      navDrawerTitle: "日月无不同语言/无闪耀呼符孵蛋乱数",
      description:
        "学习如何在《日月》中不依赖不同语言或闪耀呼符进行高个体异色宝可梦的孵蛋乱数。",
      slug: "/zh-retail-sm-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-egg-no-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-sm-egg-no-mmsc/",
        zh: "/zh-retail-sm-egg-no-mmsc/",
      },
      guideGroupId: "zh:/retail-sm-egg-no-mmsc/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-egg-seed-no-cfw/": {
    meta: {
      id: "/retail-sm-egg-seed-no-cfw/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-sm-egg-seed-no-cfw/",
      isNew: false,
      title: "日月 实机获取孵蛋种子",
      navDrawerTitle: "日月 实机获取孵蛋种子",
      description: "使用鲤鱼王法在《日月》中获取孵蛋乱数种子，无需破解。",
      slug: "/zh-retail-sm-egg-seed-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-egg-seed-no-cfw/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
      translations: {
        en: "/retail-sm-egg-seed-no-cfw/",
        zh: "/zh-retail-sm-egg-seed-no-cfw/",
      },
      guideGroupId: "zh:/retail-sm-egg-seed-no-cfw/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-fidget/": {
    meta: {
      id: "/retail-sm-fidget/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-fidget/",
      isNew: false,
      title: "日月 主角小动作时间线乱数",
      navDrawerTitle: "日月 主角小动作时间线乱数",
      description: "学习如何在《日月》中使用主角小动作建立时间线。",
      slug: "/zh-retail-sm-fidget/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-fidget/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Timeline With Fidget Guide.mdx",
      translations: { en: "/retail-sm-fidget/", zh: "/zh-retail-sm-fidget/" },
      guideGroupId: "zh:/retail-sm-fidget/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Timeline With Fidget Guide.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Timeline With Fidget Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-initial-seed-clocks/": {
    meta: {
      id: "/retail-sm-initial-seed-clocks/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-sm-initial-seed-clocks/",
      isNew: false,
      title: "日 / 月 使用时钟寻找初始 Seed",
      navDrawerTitle: "日 / 月 使用时钟寻找初始 Seed",
      description:
        "学习如何通过时钟指针的规律来寻找《日 / 月》的初始 Seed —— 无需破解系统。",
      slug: "/zh-retail-sm-initial-seed-clocks/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/retail-sm-initial-seed-clocks/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Finding Initial Seed with Clocks.mdx",
      translations: {
        en: "/retail-sm-initial-seed-clocks/",
        zh: "/zh-retail-sm-initial-seed-clocks/",
      },
      guideGroupId: "zh:/retail-sm-initial-seed-clocks/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Finding Initial Seed with Clocks.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Finding Initial Seed with Clocks.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-island-scan/": {
    meta: {
      id: "/retail-sm-island-scan/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-island-scan/",
      isNew: false,
      title: "《太阳／月亮》岛屿扫描乱数",
      navDrawerTitle: "《太阳／月亮》岛屿扫描乱数",
      description:
        "学习如何在《太阳／月亮》中进行岛屿扫描乱数，非常适合用柑果球获取异色宝可梦。",
      slug: "/zh-retail-sm-island-scan/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-island-scan/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Island Scan.mdx",
      translations: {
        en: "/retail-sm-island-scan/",
        zh: "/zh-retail-sm-island-scan/",
      },
      guideGroupId: "zh:/retail-sm-island-scan/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Island Scan.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Island Scan.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-myster-gift/": {
    meta: {
      id: "/retail-sm-myster-gift/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-myster-gift/",
      isNew: false,
      title: "太阳和月亮神秘礼物乱数",
      navDrawerTitle: "太阳和月亮神秘礼物乱数",
      description:
        "学习如何在太阳与月亮中对神秘礼物宝可梦进行乱数，以获得理想个体值。",
      slug: "/zh-retail-sm-myster-gift/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-myster-gift/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Mystery Gift.mdx",
      translations: {
        en: "/retail-sm-myster-gift/",
        zh: "/zh-retail-sm-myster-gift/",
      },
      guideGroupId: "zh:/retail-sm-myster-gift/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Mystery Gift.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Mystery Gift.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-no-cfw/": {
    meta: {
      id: "/retail-sm-no-cfw/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-sm-no-cfw/",
      isNew: false,
      title: "太阳和月亮 实机乱数",
      navDrawerTitle: "太阳和月亮 实机乱数",
      description:
        "在不使用自制系统的情况下，于太阳与月亮中进行宝可梦个体值乱数。",
      slug: "/zh-retail-sm-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-no-cfw/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/RNGing Without Custom Firmware.mdx",
      translations: { en: "/retail-sm-no-cfw/", zh: "/zh-retail-sm-no-cfw/" },
      guideGroupId: "zh:/retail-sm-no-cfw/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/RNGing Without Custom Firmware.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/RNGing Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-sos/": {
    meta: {
      id: "/retail-sm-sos/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-sos/",
      isNew: false,
      title: "《太阳/月亮》闯入对战呼唤乱数教程",
      navDrawerTitle: "《太阳/月亮》闯入对战呼唤乱数教程",
      description:
        "学习如何在《太阳/月亮》中通过闯入对战呼唤乱数获取异色宝可梦、高个体值（IVs）和隐藏特性。",
      slug: "/zh-retail-sm-sos/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-sos/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/SOS RNG Guide.mdx",
      translations: { en: "/retail-sm-sos/", zh: "/zh-retail-sm-sos/" },
      guideGroupId: "zh:/retail-sm-sos/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/SOS RNG Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/SOS RNG Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-stationary/": {
    meta: {
      id: "/retail-sm-stationary/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-stationary/",
      isNew: false,
      title: "《太阳／月亮》定点宝可梦乱数",
      navDrawerTitle: "《太阳／月亮》定点宝可梦乱数",
      description:
        "学习如何在《太阳／月亮》中进行定点宝可梦乱数，以获得理想的个体值、性格与异色。",
      slug: "/zh-retail-sm-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Stationary RNG.mdx",
      translations: {
        en: "/retail-sm-stationary/",
        zh: "/zh-retail-sm-stationary/",
      },
      guideGroupId: "zh:/retail-sm-stationary/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Stationary RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Stationary RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-timeleap/": {
    meta: {
      id: "/retail-sm-timeleap/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-timeleap/",
      isNew: false,
      title: "日月 时间线跳跃乱数",
      navDrawerTitle: "日月 时间线跳跃乱数",
      description: "学习如何在《日月》中跳跃至特定时间线以获得目标宝可梦。",
      slug: "/zh-retail-sm-timeleap/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-timeleap/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Timeline Leap Guide.mdx",
      translations: {
        en: "/retail-sm-timeleap/",
        zh: "/zh-retail-sm-timeleap/",
      },
      guideGroupId: "zh:/retail-sm-timeleap/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Timeline Leap Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Timeline Leap Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-timeline/": {
    meta: {
      id: "/retail-sm-timeline/",
      categories: ["Sun and Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-timeline/",
      isNew: false,
      title: "日月时间线乱数",
      navDrawerTitle: "日月时间线乱数",
      description: "学习如何在《日月》中创建时间线。",
      slug: "/zh-retail-sm-timeline/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-timeline/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Timeline Guide.mdx",
      translations: {
        en: "/retail-sm-timeline/",
        zh: "/zh-retail-sm-timeline/",
      },
      guideGroupId: "zh:/retail-sm-timeline/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Timeline Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Timeline Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-sm-wild/": {
    meta: {
      id: "/retail-sm-wild/",
      categories: ["Sun and Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-sm-wild/",
      isNew: false,
      title: "《太阳／月亮》野生宝可梦乱数",
      navDrawerTitle: "《太阳／月亮》野生宝可梦乱数",
      description:
        "学习如何在《太阳／月亮》中进行野生宝可梦乱数，以获得异色与高个体值结果。",
      slug: "/zh-retail-sm-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-sm-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Wild RNG.mdx",
      translations: { en: "/retail-sm-wild/", zh: "/zh-retail-sm-wild/" },
      guideGroupId: "zh:/retail-sm-wild/:Sun and Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-egg-mmsc/": {
    meta: {
      id: "/retail-usum-egg-mmsc/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "mm-sc-egg",
      isNew: false,
      title: "究极日月 使用不同语言和/或闪耀呼符的孵蛋乱数",
      navDrawerTitle: "究极日月 使用不同语言和/或闪耀呼符的孵蛋乱数",
      description:
        "学习如何在《究极日月》中使用闪耀呼符和/或不同语言亲代进行高个体异色宝可梦的孵蛋乱数。",
      slug: "/zh-retail-usum-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-egg-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-usum-egg-mmsc/",
        zh: "/zh-retail-usum-egg-mmsc/",
      },
      guideGroupId: "zh:mm-sc-egg:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-egg-no-mmsc/": {
    meta: {
      id: "/retail-usum-egg-no-mmsc/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-egg-no-mmsc/",
      isNew: false,
      title: "究极日月无不同语言/无闪耀呼符孵蛋乱数",
      navDrawerTitle: "究极日月无不同语言/无闪耀呼符孵蛋乱数",
      description:
        "学习如何在《究极日月》中不依赖不同语言或闪耀呼符进行高个体异色宝可梦的孵蛋乱数。",
      slug: "/zh-retail-usum-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-egg-no-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-usum-egg-no-mmsc/",
        zh: "/zh-retail-usum-egg-no-mmsc/",
      },
      guideGroupId: "zh:/retail-usum-egg-no-mmsc/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-egg-seed-no-cfw/": {
    meta: {
      id: "/retail-usum-egg-seed-no-cfw/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-usum-egg-seed-no-cfw/",
      isNew: false,
      title: "究极日月 实机获取孵蛋种子",
      navDrawerTitle: "究极日月 实机获取孵蛋种子",
      description: "使用鲤鱼王法在《究极日月》中获取孵蛋乱数种子，无需破解。",
      slug: "/zh-retail-usum-egg-seed-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-egg-seed-no-cfw/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
      translations: {
        en: "/retail-usum-egg-seed-no-cfw/",
        zh: "/zh-retail-usum-egg-seed-no-cfw/",
      },
      guideGroupId: "zh:/retail-usum-egg-seed-no-cfw/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-fidget/": {
    meta: {
      id: "/retail-usum-fidget/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-fidget/",
      isNew: false,
      title: "究极日月 主角小动作时间线乱数",
      navDrawerTitle: "究极日月 主角小动作时间线乱数",
      description:
        "学习如何在《究极之日／究极之月》中使用主角小动作建立时间线。",
      slug: "/zh-retail-usum-fidget/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-fidget/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Timeline With Fidget Guide.mdx",
      translations: {
        en: "/retail-usum-fidget/",
        zh: "/zh-retail-usum-fidget/",
      },
      guideGroupId: "zh:/retail-usum-fidget/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Timeline With Fidget Guide.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Timeline With Fidget Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-initial-seed-clocks/": {
    meta: {
      id: "/retail-usum-initial-seed-clocks/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-usum-initial-seed-clocks/",
      isNew: false,
      title: "究极之日 / 究极之月 使用时钟寻找初始 Seed",
      navDrawerTitle: "究极之日 / 究极之月 使用时钟寻找初始 Seed",
      description:
        "学习如何通过时钟指针的规律来寻找《究极之日 / 究极之月》的初始 Seed —— 无需破解系统。",
      slug: "/zh-retail-usum-initial-seed-clocks/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/retail-usum-initial-seed-clocks/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Finding Initial Seed with Clocks.mdx",
      translations: {
        en: "/retail-usum-initial-seed-clocks/",
        zh: "/zh-retail-usum-initial-seed-clocks/",
      },
      guideGroupId:
        "zh:/retail-usum-initial-seed-clocks/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/Finding Initial Seed with Clocks.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Finding Initial Seed with Clocks.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-island-scan/": {
    meta: {
      id: "/retail-usum-island-scan/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-island-scan/",
      isNew: false,
      title: "《究极之日／究极之月》岛屿扫描乱数",
      navDrawerTitle: "《究极之日／究极之月》岛屿扫描乱数",
      description:
        "学习如何在《究极之日／究极之月》中进行岛屿扫描乱数，非常适合用柑果球获取异色宝可梦。",
      slug: "/zh-retail-usum-island-scan/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-island-scan/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Island Scan.mdx",
      translations: {
        en: "/retail-usum-island-scan/",
        zh: "/zh-retail-usum-island-scan/",
      },
      guideGroupId: "zh:/retail-usum-island-scan/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Island Scan.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Island Scan.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-mystery-gift/": {
    meta: {
      id: "/retail-usum-mystery-gift/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-mystery-gift/",
      isNew: false,
      title: "究极之日和究极之月神秘礼物乱数",
      navDrawerTitle: "究极之日和究极之月神秘礼物乱数",
      description:
        "学习如何在究极之日与究极之月中对神秘礼物宝可梦进行乱数，以获得理想个体值。",
      slug: "/zh-retail-usum-mystery-gift/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-mystery-gift/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Mystery Gift.mdx",
      translations: {
        en: "/retail-usum-mystery-gift/",
        zh: "/zh-retail-usum-mystery-gift/",
      },
      guideGroupId: "zh:/retail-usum-mystery-gift/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Mystery Gift.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Mystery Gift.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-no-cfw/": {
    meta: {
      id: "/retail-usum-no-cfw/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/retail-usum-no-cfw/",
      isNew: false,
      title: "究极之日和究极之月 实机乱数",
      navDrawerTitle: "究极之日和究极之月 实机乱数",
      description:
        "在不使用自制系统的情况下，于究极之日与究极之月中进行宝可梦个体值乱数。",
      slug: "/zh-retail-usum-no-cfw/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-no-cfw/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/RNGing Without Custom Firmware.mdx",
      translations: {
        en: "/retail-usum-no-cfw/",
        zh: "/zh-retail-usum-no-cfw/",
      },
      guideGroupId: "zh:/retail-usum-no-cfw/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 7/RNGing Without Custom Firmware.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/RNGing Without Custom Firmware.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-sos/": {
    meta: {
      id: "/retail-usum-sos/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-sos/",
      isNew: false,
      title: "《究极之日/究极之月》闯入对战呼唤乱数教程",
      navDrawerTitle: "《究极之日/究极之月》闯入对战呼唤乱数教程",
      description:
        "学习如何在《究极之日/究极之月》中通过闯入对战呼唤乱数获取异色宝可梦、高个体值（IVs）和隐藏特性。",
      slug: "/zh-retail-usum-sos/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-sos/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/SOS RNG Guide.mdx",
      translations: { en: "/retail-usum-sos/", zh: "/zh-retail-usum-sos/" },
      guideGroupId: "zh:/retail-usum-sos/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/SOS RNG Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/SOS RNG Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-stationary/": {
    meta: {
      id: "/retail-usum-stationary/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-stationary/",
      isNew: false,
      title: "《究极之日／究极之月》定点宝可梦乱数",
      navDrawerTitle: "《究极之日／究极之月》定点宝可梦乱数",
      description:
        "学习如何在《究极之日／究极之月》中进行定点宝可梦乱数，以获得理想的个体值、性格与异色。",
      slug: "/zh-retail-usum-stationary/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Stationary RNG.mdx",
      translations: {
        en: "/retail-usum-stationary/",
        zh: "/zh-retail-usum-stationary/",
      },
      guideGroupId: "zh:/retail-usum-stationary/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Stationary RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Stationary RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-timeleap/": {
    meta: {
      id: "/retail-usum-timeleap/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-timeleap/",
      isNew: false,
      title: "究极日月 时间线跳跃乱数",
      navDrawerTitle: "究极日月 时间线跳跃乱数",
      description:
        "学习如何在《究极之日／究极之月》中跳跃至特定时间线以获得目标宝可梦。",
      slug: "/zh-retail-usum-timeleap/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-timeleap/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-08",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Timeline Leap Guide.mdx",
      translations: {
        en: "/retail-usum-timeleap/",
        zh: "/zh-retail-usum-timeleap/",
      },
      guideGroupId: "zh:/retail-usum-timeleap/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Timeline Leap Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Timeline Leap Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-timeline/": {
    meta: {
      id: "/retail-usum-timeline/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "rng_technique",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-timeline/",
      isNew: false,
      title: "究极日月时间线乱数",
      navDrawerTitle: "究极日月时间线乱数",
      description: "学习如何在《究极之日／究极之月》中创建时间线。",
      slug: "/zh-retail-usum-timeline/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-timeline/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Timeline Guide.mdx",
      translations: {
        en: "/retail-usum-timeline/",
        zh: "/zh-retail-usum-timeline/",
      },
      guideGroupId: "zh:/retail-usum-timeline/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Timeline Guide.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Timeline Guide.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-wild/": {
    meta: {
      id: "/retail-usum-wild/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-wild/",
      isNew: false,
      title: "《究极之日／究极之月》野生宝可梦乱数",
      navDrawerTitle: "《究极之日／究极之月》野生宝可梦乱数",
      description:
        "学习如何在《究极之日／究极之月》中进行野生宝可梦乱数，以获得异色与高个体值结果。",
      slug: "/zh-retail-usum-wild/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Wild RNG.mdx",
      translations: { en: "/retail-usum-wild/", zh: "/zh-retail-usum-wild/" },
      guideGroupId: "zh:/retail-usum-wild/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 7/Wild RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Wild RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-usum-wormhole/": {
    meta: {
      id: "/retail-usum-wormhole/",
      categories: ["Ultra Sun and Ultra Moon"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-usum-wormhole/",
      isNew: false,
      title: "《究极之日／究极之月》究极之洞乱数",
      navDrawerTitle: "《究极之日／究极之月》究极之洞乱数",
      description:
        "在《究极之日／究极之月》中，对究极之洞内出现的传说宝可梦进行乱数，以获得理想的个体值、性格与异色。",
      slug: "/zh-retail-usum-wormhole/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-usum-wormhole/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 7/Stationary Wormhole RNG.mdx",
      translations: {
        en: "/retail-usum-wormhole/",
        zh: "/zh-retail-usum-wormhole/",
      },
      guideGroupId: "zh:/retail-usum-wormhole/:Ultra Sun and Ultra Moon",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 7/Stationary Wormhole RNG.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 7/Stationary Wormhole RNG.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-xy-egg-mmsc/": {
    meta: {
      id: "/retail-xy-egg-mmsc/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-xy-egg-mmsc/",
      isNew: false,
      title: "在X与Y中使用 Masuda 法或闪耀护符进行孵化乱数",
      navDrawerTitle: "在X与Y中使用 Masuda 法或闪耀护符进行孵化乱数",
      description:
        "学习如何在X/Y中，通过培育屋进行的孵化乱数，以获得异色或高个体值宝可梦。",
      slug: "/zh-retail-xy-egg-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-xy-egg-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-xy-egg-mmsc/",
        zh: "/zh-retail-xy-egg-mmsc/",
      },
      guideGroupId: "zh:/retail-xy-egg-mmsc/:X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-retail-xy-egg-no-mmsc/": {
    meta: {
      id: "/retail-xy-egg-no-mmsc/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/retail-xy-egg-no-mmsc/",
      isNew: false,
      title: "不使用 Masuda 法或闪耀护符的孵化乱数（XY）",
      navDrawerTitle: "不使用 Masuda 法或闪耀护符的孵化乱数（XY）",
      description:
        "学习如何在《宝可梦 X/Y》中通过培育屋进行孵化乱数，实现高个体或异色宝可梦孵化。",
      slug: "/zh-retail-xy-egg-no-mmsc/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-xy-egg-no-mmsc/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: {
        en: "/retail-xy-egg-no-mmsc/",
        zh: "/zh-retail-xy-egg-no-mmsc/",
      },
      guideGroupId: "zh:/retail-xy-egg-no-mmsc/:X and Y",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-rs-battery/": {
    meta: {
      id: "/rs-battery/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/rs-battery/",
      isNew: false,
      title: "红蓝宝石 电池有电 vs 无电 乱数对比",
      navDrawerTitle: "红蓝宝石 电池有电 vs 无电 乱数对比",
      description:
        "了解红宝石与蓝宝石在电池有电和电池耗尽情况下的乱数方法差异，以及这些差异如何影响宝可梦结果。",
      slug: "/zh-rs-battery/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-battery/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx",
      translations: { en: "/rs-battery/", zh: "/zh-rs-battery/" },
      guideGroupId: "zh:/rs-battery/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-rs-gen3-sid/": {
    meta: {
      id: "/rs-gen3-sid/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail", "cfw-emu"],
      guideKey: "/rs-gen3-sid/",
      isNew: false,
      title: "查找第三世代 SID",
      navDrawerTitle: "查找第三世代 SID",
      description: "多种方法查找第三世代的SID",
      slug: "/zh-rs-gen3-sid/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-gen3-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID.mdx",
      translations: {
        de: "/de-rs-gen3-sid/",
        it: "/it-rs-gen3-sid/",
        en: "/rs-gen3-sid/",
        zh: "/zh-rs-gen3-sid/",
      },
      guideGroupId: "zh:/rs-gen3-sid/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Find SID.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Find SID.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-rs-mirage-island/": {
    meta: {
      id: "/rs-mirage-island/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "/rs-mirage-island/",
      isNew: false,
      title: "幻之岛",
      navDrawerTitle: "幻之岛",
      description: "通过捕捉具有特定 PID 的宝可梦以进入幻之岛",
      slug: "/zh-rs-mirage-island/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-11",
      translation: { enSlug: "/rs-mirage-island/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        de: "/de-rs-mirage-island/",
        en: "/rs-mirage-island/",
        zh: "/zh-rs-mirage-island/",
      },
      guideGroupId: "zh:/rs-mirage-island/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-rs-pokerus-emu/": {
    meta: {
      id: "/rs-pokerus-emu/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "rs-pokerus",
      isNew: false,
      title: "红蓝宝石的宝可病毒",
      navDrawerTitle: "红蓝宝石的宝可病毒",
      description: "如何感染宝可病毒",
      slug: "/zh-rs-pokerus-emu/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-09",
      translation: { enSlug: "/rs-pokerus-emu/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        de: "/de-rs-pokerus-emu/",
        en: "/rs-pokerus-emu/",
        zh: "/zh-rs-pokerus-emu/",
      },
      guideGroupId: "zh:rs-pokerus:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-rs-pokerus-retail/": {
    meta: {
      id: "/rs-pokerus-retail/",
      categories: ["Ruby and Sapphire"],
      section: "other_rng",
      guideVariants: ["retail"],
      guideKey: "rs-pokerus",
      isNew: false,
      title: "红宝石·蓝宝石中的宝可病毒",
      navDrawerTitle: "红宝石·蓝宝石中的宝可病毒",
      description: "如何感染宝可病毒",
      slug: "/zh-rs-pokerus-retail/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-05-17",
      translation: { enSlug: "/rs-pokerus-retail/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx",
      translations: { en: "/rs-pokerus-retail/", zh: "/zh-rs-pokerus-retail/" },
      guideGroupId: "zh:rs-pokerus:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-rs-sid-feebas/": {
    meta: {
      id: "/rs-sid-feebas/",
      categories: ["Ruby and Sapphire"],
      section: "rng_technique",
      guideVariants: ["retail"],
      guideKey: "/rs-sid-feebas/",
      isNew: false,
      title: "使用丑丑鱼查找 SID",
      navDrawerTitle: "使用丑丑鱼查找 SID",
      description: "如何在《红宝石 / 蓝宝石》中利用丑丑鱼查找你的里ID (SID)。",
      slug: "/zh-rs-sid-feebas/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-sid-feebas/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        de: "/de-rs-sid-feebas/",
        en: "/rs-sid-feebas/",
        zh: "/zh-rs-sid-feebas/",
      },
      guideGroupId: "zh:/rs-sid-feebas/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-wishing-star-jirachi/": {
    meta: {
      id: "/wishing-star-jirachi/",
      categories: ["Ruby and Sapphire"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/wishing-star-jirachi/",
      isNew: false,
      title: "红蓝宝石 许愿星基拉祈乱数",
      navDrawerTitle: "红蓝宝石 许愿星基拉祈乱数",
      description:
        "学习如何在红宝石和蓝宝石中，通过圆形竞技场发放的许愿星基拉祈进行乱数。",
      slug: "/zh-wishing-star-jirachi/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-04-23",
      translation: { enSlug: "/wishing-star-jirachi/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx",
      translations: {
        en: "/wishing-star-jirachi/",
        zh: "/zh-wishing-star-jirachi/",
      },
      guideGroupId: "zh:/wishing-star-jirachi/:Ruby and Sapphire",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-xy-friend-safari-patch/": {
    meta: {
      id: "/xy-friend-safari-patch/",
      categories: ["X and Y"],
      section: "patch",
      guideVariants: null,
      guideKey: "/xy-friend-safari-patch/",
      isNew: false,
      title: "XY全朋友狩猎区补丁",
      navDrawerTitle: "XY全朋友狩猎区补丁",
      description:
        "介绍如何使用游戏补丁在《宝可梦 X / Y》中解锁全部朋友狩猎区宝可梦，包括百变怪与花纹蝶。",
      slug: "/zh-xy-friend-safari-patch/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/xy-friend-safari-patch/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/Friend Safari Patch.mdx",
      translations: {
        en: "/xy-friend-safari-patch/",
        zh: "/zh-xy-friend-safari-patch/",
      },
      guideGroupId: "zh:/xy-friend-safari-patch/:X and Y",
      guideVariantLinks: null,
      displayAttributes: ["video_guide"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 6/Friend Safari Patch.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/Friend Safari Patch.mdx?raw"
      );
      return file.default;
    }),
  },
  "/zh-xy-pokeradar/": {
    meta: {
      id: "/xy-pokeradar/",
      categories: ["X and Y"],
      section: "pokemon_rng",
      guideVariants: ["cfw-emu"],
      guideKey: "/xy-pokeradar/",
      isNew: false,
      title: "X 与 Y PokéRadar 乱数",
      navDrawerTitle: "X 与 Y PokéRadar 乱数",
      description:
        "学习如何在《宝可梦 X / Y》中使用 PokéRadar 进行乱数，以获取异色宝可梦。",
      slug: "/zh-xy-pokeradar/",
      isRoughDraft: false,
      orderPriority: 20,
      hideFromNavDrawer: true,
      addedOn: "2025-03-24",
      translation: { enSlug: "/xy-pokeradar/", language: "zh" },
      layout: "guide",
      canonical: null,
      lastUpdated: "2026-03-20",
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 6/PokeRadar.mdx",
      translations: { en: "/xy-pokeradar/", zh: "/zh-xy-pokeradar/" },
      guideGroupId: "zh:/xy-pokeradar/:X and Y",
      guideVariantLinks: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(
      () => import("~/../guides/Translations/zh/Gen 6/PokeRadar.mdx"),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Translations/zh/Gen 6/PokeRadar.mdx?raw"
      );
      return file.default;
    }),
  },
} as const;

export const guideSlugs = [
  "/",
  "/3ds-alt-settings/",
  "/3ds-helper/",
  "/about/",
  "/azahar-setup/",
  "/bdsp-advance-rng/",
  "/bdsp-chatot/",
  "/bdsp-emulator-setup/",
  "/bdsp-pokefinder/",
  "/black-2-and-white-2/",
  "/black-and-white/",
  "/brilliant-diamond-and-shining-pearl/",
  "/bw-calibration/",
  "/bw-emu-starter/",
  "/bw2-calibration/",
  "/bw2-egg/",
  "/cfw-bdsp-egg/",
  "/cfw-bdsp-stationary/",
  "/cfw-bdsp-tidandsid/",
  "/cfw-bdsp-wild/",
  "/challenge-usum-ta/",
  "/channel-jirachi/",
  "/citrarng-setup/",
  "/connect-dolphin-to-gba/",
  "/consistent-platinum-rng/",
  "/contributing/",
  "/crystal/",
  "/de-e-tips-rng/",
  "/de-emerald-advancing-rng-techniques/",
  "/de-emerald-battle-video/",
  "/de-emerald-mirage-island/",
  "/de-emerald-overview/",
  "/de-emerald-painting-rng/",
  "/de-emerald-pokerus-emu/",
  "/de-emerald-shiny-starter/",
  "/de-emerald-sid-feebas/",
  "/de-emulator-emerald-egg/",
  "/de-frlg-gen3-sid/",
  "/de-gba-overview/",
  "/de-gen3-sid/",
  "/de-retail-emerald-egg/",
  "/de-retail-emerald-wild/",
  "/de-rs-gen3-sid/",
  "/de-rs-mirage-island/",
  "/de-rs-pokerus-emu/",
  "/de-rs-sid-feebas/",
  "/delete-pokemon-save/",
  "/desmume-setup/",
  "/diamond-pearl-and-platinum/",
  "/dppt-3ds-rng/",
  "/dppt-advance-rng/",
  "/dppt-cute-charm/",
  "/dppt-initial-seed-retail/",
  "/dppt-initial-seed/",
  "/dppt-pokeradar-rng/",
  "/dppt-setup-rng/",
  "/dppt-tid-sid/",
  "/dppt-wild/",
  "/dream-radar-cart-patches/",
  "/dream-radar-patches/",
  "/e-tips-rng/",
  "/emerald-advancing-rng-techniques/",
  "/emerald-battle-video/",
  "/emerald-mirage-island/",
  "/emerald-overview/",
  "/emerald-painting-rng/",
  "/emerald-painting-seed-searcher/",
  "/emerald-pokerus-emu/",
  "/emerald-shiny-starter/",
  "/emerald-sid-feebas/",
  "/emerald-static/",
  "/emerald-tidsid-generator/",
  "/emerald-wild-method-likelihood-calculator/",
  "/emerald-wild/",
  "/emerald/",
  "/emu-bw-egg/",
  "/emulator-b2w2-dream-radar/",
  "/emulator-b2w2-runasdate-inital-seed/",
  "/emulator-b2w2-wild/",
  "/emulator-bw-entralink/",
  "/emulator-bw-find-ds-parameters/",
  "/emulator-bw-roamers/",
  "/emulator-bw-runasdate-initial-seed/",
  "/emulator-bw-white-forest/",
  "/emulator-bw-wild/",
  "/emulator-colosseum-general/",
  "/emulator-dppt-cute-charm/",
  "/emulator-dppt-egg/",
  "/emulator-dppt-pokefinder-setup/",
  "/emulator-dppt-stationary/",
  "/emulator-dppt-tid-sid/",
  "/emulator-emerald-egg/",
  "/emulator-flrg-stationary-and-gift/",
  "/emulator-frlg-egg/",
  "/emulator-frlg-stationary/",
  "/emulator-frlg-wild-v2/",
  "/emulator-frlg-wild/",
  "/emulator-hgss-breeding/",
  "/emulator-hgss-cute-charm/",
  "/emulator-hgss-egg/",
  "/emulator-hgss-special-wild/",
  "/emulator-hgss-stationary/",
  "/emulator-hgss-tid-sid/",
  "/emulator-hgss-wild/",
  "/emulator-hgss-wondercard/",
  "/emulator-oras-dexnav/",
  "/emulator-rs-dead-battery-stationary/",
  "/emulator-rs-egg/",
  "/emulator-rs-live-battery-tid/",
  "/emulator-rs-stationary/",
  "/emulator-rs-wild/",
  "/emulator-rs-wishmaker/",
  "/emulator-sm-time-finder/",
  "/emulator-usum-time-finder/",
  "/es-delete-pokemon-save/",
  "/es-dppt-advance-rng/",
  "/es-gba-methods-lead-impact/",
  "/es-gba-methods/",
  "/es-gen2-celebi/",
  "/es-gen2-starters/",
  "/es-gen3-glossary/",
  "/es-hgss-rng-advance/",
  "/es-install-pokereader/",
  "/experiments/",
  "/fire-red-and-leaf-green/",
  "/fr-bdsp-advance-rng/",
  "/fr-install-capturesight/",
  "/frlg-gen3-sid/",
  "/frlg-seeding-bot/",
  "/frlg-static/",
  "/frlg-tidsid-generator/",
  "/frlg-tips-rng/",
  "/gamecube/",
  "/gba-methods-lead-impact/",
  "/gba-methods/",
  "/gba-overview/",
  "/gba-pokerus-technical/",
  "/gba-vblank/",
  "/gc-initial/",
  "/gen2-celebi/",
  "/gen2-research/",
  "/gen2-starters/",
  "/gen3-glossary/",
  "/gen3-sid/",
  "/heart-gold-and-soul-silver/",
  "/help-translate/",
  "/hgss-3ds-rng/",
  "/hgss-cute-charm/",
  "/hgss-initial-seed/",
  "/hgss-rng-advance/",
  "/hgss-tid-sid/",
  "/install-capturesight/",
  "/install-pokereader-emu/",
  "/install-pokereader/",
  "/it-e-tips-rng/",
  "/it-emerald-overview/",
  "/it-emulator-b2w2-runasdate-inital-seed/",
  "/it-emulator-b2w2-wild/",
  "/it-emulator-bw-runasdate-initial-seed/",
  "/it-emulator-bw-wild/",
  "/it-emulator-emerald-egg/",
  "/it-emulator-hgss-egg/",
  "/it-frlg-gen3-sid/",
  "/it-gen3-glossary/",
  "/it-gen3-sid/",
  "/it-hgss-initial-seed/",
  "/it-install-pokereader/",
  "/it-pokereader/",
  "/it-retail-dppt-starter/",
  "/it-retail-emerald-wild/",
  "/it-retail-hgss-starter/",
  "/it-rs-gen3-sid/",
  "/legends-arceus/",
  "/meteor-jirachi/",
  "/mgba-setup/",
  "/misc-3ds-installing-pcalc/",
  "/misc-3ds-ips-luma-citra/",
  "/misc-3ds-island-scan-sm/",
  "/misc-3ds-island-scan-usum/",
  "/misc-3ds-transporter-nature-tables/",
  "/misc-dolphin-connect-vba/",
  "/misc-dolphin-gba-bios/",
  "/misc-sm-wild-spots/",
  "/mystic-timer/",
  "/no-dolphin-patch/",
  "/ntr-helper-usage/",
  "/omega-ruby-and-alpha-sapphire/",
  "/oras-mirage-spots/",
  "/oras-remove-time-penalty/",
  "/pal-xd-eevee/",
  "/pcalc-xy-friend-safari/",
  "/pcalc-xy-tid/",
  "/pokefinder/",
  "/pokereader/",
  "/retail-bw-entralink/",
  "/retail-bw-starter/",
  "/retail-dppt-starter/",
  "/retail-dppt-static/",
  "/retail-emerald-egg/",
  "/retail-emerald-wild/",
  "/retail-hgss-starter/",
  "/retail-oras-egg-mmsc/",
  "/retail-oras-egg-no-mmsc/",
  "/retail-oras-tid/",
  "/retail-rubysapphire-tid/",
  "/retail-sm-egg-mmsc/",
  "/retail-sm-egg-no-mmsc/",
  "/retail-sm-egg-seed-no-cfw/",
  "/retail-sm-fidget/",
  "/retail-sm-initial-seed-clocks/",
  "/retail-sm-island-scan/",
  "/retail-sm-myster-gift/",
  "/retail-sm-no-cfw/",
  "/retail-sm-sos/",
  "/retail-sm-stationary/",
  "/retail-sm-timeleap/",
  "/retail-sm-timeline/",
  "/retail-sm-wild/",
  "/retail-swsh-get-seed-with-cfw/",
  "/retail-swsh-get-seed-without-cfw/",
  "/retail-swsh-raid/",
  "/retail-usum-egg-mmsc/",
  "/retail-usum-egg-no-mmsc/",
  "/retail-usum-egg-seed-no-cfw/",
  "/retail-usum-fidget/",
  "/retail-usum-initial-seed-clocks/",
  "/retail-usum-island-scan/",
  "/retail-usum-mystery-gift/",
  "/retail-usum-no-cfw/",
  "/retail-usum-sos/",
  "/retail-usum-stationary/",
  "/retail-usum-timeleap/",
  "/retail-usum-timeline/",
  "/retail-usum-wild/",
  "/retail-usum-wormhole/",
  "/retail-xy-egg-mmsc/",
  "/retail-xy-egg-no-mmsc/",
  "/rs-battery/",
  "/rs-gen3-sid/",
  "/rs-initial-seed/",
  "/rs-mirage-island/",
  "/rs-pokefinder-setup/",
  "/rs-pokerus-emu/",
  "/rs-pokerus-retail/",
  "/rs-sid-feebas/",
  "/rs-static/",
  "/rs-tidsid-generator/",
  "/rs-tips-rng/",
  "/ruby-and-sapphire/",
  "/sos-call-rates/",
  "/sun-and-moon/",
  "/sword-and-shield/",
  "/sysbot-lpa-mmo/",
  "/transporter-dream-radar/",
  "/transporter-patches/",
  "/transporter-rng-offline/",
  "/transporter-rng/",
  "/ultra-sun-and-ultra-moon/",
  "/wishing-star-jirachi/",
  "/x-and-y/",
  "/xdcolo-tidsid-generator/",
  "/xy-friend-safari-patch/",
  "/xy-pokeradar/",
  "/zh-3ds-alt-settings/",
  "/zh-3ds-helper/",
  "/zh-bw2-egg/",
  "/zh-channel-jirachi/",
  "/zh-connect-dolphin-to-gba/",
  "/zh-delete-pokemon-save/",
  "/zh-desmume-setup/",
  "/zh-dppt-3ds-rng/",
  "/zh-dppt-advance-rng/",
  "/zh-dppt-cute-charm/",
  "/zh-dppt-initial-seed-retail/",
  "/zh-dppt-initial-seed/",
  "/zh-dppt-pokeradar-rng/",
  "/zh-dppt-tid-sid/",
  "/zh-dppt-wild/",
  "/zh-e-tips-rng/",
  "/zh-emerald-mirage-island/",
  "/zh-emerald-painting-rng/",
  "/zh-emerald-pokerus-emu/",
  "/zh-emerald-shiny-starter/",
  "/zh-emerald-sid-feebas/",
  "/zh-emulator-b2w2-dream-radar/",
  "/zh-emulator-b2w2-runasdate-inital-seed/",
  "/zh-emulator-bw-entralink/",
  "/zh-emulator-bw-find-ds-parameters/",
  "/zh-emulator-bw-roamers/",
  "/zh-emulator-bw-runasdate-initial-seed/",
  "/zh-emulator-bw-white-forest/",
  "/zh-emulator-dppt-cute-charm/",
  "/zh-emulator-dppt-egg/",
  "/zh-emulator-dppt-stationary/",
  "/zh-emulator-dppt-tid-sid/",
  "/zh-emulator-emerald-egg/",
  "/zh-emulator-flrg-stationary-and-gift/",
  "/zh-emulator-frlg-egg/",
  "/zh-emulator-frlg-wild/",
  "/zh-emulator-hgss-cute-charm/",
  "/zh-emulator-hgss-egg/",
  "/zh-emulator-hgss-stationary/",
  "/zh-emulator-oras-dexnav/",
  "/zh-emulator-rs-egg/",
  "/zh-emulator-rs-stationary/",
  "/zh-emulator-rs-wishmaker/",
  "/zh-emulator-sm-time-finder/",
  "/zh-emulator-usum-time-finder/",
  "/zh-frlg-gen3-sid/",
  "/zh-frlg-seeding-bot/",
  "/zh-gba-methods-lead-impact/",
  "/zh-gba-methods/",
  "/zh-gba-overview/",
  "/zh-gba-pokerus-technical/",
  "/zh-gba-vblank/",
  "/zh-gc-initial/",
  "/zh-gen2-celebi/",
  "/zh-gen2-starters/",
  "/zh-gen3-sid/",
  "/zh-hgss-3ds-rng/",
  "/zh-hgss-cute-charm/",
  "/zh-hgss-initial-seed/",
  "/zh-hgss-rng-advance/",
  "/zh-hgss-tid-sid/",
  "/zh-install-pokereader/",
  "/zh-meteor-jirachi/",
  "/zh-mgba-setup/",
  "/zh-misc-3ds-island-scan-sm/",
  "/zh-misc-3ds-island-scan-usum/",
  "/zh-misc-dolphin-gba-bios/",
  "/zh-oras-mirage-spots/",
  "/zh-oras-remove-time-penalty/",
  "/zh-pal-xd-eevee/",
  "/zh-pcalc-xy-friend-safari/",
  "/zh-pcalc-xy-tid/",
  "/zh-retail-dppt-starter/",
  "/zh-retail-emerald-egg/",
  "/zh-retail-emerald-wild/",
  "/zh-retail-hgss-starter/",
  "/zh-retail-oras-egg-mmsc/",
  "/zh-retail-oras-egg-no-mmsc/",
  "/zh-retail-oras-tid/",
  "/zh-retail-rubysapphire-tid/",
  "/zh-retail-sm-egg-mmsc/",
  "/zh-retail-sm-egg-no-mmsc/",
  "/zh-retail-sm-egg-seed-no-cfw/",
  "/zh-retail-sm-fidget/",
  "/zh-retail-sm-initial-seed-clocks/",
  "/zh-retail-sm-island-scan/",
  "/zh-retail-sm-myster-gift/",
  "/zh-retail-sm-no-cfw/",
  "/zh-retail-sm-sos/",
  "/zh-retail-sm-stationary/",
  "/zh-retail-sm-timeleap/",
  "/zh-retail-sm-timeline/",
  "/zh-retail-sm-wild/",
  "/zh-retail-usum-egg-mmsc/",
  "/zh-retail-usum-egg-no-mmsc/",
  "/zh-retail-usum-egg-seed-no-cfw/",
  "/zh-retail-usum-fidget/",
  "/zh-retail-usum-initial-seed-clocks/",
  "/zh-retail-usum-island-scan/",
  "/zh-retail-usum-mystery-gift/",
  "/zh-retail-usum-no-cfw/",
  "/zh-retail-usum-sos/",
  "/zh-retail-usum-stationary/",
  "/zh-retail-usum-timeleap/",
  "/zh-retail-usum-timeline/",
  "/zh-retail-usum-wild/",
  "/zh-retail-usum-wormhole/",
  "/zh-retail-xy-egg-mmsc/",
  "/zh-retail-xy-egg-no-mmsc/",
  "/zh-rs-battery/",
  "/zh-rs-gen3-sid/",
  "/zh-rs-mirage-island/",
  "/zh-rs-pokerus-emu/",
  "/zh-rs-pokerus-retail/",
  "/zh-rs-sid-feebas/",
  "/zh-wishing-star-jirachi/",
  "/zh-xy-friend-safari-patch/",
  "/zh-xy-pokeradar/",
] as const;

export const categories = [
  "Home",
  "Gold, Silver, Crystal",
  "Transporter and Dream Radar",
  "Ruby and Sapphire",
  "Gamecube",
  "FireRed and LeafGreen",
  "Emerald",
  "Diamond, Pearl, and Platinum",
  "HeartGold and SoulSilver",
  "Black and White",
  "Black 2 and White 2",
  "X and Y",
  "Omega Ruby and Alpha Sapphire",
  "Sun and Moon",
  "Ultra Sun and Ultra Moon",
  "Sword and Shield",
  "Brilliant Diamond and Shining Pearl",
  "Legends Arceus",
  "GBA Overview",
  "GBA Technical Documentation",
  "USUM Challenges",
  "User Settings",
  "Game Hub",
] as const;

export const externalGuides = [
  {
    addedOn: "2026-03-01",
    categories: ["Black and White", "Black 2 and White 2"],
    section: "tool",
    navDrawerTitle: "niart120's Gen 5 web tool",
    guideKey: "gen5-web-tool",
    displayAttributes: ["web_tool"],
    url: "https://niart120.github.io/5genSearch-web/",
    id: "https://niart120.github.io/5genSearch-web/",
    isNew: false,
    translation: null,
    canonical: null,
    hideFromNavDrawer: false,
    isRoughDraft: false,
    title: "niart120's Gen 5 web tool",
    guideVariants: null,
    orderPriority: 20,
    lastUpdated: null,
    description: "",
    layout: "guide",
    type: "externalLink",
    translations: null,
    guideGroupId: "en:gen5-web-tool:Black 2 and White 2|Black and White",
    guideVariantLinks: null,
  },
] as const;
