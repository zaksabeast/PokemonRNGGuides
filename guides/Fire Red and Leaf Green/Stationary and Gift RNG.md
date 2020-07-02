---
title: 'FRLG Stationary/Gift RNG'
description: 'Get shiny 6 IV stationaries from FRLG'
slug: 'emulator-flrg-stationary-and-gift'
---

## Tools

- VBA-rr
- Lua scripts for FRLG (available [here](https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239) - you'll need to copy the code, paste it to a notepad, and rename the file into 'whatyouwant.lua')
- Knowledge of how to deal with the Memory Viewer
- RNG Reporter
- Your TID / SID
- A Calculator and a notepad
- A way to read your save - PKHeX is recommended

## Step 1: Setup RNG Reporter

1. Open RNG Reporter.
2. Enter your TID/SID.
3. Use Method 1.

```
Note: Pokemon that are Method 1 in FRLG:

Bulbasaur, Charmander, Squirtle, Clefairy, Abra, Hypno, Voltorb, Electrode, Hitmonlee, Hitmonchan, Scyther, Pinsir, Magikarp, Lapras, Eevee, Porygon, Omanyte, Kabuto, Aerodactyl, Snorlax, Articuno, Zapdos, Moltres, Dratini, Mewtwo, Togepi, Lugia, Ho-Oh, Deoxys.
```

## Step 2: Setup VBA

1.Open your emulator.

2. You should have a save in front of the stationary Pokemon or the NPC that gives you the Pokemon.
3. Load your Lua Script by going to "Tools" => "Lua Scripting" => "New Lua Script".
   - A box will pop-up where you'll be able to select the lua you saved earlier.

## Step 3: Setup the initial seed

4. Load the game
5. Enter into the "Continue" menu of the game.
6. Pause the emulator to find your initial seed.

   - FRLG uses the continue screen to generate different spreads every time the game loads to avoid repeating spreads like in dry battery Ruby and Sapphire. This has the big advantage to give you new results every time you load your game.

7. To find your seed, you must open the Memory Viewer, and search the address at 0x02020000.

![](https://i.imgur.com/Vk4zYMm.png)

The "1330" is my seed for this run of FRLG. It changes after pressing A / Start in the main screen. There's no real way to manipulate it for the moment, so you must go with what you have.

8. Enter it in the "Seed (Hex)" box in RNG Reporter.
   - Now the tool is ALMOST set up. Enter in your target settings for the Pokemon you wish to search for (shiny, IVs, nature, encounter slots, etc) and once it's done, hit "Generate".

![](https://i.imgur.com/PIkK5i4.png)

## Step 4: RNG process

1. Pick a frame you want to hit in RNG Reporter.
2. Your player should be in front of the right legendary, NPC or Pokeball.
3. Create a save state in case you mess up something later.

```
Note: Don't hesitate to overuse save states! It's really important! This way you can go back to lower frames, and adjust correctly since calibration will be necessary EVERY TIME!
```

4. Advance to the final screen.
   - For example, if a Pokemon has a dialog (like a cry) before launching the battle it's the last screen you have before the Pokemon is generated (aka the moment the battle triggers, and the stats will be generated). To compare, the final screen for Wild Pokemon is the cursor on "Sweet Scent".
   - This can change from case to case.

## Step 5: Calibration

1. Create a save state.
2. Write the current frame down.
3. Hold the A button and unpause the game.
   - This will trigger the battle or finish the dialog for a gift on the final screen.
4. Check the stats of the Pokemon you've found. There are two cases.
   - If it's a stationary, the lua will show all the IVs without doing anything.
   - If it's a gift, you need to save your game and load it with PKHeX.
5. Reload the save state you made before in case you need to attempt the RNG again.
   - In this way, if you have to save the game to check your Pokemon's stats, the calibration will not be messed up.
6. Enter the Pokemon's stats into RNG Reporter and find the frame of the Pokemon.
7. Find the amount of frames you were off by:
   - (Frame you pressed A) - (Frame you got from reporter)
   - It'll be a negative result around 90% of the time, but that's normal.
   - For example if someone pressed A on frame 100 and the hit Pokemon was frame 103, you were off by -3 frames.
8. Add the number of frames you were off to your original frame.
   - If you had a negative number, subtract it from your original frame.
   - This new number is the new frame you should press 'A' on.

```
Note: You can calibrate when you want. For fast targets (aka not going for millions frames) doing it NEAR your Shiny frame will help to have a good delay. Doing it too early could give you a delay too low around your frame, and cause you to calibrate again.
```

## Troubleshooting

If you didn't hit what you wanted after calibration, just retry the calibration part.

- You can use save-states done before to avoid any problems.

After a few tries if you still can't hit anything double check your setup.

If you followed all steps, the Pokemon will be what you wanted after calibration. Tada, you did your Gen 3 Wild RNG!
