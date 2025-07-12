const e=`---
title: "BDSP RNG Guide - Setup PokeFinder for shiny hunting"
navDrawerTitle: "PokeFinder Setup"
description: "Step-by-step guide to set up PokeFinder for RNG abuse in Brilliant Diamond and Shining Pearl."
slug: "bdsp-pokefinder"
category: "Brilliant Diamond and Shining Pearl"
tag: "any"
---

## Tools

- [PokeFinder](/pokefinder)
- For non-Custom Firmware use [Project Xs](https://github.com/Lincoln-LM/Project_Xs)
- For Custom Firmware use [CaptureSight](/install-capturesight)

## Setting up Profiles

PokeFinder has the ability to set up profiles for each of your individual saves. By setting up a profile for a save, you can have information such as TID/SID readily available. This is useful because you only need to input save specific information once, and then it's available every time you relaunch PokeFinder.

1. Open PokeFinder and navigate to "Gen 8 Tools" -> "Profile Manager".
2. Select "New" and input the info needed to create a profile for your game.
   - For TID and SID, these values will be the 5 digit values displayed in either CaptureSight or PkHeX (hover over the TID box to see this).
   - This will only have to be done once for each profile you set up.

## Menu Options

In the opening screen of PokeFinder there are options for which type of RNG you are doing sorted by generation. You will want to pick the correct one for the Pokemon you are going to RNG.

- Static - for Pokemon found in the overworld, roaming Pokemon, or Pokemon received as gifts
- Wild - for Pokemon found in the wild, such as grass, surfing, etc.
- Event - for Pokemon obtained through Mystery Gift
- Egg - for Pokemon eggs collected from the daycare
- TID/SID - for finding a specific TID/SID to RNG

## RNG Seeds

### Non-Custom Firmware

Follow the [instructions in the Github ReadMe](https://github.com/Lincoln-LM/Project_Xs?tab=readme-ov-file#how-to-run) to set up Project Xs.

Join the [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg) for assistance.

### For Custom Firmware

Within the different RNG method screens there are inputs for Seed 0 and Seed 1. Take note that if you are using CaptureSight to view the RNG seeds there are 4 seeds displayed. To input the 4 seeds from CaptureSight into PokeFinder use the following:

- Seed 0 of PokeFinder = Seed 0 and Seed 1 of CaptureSight
- Seed 1 of PokeFinder = Seed 2 and Seed 3 of CaptureSight
`;export{e as default};
