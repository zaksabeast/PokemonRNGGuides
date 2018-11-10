# FireRed/LeafGreen Egg RNG Guide

---
## Requirements:
---

/* Add Links */
- VBA-RR
- Lua Scripts (Noob or Github when uploaded)
- RNG Reporter (since atm PokeFinder is brroken as last commit)
- Parent's IVs and their compability

---
## Intro
---

So, FRLG Egg RNG was not doable because we looked at this only one year ago, and we discovered that, as for RS, the method was different than Emerald :
Rather than going for PID + IVs, in that case, the PID is just cut in half. You'll rng the first part, and you'll rng the second one after.

---
## Setup
---

1. First deposit the Pokemon at the daycare.
    - Order of deposit for the parents does not matter

2. Stay inside the daycare and take steps until the lua script displays `FE` for the step counter.
    - Doing the steps outside the daycare will result in inconsistent delays due to NPCs moving.

3. Save and restart the emulator.

---
## RNG Reporter Setup
---

1. Now open RNG Reporter and enter ALL the information you need for the parents including their compability.

2. For a frame range, you can choose any min / max but take care to take a difference between the max of the held frame and the min of the pickup frame.

3. Once done, launch your game and find your initial seed shown by the lua. Enter it and search for a spread.

4. Once you have a target frame, you'll see that you need to hit TWO frames in a row. This is similar to Emerald Egg RNG.
 
---
## Held Frame RNG
---

1. Just do the walk step at the right frame (emulator paused, pressing the direction button and unpausing)

2. Once the step done, a first half of your PID should be displayed on the screen with the script. If it matches, continue the process.

3. You did the Held Frame RNG. Now it's time for Pickup RNG.

---
## Pickup Frame RNG
---

1. Create a save state in case you miss the moment to press A.

2. Go outside, talk to the old man. Accept the egg, and pause the emulator at the LAST DIALOGUE (not at Yes / No)

3. Advance to the frame shown by the tool, pause, press A, unpause.

Tadar you should get the second half of your egg, and so a successful RNG.

If it's not matching, recheck the whole process. Don't hesitate to do save states.