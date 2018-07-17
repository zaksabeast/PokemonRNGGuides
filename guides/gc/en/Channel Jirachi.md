# How To Do Channel Jirachi

##This guide is emulator only

###What you need
- Dolphin of version > Dolphin 4.0 - 1170
- VBAM
- EU Pokemon Channel iso w/ completed save file (jirachi tab is available from options)
- R/S rom w/ save past E4 and open slot in party
- RNGreporter or PokeFinder

### Methods
There are two current methods
- Wait in game
  - Pro: Easy to hit spreads 
  - Con: Takes waiting time and SR
- RTC manip
  - Pro: Fast, instantly hit desired seed
  - Con: Not well understood and is not consistent across Dolphin / Computers
  
For this guide we will assume that the reader is waiting in game

### Explaination of RNG steps

Channel Jirachi's Generation has 3 main steps from leaving game:

- Pikachus leaving animation

When leaving pikachu plays one of a few animations, ex: watching tv or waving. This step is not understood other than it advances 1 to 11 frames.
There is a correlation between RNG value and which animation plays, but the process is not understood. The same RNG value chooses the same animation but that 
is all that is known.

- Main menu TV tab generation

Upon loading the main menu the game will then load each of the four tabs (Continue, New Game, Options, Special) in a random order. 
The pattern for this is too repeatedly advance and take PRNG >> 30 (0,1,2,3) until the game stores a 1, a 2, and a 3. 
The game can advance miniumum 3 frames to a statistical maximum of around 30 frames. 

[]example link

- Jirachi Flying animation

After hitting A on the Jirachi tab under Options on main menu, the game does a total of 6, 7 or 8 advances 






