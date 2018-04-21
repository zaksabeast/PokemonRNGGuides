# Ultra Sun/Ultra Moon SOS RNG Abuse

## Tools
- Console with CFW
- [3DSRNGTool](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts)
	- Github link: https://github.com/wwwwwwzx/3DSRNGTool
- PCalc
    - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/usum)
    - [Sun/Moon](https://pokemonrng.com/downloads/pcalc/sm)
- [BootNTR Selector](https://gbatemp.net/threads/release-bootntr-selector.432911/)
    - Mode 3 for o3ds/2ds

## Recommended reading/references
- [SOS Call call info sheet] (https://github.com/wwwwwwzx/3DSRNGTool/blob/master/Data/SOSCall.md#sos-call)
- [SOS call rates] (https://pastebin.com/W59vsi0H)
- [Encounter slots] (https://gist.github.com/SciresM/a539739085e24af55dffdf443cb70eb2)

## Regarding SOS RNG
SOS RNG consists of calls to two different processes:
	- Main RNG - IV spread, nature, gender and PID(shininess).
	- G7 SFMT (32bit) - Encounter slot, call success, level
		- This is the RNG that will allow you to RNG that 1% Salamence
		
There are also two "types" of calls for help to consider:
	- Two Pokemon on the field and one is KO'd
	- Last call failed and you need to use an item to get them to call for help
	
This RNG is best used to get shiny Pokemon since a chain of 31 will allow you to shoot for PID re-roll blocks of 13-15 depending on whether you have the `Shiny Charm`. The SOS chain length has an effect on being able to get Hidden Abilities as well. You can shoot for individual frames but will not be likely to hit them. 

With that noted, the two types of SOS calls will result in different delays and you will need to calculate both. While progressing up to the desired chain length you can try to find the delay that is most consistent for each call type. 

## Step 1: Set Up 3DSRNGTool
1. In the upper right, input your game version and your TSV.
    - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Also in the upper right, input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the Shiny Charm box

## Step 2: Find the SOS Pokemon and setup Misc. RNG Tool
1. You can either wander around until you find the correct Pokemon to SOS or you can RNG it.

2. Once in the encounter open the Tools menu on the 3DSRNGTool and select Misc. RNG Tool

3. Open the Extended Game View using `B + Up` and in the bottom right of the window you will find the SOS Init seed and the SOS Curr seed, put this info into the relevant fields in the Misc. RNG Tool window

4. You will also want to find the info on Call Rate and enter that in for the Pokemon you are SOSing

5. Press Search button to see results and lets examine what we see. On the Misc RNG Tool results window you will see a few different fields and the meaning of each will follow:
	- Frame - this is the SOS frame which starts at 0 and advances based on each turn
	- Adv. - This is the amount of frames that will advance after the turn(this will be higher when a successful call occurs)
	- SOS - This field has multiple values separated by '/'
		- The first "field" is for the Pokemon to call in(When detail checkbox is not checked the first two fields are not separated)
			- When detail checkbox is not checked a O means it will call
			- When detail checkbox is checked it will show a number which is used to determine that call([Call formula](https://github.com/wwwwwwzx/3DSRNGTool/blob/master/Data/SOSCall.md#1-calls-for-help-rand--100--rate1-pass))
		- The second field is for the new Pokemon to appear(When detail checkbox is not checked the first two fields are not separated)
			- When detail checkbox is not checked a O means it will appear
			- When detail checkbox is checked it will show a number which is used to determine if an ally appears([Ally appears formula] (https://github.com/wwwwwwzx/3DSRNGTool/blob/master/Data/SOSCall.md#2-ally-appears-rand--100--rate2-pass))
		- The third field is for the lead(Synchronize/Static/Magnetic/Pressure/Hustle/Vital Spirit/Cute Charm)
			- O = success
		- The fourth field is for Encounter slots
			- W1 - Weather slot 1(1%)
			- W2 - Weather slot 2(10%)
			- Slot 1-7: 1% / 1% / 1% / 10% / 10% / 10% / 67%
		- The fifth field is the Level(Level - Rand % (max - min + 1))
		- The sixth field is the held item
		- The seventh field is the IVs being bumped
		- the eighth field is the Ability
			- NA = Normal Ability
			- HA = Hidden Ability
```
Note: Some of these fields will be used in the guide and some will not but should be self-explanatory
```

## Step 3: Finding the delay

At this point you would be best off waiting until you have a longer SOS chain for better odds and increased IVs before trying your ideal target. This is a good opportunity to work on finding the delay for the different "types" of SOS calls.

1. First we will want to go ahead and get everything set up for your SOS such as Leppa Berry and Harvest, Adrenaline Orb, Sync, etc...

2. As you are going through this process make sure to keep the Length and Frame updated as well as any of the rest of the relevant options on the main window and the Misc. RNG tool window

![](https://imgur.com/lCImw6r.png)

3. Find what frame you are currently using the Extended Game View window of PCalc

4. Once you've found your frame you can figure out if your call will be successful if the first two values shown are 'O'. If not you can tell which value you will land on next by looking at the Adv. field. If your call fails make sure to check the `Last Call Failed` field before searching

![](https://imgur.com/nmVQdYA.png)

5. Once you've found a frame that will trigger an encounter you will want to find the frame on the main RNG that you want to hit. So switch to the main 3DSRNGTool window and put in your current frame as the starting frame and put in a valid range.

![](https://imgur.com/4mFk9bh.png)

6. Choose a random target or just any frame you are one as individual frames could be hard to hit as the frames advance inconsistently in battle. At this point trigger the last input for the turn.
	- If two Pokemon are on the field the delay will be longer and the final input will be hitting `A` while targeting a Pokemon
	- If no Pokemon is on the field the delay will be shorter and the final input will be hitting `A` while hovering over `Use`

![](https://imgur.com/F30gSrn.png)

7. Once the Pokemon appears you will need to find out the frame you actually hit by using the stats of the Pokemon that appeared. I did this by setting the delay to 0 and searching for the frame I actually hit and adjusting based on the Shift/f value from the frame you hit. Then adjusting from there to get the frame I actually hit to match the frame I pressed `A` on. 

![](https://imgur.com/EW0NzcZ.png)

8. Do steps 3-7 a number of times and keep track of your results and once you get to a point where you are getting more shiny frames in a block you can try for your actual target(might as well max IVs and PID rolls out at 31 chain)
	- I hit 56, 58, 62 so I was comfortable using 58 as my delay for the item path

## Step 4: Getting your SOS target

1. To find the desired target you will want to make sure you can hit your desired Encounter slot, Sync and/or HA. To do this you will want to navigate to the SOS2 tab and select the encounter slot, whether you want sync success and if you want HA.

2. Now enter in all the relevant info on the SOS tab to determine what frames will be successful. 

3. Now you can search for your target by entering what you are looking for in the filters and hitting calculate. You will want OO in the first field.
```
Note: If you are going for a hard target such as a 1% encounter you can try to play with some frames as you get close to manipulate success by using Intimidate or Super Effective moves. 
```
![](https://imgur.com/XlDbzIh.png)

4. When you've landed on your target SOS frame it is now time to find your target. You will want to make sure you have all the relevant info filled out in the 3DSRNGTool main window. **Don't forget to set the delay for the right SOS call type!**

5. Then set up the filter for your target
	- Be cognizant of the IVs you can set for this based on the seventh field(should look something like VVXVVX)

![](https://imgur.com/nS0Mp4n.png)

6. Set up your game to the point that it is ready for the final input

![](https://imgur.com/9zlYM9B.png)

7. When you get close to your target pause and advance your frames until you are in the middle of the bunch of frames and enter the final input.

![](https://imgur.com/CPGbpbp.png)

Congrats! You should now have the Pokemon you wanted. If not, knock it out figure out why and try again.

![](https://imgur.com/m6kHHrr.png)

## If you did not obtain the Pokemon you wanted

1. Double check that all info is correct on the two windows especially the Init and SOS seeds.

2. Restart the guide from the beginning and make sure to follow _all_ instructions given. Not getting the correct Pokemon is usually a result of user error.

3. Make sure you are using the correct delay based on the type of SOS call.