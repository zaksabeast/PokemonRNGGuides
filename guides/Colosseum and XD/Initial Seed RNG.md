---
title: "Initial Seed RNG"
description: "How to use Dolphin to set up Initial Seed RNG for all the Gamecube Games"
slug: "gc-initial"
subCategory: "Basic Knowledge"
isRoughDraft: false
---

```
Note : This guide will help you to do Initial Seed RNG using a specific version of Dolphin and with the help of some Lua Scripts. This guide applies to every Gamecube game, even Pokemon Channel ! Knowing this will be required to all the RNG methods covered in the other guides present on this section.
```

## Requirements

- Dolphin with the Lua support (Only available on the Discord at the moment)
- The Lua scripts for Gamecube (Only available on the Discord at the moment)
- PokeFinder
- RunAsDate (x64)

## How to get your Origin Seed

The Origin Seed is the Initial Seed at a specific date and time in order to calibrate the results when you'll want to search for a specific Initial Seed. This is really easy and fast to achieve :

- Open RunAsDate, put the date and time to **2000-01-01 00:00** and then run Dolphin with it. Load the right game, and the right lua. Write the Initial Seed shown there. **It's your Origin Seed**. We're done with that part.

```
Note : Obviously, the Origin Seed will change for each game you use. The Origin Seed of your Colosseum will be different from the Origin Seed of your XD etc. Take care to use the right one. You should keep these values somewhere safe in order to avoid doing that every time you want to do a RNG with Dolphin.
```

## Method 1 : How to do an Initial Seed RNG.

Now that the Origin Seed has been found, you're ready to do an Initial Seed RNG. Doing it for Gamecube Games is really easy and helpful for your RNGs. It'll allow you to find the right Initial Seed that will give your Target Seed in a desired Advances Range, allowing more control in your RNG.

1. Open PokeFinder, go the 'Gen 3 Tool' menu, then 'GameCube' and finally 'GameCube RTC'. You'll find some boxes to fill :

   - Origin Seed : No need to go in detail here, we covered that right before.
   - Target Seed : As the name suggest, you'll put the Seed of the spread you're interested for RNGing purposes. Using the Searcher of PokeFinder or any other tool.
   - End Date : The last day the tool will look for possible results. There's no word on what date to put, but I'd still suggest to put a few couple of years to search for the most results as possible.
   - Min Advance / Max Advance : This will be the Advances range where the tool will try to find your Target Seed. You'll put the right range based on the RNG you'll do, which is really case by case.

2. Now, everything is really simple. Just put the Origin Seed, the Target Seed, the Advances Range. Don't forget to put a correct End Date, and start to search for results.

```
Note : If you never did any GC RNG, you can just put a random Target Seed to see how it works.
```

3. Once you have an Initial Seed that suits your needs, take note of the 'Time' result. Put it in RunAsDate.
4. Relaunch Dolphin with RunAsDate, the game and the lua. The Initial Seed will match the one shown in the results of the GameCube RTC windows. You've done your Intial Seed RNG !
