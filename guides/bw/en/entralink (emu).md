# Entralink (Emulator)
_Original Guide by /u/Zapdos44_

Things You Will Need:
- [Latest Build of RNG Reporter](https://ci.appveyor.com/project/Admiral-Fish/rngreporter/build/artifacts)
- [DeSmuMe dev build](https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download)
- The lua .dlls for DeSmuMe
    - [x86 .dll](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
    - [x64 .dll](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- Pokemon Black or White (You will need to dump this yourself)
- [The BW Entralink Scripts for your language](http://pokerng.forumcommunity.net/?t=56443955)
- A save with access to the C-Gear (And with the profile/calibration set up)
- [Suloku's Gen V Save Tool (optional)](https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/)
- [runasdate (optional)](https://runasdate.en.softonic.com/)

## The RNG

### Choose an RNG Target
1. Open Suloku's Gen V Save Tool

2. Add the Pokemon you want to RNG

### Finding a Frame/Target Seed/IVs
1. Open RNG Reporter and go to Generation 5 Time Finder

2. Set up Time Finder like this
![](https://i.snag.gy/ne0CK3.jpg)

3. Change Delay/Frame as you see fit

4. Set minimum frame to at least 21. It is not possible to hit anything lower.

### Finding the Delay you need to hit
1. You may notice that the seed listed is significantly shorter than normal Generation 5 seeds. Unfortunately, you still need to hit the Initial Seed (The 32 Digit one)

2. Right Click your selected spread and hit `Generate Entralink Nature Seeds`

3. Choose a list of natures that you desire

4. Hit Generate

### Hitting C-Gear Seed and Initial Seed
Chances are, you know how to hit an initial seed. For those who don't want to use runasdate, change your PC time to one of
dates listed on the Entralink Seed Search.

If you have runasdate, set it so that it will load the Emulator on the time under
C-Gear Date\Time and check **Immediate Mode**. Immediate Mode essentially makes it so you can retry the RNG over and over again
without setting up your PC clock again.

Make sure to have the lua script active at this time. If you are using runasdate,
don't worry about the initial seed being different. It is because you loaded it on the date where the C-Gear has to be to
hit your initial seed.

1. Go to the text where it says `[Player] warped to the Entralink!` and make a save state. Pause the game and note the delay.
  - We will be finding out how long it takes for the C-Gear Seed to generate after pressing A. Press "A" and in the output, the lua will tell us what the C-Gear Seed we hit was.


2. Go back to RNG Reporter and go to Generation 5 Tools > Seed To Time
3. Type in the C-Gear Seed you got.

4. Subtract the Delay where you pressed A from the Delay you hit when the C-Gear Seed was generated.

5. Now take the result and subtract the result from your target delay. For example, if my target delay was 4288 and the
difference was 200, I would hit delay 4088.

6. Hit your Initial Seed again and do Delay advances. You can inch closer by pressing N, which will add 1 to the delay.

7. If you failed, just try again. Sometimes you think you hit it, but there was a small gap between when you unpause the emulator and press A.

### Advancing the Frames
1. Make sure to pay attention to the **IVRNG Frame**!

2. Subtract **13** from your target frame. You will be advancing frames until you hit that.

3. You advance frames by walking around. Make sure to only have 1 Pokemon in your party, or else it will advance too many frames
at once.

4. When you hit your IVRNG Frame, interact with your target Pokemon immediately. Make a save state and enter the battle.

5. If you did it correctly, you will get the correct IVs on your target. Yay!

6. To get your Nature, you can either move onto Step 6 or reload the Save State and re-catch the Pokemon. **Make sure to hit a different PIDRNG Frame each time or you will end up getting the same nature**

### Getting a good Nature
1. Go back to RNG Reporter and go to Entralink Seed Search. Notice the Frame. That is the PIDRNG Frame you need to hit.

2. Go back to your save state and wait until you are 6 before the frame listed in RNG Reporter. Then enter the battle again and catch the
Pokemon.

```
Note: Make sure to have the correct Gender ratio set up!
```

### Congrats!
YOU HAVE JUST COMPLETED YOUR FIRST ENTRALINK RNG ABUSE! :D
