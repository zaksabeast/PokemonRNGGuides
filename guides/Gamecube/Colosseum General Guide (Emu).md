---
title: 'Colosseum General RNG'
description: 'RNG in Colosseum'
slug: 'emulator-colosseum-general'
subCategory: 'Emulator'
isRoughDraft: true
---

## Requirements:

In order to RNG abuse Pokemon Colosseum you will need:

- PokeFinder
- An ISO of Pokemon Colosseum
- Dolphin version 4.0-6848. (This version is known to work with RTC for Colosseum)
- RunAsDate (x64)
- A calculator

## Intro

This guide explains how to RNG Pokemon Colosseum using emulators. It is based on experience and extensive research. Basic knowledge of Gamecube RNG (especially XD) and using Dolphin & VBA (Visual Boy Advance) is required.

The original guide was provided by Jellal.

## Setting up

1. Open Pokefinder, select "Stationary" in the Gen 3 column.
1. Create a new profile for Pokemon Colosseum.
1. In the Gen 3 Stationary Window, select your new profile, and PokeFinder will set Colo/XD as the Search method.

## Configuration

Dolphin setup for this RNG is important, as we are working with an outdated version using RTC only with RunAsDate.

1. In RunAsDate, select the path where your Dolphin.exe is located.
1. Choose "Absolute date / time" in Date/Time.
1. In "Parameters," type: " -d ".
1. Ensure other checkboxes are unchecked.
1. Set the date and time to 1/1/2000 at 12:00:00 AM.
1. Run Dolphin from RunAsDate.

In Dolphin, open your game, pause, and check Watch in View. Add these numbers to your RAM Watch:

For US Colosseum:

- Main PRNG: 80478c90
- AI Slot 1: 80473070
- AI Slot 2: 804731a8
- AI Slot 3: 804732e0
- AI Slot 4: 80473418
- AI Slot 5: 80473550
- AI Slot 6: 80473688

For PAL Colosseum:

- Main PRNG: 804c6130
- AI Slot 1: 804c0508
- AI Slot 2: 804c0640
- AI Slot 3: 804c0778
- AI Slot 4: 804c08b0
- AI Slot 5: 804c09e8
- AI Slot 6: 804c0b20

For JPN Colosseum:

- Main PRNG: 80464360
- AI Slot 1: 8045e750
- AI Slot 2: 8045e888
- AI Slot 3: 8045e9c0
- AI Slot 4: 8045eaf8
- AI Slot 5: 8045ec30
- AI Slot 6: 8045ed68

Click "Save," so you don't have to re-enter these values.

## The RNG Process

1. In the main PokeFinder window, go to Gen 3 Tools > IVs to PID.
1. Enter the IVs and Nature of the desired spread.
1. Copy the Seed from the results table.
1. Open the Gamecube RTC window (Gen 3 Tools). Enter the initial seed from 1/1/2000, and the seed from the IVs to PID window.
1. Set an advance range (e.g., 4000 min) and click "Search."
1. Gamecube RTC will provide the time you need to set up on RunAsDate to boot your game with the specific initial seed required.
1. Change RunAsDate's date and time values to match the ones from Gamecube RTC.
1. Boot up your game, ensuring the PRNG state in RAM Watch matches the seed in Gamecube RTC. If they don't match, check your Dolphin version, Date/Time, or PRNG value.
1. In PokeFinder's Gen 3 stationary window, enter your new initial seed, spread info, load your profile, and click "Calculate." Your target advance will be displayed.

## The RNG Process (Continued)

1. Boot your game and enter the overworld, ensuring you start from a point where you can reach your target Shadow Pokemon.
1. Create a save state before encountering the Pokemon.
1. To advance the PRNG:
   - In noiseless areas:
     - Over 10,000 advances: Check a Shadow Pokemon's summary.
     - Less than 3,000 advances: View a regular Pokemon's summary.
     - Less than 500 advances: Go back and forth from PDA Menu to Shadow Monitor.
   - In noisy areas (Bayleff method): Swap summaries of two non-shadow Pokemons.
   - During battles: Advance the RNG while battling.
1. In noiseless areas, you have control over advancements. But in noisy areas, PRNG advances uncontrollably. Hope to hit the correct PRNG state.
1. Advance the RNG using the techniques mentioned earlier. Make save states as you approach your target.
1. Once you are five advances from your target, trigger the encounter. Check the Shadow Pokemon's AI slot for your spread.
1. For confirmation, enter the PRNG address in Memory View.

From here, you can either KO the Pokemon and capture it later or capture it immediately. Once you're in the post-game, you can use Dive/Repeat/Luxury Balls from the mainline GBA games to capture your Shiny Shadow Pokemon.

Congratulations! You now have a Shiny Shadow Pokemon.
