# Pokemon Box Shiny RNG (Emulator)
_Original guide by /u/OPBreloom_

### What you'll need for this RNG?
- VBA-RR
- M-VBA
- GBA bios file
- Latest Version of Dolphin
- Latest Version of RNGReporter
- Runasdate x32
- One Ruby or Sapphire with one Save file after obtaining the Pokedex
- One Ruby or Sapphire with a new game
- RNG Tools (The one that has FindFrames etc.) Lua Scripts for Frames etc., of Pokemon Ruby/Sapphire
- Pokemon Box

### Dolphin's Configuration Tweaks
First off, we'll need to open you Dolphin and adjust "Configuration":
- Make sure Dolphin has "Use Panic Handlers" disabled
- Make sure Dolphin has "Pause on Focus Loss" disabled
- In "Configure>Audio" only has "DSP HLE emulation (fast)" checked
- In "Controllers" in the "Port 2" we'll want to input "GBA"m since we'll be using M-VBA for the connection.

### M-VBA's Tweaks
For M-VBA, we'll need to go to "Emulation>Game Boy Advance" Click on "Real-Time Clock" and "Use BIOS File".

Once you load a BIOS File we'll want to go to the "Emulation>GBA", and click on "Configure...".  Insert your "gba.bios" in "Boot ROM".  Uncheck "Skip BIOS" and "Pause when inactive".

In "Option Settings", we'll want to click on "Link>Type", then "Gamecube", and in that same "Link" click on "Link at Boot" and "Speed Hack".

### Pokemon Box/Dolphin Connecting with M-VBA
Now turn on your Pokemon Box with Dolphin, and get to the point where once you've clicked "Pokemon Box" _NOT_ "Adventure".

Before turning on M-VBA, make sure you've gotten your Pokedex, and saved at a Pokemon Center. Turn on M-VBA, and Pokemon R/S.

```
Note: The game should be slow due to the connection through Dolphin - don't worry that's normal!
```

Once you're connected completely, M-VBA should have the Pokemon Box logo on the screen, and have entered Pokemon Box!

You should be getting your first egg, which is False Swipe Swablu, we'll be making that shiny via TID/SID RNG on Pokemon R/S.

Now we'll want to transfer the pokemon via Pokemon Box>R/S.  Go back to the main menu, save, and quit Pokemon Box.

On M-VBA, once in the main game, save and quit.

### Checking the Egg's PID for TID/SID RNG
Open up PkHeX, load the save on there and click on the egg to check the PID.

Using a hex-to-dec calculator online, convert the first four characters of your Pokemon's PID from hex to decimal.  This will be your TID.

Do the same with the last four characters of your Pokemon's PID from hex to decimal.  This will be your SID.

Now we use the FindFrames. Input the PID and find your 16-bit Seed.  Open on RNGReporter and go to "Gen 3 Tools>16 bit seed to time".

Input your 16-bit seed from Findframes.  With the date/time we have, we'll want to go to "Pandoras Box", and input the date/time as listed into "16-bit seed to time".

We'll want to input our TID/SID and find the TID/SID Combo Frames lised.

```
Note: If you don't find a frame within your TID/SID, check all 8 SID combonation, as that also can make the egg shiny.
```

### VBA-RR Pokemon R/S TID/SID RNG
Before attempting this make sure VBA has:
- "Real-Time Clock" checked
- a BIOS File
- has "Skip BIOS" disabled

Run runasdate, and set the date like as given in the "16-bit seed to time".

Click on "Immediate Mode" and "Move the time foward according to the real time".  Browse for the VBA-RR and click "Open".  After this, VBA should start running.  We'll want to open our second game without a save to RNG the TID/SID Combo.

Play until the professor says "We'll see you in out Pokemon Lab", and wait for the target frame to appear.

When you get close to your target frame, press "Ctl+P" to pause the game, and press "Ctrl+N" to slowly advance frames until you reach the target frame.

Once done, make a savesate, and click "Ctrl+A+P" to press A and unpause at the same time.  Use PKHeX or lua to check your TID/SID.

### If you didn't get it

Don't worry - this is trial and error.Input the TID you got into "Pandoras Box", and exclude the SID/PID part.

This will show you what frame you landed on.  Take your original target frame and subtract the frame you landed on from it to find your new target frame.

Reload your game's savestate and repeat this process with your new target frame until the TID/SID combo is correct.

### Hatching the Shiny Egg

Play the game till you get you can trade between the two saves.

Trade the egg from the original save to the save you TID/SID RNG'd, and hatch the egg.

Congratulations!  Your egg should now be shiny!
