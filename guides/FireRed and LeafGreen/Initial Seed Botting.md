---
title: 'Initial Seed Botting'
description: 'How to use the Initial Seed Bot in order to have even more control in your RNGs'
slug: 'frlg-seeding-bot'
subCategory: 'Emulator'
---

```
Introduction : This guide will show you a different way to RNG on FRLG. Using that, you should be closer to a RS (Live Battery) / Gen 4 / Gen 5 / Gen 6 / Gen 7 experience with some Time Finder-like experience. It requires a bot that is included in the recent versions of the luas scripts.
```

### Requirements:

- Last versions of the Lua Script
- PokeFinder
- [FRLGRSEInitialSeedsFinder](https://github.com/Real96/FRLGRSEInitialSeedsFinder) by Real96

### Setup:

* First, you'll need to have a target in mind. Open PokeFinder, Gen 3 => Stationary or Wild (both will work the same in general)
* Go to the "Searcher" tab and input all the wanted filters.
* Generate Results and write down the seed somewhere. 
* Run FRLGRSEInitialSeedsFinder it'll ask you for a seed. Input it.
* It'll then ask for an amount of results. Put a huge number like 100. The only specific case would be starters where Teachy TV is not available. In that situation you should generate 100 results but ONLY take the lowest frame range possible
* Wait for the tool to generate results. It'll generate a text files with all the initial seed possible. Open it and copy the content.
* Open the FRLG lua script and search for that line : 'local botTargetInitSeeds =' input all the seed (be sure they are surrounded by '{}')
* Save the lua


### Botting:

* Run the lua, advance to the initial seed bot mode by pressing '2'
* Pause the emulator
* Reset the emulator 
* Advance a single frame (Ctrl + N) while holding Select
* Unpause

That way the game should bot and try to hit one of the initial seed selected before. Once done the game will pause. You just have to keep track of the Initial Seed, put it in Generator and now do your RNG in a classic way knowing that your target Frame is now available.