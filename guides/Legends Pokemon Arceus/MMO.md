---
title: 'MMO RNG'
description: 'How to RNG MMOs using Sysbot and PermuteMMO'
slug: 'sysbot-lpa-mmo'
subCategory: 'Sysbot'
---

```
Introduction : MMO RNG is one of the most basic RNG on Legends Arceus. This guide will try to explain how to setup PermuteMMO, how to get your desired files in order to use PermuteMMO in an effective way and then to RNG a MMO with basic infos. This guide will assume that you have sysbot set up correctly. 
```

## Requirements

- A CFW Switch with the IP of it and sysbot
- The "main" file (your save) of Legends Arceus
- PermuteMMO from Kaphotics
- [MMO Data Dumper](https://github.com/SteveCookTU/mmo_data_dumper/releases/tag/v0.1.0) from EzPzStreamz 

To setup everything well, put the MMO Data Dumper on the same folder as PermuteMMO. That way the necessary files will be updated at the right place without having to do anything. Put also your main file in the PermuteMMO folder. It'll allow to calc the right Shiny Rolls for each species saving you a lot of time and trouble.

## Setup

* In your game, check that if a MMO is available (or multiple MMOs)
* Stay in Jubilife City, and pause the game (Home menu for example) since we'll not have to go on it until RNGing but it's important to have your Switch working with Sysbot
* Run MMO Data Dumper. For that, you'll need to open a CMD in your folder (type 'cmd' before the directory path in the location box on Windows Explorer), and then type "{file_name} {ip}" where '{file_name}' is your file name ('mmo_data_dumper.exe' by default) and '{ip}' is the ip of your switch. if done well, you'll see two files on your PermuteMMO folder. mo.bin and mmo.bin
* Now just run PermuteMMO. if everything has been done correctly, you should see all the data for your MMO(s) and all the potential Shiny. Find your target and it's time to RNG it.

```
Introduction : MMO is not friendly with skittish Pokémon. Some tips does exist but it'll be challenging. If you're starting, try to focus on aggressives target. You still can save and try to reset if you fail at any point. However it's useless to re-run the dumper tool once in the map. Just save on the village, try it and if failed, start from start.
```

## RNG

The RNG process more is just an explanation of every wording of PermuteMMO. As you saw on the tool you have a list of tasks to do which all are shown by a letter and a number like 'A3'. Here's the meaning, since the number always indicate an amount of Pokémon to despawn in multi battles.

* A means aggressive advances. The easiest one. A4 means to trigger a battle with 4 Pokémon and defeat them all.
* B means beta advances. It combines Skittish and Aggressive Pokémon
* O means oblivious advances. It's a nice case with Mr. Mime, Lickitung line and Magikarp. they can't be multibattled with theirself and can't run away. O2 would mean to defeat 1 Oblivious Pokémon and 1 Aggressive Pokémon.
* S means Scaring Advances. It's for skittish Pokémon. Pretty much, when a skittish Pokemon is cared, a ! in red will show up. As soon as you see them running away, you need to fast travel to a distant place.
* G means Ghost Spawns. It applies when only 4 Pokemon are left in the current wave. If you see G3 you need to despawn 3 Pokemon (multi-battle isn't necessary), move far away, and come back.
* CR (which doesn't have any number) just means to clear the remaining Pokemon to trigger the second wave if necessary.

If everything was followed correctly, your target should show up at the right time !