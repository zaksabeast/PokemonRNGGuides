# Gen 7 Egg RNG Guide without Masuda and/or Shiny Charm

```
Note: You cannot have the Shiny Charm or parents of different languages for this method to work. Having the Shiny Charm, or parents of different languages, causes the PIDs (or ESVs) of eggs to be predetermined and that cannot be changed. However, if you do not have the Shiny Charm, RNGing without using Masuda Method is much faster because the PID is not generated until you pick up the egg. This means that the eggs are not predetermined as with using Masuda Method or having the Shiny Charm.
```

## How is this different than using Masuda Method and/or Shiny Charm different?
When using Masuda Method and/or Shiny Charm, the ESVs (and PIDs) of every egg are already set in a predetermined order that will not change. The only way to reach the frames you want is to accept and/or reject however many eggs it takes to reach those frames. However, without using Masuda Method and without having the Shiny Charm, the ESVs (and PIDs) are not generated until the moment you accept the egg. This means ANY egg frame can be ANY ESV you want it to be.


## Tools
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- PCalc
    - [Sun/Moon](https://gbatemp.net/threads/wip-pokecalcntr-iv-and-nature-overlay-plugin-for-sun-and-moon.460524/)
    - [Ultra Sun/Ultra Moon](https://gbatemp.net/threads/pcalc-usum-the-rng-plugin-for-ultra-sun-and-ultra-moon.489643/)

## Step 1: Set Up 3DSRNGTool

### In the upper right of 3DSRNGTool:
1. Input your game version and your TSV.
    - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.
3. The Shiny Charm box must be unchecked. If you have the Shiny Charm you cannot use this method.

```
If you are wanting to RNG the egg to have a specific ESV that is not yours, click on Edit TSV List and input TSV(s). Then check the Other TSVs Shiny box.

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
```
### For Parents Information:
- Fill it out according to the parents you are using.
    - Make sure the Masuda Method box is not checked. If the parents are of different languages you cannot use this method.

```
Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
```

If using a Ditto and genderless Pokemon, the Ditto will be the female.


Note about breeding for Rockruff:
  - If its ability is Own Tempo, then the ability can either be 1, 2, or H, it won’t make a difference.
  - If its ability is not Own Tempo then its abilities are [1] Keen Eye, [2] Vital Spirit, or [H] Steadfast.

### For Current Status
1. For the Current Status input the current egg seeds of your game.
    - Using PCalc, press `Start + Down` ingame to bring up the egg seed window and input them into 3DSRNGTool.

2. Do not check the Main RNG Egg (PID) box. We will be doing this later.

3. For Filters, input the info for the egg you are wanting.

4. Do not check the Shiny Only box even if you are wanting a shiny egg. Shininess will be RNG'd separately.

5. Input 0 as starting frame.

6. Then click "Calculate".

## Step 2: Finding a Target Frame
You can choose any of the given frames, but lower frames are generally better due to less egg accepts/rejects.

1. Right click on the row for the one you want and click "Set as Target Frame".

2. Then click on "Shortest Path" and "Calculate".
    - This will automatically calculate the shortest path for least number of accepts and rejects for your target egg.

3. The very last egg you are going to accept will be your target egg. Do NOT accept this egg!

4. Once you are to your target egg seeds, continue with the rest of the guide.

```
Note: Make sure you go in order from top to bottom for accepting and rejecting eggs.

Doing it out of order will mess you up.
```
```
With PCalc you can check which frame you are on by looking at your egg seeds ingame (`Start + Down` to bring up menu).
```

## Step 3: RNGing the ESV (or PID) of the egg

1. Once you have the egg you want to be shiny ready to pick up from the daycare helper, save the game in case you mess up and need to start over for the next part.

2. Stand directly in front of the helper and start the dialogue to accept the egg. Then press `Start + Up` to bring up the Game View window ingame.

3. When you get to the choice of “Yes” or “No”, pause the game (`Start + Select`).

## Step 3(a): Determine number of NPCs and Create a Timeline

1. In 3DSRNGTool, make sure to input your initial seed, game version, and your TSV if you haven't already. Double check that everything is correct.
    - Initial Seed can be found by pressing `Start + Up` ingame.
    - If you are wanting to RNG the egg to have a specific ESV that is not yours, click on Edit TSV List and input TSV(s). Then check the Other TSVs Shiny box.

2. Make sure that the Main RNG Egg (PID) box is checked.

3. Click the reset button in Filters.

4. Check “Safe F Only”.

5. You can find the number of NPCS using PCalc.
    - After initiating the dialogue with the daycare helper press `Start + Up` to bring up the window with the NPC counter.
    - If you already have it up, close it by pressing `Start + Up`, and then bring it back up again to reset the NPC counter.
    - Let the game run for approximately 30 seconds to a minute to calibrate correctly.

6. Input the frame you are currently on in the frame range. You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

7. Click "Calculate", and then advance to any of the frames that are listed that have a "-" in the Mark column.
    - These frames are considered Safe Frames and can be used to accurately predict the frames you can land on.

8. You can advance frames by pressing `Start` to unpause the game, then pausing again with `Start + Select` when close and slowly advance by pressing Select while paused.
    - Which frame you land on does not matter, just as long as it is one listed.

## Step 3(b): Verifying Timeline

1. Input your current frame after reaching a safe frame and then check “Create Timeline” and "Calculate".
  - Once you have landed on a safe frame and have used that frame to create a Timeline, do not change it. Otherwise the Timeline will be off and you'll have to restart from Step 3(a).

2. Press `Select` on your 3DS to advance several times and compare to what the next frames are given in 3DSRNGTool.
    - If they match then you have the correct number of NPCs.
    - If they do not match, restart from beginning of Step 3(a).

## Step 4: Collecting the shiny egg

1. Once you have determined the number of NPCs, the next step is to RNG the egg to match the TSV you are wanting.

2. Check Shiny Only box, then click "Calculate" and choose any one of the results. The first frame is usually preferred due to less waiting time.

3. Advance to that frame and when you land on it, Press A to accept egg.

Congrats! You should now have the egg you wanted with the TSV you RNG’d for. If not, you can reset the game if you saved before picking up the egg and try again.
