---
title: 'Stationary RNG'
description: 'RNG the overworld Pokemon to have 6 IVs'
slug: 'retail-sm-stationary'
subCategory: 'Custom Firmware'
---

## Tools

- A 3DS with PCalc ([PCalc Install Guide](https://www.pokemonrng.com/misc-3ds-installing-pcalc))
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

### Recomended reading

If you are wanting to RNG a Mystery Gift (or Event) Pokemon instead, follow the [Gen 7 Mystery Gift RNG guide](https://www.pokemonrng.com/retail-sm-myster-gift) instead.

If you are wanting to RNG a Pokemon in a Wormhole, follow the [USUM Wormhole RNG guide](https://www.pokemonrng.com/retail-usum-wormhole) instead.

## Final Screens

- Tapus: _Tapu ko-ko-ko-kooo!!!_ / _Ta-pu-leeeh!_ / _Ta-pu-looooo_ / _Ta-pu-fiiieee!_
- In-game gifts/Fossils/Cosmog: "You received xxx!""
- Necrozma: _Linooo!_
- Starters: SM - "Having accepted one another, you'll surely be friends for life."
  - USUM - "You chose xxx!"

## Step 1: Set Up 3DSRNGTool

1. In the upper right, input your game version and your TSV.

   - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Also in the upper right, input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the "Shiny Charm" box.

4. Make sure you are on the "Stationary RNG" tab in 3DSRNGTool. Choose the "Category" and then the Pokemon you are RNGing for.

5. If you are using a Pokemon with Synchronize in the first slot of your party, choose its nature from the dropdown list for "Synch Nature". Failure to do this if the lead Pokemon has Synchronize will result in frames not being correct.

```
Note: For gift Pokemon, Synchronize has a 100% chance of having the Pokemon obtained be the same nature as the lead Pokemon with Synchronize. If you are aiming for a specific nature, having a Pokemon with Synchronize in the first slot of your party will greatly improve your chances of finding target frames since every frame will have the nature you are wanting.

The gift Eevee egg and the move Pikachu gift are exceptions. Synchronize has no effect on their natures.
```

## Step 2 (with NPCs): Create a Timeline

Follow the [timeline guide](https://www.pokemonrng.com/retail-usum-timeline) to create a timeline and find a target frame.

## Step 3: Obtaining the wanted Pokemon

1. Once you have a correct timeline and a target frame, the next step is to actually RNG the Pokemon.

2) Advance to your target frame. When you land on it, press `A` to obtain the Pokemon or begin a battle with the Pokemon.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again.

```
Note: You can view the Pokemon's info using PCalc. Press Start + Left to bring up the Wild View window or Start + Right to bring up the Party View window. Select + Right can be used to cycle through party members with the Party View window up.
```

## Step 2 (with 0 NPCs):

1. Do not check "Blink F Only" box.

2. Advance to the final screen for the Pokemon you are wanting to RNG. Input the frame you are currently on in the frame range.

   - You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

3. Adjust filters to what you are wanting, then click "Calculate" and choose any one of the results to be your target frame. If there are no results, increase the Frame Range or restart the game to obtain a new initial seed. (Make sure to restart from the beginning of the guide if you do restart the game.)

4. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frame you want with `Start + Select` and then slowly advance by pressing `Select` while paused.

```
Note: With 0 NPCs you can use Festival Plaza to advance frames quicker. Only do this with 0 NPCs, otherwise it will mess up the timeline and cause you to miss your target frame.

Make sure to exit Festival Plaza approximately a thousand frames before your target frame to avoid accidentally missing the frame.
```

5. Advance to your target frame. When you land on it, press `A` to obtain the Pokemon or begin a battle with the Pokemon.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again.

```
Note: You can view the Pokemon's info using PCalc. Press Start + Left to bring up the Wild View window or Start + Right to bring up the Party View window. Select + Right can be used to cycle through party members with the Party View window up.
```

## If you did not obtain the Pokemon you wanted

1. Double check that all info has been inputted correctly, especially the initial seed.

2. Restart the guide from the beginning and make sure to follow _all_ instructions given. Not getting the correct Pokemon is usually a result of user error.

3. Make sure you are using the correct method depending on whether there are NPCs or not. Failure to create a Timeline when NPCs are more than 0 will result in target frames being skipped.
