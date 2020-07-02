---
title: 'SOS RNG'
description: 'One of the most challenging Gen 7 RNGs with fun rewards'
slug: 'retail-usum-sos'
---

## Tools

- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- PCalc
  - [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/pcalc-usum.zip)

## Recommended reading/references

- [SOS call rates](https://pastebin.com/W59vsi0H)
  - Can Ctrl + F for Pokemon wanting to SOS.
- [Encounter slots Ultra Sun](https://gist.github.com/SciresM/a539739085e24af55dffdf443cb70eb2)
- [Encounter slots Ultra Moon](https://gist.github.com/SciresM/deecdcf5fc49fc8191a29d111643c6b6)
  - Can Ctrl + F for Pokemon wanting to SOS.

## Regarding SOS RNG

SOS RNG consists of calls to two different processes:

- G7 SFMT (32bit) (the SOS RNG) - Encounter slot, call success, level.
  - This is the RNG that will allow you to RNG that 1% Salamence.
- Main RNG - IV spread, nature, gender and PID (shininess).

There are also two "types" of calls for help to consider within the SOS RNG:

- Two Pokemon on the field and one is KO'd.
- Last call failed and you need to use an item to get them to call for help.
  - This type of call is the more stable one for delays and the recommended one to use for RNG.

This RNG is best used to get shiny Pokemon since a chain of 31 will allow you to shoot for PID re-roll blocks of up to 13-15 frames if you have the `Shiny Charm`. The SOS chain length has an affect on being able to get Hidden Abilities as well. You can shoot for individual frames but will not be likely to hit them.

With that noted, the two types of SOS calls will result in different delays. While progressing up to the desired chain length you can try to find the delay that is most consistent for each call type.

```
Note: It is recommended to set up for the SOS chaining first before starting the RNG process. Having the Pokemon on low health and the Adrenaline Orb used will increase the chances of an SOS call being successful.
```

## Step 1: Set Up 3DSRNGTool

1. In the upper right, input your game version and your TSV.

   - With PCalc, you can find your TSV by pressing `Start + Up` to bring up the Game View window. Your TSV is listed by where it says `YOUR TSV`.

2. Also in the upper right, input the initial seed. You can find this by pressing `Start + Up` to bring up the Game View window. The initial seed is found where it says `Init Seed:`.

3. If you have the Shiny Charm check the `Shiny Charm` box.

## Step 2: Find the SOS Pokemon and setup Misc. RNG Tool

1. You can either wander around until you find the correct Pokemon to SOS or you can RNG it.

   - A guide to Gen 7 wild RNG can be found [here](https://pokemonrng.com/guides/usum/en/Wild%20RNG/).

2. Once in the encounter open the "Tools" menu on 3DSRNGTool and select "Misc. RNG Tool". Switch the RNG type to "G7 SFMT (32bit)" and choose the "SOS" tab.

![](https://cdn.discordapp.com/attachments/453736908854394902/471784402154946561/unknown.png)

3. Within PCalc, you can open the Extended Game View by using `B + Up` while the Game View window is open. Press `Down + B` to reset the SOS information within PCalc.

   - If the SOS Init Seed is all 0's, you must press `Down + B` during the first turn of battle to have the SOS information show correctly.

4. In the bottom right of the PCalc window you will find the `SOS Init seed`.

   - `SOS Init seed` - This goes in the box for "Seed" within the Misc. RNG Tool on 3DSRNGTool.

5. You will also want to find the info on "Call Rate" and enter that in for the Pokemon you are SOSing.

   - This info can be found [here](https://pastebin.com/W59vsi0H).

6. Fill in rest of the info in the SOS tab as needed.
   - HP should be set to what the current caller's HP level is.
   - Check `Adrenaline Orb` if you have used an Adrenaline Orb.
   - If there is weather effects such as rain check the `Weather` box.
   - If your Pokemon currently out has the Intimidate, Unnerve, or Pressure ability check the `Intimidate` box.
   - If the ally Pokemon that was called was hit with a super-effective attack on the first turn it appeared, then check the `Super Effective` box.

```
Note: The "Same Caller" box should be checked as long as the Pokemon that does the SOS call is the same as last turn. If it faints and the other Pokemon calls for help, then uncheck the box.
```

5. Press "Search" button to see results and let's examine what we see.
   - On the Misc RNG Tool results window you will see a few different fields and the meaning of each will follow:

![](https://my.mixtape.moe/yqjfkk.png)

`Frame | Adv. | SOS | Rand#`

`SOS: call? new Pokemon? / lead / encounter slot / level / held item / IVs at 31 / Ability`

- Frame - This is the SOS frame which starts at 0 and advances based on each turn.
- Adv. - This is the amount of frames that will advance after the turn (this will be higher when a successful call occurs).
- SOS - This field has multiple values separated by '/'.
  - The first value is for the Pokemon to call in.
    - A `O` means it will call.
    - A `X` means it will not call.
  - The second value is for the new Pokemon to appear.
    - A `O` means a new Pokemon will appear.
    - A `X` means a new Pokemon will not appear.
  - The third value is for the lead (Synchronize/Static/Magnetic/Pressure/Hustle/Vital Spirit/Cute Charm)
    - `O` means ability for lead Pokemon will be a success.
    - `X` means failure for ability of lead Pokemon to work.
  - The fourth value is for Encounter slots
    - W1 - Weather slot 1 (1%)
    - W2 - Weather slot 2 (10%)
  - Slot 1-7: 1% / 1% / 1% / 10% / 10% / 10% / 67%
- The fifth value is the Level
- The sixth value is the held item
- The seventh value is the IVs being bumped
  - IVs that will be 31 show up as `V`.
- The eighth value is the Ability
  - NA = Normal Ability
  - HA = Hidden Ability
- Rand# - This will be the SOS Curr Seed for that specific SOS frame.

```
Note: Some of these fields will be used in the guide and some will not but they should be self-explanatory.
```

## Step 3: Advancing SOS Frames

At this point you would be best off waiting until you have a longer SOS chain for better odds and increased IVs before trying your ideal target. This is a good opportunity to work on finding the delay for the two different "types" of SOS calls.

1. First we will want to go ahead and get everything set up for your SOS such as Leppa Berry and Harvest, Adrenaline Orb, Sync, etc.

2. You can find what SOS frame you are currently on using the Extended Game View window of PCalc.

3. After each battle turn, make sure to update all the relevant info in 3DSRNGTool based on what occured that turn.
   - In Misc. RNG Tool: SOS "Length", SOS "Frame", "Last Call Failed", "Super Effective", "Same Caller"
   - In main window: "Frame" (for current SOS frame), "Chain Length"

![](https://imgur.com/lCImw6r.png)

4. After inputting all of the needed info you can now figure out if the SOS call will be successful or not for the upcoming SOS frames.
   - If the first two values shown in the SOS column are `O` then the call will be successful.
   - If not, then you can tell which value you will land on next by looking at the Adv. field.
   - If your previous call failed make sure to check the `Last Call Failed` field before searching again.
   - To filter for what frames will be a successful call, you can check the `Success Only` box and then "Calculate".

![](https://imgur.com/nmVQdYA.png)

5. Once your current SOS frame will trigger an encounter on the next SOS call (has `O` for first two values) you will want to use it to calibrate for the main RNG delay.
   - You can advance SOS frames by using an Adrenaline Orb (this has no effect if already used one and item will not be consumed) or by knocking out the non-caller Pokemon.

```
Note: Pay attention to the SOS Current Seed shown in PCalc and compare to what it should be in the Misc. RNG Tool window (Rand#) for the SOS frame you are on.

Sometimes SOS frames do not advance as predicted and will throw off results if not corrected. If the SOS Current Seed does not match, then find the SOS frame in Misc. RNG Tool that matches the SOS Current Seed that PCalc shows. Adjust the SOS frame as needed in both Misc. RNG Tool and the main window.

As of this time, fishing SOS RNG is not as accurate as wild SOS RNG and almost every time will result in SOS frame advances not being predictable.
```

## Step 4: Finding the Main RNG delay

### Fill out the main window of 3DSRNGTool

1. Choose the "Wild RNG" tab and check the "SOS Call" box. Choose the correct "Location".
2. Make sure to select "Day" or "Night" depending on the time in your game.
3. In "Wild Encounter Setting" the "Seed" box is for the Initial SOS seed. This should be the same seed as the SOS Initial seed in Misc. RNG Tool.
4. In "Wild Encounter Setting" the "Frame" box is for your current SOS frame. This should be the same frame as the SOS "Starting Frame" in Misc. RNG Tool.
5. Choose the correct dropdown for the "Lead" box if you have a Pokemon in the lead with one of those abilities.
6. "Chain Length" is for your current SOS chain length. This should be the same number as the SOS "Length" in Misc. RNG Tool.
7. Choose the correct dropdown for "Weather" if there are weather affects in play for the battle.

### Find the frame on the main RNG for the Pokemon you want

1. Switch to the main 3DSRNGTool window and input your current main RNG frame as the starting frame.
2. The current main RNG frame can be found by pressing `Start + Up` to bring up the Game View window in PCalc if it is not already up.
3. Then press `Start + Select` to pause the game and use the number after `Frame:`.

![](https://imgur.com/4mFk9bh.png)

### Choose a random main RNG frame to attempt to hit for calibration

1. Right click on your chosen frame and choose "Set as Target Frame".
2. After that you can then trigger the last input for the turn on that frame. - If two Pokemon are on the field the delay will be longer and the final input will be hitting `A` while targeting a Pokemon. - If only one Pokemon is on the field the delay will be shorter and the final input will be hitting `A` while hovering over `Use` on the Adrenaline Orb.

![](https://imgur.com/F30gSrn.png)

### Finding your hit frame

Once the Pokemon appears you will need to find out the frame you actually hit by using the stats of the Pokemon that appeared.

1. You can do this by setting the delay to 0 and searching for the frame that was actually hit and adjusting based on the Shift/F value from the target frame.
2. Then adjust the number in the `Consider Delay` box to get the frame you actually hit to match the frame you pressed `A` on.
3. If there are no results, then the SOS frame inputted was not correct. Double check that everything matches between 3DSRNGTool and PCalc (especially SOS frame and Rand#) before trying again.

```
Note: If you are not finding the IVs for the Pokemon you got, double check that SOS frame was correct. Not having the correct SOS frame in the main window will not show the correct results for the Pokemon you got.
```

```
Note: Frame from Pokemon's stats - Target Frame = Delay
```

```
Note: You can find out what the Pokemon's stats are by pressing Start + Left to bring up the Wild Pokemon view and then switch which Pokemon to view with Select + Right.
```

![](https://imgur.com/EW0NzcZ.png)

## Step 5: Repeat to find consistent delay

1. Repeat steps 3 and 4 a number of times and keep track of your results.
2. Once you get to a point where you are getting more shiny frames in a block you can try for your actual target (might as well max IVs and PID rolls out at 31 chain)
3. You can either go for your most common delay, or choose the middle of them if they're consistent.
4. For example if the delays are `56, 58, 62` 58 would be safe to use since in a block of frames there's a good chance will hit one of them.

## Step 6: Getting your SOS target

1. To find the desired SOS target you will want to make sure you can hit your desired Encounter Slot, Sync and/or HA. To do this you will want to navigate to the "SOS2" tab and select the encounter slot of the Pokemon you are wanting, whether you want sync to be successful or not, and if you want HA.

2. Enter in all the relevant info on the "SOS" tab to determine what SOS frames will be successful.

   - You can filter for successful SOS frames by checking the `Success Only` box.

3. Now you can search for your target by entering what you are looking for in the filters and hitting "Calculate".
   - You will want `OO` as the first two values for the SOS call to be successful.

```
Note: If you are going for a hard target such as a 1% encounter you can try to play with some frames as you get close to manipulate success by using Intimidate or Super Effective moves.
```

![](https://imgur.com/XlDbzIh.png)

4. When you've landed on your target SOS frame it is now time to find your main RNG target frame.

   - You will want to make sure you have all the relevant info filled out in the 3DSRNGTool main window.
   - **Don't forget to set the delay for the right SOS call type!**

5. Then set up the filters for your target Pokemon.
   - Be aware of the IVs you can set for this based on the seventh value in the Misc. RNG Tool (should look something like VVXVVX).

![](https://imgur.com/nS0Mp4n.png)

6. Set up your game to the point that it is ready for the final input.

7. When you get close to your target pause and advance your frames until you are in the middle of the bunch of frames and enter the final input.

![](https://i.imgur.com/OUKPvlC.png)

Congrats! You should now have the Pokemon you wanted.

![](https://imgur.com/m6kHHrr.png)

## If you did not obtain the Pokemon you wanted

1. Double check that all info is correct on the two windows. Sometimes the Initial Seed is not typed in correctly, or SOS Frame is not correct.

2. Restart the guide from the beginning and make sure to follow _all_ instructions given. Not getting the correct Pokemon is usually a result of user error.

3. Make sure you are using the correct delay based on the type of SOS call. Additionally, each type of SOS call may have multiple delays associated with it. As mentioned previously in the guide, you can either go for your most common delay, or choose the middle of them if they're consistent.
   - For example if the delays are `56, 58, 62` 58 would be safe to use since in a block of frames there's a good chance will hit one of them.
