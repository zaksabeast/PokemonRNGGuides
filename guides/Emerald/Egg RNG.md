---
title: 'Emerald Egg RNG'
description: 'RNG Eggs in Emerald'
slug: 'emulator-emerald-egg'
subCategory: 'Emulator'
---

## Requirements:

- [VBA-RR](https://code.google.com/archive/p/vba-rerecording/downloads)
- [Lua Scripts](https://pokerng.forumcommunity.net/?t=56443955&p=396434940)
  - Password is `allyouneedisnoob`.
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- The parent Pokemon IVs and their compatibility (Talk to the daycare man for compatibility)
- TID and SID if you're going for a shiny. These are not necessary if you just want IVs/Nature.

## Intro

Eggs in Emerald are generated in two parts. The PID of the Pokemon is generated when the player takes a step that causes an egg to be generated at the daycare. The IVs of the Pokemon are generated when collecting the egg from the daycare man. As a result, there are two parts to RNGing a perfect shiny egg.

## Setup

1. Deposit both Pokemon into the daycare.

   - Take note of the order you deposit them in.
   - The first parent deposited will be Parent A, and the second parent deposited will be Parent B

2. Talk to the daycare man to determine their compatibility.

   - This will be needed later to input into PokeFinder.

3. Go back inside the daycare and take steps until the lua script displays `FE` for the step counter.
   - Make sure to do the steps inside the daycare and not outside of it.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_13.png?raw=true)

3. Create a savestate here before continuining on.

## PokeFinder Setup

1. Open PokeFinder and click on "Gen 3 Egg". Make sure to be on the Emerald tab.

2. You can set "Max Results" to however high you are willing to wait.

   - For a shiny PID it shouldn't be too hard to find a result within a few minutes wait though.

3. Set "Method" to PID, since the PID of the egg will be RNG'd first.

## Redraws

For Emerald egg RNG, redraws of the game's graphics can be done to hit specific PIDs.

To do a single redraw:

1. Open the menu
2. Open the Pokedex
3. Back out of the Pokedex into the menu

Open and close the Pokedex for as many redraws as needed for the target PID.

## Calibration

Before RNGing for your desired egg, a calibration must be done.

1. Restart the emulator and pause when the save has loaded.

2. Take note of the RNG Frame displayed by the lua script and create a save state.

3. Hold down the directional button to take a step while unpausing the emulator.

   - If an egg is generated, continue to the next step.
   - If no egg is generated, reload the previous save state and advance a frame (CTRL + N). Take another step to try to generate an egg. Repeat as needed.

4. Choose the nature of the egg generated in the dropdown for Nature.

5. Set redraws to 0 in PokeFinder.

6. Click "Generate" in PokeFinder and find the PID of the generated egg in the Advances column by looking around the RNG Frame you took a step on.
   - If the PID cannot be found, change the calibration by 1 and generate new results.
   - Repeat as needed until a match is found.
   - Calibration will be between 17 and 21.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_16.png?raw=true)

In the example above, the calibration is 20. The frame was found after selecting Timid from the nature dropdown and searching for the PID of the egg.

The calibration will always be the same for this save, so you can use the same calibration for future egg RNGs.

## Part 1: RNGing for PID

Now that you have found your calibration, it is time to RNG an egg.

1. Set the filters to what you want.

   - For this part only Ability, Gender, Nature, and Shiny can be RNG'd.
   - Make sure the Gender Ratio is set correctly for the Pokemon you are RNGing.

2. Set the redraws to what you want as well.

   - Adjusting redraws can give different results for more possibilities if needed.

3. Generate results and look for a target advance.

   - You can adjust redraws and the filters as needed to find a target advance.

4. Reset the emulator and do the redraws as needed.

5. Create a save state when you get close to the target advance.

To be able to hit your target advance, the delay must be taken into account. The next section explains how to do this.

### Finding your delay for PID

1. Take a step on your target advance.

   - If no egg is generated, go back to the previous save state, advance one frame, and take another step. Repeat as needed.

2. Find what advance you hit in PokeFinder. You can do this by setting the filters to the egg you got and then looking for the PID of the egg.

3. Find your delay using `Target Advance - Advance Hit = Delay`.

4. Add the delay to your target advance to get the RNG Frame you need to take a step on (`Target Advance + Delay = RNG Frame to take a step on`).

5. Go back to the previous save state.

6. Take a step on the RNG Frame calculated from the above steps.

You should now have the desired PID.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_17.png?raw=true)

```
Note: If the PID does not match the desired PID, check that everything is correct in PokeFinder, and follow the steps in the last section to create a new save state.
```

## Part 2: RNGing for IVs

1. Go outside and stand by the daycare man. Save the game.

2. Input the parent's IVs into PokeFinder.

   - Make sure the first Pokemon you deposited is Parent A, and the second Pokemon deposited is Parent B.

3. Change the Method to Normal.

4. Set the IVs to be what you want.

5. Generate results and look for a target advance.

6. Restart the emulator.

7. Accept the egg from the daycare man, and pause the emulator at the last dialogue. ("Take good care of it.")

8. Make a save state.

Again, delay will have to be taken into account.

### Finding your delay for IVs

1. Advance to the target advance, pause, hold A, and unpause.

2. Find what advance you hit in PokeFinder. You can do this by setting the IV filters for the egg you got and then looking for the advance with matching IVs.

3. Find your delay using `Target Advance - Advance Hit = Delay`.

4. Subtract the delay from your target advance to know what RNG Frame to press A. (`Target Advance - Delay = RNG Frame to press A on`)

5. Go back to the previous save state.

6. Take a step on the RNG Frame calculated from the above steps.

You should now have the desired IVs.

If you do not have the desired IVs, check that everything is correct in PokeFinder and that the order of parents is not swapped.
