# FRLG Wild RNG
_The most basic RNG in Gen 3_

## Requirements ?
This is the basic setupd in order to RNG simple wild Pokemon in Fire Red / Leaf Green :
- VBA-rr (the 23.6 is really the best in order to use it with Gen 1 or 2 scripts but any rr supporting lua scripts will do the job)
- Lua scripts for FRLG (available [here](https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239) you'll need to copy the code, paste it to a notepad and rename the file into 'hatyouwant.lua')
- How to deal with Memory Viewer
- RNG Reporter
- Your TID / SID
- A Sweet Scenter
- A Calculator and a notepad

### etting up everything before doing any RNG.

First of all, open RNG Reporter. You'll need first to change a few settings :
- Put your own TID / SID (Pkhex is the best way to find it since on emulator)
- Change the method from "Method 1" to "Method H-1" : The first is for gift / stationnary Pokemon while the second is for Wild Pokemon

After that you'll need to open your emulator. You should have a save in the place you want to RNG the Pokemon in order to save time and avoid to miss any target frame. Load your Lua Script too. This can vary, but for vba-rr 23.6, you'll find everything in "Tools" => "Lua Scripting" => "New Lua Script". A box will pop-up where you'll be able to select the lua you just created.

Once the game is loading just enter into the "continue" menu. Here you should pause the game to find your Seed. FRLG use that to generate different spreads every time you load the game and to avoid problems like dry battery in RS. This has the big advantage to give you new results every time you load your game.

To find your seed, you must open the Memory Viewer. A lot of information will show up. You need to search the address at 0x02020000. In order to find it just put "02020000" in the box in the upper-right. Hit Go and you'll be done !

![](https://i.imgur.com/Vk4zYMm.png)

The "1330" is my seed for this run of FRLG. It changes after pressing A / Start in the main screen. There's no real way to manipulate it for the moment. So you must deal with it.

After, with this seed, you'll finally be able to search spreads. You must enter it in the "Seed (Hex)" box in RNG Reporter.

Now the tool is ALMOST set up. You just need to search your target settings (Shiny, IVs, nature, encounter slots etc) and once it's done just hit "Generate" 

![](https://i.imgur.com/LiBe4F2.png)

If your tool is well setup, it'll look like that. In my case, I just searched for BASIC Shiny. Now it's time to find and try to hit your target frame. Select one of your choice and unpause your game.

You'll have to go as fast as possible to the menu, choose the Pokemon w/ Sweet Scent, and pause again with the cursor on the move.


```
Don't hesitate to overuse save states ! It's really important ! This way you can go back to lower frames, and adjust correctly since calibration will be necessary EVERY TIME !
```

Now it'll time to make the calibration. In Gen 3, you'll never hit what you want at the first try. Because of the counter, how RNG Reporter works etc. There are a lot of reason, but calibration is always necessary. Here's a little set up of how to do it fast and well for wild Pokemon :
- Create a save state. Write the actual frame to the notpad.
- Launch the battle. To do that you need to hold the A button and unpause the game. It'll trigger the battle on the actual frame. It's really important for precision.
- Check the stats of the wild pokemon you've found in the lua script.
- Enter these datas into the RNG Reporter. Check the good frame.
- Maths time ! Just do some basic maths like this : 'Frame you pressed A' - 'Frame you got from reporter' it'll be a negative result around 90% of the time. It's alright.
- Apply it to your Shiny Frame. You know when to press A.

```
You can calibrate when you want. For fast targets (aka not going for millions frames) doing it NEAR your Shiny frame will help to have a good delay. Doing it too early could give you a delay too low around your frame, and so having to recalibrate another time.
```

If you didn't hit what you wanted after calibration, just re-try the calibration part, use save-states done before to avoid any problem, it can be some basic error. After a few tries, if you still can't hit anything, check twice all your setup.

If you followed all steps, the Pokemon will be what you wanted after calibration. Tada, you did your first Gen 3 Wild RNG !
