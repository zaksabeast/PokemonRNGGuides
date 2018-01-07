# FRLG Wild RNG
_The most basic RNG in Gen 3_

## Requirements
This is the basic setup in order to RNG simple wild Pokemon in Fire Red / Leaf Green:
  - VBA-rr
  - Lua scripts for FRLG (available [here](https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239) - you'll need to copy the code, paste it to a notepad, and rename the file into 'whatyouwant.lua')
  - Knowledge of how to deal with the Memory Viewer
  - RNG Reporter
  - Your TID / SID
  - A Calculator and a notepad
  - A way to read your save - PKHeX is recommended

### Setup prior to RNGing

1. Open RNG Reporter. You'll need to first change a few settings:
    - Put your own TID / SID into the appropriate boxes.
      - PKHeX is the best way to find these by exporting the save from the emulator.
    - Change the method from "Method 1" to "Method H-1".
      - "Method 1" is for gift / stationary Pokemon while "Method H-1" is for Wild Pokemon.

2. After that, you'll need to open your emulator.
    - You should have a save in the place you want to RNG the Pokemon.
    - This saves time and avoids missing any target frames.

3. Load your Lua Script.  
    - For vba-rr 23.6, go to "Tools" => "Lua Scripting" => "New Lua Script". A box will pop-up where you'll be able to select the lua you saved earlier.

4. Once the game is loaded, enter into the "continue" menu.
    - Here you should pause the game to find your Seed.
    - FRLG uses the continue screen to generate different spreads every time the game loads to avoid repeating spreads like in dry battery Ruby and Sapphire.
    - This has the big advantage to give you new results every time you load your game.

5. To find your seed, you must open the Memory Viewer.
    - You need to search the address at 0x02020000.
    - In order to find it enter "02020000" in the box in the upper-right. Hit Go and you'll be done!

![](https://i.imgur.com/Vk4zYMm.png)

The "1330" is my seed for this run of FRLG. It changes after pressing A / Start in the main screen. There's no real way to manipulate it for the moment, so you must go with what you have.

6. With this seed you'll finally be able to search spreads. You must enter it in the "Seed (Hex)" box in RNG Reporter.

7. Enter in your target settings for the Pokemon you wish to search for (shiny, IVs, nature, encounter slots, etc) and once it's done, hit "Generate".

![](https://i.imgur.com/LiBe4F2.png)

- If your RNG Reporter is setup correctly, it'll look similar to the above. In my case, I just searched for Shiny Only.

- Now it's time to find and try to hit your target frame. Select one of the frames and unpause your game.

#### RNG process

You'll have to get to the menu as fast as possible and choose the Pokemon with Sweet Scent. Then pause again with the cursor hovering over the move.
```
Don't hesitate to overuse save states! It's really important! This way you can go back to lower frames, and adjust correctly since calibration will be necessary EVERY TIME!
```

##### Calibration

Now it's time for the calibration. In Gen 3, you'll never hit what you want at the first try. Calibration is always necessary.

Here's a little set up of how to do it fast for wild Pokemon:
1. Create a save state. Write the actual frame to the notepad.

2. Start the battle. To do that you need to hold the A button and unpause the game.
      - It'll trigger the battle on the actual frame. It is really important to be holding A as you unpause the game for precision.

3. Check the stats of the wild Pokemon you've found in the lua script.

4. Enter the Pokemon's stats into RNG Reporter and find the frame of the Pokemon you encountered.

5. Math time! Find the amount of frames you were off by:
  - (Frame you pressed A) - (Frame you got from reporter)
  - It'll be a negative result around 90% of the time, but that's normal.

6. Add the number of frames you were off to your original frame.  
  - If you had a negative number, subtract it from your original frame.  
  - This new number is the new frame you should press 'A' on.

7. Reload your state you did before in order to be able to continue your RNG.
```
You can calibrate when you want. For fast targets (aka not going for millions frames) doing it NEAR your Shiny frame will help to have a good delay. Doing it too early could give you a delay too low around your frame, and cause you to calibrate again.
```
8. If you didn't hit what you wanted after calibration, just retry the calibration part.
  - You can use save-states done before to avoid any problems.

9. After a few tries if you still can't hit anything double check your setup.

If you followed all steps, the Pokemon will be what you wanted after calibration. Tada, you did your first Gen 3 Wild RNG!
