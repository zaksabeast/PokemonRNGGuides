import React from "react";
import { z } from "zod";

export const guides = {
  "/": {
    meta: {
      title: "PokémonRNG.com – Get Perfect Pokémon Every Time",
      description: "No luck needed—just results.",
      category: "Home",
      slug: "/",
      isRoughDraft: false,
      tag: "info",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Home.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Home.mdx")),
  },
  "/bdsp-advance-rng": {
    meta: {
      title: "Advancing the RNG",
      description:
        "The different methods the RNG can be advanced and events that influence the RNG",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/bdsp-advance-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx"
        ),
    ),
  },
  "/bdsp-chatot": {
    meta: {
      title: "How to Use Chatot",
      description:
        "How to use the chatot.pokemonrng.com website for RNG in BDSP",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/bdsp-chatot",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx"
        ),
    ),
  },
  "/bdsp-emulator-setup": {
    meta: {
      title: "Set up Yuzu/Ryujinx & CheatEngine",
      description:
        "How to set up Yuzu/Ryujinx and Cheat Engine to RNG in BDSP using Lua scripts",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/bdsp-emulator-setup",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx"
        ),
    ),
  },
  "/bdsp-pokefinder": {
    meta: {
      title: "PokeFinder Setup",
      description:
        "How to set up PokeFinder to RNG in Brilliant Diamond and Shining Pearl",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/bdsp-pokefinder",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx"
        ),
    ),
  },
  "/bw2-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG egg in BW2 based on the recent discoveries",
      category: "Black 2 and White 2",
      slug: "/bw2-egg",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/BW2 Egg.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/BW2 Egg.mdx")),
  },
  "/cfw-bdsp-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG Eggs with CaptureSight",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/cfw-bdsp-egg",
      isRoughDraft: true,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/Egg.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Brilliant Diamond and Shining Pearl/Egg.mdx"),
    ),
  },
  "/cfw-bdsp-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG Stationary Pokemon such as your starter Pokemon",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/cfw-bdsp-stationary",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/Stationary.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/Stationary.mdx"
        ),
    ),
  },
  "/cfw-bdsp-tidandsid": {
    meta: {
      title: "TID/SID RNG",
      description: "How to RNG your TID/SID with CaptureSight",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/cfw-bdsp-tidandsid",
      isRoughDraft: true,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx"
        ),
    ),
  },
  "/cfw-bdsp-wild": {
    meta: {
      title: "Wild RNG",
      description: "Information for RNG wild Pokémon",
      category: "Brilliant Diamond and Shining Pearl",
      slug: "/cfw-bdsp-wild",
      isRoughDraft: true,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Brilliant Diamond and Shining Pearl/Wild.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Brilliant Diamond and Shining Pearl/Wild.mdx"),
    ),
  },
  "/channel-jirachi": {
    meta: {
      title: "(PAL) Channel RNG",
      description: "How to RNG the gift Jirachi on Channel",
      category: "Gamecube",
      slug: "/channel-jirachi",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gamecube/Channel.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gamecube/Channel.mdx")),
  },
  "/citrarng-setup": {
    meta: {
      title: "3DS Emulator Setup (Azahar/Lime3DS/Citra)",
      description: "Setup a 3DS emulator for RNG",
      category: "Tools and Emulators",
      slug: "/citrarng-setup",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/CitraRNG Setup.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/CitraRNG Setup.mdx"),
    ),
  },
  "/desmume-setup": {
    meta: {
      title: "Desmume Setup",
      description: "Setup Desmume for RNG",
      category: "Tools and Emulators",
      slug: "/desmume-setup",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/Desmume Setup.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Desmume Setup.mdx"),
    ),
  },
  "/dppt-advance-rng": {
    meta: {
      title: "Advancing the RNG",
      description:
        "The different methods the RNG can be advanced and events that influence the RNG",
      category: "Diamond, Pearl, and Platinum",
      slug: "/dppt-advance-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx"
        ),
    ),
  },
  "/dppt-initial-seed": {
    meta: {
      title: "Initial Seed RNG",
      description: "How to RNG an initial seed in Diamond, Pearl, and Platinum",
      category: "Diamond, Pearl, and Platinum",
      slug: "/dppt-initial-seed",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx"
        ),
    ),
  },
  "/dppt-pokeradar-rng": {
    meta: {
      title: "PokeRadar RNG",
      description: "Two different methods for PokeRadar RNG",
      category: "Diamond, Pearl, and Platinum",
      slug: "/dppt-pokeradar-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx"),
    ),
  },
  "/dppt-setup-rng": {
    meta: {
      title: "Honey RNG",
      description: "RNG honey tree Pokémon",
      category: "Diamond, Pearl, and Platinum",
      slug: "/dppt-setup-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Honey.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Honey.mdx"),
    ),
  },
  "/dppt-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      category: "Diamond, Pearl, and Platinum",
      slug: "/dppt-wild",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx"),
    ),
  },
  "/e-tips-rng": {
    meta: {
      title: "RNG Info",
      description:
        "How to advance the RNG and tips to make everything more stable",
      slug: "/e-tips-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Basic Rules of RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Basic Rules of RNG.mdx"),
    ),
  },
  "/zh-e-tips-rng": {
    meta: {
      title: "乱数介绍",
      description: "如何推进乱数以及提高稳定性的技巧",
      slug: "/zh-e-tips-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Emerald/Basic Rules of RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Basic Rules of RNG.mdx"),
    ),
  },
  "/emerald-painting-rng": {
    meta: {
      title: "Reseed using paintings",
      description:
        "Reseed the RNG using paintings to obtain the Pokémon wanted without the long wait",
      slug: "/emerald-painting-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Reseed RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Reseed RNG.mdx")),
  },
  "/zh-emerald-painting-rng": {
    meta: {
      title: "利用绘画重置种子",
      description: "利用绘画重置乱数，从而快速获得目标宝可梦，而无需长时间等待",
      slug: "/zh-emerald-painting-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Emerald/Reseed RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Reseed RNG.mdx")),
  },
  "/emerald-sid-feebas": {
    meta: {
      title: "Find SID with Feebas",
      description: "How to find your Secret ID (SID) in Emerald using Feebas.",
      category: "Emerald",
      slug: "/emerald-sid-feebas",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      file: "guides/Emerald/Find SID with Feebas.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Find SID with Feebas.mdx"),
    ),
  },
  "/emerald-static-generator": {
    meta: {
      title: "Emerald Static3 Generator",
      description: "Generator for Static encounters in Emerald",
      category: "Emerald",
      slug: "/emerald-static-generator",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Gen 3 Static Generator.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Gen 3 Static Generator.mdx"),
    ),
  },
  "/emerald-tidsid-generator": {
    meta: {
      title: "Emerald TID and SID Generator",
      description: "Generator for TID/SID in Emerald",
      category: "Emerald",
      slug: "/emerald-tidsid-generator",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Gen 3 TID SID Generator.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
  },
  "/emulator-b2w2-dream-radar": {
    meta: {
      title: "Dream Radar RNG in Generation 5",
      description: "RNG Level 5 Dream Ball HA Legends",
      category: "Black 2 and White 2",
      slug: "/emulator-b2w2-dream-radar",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Dream Radar.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Dream Radar.mdx")),
  },
  "/emulator-b2w2-runasdate-inital-seed": {
    meta: {
      title: "Initial Seed RNG (RunAsDate edition)",
      description: "How to control Gen 5 initial seeds without any difficulty",
      category: "Black 2 and White 2",
      slug: "/emulator-b2w2-runasdate-inital-seed",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx"),
    ),
  },
  "/emulator-b2w2-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      category: "Black 2 and White 2",
      slug: "/emulator-b2w2-wild",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Wild RNG Emu.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Wild RNG Emu.mdx")),
  },
  "/emulator-bw-entralink": {
    meta: {
      title: "Entralink (Emulator)",
      description: "How to RNG cool Pokémon with Entralink RNG",
      category: "Black and White",
      slug: "/emulator-bw-entralink",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Entralink.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Entralink.mdx")),
  },
  "/emulator-bw-find-ds-parameters": {
    meta: {
      title: "How To Find DS Parameters in Generation 5",
      description: "Get your DS Parameters for Generation 5 RNG.",
      category: "Black and White",
      slug: "/emulator-bw-find-ds-parameters",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Find DS Parameters.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Find DS Parameters.mdx")),
  },
  "/emulator-bw-roamers": {
    meta: {
      title: "Gen 5 Roamers",
      description: "RNG Gen 5 Roamers with an emulator",
      category: "Black and White",
      slug: "/emulator-bw-roamers",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Roamers.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Roamers.mdx")),
  },
  "/emulator-bw-runasdate-initial-seed": {
    meta: {
      title: "Initial Seed RNG (RunAsDate edition)",
      description: "How to control Gen 5 initial seeds without any difficulty",
      category: "Black and White",
      slug: "/emulator-bw-runasdate-initial-seed",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 5/Using Runasdate to RNG Initial Seed.mdx"),
    ),
  },
  "/emulator-bw-white-forest": {
    meta: {
      title: "White Forest RNG",
      description: "White Forest RNG",
      category: "Black and White",
      slug: "/emulator-bw-white-forest",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/White Forest RNG (Emu).mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 5/White Forest RNG (Emu).mdx"),
    ),
  },
  "/emulator-bw-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      category: "Black and White",
      slug: "/emulator-bw-wild",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Wild RNG Emu.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Wild RNG Emu.mdx")),
  },
  "/emulator-colosseum-general": {
    meta: {
      title: "Colosseum General RNG",
      description: "RNG in Colosseum",
      category: "Gamecube",
      slug: "/emulator-colosseum-general",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gamecube/Colosseum General Guide (Emu).mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/Colosseum General Guide (Emu).mdx"),
    ),
  },
  "/emulator-dppt-cute-charm": {
    meta: {
      title: "Cute Charm RNG",
      description: "How to use Cute Charm with TID/SID RNG",
      category: "Diamond, Pearl, and Platinum",
      slug: "/emulator-dppt-cute-charm",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Cute Charm.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Cute Charm.mdx")),
  },
  "/emulator-dppt-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG eggs from the daycare",
      category: "Diamond, Pearl, and Platinum",
      slug: "/emulator-dppt-egg",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Egg.mdx"),
    ),
  },
  "/emulator-dppt-pokefinder-setup": {
    meta: {
      title: "PokeFinder Setup",
      description: "How to setup PokeFinder for Diamond/Pearl/Platinum RNG",
      category: "Diamond, Pearl, and Platinum",
      slug: "/emulator-dppt-pokefinder-setup",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx"
        ),
    ),
  },
  "/emulator-dppt-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG stationary Pokémon in Diamond, Pearl, and Platinum",
      category: "Diamond, Pearl, and Platinum",
      slug: "/emulator-dppt-stationary",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Stationary.mdx"),
    ),
  },
  "/emulator-dppt-tid-sid": {
    meta: {
      title: "TID/SID RNG",
      description: "How to get a desired TID/SID combo",
      category: "Diamond, Pearl, and Platinum",
      slug: "/emulator-dppt-tid-sid",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/TID SID.mdx"),
    ),
  },
  "/emulator-emerald-egg": {
    meta: {
      title: "Egg RNG",
      description: "RNG Eggs from the Daycare",
      slug: "/emulator-emerald-egg",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: "2025-03-09",
      file: "guides/Emerald/Egg RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Egg RNG.mdx")),
  },
  "/zh-emulator-emerald-egg": {
    meta: {
      title: "孵化乱数",
      description: "通过培育屋进行乱数孵蛋",
      slug: "/zh-emulator-emerald-egg",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: true,
      addedOn: "2025-04-07",
      file: "guides/Emerald/Egg RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Egg RNG.mdx")),
  },
  "/emulator-flrg-stationary-and-gift": {
    meta: {
      title: "FRLG Stationary/Gift RNG",
      description: "Get shiny 6 IV stationaries from FRLG",
      slug: "/emulator-flrg-stationary-and-gift",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/FireRed and LeafGreen/Stationary and Gift RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/FireRed and LeafGreen/Stationary and Gift RNG.mdx"),
    ),
  },
  "/emulator-frlg-egg": {
    meta: {
      title: "FRLG Egg RNG",
      description: "RNG eggs in FRLG",
      slug: "/emulator-frlg-egg",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/FireRed and LeafGreen/Egg RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Egg RNG.mdx"),
    ),
  },
  "/emulator-frlg-stationary": {
    meta: {
      title: "Stationary v2 RNG",
      description: "Stationary v2 RNG",
      slug: "/emulator-frlg-stationary",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/FireRed and LeafGreen/Stationary v2 Emu.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Stationary v2 Emu.mdx"),
    ),
  },
  "/emulator-frlg-wild": {
    meta: {
      title: "Wild RNG",
      description:
        "RNG for Pokémon encountered in the wild using Sweet Scent in FireRed/LeafGreen",
      slug: "/emulator-frlg-wild",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/FireRed and LeafGreen/Wild RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Wild RNG.mdx"),
    ),
  },
  "/emulator-frlg-wild-v2": {
    meta: {
      title: "Wild v2 RNG",
      description: "Wild v2 RNG",
      slug: "/emulator-frlg-wild-v2",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/FireRed and LeafGreen/wildv2lua.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/wildv2lua.mdx"),
    ),
  },
  "/emulator-hgss-breeding": {
    meta: {
      title: "Breeding RNG",
      description: "Breeding RNG",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-breeding",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Breeding RNG (Emu).mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Breeding RNG (Emu).mdx"
        ),
    ),
  },
  "/emulator-hgss-cute-charm": {
    meta: {
      title: "Cute Charm RNG",
      description: "How to use Cute Charm with TID/SID RNG",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-cute-charm",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/Cute Charm.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 4/Cute Charm.mdx")),
  },
  "/emulator-hgss-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG eggs from the daycare",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-egg",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Egg.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/HeartGold and SoulSilver/Egg.mdx"),
    ),
  },
  "/emulator-hgss-special-wild": {
    meta: {
      title: "Special Wild RNG",
      description: "Special Wild RNG",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-special-wild",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Special Wild Case (Emu).mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Special Wild Case (Emu).mdx"
        ),
    ),
  },
  "/emulator-hgss-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG for stationary Pokémon",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-stationary",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Stationary RNG Emu.mdx"
        ),
    ),
  },
  "/emulator-hgss-tid-sid": {
    meta: {
      title: "TID/SID RNG",
      description: "How to get a desired TID/SID combo",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-tid-sid",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/TID SID.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/HeartGold and SoulSilver/TID SID.mdx"),
    ),
  },
  "/emulator-hgss-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-wild",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Wild RNG - Emulator.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Wild RNG - Emulator.mdx"
        ),
    ),
  },
  "/emulator-hgss-wondercard": {
    meta: {
      title: "Wondercard RNG",
      description: "How to RNG Wondercards",
      category: "HeartGold and SoulSilver",
      slug: "/emulator-hgss-wondercard",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Wondercard.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/HeartGold and SoulSilver/Wondercard.mdx"),
    ),
  },
  "/emulator-oras-dexnav": {
    meta: {
      title: "DexNav RNG",
      description: "DexNav RNG for ORAS. Citra is 100% recommended.",
      category: "Omega Ruby and Alpha Sapphire",
      slug: "/emulator-oras-dexnav",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/DexNav.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/DexNav.mdx")),
  },
  "/emulator-rs-dead-battery-stationary": {
    meta: {
      title: "Dead Battery Stationary RNG",
      description: "Dead Battery Stationary RNG",
      slug: "/emulator-rs-dead-battery-stationary",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Dead Battery Stationary RNG  (Emulator).mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ruby and Sapphire/Dead Battery Stationary RNG  (Emulator).mdx"
        ),
    ),
  },
  "/emulator-rs-egg": {
    meta: {
      title: "Egg RNG",
      description: "RNG Eggs from the Daycare",
      slug: "/emulator-rs-egg",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Egg RNG.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Egg RNG.mdx"),
    ),
  },
  "/emulator-rs-live-battery-tid": {
    meta: {
      title: "Live Battery TID/SID RNG",
      description:
        "RNG for a specific TID/SID combination with more options than dead battery",
      slug: "/emulator-rs-live-battery-tid",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Live Battery TID RNG.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Live Battery TID RNG.mdx"),
    ),
  },
  "/emulator-rs-stationary": {
    meta: {
      title: "Live Battery Stationary RNG",
      description:
        "Easily RNG for perfect shiny legendaries in Ruby and Sapphire",
      slug: "/emulator-rs-stationary",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ruby and Sapphire/Ruby & Sapphire Live Battery Stationary Abuse.mdx"
        ),
    ),
  },
  "/emulator-rs-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      slug: "/emulator-rs-wild",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/RSE Wild RNG - Dry Battery Emulator.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ruby and Sapphire/RSE Wild RNG - Dry Battery Emulator.mdx"
        ),
    ),
  },
  "/emulator-rs-wishmaker": {
    meta: {
      title: "Shiny WISHMKR Jirachi RNG using wishmaker-calc",
      description: "RNG Jirachi from the Colosseum bonus disc",
      slug: "/emulator-rs-wishmaker",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ruby and Sapphire/Shiny WISHMKR Jirachi with wishmaker-calc.mdx"
        ),
    ),
  },
  "/emulator-sm-time-finder": {
    meta: {
      title: "Time Finder (Citra)",
      description: "Finding times to get specific RNG seeds",
      category: "Sun and Moon",
      slug: "/emulator-sm-time-finder",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Time Finder.js (Citra).mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Time Finder.js (Citra).mdx"),
    ),
  },
  "/emulator-usum-time-finder": {
    meta: {
      title: "Time Finder (Citra)",
      description: "Finding times to get specific RNG seeds",
      category: "Ultra Sun and Ultra Moon",
      slug: "/emulator-usum-time-finder",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Time Finder.js (Citra).mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Time Finder.js (Citra).mdx"),
    ),
  },
  "/es-gen2-starters": {
    meta: {
      title: "RNG de Iniciales en Cristal",
      description: "Get Shiny Starters in Crystal",
      category: "Gold, Silver, Crystal",
      slug: "/es-gen2-starters",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Gen 2/Starter.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/Starter.mdx")),
  },
  "/frlg-gen3-sid": {
    meta: {
      title: "Find Gen 3 SID",
      description: "Various methods to finding an SID in Gen 3",
      category: "FireRed and LeafGreen",
      slug: "/frlg-gen3-sid",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Find SID.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Find SID.mdx")),
  },
  "/frlg-seeding-bot": {
    meta: {
      title: "Initial Seed Botting",
      description:
        "How to use the Initial Seed Bot for more control in your RNGs",
      slug: "/frlg-seeding-bot",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/FireRed and LeafGreen/Initial Seed Botting.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/FireRed and LeafGreen/Initial Seed Botting.mdx"),
    ),
  },
  "/frlg-static-generator": {
    meta: {
      title: "FireRed and LeafGreen Static3 Generator",
      description: "Generator for Static encounters in FireRed and LeafGreen",
      category: "FireRed and LeafGreen",
      slug: "/frlg-static-generator",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Gen 3 Static Generator.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Gen 3 Static Generator.mdx"),
    ),
  },
  "/frlg-tidsid-generator": {
    meta: {
      title: "FRLG TID and SID Generator",
      description: "Generator for TID and SID in FRLG",
      category: "FireRed and LeafGreen",
      slug: "/frlg-tidsid-generator",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Gen 3 TID SID Generator.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
  },
  "/frlg-tips-rng": {
    meta: {
      title: "Basic rules of Gen 3 RNG",
      description:
        "How to advance the RNG and tips to make everything more stable",
      slug: "/frlg-tips-rng",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/FireRed and LeafGreen/Basic Rules of RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Basic Rules of RNG.mdx"),
    ),
  },
  "/gc-initial": {
    meta: {
      title: "Initial Seed RNG",
      description:
        "How to use Dolphin to set up Initial Seed RNG for all GameCube games",
      category: "Gamecube",
      slug: "/gc-initial",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gamecube/Initial Seed RNG.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/Initial Seed RNG.mdx"),
    ),
  },
  "/gen2-celebi": {
    meta: {
      title: "Celebi",
      description: "How to get a shiny Fairy",
      category: "Gold, Silver, Crystal",
      slug: "/gen2-celebi",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: "2025-03-02",
      file: "guides/Gen 2/Celebi.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/Celebi.mdx")),
  },
  "/gen2-research": {
    meta: {
      title: "Gen 2 RNG Research",
      description: "Help research the Gen 2 RNG",
      category: "Gold, Silver, Crystal",
      slug: "/gen2-research",
      isRoughDraft: true,
      tag: "info",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 2/RngResearch.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/RngResearch.mdx")),
  },
  "/gen2-starters": {
    meta: {
      title: "Starter Crystal RNG",
      description: "Get Shiny Starters in Crystal",
      category: "Gold, Silver, Crystal",
      slug: "/gen2-starters",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 2/Starter.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/Starter.mdx")),
  },
  "/gen3-sid": {
    meta: {
      title: "Find Gen 3 SID",
      description: "Various methods to finding an SID in Gen 3",
      category: "Emerald",
      slug: "/gen3-sid",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      file: "guides/Emerald/Find SID.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Find SID.mdx")),
  },
  "/hgss-initial-seed": {
    meta: {
      title: "Initial Seed RNG",
      description: "How to RNG an initial seed in HeartGold/SoulSilver",
      category: "HeartGold and SoulSilver",
      slug: "/hgss-initial-seed",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Initial Seed RNG.mdx"
        ),
    ),
  },
  "/hgss-rng-advance": {
    meta: {
      title: "Advancing the RNG",
      description:
        "The different methods the RNG can be advanced and events that influence the RNG",
      category: "HeartGold and SoulSilver",
      slug: "/hgss-rng-advance",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/HeartGold and SoulSilver/Advancing the RNG.mdx"
        ),
    ),
  },
  "/install-capturesight": {
    meta: {
      title: "How to Install CaptureSight",
      description: "Installing a tool on your Switch to help RNG Pokemon",
      category: "Tools and Emulators",
      slug: "/install-capturesight",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/CaptureSight Install.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/CaptureSight Install.mdx"),
    ),
  },
  "/install-pokereader": {
    meta: {
      title: "PokeReader 3DS",
      description: "Installing a tool on your 3DS to help RNG Pokémon",
      category: "Tools and Emulators",
      slug: "/install-pokereader",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/3DS PokeReader.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/3DS PokeReader.mdx"),
    ),
  },
  "/install-pokereader-emu": {
    meta: {
      title: "PokeReader Lime3DS",
      description:
        "Installing a tool on a 3DS emulator, such as Azahar, Lime3DS, Citra, to help RNG Pokémon",
      category: "Tools and Emulators",
      slug: "/install-pokereader-emu",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/Emu PokeReader.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Emu PokeReader.mdx"),
    ),
  },
  "/mgba-setup": {
    meta: {
      title: "mGBA Setup",
      description: "Setup mGBA for RNG",
      category: "Tools and Emulators",
      slug: "/mgba-setup",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: "2025-03-03",
      file: "guides/Tools and Emulators/mGBA Setup.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/mGBA Setup.mdx"),
    ),
  },
  "/misc-3ds-installing-pcalc": {
    meta: {
      title: "How to Install PCalc",
      description: "Installing a tool on your 3DS to help RNG Pokemon",
      category: "Tools and Emulators",
      slug: "/misc-3ds-installing-pcalc",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/How to Install PCalc.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/How to Install PCalc.mdx"),
    ),
  },
  "/misc-3ds-ips-luma-citra": {
    meta: {
      title: "Using IPS Patches with Luma and Azahar/Lime3DS/Citra",
      description:
        "Use game patches for instant text, no outlines, and extra fun",
      category: "Tools and Emulators",
      slug: "/misc-3ds-ips-luma-citra",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx"
        ),
    ),
  },
  "/misc-3ds-island-scan-sm": {
    meta: {
      title: "Sun and Moon Island Scan Pokemon",
      description: "Check Island Scan Pokemon for Sun and Moon!",
      category: "Sun and Moon",
      slug: "/misc-3ds-island-scan-sm",
      isRoughDraft: false,
      tag: "info",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Island Scan Pokemon SM.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Island Scan Pokemon SM.mdx"),
    ),
  },
  "/misc-3ds-island-scan-usum": {
    meta: {
      title: "Ultra Sun and Ultra Moon Island Scan Pokemon",
      description: "Check Island Scan Pokemon for Ultra Sun and Ultra Moon!",
      category: "Ultra Sun and Ultra Moon",
      slug: "/misc-3ds-island-scan-usum",
      isRoughDraft: false,
      tag: "info",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Island Scan Pokemon USUM.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Island Scan Pokemon USUM.mdx"),
    ),
  },
  "/misc-3ds-transporter-nature-tables": {
    meta: {
      title: "Transporter EXP to Nature Conversion Table (VC)",
      description: "A quick way to check the nature your VC Pokémon will be",
      category: "Transporter",
      slug: "/misc-3ds-transporter-nature-tables",
      isRoughDraft: false,
      tag: "info",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Transporter/Nature Table.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Transporter/Nature Table.mdx")),
  },
  "/misc-dolphin-connect-vba": {
    meta: {
      title: "Connecting Dolphin to VBA",
      description: "RNG a Jirachi or transfer your RNGs to a GBA game",
      category: "Tools and Emulators",
      slug: "/misc-dolphin-connect-vba",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx"
        ),
    ),
  },
  "/misc-dolphin-gba-bios": {
    meta: {
      title: "How to extract GBA BIOS",
      description: "Guide to extracting the GBA BIOS file for use on emulators",
      category: "Tools and Emulators",
      slug: "/misc-dolphin-gba-bios",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/How to Extract GBA Bios.mdx",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Tools and Emulators/How to Extract GBA Bios.mdx"),
    ),
  },
  "/misc-sm-wild-spots": {
    meta: {
      title: "Wild Pokémon Locations",
      description:
        "Where to place your character and the correction needed for each area to RNG wild Pokémon in Sun and Moon",
      category: "Sun and Moon",
      slug: "/misc-sm-wild-spots",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Wild Spots.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Wild Spots.mdx")),
  },
  "/mystic-timer": {
    meta: {
      title: "Mystic Timer",
      description: "Like Eon Timer, but works on mobile devices!",
      category: "Tools and Emulators",
      slug: "/mystic-timer",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: "2025-03-18",
      file: "guides/Tools and Emulators/Timer.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Timer.mdx"),
    ),
  },
  "/no-dolphin-patch": {
    meta: {
      title: "No Dolphin Patch",
      description:
        "A patch to skip needing Dolphin to obtain Wishmaker Jirachi",
      category: "Tools and Emulators",
      slug: "/no-dolphin-patch",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: "2025-04-03",
      file: "guides/Tools and Emulators/No Dolphin Patch.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/No Dolphin Patch.mdx"),
    ),
  },
  "/ntr-helper-usage": {
    meta: {
      title: "NTR Helper Usage",
      description: "How to use the NTR Helper Tool in 3DSRNGTool",
      category: "Tools and Emulators",
      slug: "/ntr-helper-usage",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/NTR Helper Usage.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/NTR Helper Usage.mdx"),
    ),
  },
  "/oras-mirage-spots": {
    meta: {
      title: "Mirage Spot",
      description:
        "Easily access any Mirage Spots in Omega Ruby and Alpha Sapphire",
      category: "Omega Ruby and Alpha Sapphire",
      slug: "/oras-mirage-spots",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: "2025-03-14",
      file: "guides/Gen 6/Mirage Spot.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/Mirage Spot.mdx")),
  },
  "/oras-remove-time-penalty": {
    meta: {
      title: "Remove Time Penalties",
      description:
        "Change your Omega Ruby or Alpha Sapphire time without penalities!",
      category: "Omega Ruby and Alpha Sapphire",
      slug: "/oras-remove-time-penalty",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: "2025-03-14",
      file: "guides/Gen 6/Remove Time Penalties.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 6/Remove Time Penalties.mdx"),
    ),
  },
  "/pal-xd-eevee": {
    meta: {
      title: "(XD) Eevee PAL RNG",
      description: "How to RNG the starter Eevee with a PAL Pokemon XD",
      category: "Gamecube",
      slug: "/pal-xd-eevee",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx"),
    ),
  },
  "/pcalc-xy-friend-safari": {
    meta: {
      title: "Friend Safari RNG",
      description: "Get shiny 6IV friend safari Pokémon, like Ditto!",
      category: "X and Y",
      slug: "/pcalc-xy-friend-safari",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/Friend Safari RNG Guide.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 6/Friend Safari RNG Guide.mdx"),
    ),
  },
  "/pcalc-xy-tid": {
    meta: {
      title: "Trainer ID, Secret ID, and/or TSV RNG",
      description: "RNG for a specific Trainer ID, SID, or TSV",
      category: "X and Y",
      slug: "/pcalc-xy-tid",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/XY TID.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/XY TID.mdx")),
  },
  "/retail-bw-entralink": {
    meta: {
      title: "Entralink (Retail)",
      description:
        "A step-by-step guide for RNG manipulation using the C-Gear method in Pokémon Black and White.",
      category: "Black and White",
      slug: "/retail-bw-entralink",
      isRoughDraft: true,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 5/Retail Entralink.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 5/Retail Entralink.mdx")),
  },
  "/retail-emerald-wild": {
    meta: {
      title: "Wild Retail RNG",
      description: "RNG wild Pokemon on a retail console",
      slug: "/retail-emerald-wild",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Retail Wild RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Retail Wild RNG.mdx")),
  },
  "/zh-retail-emerald-wild": {
    meta: {
      title: "实机野生乱数",
      description: "在真实主机上对野生宝可梦进行乱数操作",
      slug: "/zh-retail-emerald-wild",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Emerald/Retail Wild RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Retail Wild RNG.mdx")),
  },
  "/retail-oras-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda Method or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      category: "Omega Ruby and Alpha Sapphire",
      slug: "/retail-oras-egg-mmsc",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-oras-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide Without Masuda or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      category: "Omega Ruby and Alpha Sapphire",
      slug: "/retail-oras-egg-no-mmsc",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-oras-tid": {
    meta: {
      title: "Trainer ID RNG",
      description: "RNG for that special TID/SID/TSV",
      category: "Omega Ruby and Alpha Sapphire",
      slug: "/retail-oras-tid",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/ORAS TID.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/ORAS TID.mdx")),
  },
  "/retail-sm-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda and/or Shiny Charm",
      description:
        "RNG for eggs using Masuda Method and/or with the Shiny Charm",
      category: "Sun and Moon",
      slug: "/retail-sm-egg-mmsc",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-sm-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide without Masuda and/or Shiny Charm",
      description:
        "RNG for eggs without using Masuda Method and without the Shiny Charm",
      category: "Sun and Moon",
      slug: "/retail-sm-egg-no-mmsc",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-sm-egg-seed-no-cfw": {
    meta: {
      title: "Finding Egg Seeds Without CFW/Homebrew",
      description: "Find your egg seeds for Egg RNG using the Magikarp Method",
      category: "Sun and Moon",
      slug: "/retail-sm-egg-seed-no-cfw",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
  },
  "/retail-sm-fidget": {
    meta: {
      title: "Timeline with Fidget",
      description: "Using the timeline method with character fidgets",
      category: "Sun and Moon",
      slug: "/retail-sm-fidget",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Timeline With Fidget Guide.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline With Fidget Guide.mdx"),
    ),
  },
  "/retail-sm-initial-seed-clocks": {
    meta: {
      title: "Finding your initial seed in Gen 7 with clocks",
      description:
        "This guide allows you to find your initial seed without using custom firmware.",
      category: "Sun and Moon",
      slug: "/retail-sm-initial-seed-clocks",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Finding Initial Seed with Clocks.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Finding Initial Seed with Clocks.mdx"),
    ),
  },
  "/retail-sm-island-scan": {
    meta: {
      title: "Island Scan",
      description: "Easy shinies in apricorn balls",
      category: "Sun and Moon",
      slug: "/retail-sm-island-scan",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Island Scan.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Island Scan.mdx")),
  },
  "/retail-sm-myster-gift": {
    meta: {
      title: "Mystery Gift (Event) RNG",
      description: "RNG your events to have 6 IVs",
      category: "Sun and Moon",
      slug: "/retail-sm-myster-gift",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Mystery Gift.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Mystery Gift.mdx")),
  },
  "/retail-sm-no-cfw": {
    meta: {
      title: "RNGing without Custom Firmware",
      description: "Get your perfect Pokémon without custom firmware",
      category: "Sun and Moon",
      slug: "/retail-sm-no-cfw",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/RNGing Without Custom Firmware.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/RNGing Without Custom Firmware.mdx"),
    ),
  },
  "/retail-sm-sos": {
    meta: {
      title: "SOS RNG",
      description:
        "Master one of the most challenging Gen 7 RNGs for fun rewards",
      category: "Sun and Moon",
      slug: "/retail-sm-sos",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/SOS RNG Guide.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/SOS RNG Guide.mdx")),
  },
  "/retail-sm-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG the overworld Pokémon to have 6 IVs.",
      category: "Sun and Moon",
      slug: "/retail-sm-stationary",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Stationary RNG.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Stationary RNG.mdx")),
  },
  "/retail-sm-timeleap": {
    meta: {
      title: "Timeline Leap",
      description: "Predict and jump onto specific Pokemon timelines",
      category: "Sun and Moon",
      slug: "/retail-sm-timeleap",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Timeline Leap Guide.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline Leap Guide.mdx"),
    ),
  },
  "/retail-sm-timeline": {
    meta: {
      title: "Timeline Guide",
      description: "Key skill for Gen 7 RNG with custom firmware",
      category: "Sun and Moon",
      slug: "/retail-sm-timeline",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Timeline Guide.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Timeline Guide.mdx")),
  },
  "/retail-sm-wild": {
    meta: {
      title: "Wild RNG",
      description: "RNG for wild Pokémon using honey in Sun and Moon",
      category: "Sun and Moon",
      slug: "/retail-sm-wild",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Wild RNG.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Wild RNG.mdx")),
  },
  "/retail-swsh-get-seed-with-cfw": {
    meta: {
      title: "Get raid seed with custom firmware",
      description: "Use this if you have a switch with custom firmware.",
      category: "Sword and Shield",
      slug: "/retail-swsh-get-seed-with-cfw",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Sword and Shield/Get Raid Seed With CFW.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sword and Shield/Get Raid Seed With CFW.mdx"),
    ),
  },
  "/retail-swsh-get-seed-without-cfw": {
    meta: {
      title: "Get raid seed without custom firmware",
      description: "Use this if you do not have a switch with custom firmware",
      category: "Sword and Shield",
      slug: "/retail-swsh-get-seed-without-cfw",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Sword and Shield/Get Raid Seed Without CFW.mdx",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Sword and Shield/Get Raid Seed Without CFW.mdx"),
    ),
  },
  "/retail-swsh-raid": {
    meta: {
      title: "Raid RNG",
      description:
        "RNG raid Pokémon (even G-max!) found in Dens! Use this after getting your den seed.",
      category: "Sword and Shield",
      slug: "/retail-swsh-raid",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Sword and Shield/Raid RNG.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sword and Shield/Raid RNG.mdx"),
    ),
  },
  "/retail-usum-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda and/or Shiny Charm",
      description:
        "RNG for eggs using Masuda Method and/or with the Shiny Charm",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-egg-mmsc",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-usum-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide without Masuda and/or Shiny Charm",
      description:
        "RNG for eggs without using Masuda Method and without the Shiny Charm",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-egg-no-mmsc",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-usum-egg-seed-no-cfw": {
    meta: {
      title: "Finding Egg Seeds Without CFW/Homebrew",
      description: "Find your egg seeds for Egg RNG using the Magikarp Method",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-egg-seed-no-cfw",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 7/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
  },
  "/retail-usum-fidget": {
    meta: {
      title: "Timeline with Fidget",
      description: "Using the timeline method with character fidgets",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-fidget",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Timeline With Fidget Guide.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline With Fidget Guide.mdx"),
    ),
  },
  "/retail-usum-initial-seed-clocks": {
    meta: {
      title: "Finding your initial seed in Gen 7 with clocks",
      description:
        "This guide allows you to find your initial seed without using custom firmware.",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-initial-seed-clocks",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Finding Initial Seed with Clocks.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Finding Initial Seed with Clocks.mdx"),
    ),
  },
  "/retail-usum-island-scan": {
    meta: {
      title: "Island Scan",
      description: "Easy shinies in apricorn balls",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-island-scan",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Island Scan.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Island Scan.mdx")),
  },
  "/retail-usum-mystery-gift": {
    meta: {
      title: "Mystery Gift (Event) RNG",
      description: "RNG your events to have 6 IVs",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-mystery-gift",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Mystery Gift.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Mystery Gift.mdx")),
  },
  "/retail-usum-no-cfw": {
    meta: {
      title: "RNGing without Custom Firmware",
      description: "Get your perfect Pokémon without custom firmware",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-no-cfw",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/RNGing Without Custom Firmware.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/RNGing Without Custom Firmware.mdx"),
    ),
  },
  "/retail-usum-sos": {
    meta: {
      title: "SOS RNG",
      description:
        "Master one of the most challenging Gen 7 RNGs for fun rewards",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-sos",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/SOS RNG Guide.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/SOS RNG Guide.mdx")),
  },
  "/retail-usum-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG the overworld Pokémon to have 6 IVs.",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-stationary",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Stationary RNG.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Stationary RNG.mdx")),
  },
  "/retail-usum-timeleap": {
    meta: {
      title: "Timeline Leap",
      description: "Predict and jump onto specific Pokemon timelines",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-timeleap",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Timeline Leap Guide.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Timeline Leap Guide.mdx"),
    ),
  },
  "/retail-usum-timeline": {
    meta: {
      title: "Timeline Guide",
      description: "Key skill for Gen 7 RNG with custom firmware",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-timeline",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Timeline Guide.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Timeline Guide.mdx")),
  },
  "/retail-usum-wild": {
    meta: {
      title: "Wild RNG",
      description: "RNG for wild Pokémon using honey in Sun and Moon",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-wild",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Wild RNG.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 7/Wild RNG.mdx")),
  },
  "/retail-usum-wormhole": {
    meta: {
      title: "Wormhole Stationary RNG",
      description: "Get your own perfect legendary Pokémon!",
      category: "Ultra Sun and Ultra Moon",
      slug: "/retail-usum-wormhole",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 7/Stationary Wormhole RNG.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 7/Stationary Wormhole RNG.mdx"),
    ),
  },
  "/retail-xy-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda Method or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      category: "X and Y",
      slug: "/retail-xy-egg-mmsc",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-xy-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide Without Masuda or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      category: "X and Y",
      slug: "/retail-xy-egg-no-mmsc",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 6/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/rs-battery": {
    meta: {
      title: "Difference between Live and Dry Battery",
      description:
        "Discover the two ways to RNG on Ruby/Sapphire and learn their differences",
      slug: "/rs-battery",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Live and Dry Battery.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Live and Dry Battery.mdx"),
    ),
  },
  "/rs-gen3-sid": {
    meta: {
      title: "Find Gen 3 SID",
      description: "Various methods to finding an SID in Gen 3",
      category: "Ruby and Sapphire",
      slug: "/rs-gen3-sid",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Find SID.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Find SID.mdx")),
  },
  "/rs-initial-seed": {
    meta: {
      title: "Initial Seed RNG",
      description: "How to use Runasdate for RS Live Battery RNG",
      slug: "/rs-initial-seed",
      isRoughDraft: true,
      tag: "emu",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Initial Seed RNG.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Initial Seed RNG.mdx"),
    ),
  },
  "/rs-pokefinder-setup": {
    meta: {
      title: "PokeFinder Setup",
      description: "How to set up PokeFinder",
      slug: "/rs-pokefinder-setup",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/PokeFinder Setup.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/PokeFinder Setup.mdx"),
    ),
  },
  "/rs-sid-feebas": {
    meta: {
      title: "Find SID with Feebas",
      description:
        "How to find your Secret ID (SID) in Ruby or Sapphire using Feebas.",
      category: "Ruby and Sapphire",
      slug: "/rs-sid-feebas",
      isRoughDraft: false,
      tag: "retail",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Find SID with Feebas.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Find SID with Feebas.mdx"),
    ),
  },
  "/rs-static-generator": {
    meta: {
      title: "Ruby and Sapphire Static3 Generator",
      description: "Generator for Static encounters in Ruby and Sapphire",
      category: "Ruby and Sapphire",
      slug: "/rs-static-generator",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Gen 3 Static Generator.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Gen 3 Static Generator.mdx"),
    ),
  },
  "/rs-tidsid-generator": {
    meta: {
      title: "RS TID and SID Generator",
      description: "Generator for TID and SID in RS",
      category: "Ruby and Sapphire",
      slug: "/rs-tidsid-generator",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Gen 3 TID SID Generator.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
  },
  "/rs-tips-rng": {
    meta: {
      title: "Basic rules of Gen 3 RNG",
      description:
        "How to advance the RNG and tips to make everything more stable",
      slug: "/rs-tips-rng",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Ruby and Sapphire/Basic Rules of RNG.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Basic Rules of RNG.mdx"),
    ),
  },
  "/sysbot-lpa-mmo": {
    meta: {
      title: "MMO RNG",
      description: "How to RNG MMOs using Sysbot and PermuteMMO",
      category: "Legends Arceus",
      slug: "/sysbot-lpa-mmo",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Legends Arceus/MMO.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Legends Arceus/MMO.mdx")),
  },
  "/transporter-patches": {
    meta: {
      title: "Transporter Patches",
      description: "Various patches for use with Transporter",
      category: "Tools and Emulators",
      slug: "/transporter-patches",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Tools and Emulators/Transporter Patches.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Transporter Patches.mdx"),
    ),
  },
  "/transporter-rng": {
    meta: {
      title: "Transporter with PCalc",
      description: "Transfer your Gen 1/2 Pokémon to always be 6IV.",
      category: "Transporter",
      slug: "/transporter-rng",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Transporter/Transporter.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Transporter/Transporter.mdx")),
  },
  "/transporter-rng-offline": {
    meta: {
      title: "Transporter RNG using the Offline Patch",
      description: "Ensure a stable delay for easier RNG",
      category: "Transporter",
      slug: "/transporter-rng-offline",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Transporter/Transporter with Offline Patch.mdx",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Transporter/Transporter with Offline Patch.mdx"),
    ),
  },
  "/xdcolo-tidsid-generator": {
    meta: {
      title: "XD and Colo TID and SID Generator",
      description: "Generator for TID and SID in XD and Colo",
      category: "Gamecube",
      slug: "/xdcolo-tidsid-generator",
      isRoughDraft: true,
      tag: "any",
      hideFromNavDrawer: false,
      addedOn: null,
      file: "guides/Emerald/Gen 3 TID SID Generator.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Emerald/Gen 3 TID SID Generator.mdx"),
    ),
  },
  "/xy-pokeradar": {
    meta: {
      title: "PokeRadar RNG",
      description: "Shiny hunt with the PokeRadar in XY!",
      category: "X and Y",
      slug: "/xy-pokeradar",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: false,
      addedOn: "2025-03-24",
      file: "guides/Gen 6/PokeRadar.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 6/PokeRadar.mdx")),
  },
  "/zh-dppt-advance-rng": {
    meta: {
      title: "乱数的帧数推进方法",
      description: "推进乱数帧数的不同方法及影响帧数的事件机制",
      category: "Diamond, Pearl, and Platinum",
      slug: "/zh-dppt-advance-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Advancing the RNG.mdx"
        ),
    ),
  },
  "/zh-dppt-initial-seed": {
    meta: {
      title: "初始种子乱数",
      description: "如何在《钻石, 珍珠, 白金》中进行初始种子乱数",
      category: "Diamond, Pearl, and Platinum",
      slug: "/zh-dppt-initial-seed",
      isRoughDraft: false,
      tag: "emu",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Gen 4/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx"
        ),
    ),
  },
  "/zh-dppt-pokeradar-rng": {
    meta: {
      title: "宝可追踪乱数",
      description: "两种不同的宝可追踪乱数方法",
      category: "Diamond, Pearl, and Platinum",
      slug: "/zh-dppt-pokeradar-rng",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/PokeRadar.mdx"),
    ),
  },
  "/zh-dppt-wild": {
    meta: {
      title: "野生乱数",
      description: "野生乱数",
      category: "Diamond, Pearl, and Platinum",
      slug: "/zh-dppt-wild",
      isRoughDraft: false,
      tag: "any",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gen 4/Diamond, Pearl, and Platinum/Wild.mdx"),
    ),
  },
  "/zh-gen2-celebi": {
    meta: {
      title: "时拉比",
      description: "如何获得异色时拉比",
      category: "Gold, Silver, Crystal",
      slug: "/zh-gen2-celebi",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: true,
      addedOn: "2025-03-27",
      file: "guides/Gen 2/Celebi.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/Celebi.mdx")),
  },
  "/zh-gen2-starters": {
    meta: {
      title: "水晶初始宝可梦乱数",
      description: "在水晶里获得异色初始宝可梦",
      category: "Gold, Silver, Crystal",
      slug: "/zh-gen2-starters",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Gen 2/Starter.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Gen 2/Starter.mdx")),
  },
  "/zh-install-pokereader": {
    meta: {
      title: "3DS安装PokeReader",
      description: "在3DS上安装工具来帮助乱数宝可梦",
      category: "Tools and Emulators",
      slug: "/zh-install-pokereader",
      isRoughDraft: false,
      tag: "cfw",
      hideFromNavDrawer: true,
      addedOn: null,
      file: "guides/Tools and Emulators/3DS PokeReader.mdx",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/3DS PokeReader.mdx"),
    ),
  },
} as const;

