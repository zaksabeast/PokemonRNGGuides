---
title: 'Initial Seed RNG'
description: 'How to use Dolphin to set up Initial Seed RNG for all the Gamecube Games'
slug: 'gc-initial'
subCategory: 'Emulator'
isRoughDraft: false
---

## Requirements

- Dolphin with the Lua support (Only available on the Discord at the moment)
- The Lua scripts for Gamecube (Only available on the Discord at the moment)
- PokeFinder
- RunAsDate (x64)

## Intro

This guide will help you perform Initial Seed RNG using a specific version of Dolphin and Lua Scripts. This method applies to all Gamecube games, including Pokemon Channel. Understanding this process is essential for all RNG methods covered in the other guides found in this section.

## How to Obtain Your Origin Seed

The Origin Seed is the Initial Seed at a specific date and time, used to calibrate results when searching for a specific Initial Seed. This is a quick and easy process:

1. Open RunAsDate and set the date and time to '2000-01-01 00:00.'
1. Run Dolphin with this configuration, load the appropriate game and Lua script.
1. Write down the Initial Seed displayed; this is your Origin Seed.

```
Note: The Origin Seed will vary for each game you use. The Origin Seed for Colosseum will differ from that of XD, so keep these values safely recorded to avoid repeating this step.
```

## Method 1: Performing an Initial Seed RNG

Now that you have your Origin Seed, you're ready to conduct an Initial Seed RNG. This process is simple and beneficial for Gamecube games, allowing you to find the right Initial Seed to achieve your desired Target Seed within an Advances Range, giving you more control over your RNG.

1. Open PokeFinder and navigate to 'Gen 3 Tool' > 'GameCube' > 'GameCube RTC.' Here, you'll need to fill in the following:

   - Origin Seed: As explained earlier, this is your Origin Seed.
   - Target Seed: Enter the Seed of the spread you want to RNG, obtained from PokeFinder or another tool.
   - End Date: Set the last date for the tool to search for results. It's recommended to choose a date a few years in the future to maximize results.
   - Min Advance / Max Advance: Define the Advances range according to your specific RNG needs.

1. Input your Origin Seed, Target Seed, Advances Range, and ensure you've set an appropriate End Date. Start the search for results.
1. Once you find an Initial Seed that suits your requirements, make note of the 'Time' result and input it into RunAsDate.
1. Relaunch Dolphin using RunAsDate, load the game and the Lua script. The Initial Seed will match the one displayed in the GameCube RTC results. You've successfully completed your Initial Seed RNG!

```
Note: If you're new to Gamecube RNG, you can use a random Target Seed to learn how the process works.
```
