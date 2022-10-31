---
title: 'Live Battery TID/SID RNG'
description: 'RNG for a specific TID/SID combination with more options than dead battery'
slug: 'emulator-rs-live-battery-tid'
subCategory: 'Emulator'
---

```
Note: This guide will help you obtain cool TIDs for your RNG purposes. If you do not care about TID, I recommend that you do Dead Battery TID/SID Abuse, as it has far fewer steps and is much simpler.
```

## Tools

- [VBA-RR](https://code.google.com/archive/p/vba-rerecording/downloads)
- Lua .dll files
  - [x86 lua.dll](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
  - [x64 lua.dll](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [The Ruby/Sapphire Lua Scripts for your language](http://pokerng.forumcommunity.net/?t=56443955)
- [Decimal to Hex Converter](https://www.binaryhexconverter.com/decimal-to-hex-converter)
- [runasdate (Optional)](https://runasdate.en.softonic.com/)

## Step 1: Decide on a Shiny Spread (Optiona0)

If you have no intent on getting a Shiny Pokemon and/or don't care about IVs on the given Shiny, you may skip this step.

1. Open to PokeFinder and go to Gen 3 Tools. Go to the "IV to PID" and select your desired IVs and nature combo. Make sure that the correct Method for your target exists. You should have a screen like this:

![Setup](../../images/Ruby-Sapphire/Live-Battery-TID/Setup.png)

2. Put your desired TID in the ID box and note the SID it also gives.

## Step 2: Finding your Initial Seed

1. Go to this [website](https://www.binaryhexconverter.com/decimal-to-hex-converter)
2. pen PokeFinder
3. On the website, input your TID that you want
   - I want 02332, so I put in 02332 and get 91C
4. Put that in the PID to IVs option under Generation 3 tools
5. Take the SID listed in PID From IVs and convert it as well
   - Since I want 46392, I input that and get B538

![Hex](../../images/Ruby-Sapphire/Live-Battery-TID/Hex.png)

6. Go into PokeFinder's Generation 3 Tools tab and enter PID to IVs. Put the two hexadecimal combos into PID to IVs. (Make sure to put TID first, then SID) If you get a Method 1 Spread, you have a valid ID combo. If you get a non-method 1 spread, just add 1 to your SID and reconvert it to hex until you get a valid one.
7. Now take the seed it gives and go to Generation 3 Tools ----> 16-Bit Seed To Time. Enter the seed in the box and make sure the year is set to 2000. Hit search and you will get some dates. The seed will change to a 4-digit/lettered seed, which is your initial seed.

## Step 3: Hitting your Initial Seed

1. Open runasdate and enter the time in 16-Bit Seed to Time. (Any of the results will work) Make sure you set Immediate Mode. Also be aware that runasdate uses a 24 hour clock, not AM/PM.
2. Once loaded, pause the game and go to PokeFinder's Stationary screen. Search for the IVs you got in the PID to IVs tool. The resulting frame is the frame you are aiming to hit.
3. Now hit Run and enter the game. Get to the screen where the Prof. Birch tells you he'll see you later. Advance to the Frame listed in RNGReporter and make save states along the way. You will miss your frame most likely.

![Final Screen](../../images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png)

Advance Frames on the screen above

## Step 4: The Delay

Frames pass by between when you hit A and when the TID/SID is generated. You will need to find how many frames pass by.

1. Go to the IDs function in PokeFinder
2. Put your Initial seed and TID that you recieved in and find what frame you hit
3. Now adjust accordingly
   - For example, if I wanted to hit frame 89103 but hit Frame 89175, my delay was 72, which means I need to hit A 72 Frames early

```
Note: If your TID / SID are swapped, go one frame earlier
```

Enjoy your new TID!

Here is an example of a successful ID RNG:

![Success](../../images/Ruby-Sapphire/Live-Battery-TID/Success.png)
