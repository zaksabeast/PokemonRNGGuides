---
title: 'Connecting Dolphin to VBA'
description: 'RNG a Jirachi or transfer your RNGs to a GBA game'
slug: 'misc-dolphin-connect-vba'
subCategory: 'Gamecube'
---

```
Note: This link is very unstable. It does not work 100% of the time due to timing inconsistencies with the two emulators. Your computer's specs play a role in if/how often the connection works.
```

## Tools

- [VBA-M](https://sourceforge.net/projects/vbam/)
- Dolphin 5 (other versions _may_ work, dolphin comes out with new versions multiple times a week)
- GBA bios ([responsible for the nintendo logo on startup screen](http://imgur.com/byn7Kfb))
- Obviously a GBA and GC game that can connect
  Here are the settings you'll need to change in VBA-M.

### Games this is compatible with

- Colosseum Bonus Disc
- Pokemon Colosseum
- Pokemon Channel
- JPN Colosseum Bonus Disc
- JPN Pokemon Colosseum
- Pokemon XD Gale of Darkness

## Step 1: Setup VBA

1. Go to GBA options and check "use bios file"

![Setup Bios](../../images/Tools-and-Emulators/VBA-to-Dolphin/Setup.png)

2. Click configure and select the bios file to be used

![Select Bios](../../images/Tools-and-Emulators/VBA-to-Dolphin/Setup-2.png)

3. Specify gamecube link

![Gamecube Link](../../images/Tools-and-Emulators/VBA-to-Dolphin/Gamecube-Link.png)

3. Start the network link

## Step 2: Setup Dolphin

1. Change port 2 to GBA

![Change Port](../../images/Tools-and-Emulators/VBA-to-Dolphin/Change-Port.png)

## Step 3: Making the connection

1. When prompted by the gamecube game to turn on your GBA, you need to import the battery file.

![Import Battery](../../images/Tools-and-Emulators/VBA-to-Dolphin/Import.png)

```
Note: If the connection isn't made immediately, you can try restarting the game or reimporting the battery file. If the connection is made but you get an error, just keep trying.
```

2. After some resetting, it will work.

![Success](../../images/Tools-and-Emulators/VBA-to-Dolphin/Success.png)
