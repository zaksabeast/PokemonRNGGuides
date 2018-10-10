
/!\ rough draft again /!\
You can copy on my FRLG guide for 90% of the part. This guide is BEFORE the update with Real's scripts

This guide is to cover Fixed Initial Seed in Gen 3 aka RS dry and Emerald.

Edited Rick's guide, not yet complete. -Subject


----
# Dead Battery Stationary Abuse (Ruby/Sapphire)
---

---
## Tools
---

- [VBA-RR](https://github.com/TASVideos/vba-rerecording/releases)
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [The Ruby/Sapphire Lua Scripts for your language](http://pokerng.forumcommunity.net/?t=56443955)
    - Password for the lua script archive is `allyouneedisnoob`

---
## Settings 
---
1. Vba-rr setup
- Make sure the save mode is set correctly.
    - Options > Emulation > Save Type > Automatic & Flash 128K
- Real Time Clock must be disbled in order to obtain dead battery seeds.
    - Options > Emulation > Real Time Clock
    - If there are errors when loading past the title screen, such as corrupted save or dead battery message, restart VBA for the changes to take effect.
- load the lua scritp.

2. Pokefinder uetup

- Launch Pokefinder and select stationary.
 - Select profile or input tid/sid information.
- All non-wild pokemon for Generation 3 pokemon are method 1.
- Input the intal seeds into Pokefinder.
 - "0" for emerald.
 - "5A0" for Ruby/Spharrie. 
- Search for a  spread and find the target frame.
![](pic of pokefinder example)

---
## Hitting the Desired Frame
---

1 Finding Delay

- Advance to the final screen before encountering the target Pokemon.
- Make a save state ~100 frames before the encouter.
![](pic of wait screen)
- When you land on your target frame press `A` and enter the encounter.
  - The Period key can be used to advance by one frame when paused.
- Take note of the IVs of the Pokemon you encounterd, they won't be the target pokemon's IVs. We will need to find a new Target Frame to get the correct Pokemon.

![](Pic of ivs)

- Open a new PokeFinder window and input IVs of the Pokemon encountered.
- To find the dely subtract the Hit Frame - Desired Frame.
- Your new Target Target Frame = Desired Frame - Delay

2. Encountering the Pokemon

- Reload the previous save state before the encounter.
- Advance to the new Target Frame.
 - If the pokemon is not the desired pokemon then find the new delay

![](pic of the pokemon) 

