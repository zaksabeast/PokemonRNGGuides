---
title: 'Dead Battery Stationary RNG'
description: 'Dead Battery Stationary RNG'
slug: 'emulator-rs-dead-battery-stationary'
subCategory: 'Emulator'
isRoughDraft: true
---

You can copy on my FRLG guide for 90% of the part. This guide is BEFORE the update with Real's scripts

This guide is to cover Fixed Initial Seed in Gen 3 aka RS dry and Emerald.

Edited Rick's guide, not yet complete. -Subject

---

# Dead Battery Stationary Abuse (Ruby/Sapphire/Emerald)

---

---

## Tools

---

- [VBA-RR](https://github.com/TASVideos/vba-rerecording/releases)
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [The Ruby/Sapphire Lua Scripts for your language](https://pokerng.forumcommunity.net/?t=56443955&p=396434940)
  - Password for the lua script archive is `allyouneedisnoob`

---

## Settings

---

### VBA-RR setup

    - Make sure the save mode is set correctly.
        - Options > Emulation > Save Type > Automatic & Flash 128K
    - Real Time Clock must be disbled in order to obtain dead battery seeds.
        - Options > Emulation > Real Time Clock
        - If there are errors when loading past the title screen, such as corrupted save or dead battery message, restart VBA for the changes to take effect.
    - Load the lua script.

### PokeFinder setup

    - Launch PokeFinder and select Gen 3 Stationary.
    - Select profile or input TID/SID information.
    - Input the correct initial seeds into PokeFinder.
        - "0" for Emerald.
        - "5A0" for Ruby/Sapphire.
    - All non-wild pokemon for Generation 3 Pokemon are Method 1.
    - Search for a spread and find a target frame.

![](pic of pokefinder example)

---

## Hitting the Desired Frame

---

1. Finding Delay
   - Advance to the final screen before encountering the target Pokemon.
   - Make a save state ~100 frames before the encouter.

![](pic of wait screen)

    - When you land on your target frame press `A` and enter the encounter.
    - The period `.` key can be used to advance by one frame when paused.
    - Take note of the IVs of the Pokemon you encounterd, they won't be the target pokemon's IVs.
    - We will need to find a new target frame to get the correct Pokemon.

![](Pic of ivs)

    - Open a new PokeFinder window and input IVs of the Pokemon encountered.
    - To find the delay subtract the frame hit from the desired frame.

`Delay = Frame Hit - Target Frame`

`Your new Target Frame = Desired Frame - Delay`

2. Encountering the Pokemon
   - Reload the previous save state before the encounter.
   - Advance to the new target frame.
   - If the Pokemon is not the desired Pokemon then find the new delay.

![](pic of the pokemon)
