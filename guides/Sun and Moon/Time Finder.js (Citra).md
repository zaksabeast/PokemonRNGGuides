---
title: 'Time Finder (Citra)'
description: 'Finding times to get specific RNG seeds'
slug: 'emulator-sm-time-finder'
subCategory: 'Emulator'
---

## Requirements

- Citra and CitraRNG
- 3DSTimeFinder

## Intro

This guide shows how to use TimeFinder.js with CitraRNG. You can harness time to hit the desired Initial Seed without soft resetting and redo RNG attempts. This guides assumes basic CitraRNG knowledge.

## Setup

1. Open Citra and set your RTC to any date you want. Write it down somewhere since you'll need it.
1. Launch your game and CitraRNG, and go to Gen 7 Tab.
1. Update the initial seed and write it down too.

## Calibration and Profile Generation

The default offset and tick values won't match. These values change depending on the version of Citra you're using and are only suggestions. For example, Citra Nightly 1543 has an offset of 3730114 and tick of 55.

1. Open 3DSTimeFinder and go to Tools => Gen 7 Profile Calibrator.
1. Select the game you're trying to calibrate (SM or USUM).
1. In the Tick Range, put a small number like 10.
1. In the Offset Range, put a big number, such as 50,000,000.
1. It'll take some time but you'll find a result. Once you find the result, create a profile based on these values.

```
Note: Because of daylight saving, the chances that you don't find any result on the actual hour is important. However it doesn't mean you're doing it wrong. You'll need to adjust by one hour (+/- 1) and retry until getting a result.
```

```
Note: If you find a result for Sun, Moon will have the same profile, so you can just copy it for each game.
```

## Gen7TimeFinder

Gen7TimeFinder is an alternate to TimeFinder.js.

To find desired results, select the category (Wild, Stationary, Event, or TID/SID) and input your criteria in the main tab. Make sure the correct profile is selected and search for spreads. Adjust the time range for rarer spreads.

For SOS battles, use the Stationary tab. Keep in mind there will be lots of RNG advances during setup, so find a target that is quite a ways out.

Once you find a result, record the date and time.

## Hitting Any Initial Seed

To achieve your target Initial Seed, input the desired RTC in Citra, save, and run the game.

```
Note: Due to daylight saving, you may need to adjust the time by +/- 1 hour and relaunch the game and CitraRNG to ensure it worked.
```
