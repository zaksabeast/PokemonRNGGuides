---
title: 'Initial Seed RNG (RunAsDate edition)'
description: 'How to control Gen 4 initial seeds without any difficulty'
slug: 'emulator-hgss-runasdate-initial-seed'
subCategory: 'Emulator'
---

```
Note: This guide assumes that you have found your Target Seed, and that you know how to search for the wanted Seed. This guide is just explaining how to hit your Seed. It is necessary to have your target seed and delay before following this guide.
```

## Tools

- [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html) : Take care to choose the right version (32 or 64 bits) for your computer.
- [Lua Scripts for Gen 4](http://pokerng.forumcommunity.net/?t=56443955&p=396434984)

### What is RunAsDate?

RunAsDate is a tool developed by nirsoft that allows any program to load with a set time specified by the user. This tool is really usefull for Gen 4 RNG, and can be your best ally in order to hit your Seed without too much difficulty. Of course there are other ways, but this guide will only focus on RunAsDate.

## Step 1: Setup RunAsDate

1. Launch RunAsDate
2. Configure RunAsDate to look like the image below

![Setup](../../images/HeartGold-SoulSilver/Initial-Seed/Setup.png)

```
Note: You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5), so you're almost done!
```

3. Select the program you want to fake the date/time, with the "Browse..." button
4. Set the day/time you've got in order to hit your seed
5. After that, just hit "Run" and your desmume should be launched.

## Step 2: Hitting the target seed

```
Note: Make save states often during this process.
```

1. Load the lua script.
2. Go as fast as possible to the "Continue" screen and pause your emulator (Ctrl + P) and make a save state
3. Click `A` to get to the "Continue" screen as fast as possible.
4. Pause your emulator `Ctrl + P`.
5. Make plenty of save states in case you mess up.
6. Unpause your game, and let it run until you get close to your target seed.
7. Once you are close, pause your emulator.
8. Create another save state (you never know what might happen!).
9. Press `N` to advance the game one frame to increase the delay one time.
10. Once you're close to the target delay, hold `A` while unpausing your game.

## Troubleshooting

Sometimes you'll find that even though you're pressing A on the right delay, the actual delay you hit is +/-1 of what you wanted. This is to be expected because of how Gen 4 delays can either be always odd or always even. There are two methods to switch delays from even to odd or vice versa listed below:

It's not an error from your part, and is related to odd/even numbers. Nothing too hard to fix! You have two solutions in order to hit your right seed:

- Changing the year: This is a simple method with RunAsDate. You just have to close your emulator (assuming you did enough saves states, and that's why it was important to do a LOT of them), and change the year in RunAsDate from +/- 1 year. Take care through, because the delay will of course change to +/-1 from your original delay! You can verify the new delay with RNG Reporter in the "seed to time" tab. Once you've adjusted everything, relaunch your desmume with RunAsDate and load a state, and redo the process.

- Load a GBA game : Doing that will just switch odd/even seed and so will correct this problem, making it easier since it's just a simple configuration and no new delay to hit again.
