---
title: 'Egg RNG Guide Without Masuda or Shiny Charm'
description: 'RNG your perfect Pokemon at the daycare'
slug: 'retail-xy-egg-no-mmsc'
---

```
Note: This method is different than using Masuda or with having the Shiny Charm. The difference is that you first RNG the egg traits, and then RNG the ESV (and PID) when picking up the egg. Wait times could also be much shorter than with Masuda or Shiny Charm.
```

## Tools

- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- PCalc for Gen 6
  - [PCalc-oras](https://pokemonrng.com/downloads/pcalc/pcalc-oras.zip)
  - [PCalc-xy](https://pokemonrng.com/downloads/pcalc/pcalc-xy.zip)

## Step 1: Enter RNG info

1. Input your game version and your TSV.
   - Using PCalc you can find your TSV by pressing `Start + Right` to bring up the Party View window, then press `Select + Left`. Your TSV is listed by where it says YOUR TSV.
2. Input initial seed.
   - This can be found using PCalc's Game View window. Press `Start + Up` to bring up the window.
3. Do not check the Shiny Charm box. If you have the Shiny Charm you cannot use this method.

```
If you are wanting to RNG the egg to have a specific ESV that is not yours, click on Edit TSV List and input TSV(s). Then check the Other TSVs Shiny box.

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
```

## Step 2: Parent information

- Fill it out according to the parents you are using.
  - Do not check the Masuda Method box.
  - If the parents are of different languages you cannot use this method.

```
Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
```

If breeding with a Genderless Pokemon and Ditto, Ditto will always be female.

## Step 3: Egg Seeds, Filters, and Target Frame

1. For the Egg Seeds input the current egg seeds of your game.

   - Using PCalc press `Start + Down` ingame to bring up the egg seed window and input them into 3DSRNGTool.

2. For Filters, input the info for the egg you are wanting.

3. Do not check the Shiny Only box, even if you are wanting a shiny. Shininess will be RNG'd separately later in the guide.

4. Press `Start + Up` to bring up Game Info screen for PCalc. Then press `Start + Select` to pause the game.

5. Input your current frame and increase frame range. The higher the frame range, the more frames will be searched.

6. Click "To Accept" if you are going to be accepting the first egg.
   - If instead, you want to reject the first egg, click "To Reject".
   - However, it is advised to accept the first egg so you can verify that it matches frame -1.

```
Note that the Consider Delay counter will change to 0 for rejecting the egg.
```

7. After doing all of the above, click on Calculate to output target frames.
   - If there are no results, increase frame range and click Calculate again.

## Step 4: RNGing the Egg Traits (Exluding PID/ESV)

Keep in mind:

- Frames will always advance by 2 outside of battles.
- Frames will be either always even or always odd.
- To switch from even to odd frames, save once.
- The first egg you collect/reject will NOT be the egg you RNG’d for.
- Eggs traits are generated when the previous egg was collected/rejected and do not change.
  - However, the PID, and therefore ESV, of the egg is not generated until you collect the egg.
- When you collect/reject the first egg, the NEXT egg will have the traits you RNG’d for.
- When collecting the second egg (the target egg), you will be RNGing for the ESV of that egg.
  - The other traits were RNG’d when the first egg was collected/rejected.
- The frame -1 is the current egg’s traits.
  - This is the first egg you will be collecting when you press A for Yes (or rejecting if you chose to reject).

1. Pick your target frame that you are wanting.

2. If you are currently on an even frame and want an odd frame, or vice versa, unpause by pressing `Start` and save the game once.
   - This will switch from even to odd frames, or vice versa.

## Step 5: Hit the Target Frame

1. In game, talk to the daycare man until you get to a specific dialogue.

- For accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY) with the selection of Yes or No.
  - Make sure pointer is on Yes and wait to reach your target frame.
- For rejecting the first egg: “Well then, I'll hang on to it. Thank you!” (XY/ORAS) after selecting No from previous dialogue.

2. When you are close to your target frame, you can press `Start + Select` to pause the game, and then press `Select` repeatedly to advance frame by frame.

3. Advance to your target frame and then hold A (don’t just press it, hold down A) to both unpause the game and receive/reject the egg.

4. As mentioned before, this egg is NOT the one you RNG’d for. It should match the frame -1 from the 3DSRNGTool.

- You can use PCalc to view the egg's info without having to hatch it. Press `Start + Right` for Party View then press `Select + Right` to cycle through the party slots.

5. The egg seeds ingame (`Start + Down` to bring up menu) should match the egg seeds for the target frame you chose in 3DSRNGTool.

## Step 6: RNGing the ESV of the Egg

1. Right click on the target frame you chose earlier, and click on "Set as Current Status".

2. Click Reset in Filters and then check Shiny Only box.

- Do not mess with anything else in Filters. You have already RNG'd the traits you wanted earlier.

3. Same as before, input current frame and a frame range to search. The higher the frame range, the more frames will be searched.

4. Click Calculate and you should get an output of frames with the ESV you want.

5. Chose a target frame like before.

- IVs listed are for the NEXT egg that is generated, not the current egg that you will be picking up. Current egg traits are Frame -1.

- If you are currently on an even frame and want an odd frame, or vice versa, unpause and save the game once. This will switch from even to odd frames, or vice versa.

## Step 7: Hit the Target Frame (Repeat from before)

1. In game, talk to the daycare man until you get to a specific dialogue.

- For accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY) with the selection of Yes or No.
  - Make sure pointer is on Yes and wait to reach your target frame.
- For rejecting the first egg: “Well then, I'll hang on to it. Thank you!” (XY/ORAS) after selecting No from previous dialogue.

2. When you are close to your target frame, you can press `Start + Select` to pause the game, and then press `Select` repeatedly to advance frame by frame.

3. Advance to your target frame and then hold A (don’t just press it, hold down A) to both unpause the game and receive/reject the egg.

The egg should now have the traits and ESV you wanted. Congrats!

## Troubleshooting

- Check that the TSV in the upper right matches the one of the save you are RNGing on. You can find your TSV by bringing up party view menu with `Start + Right` then pressing `Select + Left` to go to slot 7.

- If the first egg collected did not match the info for frame -1, make sure you are using the latest PCalc. Also, make sure you have the right daycare view for ORAS.

- Pressing `Select + Right/Left` with the egg seeds window up will switch daycare views for ORAS.

- Egg seeds should change after every egg collected/rejected. If they are not changing, make sure you are using the latest PCalc and your game is updated to the latest version.
