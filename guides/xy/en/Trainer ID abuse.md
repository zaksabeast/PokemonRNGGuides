# Trainer ID RNG
_RNG for that special TID/SID/TSV_

## Requirements
A new save file is needed to RNG the Trainer ID, Secret ID, or Trainer Shiny Value. If a save file is already present then it can be deleted by pressing `X+Y+Down` on the d-pad while at the title screen. This will delete the current save file and begin the game at the language select screen. Make sure to back up your save file using a save file manager such as [JKSM](https://github.com/J-D-K/JKSM/releases) or [Checkpoint](https://github.com/FlagBrew/Checkpoint/releases) if you ever want to return to your previous save file.

```Note: A CFW 3DS is needed for this RNG. Luma3DS and B9S is the recommended setup.```

### Tools
- [PCalc for X/Y](https://pokemonrng.com/downloads/pcalc/xy)
    - Make sure your game is updated to 1.5 for PCalc to work
     - [Here](https://pokemonrng.com/guides/tools/en/How%20to%20Install%20PCalc.md) is guide on how to install PCalc for all 3DS games
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts)
 - (Optional) A network connection

### 3DSRNGTool Setup
- In the upper right hand corner select your game version and click the "Advance" option.
    - Seed and TSV can be blank.
- In the ID tab fill in your desired TID, SID, or TSV.
- 3DSRNGTool can search for multiple numbers in part or in full.
	- Finding a specific TID/SID/TSV combination will be very rare. It is advised to only RNG for one or the other.
	
[](pic of 3dsrngtool)

In this example we will be getting the highlighted TID.

## Game Setup
- Load BootNTR Selector, then the game.
- Select game language.
	- N3DS users can run the game at N3DS speeds using L2+ clock in the Rosalina menu options. This will speed up the game while pcalc is running.
- Play the game until this screen appears.
- Pause the game by pressing `Start+Select` while hovering over "no"
 - This is to get stop the tiny seeds from advancing and to make sure yes isn't selected.
 
[](pic of final game selection)

this is the final screen to change character selection.

### Tiny Seeds
In order to RNG our TID/SID/TSV we must look at the tiny seeds instead of frames passed. Each time the tiny seeds advance to the next set of tiny seeds a TID/SID/TSV frame advancement happens. 
In X/Y the tiny seeds will constantly advance throughout the introduction. They will advance at a random pace but will be in a consistent order that 3DSRNGTool can predict.
Due to this constant advancement it is possible to miss your wanted tiny seeds. To minimize the possibility of missing the required tiny seed, it useful to use PCalc's pause and single frame advancement options. 

```
Note: Trainer Data generation happens some time during a cut scene and the last user input. This causes a slight delay that will need to be adjusted for. It's cover later in the guide.
```
### Filling In Data
3DSRNGTool has a tool to automatically fill in the tiny seeds but it requires a network connection between the 3DS and 3DSRNGTool.
If having a network connection is not possible then manually fill in the tiny seeds.

- To fill in the tiny seeds automatically do the following steps otherwise continue to the next step after filling in the tiny seeds.
	- Press the home button on the 3DS and wait for the internet to connect.
	- In 3DSRNGTool go to Tools -> RNG Helper.
	- Fill in IP address.
		- The IP address can be found on the Rosalina menu screen if Input Redirection is enabled. Input Redirection is not needed but it's a quick way to see the IP address. To open the Rosalina menu screen press `L+down+select` on the 3DS.
	- Click "One Click" to connect in RNG Helper window within 3DSRNGTool.
	[](pic of ntr helper)
	- This will fill in the tiny seeds.		
- Press "Calculate" in the main window to receive a list of possible frames that you can RNG for.
- Increase or decrease range as needed.
- If the target frame is too high or the TID/SID/TSV combination is not possible on your initial seed then reboot the system to start over with a different initial seed.
	- The Rosalina menu can be used to quickly reboot the system by pressing `L+Down+Select` and selecting the reboot option.

``` Note: Soft resetting the game will hard lock the system!```

## Tiny Seed Advancement
- Unpause the game by pressing `Start`
- Let the tiny seeds advance while on the final screen.

[!](final screen pic)

- Pause the game using `Start+Select` to compare the tiny seeds in 3DSRNGTool every few minutes. 
- To keep track how far a long the tiny seeds have advanced. Fill in the tiny seeds in 3DSRNGTool and press "Calculate to update the 3DSRNGtool list.
	- If NTR Helper is still running then pressing blah will automatically fill in the current tiny seeds in 3DSRNgTool.
- Once the wanted TID/SID/TSV is about 15 frames away from the current seed pause the game using `Start+Select`while .
- Advance the frames and tiny seeds by press 'Select' while the game is paused.
	- Sometimes the seeds won't change on every input, so just continue pressing the button until they do.
- When on the correct seed, hold `A` to make sure you un pause at that extact frame to hit the right tiny seed.
	- There is a delay that needs to be accounted for here, it is covered in the next section.
- Wait until you can control your character to check your trainer data. 
[](pic of trainer card/tsv)

```Note: PCalc can display TSV information by pressing `Start+Right` and then `Select+Left` ```
	

## Cut Scene Delay
As stated earlier the actual trainer data is gene during a cut scene while the tiny seeds are still advancing. This causes a delay, about 7-10 frames from the target. This delay is unique for every game and system. So stopping several frames before the actual seed may be required to reach the right TID/SID/TSV. To find the delay for your game and system do multiple dry runs on low seed advancements. If there is a constant delay then use that for actual TID/SID/TSV RNG.
