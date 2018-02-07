# Trainer ID RNG
_RNG for that special TID/SID/TSV_

## Requirements
A new save file is needed to rng the trainer id, secrete id, or trainer shiny value. If a save file is already present then it can be deleted by pressing the following:
`Down on the d-pad while holding x+y on the title screen`
This will delete the current save file and begin the game at the language select screen. Make sure to back up your save file using a save file manager such as [JKSM](https://github.com/J-D-K/JKSM) or [Checkpoint](https://github.com/BernardoGiordano/Checkpoint) if you ever want to return to your previous save file.

```Note: A cfw 3ds is needed for this rng. Luma3ds and b9s is the recommend setup.```


 
### Tools
- [PCalc](https://gbatemp.net/threads/pokecalcntr-for-gen-6-the-rng-tool-suite-for-the-3ds.473221/) for your version of the game
    - Make sure your game is updated to 1.4 for Pcalc to work
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases).
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
- [BootNTR Selector](https://github.com/Nanquitas/BootNTR/releases).
    - Use non-mode 3 version
 - (Optional) A network connection
### 3DSRNGTOOL Setup
- In the upper hand corner select you game version, click advance option
    - Seed, and tsv can be blank 
- In the ID tab fill in your desired tid, sid or tsv
- 3DSRNGTOOL can search for multiple numbers in part or in full
	- Having a specific combo will be very rare


## Game setup
- Load Bootntr selector, then the game
- Select game language
	 - The bot used later on can be used for this part by selecting `Mash A` option if setup early
- Continue to play the game until the name selection screen

### Advancing the frames
Every time `no` is selected when confirming name, one frame advancement happens. This can be a tedious task to complete manually, especially the higher the target frame is. A bot can be used to automatically do the frame advancement. If having a network connection is not possible then skip to the second point and continue from there.
- Press the home button and wait for the internet to connect
- In 3dsrngtool go to tools -> rng helper -> fill in IP address
    - The IP address can be found on the rosalina screen once InputRedirection is enabled
- Open the rosalina menu by pressing `L+down+select` and enabling InputRedirection the 3ds
- Click one click connect in 3DSRNGTOOL
-This will fill in the tiny seeds
- This information can be manually imputed
- Press calculate to receive a list of possible frames to reach the desired results
- Increase or decrease range as needed.
- If the target frame is too high or the tid/sid/tsv combo is not possible on your seed then reboot the system to start over with a different seed
	- Rosalina can quickly reboot the system by pressing `L+down+select` and selecting the reboot option

``` Note: Soft resting the game will hard lock the system!```

In RNG Helper window fill in the starting and ending frame. The speed of the bot will be dependent on the stability of the 3ds to your computer. Increase or decrease the speed of the bot to your liking. At this point you can use the bot to advance the frames, or do it manually. The bot will stop at 1 frame before the target frame. From there just name your character and confirm the selection. Wait until you can control your character to check if you got your tid/sid/tsv correct.

` Press start+right to go to trainer info to see sid/tsv using Pcalc`

