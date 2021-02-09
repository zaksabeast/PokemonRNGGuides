# FireRed/LeafGreen Egg RNG Guide

---
## Requirements:
---

- [VBA-RR](https://code.google.com/archive/p/vba-rerecording/downloads)
- [Lua Scripts](https://pokerng.forumcommunity.net/?t=56443955&p=396434940)
    - Password is `allyouneedisnoob`.
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- Parent's IVs and their compatibility (Can talk to the daycare man for compatibility.)

---
## Intro
---

The PID for the egg in FRLG is generated in two parts. You'll rng the first part when the egg is generated, and you'll rng the second part when picking up the egg.

---
## Setup
---

1. First deposit the Pokemon at the daycare.
    - Order of deposit for the parents does not matter.

2. Stay inside the daycare and take steps until the lua script displays `FE` for the step counter.
    - Doing the steps outside the daycare will result in inconsistent delays due to NPCs moving.

3. Save and restart the emulator.

---
## PokeFinder Setup
---

1. Open PokeFinder and click on Gen 3 Eggs. Make sure to be on the Fire Red/Leaf Green tab. 

2. Enter ALL the information you have for the parents including their compatibility.

3. For a frame range you can choose any min / max, though the max frame for Frame Held must be lower than the min frame for Pickup Frame.

4. Once done, launch your game and find your initial seed shown by the lua. Enter it and search for a spread.
(Note: Where to enter initial seed in PokeFinder?)

5. Once you have a target frame, you'll see that you need to hit TWO different frames. This is similar to Emerald Egg RNG.
 
---
## Held Frame RNG
---

1. Take one step at the right frame to generate an egg.
    - You can do this by pausing the emulator, holding down the direction button, and then unpausing the emulator.

2. Once the step is done, the first half of your PID should be displayed on the screen with the script. 
    - If it matches, continue the process. If it does not match, either restart the emulator and restart the process, or continue to the next Frame Held and try again.

3. You did the Held Frame RNG. Now it's time for the Pickup Frame RNG.

---
## Pickup Frame RNG
---

1. Create a save state in case you miss the moment to press A.

2. Go outside, talk to the old man. Accept the egg, and pause the emulator at the LAST DIALOGUE (not at Yes / No)
(Note: What is the last dialogue?)

3. Advance to the frame shown by PokeFinder, pause, hold A and unpause.

You should have the second half of the PID for your egg, and so a successful RNG.

If it's not matching, recheck the whole process. Don't hesitate to do save states.
