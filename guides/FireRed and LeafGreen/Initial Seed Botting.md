---
title: 'Initial Seed Botting'
description: 'How to use the Initial Seed Bot in order to have even more control in your RNGs'
slug: 'frlg-seeding-bot'
subCategory: 'Emulator'
---

### Requirements:

- Last versions of the Lua Script
- PokeFinder
- [FRLGRSEInitialSeedsFinder](https://github.com/Real96/FRLGRSEInitialSeedsFinder) by Real96

## Intro

This guide introduces an alternative RNG method for Fire Red and Leaf Green that gives more control over the initial seed using a lua bot.

### Setup:

1. First, determine your target. Open PokeFinder, go to Gen 3 => Stationary or Wild (both work similarly).
2. In the "Searcher" tab, apply the desired filters.
3. Generate results and record the seed.
4. Run FRLGRSEInitialSeedsFinder. It will prompt you for a seed; enter the one you recorded.
5. When asked for the number of results, input a large number, like 100. Note: In specific cases, such as starters where Teachy TV is unavailable, generate 100 results, but only consider the lowest advance range possible.
6. Wait for the tool to generate results. It will create a text file with all possible initial seeds. Open the file and copy its content.
7. In the FRLG Lua script, locate this line: 'local botTargetInitSeeds ='. Input all the seeds (ensure they are enclosed by '{}').
8. Save the Lua script.

### Botting:

1. Run the Lua script and enter the initial seed bot mode by pressing '2'.
2. Pause the emulator.
3. Reset the emulator.
4. Advance a single time (Ctrl + N) while holding the Select button.
5. Unpause the emulator.

This setup allows the game to be controlled by the bot, attempting to hit one of the selected initial seeds. Once it completes, the game will pause. Keep track of the Initial Seed, input it into the Generator, and proceed with your RNG process in the standard manner, knowing that your target advance is now accessible.
