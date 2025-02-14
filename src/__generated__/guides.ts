import React from "react";
import { z } from "zod";

export const guides = {
  "/": {
    meta: {
      title: "PokémonRNG.com – Get Perfect Pokémon Every Time",
      description: "No luck needed—just results.",
      slug: "/",
      isRoughDraft: false,
      file: "guides/Home.mdx",
      category: "Home.mdx",
    },
    Guide: React.lazy(() => import("~/../guides/Home.mdx")),
  },
  "/emulator-emerald-egg": {
    meta: {
      title: "Egg RNG",
      description: "RNG Eggs from the Daycare",
      slug: "/emulator-emerald-egg",
      isRoughDraft: false,
      file: "guides/Emerald/Egg RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Egg RNG.mdx")),
  },
  "/e-tips-rng": {
    meta: {
      title: "Basic rules of Gen 3 RNG",
      description:
        "How to advance the RNG and tips to make everything more stable",
      slug: "/e-tips-rng",
      isRoughDraft: true,
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
      file: "guides/Emerald/Reseed RNG.mdx",
      category: "Emerald",
    },
    Guide: React.lazy(() => import("~/../guides/Emerald/Reseed RNG.mdx")),
  },
  "/hgss-rng-advance": {
    meta: {
      title: "Advancing the RNG",
      description:
        "The different methods the RNG can be advanced and events that influence the RNG",
      slug: "/hgss-rng-advance",
      isRoughDraft: false,
      file: "guides/HeartGold and SoulSilver/Advancing the RNG.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/HeartGold and SoulSilver/Advancing the RNG.mdx"),
    ),
  },
  "/emulator-hgss-tid-sid": {
    meta: {
      title: "TID/SID RNG",
      description: "How to get a desired TID/SID combo",
      slug: "/emulator-hgss-tid-sid",
      isRoughDraft: true,
      file: "guides/HeartGold and SoulSilver/TID SID.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () => import("~/../guides/HeartGold and SoulSilver/TID SID.mdx"),
    ),
  },
  "/emulator-hgss-cute-charm": {
    meta: {
      title: "Cute Charm RNG",
      description: "How to use Cute Charm with TID/SID RNG",
      slug: "/emulator-hgss-cute-charm",
      isRoughDraft: false,
      file: "guides/HeartGold and SoulSilver/Cute Charm.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () => import("~/../guides/HeartGold and SoulSilver/Cute Charm.mdx"),
    ),
  },
  "/emulator-hgss-breeding": {
    meta: {
      title: "Breeding RNG",
      description: "Breeding RNG",
      slug: "/emulator-hgss-breeding",
      isRoughDraft: true,
      file: "guides/HeartGold and SoulSilver/Breeding RNG (Emu).mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/HeartGold and SoulSilver/Breeding RNG (Emu).mdx"),
    ),
  },
  "/emulator-hgss-special-wild": {
    meta: {
      title: "Special Wild RNG",
      description: "Special Wild RNG",
      slug: "/emulator-hgss-special-wild",
      isRoughDraft: true,
      file: "guides/HeartGold and SoulSilver/Special Wild Case (Emu).mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/HeartGold and SoulSilver/Special Wild Case (Emu).mdx"
        ),
    ),
  },
  "/hgss-initial-seed": {
    meta: {
      title: "Initial Seed RNG",
      description: "How to RNG an initial seed in HeartGold/SoulSilver",
      slug: "/hgss-initial-seed",
      isRoughDraft: false,
      file: "guides/HeartGold and SoulSilver/Initial Seed RNG.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () => import("~/../guides/HeartGold and SoulSilver/Initial Seed RNG.mdx"),
    ),
  },
  "/emulator-hgss-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG eggs from the daycare",
      slug: "/emulator-hgss-egg",
      isRoughDraft: false,
      file: "guides/HeartGold and SoulSilver/Egg.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () => import("~/../guides/HeartGold and SoulSilver/Egg.mdx"),
    ),
  },
  "/emulator-hgss-wondercard": {
    meta: {
      title: "Wondercard RNG",
      description: "How to RNG Wondercards",
      slug: "/emulator-hgss-wondercard",
      isRoughDraft: true,
      file: "guides/HeartGold and SoulSilver/Wondercard.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () => import("~/../guides/HeartGold and SoulSilver/Wondercard.mdx"),
    ),
  },
  "/emulator-hgss-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      slug: "/emulator-hgss-wild",
      isRoughDraft: true,
      file: "guides/HeartGold and SoulSilver/Wild RNG - Emulator.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/HeartGold and SoulSilver/Wild RNG - Emulator.mdx"),
    ),
  },
  "/emulator-hgss-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG for stationary Pokémon",
      slug: "/emulator-hgss-stationary",
      isRoughDraft: false,
      file: "guides/HeartGold and SoulSilver/Stationary RNG Emu.mdx",
      category: "HeartGold and SoulSilver",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/HeartGold and SoulSilver/Stationary RNG Emu.mdx"),
    ),
  },
  "/emulator-frlg-egg": {
    meta: {
      title: "FRLG Egg RNG",
      description: "RNG eggs in FRLG",
      slug: "/emulator-frlg-egg",
      isRoughDraft: false,
      file: "guides/FireRed and LeafGreen/Egg RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Egg RNG.mdx"),
    ),
  },
  "/frlg-tips-rng": {
    meta: {
      title: "Basic rules of Gen 3 RNG",
      description:
        "How to advance the RNG and tips to make everything more stable",
      slug: "/frlg-tips-rng",
      isRoughDraft: true,
      file: "guides/FireRed and LeafGreen/Basic Rules of RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Basic Rules of RNG.mdx"),
    ),
  },
  "/emulator-frlg-wild-v2": {
    meta: {
      title: "Wild v2 RNG",
      description: "Wild v2 RNG",
      slug: "/emulator-frlg-wild-v2",
      isRoughDraft: true,
      file: "guides/FireRed and LeafGreen/wildv2lua.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/wildv2lua.mdx"),
    ),
  },
  "/frlg-seeding-bot": {
    meta: {
      title: "Initial Seed Botting",
      description:
        "How to use the Initial Seed Bot for more control in your RNGs",
      slug: "/frlg-seeding-bot",
      isRoughDraft: false,
      file: "guides/FireRed and LeafGreen/Initial Seed Botting.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/FireRed and LeafGreen/Initial Seed Botting.mdx"),
    ),
  },
  "/emulator-frlg-wild": {
    meta: {
      title: "Wild RNG",
      description:
        "RNG for Pokémon encountered in the wild using Sweet Scent in FireRed/LeafGreen",
      slug: "/emulator-frlg-wild",
      isRoughDraft: false,
      file: "guides/FireRed and LeafGreen/Wild RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Wild RNG.mdx"),
    ),
  },
  "/emulator-frlg-stationary": {
    meta: {
      title: "Stationary v2 RNG",
      description: "Stationary v2 RNG",
      slug: "/emulator-frlg-stationary",
      isRoughDraft: true,
      file: "guides/FireRed and LeafGreen/Stationary v2 Emu.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () => import("~/../guides/FireRed and LeafGreen/Stationary v2 Emu.mdx"),
    ),
  },
  "/emulator-flrg-stationary-and-gift": {
    meta: {
      title: "FRLG Stationary/Gift RNG",
      description: "Get shiny 6 IV stationaries from FRLG",
      slug: "/emulator-flrg-stationary-and-gift",
      isRoughDraft: false,
      file: "guides/FireRed and LeafGreen/Stationary and Gift RNG.mdx",
      category: "FireRed and LeafGreen",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/FireRed and LeafGreen/Stationary and Gift RNG.mdx"),
    ),
  },
  "/retail-usum-timeline": {
    meta: {
      title: "Timeline Guide",
      description: "Key skill for Gen 7 RNG with custom firmware",
      slug: "/retail-usum-timeline",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Timeline Guide.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ultra Sun and Ultra Moon/Timeline Guide.mdx"),
    ),
  },
  "/retail-usum-sos": {
    meta: {
      title: "SOS RNG",
      description:
        "Master one of the most challenging Gen 7 RNGs for fun rewards",
      slug: "/retail-usum-sos",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/SOS RNG Guide.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ultra Sun and Ultra Moon/SOS RNG Guide.mdx"),
    ),
  },
  "/retail-usum-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide without Masuda and/or Shiny Charm",
      description:
        "RNG for eggs without using Masuda Method and without the Shiny Charm",
      slug: "/retail-usum-egg-no-mmsc",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-usum-timeleap": {
    meta: {
      title: "Timeline Leap",
      description: "Predict and jump onto specific Pokemon timelines",
      slug: "/retail-usum-timeleap",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Timeline Leap Guide.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Ultra Sun and Ultra Moon/Timeline Leap Guide.mdx"),
    ),
  },
  "/retail-usum-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG the overworld Pokémon to have 6 IVs.",
      slug: "/retail-usum-stationary",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Stationary RNG.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ultra Sun and Ultra Moon/Stationary RNG.mdx"),
    ),
  },
  "/emulator-usum-time-finder": {
    meta: {
      title: "Time Finder (Citra)",
      description: "Finding times to get specific RNG seeds",
      slug: "/emulator-usum-time-finder",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Time Finder.js (Citra).mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/Time Finder.js (Citra).mdx"
        ),
    ),
  },
  "/misc-3ds-island-scan-usum": {
    meta: {
      title: "Ultra Sun and Ultra Moon Island Scan Pokemon",
      description: "Check Island Scan Pokemon for Ultra Sun and Ultra Moon!",
      slug: "/misc-3ds-island-scan-usum",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Island Scan Pokemon.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Ultra Sun and Ultra Moon/Island Scan Pokemon.mdx"),
    ),
  },
  "/retail-usum-wild": {
    meta: {
      title: "Wild RNG",
      description: "RNG for wild Pokémon using honey in Sun and Moon",
      slug: "/retail-usum-wild",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Wild RNG.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ultra Sun and Ultra Moon/Wild RNG.mdx"),
    ),
  },
  "/retail-usum-island-scan": {
    meta: {
      title: "Island Scan",
      description: "Easy shinies in apricorn balls",
      slug: "/retail-usum-island-scan",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Island Scan.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ultra Sun and Ultra Moon/Island Scan.mdx"),
    ),
  },
  "/retail-usum-egg-seed-no-cfw": {
    meta: {
      title: "Finding Egg Seeds Without CFW/Homebrew",
      description: "Find your egg seeds for Egg RNG using the Magikarp Method",
      slug: "/retail-usum-egg-seed-no-cfw",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/How to Find Egg Seeds Without Custom Firmware.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
  },
  "/retail-usum-no-cfw": {
    meta: {
      title: "RNGing without Custom Firmware",
      description: "Get your perfect Pokémon without custom firmware",
      slug: "/retail-usum-no-cfw",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/RNGing Without Custom Firmware.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/RNGing Without Custom Firmware.mdx"
        ),
    ),
  },
  "/retail-usum-mystery-gift": {
    meta: {
      title: "Mystery Gift (Event) RNG",
      description: "RNG your events to have 6 IVs",
      slug: "/retail-usum-mystery-gift",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Mystery Gift.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ultra Sun and Ultra Moon/Mystery Gift.mdx"),
    ),
  },
  "/retail-usum-initial-seed-clocks": {
    meta: {
      title: "Finding your initial seed in Gen 7 with clocks",
      description:
        "This guide allows you to find your initial seed without using custom firmware.",
      slug: "/retail-usum-initial-seed-clocks",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Finding Initial Seed with Clocks.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/Finding Initial Seed with Clocks.mdx"
        ),
    ),
  },
  "/retail-usum-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda and/or Shiny Charm",
      description:
        "RNG for eggs using Masuda Method and/or with the Shiny Charm",
      slug: "/retail-usum-egg-mmsc",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Egg RNG With Masuda Method or Shiny Charm.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-usum-fidget": {
    meta: {
      title: "Timeline with Fidget",
      description: "Using the timeline method with character fidgets",
      slug: "/retail-usum-fidget",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Timeline With Fidget Guide.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/Timeline With Fidget Guide.mdx"
        ),
    ),
  },
  "/retail-usum-wormhole": {
    meta: {
      title: "Wormhole Stationary RNG",
      description: "Get your own perfect legendary Pokémon!",
      slug: "/retail-usum-wormhole",
      isRoughDraft: false,
      file: "guides/Ultra Sun and Ultra Moon/Stationary Wormhole RNG.mdx",
      category: "Ultra Sun and Ultra Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Ultra Sun and Ultra Moon/Stationary Wormhole RNG.mdx"
        ),
    ),
  },
  "/bdsp-advance-rng": {
    meta: {
      title: "Advancing the RNG",
      description:
        "The different methods the RNG can be advanced and events that influence the RNG",
      slug: "/bdsp-advance-rng",
      isRoughDraft: false,
      file: "guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/Advancing the RNG.mdx"
        ),
    ),
  },
  "/bdsp-emulator-setup": {
    meta: {
      title: "Set up Yuzu/Ryujinx & CheatEngine",
      description:
        "How to set up Yuzu/Ryujinx and Cheat Engine to RNG in BDSP using Lua scripts",
      slug: "/bdsp-emulator-setup",
      isRoughDraft: true,
      file: "guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - Emulator Setup.mdx"
        ),
    ),
  },
  "/cfw-bdsp-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG Stationary Pokemon such as your starter Pokemon",
      slug: "/cfw-bdsp-stationary",
      isRoughDraft: false,
      file: "guides/Brilliant Diamond and Shining Pearl/Stationary.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/Stationary.mdx"
        ),
    ),
  },
  "/bdsp-pokefinder": {
    meta: {
      title: "PokeFinder Setup",
      description:
        "How to set up PokeFinder to RNG in Brilliant Diamond and Shining Pearl",
      slug: "/bdsp-pokefinder",
      isRoughDraft: true,
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use PokeFinder.mdx"
        ),
    ),
  },
  "/cfw-bdsp-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG Eggs with CaptureSight",
      slug: "/cfw-bdsp-egg",
      isRoughDraft: true,
      file: "guides/Brilliant Diamond and Shining Pearl/Egg.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () => import("~/../guides/Brilliant Diamond and Shining Pearl/Egg.mdx"),
    ),
  },
  "/cfw-bdsp-wild": {
    meta: {
      title: "Wild RNG",
      description: "Information for RNG wild Pokémon",
      slug: "/cfw-bdsp-wild",
      isRoughDraft: true,
      file: "guides/Brilliant Diamond and Shining Pearl/Wild.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () => import("~/../guides/Brilliant Diamond and Shining Pearl/Wild.mdx"),
    ),
  },
  "/bdsp-chatot": {
    meta: {
      title: "How to Use Chatot",
      description:
        "How to use the chatot.pokemonrng.com website for RNG in BDSP",
      slug: "/bdsp-chatot",
      isRoughDraft: true,
      file: "guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/BK - How to use Shiny's site.mdx"
        ),
    ),
  },
  "/cfw-bdsp-tidandsid": {
    meta: {
      title: "TID/SID RNG",
      description: "How to RNG your TID/SID with CaptureSight",
      slug: "/cfw-bdsp-tidandsid",
      isRoughDraft: true,
      file: "guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx",
      category: "Brilliant Diamond and Shining Pearl",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Brilliant Diamond and Shining Pearl/TID SID RNG.mdx"
        ),
    ),
  },
  "/retail-swsh-get-seed-with-cfw": {
    meta: {
      title: "Get raid seed with custom firmware",
      description: "Use this if you have a switch with custom firmware.",
      slug: "/retail-swsh-get-seed-with-cfw",
      isRoughDraft: false,
      file: "guides/Sword and Shield/Get Raid Seed With CFW.mdx",
      category: "Sword and Shield",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sword and Shield/Get Raid Seed With CFW.mdx"),
    ),
  },
  "/retail-swsh-raid": {
    meta: {
      title: "Raid RNG",
      description:
        "RNG raid Pokémon (even G-max!) found in Dens! Use this after getting your den seed.",
      slug: "/retail-swsh-raid",
      isRoughDraft: false,
      file: "guides/Sword and Shield/Raid RNG.mdx",
      category: "Sword and Shield",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sword and Shield/Raid RNG.mdx"),
    ),
  },
  "/retail-swsh-get-seed-without-cfw": {
    meta: {
      title: "Get raid seed without custom firmware",
      description: "Use this if you do not have a switch with custom firmware",
      slug: "/retail-swsh-get-seed-without-cfw",
      isRoughDraft: false,
      file: "guides/Sword and Shield/Get Raid Seed Without CFW.mdx",
      category: "Sword and Shield",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Sword and Shield/Get Raid Seed Without CFW.mdx"),
    ),
  },
  "/retail-oras-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide Without Masuda or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      slug: "/retail-oras-egg-no-mmsc",
      isRoughDraft: false,
      file: "guides/Omega Ruby and Alpha Sapphire/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      category: "Omega Ruby and Alpha Sapphire",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Omega Ruby and Alpha Sapphire/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/emulator-oras-dexnav": {
    meta: {
      title: "DexNav RNG",
      description: "DexNav RNG for ORAS. Citra is 100% recommended.",
      slug: "/emulator-oras-dexnav",
      isRoughDraft: true,
      file: "guides/Omega Ruby and Alpha Sapphire/DexNav RNG.mdx",
      category: "Omega Ruby and Alpha Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Omega Ruby and Alpha Sapphire/DexNav RNG.mdx"),
    ),
  },
  "/retail-oras-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda Method or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      slug: "/retail-oras-egg-mmsc",
      isRoughDraft: false,
      file: "guides/Omega Ruby and Alpha Sapphire/Egg RNG With Masuda Method or Shiny Charm.mdx",
      category: "Omega Ruby and Alpha Sapphire",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Omega Ruby and Alpha Sapphire/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-oras-tid": {
    meta: {
      title: "Trainer ID RNG",
      description: "RNG for that special TID/SID/TSV",
      slug: "/retail-oras-tid",
      isRoughDraft: false,
      file: "guides/Omega Ruby and Alpha Sapphire/TID RNG Guide.mdx",
      category: "Omega Ruby and Alpha Sapphire",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Omega Ruby and Alpha Sapphire/TID RNG Guide.mdx"),
    ),
  },
  "/misc-3ds-transporter-nature-tables": {
    meta: {
      title: "Transporter EXP to Nature Conversion Table (VC)",
      description: "A quick way to check the nature your VC Pokémon will be",
      slug: "/misc-3ds-transporter-nature-tables",
      isRoughDraft: false,
      file: "guides/Transporter/Nature Table.mdx",
      category: "Transporter",
    },
    Guide: React.lazy(() => import("~/../guides/Transporter/Nature Table.mdx")),
  },
  "/transporter-rng-offline": {
    meta: {
      title: "Transporter RNG using the Offline Patch",
      description: "Ensure a stable delay for easier RNG",
      slug: "/transporter-rng-offline",
      isRoughDraft: false,
      file: "guides/Transporter/Transporter with Offline Patch.mdx",
      category: "Transporter",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Transporter/Transporter with Offline Patch.mdx"),
    ),
  },
  "/transporter-rng": {
    meta: {
      title: "Transporter with PCalc",
      description: "Transfer your Gen 1/2 Pokémon to always be 6IV.",
      slug: "/transporter-rng",
      isRoughDraft: false,
      file: "guides/Transporter/Transporter.mdx",
      category: "Transporter",
    },
    Guide: React.lazy(() => import("~/../guides/Transporter/Transporter.mdx")),
  },
  "/retail-xy-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide Without Masuda or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      slug: "/retail-xy-egg-no-mmsc",
      isRoughDraft: false,
      file: "guides/X and Y/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      category: "X and Y",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/X and Y/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/pcalc-xy-friend-safari": {
    meta: {
      title: "Friend Safari RNG",
      description: "Get shiny 6IV friend safari Pokémon, like Ditto!",
      slug: "/pcalc-xy-friend-safari",
      isRoughDraft: false,
      file: "guides/X and Y/Friend Safari RNG Guide.mdx",
      category: "X and Y",
    },
    Guide: React.lazy(
      () => import("~/../guides/X and Y/Friend Safari RNG Guide.mdx"),
    ),
  },
  "/pcalc-xy-tid": {
    meta: {
      title: "Trainer ID, Secret ID, and/or TSV RNG",
      description: "RNG for a specific Trainer ID, SID, or TSV",
      slug: "/pcalc-xy-tid",
      isRoughDraft: false,
      file: "guides/X and Y/XY Trainer ID, Secret ID, and TSV RNG Guide.mdx",
      category: "X and Y",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/X and Y/XY Trainer ID, Secret ID, and TSV RNG Guide.mdx"
        ),
    ),
  },
  "/retail-xy-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda Method or Shiny Charm",
      description: "RNG your perfect Pokemon at the daycare",
      slug: "/retail-xy-egg-mmsc",
      isRoughDraft: false,
      file: "guides/X and Y/Egg RNG With Masuda Method or Shiny Charm.mdx",
      category: "X and Y",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/X and Y/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-sm-timeline": {
    meta: {
      title: "Timeline Guide",
      description: "Key skill for Gen 7 RNG with custom firmware",
      slug: "/retail-sm-timeline",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Timeline Guide.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Timeline Guide.mdx"),
    ),
  },
  "/misc-sm-wild-spots": {
    meta: {
      title: "Wild Pokémon Locations",
      description:
        "Where to place your character and the correction needed for each area to RNG wild Pokémon in Sun and Moon",
      slug: "/misc-sm-wild-spots",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Wild Spots.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(() => import("~/../guides/Sun and Moon/Wild Spots.mdx")),
  },
  "/retail-sm-egg-no-mmsc": {
    meta: {
      title: "Egg RNG Guide without Masuda and/or Shiny Charm",
      description:
        "RNG for eggs without using Masuda Method and without the Shiny Charm",
      slug: "/retail-sm-egg-no-mmsc",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Egg RNG Without Masuda Method or Shiny Charm.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Sun and Moon/Egg RNG Without Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-sm-timeleap": {
    meta: {
      title: "Timeline Leap",
      description: "Predict and jump onto specific Pokemon timelines",
      slug: "/retail-sm-timeleap",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Timeline Leap Guide.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Timeline Leap Guide.mdx"),
    ),
  },
  "/retail-sm-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG the overworld Pokémon to have 6 IVs.",
      slug: "/retail-sm-stationary",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Stationary RNG.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Stationary RNG.mdx"),
    ),
  },
  "/emulator-sm-time-finder": {
    meta: {
      title: "Time Finder (Citra)",
      description: "Finding times to get specific RNG seeds",
      slug: "/emulator-sm-time-finder",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Time Finder.js (Citra).mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Time Finder.js (Citra).mdx"),
    ),
  },
  "/misc-3ds-island-scan-sm": {
    meta: {
      title: "Sun and Moon Island Scan Pokemon",
      description: "Check Island Scan Pokemon for Sun and Moon!",
      slug: "/misc-3ds-island-scan-sm",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Island Scan Pokemon.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Island Scan Pokemon.mdx"),
    ),
  },
  "/retail-sm-wild": {
    meta: {
      title: "Wild RNG",
      description: "RNG for wild Pokémon using honey in Sun and Moon",
      slug: "/retail-sm-wild",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Wild RNG.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(() => import("~/../guides/Sun and Moon/Wild RNG.mdx")),
  },
  "/retail-sm-sos": {
    meta: {
      title: "SOS RNG",
      description:
        "Master one of the most challenging Gen 7 RNGs for fun rewards",
      slug: "/retail-sm-sos",
      isRoughDraft: false,
      file: "guides/Sun and Moon/SOS RNG.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(() => import("~/../guides/Sun and Moon/SOS RNG.mdx")),
  },
  "/retail-sm-egg-seed-no-cfw": {
    meta: {
      title: "Finding Egg Seeds Without CFW/Homebrew",
      description: "Find your egg seeds for Egg RNG using the Magikarp Method",
      slug: "/retail-sm-egg-seed-no-cfw",
      isRoughDraft: false,
      file: "guides/Sun and Moon/How to Find Egg Seeds Without Custom Firmware.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Sun and Moon/How to Find Egg Seeds Without Custom Firmware.mdx"
        ),
    ),
  },
  "/retail-sm-no-cfw": {
    meta: {
      title: "RNGing without Custom Firmware",
      description: "Get your perfect Pokémon without custom firmware",
      slug: "/retail-sm-no-cfw",
      isRoughDraft: false,
      file: "guides/Sun and Moon/RNGing Without Custom Firmware.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Sun and Moon/RNGing Without Custom Firmware.mdx"),
    ),
  },
  "/retail-sm-myster-gift": {
    meta: {
      title: "Mystery Gift (Event) RNG",
      description: "RNG your events to have 6 IVs",
      slug: "/retail-sm-myster-gift",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Mystery Gift.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Mystery Gift.mdx"),
    ),
  },
  "/retail-sm-initial-seed-clocks": {
    meta: {
      title: "Finding your initial seed in Gen 7 with clocks",
      description:
        "This guide allows you to find your initial seed without using custom firmware.",
      slug: "/retail-sm-initial-seed-clocks",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Finding Initial Seed with Clocks.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Sun and Moon/Finding Initial Seed with Clocks.mdx"),
    ),
  },
  "/retail-sm-egg-mmsc": {
    meta: {
      title: "Egg RNG Guide with Masuda and/or Shiny Charm",
      description:
        "RNG for eggs using Masuda Method and/or with the Shiny Charm",
      slug: "/retail-sm-egg-mmsc",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Egg RNG With Masuda Method or Shiny Charm.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Sun and Moon/Egg RNG With Masuda Method or Shiny Charm.mdx"
        ),
    ),
  },
  "/retail-sm-island-scan": {
    meta: {
      title: "Island Scan",
      description: "Easy shinies in apricorn balls",
      slug: "/retail-sm-island-scan",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Island Scan RNG.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Island Scan RNG.mdx"),
    ),
  },
  "/retail-sm-fidget": {
    meta: {
      title: "Timeline with Fidget",
      description: "Using the timeline method with character fidgets",
      slug: "/retail-sm-fidget",
      isRoughDraft: false,
      file: "guides/Sun and Moon/Timeline With Fidget Guide.mdx",
      category: "Sun and Moon",
    },
    Guide: React.lazy(
      () => import("~/../guides/Sun and Moon/Timeline With Fidget Guide.mdx"),
    ),
  },
  "/sysbot-lpa-mmo": {
    meta: {
      title: "MMO RNG",
      description: "How to RNG MMOs using Sysbot and PermuteMMO",
      slug: "/sysbot-lpa-mmo",
      isRoughDraft: false,
      file: "guides/Legends Arceus/MMO.mdx",
      category: "Legends Arceus",
    },
    Guide: React.lazy(() => import("~/../guides/Legends Arceus/MMO.mdx")),
  },
  "/citrarng-setup": {
    meta: {
      title: "CitraRNG Setup",
      description: "Setup Citra for RNG",
      slug: "/citrarng-setup",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/CitraRNG Setup.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/CitraRNG Setup.mdx"),
    ),
  },
  "/misc-dolphin-gba-bios": {
    meta: {
      title: "How to extract GBA BIOS",
      description: "Guide to extracting the GBA BIOS file for use on emulators",
      slug: "/misc-dolphin-gba-bios",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/How to Extract GBA Bios.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Tools and Emulators/How to Extract GBA Bios.mdx"),
    ),
  },
  "/install-pokereader": {
    meta: {
      title: "How to Install PokeReader",
      description: "Installing a tool on your 3DS or Citra to help RNG Pokémon",
      slug: "/install-pokereader",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/How to Install PokeReader.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Tools and Emulators/How to Install PokeReader.mdx"),
    ),
  },
  "/desmume-setup": {
    meta: {
      title: "Desmume Setup",
      description: "Setup Desmume for RNG",
      slug: "/desmume-setup",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/Desmume Setup.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Desmume Setup.mdx"),
    ),
  },
  "/install-capturesight": {
    meta: {
      title: "How to Install CaptureSight",
      description: "Installing a tool on your Switch to help RNG Pokemon",
      slug: "/install-capturesight",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/CaptureSight Install.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/CaptureSight Install.mdx"),
    ),
  },
  "/misc-dolphin-connect-vba": {
    meta: {
      title: "Connecting Dolphin to VBA",
      description: "RNG a Jirachi or transfer your RNGs to a GBA game",
      slug: "/misc-dolphin-connect-vba",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Tools and Emulators/How to Connect Dolphin to VBA.mdx"
        ),
    ),
  },
  "/misc-3ds-installing-pcalc": {
    meta: {
      title: "How to Install PCalc",
      description: "Installing a tool on your 3DS to help RNG Pokemon",
      slug: "/misc-3ds-installing-pcalc",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/How to Install PCalc.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/How to Install PCalc.mdx"),
    ),
  },
  "/ntr-helper-usage": {
    meta: {
      title: "NTR Helper Usage",
      description: "How to use the NTR Helper Tool in 3DSRNGTool",
      slug: "/ntr-helper-usage",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/NTR Helper Usage.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/NTR Helper Usage.mdx"),
    ),
  },
  "/transporter-patches": {
    meta: {
      title: "Transporter Patches",
      description: "Various patches for use with Transporter",
      slug: "/transporter-patches",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/Transporter Patches.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () => import("~/../guides/Tools and Emulators/Transporter Patches.mdx"),
    ),
  },
  "/misc-3ds-ips-luma-citra": {
    meta: {
      title: "Using IPS Patches with Luma and Citra",
      description:
        "Use game patches for instant text, no outlines, and extra fun",
      slug: "/misc-3ds-ips-luma-citra",
      isRoughDraft: false,
      file: "guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx",
      category: "Tools and Emulators",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Tools and Emulators/Using IPS Patches with Luma and Citra.mdx"
        ),
    ),
  },
  "/emulator-b2w2-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      slug: "/emulator-b2w2-wild",
      isRoughDraft: true,
      file: "guides/Black 2 and White 2/Wild RNG Emu.mdx",
      category: "Black 2 and White 2",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black 2 and White 2/Wild RNG Emu.mdx"),
    ),
  },
  "/bw2-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG egg in BW2 based on the recent discoveries",
      slug: "/bw2-egg",
      isRoughDraft: false,
      file: "guides/Black 2 and White 2/Egg RNG.mdx",
      category: "Black 2 and White 2",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black 2 and White 2/Egg RNG.mdx"),
    ),
  },
  "/emulator-b2w2-runasdate-inital-seed": {
    meta: {
      title: "Initial Seed RNG (RunAsDate edition)",
      description: "How to control Gen 5 initial seeds without any difficulty",
      slug: "/emulator-b2w2-runasdate-inital-seed",
      isRoughDraft: false,
      file: "guides/Black 2 and White 2/Using Runasdate to RNG Initial Seed.mdx",
      category: "Black 2 and White 2",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Black 2 and White 2/Using Runasdate to RNG Initial Seed.mdx"
        ),
    ),
  },
  "/emulator-b2w2-dream-radar": {
    meta: {
      title: "Dream Radar RNG in Generation 5",
      description: "RNG Level 5 Dream Ball HA Legends",
      slug: "/emulator-b2w2-dream-radar",
      isRoughDraft: false,
      file: "guides/Black 2 and White 2/Dream Radar.mdx",
      category: "Black 2 and White 2",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black 2 and White 2/Dream Radar.mdx"),
    ),
  },
  "/emulator-rs-egg": {
    meta: {
      title: "Egg RNG",
      description: "RNG Eggs from the Daycare",
      slug: "/emulator-rs-egg",
      isRoughDraft: false,
      file: "guides/Ruby and Sapphire/Egg RNG.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Egg RNG.mdx"),
    ),
  },
  "/rs-tips-rng": {
    meta: {
      title: "Basic rules of Gen 3 RNG",
      description:
        "How to advance the RNG and tips to make everything more stable",
      slug: "/rs-tips-rng",
      isRoughDraft: true,
      file: "guides/Ruby and Sapphire/Basic Rules of RNG.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Basic Rules of RNG.mdx"),
    ),
  },
  "/emulator-rs-dead-battery-stationary": {
    meta: {
      title: "Dead Battery Stationary RNG",
      description: "Dead Battery Stationary RNG",
      slug: "/emulator-rs-dead-battery-stationary",
      isRoughDraft: true,
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
  "/emulator-rs-wishmaker": {
    meta: {
      title: "Shiny WISHMKR Jirachi RNG using wishmaker-calc",
      description: "RNG Jirachi from the Colosseum bonus disc",
      slug: "/emulator-rs-wishmaker",
      isRoughDraft: false,
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
  "/emulator-rs-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      slug: "/emulator-rs-wild",
      isRoughDraft: true,
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
  "/emulator-rs-stationary": {
    meta: {
      title: "Live Battery Stationary RNG",
      description: "RNG stationary Pokémon with more options than dead battery",
      slug: "/emulator-rs-stationary",
      isRoughDraft: false,
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
  "/rs-battery": {
    meta: {
      title: "Difference between Live and Dry Battery",
      description:
        "Discover the two ways to RNG on Ruby/Sapphire and learn their differences",
      slug: "/rs-battery",
      isRoughDraft: false,
      file: "guides/Ruby and Sapphire/Live and Dry Battery.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Live and Dry Battery.mdx"),
    ),
  },
  "/emulator-rs-live-battery-tid": {
    meta: {
      title: "Live Battery TID/SID RNG",
      description:
        "RNG for a specific TID/SID combination with more options than dead battery",
      slug: "/emulator-rs-live-battery-tid",
      isRoughDraft: false,
      file: "guides/Ruby and Sapphire/Live Battery TID RNG.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/Live Battery TID RNG.mdx"),
    ),
  },
  "/rs-initial-seed": {
    meta: {
      title: "Initial Seed RNG",
      description: "How to use Runasdate for RS Live Battery RNG",
      slug: "/rs-initial-seed",
      isRoughDraft: true,
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
      file: "guides/Ruby and Sapphire/PokeFinder Setup.mdx",
      category: "Ruby and Sapphire",
    },
    Guide: React.lazy(
      () => import("~/../guides/Ruby and Sapphire/PokeFinder Setup.mdx"),
    ),
  },
  "/pal-xd-eevee": {
    meta: {
      title: "(XD) Eevee PAL RNG",
      description: "How to RNG the starter Eevee with a PAL Pokemon XD",
      slug: "/pal-xd-eevee",
      isRoughDraft: false,
      file: "guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx",
      category: "Gamecube",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/(XD) PAL Starter Eevee RNG.mdx"),
    ),
  },
  "/emulator-colosseum-general": {
    meta: {
      title: "Colosseum General RNG",
      description: "RNG in Colosseum",
      slug: "/emulator-colosseum-general",
      isRoughDraft: true,
      file: "guides/Gamecube/Colosseum General Guide (Emu).mdx",
      category: "Gamecube",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/Colosseum General Guide (Emu).mdx"),
    ),
  },
  "/gc-initial": {
    meta: {
      title: "Initial Seed RNG",
      description:
        "How to use Dolphin to set up Initial Seed RNG for all GameCube games",
      slug: "/gc-initial",
      isRoughDraft: false,
      file: "guides/Gamecube/Initial Seed RNG.mdx",
      category: "Gamecube",
    },
    Guide: React.lazy(
      () => import("~/../guides/Gamecube/Initial Seed RNG.mdx"),
    ),
  },
  "/channel-jirachi": {
    meta: {
      title: "(PAL) Channel RNG",
      description: "How to RNG the gift Jirachi on Channel",
      slug: "/channel-jirachi",
      isRoughDraft: false,
      file: "guides/Gamecube/Channel.mdx",
      category: "Gamecube",
    },
    Guide: React.lazy(() => import("~/../guides/Gamecube/Channel.mdx")),
  },
  "/dppt-advance-rng": {
    meta: {
      title: "Advancing the RNG",
      description:
        "The different methods the RNG can be advanced and events that influence the RNG",
      slug: "/dppt-advance-rng",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/Advancing the RNG.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Diamond, Pearl, and Platinum/Advancing the RNG.mdx"
        ),
    ),
  },
  "/emulator-dppt-tid-sid": {
    meta: {
      title: "TID/SID RNG",
      description: "How to get a desired TID/SID combo",
      slug: "/emulator-dppt-tid-sid",
      isRoughDraft: true,
      file: "guides/Diamond, Pearl, and Platinum/TID SID.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () => import("~/../guides/Diamond, Pearl, and Platinum/TID SID.mdx"),
    ),
  },
  "/emulator-dppt-cute-charm": {
    meta: {
      title: "Cute Charm RNG",
      description: "How to use Cute Charm with TID/SID RNG",
      slug: "/emulator-dppt-cute-charm",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/Cute Charm.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () => import("~/../guides/Diamond, Pearl, and Platinum/Cute Charm.mdx"),
    ),
  },
  "/dppt-setup-rng": {
    meta: {
      title: "Honey RNG",
      description: "RNG honey tree Pokémon",
      slug: "/dppt-setup-rng",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/Honey.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () => import("~/../guides/Diamond, Pearl, and Platinum/Honey.mdx"),
    ),
  },
  "/emulator-dppt-stationary": {
    meta: {
      title: "Stationary RNG",
      description: "RNG stationary Pokémon in Diamond, Pearl, and Platinum",
      slug: "/emulator-dppt-stationary",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/Stationary.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () => import("~/../guides/Diamond, Pearl, and Platinum/Stationary.mdx"),
    ),
  },
  "/dppt-initial-seed": {
    meta: {
      title: "Initial Seed RNG",
      description: "How to RNG an initial seed in Diamond, Pearl, and Platinum",
      slug: "/dppt-initial-seed",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Diamond, Pearl, and Platinum/Initial Seed RNG.mdx"),
    ),
  },
  "/emulator-dppt-egg": {
    meta: {
      title: "Egg RNG",
      description: "How to RNG eggs from the daycare",
      slug: "/emulator-dppt-egg",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/Egg.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () => import("~/../guides/Diamond, Pearl, and Platinum/Egg.mdx"),
    ),
  },
  "/dppt-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      slug: "/dppt-wild",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/Wild.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () => import("~/../guides/Diamond, Pearl, and Platinum/Wild.mdx"),
    ),
  },
  "/emulator-dppt-pokefinder-setup": {
    meta: {
      title: "PokeFinder Setup",
      description: "How to setup PokeFinder for Diamond/Pearl/Platinum RNG",
      slug: "/emulator-dppt-pokefinder-setup",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () =>
        import("~/../guides/Diamond, Pearl, and Platinum/PokeFinder Setup.mdx"),
    ),
  },
  "/dppt-pokeradar-rng": {
    meta: {
      title: "PokeRadar RNG",
      description: "Two different methods for PokeRadar RNG",
      slug: "/dppt-pokeradar-rng",
      isRoughDraft: false,
      file: "guides/Diamond, Pearl, and Platinum/PokeRadar.mdx",
      category: "Diamond, Pearl, and Platinum",
    },
    Guide: React.lazy(
      () => import("~/../guides/Diamond, Pearl, and Platinum/PokeRadar.mdx"),
    ),
  },
  "/emulator-bw-roamers": {
    meta: {
      title: "Gen 5 Roamers",
      description: "RNG Gen 5 Roamers with an emulator",
      slug: "/emulator-bw-roamers",
      isRoughDraft: false,
      file: "guides/Black and White/Roamers.mdx",
      category: "Black and White",
    },
    Guide: React.lazy(() => import("~/../guides/Black and White/Roamers.mdx")),
  },
  "/emulator-bw-wild": {
    meta: {
      title: "Wild RNG",
      description: "Wild RNG",
      slug: "/emulator-bw-wild",
      isRoughDraft: true,
      file: "guides/Black and White/Wild RNG Emu.mdx",
      category: "Black and White",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black and White/Wild RNG Emu.mdx"),
    ),
  },
  "/emulator-bw-find-ds-parameters": {
    meta: {
      title: "How To Find DS Parameters in Generation 5",
      description: "Get your DS Parameters for Generation 5 RNG.",
      slug: "/emulator-bw-find-ds-parameters",
      isRoughDraft: false,
      file: "guides/Black and White/Find DS Parameters.mdx",
      category: "Black and White",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black and White/Find DS Parameters.mdx"),
    ),
  },
  "/emulator-bw-white-forest": {
    meta: {
      title: "White Forest RNG",
      description: "White Forest RNG",
      slug: "/emulator-bw-white-forest",
      isRoughDraft: false,
      file: "guides/Black and White/White Forest RNG (Emu).mdx",
      category: "Black and White",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black and White/White Forest RNG (Emu).mdx"),
    ),
  },
  "/emulator-bw-entralink": {
    meta: {
      title: "Entralink (Emulator)",
      description: "How to RNG cool Pokémon with Entralink RNG",
      slug: "/emulator-bw-entralink",
      isRoughDraft: false,
      file: "guides/Black and White/Entralink.mdx",
      category: "Black and White",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black and White/Entralink.mdx"),
    ),
  },
  "/emulator-bw-runasdate-initial-seed": {
    meta: {
      title: "Initial Seed RNG (RunAsDate edition)",
      description: "How to control Gen 5 initial seeds without any difficulty",
      slug: "/emulator-bw-runasdate-initial-seed",
      isRoughDraft: false,
      file: "guides/Black and White/Using Runasdate to RNG Initial Seed.mdx",
      category: "Black and White",
    },
    Guide: React.lazy(
      () =>
        import(
          "~/../guides/Black and White/Using Runasdate to RNG Initial Seed.mdx"
        ),
    ),
  },
  "/retail-bw-entralink": {
    meta: {
      title: "Entralink (Retail)",
      description:
        "A step-by-step guide for RNG manipulation using the C-Gear method in Pokémon Black and White.",
      slug: "/retail-bw-entralink",
      isRoughDraft: true,
      file: "guides/Black and White/Retail Entralink.mdx",
      category: "Black and White",
    },
    Guide: React.lazy(
      () => import("~/../guides/Black and White/Retail Entralink.mdx"),
    ),
  },
} as const;

