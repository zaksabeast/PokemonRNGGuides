# FRLG Wild RNG
_The most basic RNG in Gen 3_

## Requirements ?
This is the basic setup in order to RNG simple wild Pokemon in Fire Red / Leaf Green:
- VBA-rr
- Lua scripts for FRLG (available [here](https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239) you'll need to copy the code, paste it to a notepad and rename the file into 'whatyouwant.lua')
- Knowledge of how to deal with the Memory Viewer
- RNG Reporter
- Your TID / SID
- A Sweet Scenter
- A Calculator and a notepad

### Setting up everything before doing any RNG.

First of all, open RNG Reporter. You'll need first to change a few settings:
- Put your own TID / SID (Pkhex is the best way to find it since on emulator)
- Change the method from "Method 1" to "Method H-1": The first is for gift / stationary Pokemon while the second is for Wild Pokemon

After that you'll need to open your emulator. You should have a save in the place you want to RNG the Pokemon in order to save time and avoid to miss any target frame. Load your Lua Script.  For vba-rr 23.6, go to "Tools" => "Lua Scripting" => "New Lua Script".  A box will pop-up where you'll be able to select the lua you saved earlier.

Once the game is loading just enter into the "continue" menu. Here you should pause the game to find your Seed. FRLG uses the continue screen to help generate different spreads every time the game loads to avoid repeating spreads like in dry battery Ruby and Sapphire. This has the big advantage to give you new results every time you load your game.

To find your seed, you must open the Memory Viewer. A lot of information will show up. You need to search the address at 0x02020000. In order to find it just put "02020000" in the box in the upper-right. Hit Go and you'll be done!

![](https://i.imgur.com/Vk4zYMm.png)

The "1330" is my seed for this run of FRLG. It changes after pressing A / Start in the main screen. There's no real way to manipulate it for the moment. So you must deal with it.

After, with this seed, you'll finally be able to search spreads. You must enter it in the "Seed (Hex)" box in RNG Reporter.

Now the tool is ALMOST set up. Enter in your target settings for the Pokemon you wish to search for (shiny, IVs, nature, encounter slots, etc), and once it's done, hit "Generate".

![](https://i.imgur.com/LiBe4F2.png)

If your tool is well setup, it'll look like that. In my case, I just searched for BASIC Shiny. Now it's time to find and try to hit your target frame. Select one of your choice and unpause your game.

#### RNG process

You'll have to go as fast as possible to the menu, choose the Pokemon w/ Sweet Scent, and pause again with the cursor on the move.
```
Don't hesitate to overuse save states! It's really important! This way you can go back to lower frames, and adjust correctly since calibration will be necessary EVERY TIME!
```
Now it's time for the calibration. In Gen 3, you'll never hit what you want at the first try. Calibration is always necessary. Here's a little set up of how to do it fast for wild Pokemon:
- Create a save state. Write the actual frame to the notpad.
- Launch the battle. To do that you need to hold the A button and unpause the game. It'll trigger the battle on the actual frame. It's really important for precision.
- Check the stats of the wild pokemon you've found in the lua script.
- Enter the Pokemon's stats into RNG Reporter and find the frame of the Pokemon you encountered.
- Maths time!  Find the amount of frames you were off by: 'Frame you pressed A' - 'Frame you got from reporter' it'll be a negative result around 90% of the time. It's alright.
- Add the number of frames you were off to your original frame.  If you had a negative number, subtract it from your original frame.  This new number is the new frame you should press 'A' on.
- Reload your state you did before in order to be able to continue your RNG.
```
You can calibrate when you want. For fast targets (aka not going for millions frames) doing it NEAR your Shiny frame will help to have a good delay. Doing it too early could give you a delay too low around your frame, and cause you to calibrate again.
```
If you didn't hit what you wanted after calibration, just re-try the calibration part, use save-states done before to avoid any problem, it can be some basic error. After a few tries, if you still can't hit anything, check twice all your setup.

If you followed all steps, the Pokemon will be what you wanted after calibration. Tada, you did your first Gen 3 Wild RNG!
