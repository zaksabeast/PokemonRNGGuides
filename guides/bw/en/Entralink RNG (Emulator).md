# Entralink (Emulator)

_How to RNG cool Pokemon with Entralink RNG_

## Tools

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

## Step 1: Inject an RNG Target (Optional)

1. Open Suloku's Gen V Save Tool
2. Add the Pokemon you want to RNG

## Step 2: Finding a Frame/Target Seed/IVs

1. Open RNG Reporter and go to Generation 5 Time Finder
2. Set up Time Finder like this
   ![](https://i.snag.gy/ne0CK3.jpg)
3. Change Delay/Frame as you see fit
4. Set minimum frame to at least 21. It is not possible to hit anything lower.

## Step 3: Finding the Delay you need to hit

1. You may notice that the seed listed is significantly shorter than normal Generation 5 seeds.
   - Unfortunately, you still need to hit the Initial Seed (The 32 Digit one)
2. Right Click your selected spread and hit `Generate Entralink Nature Seeds`
3. Choose a list of natures that you desire
4. Click `Generate`

## Step 4: Hitting C-Gear Seed and Initial Seed

1. Go to the text where it says `[Player] warped to the Entralink!` and make a save state. Pause the game and note the delay.
   - We will be finding out how long it takes for the C-Gear Seed to generate after pressing A.
2. Press "A" and in the output, the lua will tell us what the C-Gear Seed we hit was.
3. Go back to RNG Reporter and go to Generation 5 Tools > Seed To Time
4. Type in the C-Gear Seed you got.
5. Subtract the Delay where you pressed A from the Delay you hit when the C-Gear Seed was generated.
6. Now take the result and subtract the result from your target delay. For example, if my target delay was 4288 and the difference was 200, I would hit delay 4088.
7. Hit your Initial Seed again and do Delay advances. You can inch closer by pressing N, which will add 1 to the delay.
8. If you failed, just try again. Sometimes you think you hit it, but there was a small gap between when you unpause the emulator and press A.

## Step 5: Advancing frames

1. Make sure to pay attention to the **IVRNG Frame**!
2. Subtract **13** from your target frame. You will be advancing frames until you hit that.
3. You advance frames by walking around. Make sure to only have 1 Pokemon in your party, or else it will advance too many frames at once.
4. When you hit your IVRNG Frame, interact with your target Pokemon immediately. Make a save state and enter the battle.
5. If you did it correctly, you will get the correct IVs on your target. Yay!
6. To get your Nature, you can either move onto Step 6 or reload the Save State and re-catch the Pokemon.

```
Note: Make sure to hit a different PIDRNG Frame each time or you will end up getting the same nature
```

## Step 6: Getting a good Nature

1. Go back to RNG Reporter and go to Entralink Seed Search. Notice the Frame.
   - That is the PIDRNG Frame you need to hit.
2. Go back to your save state and wait until you are 6 before the frame listed in RNG Reporter.
3. Then enter the battle again and catch the Pokemon.

```
Note: Make sure to have the correct Gender ratio set up!
```

### Congrats!

You have just completed your Entralink RNG!
