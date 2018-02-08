# Trainer ID RNG
_RNG for that special TID/SID/TSV_

## Requirements
A new save file is needed to rng the Trainer ID, Secret ID, or Trainer Shiny Value. If a save file is already present then it can be deleted by pressing X+Y+Down on the d-pad while at the title screen.`
This will delete the current save file and begin the game at the language select screen. Make sure to back up your save file using a save file manager such as [JKSM](https://github.com/J-D-K/JKSM) or [Checkpoint](https://github.com/BernardoGiordano/Checkpoint) if you ever want to return to your previous save file.

```Note: A CFW 3DS is needed for this rng. LUMA3DS and B9S is the recommend setup.```


 
### Tools
- [PCalc](https://gbatemp.net/threads/pokecalcntr-for-gen-6-the-rng-tool-suite-for-the-3ds.473221/) for your version of the game
    - Make sure your game is updated to 1.4 for Pcalc to work
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases).
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts).
 - (Optional) A network connection
 
 
### 3DSRNGTool Setup
- In the upper right hand corner select your game version and click the "Advance" option.
    - Seed and TSV can be blank 
- In the ID tab fill in your desired TID,SID or TSV.
- 3DSRNGTOOL can search for multiple numbers in part or in full.
	- Finding a specific TID/SID/TSV combintation will be very rare. It is advise to only RNG for one or the other.
	
![](https://i.imgur.com/ZchDZmq.png)

In this example we will be getting the highlighted TID.

## Game setup
- Load BootNTR Selector, then the game
- Select game language
	 - The bot used later on can be used for this part by selecting `Mash A` option if setup early
- Continue to play the game until this screen appears

![](https://i.imgur.com/FTlLDkp.png)

### Advancing the frames
Every time `no` is selected when confirming name, one frame advancement happens. This can be a tedious task to complete manually, especially the higher the target frame is. A bot can be used to automatically do the frame advancement. If having a network connection is not possible then manually fill in the tiny seeds.
- Press the home button and wait for the internet to connect
- In 3DSRNGTOOL go to tools -> rng helper
- Fill in IP address
    - The IP address can be found on the rosalina screen once InputRedirection is enabled
- Open the rosalina menu by pressing `L+down+select` and enable InputRedirection the 3ds
- Click "one click" to connect in RNG Helper window within 3DSRNGTool.

![](https://i.imgur.com/q3iJXsU.png)

- This will fill in the tiny seeds
  - This information can be manually imputed
- Press "Calculate" in the main window to receive a list of possible frames that you can RNG for.
- Increase or decrease range as needed.
- If the target frame is too high or the tid/sid/tsv combo is not possible on your seed then reboot the system to start over with a different seed
	- Rosalina can quickly reboot the system by pressing `L+down+select` and selecting the reboot option

``` Note: Soft reseting the game will hard lock the system!```

In RNG Helper window fill in the starting and ending frame. The speed of the bot will be dependent on the stability of the 3ds to your computer. Increase or decrease the speed of the bot to your liking. At this point you can use the bot to advance the frames, or do it manually. The bot will stop at 1 frame before the target frame. From there just name your character and confirm the selection. Wait until you can control your character to check if you got your tid/sid/tsv correct.

```Press Start+Right then Select+Left to view TSV in the seventh party slot.```

![](https://i.imgur.com/ZDdZ4VN.png)
![](https://i.imgur.com/fBzZhqg.png)

