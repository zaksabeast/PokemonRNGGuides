# Gen 7 Timeline Guide

## Tools
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- PCalc
    - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/usum)
    - [Sun/Moon](https://pokemonrng.com/downloads/pcalc/sm)

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

3. Enter the number of NPCs for the area. 3DSRNGTool should automatically fill in this number, but it can be confirmed with PCalc.
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

Usually, this is when mistakes making the timeline are found. Double check that initial seed is correct, and that PCalc's NPC counter hasn't changed while making a timeline.

```
Note: Do not mess with filters while creating a timeline. You should not have touched anything in filters (except to check the "Safe F Only" box) up to this point. Otherwise if you have messed with filters, restart from the beginning.
```

If you are going for a target frame with a long wait time, it is advised to recheck the timeline every once in awhile to make sure that the number of NPCs did not change. Not all NPCs will influence the RNG at once, which is why waiting 30 seconds to a minute or longer for PCalc to calibrate the number of NPCs correctly is necessary. Checking that the timeline still matches a couple minutes later makes sure that time was not wasted waiting for a frame that could not be landed on due to fluctuating NPCs.

```
Note: To check that the target frame you want is still within the timeline, redo the timeline using the current frame you are on and then search for the target frame you wanted. If it is not appearing in results, then your timeline shifted.
```

### Timeline Leap (Mystery Gifts Only)

This is a variation of the timeline method for Mystery Gift Pokemon in which you can manipulate the timeline to land on any frame of your choosing. Recommended for those who already understand the normal timeline method since it is assumed you already have the knowledge of how to do a timeline.

1. In "Filters" set it to search for the Pokemon you are wanting.
    - Do not check "Safe F Only".

2. Search using "Frame Range" to find a frame you want to land on. Right click on the frame and "Set as Target Frame". This frame will be referred to as Frame 2 from here on.
    - Any frame that shows up can be landed on with this method, so if the frame isn't a safe frame you can still use it as a target frame.

3. Use Festival Plaza or Hau'Oli shopping mall to advance frames. When you are getting close to Frame 2, either leave Festival Plaza or fly to the first PokeCenter (the one by the school).
    - Ideally you'll want to be within 10,000 frames of Frame 2 when you're at the first PokeCenter.

4. Position your character so you're standing behind the delivery man but facing the red counter. Check that you have 4 NPCs while standing there.
    - 4 NPCs are optimal, which is why your character should stand behind the delivery man. If you are getting 5 NPCs instead, exit and re-enter the PokeCenter.

5. Talk to the delivery man until you get to the Yes/No dialogue.

6. Make sure you are on a safe frame. With 4 NPCs this can be done by advancing frames one at a time and checking the last digit.
    - If you are on safe frames, the last digit will repeat itself like A-B-A-B-A-B because frames will be advancing 5 each time.
    - For an example, frames can advance with last digits being 2-7-2-7-2-7. (2+5=**7**, 7+5=1**2**, 12+5=1**7**, 17+5=2**2** - notice how the last digits are always 2 and 7.)

7. Input the current frame you are on after confirming it is a safe frame into the starting frame in "Frame Range". Choose "Timeline Leap" and then "Calculate".
    - A window will pop up with the frame you will press `A` on for "Yes" to accept the Pokemon. This is Frame 1.

8. Check to make sure that your target frame (Frame 2) and timeline are correct. Within the window that popped up, choosing "Yes" will allow you to check that Frame 2 still has the spread you wanted.
    - Due to how calculations are done in 3DSRNGTool, Frame 2 may or may not always have the same spread. Checking it before advancing to the next step is advised.
    - If Frame 2 does not have the spread you wanted, search for your target spread within the timeline created. (Choose "Yes" when the window pops up.)
        - If you did not mess with filters after finding your target frame, it will be easy to find.
    - Right click and "Set as Target Frame" on the desired spread. This is now your new Frame 2.
    - If Frame 2 is not on the timeline, then you'll have to find the new frame the spread is on. Choose "Frame Range" and see what frame the spread is now on and then redo the "Timeline Leap" to find the new Frame 1.

9. Advance to Frame 1, and when you land on it, press `A` to advance the dialogue to "You received xxx!".
    - Be prepared to press `A` for Frame 2 afterwards as there is about a 10 second interval in between the frames.

10. Press `A` on Frame 2 to obtain the Pokemon you wanted. Congratulations!

### Timeline Leap (Ultra Wormhole Only)

This is a variation of the timeline method for Ultra Beasts that are found in Wormholes. With this method you can manipulate the timeline to land on any frame of your choosing. Recommended for those who already understand the normal timeline method since it is assumed you already have the knowledge of how to do a timeline.

1. Position your character so you're standing behind Xurkitree.
    - This is so there is a longer time window for having 1 NPC due to the wandering Xurkitree in the background.

2. In "Filters" set it to search for the Pokemon you are wanting.
    - Do not check "Safe F Only".

3. Search using "Frame Range" to find a frame you want to land on. Right click on the frame and "Set as Target Frame". This frame will be referred to as Frame 2 from here on.
    - Any frame that shows up can be landed on with this method, so if the frame isn't a safe frame you can still use it as a target frame.    

4. Use Festival Plaza to advance frames. When you are getting close to Frame 2 leave Festival Plaza.
    - Ideally you'll want to be within 10,000 frames of Frame 2 when you're back in front of Xurkitree.

5. Press `X` to open the menu as soon as the NPC counter in PCalc changes from 2 to 1.

6. Advance to a safe frame if you are not already on one and input that as the starting frame in Frame Range.

7. Check the "Menu" box. This can be found to the left under "Stationary Setting".

8. A window will pop up with the frame to close the menu on and initiate the battle.
    - Hold `X` and then `A` to both unpause the game and close the menu, then immediately press `Start + Select` to pause the game again, but this time with the menu closed.
    - There is about a 3 second delay between Frames 1 and 2, so be prepared.
    - Advance to target frame and press `A` to unpause the game and initiate the battle.
