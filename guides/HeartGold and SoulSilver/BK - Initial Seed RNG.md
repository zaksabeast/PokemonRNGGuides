---
title: '3) Initial Seed RNG'
description: 'How to control Gen 4 initial seeds without any difficulty with Runasdate or the Record video option'
slug: 'emulator-hgss-initial-seed'
subCategory: 'Basic Knowledge'
---

Intro : Explain that now we're more used to the concept of gen 4 RNG + PokeFinder, it's time to start to setup everything

Method 1 : Runasdate

It's the one we should just praise.
We can copy / paste our original guide

Method 2 : Using the video record function of desmume

Avoid using another tool
HOWEVER, it's not the best

=> Explain how to hit the delay, +/- 1 cases with tips like GBA game, +/- 1 year (based on odd / even year), Continue menu

Conclusion : Now we're good to learn what to do once you're used to hit your initial seed, it's time to check how to advances frames before moving on the RNG part

Available resource :

```
Note: This guide assumes that you have found a target seed already. It is necessary to have your target seed and delay before following this guide.
```

## Tools

- [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html)
  - Take care to choose the right version (32 or 64 bits) for your computer.
- [Lua Scripts for Gen 4](http://pokerng.forumcommunity.net/?t=56443955&p=396434984)

### What is RunAsDate?

RunAsDate is a tool developed by nirsoft that allows any program to load with a set time specified by the user. This tool is really useful for Gen 4 RNG, and can be your best ally in order to hit your seed without too much difficulty.

## Setup RunAsDate

1. Launch RunAsDate
2. Configure RunAsDate to look like the image below
   ![](https://i.imgur.com/HeUoPmv.png)

```
Note: You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5), so you're almost done!
```

3. Select the program you want to fake the date/time, with the "Browse..." button
4. Set the date and time to one of the given dates and times in PokeFinder to hit your seed.
5. After that, just hit "Run" and your desmume should be launched.

## Hitting the target seed

```
Note: Make save states often during this process.
```

1. Load the lua script.
2. Click `A` to get to the "Continue" screen as fast as possible.
3. Pause your emulator `Ctrl + P`.
4. Make plenty of save states in case you mess up.
5. Unpause your game, and let it run until you get close to your target delay.
6. Once you are close, pause your emulator.
7. Create another save state (you never know what might happen!).
8. Press `N` to advance the game one frame to increase the delay one time.
9. Once you are on the target delay, hold `A` while unpausing your game.

## Troubleshooting

Sometimes you will find that even though you are pressing A on the right delay, the actual delay you hit is +/-1 of what you wanted. This is to be expected because of how Gen 4 delays can either be always odd or always even. There are two methods to switch delays from even to odd or vice versa listed below:

### Changing the year

This is a simple method with RunAsDate. You just have to close your emulator (assuming you did enough saves states, and that's why it was important to do a LOT of them), and change the year in RunAsDate from +/- 1 year. Take care through, because the delay will of course change to +/-1 from your original delay! You can verify the new delay with PokeFinder in the "seed to time" tab. Once you've adjusted everything, relaunch your desmume with RunAsDate and load a save state, and redo the process.

### Load a GBA game

Loading a GBA game into the GBA slot in the emulator will switch the delay from even to odd, or vice versa.
