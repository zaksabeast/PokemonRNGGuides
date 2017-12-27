# Island Scan
_Easy shinies in apricorn balls_

## Preparation

### Make sure you have the following
- PCalc for your desired game
  - [PCalc-sm](https://pokemonrng.com/downloads/pcalc/sm) (Sun/Moon)
  - [PCalc-usum](https://pokemonrng.com/downloads/pcalc/usum) (Ultra Sun/Ultra Moon)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- The `honey` item
- Have started an `Island Scan` and know the Pokemon you've scanned for
  - [List of Island Scan islands and days for SM](/tools/en/island%20scan%20pokemon%20-%20sm.md)

```
Note: You can get the "honey" item in any store after clearing three trials.
```

### Setup PCalc

To start, make sure PCalc's wild view and game view are open.

```
In PCalc, "start + left" will open the wild view, and "start + up" will open the game view.
```

### Setup 3DSRNGTool

Open up 3DSRNGTool, then follow these instructions to set it up properly:

#### In the upper right of 3DSRNGTool

1. Type the `Init Seed` PCalc shows into the `Seed` box in 3DSRNGTool
2. Change the `Game Version` dropdown to be the game you're currently playing
3. Change `TSV` to be your game's TSV
4. If you have the shiny charm, make sure the `Shiny Charm` box is checked

```
Note: You can find your TSV in PCalc by going into the party view with "start + right", then press "select + right" until you get to the screen that says "YOUR TSV".  That value is your TSV.
```

#### On the left of 3DSRNGTool

1. Click the `Wild RNG` tab
2. Change the `Category` dropdown to say `Island Scan`
3. Change the `Pokemon` dropdown to be the Pokemon you are targeting

#### On the right of 3DSRNGTool

1. Follow the [timeline calibration guide](https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen7-Timeline-Calibration-(PokeCalcNTR-Only)) using the `NPC Count` PCalc shows for the number of NPCs
2. You should now have a target frame you wish to hit


#### In the middle of 3DSRNGTool
1. Change the IVs to be the the Pokemon you want to RNG for
2. If you want a shiny Pokemon, make sure the `Shiny Only` box is checked

```
Note: If you don't care about IVs, leave all of the ranges to be from 0-31.
```

### The RNG

If you've been following the guide step by step, you should now:
- Have made a timeline
- Have a target frame
- Be standing in the area you want to catch your Island Scan Pokemon in
- Have the `honey` item

```
If one of these is not true right now, you need to start the guide over.  Moving the location of your character will mess up the RNG.
```

#### Hitting your target frame

1. Press `X` to open up the in game menu
2. Hold your game's cursor on the `bag` option
3. Watch the `Frame` counter on PCalc
  - When the `Frame` counter is close to your target frame, press `start + select` to pause the game
  - Press `select` to slowly advance the frames to your target frame
4. Once you have reached your target frame, press and hold `A` to have PCalc unpause the game while you enter the bag
5. Find and use the `honey` item to start a wild encounter
6. If the Pokemon you ran into was not the Island Scan Pokemon, try again
  - This should not happen too many times

```
Note: If you paused the game too early, you can press "start" to unpause the game.
```
