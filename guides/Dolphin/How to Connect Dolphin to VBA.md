---
title: 'Connecting Dolphin to VBA'
description: 'RNG a Jirachi or transfer your RNGs to a GBA game'
slug: 'misc-dolphin-connect-vba'
subCategory: 'Emulator'
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

![](https://i.imgur.com/SkW6FLW.png?1)

2. Click configure and select the bios file to be used

![](http://imgur.com/90PX5wX.png?1)

3. Specify gamecube link

![](http://imgur.com/i5CBXxB.png?1)

3. Start the network link

## Step 2: Setup Dolphin

1. Change port 2 to GBA

![](http://imgur.com/kRKtIVz.png?1)

## Step 3: Making the connection

1. When prompted by the gamecube game to turn on your GBA, you need to [import the battery file](http://imgur.com/O9SIcLf)

```
Note: If the connection isn't made immediately, you can try restarting the game or reimporting the battery file. If the connection is made but you get an error, just keep trying.
```

2. After some resetting, [it will work](http://imgur.com/73hIBIT)
