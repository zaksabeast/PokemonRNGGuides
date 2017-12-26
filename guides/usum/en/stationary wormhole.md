# Ultra Sun/Ultra Moon Wormhole Stationary RNG Abuse
_Get your own perfect Legendary Pokemon!_

## Preparation

### Make sure you have the following
- Console with CFW
- [3DSRNGTool](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts)
	- Github link: https://github.com/wwwwwwzx/3DSRNGTool
- [PCalcNTR](https://pokemonrng.com/downloads/pcalc/usum)
- [BootNTR Selector](https://gbatemp.net/threads/release-bootntr-selector.432911/)
    - Mode 3 for o3ds/2ds

### Recommended reading/references
- [Timeline and Timeline 2.0 Guide by](https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen7-Timeline-Calibration-%28PokeCalcNTR-Only%29) /u/wwwwwwzx as we will be referencing concepts explained in this guide.
- [3DSRNGTool README](https://github.com/wwwwwwzx/3DSRNGTool/blob/master/README.md) - list of final screens before the Pokemon is generated

## RNG Process
Below we will go through the RNG process required for wormhole UBs/Legendary Pokemon. Do not try to hit your perfect target the first time as you will end up disappointed when you miss it!

### Finding your seed
1. This one is easy as all you need to do is load in to the game. The seed is shown at the top of the overlay with the label of "Init Seed:". In the following image the seed is 5DA5CA91.

![](https://i.imgur.com/FXtylJx.png)

### Calibrating a timeline
All Gen 7 RNG can be influenced by NPCs and must rely on setting up a timeline to see what the results can be for any given timeline ([Timeline explanation](https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen7-Timeline-Calibration-%28PokeCalcNTR-Only%29#why-do-we-need-this)). The process of doing this requires us to find a safe frame ([Explanation](https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen7-Timeline-Calibration-%28PokeCalcNTR-Only%29#whats-a-safe-frame)) and build the timeline from there.

1. To do this we just need to put the seed in to the tool and after loading in to the game let it run for about 30 seconds until the NPC count registers.

![](https://i.imgur.com/PSi6UbZ.png)

2. Then you put your starting frame in the first box of the 3DSRNGTool Frame Range option and select Safe F Only.

![](https://i.imgur.com/pOJWrje.jpg)

3. Advance to the nearest safe frame you can reach either by manually advancing with select or un-pausing and pausing again.

4. We paused on a safe frame so we can continue on, otherwise, right-click on the frame we hit and Set as Starting Frame.
```
Note: You might not able to land on the exact safe frame you looked at. As long as it's a safe frame, that's fine.
```
![](https://i.imgur.com/cI0u2y6.png)

5. Now change the mode to "Create Timeline/s" and click Calculate. The setting here defaults to 600 seconds and can be adjusted to your acceptable wait time.

![](https://i.imgur.com/R7DbMmy.jpg)

6. Advance quite a few times by clicking select and make sure that the frames match the timeline results.

![](https://imgur.com/CaHnzgk.png)

7. We have now calibrated a timeline!
```
Note: If this was an RNG with a Dialog such as Poiople we would be able to put in search parameters now, but because of the way USUM stationary encounters are we have a few additional steps. If you are doing an RNG with a dialog you can skip to the section on Hitting your Target Frame.
```

### Timeline 2.0
This process has been named "Timeline 2.0" and is used to find the effect on the timeline of what is now affectionately known as "fidget".
```
Note: This process doesn't work with Xurkitree and Nihilego as there appears to be some extra noise that makes some RNG calls. There is work being done to make a process for those.
```
8. After calibrating a basic timeline you need to watch for your character to "fidget" and pause there. This must be the first fidget after calibrating your timeline. This does not have to be the first fidget when you load in just the first fidget after calibrating any timeline (lots of confusion on this one).
```
Note: The NPC count is a calculation so when the fidget happens the NPC count on the overlay will jump because of the frame jump. This does not mean your base NPC count is off it is just the calculation taking the fidget into account (NPC count = max # of frames advanced - 1).
```
Boy:

![](https://camo.githubusercontent.com/6319d400d9f87d6dceda41b36caad2bc2a03d905/68747470733a2f2f692e696d6775722e636f6d2f6d41794a3149372e676966) ![](https://camo.githubusercontent.com/dfd85f146d791e87030b5c402100fb64ea711837/68747470733a2f2f692e696d6775722e636f6d2f62587a704d42702e676966)

Girl:

![](https://camo.githubusercontent.com/783ad84d0ba843a82f8ceae7224f88d12278a35c/68747470733a2f2f692e696d6775722e636f6d2f637735787770432e676966) ![](https://camo.githubusercontent.com/4d46716f6dbda58e43acbb7a4837644e6b99bfd9/68747470733a2f2f692e696d6775722e636f6d2f4e6c78337278452e676966)

My character mid fidget:

![](https://i.imgur.com/lhAMvJk.png)

9. Advance through the fidget using select until you notice a jump in frames that doesn't show on your timeline. This will usually be 3-4 frames in the case of wormholes as they all have 1 NPC. In my case the frames jumped from 1320-1324, which means I need to put 1320 in my fidget setting (Check the box and put it in). Once entered hit Calculate and you can see the frame jump accounted for in your timeline.

![](https://i.imgur.com/VtG9yur.jpg) ![](https://i.imgur.com/09VjphH.jpg)

### Hitting your Target Frame
10. Now you can search for your target by entering what you are looking for in the filters and hitting calculate.

![](https://i.imgur.com/XMni0tq.jpg)

11. Advance near your frame and pause.

![](https://i.imgur.com/ro0o8yq.png)

12. When you get to your frame it is time to initiate the encounter. For UBs this will be simply done by pressing "A" and for Legends you will want to hold forward and then press "A". You will want to save as close as possible to the spot that triggers the encounter (I am holding forward here when I press A to unpause).

![](https://i.imgur.com/TJBM800.png)

13. Profit???
_Not so much_

![](https://i.imgur.com/z3vbvfe.png)

So what happened?

This is okay and normal as each 3ds/save has its own delay that you will need to find. The delay is the time it takes from when you initiate the encounter and when the Pokemon actually gets generated by the game. Let's learn how to do that!

### Finding your delay and hitting it
14. We can use the IVs, nature and PSV of the Pokemon we got to see what frame we actually hit. My target was 4973 and I hit 4969 (-4). So the delay I hit vs the default setting of the 3DSRNGTool is -4 or 152.

![](https://i.imgur.com/3arvrHP.jpg)

15. You will want to do this process a number of times with random targets and see what frame you hit relative to the default to find the delay you hit most often. You would then put that into the field after "Consider Delay". I adjusted the delay here to show how it would change the result.
```
Note: I did this as an example, wait until you have found a common delay until you change your delay. This can take 10-20 times or more depending on your results.
```

![](https://i.imgur.com/THTHPpK.jpg)

16. Once you find which delay is most consistent for you and enter it in to the field try for some harder targets! Here is the shiny Groudon I hit after finding my consistent delay of 152. Be aware that Legendary Pokemon can be a bit more inconsistent than UBs. This is because you have to take a step before the animation occurs adding more variables that could affect the delay.

![](https://i.imgur.com/SnhyISc.png)

 * Imgur library of all images including another set of images of getting to Groudon - [https://imgur.com/a/3ctOj](https://imgur.com/a/3ctOj)
