---
title: 'Dead Battery TID RNG'
description: 'Get that special TID/SID combo'
slug: 'emulator-rse-dead-battery-tid'
subCategory: 'Emulator'
---

## Tools

- [VBA-RR v23.6 (svn 480)](https://code.google.com/archive/p/vba-rerecording/downloads)
- [GBA bios file](https://encrypted.google.com/search?hl=en&q=gba%20bios)
- [Latest Version of RNGReporter](https://ci.appveyor.com/project/Admiral-Fish/rngreporter/build/artifacts)
- A Ruby or Sapphire ROM with a new game
- [Ruby/Sapphire Lua Scripts](https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/)

### VBA-RR Pokemon R/S TID/SID RNG

Before attempting this make sure VBA has:

- a BIOS File
- has "Skip BIOS" disabled

## Step 1: Find a specific PID for TID/SID RNG

You can find a specific PID and then TID/SID RNG to make that PID always be shiny. This is useful for making a specific frame and IV spread to always be shiny instead of having to manually search and possibly wait a very long time to find one.

1. Find a PID that you would like to make shiny.

   - To find the PID of the egg you want to make shiny, open up PkHeX, load the save on there and click on the egg to check the PID.
   - To find a specific PID to make shiny, search for a frame for the Pokemon you want to be shiny instead. Do not search for shiny only frames, just the IVs and/or nature wanted.

2. Open Pandora's Box within RNG Reporter. This can be found under Gen 3 Tools in the upper left.

3. Make sure the tab is on Gen III RS and the Dead Battery Box is checked.

4. Check the PID box and input the PID of the egg or the frame you are wanting to make shiny.
   - If instead you are wanting to RNG for a specific TID, check the TID box and input the TID you are wanting.

```
Note: It is not suggested to RNG both for TID and SID as this is more difficult and will take much more time.
```

5. Search until you find a result. Take note of the Frame that was given.

## Step 2: RNGing the TID/SID

1. On a new save, play until the professor says "We'll see you in our Pokemon Lab", and wait for the target frame to appear. This is the Frame given in Pandora's Box earlier.

2. When you are close to your target frame, press `Ctl + P` to pause the game. Make a savestate in case you mess up the next part.

3. Then press `Ctrl + N` to slowly advance frames until you reach the target frame.

4. When you're at your target frame, make another savesate, and hold `Ctrl + A + P` to press A and unpause the emulator at the same time.

5. Use PKHeX or the lua script to check your TID/SID.

6. Don't worry if the TID wasn't the one you wanted - this is trial and error. Check the TID box and input the TID you got into Pandora's Box. Also uncheck the SID and PID boxes if they are checked.

7. This will show you what frame you landed on. Take your original target frame and subtract the frame you landed on from it to find your new target frame.

   - (target frame) - (actual frame landed on) = delay
   - (target frame) - (delay) = frame to hold A and unpause on

8. Reload your game's savestate and repeat this process with your new target frame until the TID/SID combo is correct.
