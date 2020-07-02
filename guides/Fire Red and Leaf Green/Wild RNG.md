---
title: 'FRLG Wild RNG'
description: 'The most basic RNG in Gen 3'
slug: 'emulator-frlg-wild'
---

## Tools

- VBA-rr
- Lua scripts for FRLG (available [here](https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239) - you'll need to copy the code, paste it to a notepad, and rename the file into 'whatyouwant.lua')
- Knowledge of how to deal with the Memory Viewer
- RNG Reporter
- Your TID / SID
- A Calculator and a notepad
- A way to read your save - PKHeX is recommended

## Step 1: Open RNG Reporter

1. Put your own TID / SID into the appropriate boxes.
   - PKHeX is the best way to find these by exporting the save from the emulator.
2. Change the method to "Method H-1".

## Step 2: Setup VBA

1. Save your game in the place you want to RNG the Pokemon.
2. This saves time and avoids missing any target frames.
3. On VBA, go to "Tools" => "Lua Scripting" => "New Lua Script".
   - A box will pop-up where you'll be able to select the lua you saved earlier.

## Step 3: Finding the initial seed

1. Once the game is loaded, enter into the "continue" menu.
2. Pause the game to find your Seed.

```
Note: FRLG uses the continue screen to generate different spreads every time the game loads to avoid repeating spreads like in dry battery Ruby and Sapphire.
```

3. To find your seed, you must open the Memory Viewer.
   - You need to search the address at 0x02020000.
   - In order to find it enter "02020000" in the box in the upper-right. Hit Go and you'll be done!

![](https://i.imgur.com/Vk4zYMm.png)

The "1330" is my seed for this run of FRLG. It changes after pressing A / Start in the main screen. There's no real way to manipulate it for the moment, so you must go with what you have.

## Step 4: Find a target spread

1. Enter it in the "Seed (Hex)" box in RNG Reporter.
2. Enter in your target settings for the Pokemon you wish to search for (shiny, IVs, nature, encounter slots, etc)
3. Click "Generate".

![](https://i.imgur.com/LiBe4F2.png)

If your RNG Reporter is setup correctly, it'll look similar to the above. In my case, I just searched for Shiny Only.

## Step 5: Setup in the game

1. Get to the start menu as fast as possible.
2. Choose the Pokemon with Sweet Scent.
3. Pause the emulator with the cursor hovering over the Sweet Scent move.

```
Note: Don't hesitate to overuse save states! It's really important! This way you can go back to lower frames, and adjust correctly since calibration will be necessary EVERY TIME!
```

## Step 6: Calibration

In Gen 3, you'll never hit what you want at the first try. Calibration is always necessary.

1. Create a save state.
2. Write the current frame down.
3. Start the battle by holding the A button and unpausing the game.
   - This will trigger the battle on the actual frame. It is really important to be holding A as you unpause the game for precision.
4. Check the stats of the wild Pokemon you've found in the lua script.
5. Enter the Pokemon's stats into RNG Reporter and find the frame of the Pokemon you encountered.
6. Find the amount of frames you were off by:

   - (Frame you pressed A) - (Frame you got from reporter)
   - It'll be a negative result around 90% of the time, but that's normal.
   - For example if someone pressed A on frame 100 and the hit Pokemon was frame 103, you were off by -3 frames.

7. Add the number of frames you were off to your original frame.

   - If you had a negative number, subtract it from your original frame.
   - This new number is the new frame you should press `A` on.

8. Reload your state you did before in order to be able to continue your RNG.

```
Note: You can calibrate when you want. For fast targets (aka not going for millions frames) doing it NEAR your Shiny frame will help to have a good delay. Doing it too early could give you a delay too low around your frame, and cause you to calibrate again.
```

## Troubleshooting

If you didn't hit what you wanted after calibration, just retry the calibration part.

- You can use save-states done before to avoid any problems.

After a few tries if you still can't hit anything double check your setup.

If you followed all steps, the Pokemon will be what you wanted after calibration. Tada, you did your Gen 3 Wild RNG!
