---
title: 'Transporter RNG'
description: 'Transfer your Gen 1/2 Pokemon to always be 6IV'
slug: 'transporter-rng'
subCategory: 'Custom Firmware'
---

## Tools

- A 3DS with PokeReader ([PokeReader Install Guide](https://www.pokemonrng.com/install-pokereader))
- [Chatot](https://chatot.pokemonrng.com/#/gen6/transporter) or [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

## Useful note

When asked if you want to transfer your Pokemon, clicking "No" will cause the Pokemon to be generated again. This allows inifinite retries in case you miss the RNG.

## Step 1: Callibrate your delay

Like most games, RNGing with Transporter will have a delay between the time a user presses "A" and the time the Pokemon are generated/transferred. Transporter's delay is partially caused by network requests to the validation and Bank servers, so the delay will always need to be callibrated before RNGing with Transporter.

1. Make sure you have at least one Pokemon in Box 1, Slot 1 of your Gen 1/2 game.
1. Load Pokemon Transporter with PokeReader on your 3ds.
1. Open up 3DSRNGTool on your computer.
1. Change 3DSRNGTool's "Game Version" to "Transporter".
1. Change 3DSRNGTool's "Seed" to the Initial Seed PokeReader shows you.
1. Change 3DSRNGTool's tab to "Stationary RNG".
1. In Transporter, press `Start` to select the game you would like to use with Transporter.
   - This is the final `A` press before Pokemon are generated.
1. Press `Start + Select` to pause the game.
1. Make a note of your current frame, this is your starting frame.
1. Press `A` to unpause and have Transporter generate the Pokemon.
1. Search for the exact IVs PokeReader says the generated Pokemon has using 3DSRNGTool to find your hit frame.
1. Subtract your hit frame from your starting frame to get your delay.
   - Example: I started on frame 1000 and I hit frame 1197, so my delay is 197.
1. When asked to transfer the Pokemon, click "No".
1. Repeat the process 5-10 times to get 5-10 delays.
1. Input the most frequent delay, or an average of all delays, into 3DSRNGTool's "Delay" box.

## Step 2: Find a spread to RNG

Follow these steps in 3DSRNGTool to find a desired spread:

1. Change the "Gender Ratio" to match the gender ratio of the Pokemon you’d like to RNG.
1. Change the "Index of Target Pkm" to be "1".
1. Change _only_ the gender and IVs to find a spread you would like to hit.
   - Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter.
1. Change the first "Frame Range" box to be the frame you are currently on.
1. Change the second "Frame Range" box to be the maximum frame you want to search for spreads.
1. Click "Search".

All results are potentially wanted frames. Pick your favorite!

## Step 3: Hit the target

1. Using PokeReader, wait at the game selection screen until you get close to your wanted frame.
1. Once you are close to your wanted frame, press `Start + Select` to pause the game.
1. Press `Select` to advance the frames one by one until you reach your wanted frame.
1. Once you have reached your wanted frame, press and hold `A`.
1. Check if you got the Pokemon you wanted, if not, don’t transfer your Pokemon and try again.

This will take several attempts.

## Alternative method with increased chances

Because Transporter is generating 20 Pokemon at the same time, if you have 20 of the same Pokemon or 20 clones of the same Pokemon, you can have 20 chances to RNG the same Pokemon in one attempt.

1. Catch 20 species of the same Pokemon (Or clone them if you’d like).
1. Make sure all 20 are in Box 1 of your Gen 1/2 game.

In 3DSRNGTool:

1. Change the "Index of Target Pkm" to be "1".
1. Change the "Filters" box to have the IVs you’d like to RNG.
1. Search for spreads using the initial seed PCalc shows.
1. Repeat this, adding 1 to the "Index of Target Pkm" to see the spreads for all 20 Pokemon.
1. Make a note of the index that has the most consecutive frames with spreads you would like - this is your target index.
1. You want the number of consecutive frames to be at least 10.
1. Set the "Index of Target Pkm" to your target index.
1. Get the list of delays from the calibration step.
1. Look for the highest delay within 10 frames of your most common delay.
1. In the "RNG Info" box of 3DSRNGTool, change the "delay" to be this new delay.
1. Press "Calculate" to find your potential wanted frames with this new delay for your target index.
1. Find the highest frame out of the 10+ consecutive frames from earlier and use it as your target frame.
