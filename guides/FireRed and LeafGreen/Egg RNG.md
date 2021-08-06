---
title: 'FRLG Egg RNG'
description: 'RNG Eggs in FRLG'
slug: 'emulator-frlg-egg'
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

The PID for the egg in FRLG is generated in two parts. You'll rng the first part when the egg is generated, and you'll rng the second part when picking up the egg.

### Setup

1. First deposit the Pokemon at the daycare.

   - Order of deposit for the parents does not matter.

2. Stay inside the daycare and take steps until the lua script displays `FE` for the step counter.

   - Make sure to do the steps inside the daycare and not outside of it.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_5.png?raw=true)

3. Create a savestate here before continuining on.

### PokeFinder Setup

1. Open PokeFinder and click on Gen 3 Egg. Make sure to be on the Fire Red/Leaf Green tab.

2. Enter ALL the information you have for the parents including their compatibility.

3. For a frame range you can choose any min / max, though the max frame for Frame Held must be lower than the min frame for Pickup Frame.

4. Once done, find your initial seed shown by the lua. Enter it and search for a spread.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_6.png?raw=true)

5. Once you have a target frame, you'll see that you need to hit TWO different frames.

### Held Frame RNG

1. Take one step at the right frame to generate an egg.

   - Frames can be advanced one by one with CTRL + N while the emulator is paused.
   - Once on the target frame, then you can hold down the directional button to take a step while unpausing the emulator.
   - For PokeFinder you'll have to take delay into account. Subtract 18 from the target frame and take the step on that frame.
   - If no egg is generated, double check that everything has been entered correctly. If so, then try a delay of 17 or 19.

2. Once the step is done, the second half of your PID should be displayed on the screen with the script.

   - If it matches, continue the process. If it does not match, either restart the emulator and restart the process, or continue to the next Frame Held and try again.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_7.png?raw=true)

3. You did the Held Frame RNG. Now it's time for the Pickup Frame RNG.

### Pickup Frame RNG

1. Create a save state in case you miss the moment to press A.

2. Go outside, talk to the old man. Accept the egg, and pause the emulator at the last dialogue ("Take good care of it.").

3. Advance to the target frame, pause, hold A and unpause.
   - Again, delay will have to be taken into account. For the Pickup Frame, the delay will be 3.
   - If the egg does not have the correct PID, then try a delay of 2 or 4.

You should have the second half of the PID for your egg, and so a successful RNG.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_8.png?raw=true)

If it's not matching, recheck the whole process. Don't hesitate to do save states.
