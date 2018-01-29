# Gen 7 Stationary RNG Guide

## Tools
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- PCalc
    - [Sun/Moon](https://gbatemp.net/threads/wip-pokecalcntr-iv-and-nature-overlay-plugin-for-sun-and-moon.460524/)
    - [Ultra Sun/Ultra Moon](https://gbatemp.net/threads/pcalc-usum-the-rng-plugin-for-ultra-sun-and-ultra-moon.489643/)

## Stationary Pokemon
  - Tapus: Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini
  - Gifts: Type: Null, Eevee Egg, Fossils, Cosmog
  - USUM: Poipole, Necrozma
  - Mystery Gift/Wondercard Pokemon
  - Starters - USUM is much more stable

## Final Screens
  - Tapus: _Tapu ko-ko-ko-kooo!!!_ / _Ta-pu-leeeh!_ / _Ta-pu-looooo_ / _Ta-pu-fiiieee!_
  - In-game gifts/Fossils/Cosmog/Mystery Gift: "You received xxx!""
    - For Mystery Gift, NPCs should be 6 if standing directly in front of the delivery man. NPCs are 4 if standing behind him.
  - Necrozma: _Linooo!_
  - Starters: SM - "Having accepted one another, you'll surely be friends for life."
    - USUM - "You chose xxx!"

![](https://imgur.com/wmpzsKN)

For Mystery Gift Pokemon, make sure to stand exactly like the image above or the timeline may be off resulting in missing your target frame.    

## Step 1: Set Up 3DSRNGTool

### In the upper right of 3DSRNGTool:
1. Input your game version and your TSV.
    - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the Shiny Charm box.

## Step 2: Create a Timeline
1. In 3DSRNGTool, make sure to input your initial seed, game version, and your TSV if you haven't already. Double check that everything is correct.
    - Initial Seed can be found by pressing `Start + Up` ingame.

2. Choose the Category and then the Pokemon you are RNGing for.

3. Check “Safe F Only”.

4. You can find the number of NPCS using PCalc.
    - After getting to the final screen for your Pokemon press `Start + Up` to bring up the window with the NPC counter.
    - If you already have it up, close it by pressing `Start + Up`, and then bring it back up again to reset the NPC counter.
    - Let the game run for approximately 30 seconds to a minute to calibrate correctly.

5. In the game, advance to the final screen for the Pokemon you are RNGing for. Input the frame you are currently on in the frame range. You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

6. Click "Calculate", and then advance to any of the frames that are listed that have a "-" in the Mark column.
    - These frames are considered Safe Frames and can be used to accurately predict the frames you can land on.

7. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frames given earlier with `Start + Select` and then slowly advance by pressing `Select` while paused.
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

3. Advance to that frame and when you land on it, Press A to obtain the Pokemon.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again.

## If you did not obtain the Pokemon you wanted

1. Find out what frame you actually landed on.
  - Click the reset button in Filters and then input the IVs of the Pokemon you got.
  - Click on Frame Range then "Calculate".
  - If there are no results double check that all info, including Initial Seed, is correct.

2. Adjust delay as necessary.
  - If the frame you got was before the frame you wanted, subtract the difference from Consider Delay.
  - If instead the frame you got was after the frame you wanted, add the difference to Consider Delay.
