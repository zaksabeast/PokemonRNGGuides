const e=`---
- title: "Black and White Entralink RNG"
  navDrawerTitle: "Entralink RNG"
  description: "Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus."
  slug: "emulator-bw-entralink"
  category: "Black and White"
  tag: "emu"
---

## Tools

- [Desmume](/desmume-setup)
- [RNG Reporter](https://github.com/Admiral-Fish/RNGReporter/releases)
- A save with access to the C-Gear (and with the profile/calibration set up)
- [Suloku's Gen V Save Tool (optional)](https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/)

## Step 1: Inject an RNG Target (optional)

1. Open Suloku's Gen V Save Tool.
2. Add the Pokémon you want to RNG.

## Step 2: Finding a Frame/Target Seed/IVs

1. Open RNG Reporter and go to Generation 5 Time Finder.
2. Set up Time Finder like this.

![Setup](/images/Black-and-White/Entralink/Setup.png)

3. Change Delay/Frame as needed.
4. Set minimum frame to at least 21. You cannot hit anything lower.

## Step 3: Finding the Delay you need to hit

1. The seed listed may be significantly shorter than normal Generation 5 seeds.
   - You still need to hit the Initial Seed (the 32-digit one).
2. Right-click your selected spread and hit \`Generate Entralink Nature Seeds\`.
3. Choose a list of desired natures.
4. Click \`Generate\`.

## Step 4: Hitting C-Gear Seed and Initial Seed

1. Go to the text where it says \`[Player] warped to the Entralink!\` and make a save state. Pause the game and note the delay.
   - You will find out how long it takes for the C-Gear Seed to generate after pressing \`A\`.
2. Press \`A\`, and the Lua will tell you the C-Gear Seed you hit.
3. Go back to RNG Reporter and go to Generation 5 Tools > Seed To Time.
4. Type in the C-Gear Seed you got.
5. Subtract the delay where you pressed \`A\` from the delay when the C-Gear Seed was generated.
6. Subtract the result from your target delay. For example, if my target delay was 4288 and the difference was 200, I would hit delay 4088.
7. Hit your Initial Seed again and do delay advances. Press \`N\` to add 1 to the delay to inch closer.
8. If you fail, just try again. There may be a small gap between when you unpause the emulator and press \`A\`.

## Step 5: Advancing frames

1. Pay attention to the **IVRNG Frame**.
2. Subtract **13** from your target frame. You will advance frames until you hit that.
3. Advance frames by walking around. Only have 1 Pokémon in your party to avoid advancing too many frames at once.
4. When you hit your IVRNG Frame, interact with your target Pokémon immediately. Make a save state and enter the battle.
5. If done correctly, you will get the correct IVs on your target. Yay!
6. To get your Nature, move to Step 6 or reload the save state and re-catch the Pokémon.

\`\`\`
Make sure to hit a different PIDRNG Frame each time, or you will get the same nature.
\`\`\`

## Step 6: Getting a good Nature

1. Go back to RNG Reporter and go to Entralink Seed Search. Note the Frame: that is the PIDRNG Frame you need to hit.
2. Go back to your save state and wait until you are 6 frames before the frame listed in RNG Reporter.
3. Enter the battle again and catch the Pokémon.

\`\`\`
Make sure to have the correct Gender ratio set up!
\`\`\`

### Congrats!

You have just completed your Entralink RNG!

## Credits

- Chinese translation: xuanyelin, Hakuhiro.
`;export{e as default};
