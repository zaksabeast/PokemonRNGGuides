---
title: 'Wild RNG'
description: 'RNG for Pokemon encountered in the wild using Sweet Scent in FireRed/LeafGreen'
slug: 'emulator-frlg-wild'
subCategory: 'Emulator'
---

## Tools

- [VBA-rr v23.6](https://code.google.com/archive/p/vba-rerecording/downloads)
- [Lua scripts for FireRed/LeafGreen](https://pokerng.forumcommunity.net/?t=56443955)
  - Password is `allyouneedisnoob`
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- TID and SID (if going for shiny)

```
Note: If you are doing this RNG for a shiny, make sure to have set up a profile within PokeFinder with the TID and SID of the save.
```

## Step 1: Set up PokeFinder

1. Open PokeFinder and select "Wild" for Gen 3. Make sure to be on the "Generator" tab.

2. Have "Method" set to Method H-1.

```
Note: While there are other methods in FireRed/LeafGreen, H-1 is the most common and is the one recommended to use. The other methods rely on v-blank and rarely occur.
```

3. Set the "Location" to the location where the RNG will take place.
   
4. If you want a specific Pokemon you can select it in "Pokemon" after selecting its location.
   - If the Pokemon you are wanting is not in the list, or you are going for a specific encounter slot, you can instead choose the number in the "Encounter Slot" box and leave "Pokemon" at the default.
   - You can use [this site](https://sites.google.com/site/pokemonslots/gen-iii/emerald) to find a specific encounter slot.

5. "Encounter" should be set to "Grass" or "Surfing" since this guide is focusing on using Sweet Scent to start an encounter.

```
Note: For "Lead" leave it as "Any" since Cute Charm and Synchronize do not work in FireRed/LeafGreen.
```

6. Check the "Use Delay" box and input the delay for the Pokemon you are RNGing.
   - This [Google Doc](https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147) has the delays for each area.
   - Keep in mind there could still be a variation of +/- 1 delay. 

## Step 3: Finding the initial seed

1. Save the game in the location where you will RNG the Pokemon.

2. Restart the emulator.

3. Once the game is loaded, enter into the continue screen.

4. Pause the game to find your seed.

```
Note: FireRed/LeafGreen will generate different seeds every time the game loads unlike repeating seeds in dry battery Ruby and Sapphire, and Emerald. This can be used to reset for different seeds if wanted.
```

5. The initial seed will be displayed on the screen from the lua script.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_18.png?raw=true)

## Step 4: Find a target advance

1. Enter the initial seed into "Seed".

2. Enter in your target settings for the Pokemon you wish to search for (shiny, IVs, nature, etc).

   - Keep in mind that finding a shiny perfect Pokemon may take awhile to find a seed for, and then will probably have very high advances.
   - If no results are showing up, try lowering the filters.

3. Click "Generate".

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_20.png?raw=true)

In the example above, the filters are set for any shiny on Route 5.

```
Note: The initial seed can be changed by pressing B on the continue screen to play the intro again. The seed will change when pressing A to advance to the continue screen. You can repeat this process as needed to find a better seed if wanted.
```

## Step 5: RNG for the Pokemon

1. Once you have a target advance, continue into the game.

2. Advance to within a few thousand advances of the target advance.

```
Note: Teachy TV can be used to advance much, much faster. The RNG advances over 300 times faster, and so you can advance millions of frames in a few minutes.

You can advance the RNG by opening the Teachy TV in Key Items and then closing it when a few thousand away from your target advance.
```

3. Open your Trainer Card and press `A` to flip it.

   - The use of flipping the Trainer Card is to reset the delay, which becomes more off the more advances that have been done.

4. Select the Pokemon in your party with Sweet Scent and hover over the move.

5. When close to your target advance, pause the emulator and create a save state, and then advance a frame at a time to the target advance.

6. Hold `A` and unpause the emulator at the same time on your target advance.
   - If the Pokemon is not the one wanted, load the previous save state and try one advance before and/or one advance after.

If you followed all the above steps, the Pokemon should be what you wanted. Tada, you did your Gen 3 Wild RNG!

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_21.png?raw=true)

## Troubleshooting

If after trying the one advance difference above and it didn't work, you'll have to adjust for your own delay.

Find what advance you are hitting and adjust as needed.
