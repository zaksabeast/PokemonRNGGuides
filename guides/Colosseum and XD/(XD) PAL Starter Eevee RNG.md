---
title: '(XD) Eevee PAL RNG'
description: 'How to RNG the starter Eevee with a PAL Pokemon XD'
slug: 'pal-xd-eevee'
subCategory: 'RNG'
isRoughDraft: false
---

```
Note : To make things easiers and more readable, I'll assume that the user has some basic knowledge which implies how setting up the emulator, but also how to make an Initial Seed RNG on Gamecube, which is covered on its own guide. Obviously this guide only work for PAL XD ! Don't try this with the NTSC version
```

```
Note : This guide will cover two methods to RNG the Eevee. One based on a known Eevee spread list which will imply the Initial Seed RNG, and the other one just using any Initial Seed, allowing more random spreads. Follow the one that suits your needs !
```

## Requirements

- Dolphin with the Lua support (Only available on the Discord at the moment)
- The Lua scripts for Gamecube (Only available on the Discord at the moment)
- PokeFinder
- PAL-Pal (https://github.com/KapitalRoser/PAL-Pal) done by Kapital#9267
- A new save of PAL XD
- The list of Shiny Eevee spreads done by Parzival#3035 (https://pastebin.com/0Dh740Kg) if you follow the Method 2
- RunAsDate (x64) if you follow the Method 2

## The different ways to advance Frames

Before going for any RNG guide, it's important to explain how you can advance your seeding and make the RNG doable. In the PAL versions of the game, once in the name menu, the state is frozen, and you can't advance like you'd do with a NTSC version. So that's why we'll need to work and mess up with the main menu to make it possible. PAL-Pal will calc and give you a pathing to your target Seed. There are 4 methods to advance :

1. **Rerolls** : This one is the more technical : In the main menu, you'll have to go to "VS Mode" => "Quick Battle" => "Battle vs CPU" => Ultimate. When Pokemon are shown, you did 1 Reroll. You just have to press "No" and re-do it to make multiple advances
2. **Memory Card Reloads** : When you're on the main menu, just press B then A (in order to reload the main menu) in order to have the game to reload the Memory Card Data. You'll have a message in-game for that purpose. Once the Memory Card is reloaded, you did +1 of this specific advance.
3. **Options Saves** : You just have to go in the Settings, change the Rumbling setting, and save the new setting before being back on the main menu
4. **Name Screen Blackout** : You'll have to start a New Game, and just press B on the screen where it ask you if you want to use a specific or a custom name. However \*\*take care to not select a (custom) name or you'll not be able to go back

```
Note : You should set your trainer's name when the Current Seed matches your target Seed. Don't make any Name Screen Blackout at this moment.
```

## Method 1 : Using PAL-Pal only

This method is the easiest one setup wise. You can hit for any Eevee not shown in the list, but it might be more long to execute and can give worse spreads.

1. Open Dolphin and load the Luas. Write the Current Seed somewhere once in the main menu. Pause the emulator.
2. Open PAL-Pal and stay on the Speedrun tab. Open the 'Configure' button, and put all the filters wanted for your Eevee (Shiny, IVs, gender, Nature) and save.
3. Input the Current Seed in the 'Current Seed (Hex)' windows and search for results
4. Once the game has found some results, you'll be able to cycle between them with the 'Next' and 'Previous' buttons.
5. Once you have found the right one, follow the instructions to get the path and do the right advances.

## Method 2 : Using the Shiny Eevee spread list

This method requires an Initial Seed RNG, but it'll allow to make your target spread really fast to hit with the advantage of being amazing spreads.

1. Open PokeFinder, and go to the Gamecube RTC tab. Input the Seed of your wanted Eevee in the Target Seed part. **It's important to search for an Initial Seed where your target Seed is at around 15-20k frames, and nothing earlier**
2. Do the Initial Seed RNG with runasdate, Dolphin and the lua script. Pause your emulator in the main screen.
3. Open PAL-Pal and go to the Custom Tab. Input your Current Seed.
4. Now the Target title Seed will be the tricky part of this method. The idea here is not to put your Target Seed, but to put the Seed that will allow to hit the target. For that, you'll need to open the Researcher with PokeFinder, and select XDRNG[R]. Put the Target Seed in the Seed box, put 1010 as Max Advance and generate the results. **Look at the Advance 1000 (it's a delay of generation). It'll be your Target Title Screen to input in PAL-Pal.**

```
Note : It might be possible that the delay isn't 1000 but 1002 or 1004. Keep using the 1000 Delay as said above because if it's not matching the Target Seed it'll just about doing a few more advances in game. In order to adjust that, just take the result of Advance 1002 and then 1004 in the Researcher.
```

5. Click on Search, your Eevee should be the first one to show up. Follow the pathing to advance your Seeds and get your Shiny Eevee done !
