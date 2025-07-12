const e=`---
- title: "Omega Ruby and Alpha Sapphire Egg RNG with Masuda Method or Shiny Charm"
  navDrawerTitle: "MM/SC Egg RNG"
  description: "Learn how to RNG eggs from the Daycare in Omega Ruby and Alpha Sapphire for shiny, high-IV Pokémon."
  slug: "retail-oras-egg-mmsc"
  category: "Omega Ruby and Alpha Sapphire"
  tag: "cfw"
- title: "X and Y Egg RNG with Masuda Method or Shiny Charm"
  navDrawerTitle: "MM/SC Egg RNG"
  description: "Learn how to RNG eggs from the Daycare in X and Y for shiny, high-IV Pokémon."
  slug: "retail-xy-egg-mmsc"
  category: "X and Y"
  tag: "cfw"
  canonical: "retail-oras-egg-mmsc"
---

\`\`\`
This method differs from using without the Masuda Method or Shiny Charm. Here, you RNG for the egg once but waiting times for a target frame can be longer.
\`\`\`

## Tools

- [A 3DS with PokeReader](/install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

## Step 1: Enter RNG info

1. Enter your game version and TSV.
2. Enter the initial seed.
3. Tick the Shiny Charm box if you have it.

\`\`\`
To RNG the egg with a specific ESV that's not yours, click on Edit TSV List and add TSV(s). Then check the Other TSVs Shiny box.

Input YOUR TSV in the upper right so the RNG works correctly.
\`\`\`

## Step 2: Input parent information

Enter details according to the parents you are using. Tick the Masuda Method box if parents are of different languages.

\`\`\`
The Pokemon's region doesn't affect anything. It's the language that matters for the Masuda Method.
\`\`\`

For a Ditto and genderless Pokémon pairing, Ditto will be the female.

## Step 3: Egg Seeds, Filters, and Target Frame

1. Input the current egg seeds of your game.
2. Provide info for the egg you want in Filters.
3. Tick the Shiny Only box for a shiny egg.
4. Pause the game with \`Start + Select\`.
5. Enter your current frame and increase the frame range for more frames to search.
6. Select "To Accept" for the first egg or "To Reject" if not. We recommend accepting the first egg to verify frame -1. The Consider Delay counter will reset to 0 if you're rejecting the egg.
7. Finally, click on Calculate for target frames. Increase frame range and recalculate if there are no results.

## Step 4: RNGing the Egg Traits

1. Choose your target frame.
2. If you need an odd frame from an even one, or vice versa, save the game once after unpausing with \`Start\`.

Remember:

- Frames advance by 2 outside of battles.
- Frames are either always even or always odd.
- Save once to switch from even to odd frames and vice versa.
- The first egg collected/rejected is NOT the egg you RNG’d for.
- Eggs are generated when the previous egg was collected/rejected and won't change.
- Upon collecting/rejecting an egg, the NEXT egg will have the traits you RNG’d for.
- Frame -1 signifies the current egg’s traits.

## Step 4: RNGing the Egg Traits (Exluding PID/ESV)

1. In the game, talk to the daycare man until a specific dialogue appears.
   - Accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY). Wait on Yes.
   - Rejecting the first egg: “Well then, I'll hang on to it. Thank you!” (XY/ORAS) after selecting No from previous dialogue.
2. Press \`Start + Select\` to pause the game near your target frame, then press \`Select\` to advance frame by frame.
3. At your target frame, hold \`A\` to both unpause the game and collect/reject the egg.
4. The egg collected now will match the frame -1 from the 3DSRNGTool.

Collect the NEXT egg, check or hatch it to confirm your Pokémon. Congratulations!

## Troubleshooting

- Verify the TSV in the upper right of 3DSRNGTool matches the TSV shown in the main RNG view.
- Ensure you're using the correct daycare view for ORAS if the first egg collected doesn't match frame -1.
- Egg seeds should change after each egg collected/rejected. If not, ensure you have the latest PokeReader and your game is updated to the latest version.
`;export{e as default};
