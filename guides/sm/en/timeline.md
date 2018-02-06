# Gen 7 Timeline Guide

## Tools
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- PCalc
    - [Sun/Moon](https://gbatemp.net/threads/wip-pokecalcntr-iv-and-nature-overlay-plugin-for-sun-and-moon.460524/)
    - [Ultra Sun/Ultra Moon](https://gbatemp.net/threads/pcalc-usum-the-rng-plugin-for-ultra-sun-and-ultra-moon.489643/)

Before continuing with the guide it is recommended to be in the place you wish to RNG.

## Step 1: Set Up 3DSRNGTool

### In the upper right of 3DSRNGTool:
1. Input your game version and your TSV.
    - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the Shiny Charm box.

## Regarding Timeline and NPCs

If you are in an area with an NPC count of one or more you must always create a timeline before searching for a target frame. A timeline is able to accurately predict what frames you can actually land on.

If you are in an area with 0 NPCs the RNG procedures are different, and no timeline is needed. Refer to the guide you are following for more information on how to RNG in Gen 7 with 0 NPCs.

In the Gen 7 games each NPC has an affect on the RNG frames. This is why the frames will not always advance by a constant number. In general, each NPC advances the frames by one, so an area with four NPCs will generally advance five frames each time. There is also Rotom and your character blinks that affect the frames advanced. 3DSRNGTool can accurately predict all of this if the timeline is created properly and allow you to land on your target frame without skipping over it due to NPCs.

## Step 2: Create a Timeline
1. In 3DSRNGTool, make sure to input your initial seed, game version, and your TSV if you haven't already. Double check that everything is correct.
    - Initial Seed can be found by pressing `Start + Up` ingame.

2. Check “Safe F Only”.

3. You can find the number of NPCS using PCalc.
    - After getting to the final screen for your Pokemon press `Start + Up` to bring up the window with the NPC counter.
    - If you already have it up, close it by pressing `Start + Up`, and then bring it back up again to reset the NPC counter.
    - Let the game run for approximately 30 seconds to a minute to calibrate correctly.

4. In the game, advance to the final screen for the Pokemon you are RNGing for. Input the frame you are currently on in the frame range. You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

5. Click "Calculate", and then advance to any of the frames that are listed that have a "-" in the Mark column.
    - These frames are considered Safe Frames and can be used to accurately predict the frames you can land on.

6. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frames given earlier with `Start + Select` and then slowly advance by pressing `Select` while paused.
    - Which frame you land on does not matter, just as long as it is one listed.

## Step 2(b): Verifying Timeline and Number of NPCs

1. Input your current frame after reaching a safe frame and then check “Create Timeline” and "Calculate".
  - Once you have landed on a safe frame and have used that frame to create a Timeline, do not change it. Otherwise the Timeline will be off and you'll have to restart from Step 2.

2. Press `Select` on your 3DS to advance several times and compare to what the next frames are given in 3DSRNGTool.
    - If they match then you have the correct number of NPCs.
    - If they do not match, restart from beginning of Step 2.

```
Note: Do not mess with filters while creating a timeline. You should not have touched anything in filters (except to check the "Safe F Only" box) up to this point. Otherwise if you have messed with filters, restart from the beginning.
```

If you are going for a target frame with a long wait time, it is advised to recheck the timeline every once in awhile to make sure that the number of NPCs did not change. Not all NPCs will influence the RNG at once, which is why waiting 30 seconds to a minute or longer for PCalc to calibrate the number of NPCs correctly is necessary. Checking that the timeline still matches a couple minutes later makes sure that time was not wasted waiting for a frame that could not be landed on due to fluctuating NPCs.
