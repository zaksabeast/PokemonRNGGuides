---
title: 'How to use PokeFinder'
description: 'How to set up and use PokeFinder in order to RNG on BDSP'
slug: 'bk-bdsp-pokefinder'
subCategory: 'Basic Knowledge'
---

First, an important note. PokeFinder still doesn't have an official release for BDSP RNG. So even if the setup will be used for every guide in the future, at the moment, it's more safe to use it only for Egg and TID / SID RNG. Evertyhing will be updated following the official release of it.

Link : https://ci.appveyor.com/project/Admiral-Fish/pokefinder
**You MUST download a recent enough PokeFinder. Before the 6aab415 commit from the 12.09.2021, PokeFinder handled states in another way. Using another build would make this guide wrong and could mess up all your RNG. So download the most recent version**

PokeFinder is the universal RNG Tool. For that guide we'll focus on the Gen 8 Tab when you launch it.

Even if it's useful for Eggs, it's important to set up your profile. For that on the main menu. Click on "Gen 8 Tools" and then Profile Manager. Create your profiles for BDSP. The TID / SID wanted is not the G7/G8TID one. So for example, with Pkhex, you'll have to hover on the TID/SID infos to have the valid numbers.

**An important note about how States works with PokeFinder and how to fill them :
PokeFinder uses only 2 states. If you use the luas for Yuzu / Ryujinx, you can just input Seed 0 & Seed 1 the same way.
However CaptureSight uses 4 states. To not make things too confusing, you'll just have to input the Seeds in order. It means :**

**However CaptureSight uses 4 states. To not make things too confusing, you'll just have to input the Seeds in order. It means :**
- **Seed 0 of PokeFinder = Seed 0 and Seed 1 of CaptureSight**
- **Seed 1 of PokeFinder = Seed 2 and Seed 3 of CaptureSight**

Once the tab opened for your desired RNG, don't forget to check the "Use Delay" and input the delay matching the values shown in our guides.

(Later on, it'll be necessary to explain in detail how to use the filters for Stationary and Wild)
