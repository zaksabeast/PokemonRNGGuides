---
title: 'Wild RNG'
description: 'RNG for wild Pokemon using Honey in Ultra Sun and Ultra Moon'
slug: 'retail-usum-wild'
subCategory: 'Custom Firmware'
---

## Tools

- A 3DS with PCalc ([PCalc Install Guide](https://www.pokemonrng.com/misc-3ds-installing-pcalc))
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

```
Note: In the game you will have to use "honey" to initiate the wild encounter.

You can get the "honey" item in any store after clearing three trials.
```

Before continuing with the guide it is recommended to be in the place you wish to RNG.

## Step 1: Set Up 3DSRNGTool

1. In the upper right, input your game version and your TSV.
   - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.
2. Also in the upper right, input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.
3. If you have the Shiny Charm check the "Shiny Charm" box.
4. Choose the "Wild" tab then the Category "Normal Wilds" or "UBs" if going for an Ultra Beast. You can choose "Location" and then from the "Slot" dropdown the Pokemon you are wanting to RNG to have its info automatically filled in for you.
5. If you are using a Pokemon with Synchronize in the first slot of your party, choose its nature from the dropdown list for "Synch Nature". Failure to do this if the lead Pokemon has Synchronize will result in the RNG not being predicted correctly.

```
Note: For wild Pokemon, Synchronize has a 50% chance of having the Pokemon you encounter be the same nature as the lead Pokemon with Synchronize. If you are aiming for a specific nature, having a Pokemon with Synchronize in the first slot of your party will greatly improve your chances of finding target frames.
```

6. Check "Day" or "Night" depending on which it is in your game. If it is raining in the game, also check the "Raining" box. Not checking the "Raining" box when it is raining will result in the timeline always being off because rain affects the RNG.

## Step 2 (with NPCs) Create a Timeline:

```
Note: If you are in an area with 0 NPCs, there will not be a "Safe F Only" option. Do not check the "Blink F Only" box. Skip to the 0 NPC section instead. If there are NPCs, make sure to follow the rest of this section.
```

1. Follow the [timeline guide](https://www.pokemonrng.com/retail-usum-timeline) to create a timeline and find a target frame.
   - Before making the timeline, open the in game menu with `X` and have the cursor hover over the bag.

## Step 2 (with 0 NPCs):

1. Do not check "Blink F Only" box.
2. Open the in game menu with `X` and have the cursor hover over the bag. Input the frame you are currently on in the frame range.
   - You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.
3. Adjust filters to what you are wanting, then click "Calculate" and choose any one of the results you want. If there are no results, increase the Frame Range or restart the game to obtain a new initial seed.
   - Make sure to restart from the beginning of the guide if you do restart the game.

```
Note: With 0 NPCs you can use Festival Plaza to advance frames quicker. Only do this with 0 NPCs, otherwise it will mess up the timeline and cause you to miss your target frame.

Make sure to exit Festival Plaza approximately a thousand frames before your target frame to avoid accidentally missing the frame.
```

## Step 3: Obtaining the wanted Pokemon

Once you have a correct timeline (if there are NPCs) and a target frame, the next step is to actually RNG the Pokemon.

1. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frame you want with `Start + Select` and then slowly advance by pressing `Select` while paused.
2. Advance to the target frame and when you land on it, press `A` to open the bag.
   - There will be some frames advanced when opening the bag. The delay in opening the bag has already been accounted for in 3DSRNGTool with the "Delay" box, so you do not need to worry about this.
3. Choose to use "Honey" and then wait for the animation to finish and initiate the battle.

Congrats! You should now have the Pokemon you wanted. If not, you may need to change the correction value. There is a section at the end of this guide explaining how to do this.

```
Note: You can view the wild Pokemon's info using PCalc. Press Start + Left to bring up the Wild View window.
```

## Adjusting correction

```
Double check that all info has been input correctly, especially the initial seed.

Make sure you are using the correct method depending on whether there are NPCs or not. Failure to create a Timeline when NPCs are more than 0 will result in target frames being skipped.
```

If after following all instructions correctly the Pokemon is not the one you wanted, then you need to adjust the correction value in 3DSRNGTool. The correction value is the amount of frames consumed in order to load the map, and this value changes depending on where your character is standing in the overworld.

1. Set the "Target Frame" to the target frame you were aiming for.
2. Reset filters by clicking on the cog icon in "Filters".
3. In the "Slots" box change it to the Pokemon you encountered in the battle.
4. Change the "Nature" to the Pokemon's nature.
5. Click "Search" and look around the target frame for a frame matching the filters given.
   - The IVs will more than likely not match, that is because the correction is not set to the right value.
6. Adjust the correction value until the IVs match the Pokemon encountered. You can do this by increasing and/or decreasing the value by one and clicking on "Search" to generate new results.

Once you have found the correction value that matches with the Pokemon encountered, the value will stay the same for future RNG attempts provided you do not move your character. Moving to a different spot may result in having to adjust the correction value again.
