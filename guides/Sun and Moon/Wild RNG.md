---
title: 'Wild RNG'
description: 'For those times when egg RNG is too boring for you'
slug: 'retail-sm-wild'
subCategory: 'Custom Firmware'
---

## Tools

- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- PCalc
  - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/pcalc-usum.zip)
  - [Sun/Moon](https://pokemonrng.com/downloads/pcalc/pcalc-sm.zip)

```
Note: In the game you will have to use "honey" to initiate the wild encounter.

You can get the "honey" item in any store after clearing three trials.
```

Before continuing with the guide it is recommended to be in the place you wish to RNG.

For Sun/Moon games, here is a list of [encounter slots and 0 NPC or the least number of NPC spots](http://pokerng.forumcommunity.net/?t=59613020).

## Step 1: Set Up 3DSRNGTool

1. In the upper right, input your game version and your TSV.

   - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Also in the upper right, input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the "Shiny Charm" box.

4. Choose the "Wild" tab then the Category "Normal Wilds" or "UBs" if going for an Ultra Beast. You can choose "Location" and then from the "Slot" dropdown the Pokemon you are wanting to RNG to have its info automatically filled in for you.

5. If you are using a Pokemon with Synchronize in the first slot of your party, choose its nature from the dropdown list for "Synch Nature". Failure to do this if the lead Pokemon has Synchronize will result in frames not being correct.

```
Note: For wild Pokemon, Synchronize has a 50% chance of having the Pokemon you encounter be the same nature as the lead Pokemon with Synchronize. If you are aiming for a specific nature, having a Pokemon with Synchronize in the first slot of your party will greatly improve your chances of finding target frames.
```

6. Check "Day" or "Night" depending on which it is in your game. If it is raining in the game, also check the "Raining" box. Not checking the "Raining" box when it is raining will result in timeline always being off because rain affects the RNG.

## Step 2 (with NPCs) Create a Timeline:

```
Note: If you are in an area with 0 NPCs, there will not be a "Safe F Only" option. Do not check the "Blink F Only" box. Skip to the 0 NPC section instead. If there are NPCs, make sure to follow the rest of this section.
```

1. Follow the [timeline guide](https://www.pokemonrng.com/retail-usum-timeline
) to create a timeline and find a target frame.
   - Before making the timeline, open the in game menu with `X` and have the cursor hover over the bag.

## Step 3: Obtaining the wanted Pokemon

1. Once you have a correct timeline and a target frame, the next step is to actually RNG the Pokemon.

2. Advance to that frame and when you land on it, Press `A` to open the bag. Choose to use "Honey" and then wait for the animation to finish and initiate the battle.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game or run away from the battle, and try again.

```
Note: You can view the wild Pokemon's info using PCalc. Press Start + Left to bring up the Wild View window.
```

## Step 2 (with 0 NPCs):

1. Do not check "Blink F Only" box.

2. Open the in game menu with `X` and have the cursor hover over the bag. Input the frame you are currently on in the frame range.

   - You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

3. Adjust filters to what you are wanting, then click "Calculate" and choose any one of the results you want. If there are no results, increase the Frame Range or restart the game to obtain a new initial seed. (Make sure to restart from the beginning of the guide if you do restart the game.)

4. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frame you want with `Start + Select` and then slowly advance by pressing `Select` while paused.

```
Note: With 0 NPCs you can use Festival Plaza to advance frames quicker. Only do this with 0 NPCs, otherwise it will mess up the timeline and cause you to miss your target frame.

Make sure to exit Festival Plaza approximately a thousand frames before your target frame to avoid accidentally missing the frame.
```

5. Advance to that frame and when you land on it, Press `A` to open the bag. Choose to use "Honey" and then wait for the animation to finish and initiate the battle.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game or run away from the battle, and try again.

```
Note: You can view the wild Pokemon's info using PCalc. Press Start + Left to bring up the Wild View window.
```

## If you did not obtain the Pokemon you wanted

1. Double check that all info has been inputted correctly, especially the initial seed.

2. Restart the guide from the beginning and make sure to follow _all_ instructions given. Not getting the correct Pokemon is usually a result of user error.

3. Make sure you are using the correct method depending on whether there are NPCs or not. Failure to create a Timeline when NPCs are more than 0 will result in target frames being skipped.
