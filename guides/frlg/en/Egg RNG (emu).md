/ ! \ Rough Draft as always because yeah why not / ! \

Requirement : 
- VBA 
- Lua Scripts (Noob or Github when uploaded) 
- RNG Reporter (since atm PokeFinder is brroken as last commit)
- Knowing IVs of the Parents + Compability.

So, FRLG Egg RNG was not doable because we looked at this only one year ago, and we discovered that, as for RS, the method was different than Emerald :
Rather than going for PID + IVs, in that case, the PID is just cut in half. You'll rng the first part, and you'll rng the second one after.

Process : 

First store the Pokemon at the daycare, and just walk until the FE step counter as shown by the lua. Once at FE. Save and close your game.

Now open RNG Reporter and enter ALL the informations you need for parents and compability list.
For a frame range, you can choose any min / max but take care to take a difference between the max of the held frame and the min of the pickup frame.
Once done, launch your game and find your initial seed shown by the lua. Enter it and search for a spread. 

Once you have a target frame, you'll see that you need to hit TWO frames in a row. This is similar to Emerald Egg RNG :
Just do the walk step at the right frame (emulator paused, pressing the direction button and unpausing)

/!\ DO THAT STEP INSIDE THE DAYCARE. Similar to calibration on Emerald, there's a delay already calculated by RNG Reporter if you do the step INSIDE the house /!\

Once the step done, a first half of your PID should be displayed on the screen with the script. If it matches, continue the process.

You did the Held Frame RNG. Now it's time for Pickup RNG.

Create a save state in case you miss the moment to press A.

Go outside, talk to the old man. Accept the egg, and pause the emulator at the LAST DIALOGUE (not at Yes / No)
Advance to the frame shown by the tool, pause, press A, unpause.

Tadar you should get the second half of your egg, and so a successful RNG.

If it's not matching, recheck the whole process. Don't hesitate to do save states.
