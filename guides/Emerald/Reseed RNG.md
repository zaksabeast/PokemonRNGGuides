---
title: 'Reseed using paintings'
description: 'Reseed the RNG using paintings to obtain the Pokemon wanted without the long wait'
slug: 'emerald-painting-rng'
subCategory: 'Emulator'
---

## Requirements:

- [VBA-RR](https://code.google.com/archive/p/vba-rerecording/downloads)
- [Painting Lua Script](https://cdn.discordapp.com/attachments/438735638754361345/959767753521258546/E_RNG_2.0.lua)
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)

## Intro

By viewing a painting in the game, like the ones in Lilycove Contest Hall, the RNG is reseeded using the video frame counter.

The benefit to reseeding the RNG by viewing paintings is to not have to wait for higher advances. Normally, the RNG will always start with a predetermined number and generate the same random numbers each time.

This method can be combined with battle videos to save the new RNG state after viewing the painting.

Reseeding the RNG with paintings can also be used for Ruby and Sapphire, live or dry battery.

## Setup

1. Find a target seed using PokeFinder.

2. Right click on the chosen seed within PokeFinder and choose "Generate times for seed".

## Painting RNG

1. Subtract 0x1E (or 30 in decimal) from the seed shown in PokeFinder.

   - This can be done by using Google, or the built in Windows calculator.
   - Keep in mind this number is a base and may need to be adjusted depending on the emulator used and how it's set up. If the desired seed is not the seed shown in the lua script, adjust the number subtracted by 1 and try again.

2. In the game, wait for the painting timer shown by the lua script to equal the number calculated.

   - This should be done by viewing the party menu to avoid having NPCs mess with the RNG.

3. View the painting at this number to reseed the RNG to the seed wanted.

4. Then use the number of advances shown in "Seed to Time" of PokeFinder to finish the RNG like normal.
