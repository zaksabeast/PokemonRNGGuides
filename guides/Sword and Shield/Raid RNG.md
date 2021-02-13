---
title: 'Raid RNG'
description: 'RNG raid Pokemon (Even G-max!) found in Dens!  Use this after getting your den seed.'
slug: 'retail-swsh-raid'
subCategory: 'General'
---

## Introduction

First, a huge thanks to the research team that spent days to find this: Leanny (u/LeanYosh), Admiral Fish (u/Admiral_Fish), Zaksabeast (u/Zaksabeast), wwwwwwzx (u/wwwwwwzx), Kaphotics (u/Kaphotics) and Vladcik (u/Aligatueur).

The shiny charm does not affect the shiny generation in Raids.

**GameFreak can patch this at any time, so wait to be told the update is safe before updating your game.**

## Tools

- [Admiral Fish's RaidFinder](https://github.com/Admiral-Fish/RaidFinder/releases/) or [Leanny's Mobile Seed Checker](https://leanny.github.io/seedchecker/index.html)
- [Leanny's PKHeX Raid Plugin](https://github.com/Leanny/PKHeX_Raid_Plugin) or [Zaksabeast’s CaptureSight](https://github.com/zaksabeast/CaptureSight/releases)

## Step 1: Get your raid seed

Follow one of these two guides to get your raid seed:

- [Get your raid seed with custom firmware](retail-swsh-get-seed-with-cfw)
- [Get your raid seed without custom firmware](retail-swsh-get-seed-without-cfw)

## Step 2: Find your desired Pokemon

Use RaidFinder or the Mobile Seed Checker to find your desired Pokemon.

Each den can has muliple spawns, and each spawn has predetermined properties such as Pokemon species and flawless IV count. The spawn used is generated with a cryptographically secure value that cannot be RNG'd, but the spawn can be reset after RNGing your Pokemon, so you can choose any spawn you want to RNG.

```
Note: The PKHeX raid plugin shows the current Pokemon is in 0 advances while RaidFinder shows the current Pokemon is in 1 advance.
```

## Step 3: Advance the RNG

There are multiple methods to advance the RNG:

- **Day by day:** use this if you do not have Nintendo online or a friend with a switch
- **VS battle glitch:** use this if you have Nintendo online or a friend with a switch
- **Luxray:** use this if you're okay with software botting and have custom firmware
- **Arduino:** use this if you're okay with hardware botting. This method will not be covered in this guide, but you can find an example of an RNG advancing tool [here](https://github.com/nnguy132/Switch-Frame-Advancer)

At any point during the process, you can check your seed again using the instructions in step 1 to make sure you did not make a mistake somewhere.

### Day by day

Your Switch must be in local mode; airplane will not work.

1. Open your raid's menu
1. Go to "Invite others"
1. While the game is searching, press the Home button
1. Go to the "Date and Time" settings in the switch settings menu
1. Edit your day/month/year by one
1. Press "OK"
1. Enter back into the game
1. Cancel the raid search
1. Go back in the game
1. Cancel the Raid search
1. Go back to the overworld. You should see the den being red again. This advances the RNG one time
1. Continue advancing until you reach three advances from your desired Pokemon.

```
Note: You can only advance one day at a time.  Skipping more than one day will only advance the RNG once.  Going back in time does not advance the RNG, so update both the month and day at the end of the month.
```

### VS battle glitch

Make sure to do this method while inside of a Pokemon center, otherwise your game might crash.

1. Connect your Switch online, and go to the VS Menu
1. Start a battle and let your switch find another player
1. The moment your game has found a player, hold the "Home" button on your switch and enable airplane mode (you will see a connection error if this is done correctly)
1. Go to the "Date and Time" settings in the switch settings menu
1. Edit your day/month/year by one. This advances the RNG one time
1. Continue advancing until you reach three advances from your desired Pokemon

```
Note: Some people had issues by advancing a specific amount and getting more far than excepted, so make sure to check your seed often and make sure you're still on track.
```

```
Note: You can only advance one day at a time.  Skipping more than one day will only advance the RNG once.  Going back in time does not advance the RNG, so update both the month and day at the end of the month.
```

### Luxray

Make sure to do this method while inside of a Pokemon center, otherwise your game might crash.

1. Update the Date/Time setting to be from the server
1. Set the amount of RNG advances you want with the overlay menu
1. Press Step in order to have Luxray to advance the RNG

You can use Luxray to fix your Switch's clock since it edits the internal server time.

## Step 4: Reset to get your desired Pokemon

A den's spawns are predetermined for the current raid and the next two advances.

1. Advance the RNG until you reach three advances from your desired Pokemon
1. Save the game
1. Advance three times
1. Start the raid and see if the Pokemon is your desired species
1. Restart the game and repeat the above steps until you get your desired species.

## Natural raid rng

Every den has its own Seed. Even if it's inactive, the advancement works the same, day by day, and every RNG advancement will advance every den.

Most people do raid RNG by using a wishing piece to reset a den's seed until a good seed is found, but it's possible to get a shiny Pokemon using the seed each den already has.

A den's seed is normally reset to get a specific den with exact Pokemon properties, such as nature, shininess, and IVs. With natural raid RNG, an existing seed is chosen to go after, so there's a lack of control over the Pokemon properties and potential spawns. As a result, this method is only recomended if you just want quick shiny Pokemon.

This method is faster because instead of focusing on one specific den, every den is RNG'd at the same time.

1. Use CaptureSight's "all den view" or the PKHeX raid plugin to find a den with a nearby shiny
1. Advance the RNG until you reach three advances from the shiny raid
1. Save the game
1. Advance the RNG three times and check to see if the den is active
1. If not, reset the game and try again until the den is active

```
Tip: Save time by throwing wishing pieces on a random den in order to do advances without moving to different dens.  The wishing piece den might be useable for RNG later too!
```
