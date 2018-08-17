# Gen 7 Mystery Gift RNG Guide

## Tools
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- PCalc
    - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/usum)
    - [Sun/Moon](https://pokemonrng.com/downloads/pcalc/sm)

Before continuing with the guide it is recommended to be in the first PokeCenter (the one by the Pokemon School) and standing directly in front of the Delivery Man.

## Final Screen
  - "You received xxx!"

![](https://i.imgur.com/wmpzsKN.png)

Make sure to stand exactly like the image above or the timeline may be off resulting in missing your target frame.    

## Step 1: Set Up 3DSRNGTool

1. In the upper right, input your game version and your TSV.
    - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Also in the upper right, input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the Shiny Charm box.

4. Make sure you are on the "Event RNG" tab in 3DSRNGTool.

5. If you have the WonderCard file (a .wc7) for the event you are RNGing, you can import that directly into 3DSRNGTool and have it automatically update the "Event Setting" area for you.
    - WonderCard files can be found [here](https://github.com/projectpokemon/EventsGallery).
    - Alternatively you can change the data yourself, but make sure it is correct for the event you are RNGing.


## Regarding Timeline and NPCs

In the Gen 7 games each NPC has an affect on the RNG frames. This is why the frames will not always advance by a constant number. In general, each NPC advances the frames by one, so an area with four NPCs will generally advance five frames each time. There is also Rotom and your character blinks that affect the frames advanced. 3DSRNGTool can accurately predict all of this if the timeline is created properly and allow you to land on your target frame without skipping over it due to NPCs.


## Step 2: RNGing the Pokemon

- Create a timeline following this guide: [Gen 7 Timeline Guide](https://pokemonrng.com/guides/usum/en/Timeline%20Guide.md)

- Advance to your target frame and when you land on it, press A to unpause the game and obtain the Pokemon.

Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again.

```
Note: You can view the Pokemon's info using PCalc. Press `Start + Right` to bring up the Party View window. `Select + Right` can be used to cycle through party members with the Party View window up.
```

## If you did not obtain the Pokemon you wanted

1. Double check that all info has been inputted correctly, especially the initial seed.

2. Restart the guide from the beginning and make sure to follow _all_ instructions given. Not getting the correct Pokemon is usually a result of user error.

3. Make sure you are creating a timeline correctly. Skipping a target frame is usually a result of not doing a timeline correctly.
