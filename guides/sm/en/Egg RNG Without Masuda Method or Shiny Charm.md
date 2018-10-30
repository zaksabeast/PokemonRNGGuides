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
    - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/pcalc-usum.zip)
    - [Sun/Moon](https://pokemonrng.com/downloads/pcalc/pcalc-sm.zip)

## Step 1: Set Up 3DSRNGTool

### In the upper right of 3DSRNGTool:
1. Input your game version and your TSV.
    - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.
3. The "Shiny Charm" box must be unchecked. If you have the Shiny Charm you cannot use this method.

```
If you are wanting to RNG the egg to have a specific ESV that is not yours, click on "Edit TSV List" and input TSV(s).

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
```

### For Parents Information:
- Fill it out according to the parents you are using.
    - Make sure the "Masuda Method" box is not checked. If the parents are of different languages you cannot use this method.
    - Double check that the parents are indeed of the same language. Checking this now will save you from wasting time later.

```
Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
```

If using a Ditto and genderless Pokemon, the Ditto will be the female.
Otherwise the Ditto will be the opposite gender of the other parent.


Note about breeding for Rockruff:
  - If its ability is Own Tempo, then the ability can either be 1, 2, or H, it won’t make a difference.
  - If its ability is not Own Tempo then its abilities are [1] Keen Eye, [2] Vital Spirit, or [H] Steadfast.

### For Current Status
1. For the "Current Status" input the current egg seeds of your game.
    - Using PCalc, press `Start + Down` ingame to bring up the egg seed window and input them into 3DSRNGTool.

2. Do not check the "Main RNG Egg (PID)" box. We will be doing this later.

3. For "Filters", input the info for the egg you are wanting.

4. Do not check the "Shiny Only" box even if you are wanting a shiny egg. Shininess will be RNG'd separately.

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
With PCalc you can check which frame you are on by looking at your egg seeds ingame (Start + Down to bring up menu).
```

## Step 3: RNGing the ESV (or PID) of the egg

1. Once you have the egg you want to be shiny ready to pick up from the daycare helper, save the game in case you mess up and need to start over for the next part.

2. Stand directly in front of the helper and start the dialogue to accept the egg. 

3. When you get to the choice of “Yes” or “No”, press `Start + Up` to bring up the Game View window ingame, and then pause the game (`Start + Select`).
    - If the Game View window is already open, close and open it again when at the "Yes" or "No" selection to reset NPC counter.

4. Follow the steps below to create a timeline to obtain the ESV you want.
    - Check the "Main RNG Egg (PID)" box in 3DSRNGTool under "Current Status". 
    - Afterwards reset "Filters" by clicking on the gear icon.
    - Then follow the [timeline guide](https://pokemonrng.com/guides/sm/en/Timeline%20Guide.md) to create a timeline.
    - Creating a timeline is necessary to know what frames you can actually land on due to NPC influence on frames.

5. After making a timeline you can now search for a target frame that you are able to land on.
    - If you are wanting to RNG the egg to have a specific ESV that is not yours, click on "Edit TSV List", input TSV(s), and check the "Other TSVs Shiny" box.
    - Check the "Shiny Only" box.
    - Then "Calculate" to find frames that will give the ESV(s) you want.
    - Choose any of the blue highlighted frames (lower frames are better because less waiting time).

6. Advance to that frame and when you land on it, Press `A` to accept egg.

Congrats! You should now have the egg you wanted with the TSV you RNG’d for. If not, you can reset the game if you saved before picking up the egg and try again.

```
Tip: You can use PCalc to check the egg's info. Press Start + Left to bring up Party View and then Select + Right to cycle through the different slots.
```
