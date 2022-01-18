---
title: 'Wild RNG'
description: 'Wild RNG'
slug: 'emulator-bw-wild'
subCategory: 'Emulator'
isRoughDraft: true
---

Requirement :

- The game's profile (other guide)
- Desmume
- Lua scripts (noob forum)
- RNG Reporter
- Encounter Slot page
- Chattot with chatter
- Sweet Scent / Honey

/!\ There's a problem with the lua / rng reporter and PIDRNGFrame. You'll have to count one frame LESS ALWAYS compared to RNG Reporter. If Reporter gives a target frame at 100. You need to up your PIDRNGFrame to 99 on the script /!\

The huge difference in gen 5 is that the RNG is divided in two parts : the PIDRNG Frame and the IVRNG Frame. The first control Shiny, Nature, Gender etc while the other focus only on IVs

Setup :

go to the route you want WITH THE SCRIPT ALREADY ON. This will allow you to check if the map is noisy or not, which is a huge point of Gen 5 RNG.
Once you have your route / target in mind, just save an close your game.

Open RNG Reporter, and open the 5th gen time finder.

Stay on Capture, select your game profile and now time to explain the meaning of the 2 methods that are interesting for us :

- IVs (Standard Seed) : Will allow you to check for a good IVRNG Frame. You can check the "Search for a Nearby Shiny Frame" to allow this IVs Frame to be Shiny
  Note : We'll ignore IVs (C-Gear Seed) since more used for other methods
- PIDRNG : Will allow you to find for a PIDFrame, but you'll not know the linked IVs Frame. You'll be able to see it on the main window and choose the IVs Frame that suits you well AFTER.

For the Encounter Type, select your method. Special Encounters like Bubbling Spot / Shaking Grass will be covered in an other guide.

Select your options, even if IVs Seed is more interesting. Once done, enter your parameters in both case but you can't search for IVs in PIDRNG while you can use filters for the PID in IVs (Standard Seed)
Hit generate.

Here's how to advance PIDRNG or IVRNG Frame :

For PID :

- Chattot same as Gen 4. With Chatter they'll +1 every time you check their profile
- Saving the game (more useful for specific case like Starters)
- NPC advancement (really hard but can be abused with weather which allows you to up to crazy amount of PIDFRNG Frame in a few seconds)

For IVs :

- Doing 128 Steps will up your IVRNG Frame count of X which X is the amount of Pokemon in your team. If you have 6 Pokemon in your team, doing 128 steps will up the IVRNG Frame to 7 (1 of base + 6 from your team)
- Storing a pokemon in the pc up the IVRNGFrame by 7
- Battling a Pokemon (but not really reliable since it ups in crazy amount like weather for PID)

Once you have your target, find the date / time corresponding and use runasdate.exe (guide linked) or any other method you like.

The Seed should be good without doing anything. If wrong, recheck your parameters (profile / runasdate)

Go as fast as possible in game and open the menu.

Advance the frames the way you want. Don't forget the -1 for PIDRNGFrame difference and use sweet scent / honey.

/!\ DON'T HESITATE TO ABUSE OF SAVE STATES ESPECIALLY ON NOISY AREA /!\

Tada, you should have your Shiny.

ofc it was the easy part. Here comes the hard and BORING part.

You got your Shiny if you were in a quiet area. But Gen 5 has a AWFUL problem. During Sweet Scent / Honey animation, if the area is noisy, PIDRNGFRame WILL CONTINUE TO ADVANCE.
So you'll not get what you want if you hit the sc / honey on your target frame.

And for that there's no miracle solution. You need to adjust / calibrate until your find your Shiny.

/!\ However. Fishing doesn't advance PIDRNGFrame, so you can fish without any problem. /!\
