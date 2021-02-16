---
title: 'Timeline with Fidget'
description: 'Using the timeline method with character fidgets'
slug: 'retail-usum-fidget'
subCategory: 'Custom Firmware'
---

## Tools

- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- PCalc
  - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/pcalc-usum.zip)

## Step 1: Create a timeline

- Follow the [timeline guide](https://www.pokemonrng.com/retail-usum-timeline) to create a timeline and find a target frame.

## Step 2: Account for character fidgetting

```
Note: This process doesn't work with Xurkitree and Nihilego as there appears to be some extra noise that makes some RNG calls. There is work being done to make a process for those.
```

1. After calibrating a basic timeline you need to watch for your character to "fidget" and pause there.
   - This must be the first fidget after calibrating your timeline
   - This does not have to be the first fidget when you load in just the first fidget after calibrating any timeline

```
Note: The NPC count is a calculation so when the fidget happens the NPC count on the overlay will jump because of the frame jump. This does not mean your base NPC count is off it is just the calculation taking the fidget into account (NPC count = max # of frames advanced - 1).
```

Boy:

![](https://camo.githubusercontent.com/6319d400d9f87d6dceda41b36caad2bc2a03d905/68747470733a2f2f692e696d6775722e636f6d2f6d41794a3149372e676966) ![](https://camo.githubusercontent.com/dfd85f146d791e87030b5c402100fb64ea711837/68747470733a2f2f692e696d6775722e636f6d2f62587a704d42702e676966)

Girl:

![](https://camo.githubusercontent.com/783ad84d0ba843a82f8ceae7224f88d12278a35c/68747470733a2f2f692e696d6775722e636f6d2f637735787770432e676966) ![](https://camo.githubusercontent.com/4d46716f6dbda58e43acbb7a4837644e6b99bfd9/68747470733a2f2f692e696d6775722e636f6d2f4e6c78337278452e676966)

My character mid fidget:

![](https://i.imgur.com/lhAMvJk.png)

2. Advance through the fidget using select until you notice a jump in frames that doesn't show on your timeline.

   - This will usually be 3-4 frames in the case of wormholes as they all have 1 NPC.
   - In my case the frames jumped from 1320-1324, which means I need to put 1320 in my fidget setting (Check the box and put it in).

3. Once entered hit Calculate and you can see the frame jump accounted for in your timeline.

![](https://i.imgur.com/VtG9yur.jpg) ![](https://i.imgur.com/09VjphH.jpg)

Now the timeline will take character fidgetting into account for future advancements. Do not move your character and do not open the menu while advancing to your target frame.
