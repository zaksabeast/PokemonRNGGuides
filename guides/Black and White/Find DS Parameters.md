---
title: 'How To Find DS Parameters in Generation 5'
description: 'Get your DS Parameters for Generation 5 RNG'
slug: 'emulator-bw-find-ds-parameters'
subCategory: 'Emulator'
---

## Tools

- Desmume
  - [Setup Desmume for RNG](https://www.pokemonrng.com/desmume-setup)
- [RNG Reporter](https://github.com/Admiral-Fish/RNGReporter/releases)
- [RunAsDate](https://runasdate.en.softonic.com/)

## Things To Know

Finding your DS Parameters is **MANDATORY**. There are no RNGs you can do without finding these parameters. As such, you should get comfortable with doing this procedure. (Though you only have to do it once per save/console/emulator.)

## The RNG Process

1. DS Parameters Search

- Open RNG Reporter and click on 5th Gen Tools -> Find DS Parameters.
- Choose your game version and language.
- Set the Seed Encryption Variables to the below:

  - DS Type: Lite/Original
  - DS Mac Address: 0009BF123456
  - VCount: 10-70
  - Timer0: 300-1200
  - GxStat: 6-6
  - VFrame: 0-15

- Unlike on consoles, DeSmuMe's DS MAC Address is always 0009BF123456.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_4.png?raw=true)

If you cannot find a seed using the above values, double check that everything is correct. If so then you can extend the values to the below:

- VCount: 0-FF
- Timer0: 0-FFFF

- As a note, using the above extended values will take a long time to search through.

2. The Seed

- Open runasdate and type in any time. Make sure to check the Immediate Mode.
- Input the same time in the DS Parameter Finder.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_2.png?raw=true)

- Now hit "Run" on runasdate and load your rom.
- Open your lua script and do not do any keypresses. Copy the seed you get and paste it into the DS Parameters finder.

![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_3.png?raw=true)

- Click Search and wait for the search to finish.
- When you get a result, click on "Send Results to Profile".

Good luck on your future RNGS!

- **Note: You may have to redo this process if you change emulation settings, saves, or redownload the emulator.**
