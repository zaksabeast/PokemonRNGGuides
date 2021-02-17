---
title: 'Emerald Egg RNG'
description: 'RNG Eggs in Emerald'
slug: 'emulator-emerald-egg'
subCategory: 'Emulator'
---

### Requirements:

- [VBA-RR](https://code.google.com/archive/p/vba-rerecording/downloads)
- [Lua Scripts](https://pokerng.forumcommunity.net/?t=56443955&p=396434940)
    - Password is `allyouneedisnoob`.
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- Parent's IVs and their compatibility (Can talk to the daycare man for compatibility.)
- TID and SID (if going for shiny)

### Intro

Eggs in Emerald are generated in two parts. The PID of the Pokemon is generated when taking a step to generate an egg at the daycare. The IVs of the Pokemon are generated when collecting the egg from the daycare man. As a result, there are two parts to RNGing a perfect shiny egg.

### Setup

1. Deposit both Pokemon into the daycare.
    - Take note of the order you deposit them in.
    - First parent deposited will be Parent A, and second parent deposited will be Parent B.

2. Talk to the daycare man to determine their compatibility.

3. Go back inside the daycare and take steps until the lua script displays `FE` for the step counter.
    - Make sure to do the steps inside the daycare and not outside of it.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_13.png?raw=true)

3. Create a savestate here before continuining on.

### PokeFinder Setup

1. Open PokeFinder and click on Gen 3 Egg. Make sure to be on the Emerald tab.

2. You can set Max Results to however high you are willing to wait.
    - For a shiny PID frame, it shouldn't be too hard to find a frame within a few minutes wait though.

3. Make sure Method is set to PID. This is for RNGing the PID of the egg first. IVs will be RNG'd separately later.

Calibration and Redraw sections will be explained below to know what to fill out for those.

### Redraws

For Emerald egg RNG, redraws can be done to hit specific frames. 

- To do a redraw, open the menu, then open the Pokedex and back out of it. 
- This is one redraw.
- Open and close the Pokedex for as many redraws as needed for the target frame.

For PokeFinder you can set the redraws to be whatever you would like, though keep in mind if you will be able to do that many redraws before the target frame is passed.

### Calibration

Before RNGing for your desired egg, a calibration must be done.

1. Restart the emulator and pause when ready to take a step in-game. 
    - Take note of what frame you are on and create a save state.

2. Hold down the directional button to take a step while unpausing the emulator.
    - If an egg is generated, continue to the next step.
    - If no egg is generated, reload the previous save state and advance a frame. Take another step to try to generate an egg. Repeat as needed.

3. Choose the nature of the egg generated in the dropdown for Nature. 

4. Set redraws to 0. (This is for finding your calibration only since no redraws have been done.)

5. Click on generate and look around the frame you were on when taking the step for a match to the PID of the egg.
    - If the PID cannot be found, change the calibration by 1 and generate new results.
    - Repeat as needed until a match is found.
    - Calibration will be between 17 and 21.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_14.png?raw=true)

In the example above, the calibration is 20. The frame was found after selecting Mild from the nature dropdown and searching for the PID of the egg.

Now that you know the calibration it won't change for this save. You can use the same calibration for future egg RNGs.

### Part 1: RNGing for PID

Now that you have found your calibration, it is time to RNG an egg.

1. Set the filters to what you want.
    - For this part only Ability, Gender, Nature, and Shiny can be RNG'd.
    - Make sure the Gender Ratio is set correctly for the Pokemon you are RNGing.

2. Set Redraws to what you want as well.

3. Generate results and look for a target frame.
    - You can adjust redraws and the filters as needed to find a target frame.

4. Reset the emulator and do the redraws as needed. 

5. Create a save state when near the target frame.

To be able to hit your target frame, delay must be taken into account. The next section explains how to do this.

#### Finding your delay for PID

1. Take a step on your target frame.
    - If no egg is generated, go back to the previous save state, advance one frame, and take another step. Repeat as needed.

2. Find what frame you hit in PokeFinder. You can do this by setting the filters to the egg you got and then looking for the PID of the egg.

```Target Frame - Frame Hit = Delay```

Using the above formula you can then determine what your delay is. You will need to then add the delay you got from your target frame.

```Target Frame + Delay = Frame to take a step on```

Go back to the previous save state, and then take a step on the frame calculated from the above steps. You should now have the desired PID.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_15.png?raw=true)

```Note: If the PID does not match the desired PID, check that everything is correct in PokeFinder, and that the correct number of redraws have been done before taking a step.```

### Part 2: RNGing for IVs

1. Go outside and stand by the daycare man. Save the game.

2. Input the parent's IVs into PokeFinder.
    - Make sure the first Pokemon you deposited is Parent A, and the second Pokemon deposited is Parent B.

3. Change the Method to Normal.

4. Set the IVs to be what you want.

5. Generate frames and look for a target frame.

6. Restart the emulator and talk to the daycare man. Accept the egg, and pause the emulator at the last dialogue ("Take good care of it."). Create a save state here.

Again, delay will have to be taken into account.

#### Finding your delay for IVs

1. Advance to the target frame, pause, hold A and unpause.

2. Find what frame you hit in PokeFinder. You can do this by setting the IV filters for the egg you got and then looking for the matching frame.

```Target Frame - Frame Hit = Delay```

Using the above formula you can then determine what your delay is. You will need to then subtract the delay you got from your target frame.

```Target Frame - Delay = Frame to press A```

Go back to the previous save state and advance to the frame calculated. Unpause the emulator while holding A.

You should now have your desired egg, congrats!

If you do not have the desired IVs, check that everything is correct in PokeFinder and that the order of parents is not swapped.
