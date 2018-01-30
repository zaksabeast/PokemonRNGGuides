# Gen 7 Wild RNG Guide

## Tools
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- PCalc
    - [Sun/Moon](https://gbatemp.net/threads/wip-pokecalcntr-iv-and-nature-overlay-plugin-for-sun-and-moon.460524/)
    - [Ultra Sun/Ultra Moon](https://gbatemp.net/threads/pcalc-usum-the-rng-plugin-for-ultra-sun-and-ultra-moon.489643/)

```
In the game you'll want to have "honey" to initiate the wild encounter.

Note: You can get the "honey" item in any store after clearing three trials.
```

```
Before continuing with the guide it is recommended to be in the place you wish to RNG.

For Sun/Moon games, here is a list of [encounter slots and 0 NPC spots](http://pokerng.forumcommunity.net/?t=59613020).
```

## Step 1: Set Up 3DSRNGTool

### In the upper right of 3DSRNGTool:
1. Input your game version and your TSV.
    - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the Shiny Charm box.

## Step 2: Create a Timeline
1. In 3DSRNGTool, make sure to input your initial seed, game version, and your TSV if you haven't already. Double check that everything is correct.
    - Initial Seed can be found by pressing `Start + Up` ingame.

2. Choose the "Wild" tab then the Category "Normal Wilds" or "UBs" if going for an Ultra Beast. You can choose "Location" and then from the "Slot" dropdown the Pokemon you are wanting to RNG to have its info automatically filled in for you.

```
If you are using a Pokemon with Synchronize in the first slot of your party, choose its nature from the dropdown list for "Synch Nature". Failure to do this if the lead Pokemon has Synchronize will result in frames not being correct.

For wild Pokemon, Synchronize has a 50% chance of having the Pokemon you encounter be the same nature as the lead Pokemon with Synchronize. If you are aiming for a specific nature, having a Pokemon with Synchronize in the first slot of your party will greatly improve your chances of finding frames.
```

3. Check "Day" or "Night" depending on which it is in your game. If it is raining in the game, also check the "Raining" box. Not doing so will result in timeline always being off.


4. Check “Safe F Only”.

```
Note: If you are in an area with 0 NPCs, there will not be a "Safe F Only" option. Do not check the "Blink F Only" box. Continue with the rest of the guide instead.
```

5. You can find the number of NPCS using PCalc.
    - Open the in game menu with `X` and have the cursor hover over the bag, then press `Start + Up` to bring up the window with the NPC counter.
    - If you already have it up, close it by pressing `Start + Up`, and then bring it back up again to reset the NPC counter.
    - Let the game run for approximately 30 seconds to a minute to calibrate correctly.

6. Input the frame you are currently on in the frame range. You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

7. Click "Calculate", and then advance to any of the frames that are listed that have a "-" in the Mark column.
    - These frames are considered Safe Frames and can be used to accurately predict the frames you can land on.

8. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frames given earlier with `Start + Select` and then slowly advance by pressing `Select` while paused.
    - Which frame you land on does not matter, just as long as it is one listed.

## Step 2(b): Verifying frame advancements

1. Input your current frame after reaching a safe frame and then check “Create Timeline” and "Calculate".
  - Once you have landed on a safe frame and have used that frame to create a Timeline, do not change it. Otherwise the Timeline will be off and you'll have to restart from Step 2.

2. Press `Select` on your 3DS to advance several times and compare to what the next frames are given in 3DSRNGTool.
    - If they match then you have the correct number of NPCs.
    - If they do not match, restart from beginning of Step 2.

## Step 3: Obtaining the wanted Pokemon

1. Once you have determined the number of NPCs and have a correct timeline, the next step is to actually RNG the Pokemon.

2. Adjust filters to what you are wanting, then click "Calculate" and choose any one of the results you want. If there are no results, increase the time in "Create Timeline".

3. Advance to that frame and when you land on it, Press A to open the bag. Choose to use "Honey" and then wait for the animation to finish and initiate the battle.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again.

## If you did not obtain the Pokemon you wanted

1. Double check that all info has been inputted correctly, especially the initial seed.

2. Restart the guide from the beginning and make sure to follow _all_ instructions given. Not getting the correct Pokemon is usually a result of user error.
