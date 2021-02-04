---
title: 'How To Find DS Parameters in Generation 5'
description: 'Get your DS Parameters for Generation 5 RNG'
slug: 'emulator-bw-find-ds-parameters'
subCategory: 'Emulator'
---

## Tools

- [Latest Build of RNG Reporter](https://ci.appveyor.com/project/Admiral-Fish/rngreporter/build/artifacts)
- [DeSmuMe Dev Build](https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download)
- Lua .dlls
  - [x86 .dlls](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
  - [x64 .dlls](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- Pokemon BW or BW2 .nds files (You can dump the carts yourself using a CFW 3DS with Godmode9)
- [The Lua Scripts corresponding to your rom's language](http://pokerng.forumcommunity.net/?t=56443955)
     - Password is `allyouneedisnoob`.
- [RunAsDate (Optional)](https://runasdate.en.softonic.com/)

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
  
![](https://github.com/ShinySylveon04/PokemonRNGGuidesPics/blob/main/Screenshot_1.png?raw=true)
     
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

* **Note: You may have to redo this process if you change emulation settings, saves, or redownload the emulator.**
