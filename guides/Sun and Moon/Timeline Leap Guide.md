---
title: 'Timeline Leap'
description: "A timeline can predict Pokemon a player can obtain. Timeline leap allows a player to 'leap' onto specific timelines"
slug: 'retail-sm-timeleap'
subCategory: 'Custom Firmware'
---

## Tools

- A 3DS with PCalc ([PCalc Install Guide](https://www.pokemonrng.com/misc-3ds-installing-pcalc))
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

## Step 1: Find your target frame

1. In "Filters" set it to search for the Pokemon you are wanting.
   - Do not check "Safe F Only".
2. Search using "Frame Range" to find a frame you want to land on.
3. Right click on the frame and "Set as Target Frame".
   - This frame will be referred to as Frame 2 from here on.
   - Any frame that shows up can be landed on with this method, so if the frame isn't a safe frame you can still use it as a target frame.

## Step 2: Advance frames

Use Festival Plaza or Hau'Oli shopping mall to advance frames.

## Step 3: Position your character

When you are getting close to Frame 2, either leave Festival Plaza or fly to where you are going to battle or receive the Pokemon.

- For Mystery Gifts, fly to the the first PokeCenter.
  - Make sure you're standing behind the delivery man but facing the red counter. Check that you have 4 NPCs while standing there.
  - 4 NPCs are optimal for finding safe frames, which is why your character should stand behind the delivery man. If you are getting 5 NPCs instead, exit and re-enter the PokeCenter.
- For Xurkitree, stand behind it.
  - This is so there is a longer time window for having 1 NPC due to the wandering Xurkitree in the background. (There will be about a 7 second window of 1 NPC when you stand behind.)

## Step 4: Advance to leap screen

Get to the screen which will trigger the timeline leap.

- For Mystery Gifts, talk to the delivery man until you get to the Yes/No dialogue.
- For menu method, open X menu.
  - For Xurkitree, press `X` to open the menu as soon as the NPC counter in PCalc changes from 2 to 1.
- For in-game gifts and other stationary, the last dialogue will advance 1 frame.
  - If the final screen is "You received xxx", the leap screen is the 3rd or 4th to last A pressing.

```
Note: Timeline leap is not viable for wild Pokemon since there is not a way to jump between timelines when using Honey.

```

## Step 5: Pause at a safe frame

You can use "Safe F Only" filter to find safe frames. You'll have to reset filters before searching for a safe frame for results to show up.

- For Mystery Gifts with 4 NPCs this can be done by advancing frames one at a time and checking the last digit.
  - If you are on safe frames, the last digit will repeat itself like A-B-A-B-A-B because frames will be advancing 5 each time.
  - For an example, frames can advance with last digits being 2-7-2-7-2-7. (2+5=**7**, 7+5=1**2**, 12+5=1**7**, 17+5=2**2** - notice how the last digits are always 2 and 7.)

## Step 6: Calculate the timeline leap frame

1. After confirming your current frame is a safe frame, input it into the "Frame Range" starting frame.
2. Choose "Timeline Leap" and click on "Calculate".
3. A window will pop up with the frame you will press `A` on. This is Frame 1.
   - For Mystery Gifts this is when you press `A` on "Yes" to accept the Pokemon
   - For menu method, this is the frame to close the menu on.
   - For the other Pokemon, it is the 3rd or 4th to last dialogue before final screen when you'll press `A` to advance the dialogue to final sceen.

## Step 7: Double check if the target frame is your desired frame

Due to the inaccurate assumption of 3DSRNGTool "Frame Range" mode, Frame 2 may or may not always have the same spread. Checking it before advancing to the next step is advised, especially for the varying NPC count case.

1. Within the window that popped up, choosing "Yes" will allow you to check that Frame 2 still has the spread you wanted.
   - Choosing "No" will allow you to check if there are any other Frame 1 that can make Frame 2 have the spread you wanted.
2. If Frame 2 does not have the spread you wanted, search for your target spread within the timeline created. (Choose "Yes" when the window pops up.)
   - If you did not mess with filters after finding your target frame, it will be easy to find.
   - Right click and "Set as Target Frame" on the desired spread. This is now your new Frame 2.
3. If Frame 2 is not on the timeline, then you'll have to find the new frame the spread is on. Choose "Frame Range" and see what frame the spread is now on and then redo the "Timeline Leap" to find the new Frame 1.

## Step 8: Profit

1. Advance to Frame 1, when you land on it, press `A` to advance the dialogue to final screen
   - For menu method, Hold `X` and then `A` to both unpause the game and close the menu, then immediately press `Start + Select` to pause the game again, but this time with the menu closed.
   - Be prepared to press `A` for Frame 2 afterwards as there is about a 1~10 second interval in between the frames.
   - The time interval range can be found above the "Calculate" button.
2. Press `A` or make a step forward on Frame 2 to obtain the Pokemon you wanted. Congratulations!

### The following are possible ways of leaping for now:

1. Dialogue
   - The game will use 1 RNG call while loading the next line of text.
2. Closing the X menu
   - The game will use 2 RNG calls for the next timing of the character fidgets.
3. Press `A` at YES/NO screen (Mystery Gifts)
   - The game will use around 10 RNG calls to generate 1 Pokemon for testing.

Since you can jump between different timelines by choosing the leap timing, you can land on any frame of your choosing.
