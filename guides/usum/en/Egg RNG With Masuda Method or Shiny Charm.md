# Egg RNG with Masuda Method or Shiny Charm

_A relaxed RNG to get the perfect egg with or without Custom Firmware_

```
Note: With the Shiny Charm or Masuda Method, the shininess of Eggs are predetermined, so not every egg can be shiny.

Without Shiny Charm or Masuda Method, PIDs are not generated until the egg is picked up, so every egg can be shiny.
```

## Tools

- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- A 3DS with CFW (Custom Firmware) (Optional)
   - https://3ds.hacks.guide/ has instructions for installing CFW
- PCalc (Optional)
  - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/pcalc-usum.zip)
  - [Sun/Moon](https://pokemonrng.com/downloads/pcalc/pcalc-sm.zip)

## Step 1: Set Up 3DSRNGTool

### In the upper right of 3DSRNGTool:

1. Input your game version and your TSV.

   - If you are using PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says YOUR TSV.
   - If you are not using PCalc, there are other ways to find your TSV. Additional Notes at the end has alternative ways of finding your TSV.

2. Initial seed does not matter as that will not be used.
3. Check Shiny Charm box if you have the Shiny Charm.

```
If you are wanting to RNG the egg to have a specific ESV that is not yours, click on Edit TSV List and input TSV(s). Then check the Other TSVs Shiny box.

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
```

### For Parents Information:

- Fill it out according to the parents you are using.
  - If the parents are of different languages make sure to check Masuda Method box.

```
Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
```

If using a Ditto and genderless Pokemon, the Ditto will be the female.

Note about breeding for Rockruff:

- If its ability is Own Tempo, then the ability can either be 1, 2, or H, it won’t make a difference.
- If its ability is not Own Tempo then its abilities are [1] Keen Eye, [2] Vital Spirit, or [H] Steadfast.

### For Current Status

1. For the Current Status input the current egg seeds of your game.

   - If you are using PCalc, press `Start + Down` ingame to bring up the egg seed window and input them into 3DSRNGTool.
   - If you are not using PCalc, see the Additional Notes at the end for ways to find your egg seeds if you do not already know them.

2. Do not check the Main RNG Egg (PID) box.

3. For Filters, input the info for the egg you are wanting.

4. Check the Shiny Only box if you are wanting a shiny egg.

5. Input 0 as starting frame.

6. Then click Calculate.

## Step 2: Finding a Target Frame

You can choose any of the given frames, but lower frames are generally better due to less egg accepts/rejects.

1. Right click on the row for the one you want and click Set as Target Frame.

2. Then click on Shortest Path and Calculate.

   - This will automatically calculate the shortest path for least number of accepts and rejects for your target egg.

3. The very last egg you accept will be your target egg.

```
Note: Make sure you go in order from top to bottom for accepting and rejecting eggs.

Doing it out of order will mess you up.
```

- If you are using PCalc, you can check which frame you are on by looking at your egg seeds ingame (`Start + Down` to bring up menu).

- If you are wanting a specific shiny egg, the frames will more than likely be very high and require accepting/rejecting a lot of eggs.
  - This is due to the ESVs of the eggs being predetermined.
  - The only way to change this is to not have the Shiny Charm and to not use Masuda Method.

## Additional Notes

- To find your TSV, you can easily check it with PCalc.
  - Press `Start + Up` to bring up the Game View window.
  - Your TSV is where it says `YOUR TSV`.
- You can also check if you have the Shiny Charm and/or are using Masuda Method with PCalc.
  - Press `Start + Down` to bring up the Egg Info window.
  - All info for the parents are located there along with whether or not you have the Shiny Charm.
- If you are not using PCalc, there are other ways to find your TSV.
  - Use homebrew or CFW with a save manager such as Checkpoint or JKSM to extract the save file. View it in PKHeX and hover over TID and SID to find your TSV.
  - Ask someone else to find it for you. /r/SVEXchange is one place this can be done.
- If you are not using PCalc and do not know your egg seeds there are methods to find them.
  - If you have already used the daycare and accepted or rejected eggs and do not have access to homebrew or cfw, then you will have to do the 127 Magikarp method to find your egg seeds.
  - If you have access to homebrew or cfw you can use PKHeX to view your egg seeds after using a save manager such as Checkpoint or JKSM to extract the save file.
  - If you have not used the daycare and do not have access to homebrew or cfw, you can use the 8 egg method to find your egg seeds. A video guide can be found [here](https://www.youtube.com/watch?v=s9gAofeULLA).
