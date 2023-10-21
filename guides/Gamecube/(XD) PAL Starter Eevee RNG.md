---
title: '(XD) Eevee PAL RNG'
description: 'How to RNG the starter Eevee with a PAL Pokemon XD'
slug: 'pal-xd-eevee'
subCategory: 'Emulator'
isRoughDraft: false
---

## Requirements

- Dolphin with the Lua support (Only available on the Discord at the moment)
- The Lua scripts for Gamecube (Only available on the Discord at the moment)
- PokeFinder
- PAL-Pal (https://github.com/KapitalRoser/PAL-Pal) done by Kapital#9267
- A new save of PAL XD
- The list of Shiny Eevee spreads done by Parzival#3035 (https://pastebin.com/0Dh740Kg) if you follow the Method 2
- RunAsDate (x64) if you follow the Method 2

## Intro

This guide covers two methods to RNG Eevee in the PAL XD version. Choose the one that suits your needs: one based on a known Eevee spread list, involving Initial Seed RNG, and the other, simpler, using any Initial Seed, allowing more random spreads.

This guide assumes basic knowledge of emulator setup and Initial Seed RNG, specifically for PAL XD.

```
Note: This guide only works for PAL XD; it doesn't apply to the NTSC version.
```

## Advancing the RNG

Before diving into RNG, understand how to advance the RNG as the PAL version freezes in the name menu. Use these four methods:

1. **Rerolls**: Triggered in the main menu by navigating to "VS Mode" => "Quick Battle" => "Battle vs CPU" => Ultimate. Each reroll is initiated when Pokémon are shown. Press "No" and redo for multiple advances.
2. **Memory Card Reloads**: Simply press B and A in the main menu to reload Memory Card Data, indicated by an in-game message. Each reload counts as +1.
3. **Options Saves**: Go to Settings, change the Rumbling setting, and save before returning to the main menu.
4. **Name Screen Blackout**: Start a New Game and press B when asked about using a specific or custom name. Avoid selecting a name as it's irreversible.

```
Note: Set your trainer's name when the Current Seed matches your target Seed. Avoid Name Screen Blackout at this point.
```

## Method 1: Using PAL-Pal Only

This is a straightforward setup for hitting any Eevee not listed but can be time-consuming and yield less favorable spreads.

1. Open Dolphin, load the Luas, note the Current Seed in the main menu, and pause the emulator.
2. Open PAL-Pal, go to the Speedrun tab, configure filters for your desired Eevee (Shiny, IVs, gender, Nature), and save.
3. Input the Current Seed in the 'Current Seed (Hex)' window and search for results.
4. Cycle between results using 'Next' and 'Previous.'
5. Once you find the right result, follow the instructions to get the path and perform the necessary advances.

## Method 2: Using the Shiny Eevee Spread List

This method requires Initial Seed RNG but provides fast access to amazing spreads.

1. Open PokeFinder, go to the Gamecube RTC tab, and input the Seed of your desired Eevee in the Target Seed section. Ensure the Initial Seed is around 15-20k advances and nothing earlier.
2. Do the Initial Seed RNG with runasdate, Dolphin, and the lua script. Pause the emulator on the main screen.
3. Open PAL-Pal, go to the Custom Tab, and input your Current Seed.
4. For the Target Title Seed, you don't input your Target Seed but the Seed that allows hitting the target. Use the Researcher in PokeFinder, select XDRNG[R], put the Target Seed in the Seed box, set Max Advance to 1010, and generate results. Check Advance 1000; it's your Target Title Screen to input in PAL-Pal.
5. Click on Search, and your Eevee should be the first one. Follow the path to advance your Seeds and obtain your Shiny Eevee.

```
Note: The delay may not be exactly 1000 but slightly different. Stick with 1000; if it doesn't match the Target Seed, you'll perform a few extra advances in-game. To adjust, use the results from Advance 1002 and 1004 in the Researcher.
```