export const guideSlugs = [
  z.literal("/"),
  z.literal("/emulator-emerald-egg"),
  z.literal("/e-tips-rng"),
  z.literal("/emerald-painting-rng"),
  z.literal("/hgss-rng-advance"),
  z.literal("/emulator-hgss-tid-sid"),
  z.literal("/emulator-hgss-cute-charm"),
  z.literal("/emulator-hgss-breeding"),
  z.literal("/emulator-hgss-special-wild"),
  z.literal("/hgss-initial-seed"),
  z.literal("/emulator-hgss-egg"),
  z.literal("/emulator-hgss-wondercard"),
  z.literal("/emulator-hgss-wild"),
  z.literal("/emulator-hgss-stationary"),
  z.literal("/emulator-frlg-egg"),
  z.literal("/frlg-tips-rng"),
  z.literal("/emulator-frlg-wild-v2"),
  z.literal("/frlg-seeding-bot"),
  z.literal("/emulator-frlg-wild"),
  z.literal("/emulator-frlg-stationary"),
  z.literal("/emulator-flrg-stationary-and-gift"),
  z.literal("/retail-usum-timeline"),
  z.literal("/retail-usum-sos"),
  z.literal("/retail-usum-egg-no-mmsc"),
  z.literal("/retail-usum-timeleap"),
  z.literal("/retail-usum-stationary"),
  z.literal("/emulator-usum-time-finder"),
  z.literal("/misc-3ds-island-scan-usum"),
  z.literal("/retail-usum-wild"),
  z.literal("/retail-usum-island-scan"),
  z.literal("/retail-usum-egg-seed-no-cfw"),
  z.literal("/retail-usum-no-cfw"),
  z.literal("/retail-usum-mystery-gift"),
  z.literal("/retail-usum-initial-seed-clocks"),
  z.literal("/retail-usum-egg-mmsc"),
  z.literal("/retail-usum-fidget"),
  z.literal("/retail-usum-wormhole"),
  z.literal("/bdsp-advance-rng"),
  z.literal("/bdsp-emulator-setup"),
  z.literal("/cfw-bdsp-stationary"),
  z.literal("/bdsp-pokefinder"),
  z.literal("/cfw-bdsp-egg"),
  z.literal("/cfw-bdsp-wild"),
  z.literal("/bdsp-chatot"),
  z.literal("/cfw-bdsp-tidandsid"),
  z.literal("/retail-swsh-get-seed-with-cfw"),
  z.literal("/retail-swsh-raid"),
  z.literal("/retail-swsh-get-seed-without-cfw"),
  z.literal("/retail-oras-egg-no-mmsc"),
  z.literal("/emulator-oras-dexnav"),
  z.literal("/retail-oras-egg-mmsc"),
  z.literal("/retail-oras-tid"),
  z.literal("/misc-3ds-transporter-nature-tables"),
  z.literal("/transporter-rng-offline"),
  z.literal("/transporter-rng"),
  z.literal("/retail-xy-egg-no-mmsc"),
  z.literal("/pcalc-xy-friend-safari"),
  z.literal("/pcalc-xy-tid"),
  z.literal("/retail-xy-egg-mmsc"),
  z.literal("/retail-sm-timeline"),
  z.literal("/misc-sm-wild-spots"),
  z.literal("/retail-sm-egg-no-mmsc"),
  z.literal("/retail-sm-timeleap"),
  z.literal("/retail-sm-stationary"),
  z.literal("/emulator-sm-time-finder"),
  z.literal("/misc-3ds-island-scan-sm"),
  z.literal("/retail-sm-wild"),
  z.literal("/retail-sm-sos"),
  z.literal("/retail-sm-egg-seed-no-cfw"),
  z.literal("/retail-sm-no-cfw"),
  z.literal("/retail-sm-myster-gift"),
  z.literal("/retail-sm-initial-seed-clocks"),
  z.literal("/retail-sm-egg-mmsc"),
  z.literal("/retail-sm-island-scan"),
  z.literal("/retail-sm-fidget"),
  z.literal("/sysbot-lpa-mmo"),
  z.literal("/citrarng-setup"),
  z.literal("/misc-dolphin-gba-bios"),
  z.literal("/install-pokereader"),
  z.literal("/desmume-setup"),
  z.literal("/install-capturesight"),
  z.literal("/misc-dolphin-connect-vba"),
  z.literal("/misc-3ds-installing-pcalc"),
  z.literal("/ntr-helper-usage"),
  z.literal("/transporter-patches"),
  z.literal("/misc-3ds-ips-luma-citra"),
  z.literal("/emulator-b2w2-wild"),
  z.literal("/bw2-egg"),
  z.literal("/emulator-b2w2-runasdate-inital-seed"),
  z.literal("/emulator-b2w2-dream-radar"),
  z.literal("/emulator-rs-egg"),
  z.literal("/rs-tips-rng"),
  z.literal("/emulator-rs-dead-battery-stationary"),
  z.literal("/emulator-rs-wishmaker"),
  z.literal("/emulator-rs-wild"),
  z.literal("/emulator-rs-stationary"),
  z.literal("/rs-battery"),
  z.literal("/emulator-rs-live-battery-tid"),
  z.literal("/rs-initial-seed"),
  z.literal("/rs-pokefinder-setup"),
  z.literal("/pal-xd-eevee"),
  z.literal("/emulator-colosseum-general"),
  z.literal("/gc-initial"),
  z.literal("/channel-jirachi"),
  z.literal("/dppt-advance-rng"),
  z.literal("/emulator-dppt-tid-sid"),
  z.literal("/emulator-dppt-cute-charm"),
  z.literal("/dppt-setup-rng"),
  z.literal("/emulator-dppt-stationary"),
  z.literal("/dppt-initial-seed"),
  z.literal("/emulator-dppt-egg"),
  z.literal("/dppt-wild"),
  z.literal("/emulator-dppt-pokefinder-setup"),
  z.literal("/dppt-pokeradar-rng"),
  z.literal("/emulator-bw-roamers"),
  z.literal("/emulator-bw-wild"),
  z.literal("/emulator-bw-find-ds-parameters"),
  z.literal("/emulator-bw-white-forest"),
  z.literal("/emulator-bw-entralink"),
  z.literal("/emulator-bw-runasdate-initial-seed"),
  z.literal("/retail-bw-entralink"),
] as const;

export const categories = [
  "Tools and Emulators",
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
