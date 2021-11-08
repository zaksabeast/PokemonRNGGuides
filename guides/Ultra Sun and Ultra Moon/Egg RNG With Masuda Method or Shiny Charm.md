---
title: 'Egg RNG Guide with Masuda and/or Shiny Charm'
description: 'RNG for eggs using Masuda Method and/or with the Shiny Charm'
slug: 'retail-usum-egg-mmsc'
subCategory: 'General'
---

## How is this different than not using the Masuda Method and/or Shiny Charm?

When using the Masuda Method and/or Shiny Charm, the ESVs of every egg are already set in a predetermined order that will not change. The only way to reach the frames you want is to accept and/or reject however many eggs it takes to reach those frames. However, without using the Masuda Method and without having the Shiny Charm, the ESVs are not generated until the moment you accept the egg. This means ANY egg frame can be ANY ESV you want it to be.

```Note: ESV is short for Egg Shiny Value. This is what determines if an egg will hatch shiny or not.
If an ESV matches a TSV (Trainer Shiny Value) then the egg will hatch shiny.
```

## Tools

- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- Optional: A 3DS with PCalc ([PCalc Install Guide](https://www.pokemonrng.com/misc-3ds-installing-pcalc))

## Step 1: Set Up 3DSRNGTool

### In the upper right of 3DSRNGTool:

1. Input your game version and your TSV.

   - If you are using PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says YOUR TSV.
   - If you are not using PCalc, there are other ways to find your TSV. Additional Notes at the end has alternative ways of finding your TSV.

2. The initial seed does not matter as that will not be used.

3. Check the "Shiny Charm" box if you have the Shiny Charm.

```
If you are wanting to RNG the egg to have a specific ESV that is not yours, click on Edit TSV List and input TSV(s). Then check the "Other TSVs Shiny" box.

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
```

### For parents information:

- Fill it out according to the parents you are using.
  - If the parents are of different languages make sure to check the "Masuda Method" box.

```
Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
```

If using a Ditto and genderless Pokemon, the Ditto will be the female.
Otherwise, the Ditto will be the opposite gender of the other parent.

Note about breeding for Rockruff:

- If its ability is Own Tempo, then the ability can either be 1, 2, or H, it won’t make a difference.
- If its ability is not Own Tempo then its abilities are [1] Keen Eye, [2] Vital Spirit, or [H] Steadfast.

### For current status

1. For the "Current Status" section in 3DSRNGTool input the current egg seeds of your game.

   - If you are using PCalc, press `Start + Down` in-game to bring up the egg seed window and input them into 3DSRNGTool.
   - If you are not using PCalc, see the Additional Notes at the end for ways to find your egg seeds if you do not already know them.

2. Do not check the "Main RNG Egg (PID)" box.

3. For "Filters", input the info for the egg you are wanting.

4. Check the "Shiny Only" box if you are wanting a shiny egg.

5. Input "0" as the starting frame.

6. Click "Calculate".

## Step 2: Finding a Target Frame

You can choose any of the given frames, but lower frames are generally better due to less egg accepts/rejects.

1. Right click on the row for the one you want and click "Set as Target Frame".

2. Click on "Shortest Path" and "Calculate".

   - This will automatically calculate the shortest path for least number of accepts and rejects for your target egg.

3. Accept and/or reject the eggs in the order given from top to bottom. Doing the accepts and/or rejects out of order will result in the wrong egg seeds.

4. The very last egg you accept will be your target egg.

- If you are using PCalc you can check which egg frame you are on by looking at your egg seeds in-game (`Start + Down` to bring up the menu).

- If you are wanting a specific shiny egg the frames will more than likely be very high and require accepting/rejecting a lot of eggs.
  - This is due to the ESVs of the eggs being predetermined.
  - The only way to change this is to not have the Shiny Charm and to not use the Masuda Method.

## Additional Notes

- To find your TSV, you can easily check it with PCalc.

  - Press `Start + Up` to bring up the Game View window.
  - Your TSV is where it says `YOUR TSV`.

- You can also check if you have the Shiny Charm and/or are using Masuda Method with PCalc.

  - Press `Start + Down` to bring up the Egg Info window.
  - All info for the parents is located there along with whether or not you have the Shiny Charm.

- If you are not using PCalc there are other ways to find your TSV.

  - Use Homebrew or CFW with a save manager such as Checkpoint to extract the save file. You can then view the save file in PKHeX and hover over TID and SID to find your TSV.
  - Ask someone else to find it for you. /r/SVEXchange is one place this can be done.

- If you are not using PCalc and do not know your egg seeds there are methods to find them.
  - If you have already used the daycare by having accepted or rejected eggs, and do not wish to use Homebrew or CFW, then you will have to do the [127 Magikarp method](https://www.pokemonrng.com/retail-usum-egg-seed-no-cfw) to find your egg seeds.
  - If you have not used the daycare and do not wish to use Homebrew or CFW, you can use the [8 egg method](https://www.pokemonrng.com/retail-usum-egg-seed-no-cfw) to find your egg seeds.
  - If you have access to Homebrew or CFW you can use PKHeX to view your egg seeds after using a save manager such as Checkpoint to extract the save file.
