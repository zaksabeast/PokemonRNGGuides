# Trainer ID RNG
TID RNG for Gen 6-7 can be mind-numbing and tedious. You are required to manually advance 1 frame at a time with name entry and rejection. This demands alot of patience and requires your close attention. Meanwhile automation can provide you with a bit of relief when advancing frames, but searching for TID+TSV combos is almost impossible and finding a reasonably close spread can also take a while.

Luckily, Gen 6 provides a fix-all solution to these issues with automatic frame advancement. Yes, that is right. In Pokemon X/Y, frames advance automatically. This means instead of manually advancing to your target frame you can search for your TID (or TSV/SID-- whatever), you can wait for it to come to you!

## Requirements
A new save file is needed to RNG the Trainer ID, Secret ID, or Trainer Shiny Value. If a save file is already present then it can be deleted by pressing `X+B+Up` on the d-pad while at the title screen. This will delete the current save file and begin the game at the language select screen. Make sure to back up your save file using a save file manager such as [JKSM](https://github.com/J-D-K/JKSM) or [Checkpoint](https://github.com/BernardoGiordano/Checkpoint) if you ever want to return to your previous save file.

Note: A CFW 3ds is needed for this RNG. Luma3DS and B9S is the recommended setup.


### Tools
- [PCalc for X/Y](https://pokemonrng.com/downloads/pcalc/xy)
    - Make sure your game is updated to 1.4 for PCalc to work
    - **new 3ds can be overclocked to help reduce delay**
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
    - Latest compiled version including latest commits can be found [here](https://ci.appveyor.com/project/wwwwwwzx/3dsrngtool/build/artifacts)
    - (Reccommended) A network connection + NTR Helper
      - Note: It is highly reccommended you have an internet connection, as it is not possible to automatically update tiny states using NTR Helper without one.


### 3DSRNGTool Setup
- In the upper right hand corner, select your game version (X/Y)
- In the ID tab, fill in your desired TID, SID, or TSV. **In this example we will be getting the highlighted TID.**
    - Seed can be blank
    - 3DSRNGTool can search for multiple numbers in part or in full
- In the RNG info section, **leave minimum frame range at 0** and adjust your maximum frame range as desired

![]()

## Game Setup
- Load BootNTR Selector, then the game
  - *If you are using an old 3ds, don't forget to `Enable Debugger` in NTR Menu by pressing `X+Y`*
- Select game language
- Continue to play the game until this screen appears and pause (Start+Select)

![]()

- Open NTR Helper & connect your 3ds
  - In the top left of 3DSRNGTool, go to Tools -> NTR Helper
  - Fill in IP address
    - The IP address for your 3ds can be found on the Rosalina screen once Input Redirection is enabled (Note: if you have no plans to futher utilize this feature, it is recommended you disable it after you have found your IP address).
  - Click "One Click" to connect in the RNG Helper window. **This will fill in (or update) your tiny states.**
    - Optional: this information can be manually filled in instead

  ![]()

### Searching For Your Target Frame
- Press "Calculate" in the main window to **receive a list of possible target frames** that you can RNG
  - If the target frame is too high or the TID/SID/TSV combination is not possible on your seed then reboot the system to start over with sequentially different intial seeds.
- Once you find something you want, write it down your target frame and update your maximum frame range with it
  - **Leave minimum frame range at 0-- this is your current frame!!**
  - Note: In order to land on your target frame, you will need to find your delay. This requires a dry run or two.

    ![]()

### Advancing Frames
The "frames" in 3DS RNG Tool keep track of 4 values known as "tiny states". In the context of TID RNG, X/Y uses a 128-bit PsuedoRandom Number Generator(PRNG) known as TinyMT. **Tiny states are intial values which the game uses to generate trainer info such as TID, SID, and TSV.** With these 4 values, RNG Tool is able to predict sequential states, as well as their expected results from the TinyMT PRNG.

**Everytime your tiny states change your game advances +1 frame**. This results in the potential generation of another TID, SID, and TSV combination. As tiny states change over time, 3DS RNG Tool tracks these sequential changes using a frame counter.

The NTR Overlay frame counter, on the other hand, is based off the main PsuedoRandom Number Generator (PRNG) used in Gen 6. When paused and manually advancing frames, pay attention to this counter. They increase consistently at 2 frames per advance. This can help you stay on track with your tiny seeds.

### Checking & Updating Your Target Frame
- Manually update your tiny states or press the "One Click" button in the RNG Helper window to automatically update them
- Press "Calculate" in the main window to update your target frame
  - Make sure the `[x] Disable filters` checkbox is checked off!

### Hitting Your Target Frame
- Once you are approaching your target frame, pause the game (`Start+Select`), check your current frame, and update maximum frame range
- Carefully approach ~
- Uncheck the `[] Disable filters` checkbox so you can see everything and start advancing manually towards your target frame
  - Check tiny states (on both RNG Tool and PokeCalc NTR) to confirm your frame advancements
- Land on target frame and firmly press A
- Check if your TID/SID/TSV is correct
  - Press `Start + Right` then `Select + Left` to view TSV in the seventh party slot.

![]()
![]()


### Finding Your Delay
There is a brief loading screen between the bird-in-the-bed custscene and the generation of your trainer info which results in a delay. Depending on which DS model you have, your delay will vary. It is typically ~4-8 frames. 

To find your delay:

  - Increase your maximum frame range by ~16
  - Find which frame you actually hit
    - Look at the TID, SID, and/or TSVs to confirm
    - Make sure the `[x] Disable filters` checkbox is checked off!
  - Subtract your target frame from the frame you ended up with to find your delay
  - Rinse and repeat (set up your game+RNG Tool) then add your delay to your new target seed
