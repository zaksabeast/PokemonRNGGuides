---
title: 'Time Finder (Citra)'
description: 'Time Finder (Citra)'
slug: 'emulator-usum-time-finder'
subCategory: 'Emulator'
---

```
Introduction : This guide will focus on the most power tool of CitraRNG : TimeFinder. Like for Gen 3, Gen 4, Gen 5 and Gen 6, there's a way to use the time at our advantage and be able to hit any desired Initial Seed for better targets without SRing, and being able to re-do any RNG if failed. This guide will assume that CitraRNG is setup, and some basic knowledge of Citra RNG even if not really necessary.
```

## Requirements

- Citra and CitraRNG
- 3DSTimeFinder

## Setup

* Open Citra and set your RTC to any date you want. Write it down somewhere since you'll need it.
* Launch your game and CitraRNG. Go to Gen 7 Tab, update the initial seed and write it down too.

## Calibrationa and Profile Generation.

* Open 3DSTimeFinder and go to Tools => Gen 7 Profile Calibrator.
* Select the game you're trying to calibrate (SM or USUM)

```
Note : The offset / tick value by default will not match. It has been found on specific old Citra builds that change all the time. They are suggestions. If you want to save some time, you can use these values for Citra Nightly 1543 only, my personal Citra for the past 3years+ which is quite flawless : 4470937 (Offset) / 56 (Tick)
```

* In the Tick Range, put something like 10, no need of more.
* In the Offset Range, put a big number. I suggest 50 000 000. It should help to find a value.
* It'll take some time but you'll find a result. It's your result. You can now create a profile based on these values.

```
Note : Because of daylight saving, the chances that you don't find any result on the actual hour is important. However it doesn't mean you're doing it wrong. You'll need to adjust by one hour (+ or - 1) and retry until getting a result.
```

```
Note : Note that if you find a result for Ultra-Sun, Ultra-Moon will have the same profile. So you can just copy it and duplicate it for Moon without searching.
```


## How to use Gen7TimeFinder

This part will be shorter. If you're used to TimeFinder, it works the same. You select the right category in the main tab (Wild, Stationary, Event or TID / SID) and then input all the criterias you want in order to find results in game. **Be sure to have selected the right profile**, and then just search for spreads.

You'll have to adjust the time range to find rarer spreads, but it should help you a lot to find what you want in an easy way. 

```
Note : If you want to use that for SOS, you'll need to search with the Stationary tab by taking care of the long frame waste during setting up everything
```

Once a result is found, write the date / time down.


## How to hit any Initial Seed

Now you have found your target's Initial Seed, just open Citra and put the desired RTC in the RTC box. Then save and just run the game. It should have the desired Initial Seed !

```
Note : Once again, because of daylight saving, you might have not the right initial seed. You'll need to adjust by one hour (+ or - 1) and relaunch the game and CitraRNG to see if it worked.
```