# Trainer ID RNG
_RNG for that special TID/SID/TSV_

## Requirements
A new save file is needed to RNG the Trainer ID, Secret ID, or Trainer Shiny Value. If a save file is already present then it can be deleted by pressing `X+Y+Down` on the d-pad while at the title screen. This will delete the current save file and begin the game at the language select screen. Make sure to back up your save file using a save file manager such as [JKSM](https://github.com/J-D-K/JKSM) or [Checkpoint](https://github.com/BernardoGiordano/Checkpoint) if you ever want to return to your previous save file.

```Note: A CFW 3DS is needed for this RNG. Luma3DS and B9S is the recommended setup.```



### Tools
- [PCalc for X/Y](https://pokemonrng.com/downloads/pcalc/xy)
    - Make sure your game is updated to 1.5 for PCalc to work
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts)
 - (Optional) A network connection


### 3DSRNGTool Setup
- In the upper right hand corner select your game version and click the "Advance" option.
    - Seed and TSV can be blank.
- In the ID tab fill in your desired TID, SID, or TSV.
- 3DSRNGTool can search for multiple numbers in part or in full.
	- Finding a specific TID/SID/TSV combination will be very rare. It is advised to only RNG for one or the other.


In this example we will be getting the highlighted TID.

## Game Setup
- Load BootNTR Selector, then the game.
- Select game language.
- Play the game until this screen appears.

this is the final screen to press yes.

### Tiny Seeds
- In order to rng our TID/SID/TSV we must look at the tiny seeds instead of frames passed. Each time the tiny seeds advance to the next set of tiny seeds a TID/SID/TSV frame advancement happens. 
In X/Y the tiny seeds will constantly advance thoughout the introducton. They will advance at a random pace but will be in a consitent order that 3dsrngtool can predict.
Due to this constant advancement it is possible to miss your wanted tiny seeds. To minimize the possablity of missing the required tiny seed, it useful to use PCalc's pause and single frame advancement options. 

```
Note: Trainer Data generation happens some time during a cut scene the last input. This causes a slight delay that will need to be adjusted for.It is cover later in the guide.
```
  
-
 
### Filling In Data

- 3dsrngtool has a tool to automacticlly fill in the tiny seeds but it requires a network contection between the 3DS and 3dsrngtool.
If having a network connection is not possible then manually fill in the tiny seeds.```

- To fill in the tiny seeds automacticlly do the following sets otherwise continue to the next step after filling in the tiny seeds.
	- Press the home button and wait for the internet to connect.
	- In 3DSRNGTool go to Tools -> RNG Helper.
	- Fill in IP address.
    - The IP address can be found on the Rosalina screen once Input Redirection is enabled.
	- Open the Rosalina menu by pressing `L+down+select` and enable Input Redirection on the 3DS.
	- Click "One Click" to connect in RNG Helper window within 3DSRNGTool.


- This will fill in the tiny seeds.
		
- Press "Calculate" in the main window to receive a list of possible frames that you can RNG for.
- Increase or decrease range as needed.
- If the target frame is too high or the TID/SID/TSV combination is not possible on your inital seed then reboot the system to start over with a different inital seed.
	- Rosalina can quickly reboot the system by pressing `L+Down+Select` and selecting the reboot option.

``` Note: Soft resetting the game will hard lock the system!```
- let the tiny seeds advance while on the final screen. 
- Pause the game using `combo` to compare the tiny seeds in 3dsrngtool every few minutes. 
- To keep track how far a long the tiny seeds have advanced. Fill in the tiny seeds in 3dsrngtool and press calculate to update the 3dsrngtool list.
	- If NTR helper is still running then pressing blah will automacticlly fill in the current tiny seeds in 3dsrngtool.
- Once the wanted TID/SID/TSV is ~15 frames away from the current seed pause the game.
- Advance the frames and tiny seeds by press 'combo' while the game is paused.
	- Sometimes the seeds won't change on every input, so just continue pressing the buttons until they do.
- When on the correct seed, press ' combo' to make sure you hit the right tiny seed.
- Wait untill you can control your character to check your trainer data. PCalc can display the information by pressing "combo"
	

## Cut Scene Delay

- As stated earlier the acutall trainer data is generationed during a cut scence while the tiny seeds are still advancing. This causes a delay about 7-10 frames. This delay is different for every game and system. So stoping several frames before the acutal seed may be needed.
To find the delay for your game and system do mutiple dry runs on low seed advancemnts. If there is a constant delay then use that for acutall TID/SID/TSV RNG.
