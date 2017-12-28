# FRLG Stationary/Gift RNG
_aka how to get a Shiny Mewtwo 101_

## Requirements ?
You'll need the same stuff as for Wild RNG. Or almost :
- VBA-rr (the 23.6 is really the best in order to use it with Gen 1 or 2 scripts but any rr supporting lua scripts will do the job)
- Lua scripts for FRLG (available [here](https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239) you'll need to copy the code, paste it to a notepad and rename the file into 'hatyouwant.lua')
- How to deal with Memory Viewer
- RNG Reporter
- Your TID / SID
- A Calculator and a notepad
- A way to read your save.

### Setting up all the tools

First, open RNG Reporter. You'll just need to set up your TID/SID. For stationary gifts, the method is the method 1, so by default.

```
Bulbasaur, Charmander, Squirtle, Clefairy, Abra, Hypno, Voltorb, Electrode, Hitmonlee, Hitmonchan, Scyther, Pinsir, Magikarp, Lapras, Eevee, Porygon, Omanyte, Kabuto, Aerodactyl, Snorlax, Articuno, Zapdos, Moltres, Dratini, Mewtwo, Togepi, Lugia, Ho-Oh, Deoxys.

Of course some of them are available in wild too.
```

After that you'll need to open your emulator. You should have a save in the place you want to RNG the Pokemon in order to save time and avoid to miss any target frame. Load your Lua Script too. This can vary, but for vba-rr 23.6, you'll find everything in "Tools" => "Lua Scripting" => "New Lua Script". A box will pop-up where you'll be able to select the lua you just created.

Once the game is loading just enter into the "continue" menu. Here you should pause the game to find your Seed. FRLG use that to generate different spreads every time you load the game and to avoid problems like dry battery in RS. This has the big advantage to give you new results every time you load your game.

To find your seed, you must open the Memory Viewer. A lot of information will show up. You need to search the address at 0x02020000. In order to find it just put "02020000" in the box in the upper-right. Hit Go and you'll be done !
