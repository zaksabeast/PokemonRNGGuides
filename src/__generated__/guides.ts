import React from "react";
import { memoize } from "lodash-es";

export const guides = {
  "/": {
    meta: {
      categories: ["Home"],
      tags: ["info"],
      isNew: false,
      title: "Pokemon RNG - Become The Very Best",
      navDrawerTitle: "Pokemon RNG - Become The Very Best",
      description:
        "Learn retail and emulator RNG with our Pokémon guides and tools",
      slug: "/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Home.mdx",
      translations: null,
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
      categories: ["NDS Tools"],
      tags: ["info"],
      isNew: false,
      title: "3DS Alt Settings - 3DS Settings App for RNG",
      navDrawerTitle: "3DS Alt Settings",
      description:
        "Set 3DS system time without rebooting - useful for faster, more consistent Pokemon RNG attempts.",
      slug: "/3ds-alt-settings/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS Alt Settings.mdx",
      translations: null,
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
      categories: ["NDS Tools"],
      tags: ["info"],
      isNew: false,
      title: "3DS Timer Helper",
      navDrawerTitle: "3DS Timer Helper",
      description:
        "Easier 3DS RNG without homebrew using precise timer starts.",
      slug: "/3ds-helper/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS Helper.mdx",
      translations: null,
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
      categories: ["Home"],
      tags: ["info"],
      isNew: false,
      title: "About us",
      navDrawerTitle: "About us",
      description:
        "Learn retail and emulator RNG with our Pokémon guides and tools",
      slug: "/about/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/About.mdx",
      translations: null,
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
      categories: ["3DS Tools"],
      tags: ["emu"],
      isNew: false,
      title: "Azahar Setup - Install Pokemon CIAs",
      navDrawerTitle: "Azahar Setup",
      description: "Learn how to dump and install Pokemon CIAs on Azahar.",
      slug: "/azahar-setup/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Azahar Setup.mdx",
      translations: null,
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["any"],
      isNew: false,
      title: "Advancing the RNG in Brilliant Diamond and Shining Pearl",
      navDrawerTitle: "Advancing the RNG",
      description:
        "How RNG advances work in Brilliant Diamond and Shining Pearl. Learn what advances the RNG and how to control it for perfect Pokémon.",
      slug: "/bdsp-advance-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx",
      translations: { en: "/bdsp-advance-rng/", fr: "/fr-bdsp-advance-rng/" },
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["any"],
      isNew: false,
      title: "How to Use Chatot for Brilliant Diamond and Shining Pearl",
      navDrawerTitle: "Chatot RNG Tool",
      description:
        "How to use the chatot.pokemonrng.com website for RNG in Brilliant Diamond and Shining Pearl.",
      slug: "/bdsp-chatot/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["emu"],
      isNew: false,
      title: "How to set up Ryujinx & CheatEngine",
      navDrawerTitle: "Ryujinx Set Up",
      description:
        "How to set up Ryujinx or Yuzu and Cheat Engine to RNG in Brilliant Diamond and Shining Pearl using lua scripts.",
      slug: "/bdsp-emulator-setup/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx",
      translations: null,
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["any"],
      isNew: false,
      title: "BDSP RNG Guide - Setup PokeFinder for shiny hunting",
      navDrawerTitle: "PokeFinder Setup",
      description:
        "Step-by-step guide to set up PokeFinder for RNG abuse in Brilliant Diamond and Shining Pearl.",
      slug: "/bdsp-pokefinder/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Black 2 and White 2",
      navDrawerTitle: "Black 2 and White 2",
      description: "Black 2 and White 2 Resources",
      slug: "/black-2-and-white-2/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Black and White",
      navDrawerTitle: "Black and White",
      description: "Black and White Resources",
      slug: "/black-and-white/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl",
      navDrawerTitle: "Brilliant Diamond and Shining Pearl",
      description: "Brilliant Diamond and Shining Pearl Resources",
      slug: "/brilliant-diamond-and-shining-pearl/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/bw2-egg/": {
    meta: {
      categories: ["Black 2 and White 2"],
      tags: ["any"],
      isNew: false,
      title: "Black 2 and White 2 Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Black 2 and White 2 for shiny, high-IV Pokémon.",
      slug: "/bw2-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/BW2 Egg.mdx",
      translations: { en: "/bw2-egg/", zh: "/zh-bw2-egg/" },
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["cfw"],
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs in Brilliant Diamond and Shining Pearl on a CFW Switch for shiny perfect Pokemon.",
      slug: "/cfw-bdsp-egg/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Egg.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["cfw"],
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG flawless or shiny legendaries in Brilliant Diamond and Shining Pearl using CFW.",
      slug: "/cfw-bdsp-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Stationary.mdx",
      translations: null,
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["cfw"],
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl TID/SID RNG",
      navDrawerTitle: "TID/SID RNG",
      description:
        "Learn how to RNG your Trainer and Secret ID in Brilliant Diamond and Shining Pearl with CFW.",
      slug: "/cfw-bdsp-tidandsid/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["cfw"],
      isNew: false,
      title: "Brilliant Diamond and Shining Pearl Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "RNG wild Pokémon in Brilliant Diamond and Shining Pearl using CFW.",
      slug: "/cfw-bdsp-wild/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Brilliant Diamond and Shining Pearl/Wild.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["USUM Challenges"],
      tags: ["challenge"],
      isNew: false,
      title: "USUM Tool Assisted Challenge",
      navDrawerTitle: "Tool Assisted",
      description:
        "Join the leaderboard and earn rewards by completing challenges in USUM",
      slug: "/challenge-usum-ta/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Challenges.mdx",
      translations: null,
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
      categories: ["Gamecube"],
      tags: ["emu"],
      isNew: false,
      title: "(PAL) Channel RNG",
      navDrawerTitle: "(PAL) Channel RNG",
      description: "Step-by-step guide to RNG the Channel Jirachi.",
      slug: "/channel-jirachi/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gamecube/Channel.mdx",
      translations: null,
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
      categories: ["3DS Tools"],
      tags: ["emu"],
      isNew: false,
      title: "3DS Emulator Setup (Azahar/Lime3DS/Citra)",
      navDrawerTitle: "Azahar Setup",
      description:
        "Set up Azahar, Lime3DS, or Citra for 3DS RNG, including cart dumping and installing game updates.",
      slug: "/citrarng-setup/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/CitraRNG Setup.mdx",
      translations: null,
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
      categories: ["GBA Tools"],
      tags: ["emu"],
      isNew: false,
      title: "Connect Dolphin to mGBA",
      navDrawerTitle: "Connect Dolphin to mGBA",
      description:
        "Learn how to redeem Jirachi or transfer your RNGs to a GBA game.",
      slug: "/connect-dolphin-to-gba/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Connect Dolphin To GBA.mdx",
      translations: null,
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "More consistent Platinum RNG",
      navDrawerTitle: "Consistent Platinum RNG",
      description:
        "New research for more consistent Platinum RNG—get shiny, high-IV Pokémon more easily.",
      slug: "/consistent-platinum-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Consistent Platinum RNG.mdx",
      translations: null,
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
  "/crystal/": {
    meta: {
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Crystal",
      navDrawerTitle: "Crystal",
      description: "Crystal Resources",
      slug: "/crystal/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/delete-pokemon-save/": {
    meta: {
      categories: ["GBA Tools", "NDS Tools", "3DS Tools", "Switch Tools"],
      tags: ["any"],
      isNew: false,
      title: "How to delete Pokemon save files",
      navDrawerTitle: "Delete Save Files",
      description: "How to delete a Pokemon save file to start a new game.",
      slug: "/delete-pokemon-save/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Delete Save.mdx",
      translations: {
        en: "/delete-pokemon-save/",
        es: "/es-delete-pokemon-save/",
      },
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
      categories: ["NDS Tools"],
      tags: ["emu"],
      isNew: false,
      title: "Desmume Setup",
      navDrawerTitle: "Desmume Setup",
      description:
        "Learn how to set up DeSmuME for RNG, including cart dumping, save extraction, and using lua scripts.",
      slug: "/desmume-setup/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Desmume Setup.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum",
      navDrawerTitle: "Diamond, Pearl, and Platinum",
      description: "Diamond, Pearl, and Platinum Resources",
      slug: "/diamond-pearl-and-platinum/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum 3DS RNG",
      navDrawerTitle: "3DS RNG",
      description:
        "Learn how to RNG using a 3DS in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.",
      slug: "/dppt-3ds-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS RNG.mdx",
      translations: null,
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "Advancing the RNG in Diamond, Pearl, and Platinum",
      navDrawerTitle: "Advancing the RNG",
      description:
        "Learn how to advance the RNG in Diamond, Pearl, and Platinum. This guide explains different methods like journal flips, Chatot chatters, and NPC actions.",
      slug: "/dppt-advance-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
      translations: { en: "/dppt-advance-rng/", zh: "/zh-dppt-advance-rng/" },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in Diamond, Pearl, and Platinum.",
      slug: "/dppt-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: { en: "/dppt-cute-charm/", zh: "/zh-dppt-cute-charm/" },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["retail"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Retail Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "Learn how to RNG your initial seed in Diamond, Pearl, and Platinum on a physical console.",
      slug: "/dppt-initial-seed-retail/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Retail Initial Seed.mdx",
      translations: null,
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["emu"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "Learn how to RNG your initial seed in Diamond, Pearl, and Platinum.",
      slug: "/dppt-initial-seed/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx",
      translations: { en: "/dppt-initial-seed/", zh: "/zh-dppt-initial-seed/" },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["any"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum PokeRadar RNG",
      navDrawerTitle: "PokeRadar RNG",
      description:
        "Learn two different methods for RNG manipulation with the PokéRadar in Diamond, Pearl, and Platinum.",
      slug: "/dppt-pokeradar-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx",
      translations: {
        en: "/dppt-pokeradar-rng/",
        zh: "/zh-dppt-pokeradar-rng/",
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["any"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Honey Tree RNG",
      navDrawerTitle: "Honey Tree RNG",
      description:
        "Learn how to RNG Pokémon from Honey Trees in Diamond, Pearl, and Platinum for shiny and high-IV results.",
      slug: "/dppt-setup-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Honey.mdx",
      translations: null,
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["retail"],
      isNew: false,
      title: "HeartGold and SoulSilver Cute Charm Glitch TID/SID RNG",
      navDrawerTitle: "Cute Charm & TID/SID RNG",
      description:
        "Learn how to use the Cute Charm Glitch and obtain a specific Trainer ID (TID) and Secret ID (SID) combo on Retail for HeartGold and SoulSilver.",
      slug: "/dppt-tid-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-06-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Retail TID.mdx",
      translations: null,
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["any"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Wild RNG Guide",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Diamond, Pearl, and Platinum for shiny and high-IV results.",
      slug: "/dppt-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx",
      translations: { en: "/dppt-wild/", zh: "/zh-dppt-wild/" },
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
  "/dream-radar-patches/": {
    meta: {
      categories: ["3DS Tools", "Transporter and Dream Radar"],
      tags: ["cfw"],
      isNew: false,
      title: "Dream Radar No-Cart Patch",
      navDrawerTitle: "Dream Radar No-Cart Patch",
      description:
        "Learn how to patch Pokémon Dream Radar on the 3DS to load saves from TWiLightMenu, nds-bootstrap, or emulators — no game cart needed.",
      slug: "/dream-radar-patches/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Dream Radar Patches.mdx",
      translations: null,
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
      categories: ["Emerald"],
      tags: ["info"],
      isNew: false,
      title: "Emerald RNG Info",
      navDrawerTitle: "RNG Info",
      description:
        "Learn how to advance the RNG and improve stability in Pokemon Emerald for consistent results.",
      slug: "/e-tips-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Basic Rules of RNG.mdx",
      translations: { en: "/e-tips-rng/", zh: "/zh-e-tips-rng/" },
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
  "/emerald-mirage-island/": {
    meta: {
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Mirage Island in Emerald",
      navDrawerTitle: "Mirage Island",
      description:
        "Learn how to access Mirage Island in Pokémon Emerald by catching a Pokémon with the correct PID using RNG manipulation.",
      slug: "/emerald-mirage-island/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-11",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        en: "/emerald-mirage-island/",
        zh: "/zh-emerald-mirage-island/",
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
      categories: ["Emerald"],
      tags: ["info"],
      isNew: false,
      title: "Emerald Overview",
      navDrawerTitle: "Overview",
      description:
        "Practical applications of RNG Manipulation and techniques in Pokémon Emerald.",
      slug: "/emerald-overview/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Emerald Overview.mdx",
      translations: { en: "/emerald-overview/", it: "/it-emerald-overview/" },
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
      categories: ["Emerald"],
      tags: ["emu"],
      isNew: false,
      title: "Reseed the RNG using paintings",
      navDrawerTitle: "Painting RNG",
      description:
        "Learn how to reseed the RNG using paintings in Pokémon Emerald to get the Pokémon you want quickly, without the long wait.",
      slug: "/emerald-painting-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Reseed RNG.mdx",
      translations: {
        en: "/emerald-painting-rng/",
        zh: "/zh-emerald-painting-rng/",
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Reseed RNG.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Reseed RNG.mdx?raw");
      return file.default;
    }),
  },
  "/emerald-pokerus-emu/": {
    meta: {
      categories: ["Emerald"],
      tags: ["emu"],
      isNew: false,
      title: "Pokérus in Emerald",
      navDrawerTitle: "Pokérus",
      description: "How to be infected by Pokérus",
      slug: "/emerald-pokerus-emu/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-09",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        en: "/emerald-pokerus-emu/",
        zh: "/zh-emerald-pokerus-emu/",
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Shiny Starter",
      navDrawerTitle: "Shiny Starter",
      description: "Determine your SID by catching a shiny starter",
      slug: "/emerald-shiny-starter/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Shiny Starter.mdx",
      translations: {
        en: "/emerald-shiny-starter/",
        zh: "/zh-emerald-shiny-starter/",
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Find SID with Feebas in Emerald",
      navDrawerTitle: "Find SID with Feebas",
      description: "How to find your Secret ID (SID) in Emerald using Feebas.",
      slug: "/emerald-sid-feebas/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        en: "/emerald-sid-feebas/",
        zh: "/zh-emerald-sid-feebas/",
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
      categories: ["Emerald"],
      tags: ["any"],
      isNew: false,
      title: "Emerald Static3",
      navDrawerTitle: "Emerald Static3",
      description: "Static encounters in Emerald",
      slug: "/emerald-static/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Static.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
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
      categories: ["Emerald"],
      tags: ["any"],
      isNew: false,
      title: "Emerald TID and SID Generator",
      navDrawerTitle: "Emerald TID and SID Generator",
      description: "Generator for TID/SID in Emerald",
      slug: "/emerald-tidsid-generator/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
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
  "/emerald-wild/": {
    meta: {
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Emerald Wild Searcher",
      navDrawerTitle: "Emerald Wild Searcher",
      description: "Emerald Wild Searcher",
      slug: "/emerald-wild/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Wild.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 3/Emerald/Gen 3 Wild.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 3/Emerald/Gen 3 Wild.mdx?raw");
      return file.default;
    }),
  },
  "/emerald/": {
    meta: {
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Emerald",
      navDrawerTitle: "Emerald",
      description: "Emerald Resources",
      slug: "/emerald/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Hubs.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Hubs.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-b2w2-dream-radar/": {
    meta: {
      categories: ["Black 2 and White 2", "Transporter and Dream Radar"],
      tags: ["emu"],
      isNew: false,
      title: "Black 2 and White 2 Dream Radar RNG",
      navDrawerTitle: "Dream Radar RNG",
      description:
        "Learn how to RNG Level 5 Dream Ball legendary Pokémon with Hidden Abilities in Black 2 and White 2.",
      slug: "/emulator-b2w2-dream-radar/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/Dream Radar.mdx",
      translations: {
        en: "/emulator-b2w2-dream-radar/",
        zh: "/zh-emulator-b2w2-dream-radar/",
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
      categories: ["Black 2 and White 2"],
      tags: ["emu"],
      isNew: false,
      title: "Black 2 and White 2 Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description: "Learn how to RNG your initial seed in Black 2 and White 2.",
      slug: "/emulator-b2w2-runasdate-inital-seed/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-b2w2-runasdate-inital-seed/",
        zh: "/zh-emulator-b2w2-runasdate-inital-seed/",
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
      categories: ["Black 2 and White 2"],
      tags: ["emu"],
      isNew: false,
      title: "Black 2 and White 2 Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Black 2 and White 2 for shiny and high-IV results.",
      slug: "/emulator-b2w2-wild/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/Wild RNG Emu.mdx",
      translations: null,
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "Black and White Entralink RNG",
      navDrawerTitle: "Entralink RNG",
      description:
        "Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.",
      slug: "/emulator-bw-entralink/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/Entralink.mdx",
      translations: {
        en: "/emulator-bw-entralink/",
        zh: "/zh-emulator-bw-entralink/",
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "How To Find DS Parameters in Generation 5",
      navDrawerTitle: "DS Parameters",
      description:
        "Learn how to find your DS parameters for successful RNG in Pokémon Black and White.",
      slug: "/emulator-bw-find-ds-parameters/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/Find DS Parameters.mdx",
      translations: {
        en: "/emulator-bw-find-ds-parameters/",
        zh: "/zh-emulator-bw-find-ds-parameters/",
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "Black and White Roamer RNG",
      navDrawerTitle: "Roamer RNG",
      description:
        "Learn how to RNG Tornadus and Thundurus in Black and White for shiny and high-IV results.",
      slug: "/emulator-bw-roamers/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/Roamers.mdx",
      translations: {
        en: "/emulator-bw-roamers/",
        zh: "/zh-emulator-bw-roamers/",
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "Black and White Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description: "Learn how to RNG your initial seed in Black and White.",
      slug: "/emulator-bw-runasdate-initial-seed/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-b2w2-runasdate-inital-seed/",
      type: "baseGuide",
      file: "guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-bw-runasdate-initial-seed/",
        zh: "/zh-emulator-bw-runasdate-initial-seed/",
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "White Forest RNG",
      navDrawerTitle: "White Forest RNG",
      description:
        "Learn how to RNG Pokémon found exclusively in White Forest in Pokémon White for desired IVs, nature, and shininess.",
      slug: "/emulator-bw-white-forest/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/White Forest RNG (Emu).mdx",
      translations: {
        en: "/emulator-bw-white-forest/",
        zh: "/zh-emulator-bw-white-forest/",
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "Black and White Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Black and White for shiny and high-IV results.",
      slug: "/emulator-bw-wild/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-b2w2-wild/",
      type: "baseGuide",
      file: "guides/Gen 5/Wild RNG Emu.mdx",
      translations: null,
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
      categories: ["Gamecube"],
      tags: ["emu"],
      isNew: false,
      title: "Colosseum General RNG",
      navDrawerTitle: "Colosseum General RNG",
      description: "RNG in Colosseum",
      slug: "/emulator-colosseum-general/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gamecube/Colosseum General Guide (Emu).mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in Diamond, Pearl, and Platinum.",
      slug: "/emulator-dppt-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/dppt-cute-charm/",
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-dppt-cute-charm/",
        zh: "/zh-emulator-dppt-cute-charm/",
      },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["emu"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.",
      slug: "/emulator-dppt-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx",
      translations: { en: "/emulator-dppt-egg/", zh: "/zh-emulator-dppt-egg/" },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "How to RNG in Diamond, Pearl, and Platinum Using PokeFinder",
      navDrawerTitle: "PokeFinder Setup",
      description:
        "Step-by-step guide to RNG Pokémon in Diamond, Pearl, and Platinum using PokeFinder.",
      slug: "/emulator-dppt-pokefinder-setup/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx",
      translations: null,
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["emu"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies.",
      slug: "/emulator-dppt-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx",
      translations: {
        en: "/emulator-dppt-stationary/",
        zh: "/zh-emulator-dppt-stationary/",
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["emu"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum TID/SID RNG",
      navDrawerTitle: "TID/SID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Diamond, Pearl, and Platinum.",
      slug: "/emulator-dppt-tid-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx",
      translations: null,
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
      categories: ["Emerald"],
      tags: ["emu"],
      isNew: false,
      title: "Emerald Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/emulator-emerald-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-09",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Egg RNG.mdx",
      translations: {
        en: "/emulator-emerald-egg/",
        it: "/it-emulator-emerald-egg/",
        zh: "/zh-emulator-emerald-egg/",
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "FireRed and LeafGreen Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG shiny 6IV legendaries in Pokémon FireRed and LeafGreen using static encounters.",
      slug: "/emulator-flrg-stationary-and-gift/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Static RNG.mdx",
      translations: {
        en: "/emulator-flrg-stationary-and-gift/",
        zh: "/zh-emulator-flrg-stationary-and-gift/",
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "FireRed and LeafGreen Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs in Pokémon FireRed and LeafGreen for perfect IVs, natures, and shinies.",
      slug: "/emulator-frlg-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Egg RNG.mdx",
      translations: { en: "/emulator-frlg-egg/", zh: "/zh-emulator-frlg-egg/" },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "FireRed and LeafGreen Static RNG",
      navDrawerTitle: "Static RNG",
      description: "Static v2 RNG",
      slug: "/emulator-frlg-stationary/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Stationary v2 Emu.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "FireRed and LeafGreen Wild RNG",
      navDrawerTitle: "FireRed and LeafGreen Wild RNG",
      description:
        "Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method.",
      slug: "/emulator-frlg-wild-v2/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-frlg-wild/",
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx",
      translations: null,
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "FireRed and LeafGreen Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method.",
      slug: "/emulator-frlg-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Wild RNG.mdx",
      translations: {
        en: "/emulator-frlg-wild/",
        zh: "/zh-emulator-frlg-wild/",
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and Soulsilver Egg RNG",
      navDrawerTitle: "Egg RNG",
      description: "Breeding RNG",
      slug: "/emulator-hgss-breeding/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Breeding RNG (Emu).mdx",
      translations: null,
      displayAttributes: [],
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Breeding RNG (Emu).mdx"
        ),
    ),
    getRawFile: memoize(async () => {
      const file = await import(
        "~/../guides/Gen 4/HeartGold and SoulSilver/Breeding RNG (Emu).mdx?raw"
      );
      return file.default;
    }),
  },
  "/emulator-hgss-cute-charm/": {
    meta: {
      categories: ["HeartGold and SoulSilver"],
      tags: ["info"],
      isNew: false,
      title: "HeartGold and SoulSilver Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in HeartGold and SoulSilver.",
      slug: "/emulator-hgss-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/hgss-cute-charm/",
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-hgss-cute-charm/",
        zh: "/zh-emulator-hgss-cute-charm/",
      },
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and Soulsilver Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in HeartGold and SoulSilver for shiny, high-IV Pokémon.",
      slug: "/emulator-hgss-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Egg.mdx",
      translations: { en: "/emulator-hgss-egg/", zh: "/zh-emulator-hgss-egg/" },
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and SoulSilver Special Wild RNG",
      navDrawerTitle: "Special Wild RNG",
      description: "Special Wild RNG",
      slug: "/emulator-hgss-special-wild/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Special Wild Case (Emu).mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and SoulSilver Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in HeartGold and SoulSilver for perfect IVs, natures, and shinies.",
      slug: "/emulator-hgss-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx",
      translations: {
        en: "/emulator-hgss-stationary/",
        zh: "/zh-emulator-hgss-stationary/",
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and SoulSilver TID/SID RNG",
      navDrawerTitle: "TID/SID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in HeartGold and SoulSilver.",
      slug: "/emulator-hgss-tid-sid/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/TID SID.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and SoulSilver Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Diamond, Pearl, and Platinum for shiny and high-IV results.",
      slug: "/emulator-hgss-wild/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Wild RNG - Emulator.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and SoulSilver Wondercard RNG",
      navDrawerTitle: "Wondercard RNG",
      description: "How to RNG Wondercards",
      slug: "/emulator-hgss-wondercard/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Wondercard.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Omega Ruby and Alpha Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire DexNav RNG",
      navDrawerTitle: "DexNav RNG",
      description:
        "Learn how to RNG Pokémon using the DexNav feature in Omega Ruby and Alpha Sapphire.",
      slug: "/emulator-oras-dexnav/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/DexNav.mdx",
      translations: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/DexNav.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 6/DexNav.mdx?raw");
      return file.default;
    }),
  },
  "/emulator-rs-dead-battery-stationary/": {
    meta: {
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Dead Battery Static RNG",
      navDrawerTitle: "Static Dead Battery RNG",
      description:
        "Learn how to RNG static Pokémon in Ruby and Sapphire for perfect IVs, natures, and shinies.",
      slug: "/emulator-rs-dead-battery-stationary/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Dead Battery Stationary RNG  (Emulator).mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Ruby and Sapphire for shiny, high-IV Pokémon.",
      slug: "/emulator-rs-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Egg RNG.mdx",
      translations: { en: "/emulator-rs-egg/", zh: "/zh-emulator-rs-egg/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire.",
      slug: "/emulator-rs-live-battery-tid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Live Battery TID RNG.mdx",
      translations: null,
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Live Battery Static RNG",
      navDrawerTitle: "Static Live Battery RNG",
      description:
        "Learn how to RNG static Pokémon in Ruby and Sapphire for perfect IVs, natures, and shinies.",
      slug: "/emulator-rs-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx",
      translations: {
        en: "/emulator-rs-stationary/",
        zh: "/zh-emulator-rs-stationary/",
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Ruby and Sapphire for shiny and high-IV results.",
      slug: "/emulator-rs-wild/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/RSE Wild RNG - Dry Battery Emulator.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Shiny Wishmaker Jirachi RNG",
      navDrawerTitle: "Wishmaker Jirachi RNG",
      description:
        "Learn how to RNG the Shiny Wishmaker Jirachi from the Colosseum Bonus Disc in Ruby and Sapphire.",
      slug: "/emulator-rs-wishmaker/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-18",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: {
        en: "/emulator-rs-wishmaker/",
        zh: "/zh-emulator-rs-wishmaker/",
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
      categories: ["Sun and Moon"],
      tags: ["emu"],
      isNew: false,
      title: "Sun and Moon Time Finder (Citra)",
      navDrawerTitle: "Time Finder",
      description: "Finding times to get specific RNG seeds.",
      slug: "/emulator-sm-time-finder/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/emulator-usum-time-finder/",
      type: "baseGuide",
      file: "guides/Gen 7/Time Finder.js (Citra).mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["emu"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Time Finder (Citra)",
      navDrawerTitle: "Time Finder",
      description: "Finding times to get specific RNG seeds.",
      slug: "/emulator-usum-time-finder/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Time Finder.js (Citra).mdx",
      translations: null,
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
      categories: ["GBA Tools", "NDS Tools", "3DS Tools", "Switch Tools"],
      tags: ["any"],
      isNew: false,
      title: "Como eliminar partidas de Pokémon",
      navDrawerTitle: "Como eliminar partidas de Pokémon",
      description: "Como eliminar partidas de Pokémon",
      slug: "/es-delete-pokemon-save/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/delete-pokemon-save/", language: "es" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Tools and Emulators/Delete Save.mdx",
      translations: {
        en: "/delete-pokemon-save/",
        es: "/es-delete-pokemon-save/",
      },
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
  "/es-gen2-celebi/": {
    meta: {
      categories: ["Gold, Silver, Crystal"],
      tags: ["cfw"],
      isNew: false,
      title: "Celebi",
      navDrawerTitle: "Celebi",
      description: "How to get a shiny Fairy",
      slug: "/es-gen2-celebi/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-03-02",
      translation: { enSlug: "/gen2-celebi/", language: "es" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 2/Celebi.mdx",
      translations: {
        es: "/es-gen2-celebi/",
        en: "/gen2-celebi/",
        zh: "/zh-gen2-celebi/",
      },
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
      categories: ["Gold, Silver, Crystal"],
      tags: ["cfw"],
      isNew: false,
      title: "RNG de Iniciales en Cristal",
      navDrawerTitle: "RNG de Iniciales en Cristal",
      description: "Learn how to RNG shiny starters in Pokémon Crystal.",
      slug: "/es-gen2-starters/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/gen2-starters/", language: "es" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/es/Gen 2/Starter.mdx",
      translations: {
        es: "/es-gen2-starters/",
        en: "/gen2-starters/",
        zh: "/zh-gen2-starters/",
      },
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
  "/experiments/": {
    meta: {
      categories: ["User Settings"],
      tags: ["any"],
      isNew: false,
      title: "Experimental Features",
      navDrawerTitle: "Experimental Features",
      description: "Help us test new features and provide feedback!",
      slug: "/experiments/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Experiments.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "FireRed and LeafGreen",
      navDrawerTitle: "FireRed and LeafGreen",
      description: "FireRed and LeafGreen Resources",
      slug: "/fire-red-and-leaf-green/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Brilliant Diamond and Shining Pearl"],
      tags: ["any"],
      isNew: false,
      title:
        "Faire avancer la RNG sur pokemon Diamant Etincelant et Perle Scintillante",
      navDrawerTitle: "Faire avancer la rng",
      description:
        "Comment les avances de RNG fonctionnent dans pokemon Diamand Etincelant et Perle Scintillante. Apprenez comment controler ces avances pour rencontrer des pokemon parfaits!",
      slug: "/fr-bdsp-advance-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/bdsp-advance-rng/", language: "fr" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/fr/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx",
      translations: { en: "/bdsp-advance-rng/", fr: "/fr-bdsp-advance-rng/" },
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
      categories: ["Switch Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "Installer CaptureSight",
      navDrawerTitle: "Installer Capture Sight",
      description:
        "Apprenez a installer CaptureSight sur votre Switch pour faciliter la manipulation de RNG et attraper des Pokemon parfaits !",
      slug: "/fr-install-capturesight/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/install-capturesight/", language: "fr" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/fr/Tools and Emulators/CaptureSight Install.mdx",
      translations: {
        fr: "/fr-install-capturesight/",
        en: "/install-capturesight/",
      },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["retail"],
      isNew: false,
      title: "Find FireRed and LeafGreen SID",
      navDrawerTitle: "Find SID",
      description:
        "Various methods to finding an SID in Firered and LeafGreen.",
      slug: "/frlg-gen3-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID.mdx",
      translations: { en: "/frlg-gen3-sid/", zh: "/zh-frlg-gen3-sid/" },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "Initial Seed Botting for FireRed and LeafGreen",
      navDrawerTitle: "Initial Seed Botting",
      description:
        "Learn how to use the Initial Seed Bot in FireRed and LeafGreen for better control over your RNG results.",
      slug: "/frlg-seeding-bot/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx",
      translations: { en: "/frlg-seeding-bot/", zh: "/zh-frlg-seeding-bot/" },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["any"],
      isNew: false,
      title: "FireRed and LeafGreen Static3",
      navDrawerTitle: "FireRed and LeafGreen Static3",
      description: "Static encounters in FireRed and LeafGreen",
      slug: "/frlg-static/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Static.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
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
      categories: ["FireRed and LeafGreen"],
      tags: ["any"],
      isNew: false,
      title: "FRLG TID and SID Generator",
      navDrawerTitle: "FRLG TID and SID Generator",
      description: "Generator for TID and SID in FRLG",
      slug: "/frlg-tidsid-generator/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
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
      categories: ["FireRed and LeafGreen"],
      tags: ["any"],
      isNew: false,
      title: "Basic rules of Gen 3 RNG",
      navDrawerTitle: "Basic rules of Gen 3 RNG",
      description:
        "Learn how to advance the RNG and improve stability in Pokémon FireRed and LeafGreen for consistent results.",
      slug: "/frlg-tips-rng/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/FireRed and LeafGreen/Basic Rules of RNG.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Gamecube",
      navDrawerTitle: "Gamecube",
      description: "Gamecube Resources",
      slug: "/gamecube/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["GBA Technical Documentation"],
      tags: ["info"],
      isNew: false,
      title: "Lead Impact on Wild Methods in Emerald",
      navDrawerTitle: "Methods & Lead",
      description:
        "Understanding why the lead impacts which Wild method is triggered",
      slug: "/gba-methods-lead-impact/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-06-18",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/GBA Methods Part2.mdx",
      translations: null,
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
      categories: ["GBA Technical Documentation"],
      tags: ["info"],
      isNew: false,
      title: "Methods 1-4 in Emerald",
      navDrawerTitle: "Methods 1-4",
      description:
        "What is a Method, the reason why Methods 1-4 exist, and how they impact Pokémon generation.",
      slug: "/gba-methods/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/GBA Methods.mdx",
      translations: { en: "/gba-methods/", zh: "/zh-gba-methods/" },
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
      categories: ["GBA Overview"],
      tags: ["any"],
      isNew: false,
      title: "GBA Overview",
      navDrawerTitle: "Overview",
      description:
        "Particularities, key RNG concepts, and version differences of GBA games.",
      slug: "/gba-overview/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/GBA Overview.mdx",
      translations: null,
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
      categories: ["GBA Technical Documentation"],
      tags: ["info"],
      isNew: false,
      title: "Pokérus",
      navDrawerTitle: "Pokérus",
      description: "How Pokérus infection is triggered",
      slug: "/gba-pokerus-technical/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-13",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx",
      translations: {
        en: "/gba-pokerus-technical/",
        zh: "/zh-gba-pokerus-technical/",
      },
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
      categories: ["GBA Technical Documentation"],
      tags: ["info"],
      isNew: false,
      title: "VBlank in Emerald",
      navDrawerTitle: "VBlank",
      description:
        "What are Vblanks in Emerald and their impact on Pokémon generation.",
      slug: "/gba-vblank/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Vblank.mdx",
      translations: { en: "/gba-vblank/", zh: "/zh-gba-vblank/" },
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
      categories: ["Gamecube"],
      tags: ["emu"],
      isNew: false,
      title: "Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "How to use Dolphin to set up Initial Seed RNG for all GameCube games.",
      slug: "/gc-initial/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gamecube/Initial Seed RNG.mdx",
      translations: null,
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
      categories: ["Gold, Silver, Crystal"],
      tags: ["cfw"],
      isNew: false,
      title: "Celebi in Crystal",
      navDrawerTitle: "Celebi RNG",
      description:
        "Learn how to obtain a shiny Celebi in Pokémon Crystal using RNG manipulation.",
      slug: "/gen2-celebi/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-02",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 2/Celebi.mdx",
      translations: {
        es: "/es-gen2-celebi/",
        en: "/gen2-celebi/",
        zh: "/zh-gen2-celebi/",
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
      categories: ["Gold, Silver, Crystal"],
      tags: ["info"],
      isNew: false,
      title: "Gen 2 RNG Research",
      navDrawerTitle: "Gen 2 RNG Research",
      description: "Help research the Gen 2 RNG",
      slug: "/gen2-research/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 2/RngResearch.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/RngResearch.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 2/RngResearch.mdx?raw");
      return file.default;
    }),
  },
  "/gen2-starters/": {
    meta: {
      categories: ["Gold, Silver, Crystal"],
      tags: ["cfw"],
      isNew: false,
      title: "Crystal Starter RNG",
      navDrawerTitle: "Starter RNG",
      description: "Learn how to RNG shiny starters in Pokémon Crystal.",
      slug: "/gen2-starters/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 2/Starter.mdx",
      translations: {
        es: "/es-gen2-starters/",
        en: "/gen2-starters/",
        zh: "/zh-gen2-starters/",
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
      categories: ["Emerald"],
      tags: ["info"],
      isNew: false,
      title: "Glossary",
      navDrawerTitle: "Glossary",
      description:
        "List of important terms related to Pokémon RNG manipulation in Generation III games.",
      slug: "/gen3-glossary/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-17",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Glossary.mdx",
      translations: { en: "/gen3-glossary/", it: "/it-gen3-glossary/" },
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Find Emerald SID",
      navDrawerTitle: "Find SID",
      description: "Various methods to finding an SID in Emerald.",
      slug: "/gen3-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID.mdx",
      translations: { en: "/gen3-sid/", zh: "/zh-gen3-sid/" },
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Heart Gold and Soul Silver",
      navDrawerTitle: "Heart Gold and Soul Silver",
      description: "Heart Gold and Soul Silver Resources",
      slug: "/heart-gold-and-soul-silver/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Home"],
      tags: ["info"],
      isNew: false,
      title: "Translation Helper",
      navDrawerTitle: "Translation Helper",
      description:
        "Help us translate Pokémon guides and tools into your language",
      slug: "/help-translate/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Translations.mdx",
      translations: null,
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["info"],
      isNew: false,
      title: "HeartGold and Soulsilver 3DS RNG",
      navDrawerTitle: "3DS RNG",
      description:
        "Learn how to RNG using a 3DS in HeartGold and SoulSilver for shiny, high-IV Pokémon.",
      slug: "/hgss-3ds-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-07-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/3DS RNG.mdx",
      translations: null,
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["info"],
      isNew: false,
      title: "HeartGold and SoulSilver Cute Charm Glitch Mechanics",
      navDrawerTitle: "Cute Charm Mechanics",
      description:
        "Learn about how the Cute Charm glitch works in HeartGold and SoulSilver.",
      slug: "/hgss-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Cute Charm.mdx",
      translations: { en: "/hgss-cute-charm/", zh: "/zh-hgss-cute-charm/" },
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "HeartGold and Soulsilver Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description:
        "Learn how to RNG your initial seed in HeartGold and SoulSilver.",
      slug: "/hgss-initial-seed/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx",
      translations: null,
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["any"],
      isNew: false,
      title: "Advancing the RNG in HeartGold and SoulSilver",
      navDrawerTitle: "Advancing the RNG",
      description:
        "Learn how to advance the RNG in HeartGold and SoulSilver. This guide explains different methods like Chatot chatters, radio, and NPC actions.",
      slug: "/hgss-rng-advance/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx",
      translations: { en: "/hgss-rng-advance/", zh: "/zh-hgss-rng-advance/" },
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["retail"],
      isNew: false,
      title: "HeartGold and SoulSilver Cute Charm Glitch TID/SID RNG",
      navDrawerTitle: "Cute Charm & TID/SID RNG",
      description:
        "Learn how to use the Cute Charm Glitch and obtain a specific Trainer ID (TID) and Secret ID (SID) combo on Retail for HeartGold and SoulSilver.",
      slug: "/hgss-tid-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-06-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Retail TID.mdx",
      translations: null,
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
      categories: ["Switch Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "Install CaptureSight",
      navDrawerTitle: "CaptureSight",
      description:
        "Learn how to install CaptureSight on your Switch to assist with RNG and perfect Pokémon hunting.",
      slug: "/install-capturesight/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/CaptureSight Install.mdx",
      translations: {
        fr: "/fr-install-capturesight/",
        en: "/install-capturesight/",
      },
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
      categories: ["3DS Tools"],
      tags: ["emu"],
      isNew: false,
      title: "PokeReader Azahar",
      navDrawerTitle: "PokeReader Azahar",
      description:
        "Learn how to install PokeReader on a 3DS emulator to assist with RNG and perfect Pokémon hunting.",
      slug: "/install-pokereader-emu/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Emu PokeReader.mdx",
      translations: null,
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
      categories: ["3DS Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "PokeReader 3DS",
      navDrawerTitle: "PokeReader 3DS",
      description:
        "Learn how to install PokeReader on your 3DS to assist with RNG and perfect Pokémon hunting.",
      slug: "/install-pokereader/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/3DS PokeReader.mdx",
      translations: {
        en: "/install-pokereader/",
        zh: "/zh-install-pokereader/",
      },
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
  "/it-emerald-overview/": {
    meta: {
      categories: ["Emerald"],
      tags: ["info"],
      isNew: false,
      title: "Panoramica di Smeraldo",
      navDrawerTitle: "Overview",
      description:
        "Applicazioni pratiche della manipolazione RNG e tecniche in Pokémon Smeraldo.",
      slug: "/it-emerald-overview/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/emerald-overview/", language: "it" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Emerald Overview.mdx",
      translations: { en: "/emerald-overview/", it: "/it-emerald-overview/" },
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
  "/it-emulator-emerald-egg/": {
    meta: {
      categories: ["Emerald"],
      tags: ["emu"],
      isNew: false,
      title: "RNG UOVA SMERALDO",
      navDrawerTitle: "RNG UOVA SMERALDO",
      description:
        "Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/it-emulator-emerald-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-03-09",
      translation: { enSlug: "/emulator-emerald-egg/", language: "it" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Emulator Egg RNG.mdx",
      translations: {
        en: "/emulator-emerald-egg/",
        it: "/it-emulator-emerald-egg/",
        zh: "/zh-emulator-emerald-egg/",
      },
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
  "/it-gen3-glossary/": {
    meta: {
      categories: ["Emerald"],
      tags: ["info"],
      isNew: false,
      title: "Glossary",
      navDrawerTitle: "Glossary",
      description:
        "List of important terms related to Pokémon RNG manipulation in Generation III games.",
      slug: "/it-gen3-glossary/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-05-17",
      translation: { enSlug: "/gen3-glossary/", language: "it" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 3/Emerald/Glossary.mdx",
      translations: { en: "/gen3-glossary/", it: "/it-gen3-glossary/" },
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
  "/it-retail-dppt-starter/": {
    meta: {
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["retail"],
      isNew: false,
      title: "RNG di Starter per Diamante, Perla e Platino",
      navDrawerTitle: "Starter RNG",
      description:
        "Impara a manipolare l'RNG degli starter in Diamante, Perla e Platino per ottenere Pokémon shiny con IV alti.",
      slug: "/it-retail-dppt-starter/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-06-15",
      translation: { enSlug: "/retail-dppt-starter/", language: "it" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-dppt-starter/",
        en: "/retail-dppt-starter/",
      },
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
  "/it-retail-hgss-starter/": {
    meta: {
      categories: ["HeartGold and SoulSilver"],
      tags: ["retail"],
      isNew: false,
      title: "RNG di Starter per Oro HeartGold e Argento SoulSilver",
      navDrawerTitle: "Starter RNG",
      description:
        "Impara a manipolare l'RNG degli starter in HeartGold e SoulSilver per ottenere Pokémon shiny con IV alti.",
      slug: "/it-retail-hgss-starter/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-06-15",
      translation: { enSlug: "/retail-hgss-starter/", language: "it" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/it/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-hgss-starter/",
        en: "/retail-hgss-starter/",
      },
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
  "/legends-arceus/": {
    meta: {
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Legends Arceus",
      navDrawerTitle: "Legends Arceus",
      description: "Legends Arceus Resources",
      slug: "/legends-arceus/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Meteor Jirachi RNG",
      navDrawerTitle: "Meteor Jirachi RNG",
      description:
        "Learn how to RNG a Meteor Jirachi with different shinies than Wishmaker.",
      slug: "/meteor-jirachi/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-18",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: { en: "/meteor-jirachi/", zh: "/zh-meteor-jirachi/" },
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
      categories: ["GBA Tools"],
      tags: ["emu"],
      isNew: false,
      title: "mGBA Setup",
      navDrawerTitle: "mGBA Setup",
      description:
        "Learn how to set up mGBA for GBA Pokémon RNG, including lua scripting support.",
      slug: "/mgba-setup/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/mGBA Setup.mdx",
      translations: { en: "/mgba-setup/", zh: "/zh-mgba-setup/" },
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
      categories: ["3DS Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "How to Install PCalc",
      navDrawerTitle: "How to Install PCalc",
      description:
        "Learn how to install PCalc on your 3DS to assist with RNG in Pokémon games like X/Y, ORAS, Sun/Moon, and USUM.",
      slug: "/misc-3ds-installing-pcalc/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/How to Install PCalc.mdx",
      translations: null,
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
      categories: ["3DS Tools"],
      tags: ["cfw"],
      isNew: false,
      title:
        "How to Use IPS Patches on a 3DS or Emulator (Luma3DS, Azahar, Citra)",
      navDrawerTitle: "IPS Patches",
      description:
        "Learn how to apply IPS patches like instant text and no outlines using Luma3DS, Azahar, or Citra. Includes 3DS setup, emulator mods, and a merge tool.",
      slug: "/misc-3ds-ips-luma-citra/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["info"],
      isNew: false,
      title: "Island Scan Pokemon in Sun & Moon - Full List by Day & Location",
      navDrawerTitle: "Island Scan Pokemon",
      description:
        "Check out an easy-to-use list of Island Scan Pokémon for Sun and Moon, organized by day and location for quick reference.",
      slug: "/misc-3ds-island-scan-sm/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan Pokemon SM.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["info"],
      isNew: false,
      title:
        "Island Scan Pokemon in Ultra Sun & Ultra Moon - Full List by Day & Location",
      navDrawerTitle: "Island Scan Pokemon",
      description:
        "Check out an easy-to-use list of Island Scan Pokémon for Ultra Sun and Ultra Moon, organized by day and location for quick reference.",
      slug: "/misc-3ds-island-scan-usum/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan Pokemon USUM.mdx",
      translations: null,
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
      categories: ["Transporter and Dream Radar"],
      tags: ["info"],
      isNew: false,
      title: "Transporter EXP to Nature Conversion Table (VC)",
      navDrawerTitle: "Nature Conversion Table",
      description:
        "Quickly check what nature your Virtual Console Pokémon will get when using Pokémon Transporter.",
      slug: "/misc-3ds-transporter-nature-tables/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Transporter/Nature Table.mdx",
      translations: null,
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
      categories: ["GBA Tools"],
      tags: ["emu"],
      isNew: false,
      title: "Connect Dolphin to VBA",
      navDrawerTitle: "Connect Dolphin to VBA",
      description:
        "Learn how to redeem Jirachi or transfer your RNGs to a GBA game.",
      slug: "/misc-dolphin-connect-vba/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx",
      translations: null,
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
      categories: ["GBA Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "GBA BIOS File - What It Is and How to Extract It for Emulators",
      navDrawerTitle: "GBA Bios",
      description:
        "Learn what the GBA BIOS is, why emulators like mGBA and VBA need it, and how to legally extract it from real hardware. Step-by-step guide included.",
      slug: "/misc-dolphin-gba-bios/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/How to Extract GBA Bios.mdx",
      translations: {
        en: "/misc-dolphin-gba-bios/",
        zh: "/zh-misc-dolphin-gba-bios/",
      },
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Wild NPC Locations and Corrections",
      navDrawerTitle: "Wild NPC Locations",
      description:
        "Where to place your character and the correction needed for each area to RNG wild Pokémon in Sun and Moon.",
      slug: "/misc-sm-wild-spots/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Wild Spots.mdx",
      translations: null,
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
      categories: ["GBA Tools", "NDS Tools", "3DS Tools"],
      tags: ["retail"],
      isNew: false,
      title: "Mystic Timer - Online Pokémon RNG Timer for Gen 3, 4, and 7",
      navDrawerTitle: "Mystic Timer",
      description:
        "Mystic Timer is a mobile-friendly alternative to Eon Timer. Perfect for Gen 3, 4, and 7 Pokémon RNG on any device, including Mac, Linux, iOS, and Android.",
      slug: "/mystic-timer/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-18",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Timer.mdx",
      translations: null,
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
      categories: ["GBA Tools"],
      tags: ["emu"],
      isNew: false,
      title: "No Dolphin Patch",
      navDrawerTitle: "No Dolphin Patch",
      description:
        "Use this patch to RNG the Wishmaker Jirachi without needing the Dolphin emulator.",
      slug: "/no-dolphin-patch/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-03",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/No Dolphin Patch.mdx",
      translations: null,
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
      categories: ["3DS Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "NTR Helper Usage",
      navDrawerTitle: "NTR Helper Usage",
      description: "Learn how to use the NTR Helper Tool in 3DSRNGTool.",
      slug: "/ntr-helper-usage/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/NTR Helper Usage.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire",
      navDrawerTitle: "Omega Ruby and Alpha Sapphire",
      description: "Omega Ruby and Alpha Sapphire Resources",
      slug: "/omega-ruby-and-alpha-sapphire/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Omega Ruby and Alpha Sapphire"],
      tags: ["cfw"],
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire Mirage Spot RNG",
      navDrawerTitle: "Mirage Spot RNG",
      description:
        "Learn how to RNG access to any Mirage Spots in Omega Ruby and Alpha Sapphire for rare encounters and shiny Pokémon.",
      slug: "/oras-mirage-spots/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-14",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/Mirage Spot.mdx",
      translations: null,
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
      categories: ["Omega Ruby and Alpha Sapphire"],
      tags: ["cfw"],
      isNew: false,
      title: "Remove Time Penalties in Omega Ruby and Alpha Sapphire",
      navDrawerTitle: "Remove Time Penalties",
      description:
        "Learn how to change the time in Omega Ruby and Alpha Sapphire without triggering time penalties.",
      slug: "/oras-remove-time-penalty/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-14",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/Remove Time Penalties.mdx",
      translations: null,
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
      categories: ["Gamecube"],
      tags: ["emu"],
      isNew: false,
      title: "XD Eevee PAL RNG",
      navDrawerTitle: "XD Eevee PAL RNG",
      description: "How to RNG the starter Eevee with a PAL Pokemon XD.",
      slug: "/pal-xd-eevee/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx",
      translations: null,
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
      categories: ["X and Y"],
      tags: ["cfw"],
      isNew: false,
      title: "X and Y Friend Safari RNG",
      navDrawerTitle: "Friend Safari RNG",
      description:
        "Learn how to RNG shiny 6IV Pokémon from the Friend Safari in X and Y, including Ditto and other rare species.",
      slug: "/pcalc-xy-friend-safari/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/Friend Safari RNG Guide.mdx",
      translations: null,
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
      categories: ["X and Y"],
      tags: ["cfw"],
      isNew: false,
      title: "X and Y TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in X and Y.",
      slug: "/pcalc-xy-tid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/XY TID.mdx",
      translations: null,
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
      categories: ["GBA Tools", "NDS Tools", "3DS Tools", "Switch Tools"],
      tags: ["any"],
      isNew: false,
      title: "Pokemon RNG Tool - Use PokeFinder for Gens 3-5 & 8",
      navDrawerTitle: "PokeFinder",
      description:
        "Pokefinder is a cross-platform RNG tool for Pokémon Generations 3-5 & 8. Supports shiny hunting, TID/SID RNG, breeding, and more. Works for emulators and real hardware.",
      slug: "/pokefinder/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/PokeFinder.mdx",
      translations: null,
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
      categories: ["3DS Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "PokeReader - 3DS Overlay for Pokemon RNG",
      navDrawerTitle: "What is PokeReader",
      description:
        "PokeReader is a 3GX plugin for the 3DS that adds emulator-style tools like pausing, frame advancing, and overlays - perfect for RNG manipulation on real hardware.",
      slug: "/pokereader/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/PokeReader.mdx",
      translations: null,
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
      categories: ["Black and White"],
      tags: ["retail"],
      isNew: false,
      title: "Black and White Retail Entralink RNG",
      navDrawerTitle: "Entralink RNG",
      description:
        "Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.",
      slug: "/retail-bw-entralink/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 5/Retail Entralink.mdx",
      translations: null,
      displayAttributes: [],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Retail Entralink.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 5/Retail Entralink.mdx?raw");
      return file.default;
    }),
  },
  "/retail-dppt-starter/": {
    meta: {
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["retail"],
      isNew: false,
      title: "Diamond, Pearl, and Platinum Starter RNG",
      navDrawerTitle: "Starter RNG",
      description:
        "Learn how to RNG starters in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.",
      slug: "/retail-dppt-starter/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-06-15",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-dppt-starter/",
        en: "/retail-dppt-starter/",
      },
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Starters.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 4/Starters.mdx?raw");
      return file.default;
    }),
  },
  "/retail-emerald-egg/": {
    meta: {
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Retail Emerald Egg RNG",
      navDrawerTitle: "Egg RNG",
      description:
        "Learn how to Retail RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/retail-emerald-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-18",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Retail Egg.mdx",
      translations: {
        en: "/retail-emerald-egg/",
        zh: "/zh-retail-emerald-egg/",
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Emerald Retail Wild RNG",
      navDrawerTitle: "Retail Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Pokémon Emerald on a retail console for perfect IVs, natures, and shinies.",
      slug: "/retail-emerald-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Retail Wild RNG.mdx",
      translations: {
        en: "/retail-emerald-wild/",
        zh: "/zh-retail-emerald-wild/",
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["retail"],
      isNew: false,
      title: "HeartGold and SoulSilver Starter RNG",
      navDrawerTitle: "Starter RNG",
      description:
        "Learn how to RNG starters in HeartGold and SoulSilver for shiny, high-IV Pokémon.",
      slug: "/retail-hgss-starter/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-06-15",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 4/Starters.mdx",
      translations: {
        it: "/it-retail-hgss-starter/",
        en: "/retail-hgss-starter/",
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
      categories: ["Omega Ruby and Alpha Sapphire"],
      tags: ["cfw"],
      isNew: false,
      title:
        "Omega Ruby and Alpha Sapphire Egg RNG with Masuda Method or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Omega Ruby and Alpha Sapphire for shiny, high-IV Pokémon.",
      slug: "/retail-oras-egg-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["Omega Ruby and Alpha Sapphire"],
      tags: ["cfw"],
      isNew: false,
      title:
        "Omega Ruby and Alpha Sapphire Egg RNG Without Masuda or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Omega Ruby and Alpha Sapphire for shiny, high-IV Pokémon.",
      slug: "/retail-oras-egg-no-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["Omega Ruby and Alpha Sapphire"],
      tags: ["cfw"],
      isNew: false,
      title: "Omega Ruby and Alpha Sapphire TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Omega Ruby and Alpha Sapphire.",
      slug: "/retail-oras-tid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-13",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/ORAS TID.mdx",
      translations: null,
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "Ruby and Sapphire Retail TID RNG",
      navDrawerTitle: "TID RNG",
      description:
        "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire.",
      slug: "/retail-rubysapphire-tid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx",
      translations: {
        en: "/retail-rubysapphire-tid/",
        zh: "/zh-retail-rubysapphire-tid/",
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
      categories: ["Sun and Moon"],
      tags: ["any"],
      isNew: false,
      title: "Sun and Moon Egg RNG with Masuda and/or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Sun and Moon for shiny, high-IV Pokémon.",
      slug: "/retail-sm-egg-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-egg-mmsc/",
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Egg RNG without Masuda and/or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Sun and Moon for shiny, high-IV Pokémon.",
      slug: "/retail-sm-egg-no-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-egg-no-mmsc/",
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["retail"],
      isNew: false,
      title: "Sun and Moon retail finding egg seeds",
      navDrawerTitle: "Find Egg Seeds",
      description:
        "Find egg seeds for Egg RNG in Sun and Moon using the Magikarp Method — no CFW needed.",
      slug: "/retail-sm-egg-seed-no-cfw/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-egg-seed-no-cfw/",
      type: "baseGuide",
      file: "guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Timeline with Fidget RNG",
      navDrawerTitle: "Timeline Fidget RNG",
      description:
        "Learn how to create a timeline with character fidgets in Sun and Moon.",
      slug: "/retail-sm-fidget/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-fidget/",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline With Fidget Guide.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["retail"],
      isNew: false,
      title: "Sun and Moon finding your initial seed in with clocks",
      navDrawerTitle: "Find Initial Seed",
      description:
        "Learn how to find your initial seed in Sun and Moon using clock patterns — no custom firmware required.",
      slug: "/retail-sm-initial-seed-clocks/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-initial-seed-clocks/",
      type: "baseGuide",
      file: "guides/Gen 7/Finding Initial Seed with Clocks.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Island Scan RNG",
      navDrawerTitle: "Island Scan RNG",
      description:
        "Learn how to RNG Island Scan Pokémon in Sun and Moon — great for getting shinies in Apricorn Balls.",
      slug: "/retail-sm-island-scan/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-island-scan/",
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Mystery Gift RNG",
      navDrawerTitle: "Mystery Gift RNG",
      description:
        "Learn how to RNG Mystery Gift Pokémon in Sun and Moon for perfect IVs.",
      slug: "/retail-sm-myster-gift/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-mystery-gift/",
      type: "baseGuide",
      file: "guides/Gen 7/Mystery Gift.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["retail"],
      isNew: false,
      title: "Sun and Moon RNGing on retail",
      navDrawerTitle: "Retail RNG",
      description:
        "RNG perfect Pokémon in Sun and Moon without using custom firmware.",
      slug: "/retail-sm-no-cfw/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-no-cfw/",
      type: "baseGuide",
      file: "guides/Gen 7/RNGing Without Custom Firmware.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon SOS RNG",
      navDrawerTitle: "SOS RNG",
      description:
        "Learn how to RNG SOS battles in Sun and Moon for shinies, IVs, and hidden abilities.",
      slug: "/retail-sm-sos/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-sos/",
      type: "baseGuide",
      file: "guides/Gen 7/SOS RNG Guide.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in Sun and Moon for perfect IVs, natures, and shinies.",
      slug: "/retail-sm-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-stationary/",
      type: "baseGuide",
      file: "guides/Gen 7/Stationary RNG.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Timeline Leap RNG",
      navDrawerTitle: "Timeline Leap RNG",
      description:
        "Learn how to leap onto a specific timeline in Sun and Moon to get the Pokemon you want.",
      slug: "/retail-sm-timeleap/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-timeleap/",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Leap Guide.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Timeline RNG",
      navDrawerTitle: "Timeline RNG",
      description: "Learn how to create a timeline in Sun and Moon.",
      slug: "/retail-sm-timeline/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-timeline/",
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Guide.mdx",
      translations: null,
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
      categories: ["Sun and Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Sun and Moon Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Sun and Moon for shiny and high-IV results.",
      slug: "/retail-sm-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-usum-wild/",
      type: "baseGuide",
      file: "guides/Gen 7/Wild RNG.mdx",
      translations: null,
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
      categories: ["Sword and Shield"],
      tags: ["cfw"],
      isNew: false,
      title: "Sword and Shield find raid seed with custom firmware",
      navDrawerTitle: "Find Raid Seed",
      description:
        "Learn how to find raid seeds in Sword and Shield using a Switch with custom firmware.",
      slug: "/retail-swsh-get-seed-with-cfw/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Sword and Shield/Get Raid Seed With CFW.mdx",
      translations: null,
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
      categories: ["Sword and Shield"],
      tags: ["retail"],
      isNew: false,
      title: "Sword and Shield - Find Raid Seed Without CFW",
      navDrawerTitle: "Find Raid Seed",
      description:
        "Learn how to find raid seeds in Sword and Shield without custom firmware.",
      slug: "/retail-swsh-get-seed-without-cfw/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Sword and Shield/Get Raid Seed Without CFW.mdx",
      translations: null,
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
      categories: ["Sword and Shield"],
      tags: ["any"],
      isNew: false,
      title: "Sword and Shield Raid RNG",
      navDrawerTitle: "Raid RNG",
      description:
        "Learn how to RNG raid Pokémon (including G-Max) in Sword and Shield Dens.",
      slug: "/retail-swsh-raid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Sword and Shield/Raid RNG.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["any"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Egg RNG with Masuda and/or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Ultra Sun and Ultra Moon for shiny, high-IV Pokémon.",
      slug: "/retail-usum-egg-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title:
        "Ultra Sun and Ultra Moon Egg RNG without Masuda and/or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in Ultra Sun and Ultra Moon for shiny, high-IV Pokémon.",
      slug: "/retail-usum-egg-no-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["retail"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon retail finding egg seeds",
      navDrawerTitle: "Find Egg Seeds",
      description:
        "Find egg seeds for Egg RNG in Ultra Sun and Ultra Moon using the Magikarp Method — no CFW needed.",
      slug: "/retail-usum-egg-seed-no-cfw/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Timeline with Fidget RNG",
      navDrawerTitle: "Timeline Fidget RNG",
      description:
        "Learn how to create a timeline with character fidgets in Ultra Sun and Ultra Moon.",
      slug: "/retail-usum-fidget/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Timeline With Fidget Guide.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["retail"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon finding your initial seed with clocks",
      navDrawerTitle: "Find Initial Seed",
      description:
        "Learn how to find your initial seed in Ultra Sun and Ultra Moon using clock patterns — no custom firmware required.",
      slug: "/retail-usum-initial-seed-clocks/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Finding Initial Seed with Clocks.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Island Scan RNG",
      navDrawerTitle: "Island Scan RNG",
      description:
        "Learn how to RNG Island Scan Pokémon in Ultra Sun and Ultra Moon — great for getting shinies in Apricorn Balls.",
      slug: "/retail-usum-island-scan/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Island Scan.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Mystery Gift RNG",
      navDrawerTitle: "Mystery Gift RNG",
      description:
        "Learn how to RNG Mystery Gift Pokémon in Ultra Sun and Ultra Moon for perfect IVs.",
      slug: "/retail-usum-mystery-gift/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Mystery Gift.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["retail"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon RNGing on retail",
      navDrawerTitle: "Retail RNG",
      description:
        "RNG perfect Pokémon in Ultra Sun and Ultra Moon without using custom firmware.",
      slug: "/retail-usum-no-cfw/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/RNGing Without Custom Firmware.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon SOS RNG",
      navDrawerTitle: "SOS RNG",
      description:
        "Learn how to RNG SOS battles in Ultra Sun and Ultra Moon for shinies, IVs, and hidden abilities.",
      slug: "/retail-usum-sos/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/SOS RNG Guide.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Static RNG",
      navDrawerTitle: "Static RNG",
      description:
        "Learn how to RNG static Pokémon in Ultra Sun and Ultra Moon for perfect IVs, natures, and shinies.",
      slug: "/retail-usum-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Stationary RNG.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Timeline Leap RNG",
      navDrawerTitle: "Timeline Leap RNG",
      description:
        "Learn how to leap onto a specific timeline in Ultra Sun and Ultra Moon to get the Pokemon you want.",
      slug: "/retail-usum-timeleap/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Leap Guide.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Timeline RNG",
      navDrawerTitle: "Timeline RNG",
      description:
        "Learn how to create a timeline in Ultra Sun and Ultra Moon.",
      slug: "/retail-usum-timeline/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Timeline Guide.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Wild RNG",
      navDrawerTitle: "Wild RNG",
      description:
        "Learn how to RNG wild Pokémon in Ultra Sun and Ultra Moon for shiny and high-IV results.",
      slug: "/retail-usum-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Wild RNG.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon"],
      tags: ["cfw"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon Wormhole RNG",
      navDrawerTitle: "Wormhole RNG",
      description:
        "RNG legendary Pokémon found in Ultra Wormholes for perfect IVs, nature, and shininess.",
      slug: "/retail-usum-wormhole/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/Stationary Wormhole RNG.mdx",
      translations: null,
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
      categories: ["X and Y"],
      tags: ["cfw"],
      isNew: false,
      title: "X and Y Egg RNG with Masuda Method or Shiny Charm",
      navDrawerTitle: "MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in X and Y for shiny, high-IV Pokémon.",
      slug: "/retail-xy-egg-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-oras-egg-mmsc/",
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["X and Y"],
      tags: ["cfw"],
      isNew: false,
      title: "X and Y Egg RNG Without Masuda or Shiny Charm",
      navDrawerTitle: "No MM/SC Egg RNG",
      description:
        "Learn how to RNG eggs from the Daycare in X and Y for shiny, high-IV Pokémon.",
      slug: "/retail-xy-egg-no-mmsc/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: "/retail-oras-egg-no-mmsc/",
      type: "baseGuide",
      file: "guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      translations: null,
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
      categories: ["Ruby and Sapphire"],
      tags: ["info"],
      isNew: false,
      title: "Ruby and Sapphire Live vs Dead Battery RNG",
      navDrawerTitle: "Live vs Dead Battery",
      description:
        "Learn the differences between RNG methods on Ruby and Sapphire with live and dead batteries, and how each impacts your Pokemon results.",
      slug: "/rs-battery/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx",
      translations: { en: "/rs-battery/", zh: "/zh-rs-battery/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "Find Ruby and Sapphire SID",
      navDrawerTitle: "Find SID",
      description: "Various methods to finding an SID in Ruby and Sapphire.",
      slug: "/rs-gen3-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID.mdx",
      translations: { en: "/rs-gen3-sid/", zh: "/zh-rs-gen3-sid/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Initial Seed RNG",
      navDrawerTitle: "Initial Seed RNG",
      description: "Learn how to RNG your initial seed in Ruby and Sapphire.",
      slug: "/rs-initial-seed/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Initial Seed RNG.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "Mirage Island in Ruby and Sapphire",
      navDrawerTitle: "Mirage Island",
      description:
        "Learn how to access Mirage Island in Pokémon Emerald by catching a Pokémon with the correct PID using RNG manipulation.",
      slug: "/rs-mirage-island/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-11",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Mirage Island.mdx",
      translations: { en: "/rs-mirage-island/", zh: "/zh-rs-mirage-island/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["any"],
      isNew: false,
      title: "Ruby and Sapphire PokeFinder Setup",
      navDrawerTitle: "PokeFinder Setup",
      description: "How to set up PokeFinder",
      slug: "/rs-pokefinder-setup/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/PokeFinder Setup.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Pokérus in Ruby & Sapphire",
      navDrawerTitle: "Pokérus",
      description: "How to be infected by Pokérus",
      slug: "/rs-pokerus-emu/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-09",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Pokerus.mdx",
      translations: { en: "/rs-pokerus-emu/", zh: "/zh-rs-pokerus-emu/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "Pokérus in Ruby & Sapphire",
      navDrawerTitle: "Pokérus",
      description: "How to be infected by Pokérus",
      slug: "/rs-pokerus-retail/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-17",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx",
      translations: { en: "/rs-pokerus-retail/", zh: "/zh-rs-pokerus-retail/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "Find SID with Feebas in Ruby and Sapphire",
      navDrawerTitle: "Find SID with Feebas",
      description:
        "How to find your Secret ID (SID) in Ruby or Sapphire using Feebas.",
      slug: "/rs-sid-feebas/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: { en: "/rs-sid-feebas/", zh: "/zh-rs-sid-feebas/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["any"],
      isNew: false,
      title: "Ruby and Sapphire Static3",
      navDrawerTitle: "Ruby and Sapphire Static3",
      description: "Static encounters in Ruby and Sapphire",
      slug: "/rs-static/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 Static.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
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
      categories: ["Ruby and Sapphire"],
      tags: ["any"],
      isNew: false,
      title: "RS TID and SID Generator",
      navDrawerTitle: "RS TID and SID Generator",
      description: "Generator for TID and SID in RS",
      slug: "/rs-tidsid-generator/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
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
      categories: ["Ruby and Sapphire"],
      tags: ["any"],
      isNew: false,
      title: "Ruby and Sapphire RNG Info",
      navDrawerTitle: "RNG Info",
      description:
        "Learn how to advance the RNG and improve stability in Pokémon Ruby and Sapphire for consistent results.",
      slug: "/rs-tips-rng/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Basic Rules of RNG.mdx",
      translations: null,
      displayAttributes: [],
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Ruby and Sapphire",
      navDrawerTitle: "Ruby and Sapphire",
      description: "Ruby and Sapphire Resources",
      slug: "/ruby-and-sapphire/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Ultra Sun and Ultra Moon", "Sun and Moon"],
      tags: ["any"],
      isNew: false,
      title: "Gen 7 SOS Call Rates",
      navDrawerTitle: "SOS Call Rates",
      description:
        "A searchable list of every Pokemon that can SOS and their call rates in Gen 7.",
      slug: "/sos-call-rates/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 7/SOS Call Rates.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Sun and Moon",
      navDrawerTitle: "Sun and Moon",
      description: "Sun and Moon Resources",
      slug: "/sun-and-moon/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Sword and Shield",
      navDrawerTitle: "Sword and Shield",
      description: "Sword and Shield Resources",
      slug: "/sword-and-shield/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Legends Arceus"],
      tags: ["cfw"],
      isNew: false,
      title: "Legends Arceus MMO RNG",
      navDrawerTitle: "MMO RNG",
      description:
        "Learn how to RNG MMOs in Legends Arceus using Sysbot and PermuteMMO for shiny Pokémon.",
      slug: "/sysbot-lpa-mmo/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Legends Arceus/MMO.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Pokemon Transporter and Dream Radar",
      navDrawerTitle: "Pokemon Transporter and Dream Radar",
      description: "Pokemon Transporter and Dream Radar Resources",
      slug: "/transporter-dream-radar/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["3DS Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "Pokemon Transporter Offline & Save Patches",
      navDrawerTitle: "Transporter Patches",
      description:
        "Learn how to patch Pokémon Transporter to work offline and load emulator or TWiLightMenu saves from the SD card.",
      slug: "/transporter-patches/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Tools and Emulators/Transporter Patches.mdx",
      translations: null,
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
      categories: ["Transporter and Dream Radar"],
      tags: ["cfw"],
      isNew: false,
      title: "Transporter RNG using the Offline Patch",
      navDrawerTitle: "Offline Patch RNG",
      description:
        "Use the offline patch to stabilize delay and make RNG with Pokémon Transporter more consistent.",
      slug: "/transporter-rng-offline/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Transporter/Transporter with Offline Patch.mdx",
      translations: null,
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
      categories: ["Transporter and Dream Radar"],
      tags: ["cfw"],
      isNew: false,
      title: "Transporter RNG for Gen 1 and 2",
      navDrawerTitle: "Transporter RNG",
      description:
        "Learn how to RNG your Virtual Console Pokémon so they transfer to Gen 7 with perfect 6IVs.",
      slug: "/transporter-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-05-08",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Transporter/Transporter.mdx",
      translations: null,
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "Ultra Sun and Ultra Moon",
      navDrawerTitle: "Ultra Sun and Ultra Moon",
      description: "Ultra Sun and Ultra Moon Resources",
      slug: "/ultra-sun-and-ultra-moon/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "Ruby and Sapphire Wishing Star Jirachi RNG",
      navDrawerTitle: "Wishing Star Jirachi RNG",
      description:
        "Learn how to RNG the Wishing Star Jirachi from the Colosseum Bonus Disc in Ruby and Sapphire.",
      slug: "/wishing-star-jirachi/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-04-23",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx",
      translations: {
        en: "/wishing-star-jirachi/",
        zh: "/zh-wishing-star-jirachi/",
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
      categories: ["Game Hub"],
      tags: ["challenge"],
      isNew: false,
      title: "X and Y",
      navDrawerTitle: "X and Y",
      description: "X and Y Resources",
      slug: "/x-and-y/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "titled",
      canonical: null,
      type: "baseGuide",
      file: "guides/Hubs.mdx",
      translations: null,
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
      categories: ["Gamecube"],
      tags: ["any"],
      isNew: false,
      title: "XD and Colo TID and SID Generator",
      navDrawerTitle: "XD and Colo TID and SID Generator",
      description: "Generator for TID and SID in XD and Colo",
      slug: "/xdcolo-tidsid-generator/",
      isRoughDraft: true,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 3/Emerald/Gen 3 TID SID Generator.mdx",
      translations: null,
      displayAttributes: ["web_tool"],
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
      categories: ["X and Y"],
      tags: ["patch"],
      isNew: false,
      title: "XY All Friend Safaris Patch",
      navDrawerTitle: "All Friend Safaris Patch",
      description:
        "How to use a game patch to unlock all Friend Safari Pokemon in Pokemon X and Y, including Ditto and Vivillon.",
      slug: "/xy-friend-safari-patch/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: null,
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/Friend Safari Patch.mdx",
      translations: null,
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
      categories: ["X and Y"],
      tags: ["cfw"],
      isNew: false,
      title: "X and Y PokeRadar RNG",
      navDrawerTitle: "PokeRadar RNG",
      description:
        "Learn how to RNG using the PokéRadar in X and Y for shiny Pokémon.",
      slug: "/xy-pokeradar/",
      isRoughDraft: false,
      hideFromNavDrawer: false,
      addedOn: "2025-03-24",
      translation: null,
      layout: "guide",
      canonical: null,
      type: "baseGuide",
      file: "guides/Gen 6/PokeRadar.mdx",
      translations: null,
      displayAttributes: ["video_guide", "web_tool"],
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/PokeRadar.mdx")),
    getRawFile: memoize(async () => {
      const file = await import("~/../guides/Gen 6/PokeRadar.mdx?raw");
      return file.default;
    }),
  },
  "/zh-bw2-egg/": {
    meta: {
      categories: ["Black 2 and White 2"],
      tags: ["any"],
      isNew: false,
      title: "黑白2孵蛋乱数",
      navDrawerTitle: "黑白2孵蛋乱数",
      description:
        "学习如何在黑白2的培育屋中进行孵蛋乱数，获取异色高个体宝可梦",
      slug: "/zh-bw2-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/bw2-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/BW2 Egg.mdx",
      translations: { en: "/bw2-egg/", zh: "/zh-bw2-egg/" },
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
  "/zh-dppt-advance-rng/": {
    meta: {
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "乱数的帧数推进方法",
      navDrawerTitle: "乱数的帧数推进方法",
      description: "推进乱数帧数的不同方法及影响帧数的事件机制",
      slug: "/zh-dppt-advance-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-advance-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
      translations: { en: "/dppt-advance-rng/", zh: "/zh-dppt-advance-rng/" },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-dppt-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: { en: "/dppt-cute-charm/", zh: "/zh-dppt-cute-charm/" },
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
  "/zh-dppt-initial-seed/": {
    meta: {
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["emu"],
      isNew: false,
      title: "初始种子乱数",
      navDrawerTitle: "初始种子乱数",
      description: "如何在《钻石, 珍珠, 白金》中进行初始种子乱数",
      slug: "/zh-dppt-initial-seed/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-initial-seed/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx",
      translations: { en: "/dppt-initial-seed/", zh: "/zh-dppt-initial-seed/" },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["any"],
      isNew: false,
      title: "宝可追踪乱数",
      navDrawerTitle: "宝可追踪乱数",
      description: "两种不同的宝可追踪乱数方法",
      slug: "/zh-dppt-pokeradar-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-pokeradar-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx",
      translations: {
        en: "/dppt-pokeradar-rng/",
        zh: "/zh-dppt-pokeradar-rng/",
      },
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
  "/zh-dppt-wild/": {
    meta: {
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["any"],
      isNew: false,
      title: "野生乱数",
      navDrawerTitle: "野生乱数",
      description: "野生乱数",
      slug: "/zh-dppt-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/dppt-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx",
      translations: { en: "/dppt-wild/", zh: "/zh-dppt-wild/" },
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
      categories: ["Emerald"],
      tags: ["info"],
      isNew: false,
      title: "乱数介绍",
      navDrawerTitle: "乱数介绍",
      description: "如何推进乱数以及提高稳定性的技巧",
      slug: "/zh-e-tips-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/e-tips-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Basic Rules of RNG.mdx",
      translations: { en: "/e-tips-rng/", zh: "/zh-e-tips-rng/" },
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "幻之岛",
      navDrawerTitle: "幻之岛",
      description: "通过捕捉具有特定 PID 的宝可梦以进入幻之岛",
      slug: "/zh-emerald-mirage-island/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-11",
      translation: { enSlug: "/emerald-mirage-island/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx",
      translations: {
        en: "/emerald-mirage-island/",
        zh: "/zh-emerald-mirage-island/",
      },
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
      categories: ["Emerald"],
      tags: ["emu"],
      isNew: false,
      title: "利用绘画重置种子",
      navDrawerTitle: "利用绘画重置种子",
      description: "利用绘画重置乱数，从而快速获得目标宝可梦，而无需长时间等待",
      slug: "/zh-emerald-painting-rng/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emerald-painting-rng/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Reseed RNG.mdx",
      translations: {
        en: "/emerald-painting-rng/",
        zh: "/zh-emerald-painting-rng/",
      },
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
      categories: ["Emerald"],
      tags: ["emu"],
      isNew: false,
      title: "绿宝石的宝可病毒",
      navDrawerTitle: "绿宝石的宝可病毒",
      description: "如何感染宝可病毒",
      slug: "/zh-emerald-pokerus-emu/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-05-09",
      translation: { enSlug: "/emerald-pokerus-emu/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx",
      translations: {
        en: "/emerald-pokerus-emu/",
        zh: "/zh-emerald-pokerus-emu/",
      },
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "异色御三家",
      navDrawerTitle: "异色御三家",
      description: "通过捕捉异色御三家确定你的 SID",
      slug: "/zh-emerald-shiny-starter/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-05-03",
      translation: { enSlug: "/emerald-shiny-starter/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Shiny Starter.mdx",
      translations: {
        en: "/emerald-shiny-starter/",
        zh: "/zh-emerald-shiny-starter/",
      },
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "使用丑丑鱼查找 SID",
      navDrawerTitle: "使用丑丑鱼查找 SID",
      description: "如何在《绿宝石》中利用丑丑鱼查找你的里ID (SID)。",
      slug: "/zh-emerald-sid-feebas/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/emerald-sid-feebas/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: {
        en: "/emerald-sid-feebas/",
        zh: "/zh-emerald-sid-feebas/",
      },
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
      categories: ["Black 2 and White 2", "Transporter and Dream Radar"],
      tags: ["emu"],
      isNew: false,
      title: "第五世代AR搜寻器乱数",
      navDrawerTitle: "第五世代AR搜寻器乱数",
      description: "乱数获取等级5梦境球隐藏特性的传说宝可梦",
      slug: "/zh-emulator-b2w2-dream-radar/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-b2w2-dream-radar/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Dream Radar.mdx",
      translations: {
        en: "/emulator-b2w2-dream-radar/",
        zh: "/zh-emulator-b2w2-dream-radar/",
      },
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
      categories: ["Black 2 and White 2"],
      tags: ["emu"],
      isNew: false,
      title: "黑白2初始seed乱数",
      navDrawerTitle: "黑白2初始seed乱数",
      description: "学习如何在黑白2中乱数你的初始seed",
      slug: "/zh-emulator-b2w2-runasdate-inital-seed/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-b2w2-runasdate-inital-seed/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-b2w2-runasdate-inital-seed/",
        zh: "/zh-emulator-b2w2-runasdate-inital-seed/",
      },
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "连入之森乱数",
      navDrawerTitle: "连入之森乱数",
      description: "如何使用连入乱数获取心仪的宝可梦",
      slug: "/zh-emulator-bw-entralink/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-bw-entralink/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Entralink.mdx",
      translations: {
        en: "/emulator-bw-entralink/",
        zh: "/zh-emulator-bw-entralink/",
      },
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "如何在第五世代中寻找 DS 参数",
      navDrawerTitle: "如何在第五世代中寻找 DS 参数",
      description: "获取你的 DS 参数以进行第五世代乱数。",
      slug: "/zh-emulator-bw-find-ds-parameters/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-bw-find-ds-parameters/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Find DS Parameters.mdx",
      translations: {
        en: "/emulator-bw-find-ds-parameters/",
        zh: "/zh-emulator-bw-find-ds-parameters/",
      },
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "第五世代游走宝可梦乱数",
      navDrawerTitle: "第五世代游走宝可梦乱数",
      description: "在模拟器中对第五世代的游走宝可梦进行乱数",
      slug: "/zh-emulator-bw-roamers/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-bw-roamers/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Roamers.mdx",
      translations: {
        en: "/emulator-bw-roamers/",
        zh: "/zh-emulator-bw-roamers/",
      },
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "黑白初始seed乱数",
      navDrawerTitle: "黑白初始seed乱数",
      description: "学习如何在黑白中乱你的初始seed",
      slug: "/zh-emulator-bw-runasdate-initial-seed/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-bw-runasdate-initial-seed/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
      translations: {
        en: "/emulator-bw-runasdate-initial-seed/",
        zh: "/zh-emulator-bw-runasdate-initial-seed/",
      },
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
      categories: ["Black and White"],
      tags: ["emu"],
      isNew: false,
      title: "白森林乱数",
      navDrawerTitle: "白森林乱数",
      description: "白森林乱数",
      slug: "/zh-emulator-bw-white-forest/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-bw-white-forest/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 5/White Forest RNG (Emu).mdx",
      translations: {
        en: "/emulator-bw-white-forest/",
        zh: "/zh-emulator-bw-white-forest/",
      },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["info"],
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-emulator-dppt-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-dppt-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-dppt-cute-charm/",
        zh: "/zh-emulator-dppt-cute-charm/",
      },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["emu"],
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "如何在育婴屋进行乱数孵化",
      slug: "/zh-emulator-dppt-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-dppt-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx",
      translations: { en: "/emulator-dppt-egg/", zh: "/zh-emulator-dppt-egg/" },
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
      categories: ["Diamond, Pearl, and Platinum"],
      tags: ["emu"],
      isNew: false,
      title: "定点乱数",
      navDrawerTitle: "定点乱数",
      description: "如何在钻石珍珠和白金中对固定遇敌的宝可梦进行乱数",
      slug: "/zh-emulator-dppt-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-dppt-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx",
      translations: {
        en: "/emulator-dppt-stationary/",
        zh: "/zh-emulator-dppt-stationary/",
      },
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
  "/zh-emulator-emerald-egg/": {
    meta: {
      categories: ["Emerald"],
      tags: ["emu"],
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "通过培育屋进行乱数孵蛋",
      slug: "/zh-emulator-emerald-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-03-09",
      translation: { enSlug: "/emulator-emerald-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Egg RNG.mdx",
      translations: {
        en: "/emulator-emerald-egg/",
        it: "/it-emulator-emerald-egg/",
        zh: "/zh-emulator-emerald-egg/",
      },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "固定宝可梦乱数",
      navDrawerTitle: "固定宝可梦乱数",
      description: "在《火红·叶绿》中获取闪光六项个体值的传说宝可梦",
      slug: "/zh-emulator-flrg-stationary-and-gift/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: {
        enSlug: "/emulator-flrg-stationary-and-gift/",
        language: "zh",
      },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Static RNG.mdx",
      translations: {
        en: "/emulator-flrg-stationary-and-gift/",
        zh: "/zh-emulator-flrg-stationary-and-gift/",
      },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "火红叶绿孵化乱数",
      navDrawerTitle: "Egg RNG",
      description: "在火红/叶绿中进行蛋的乱数",
      slug: "/zh-emulator-frlg-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-frlg-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Egg RNG.mdx",
      translations: { en: "/emulator-frlg-egg/", zh: "/zh-emulator-frlg-egg/" },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "火红叶绿野生乱数",
      navDrawerTitle: "Wild RNG",
      description: "在《火红·叶绿》中使用甜甜香气进行野生宝可梦的乱数",
      slug: "/zh-emulator-frlg-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-frlg-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Wild RNG.mdx",
      translations: {
        en: "/emulator-frlg-wild/",
        zh: "/zh-emulator-frlg-wild/",
      },
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["info"],
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-emulator-hgss-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-hgss-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: {
        en: "/emulator-hgss-cute-charm/",
        zh: "/zh-emulator-hgss-cute-charm/",
      },
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "如何在培育屋进行孵化乱数",
      slug: "/zh-emulator-hgss-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-hgss-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Egg.mdx",
      translations: { en: "/emulator-hgss-egg/", zh: "/zh-emulator-hgss-egg/" },
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
      categories: ["HeartGold and SoulSilver"],
      tags: ["emu"],
      isNew: false,
      title: "定点乱数",
      navDrawerTitle: "定点乱数",
      description: "定点宝可梦的乱数",
      slug: "/zh-emulator-hgss-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-hgss-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx",
      translations: {
        en: "/emulator-hgss-stationary/",
        zh: "/zh-emulator-hgss-stationary/",
      },
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
  "/zh-emulator-rs-egg/": {
    meta: {
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "孵化乱数",
      navDrawerTitle: "孵化乱数",
      description: "从培育屋乱数孵化宝可梦蛋",
      slug: "/zh-emulator-rs-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-rs-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Egg RNG.mdx",
      translations: { en: "/emulator-rs-egg/", zh: "/zh-emulator-rs-egg/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "有电电池定点乱数",
      navDrawerTitle: "有电电池定点乱数",
      description: "在红宝石和蓝宝石中轻松乱数完美异色传说宝可梦",
      slug: "/zh-emulator-rs-stationary/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/emulator-rs-stationary/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx",
      translations: {
        en: "/emulator-rs-stationary/",
        zh: "/zh-emulator-rs-stationary/",
      },
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "红蓝宝石 许愿星基拉祈（Wishmaker）乱数指南",
      navDrawerTitle: "红蓝宝石 许愿星基拉祈（Wishmaker）乱数指南",
      description:
        "学习如何在红宝石与蓝宝石中，通过圆形竞技场乱数出异色的许愿星基拉祈。",
      slug: "/zh-emulator-rs-wishmaker/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-18",
      translation: { enSlug: "/emulator-rs-wishmaker/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: {
        en: "/emulator-rs-wishmaker/",
        zh: "/zh-emulator-rs-wishmaker/",
      },
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
  "/zh-frlg-gen3-sid/": {
    meta: {
      categories: ["FireRed and LeafGreen"],
      tags: ["retail"],
      isNew: false,
      title: "查找第三世代 SID",
      navDrawerTitle: "查找第三世代 SID",
      description: "多种方法查找第三世代的SID",
      slug: "/zh-frlg-gen3-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/frlg-gen3-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID.mdx",
      translations: { en: "/frlg-gen3-sid/", zh: "/zh-frlg-gen3-sid/" },
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
      categories: ["FireRed and LeafGreen"],
      tags: ["emu"],
      isNew: false,
      title: "初始种子自动刷取",
      navDrawerTitle: "初始种子自动刷取",
      description: "使用初始种子自动脚本，实现更高自由度的乱数控制",
      slug: "/zh-frlg-seeding-bot/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/frlg-seeding-bot/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/FireRed and LeafGreen/Initial Seed Botting.mdx",
      translations: { en: "/frlg-seeding-bot/", zh: "/zh-frlg-seeding-bot/" },
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
  "/zh-gba-methods/": {
    meta: {
      categories: ["GBA Technical Documentation"],
      tags: ["info"],
      isNew: false,
      title: "绿宝石中的方式 1-4",
      navDrawerTitle: "绿宝石中的方式 1-4",
      description:
        "什么是方式、为什么会存在方式 1-4，以及它们如何影响宝可梦的生成。",
      slug: "/zh-gba-methods/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/gba-methods/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/GBA Methods.mdx",
      translations: { en: "/gba-methods/", zh: "/zh-gba-methods/" },
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
  "/zh-gba-pokerus-technical/": {
    meta: {
      categories: ["GBA Technical Documentation"],
      tags: ["info"],
      isNew: false,
      title: "宝可病毒",
      navDrawerTitle: "宝可病毒",
      description: "宝可病毒的触发机制",
      slug: "/zh-gba-pokerus-technical/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-05-13",
      translation: { enSlug: "/gba-pokerus-technical/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Technical.mdx",
      translations: {
        en: "/gba-pokerus-technical/",
        zh: "/zh-gba-pokerus-technical/",
      },
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
      categories: ["GBA Technical Documentation"],
      tags: ["info"],
      isNew: false,
      title: "绿宝石中的垂直空白（VBlank）",
      navDrawerTitle: "绿宝石中的垂直空白（VBlank）",
      description: "什么是 VBlank 以及它在宝可梦生成中的影响。",
      slug: "/zh-gba-vblank/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-08",
      translation: { enSlug: "/gba-vblank/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Vblank.mdx",
      translations: { en: "/gba-vblank/", zh: "/zh-gba-vblank/" },
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
  "/zh-gen2-celebi/": {
    meta: {
      categories: ["Gold, Silver, Crystal"],
      tags: ["cfw"],
      isNew: false,
      title: "时拉比",
      navDrawerTitle: "时拉比",
      description: "如何获得异色时拉比",
      slug: "/zh-gen2-celebi/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-03-02",
      translation: { enSlug: "/gen2-celebi/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 2/Celebi.mdx",
      translations: {
        es: "/es-gen2-celebi/",
        en: "/gen2-celebi/",
        zh: "/zh-gen2-celebi/",
      },
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
      categories: ["Gold, Silver, Crystal"],
      tags: ["cfw"],
      isNew: false,
      title: "水晶初始宝可梦乱数",
      navDrawerTitle: "水晶初始宝可梦乱数",
      description: "在水晶里获得异色初始宝可梦",
      slug: "/zh-gen2-starters/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/gen2-starters/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 2/Starter.mdx",
      translations: {
        es: "/es-gen2-starters/",
        en: "/gen2-starters/",
        zh: "/zh-gen2-starters/",
      },
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "查找第三世代 SID",
      navDrawerTitle: "查找第三世代 SID",
      description: "多种方法查找第三世代的SID",
      slug: "/zh-gen3-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/gen3-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID.mdx",
      translations: { en: "/gen3-sid/", zh: "/zh-gen3-sid/" },
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
  "/zh-hgss-cute-charm/": {
    meta: {
      categories: ["HeartGold and SoulSilver"],
      tags: ["info"],
      isNew: false,
      title: "迷人之躯乱数",
      navDrawerTitle: "迷人之躯乱数",
      description: "如何通过ID乱数与迷人之躯进行高效的异色捕获",
      slug: "/zh-hgss-cute-charm/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/hgss-cute-charm/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/Cute Charm.mdx",
      translations: { en: "/hgss-cute-charm/", zh: "/zh-hgss-cute-charm/" },
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
  "/zh-hgss-rng-advance/": {
    meta: {
      categories: ["HeartGold and SoulSilver"],
      tags: ["any"],
      isNew: false,
      title: "推进乱数",
      navDrawerTitle: "推进乱数",
      description: "乱数推进的方法及影响乱数的机制",
      slug: "/zh-hgss-rng-advance/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/hgss-rng-advance/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx",
      translations: { en: "/hgss-rng-advance/", zh: "/zh-hgss-rng-advance/" },
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
  "/zh-install-pokereader/": {
    meta: {
      categories: ["3DS Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "3DS安装PokeReader",
      navDrawerTitle: "3DS安装PokeReader",
      description: "在3DS上安装工具来帮助乱数宝可梦",
      slug: "/zh-install-pokereader/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/install-pokereader/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/3DS PokeReader.mdx",
      translations: {
        en: "/install-pokereader/",
        zh: "/zh-install-pokereader/",
      },
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "红蓝宝石 流星基拉祈（Meteor）乱数指南",
      navDrawerTitle: "红蓝宝石 流星基拉祈（Meteor）乱数指南",
      description: "学习如何乱数流星基拉祈，其异色判定与许愿星不同。",
      slug: "/zh-meteor-jirachi/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-18",
      translation: { enSlug: "/meteor-jirachi/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      translations: { en: "/meteor-jirachi/", zh: "/zh-meteor-jirachi/" },
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
      categories: ["GBA Tools"],
      tags: ["emu"],
      isNew: false,
      title: "mGBA Setup",
      navDrawerTitle: "mGBA Setup",
      description:
        "Learn how to set up mGBA for GBA Pokémon RNG, including lua scripting support.",
      slug: "/zh-mgba-setup/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-03-03",
      translation: { enSlug: "/mgba-setup/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/mGBA Setup.mdx",
      translations: { en: "/mgba-setup/", zh: "/zh-mgba-setup/" },
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
  "/zh-misc-dolphin-gba-bios/": {
    meta: {
      categories: ["GBA Tools"],
      tags: ["cfw"],
      isNew: false,
      title: "GBA BIOS 文件 - 它是什么以及如何提取给模拟器使用",
      navDrawerTitle: "GBA BIOS 文件 - 它是什么以及如何提取给模拟器使用",
      description:
        "了解什么是GBA BIOS，为什么模拟器（如mGBA、VBA）需要它，以及如何从实机中合法提取它。",
      slug: "/zh-misc-dolphin-gba-bios/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/misc-dolphin-gba-bios/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Tools and Emulators/How to Extract GBA Bios.mdx",
      translations: {
        en: "/misc-dolphin-gba-bios/",
        zh: "/zh-misc-dolphin-gba-bios/",
      },
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
  "/zh-retail-emerald-egg/": {
    meta: {
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "Retail Emerald Egg RNG",
      navDrawerTitle: "Retail Emerald Egg RNG",
      description:
        "Learn how to Retail RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",
      slug: "/zh-retail-emerald-egg/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-05-18",
      translation: { enSlug: "/retail-emerald-egg/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Retail Egg.mdx",
      translations: {
        en: "/retail-emerald-egg/",
        zh: "/zh-retail-emerald-egg/",
      },
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
      categories: ["Emerald"],
      tags: ["retail"],
      isNew: false,
      title: "实机野生乱数",
      navDrawerTitle: "实机野生乱数",
      description: "在真实主机上对野生宝可梦进行乱数操作",
      slug: "/zh-retail-emerald-wild/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-emerald-wild/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Retail Wild RNG.mdx",
      translations: {
        en: "/retail-emerald-wild/",
        zh: "/zh-retail-emerald-wild/",
      },
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
  "/zh-retail-rubysapphire-tid/": {
    meta: {
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "红蓝宝石实机TID乱数指南",
      navDrawerTitle: "红蓝宝石实机TID乱数指南",
      description: "学习如何在红宝石和蓝宝石中获取你想要的TID和SID组合。",
      slug: "/zh-retail-rubysapphire-tid/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/retail-rubysapphire-tid/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Retail TID RNG.mdx",
      translations: {
        en: "/retail-rubysapphire-tid/",
        zh: "/zh-retail-rubysapphire-tid/",
      },
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
  "/zh-rs-battery/": {
    meta: {
      categories: ["Ruby and Sapphire"],
      tags: ["info"],
      isNew: false,
      title: "红蓝宝石 电池有电 vs 无电 乱数对比",
      navDrawerTitle: "红蓝宝石 电池有电 vs 无电 乱数对比",
      description:
        "了解红宝石与蓝宝石在电池有电和电池耗尽情况下的乱数方法差异，以及这些差异如何影响宝可梦结果。",
      slug: "/zh-rs-battery/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-battery/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Live and Dry Battery.mdx",
      translations: { en: "/rs-battery/", zh: "/zh-rs-battery/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "查找第三世代 SID",
      navDrawerTitle: "查找第三世代 SID",
      description: "多种方法查找第三世代的SID",
      slug: "/zh-rs-gen3-sid/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-gen3-sid/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID.mdx",
      translations: { en: "/rs-gen3-sid/", zh: "/zh-rs-gen3-sid/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "幻之岛",
      navDrawerTitle: "幻之岛",
      description: "通过捕捉具有特定 PID 的宝可梦以进入幻之岛",
      slug: "/zh-rs-mirage-island/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-11",
      translation: { enSlug: "/rs-mirage-island/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Mirage Island.mdx",
      translations: { en: "/rs-mirage-island/", zh: "/zh-rs-mirage-island/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "红蓝宝石的宝可病毒",
      navDrawerTitle: "红蓝宝石的宝可病毒",
      description: "如何感染宝可病毒",
      slug: "/zh-rs-pokerus-emu/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-05-09",
      translation: { enSlug: "/rs-pokerus-emu/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Pokerus.mdx",
      translations: { en: "/rs-pokerus-emu/", zh: "/zh-rs-pokerus-emu/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "红宝石·蓝宝石中的宝可病毒",
      navDrawerTitle: "红宝石·蓝宝石中的宝可病毒",
      description: "如何感染宝可病毒",
      slug: "/zh-rs-pokerus-retail/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-05-17",
      translation: { enSlug: "/rs-pokerus-retail/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Pokerus Retail.mdx",
      translations: { en: "/rs-pokerus-retail/", zh: "/zh-rs-pokerus-retail/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["retail"],
      isNew: false,
      title: "使用丑丑鱼查找 SID",
      navDrawerTitle: "使用丑丑鱼查找 SID",
      description: "如何在《红宝石 / 蓝宝石》中利用丑丑鱼查找你的里ID (SID)。",
      slug: "/zh-rs-sid-feebas/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: null,
      translation: { enSlug: "/rs-sid-feebas/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Emerald/Find SID with Feebas.mdx",
      translations: { en: "/rs-sid-feebas/", zh: "/zh-rs-sid-feebas/" },
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
      categories: ["Ruby and Sapphire"],
      tags: ["emu"],
      isNew: false,
      title: "红蓝宝石 许愿星基拉祈乱数",
      navDrawerTitle: "红蓝宝石 许愿星基拉祈乱数",
      description:
        "学习如何在红宝石和蓝宝石中，通过圆形竞技场发放的许愿星基拉祈进行乱数。",
      slug: "/zh-wishing-star-jirachi/",
      isRoughDraft: false,
      hideFromNavDrawer: true,
      addedOn: "2025-04-23",
      translation: { enSlug: "/wishing-star-jirachi/", language: "zh" },
      layout: "guide",
      canonical: null,
      type: "translatedGuide",
      file: "guides/Translations/zh/Gen 3/Ruby and Sapphire/Wishing Star Jirachi.mdx",
      translations: {
        en: "/wishing-star-jirachi/",
        zh: "/zh-wishing-star-jirachi/",
      },
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
  "/crystal/",
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
  "/dream-radar-patches/",
  "/e-tips-rng/",
  "/emerald-mirage-island/",
  "/emerald-overview/",
  "/emerald-painting-rng/",
  "/emerald-pokerus-emu/",
  "/emerald-shiny-starter/",
  "/emerald-sid-feebas/",
  "/emerald-static/",
  "/emerald-tidsid-generator/",
  "/emerald-wild/",
  "/emerald/",
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
  "/es-gen2-celebi/",
  "/es-gen2-starters/",
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
  "/it-emerald-overview/",
  "/it-emulator-emerald-egg/",
  "/it-gen3-glossary/",
  "/it-retail-dppt-starter/",
  "/it-retail-hgss-starter/",
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
  "/retail-dppt-starter/",
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
  "/zh-bw2-egg/",
  "/zh-dppt-advance-rng/",
  "/zh-dppt-cute-charm/",
  "/zh-dppt-initial-seed/",
  "/zh-dppt-pokeradar-rng/",
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
  "/zh-emulator-emerald-egg/",
  "/zh-emulator-flrg-stationary-and-gift/",
  "/zh-emulator-frlg-egg/",
  "/zh-emulator-frlg-wild/",
  "/zh-emulator-hgss-cute-charm/",
  "/zh-emulator-hgss-egg/",
  "/zh-emulator-hgss-stationary/",
  "/zh-emulator-rs-egg/",
  "/zh-emulator-rs-stationary/",
  "/zh-emulator-rs-wishmaker/",
  "/zh-frlg-gen3-sid/",
  "/zh-frlg-seeding-bot/",
  "/zh-gba-methods/",
  "/zh-gba-pokerus-technical/",
  "/zh-gba-vblank/",
  "/zh-gen2-celebi/",
  "/zh-gen2-starters/",
  "/zh-gen3-sid/",
  "/zh-hgss-cute-charm/",
  "/zh-hgss-rng-advance/",
  "/zh-install-pokereader/",
  "/zh-meteor-jirachi/",
  "/zh-mgba-setup/",
  "/zh-misc-dolphin-gba-bios/",
  "/zh-retail-emerald-egg/",
  "/zh-retail-emerald-wild/",
  "/zh-retail-rubysapphire-tid/",
  "/zh-rs-battery/",
  "/zh-rs-gen3-sid/",
  "/zh-rs-mirage-island/",
  "/zh-rs-pokerus-emu/",
  "/zh-rs-pokerus-retail/",
  "/zh-rs-sid-feebas/",
  "/zh-wishing-star-jirachi/",
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
  "GBA Tools",
  "NDS Tools",
  "3DS Tools",
  "Switch Tools",
  "USUM Challenges",
  "User Settings",
  "Game Hub",
] as const;
