---
title: 'Dream Radar RNG in Generation 5'
description: 'RNG Level 5 Dream Ball HA Legends'
slug: 'emulator-b2w2-dream-radar'
subCategory: 'Emulator'
---

## Tools

- Desmume
  - [Setup Desmume for RNG](https://www.pokemonrng.com/desmume-setup)
- [RNG Reporter](https://github.com/Admiral-Fish/RNGReporter/releases)
- [Suloku's Gen V Save Tool (Optional)](https://github.com/suloku/BW_tool/releases)
  - Alternatively, you can extract your BW2 save file after obtaining the Pokemon you wish to RNG from the Dream Radar if you rather not inject.

```
Note: You may have noticed a "Dream Radar" tab in RNG Reporter. During the time of this guide being written, that tab does not work. Therefore, this guide will explain an alternate method of finding seeds and desired IV/Nature combinations.
```

## Step 1: Finding a spread

1. Open RNG reporter and go to "Gen 5 Time Finder". Stay on the "Capture" tab and adjust the settings accordingly.
2. Set IVs to what you want, Encounter Type is "Wild Pokemon", and the method is "IVs (Standard Seed)".
3. The IVs frame range depends on what Pokemon you are RNGing. For the Therian Trio (Tornadus, Thundurus, Landorus) set the minimum IV frame to 21. For the other Pokemon the minimum IV frame is 8. Maximum frame can be whatever you prefer.
4. Hit search and wait for results to show.

![](https://snag.gy/iTgKX3.jpg)

If you are going for a Generation 4 Legendary or a random Pokemon, target even IV frames, but if you are going for a Therian-Forme, target odd IV frames.

## Step 2: Finding a nature (Optional)

You may notice that Time Finder has not listed nature for Dream Radar. To get the nature we will hit by using a frame, we will go to the main RNGReporter screen and select "Gen 5 PIDRNG".

Unfortunately, you cannot control Dream Radar nature, only predict it. To find the nature we will get, we use a formula.

For example, if I want this:

![](https://snag.gy/JpIxYQ.jpg)

I will take the seed and get the initial PIDRNG Frame for it using the button on RNGReporter.

- This button will appear on the right when you have selected Gen 5 PIDRNG.

### Therian Trio

    - (Your IVFrame (The one in Time Finder) - 21) / 2 = Number of required Advancements

    - Initial PIDRNG Frame + 7 + Advances required = PIDFrame you will hit

### G4 Box Legends and Gendered Pokemon

    - (Your IVFrame - 8) / 2 = Number of required advancements

    - Initial PIDRNG Frame + 2 + (2 * advances required) = PIDFrame you will hit

### Genderless Pokemon

    - (Your IVFrame - 8) / 2 = Number of required advancements

    - Initial PIDRNG Frame + 1 + (2 * advances required) = PIDFrame you will hit

## Step 3: RNGing the Pokemon

1. Use Key System's "Send and Receive Keys" function to frame advance
   - Each time you start the "Send and Receive Keys" search, it will advance both the PIDRNG and IVRNG Frames by 2.
2. Obtain your Pokemon

In the example below, we have a dream ball hidden ability Landorus!

![](https://snag.gy/pBY8Hc.jpg)
