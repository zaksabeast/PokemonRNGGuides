/!\ Rough Draft for Breeding RNG in emerald /!\

Required :
- VBA
- Lua Script (https://www.dropbox.com/s/f3j6vfih6tpsjou/rng-egg-tracking-suite-emerald-kaphotics.lua?dl=0)
- RNG Reporter (trying on PokeFinder since got issues while trying with FRLG)
- Pkhex optional

Since Emerald no need to focus on seed.

Setup :
Deposit two pokemon (which you know ivs) in the daycare. First pokemon deposited = Parent A, second = Parent B.
Check the compability of the two parents.
Once done, walk until the step counter displays FE.
Save after that. 

Open RNG Reporter :
3rd Gen Time Finder => Emerald Shiny Egg.

Explaining Redraws / Calibration :
Redraws is helpful in this rng. You do that by openning a part in the menu like the Pokedex. 
Calibration is shown in the script and must match with rng reporter. HOWEVER. This can be off sometimes. So better to do a first calibration since it'll be the same always after.

Calibration in order to be sure : 
You just have to load the game pause it as soon you're in game. Enter the calibration shown by the tool and write the frame you're on (it's not to be 100% exact but gives an idea where to search)
Do a step while unpausing (aka you hold your move key while unpausing) and check the pid + nature. Once done enter the nature, a frame range AROUND what you've wrote for your frame and 0 of redraws.
If you see your PID : the calibration is correct.
If you don't see your PID : change the calibration in RNG Reporter. It'll around 17-21.
Once you've the calibration, keep it, i'll never change.
Reset the game to start your target rng egg.

RNG the PID : 

Back in RNG Reporter, enter all the informations you want for your egg. Once done, you'll have to do a frame difference fixed TO 18 frames in order to know on which frame to do the movement.
So : Frame Target - 18 = Frame you must move.

Launch your game, do the redraws if you need to do, and after go to your frame (ctrl+n) and do a step. You should have hit the PID wanted.

If so you can go outside and save in front of the old man for the second step.

RNG the IVs :

Move to the Emerald Egg IVs. Before anything else, enter your two parents IVs. You see that there's three kind of spreads :

Normal : You can hit them 100% safely.
Split : One half of the ivs are set on this frame while the other half is the next frame
Alternate : the most risky one, since it's can be compared to H-4 and you can not hit it or you can hit it while going for something else.

You should go for Normal OR split. Avoid alternate if you don't know what you're doing.

Generate frames, once your target selected there's a difference of frames like for PID, which is set to 4. 

/!\ With this lua, the counter resets at 65536, so you'll have to do target - 65536 if it goes higher. /!\

**note : getting an updated lua (from noob for example) would avoid that see if they're fine with that**

Once everything calculated, just reload your game (in front of the old man), and talk to him until the "Take good care of it" pops. Once in this screen, just advance to your CALCULATED frame and press A while emu paused.

You should be done.


why it doesn't work ?
Wrong calibration / redraws / compability for PID.
Hitting alternate / split for IVs.


Luv for this LONG rough draft
