# Gen 7 Stationary RNG Guide

## Tools
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- PCalc
    - [Sun/Moon](https://gbatemp.net/threads/wip-pokecalcntr-iv-and-nature-overlay-plugin-for-sun-and-moon.460524/)
    - [Ultra Sun/Ultra Moon](https://gbatemp.net/threads/pcalc-usum-the-rng-plugin-for-ultra-sun-and-ultra-moon.489643/)

Before continuing with the guide it is recommended to be in the place you wish to RNG.

If you are wanting to RNG a Mystery Gift (or Event) Pokemon instead, follow the Gen 7 Mystery Gift RNG guide instead.

## Stationary Pokemon
  - Tapus: Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini
    - Tapu Koko, Tapu Lele, and Tapu Bulu have 0 NPCs
  - Gifts: Type: Null, Eevee Egg, Fossils, Cosmog, etc.
  - USUM: Poipole, Necrozma
  - Starters - USUM is much more stable than SM

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

3. If you have the Shiny Charm check the Shiny Charm box.

4. Make sure you are on the "Stationary RNG" tab in 3DSRNGTool. Choose the Category and then the Pokemon you are RNGing for.

5. If you are using a Pokemon with Synchronize in the first slot of your party, choose its nature from the dropdown list for "Synch Nature". Failure to do this if the lead Pokemon has Synchronize will result in frames not being correct.

```
For gift Pokemon, Synchronize has a 100% chance of having the Pokemon obtained be the same nature as the lead Pokemon with Synchronize. If you are aiming for a specific nature, having a Pokemon with Synchronize in the first slot of your party will greatly improve your chances of finding target frames since every frame will have the nature you are wanting.

The gift Eevee egg and the move Pikachu gift are exceptions. Synchronize has no effect on their natures.
```

## Regarding Timeline and NPCs

If you are in an area with an NPC count of one or more, please follow the "Step 2 (with NPCs) Create a Timeline" to be able to accurately predict what frames you can actually land on.

If you are in an area with 0 NPCs, please skip to "Step 2 (With 0 NPCs):" because the RNG procedures are different, and no timeline is needed.

In the Gen 7 games each NPC has an affect on the RNG frames. This is why the frames will not always advance by a constant number. In general, each NPC advances the frames by one, so an area with four NPCs will generally advance five frames each time. There is also Rotom and your character blinks that affect the frames advanced. 3DSRNGTool can accurately predict all of this if the timeline is created properly and allow you to land on your target frame without skipping over it due to NPCs.

## Step 2 (with NPCs): Create a Timeline
1. In 3DSRNGTool, make sure to input your initial seed, game version, and your TSV if you haven't already. Double check that everything is correct.
    - Initial Seed can be found by pressing `Start + Up` ingame.

2. Check “Safe F Only”.

3. You can find the number of NPCS using PCalc.
    - After getting to the final screen for your Pokemon press `Start + Up` to bring up the window with the NPC counter.
    - If you already have it up, close it by pressing `Start + Up`, and then bring it back up again to reset the NPC counter.
    - Let the game run for approximately 30 seconds to a minute to calibrate correctly.

4. In the game, advance to the final screen for the Pokemon you are RNGing for. Input the frame you are currently on in the frame range. You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

5. Click "Calculate", and then advance to any of the frames that are listed that have a "-" in the Mark column.
    - These frames are considered Safe Frames and can be used to accurately predict the frames you can land on.

6. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frames given earlier with `Start + Select` and then slowly advance by pressing `Select` while paused.
    - Which frame you land on does not matter, just as long as it is one listed.

## Step 2(b): Verifying Timeline and Number of NPCs

1. Input your current frame after reaching a safe frame and then check “Create Timeline” and "Calculate".
  - Once you have landed on a safe frame and have used that frame to create a Timeline, do not change it. Otherwise the Timeline will be off and you'll have to restart from Step 2.

2. Press `Select` on your 3DS to advance several times and compare to what the next frames are given in 3DSRNGTool.
    - If they match then you have the correct number of NPCs.
    - If they do not match, restart from beginning of Step 2.

## Step 3: Obtaining the wanted Pokemon

1. Once you have determined the number of NPCs and have a correct timeline, the next step is to actually RNG the Pokemon.

```
Note: Do not mess with filters while creating a timeline. You should not have touched anything in filters (except to check the "Safe F Only" box) up to this point. Otherwise if you have messed with filters, restart from the beginning.
```

2. Adjust filters to what you are wanting, then click "Calculate" and choose any one of the results you want. If there are no results, increase the time in "Create Timeline".

3. Advance to that frame and when you land on it, Press A to obtain the Pokemon or begin a battle with the Pokemon.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again.

```
Note: You can view the Pokemon's info using PCalc. Press `Start + Left` to bring up the Wild View window or `Start + Right` to bring up the Party View window. `Select + Right` can be used to cycle through party members with the Party View window up.
```

## Step 2 (with 0 NPCs):

1. Do not check "Blink F Only" box.

2. Advance to the final screen for the Pokemon you are wanting to RNG. Input the frame you are currently on in the frame range.
    - You can find this in the PCalc Game Info window (`Start + Up`) and then press `Start + Select` to pause the game.

3. Adjust filters to what you are wanting, then click "Calculate" and choose any one of the results you want. If there are no results, increase the Frame Range or restart the game to obtain a new initial seed. (Make sure to restart from the beginning of the guide if you do restart the game.)

4. You can advance frames by pressing `Start` to unpause the game. You can then pause again when close to the frame you want with `Start + Select` and then slowly advance by pressing `Select` while paused.

```
Note: With 0 NPCs you can use Festival Plaza to advance frames quicker. Only do this with 0 NPCs, otherwise it will mess up the timeline and cause you to miss your target frame.

Make sure to exit Festival Plaza approximately a thousand frames before your target frame to avoid accidentally missing the frame.
```


5. Advance to your target frame and when you land on it, Press A to obtain the Pokemon or begin a battle with the Pokemon.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again.

```
Note: You can view the Pokemon's info using PCalc. Press `Start + Left` to bring up the Wild View window or `Start + Right` to bring up the Party View window. `Select + Right` can be used to cycle through party members with the Party View window up.
```


## If you did not obtain the Pokemon you wanted

1. Double check that all info has been inputted correctly, especially the initial seed.

2. Restart the guide from the beginning and make sure to follow _all_ instructions given. Not getting the correct Pokemon is usually a result of user error.

3. Make sure you are using the correct method depending on whether there are NPCs or not. Failure to create a Timeline when NPCs are more than 0 will result in target frames being skipped.
