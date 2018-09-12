# XY Friend Safari RNG Guide

## Tools

- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
  - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- [PCalc for XY](https://pokemonrng.com/downloads/pcalc/xy)

## Required Reading

- [TinyMT Timeline](https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen6-TinyMT-Timeline-Calibration)
- [NTR Helper Usage](https://github.com/wwwwwwzx/3DSRNGTool/wiki/NTR-Helper-Usage)

## Set up

1. Load up XY and connect to NTR Helper within 3DSRNGTool.
  - Directions for how to do this can be found in the NTR Helper Usage link above.

2.  Enter the Friend Safari you wish to RNG in.

3. Walk to the left side of the area outside of the grass and save.
  - You can now either choose to do a test run, or reset game to do the reseeding method mentioned further in the guide to find a target frame.

```
Note: This guide assumes you already have basic knowledge of how to do Gen 6 RNG. Otherwise it is recommended to first familiarize yourself with Gen 6 RNG mechanics by RNGing something simple like eggs.
```

## Explanation of TinyMT frames within Tiny Timeline Tool

- Main RNG Frame: The main RNG frame ranges that correspond to each TinyMT frame that is listed.
  - Through manipulation of TinyMT can make them overlap with different main RNG frames.
- Enctr?: Determines if there will be an encounter or not if turn or walk into grass during those TinyMT seeds.
  - Encounter of less than 5 is best since this will guarantee an encounter every time.
- Sync?: Determines if nature will be Synchronized or not. 
  - `X` = No `O` = Yes
- Slot: Determines which slot of Friend Safari will be chosen for the Pokemon that appears.
  - Order is same order as shown in Friend Safari Pokemon screen from left to right before entering the specific safari.
- HA: Determines if Pokemon will have HA or not. 
  - `X` = No `O` = Yes

## Manipulating TinyMT

The key to successfully causing an encounter on your target frame is manipulating the TinyMT using the method below. It is suggested to practice manipulating the TinyMT first for test frames to get an idea for how it all works.

1. Choose a test frame to be your target frame.
  - You can do this by searching for any frame you want within the `Wild RNG` Tab of 3DSRNGTool.
  - Do not worry about nature if using Sync as this will be done with TinyMT.
  - Right click on the frame you want and click "Set as Target Frame".

2. Ingame, take a step into the first grass tile.

3. Open the game menu with `X`.

4. Click on `Tiny Timeline Tool` within the Wild RNG Tab of 3DSRNGTool.
  - Make sure the `Consider Delay` box is checked and delay is 6.

5. Click on `Calibrate` by the `Tiny Seeds` and wait for it to calibrate for you.

6. If the TinyMT frames do not overlap with the target frame, take a step out of the grass and then back into the grass, open menu, then calibrate like before.
  - Repeat as needed until the TinyMT frames you want line up with the target frame.
  - To advance the TinyMT frames a smaller amount you can just turn in place once instead of taking steps.
  - To advance frames faster you can walk up and down the left side of the area since steps advance TinyMT frames the fastest.
  - If you accidentally trigger an encounter, afterwards walk at least 3 steps or else you won't be able to trigger another encounter when you want to.

## Hitting Target Frame

1. When you are getting close to your target frame, close the menu, and then pause the game with `Start + Select`.
  - Advance frame by frame by pressing `Select` until you are on your target frame.
  - Make sure you are standing in a grass tile while doing this.

2. At the same time, both unpause with `A` and turn in any direction with the D-Pad to trigger the encounter.

3. Calibrate delay if needed, although delay of 6 will work for Friend Safari.

## Reseeding Method

Once you have the hang of manipulating the TinyMT to correspond to a target frame, then you can go for higher frames. Using NTR Helper and reseeding you can search for a target frame faster.

1. Load up XY while holding the `Left` D-pad. The screen should flash 3 times.

2. Press `One Click` in NTR Helper to connect and grab the initial seed.

3. Press `A` to get to the continue screen. This is when the seed is determined.

4. Search for frames using that seed, and if nothing you like comes up then reseed.
  - You can do this by pressing `B` then `A` to back out of the continue menu and go back into it.
  - This gives a new initial seed each time.

5. Repeat the process until you find a frame you like.

6. Go into the game, manipulate the TinyMT, and trigger the encounter on the target frame to get the Pokemon you wanted!

```
Note: Frames advance twice as fast in a battle, so you can use a battle to advance a lot of frames and then manipulate the TinyMT. Be careful to allow a lot of time to do so in case you miss your target frame while trying to line up the TinyMT frames.
```