export const guideSlugs = [
  z.literal("/"),
  z.literal("/bdsp-advance-rng"),
  z.literal("/bdsp-chatot"),
  z.literal("/bdsp-emulator-setup"),
  z.literal("/bdsp-pokefinder"),
  z.literal("/bw2-egg"),
  z.literal("/cfw-bdsp-egg"),
  z.literal("/cfw-bdsp-stationary"),
  z.literal("/cfw-bdsp-tidandsid"),
  z.literal("/cfw-bdsp-wild"),
  z.literal("/channel-jirachi"),
  z.literal("/citrarng-setup"),
  z.literal("/desmume-setup"),
  z.literal("/dppt-advance-rng"),
  z.literal("/dppt-initial-seed"),
  z.literal("/dppt-pokeradar-rng"),
  z.literal("/dppt-setup-rng"),
  z.literal("/dppt-wild"),
  z.literal("/e-tips-rng"),
  z.literal("/zh-e-tips-rng"),
  z.literal("/emerald-painting-rng"),
  z.literal("/zh-emerald-painting-rng"),
  z.literal("/emerald-sid-feebas"),
  z.literal("/emerald-static-generator"),
  z.literal("/emerald-tidsid-generator"),
  z.literal("/emulator-b2w2-dream-radar"),
  z.literal("/emulator-b2w2-runasdate-inital-seed"),
  z.literal("/emulator-b2w2-wild"),
  z.literal("/emulator-bw-entralink"),
  z.literal("/emulator-bw-find-ds-parameters"),
  z.literal("/emulator-bw-roamers"),
  z.literal("/emulator-bw-runasdate-initial-seed"),
  z.literal("/emulator-bw-white-forest"),
  z.literal("/emulator-bw-wild"),
  z.literal("/emulator-colosseum-general"),
  z.literal("/emulator-dppt-cute-charm"),
  z.literal("/emulator-dppt-egg"),
  z.literal("/emulator-dppt-pokefinder-setup"),
  z.literal("/emulator-dppt-stationary"),
  z.literal("/emulator-dppt-tid-sid"),
  z.literal("/emulator-emerald-egg"),
  z.literal("/zh-emulator-emerald-egg"),
  z.literal("/emulator-flrg-stationary-and-gift"),
  z.literal("/emulator-frlg-egg"),
  z.literal("/emulator-frlg-stationary"),
  z.literal("/emulator-frlg-wild"),
  z.literal("/emulator-frlg-wild-v2"),
  z.literal("/emulator-hgss-breeding"),
  z.literal("/emulator-hgss-cute-charm"),
  z.literal("/emulator-hgss-egg"),
  z.literal("/emulator-hgss-special-wild"),
  z.literal("/emulator-hgss-stationary"),
  z.literal("/emulator-hgss-tid-sid"),
  z.literal("/emulator-hgss-wild"),
  z.literal("/emulator-hgss-wondercard"),
  z.literal("/emulator-oras-dexnav"),
  z.literal("/emulator-rs-dead-battery-stationary"),
  z.literal("/emulator-rs-egg"),
  z.literal("/emulator-rs-live-battery-tid"),
  z.literal("/emulator-rs-stationary"),
  z.literal("/emulator-rs-wild"),
  z.literal("/emulator-rs-wishmaker"),
  z.literal("/emulator-sm-time-finder"),
  z.literal("/emulator-usum-time-finder"),
  z.literal("/es-gen2-starters"),
  z.literal("/frlg-gen3-sid"),
  z.literal("/frlg-seeding-bot"),
  z.literal("/frlg-static-generator"),
  z.literal("/frlg-tidsid-generator"),
  z.literal("/frlg-tips-rng"),
  z.literal("/gc-initial"),
  z.literal("/gen2-celebi"),
  z.literal("/gen2-research"),
  z.literal("/gen2-starters"),
  z.literal("/gen3-sid"),
  z.literal("/hgss-initial-seed"),
  z.literal("/hgss-rng-advance"),
  z.literal("/install-capturesight"),
  z.literal("/install-pokereader"),
  z.literal("/install-pokereader-emu"),
  z.literal("/mgba-setup"),
  z.literal("/misc-3ds-installing-pcalc"),
  z.literal("/misc-3ds-ips-luma-citra"),
  z.literal("/misc-3ds-island-scan-sm"),
  z.literal("/misc-3ds-island-scan-usum"),
  z.literal("/misc-3ds-transporter-nature-tables"),
  z.literal("/misc-dolphin-connect-vba"),
  z.literal("/misc-dolphin-gba-bios"),
  z.literal("/misc-sm-wild-spots"),
  z.literal("/mystic-timer"),
  z.literal("/no-dolphin-patch"),
  z.literal("/ntr-helper-usage"),
  z.literal("/oras-mirage-spots"),
  z.literal("/oras-remove-time-penalty"),
  z.literal("/pal-xd-eevee"),
  z.literal("/pcalc-xy-friend-safari"),
  z.literal("/pcalc-xy-tid"),
  z.literal("/retail-bw-entralink"),
  z.literal("/retail-emerald-wild"),
  z.literal("/zh-retail-emerald-wild"),
  z.literal("/retail-oras-egg-mmsc"),
  z.literal("/retail-oras-egg-no-mmsc"),
  z.literal("/retail-oras-tid"),
  z.literal("/retail-sm-egg-mmsc"),
  z.literal("/retail-sm-egg-no-mmsc"),
  z.literal("/retail-sm-egg-seed-no-cfw"),
  z.literal("/retail-sm-fidget"),
  z.literal("/retail-sm-initial-seed-clocks"),
  z.literal("/retail-sm-island-scan"),
  z.literal("/retail-sm-myster-gift"),
  z.literal("/retail-sm-no-cfw"),
  z.literal("/retail-sm-sos"),
  z.literal("/retail-sm-stationary"),
  z.literal("/retail-sm-timeleap"),
  z.literal("/retail-sm-timeline"),
  z.literal("/retail-sm-wild"),
  z.literal("/retail-swsh-get-seed-with-cfw"),
  z.literal("/retail-swsh-get-seed-without-cfw"),
  z.literal("/retail-swsh-raid"),
  z.literal("/retail-usum-egg-mmsc"),
  z.literal("/retail-usum-egg-no-mmsc"),
  z.literal("/retail-usum-egg-seed-no-cfw"),
  z.literal("/retail-usum-fidget"),
  z.literal("/retail-usum-initial-seed-clocks"),
  z.literal("/retail-usum-island-scan"),
  z.literal("/retail-usum-mystery-gift"),
  z.literal("/retail-usum-no-cfw"),
  z.literal("/retail-usum-sos"),
  z.literal("/retail-usum-stationary"),
  z.literal("/retail-usum-timeleap"),
  z.literal("/retail-usum-timeline"),
  z.literal("/retail-usum-wild"),
  z.literal("/retail-usum-wormhole"),
  z.literal("/retail-xy-egg-mmsc"),
  z.literal("/retail-xy-egg-no-mmsc"),
  z.literal("/rs-battery"),
  z.literal("/rs-gen3-sid"),
  z.literal("/rs-initial-seed"),
  z.literal("/rs-pokefinder-setup"),
  z.literal("/rs-sid-feebas"),
  z.literal("/rs-static-generator"),
  z.literal("/rs-tidsid-generator"),
  z.literal("/rs-tips-rng"),
  z.literal("/sysbot-lpa-mmo"),
  z.literal("/transporter-patches"),
  z.literal("/transporter-rng"),
  z.literal("/transporter-rng-offline"),
  z.literal("/xdcolo-tidsid-generator"),
  z.literal("/xy-pokeradar"),
  z.literal("/zh-dppt-advance-rng"),
  z.literal("/zh-dppt-initial-seed"),
  z.literal("/zh-dppt-pokeradar-rng"),
  z.literal("/zh-dppt-wild"),
  z.literal("/zh-gen2-celebi"),
  z.literal("/zh-gen2-starters"),
  z.literal("/zh-install-pokereader"),
] as const;

export const categories = [
  "Home",
  "Tools and Emulators",
  "Gold, Silver, Crystal",
  "Transporter",
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
] as const;
