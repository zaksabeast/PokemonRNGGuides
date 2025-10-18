const e=`---
- title: "FireRed and LeafGreen Wild RNG"
  navDrawerTitle: "Wild RNG"
  description: "Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method."
  slug: "emulator-frlg-wild"
  category: "FireRed and LeafGreen"
  tag: "emu"
- title: "FireRed and LeafGreen Wild RNG"
  description: "Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method."
  slug: "emulator-frlg-wild-v2"
  category: "FireRed and LeafGreen"
  tag: "emu"
  hideFromNavDrawer: true
  canonical: "emulator-frlg-wild"
---

## Tools

- [mGBA with lua scripts](/mgba-setup)
- [PokeFinder](/pokefinder)
- TID and SID (if going for shiny) - [FRLG Find SID Guide](/frlg-gen3-sid)

## Step 1: Set up PokeFinder

1. Open PokeFinder and select "Wild" for Gen 3. Make sure you're on the "Generator" tab.
2. Set "Method" to Method H-1.
   - While there are other methods in FireRed/LeafGreen, H-1 is the most common and recommended. The other methods rely on v-blank and occur rarely.
3. Set "Location" to where the RNG will take place.
4. If you want a specific Pokemon, select it in "Pokemon" after selecting its location.
   - If the Pokemon you want isn't listed or you need a specific encounter slot, choose the number in the "Encounter Slot" box and leave "Pokemon" at the default.
   - Use [this site](https://sites.google.com/site/pokemonslots/gen-iii/emerald) to find a specific encounter slot.
5. Set "Encounter" to "Grass" or "Surfing" since this guide focuses on using Sweet Scent to start an encounter.
6. For "Lead," leave it as "Any" since Cute Charm and Synchronize do not work in FireRed/LeafGreen.
7. Check the "Use Delay" box and input the delay for the Pokemon you are RNGing.
   - This [Google Doc](https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147) has the delays for each area.
   - Keep in mind there could still be a variation of +/- 1 delay.

## Step 2: Finding the initial seed (Manually)

1. Save the game in the location where you'll RNG the Pokemon.
2. Restart the emulator.
3. Once the game loads, enter the continue screen.
4. Pause the game to find your seed.
5. The initial seed will be displayed on the screen from the Lua script.

![Initial Seed](/images/FireRed-LeafGreen/Wild/Initial-Seed.png)

## Step 2: Finding the initial seed (Botting)

An alternative method to finding an initial seed is to use a bot to reset for seeds until a desired one is found.

[Initial Seed Botting Guide](/frlg-seeding-bot)

## Step 3: Find a target advance

1. Enter the initial seed into "Seed."
2. Enter your target settings for the Pokemon you wish to search for (shiny, IVs, nature, etc.).
   - Finding a shiny perfect Pokemon may take a while to find a seed, which will likely have very high advances.
   - If no results show up, try lowering the filters.
3. Click "Generate."

![Setup](/images/FireRed-LeafGreen/Wild/Setup.png)

In the example above, the filters are set for any shiny on Route 5.

\`\`\`
Note: The initial seed can be changed by pressing B on the continue screen to play the intro again. The seed will change when pressing A to advance to the continue screen. You can repeat this process as needed to find a better seed if wanted.
\`\`\`

## Step 4: RNG for the Pokemon

1. Once you have a target advance, continue into the game.
2. Advance to within a few thousand advances of the target advance.
   - Teachy TV can be used to advance much faster. The RNG advances 313 times faster, allowing you to advance millions of frames in a few minutes.
   - Open Teachy TV in Key Items and close it when a few thousand away from your target advance.
3. Select the Pokemon in your party with Sweet Scent and hover over the move.
4. When close to your target advance, pause the emulator and create a save state, then advance a frame at a time to the target advance.
5. Hold \`A\` and unpause the emulator at the same time on your target advance.
   - If the Pokemon is not the one wanted, load the previous save state and try one advance before and/or one advance after.

If you followed all the above steps, the Pokémon should be what you wanted. Tada, you did your Gen 3 Wild RNG!

![Success](/images/FireRed-LeafGreen/Wild/Success.png)

## Troubleshooting

If after trying the one advance difference above it didn't work, you'll have to adjust for your own delay.

Find what advance you are hitting and adjust as needed.

## Credits

- Chinese translation: xuanyelin, Hakuhiro.
`;export{e as default};
