---
title: 'Friend Safari RNG'
description: 'Get shiny 6IV friend safari Pokemon, like Ditto!'
slug: 'pcalc-xy-friend-safari'
subCategory: 'Custom Firmware'
---

## Tools

- A 3DS with PCalc ([PCalc Install Guide](https://www.pokemonrng.com/misc-3ds-installing-pcalc))
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

## Required Reading

- [TinyMT Timeline](https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen6-TinyMT-Timeline-Calibration)
- [NTR Helper Usage](https://www.pokemonrng.com/ntr-helper-usage)

## Explanation of TinyMT frames within Tiny Timeline Tool

- **Main RNG Frame**: The main RNG frame ranges that correspond to each TinyMT frame that is listed.
  - Through manipulation of the TinyMT timeline, you can make the TinyMT frames overlap with different main RNG frames.
- **Enctr?**: Determines if there will be an encounter or not if the character turns or walks into the grass during those TinyMT seeds. It's the most important factor for this RNG.
  - Encounter must be under 13 (0-12) since this will guarantee an encounter every time.
- **Sync?**: Determines if nature will be Synchronized or not.
  - `X` = No `O` = Yes
- **Slot**: Determines which slot of Friend Safari will be chosen for the Pokemon that appears.
  - Order is same order as shown in Friend Safari Pokemon screen from left to right before entering the specific safari.
- **HA**: Determines if Pokemon will have HA or not.
  - `X` = No `O` = Yes

## Step 1: Set up

1. Load up XY and connect to NTR Helper within 3DSRNGTool.
2. Enter the Friend Safari you wish to RNG in.
3. Walk to the left side of the area outside of the grass and save.
   - You can now either choose to do a test run, or reset game to do the reseeding method mentioned further in the guide to find a target frame.

```
Note: This guide assumes you already have basic knowledge of how to do Gen 6 RNG. Otherwise it is recommended to first familiarize yourself with Gen 6 RNG mechanics by RNGing something simple like eggs.
```

## Step 2: Manipulating TinyMT

The key to successfully causing an encounter on your target frame is manipulating the TinyMT using the method below. It is suggested to practice manipulating the TinyMT first for test frames to get an idea for how it all works.

1. Choose a test frame to be your target frame.
   - You can do this by searching for any frame you want within the `Wild RNG` Tab of 3DSRNGTool.
   - Do not worry about nature if using Sync as this will be done with TinyMT.
   - Right click on the frame you want and click "Set as Target Frame".
2. Ingame, take a step into the first grass tile.
3. Open the game menu with `X`.
   - This is necessary to prevent your character from fidgetting and messing with the TinyMT timeline.
4. Click on `Tiny Timeline Tool` within the Wild RNG Tab of 3DSRNGTool.
   - Make sure the `Consider Delay` box is checked and delay is 6.
5. Click on `Calibrate` by the `Tiny Seeds` and wait for it to calibrate for you.
6. If the TinyMT frames you want do not overlap with the target frame, take a step out of the grass and then back into the grass, open menu, then calibrate like before.
   - Repeat as needed until the TinyMT frames you want line up with the target frame.
   - To advance the TinyMT frames a smaller amount you can just turn in place once instead of taking steps.
   - To advance frames faster you can walk up and down the left side of the area since steps advance TinyMT frames the fastest.
   - If you accidentally trigger an encounter, afterwards walk at least 5 steps or else you won't be able to trigger another encounter when you want to. Don't forget to do that even if you did a successful RNG and that you want to do another one right after.

## Step 3: Hitting the Target Frame

1. To avoid a random TinyMT index advancement (+2), you must close the menu during your target's index. Once done, pause the game with `Start + Select`.
   - Advance frame by frame by pressing `Select` until you are on your target frame.
   - Make sure you are standing in a grass tile while doing this.
2. At the same time, unpause with `A` and turn in any direction with the D-Pad to trigger the encounter.
3. Calibrate a delay if needed, although delay of 6 should work for Friend Safari if you do a turn, and 14 if you do a step.

## Reseeding Method

Once you have the hang of manipulating the TinyMT to correspond to a target frame, then you can go for higher frames. Using NTR Helper and reseeding you can search for a target frame faster.

1. Load up XY and connect to NTR Helper within 3DSRNGTool.
   - Press `One Click` in NTR Helper to connect and grab the initial seed.
   - Directions for how to do this can be found in the NTR Helper Usage link above.
2. Press `A` to get to the continue screen. This is when the seed is determined.
3. Search for frames using that seed, and if nothing you like comes up then reseed.
   - You can do this by pressing `B` then `A` to back out of the continue menu and go back into it.
   - This gives a new initial seed each time.
4. Repeat the process until you find a frame you like.
5. Choose to continue the save, manipulate the TinyMT, and trigger the encounter on the target frame to get the Pokemon you wanted.

```
Note: Frames advance twice as fast in a battle, so you can use a battle to advance a lot of frames and then manipulate the TinyMT. Be careful to allow a lot of time to do so in case you miss your target frame while trying to line up the TinyMT frames.
```
