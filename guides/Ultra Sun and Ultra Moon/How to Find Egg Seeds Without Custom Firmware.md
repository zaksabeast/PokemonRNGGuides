---
title: 'Finding Egg Seeds Without CFW/Homebrew'
description: 'Find your egg seeds for Egg RNG using the Magikarp Method'
slug: 'retail-usum-egg-seed-no-cfw'
subCategory: 'Retail'
---

```
Note: This guide is for those who do not have access to CFW or homebrew. If you have CFW or homebrew, then you can go ahead and start RNGing right away! Refer to the appropriate guide for the method you want to use.
```

## Tools

- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

There are two ways of finding the egg seeds. If you have never collected or rejected an egg at the nursery then you can do the 8 Magikarp method. The Eevee gift egg does not count. Otherwise, the only other way is the 127 Magikarp method.

## Step 1: Setup for 127 Magikarp method

```
Note: If you have never accepted or rejected an egg at the nursey then you can skip to the 8 Magikarp Method instead.

The gift Eevee egg from the nursery does not count!
```

1. You will need two Magikarp, one female one male, of different natures. Make a note of which gender has which nature.

   - For faster egg generation, have the Magikarps be of different languages and different OT/TIDs. Also, the Oval Charm helps eggs generate faster.

2. You will also need 2 everstones for both Magikarp to hold.

## Step 2: Finding Egg Seeds (127 Magikap Method)

1. Deposit the Magikarp, with both holding everstones, into the nursery.

2. Run around until there is an egg ready to pick up.

3. Save the game _before_ picking up the egg. (This step is very important!)

4. Accept the egg and hatch it. Next, check its nature and compare to the parents' natures.

   - If it matches the male Magikarp then make a note of `0`.
   - If instead it matches the female Magikarp make a note of `1`.

5. Soft reset the game with `L + R + Start` to when the egg was ready to be picked up.

6. Reject the egg this time. Repeat from #2 in this section (run around until egg is ready to pick up) until you have 127 `0` or `1` noted down in order. Soft reset so you're back to your last egg again ready to be picked up.

7. Open 3DSRNGTool and in the upper left click on "Tools" then "Gen7 Egg Seed Finder". Copy/paste or type in your list of 0's and 1's.

8. Click on "Go!" and wait for the search to finish. It shouldn't take long and you will get one result.

## Step 3: Verifying Egg Seeds (127 Magikarp Method)

1. The egg seeds given are the ones from _before_ you started collecting/rejecting the 127 eggs. Now you need to find what egg seed you are on currently.

2. Back in 3DSRNGTool input your egg seeds into the "Current Status" area in order. Under "Parents Information" fill it out according to the Magikarp you used.

3. Click on "Frame Range" and input 123 as the starting number. Then click "Calculate".

4. To double check this is the correct frame you are on now, reject the egg and remove the Magikarp from the nursery. Save your game!

5. Replace both Magikarp back into the nursery but make sure neither are holding anything.

6. Run around until an egg is ready and accept it.

7. Hatch the egg and check if the nature matches frame 123 or 124. If it does then congrats! You now know what your egg seeds are and can continue with egg RNG.

   - If the nature does not match, then your egg seeds were not correct. You will have to redo the 127 eggs again to get correct egg seeds.
   - You can right click on the frame that matched and choose "Set as Current Status" to update the "Current Status" with your egg seeds.

8. Soft reset and you can then egg RNG following the [Masuda Method/Shiny Charm Egg RNG Guide](https://pokemonrng.com/guides/usum/en/Egg%20RNG%20With%20Masuda%20Method%20or%20Shiny%20Charm/).

## Step 1: Setup for 8 Egg Method

```
Note: For this method you must not have rejected or accepted an egg from the nursery.

The gift Eevee egg does not count!
```

1. You will need a Magikarp and a Ditto of the same language.

2. Save your game then deposit both Pokemon into the nursery. Make sure both are not holding an item.

## Step 2: Finding Egg Seeds (8 Egg Method)

1. Collect 8 eggs in a row and hatch them. Do NOT save your game or reject any eggs while doing so.

2. Open 3DSRNGTool and in the upper left click on "Tools" then "Gen7 Egg Seed Finder".

3. Choose the 8 natures you got in order from the dropdown list. When you're done there should be 8 numbers in the "Nature List".

4. Click "Search" and when it's done you will have your egg seeds.

## Step 3: Verifying Egg Seeds (8 Egg Method)

1. The egg seeds given are the ones from _before_ you started collecting the 8 eggs. Now you need to verify that the egg seed you got is the correct one.

2. Back in 3DSRNGTool input your egg seeds into the "Current Status" area in order. Under "Parents Information" fill it out according to the Magikarp and Ditto you used.

3. Click on "Egg Number Range", make sure the initial number is 1, then click "Calculate".

4. Check the 8 eggs you hatched against the 8 eggs info in the output. If the natures and genders match for all 8 eggs then you have the correct egg seeds.

   - If they do not match then you will have to redo the 8 eggs again. Double check that the correct natures are entered in the order you accepted the eggs.

5. Soft reset and you can then egg RNG following the [Masuda Method/Shiny Charm Egg RNG Guide](https://pokemonrng.com/guides/usum/en/Egg%20RNG%20With%20Masuda%20Method%20or%20Shiny%20Charm/).
