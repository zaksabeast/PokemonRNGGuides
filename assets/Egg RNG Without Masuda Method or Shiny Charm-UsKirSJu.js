const e=`---
- title: "Omega Ruby and Alpha Sapphire Egg RNG Without Masuda or Shiny Charm"
  navDrawerTitle: "No MM/SC Egg RNG"
  description: "Learn how to RNG eggs from the Daycare in Omega Ruby and Alpha Sapphire for shiny, high-IV Pokémon."
  slug: "retail-oras-egg-no-mmsc"
  category: "Omega Ruby and Alpha Sapphire"
  tag: "cfw"
- title: "X and Y Egg RNG Without Masuda or Shiny Charm"
  navDrawerTitle: "No MM/SC Egg RNG"
  description: "Learn how to RNG eggs from the Daycare in X and Y for shiny, high-IV Pokémon."
  slug: "retail-xy-egg-no-mmsc"
  category: "X and Y"
  tag: "cfw"
  canonical: "retail-oras-egg-no-mmsc"
---

<ShowIf slug="/retail-oras-egg-no-mmsc">

This guide is for **Omega Ruby and Alpha Sapphire**.

Looking for a different game? Check out these pages:

- [X and Y No MM/SC Egg RNG Guide](/retail-xy-egg-no-mmsc)

</ShowIf>

<ShowIf slug="/retail-xy-egg-no-mmsc">

This guide is for **X and Y**.

Looking for a different game? Check out these pages:

- [Omega Ruby and Alpha Sapphire No MM/SC Egg RNG Guide](/retail-oras-egg-no-mmsc)

</ShowIf>

\`\`\`
This method differs from using Masuda or having the Shiny Charm. Here, you first RNG the egg traits, then RNG the ESV (and PID) when picking up the egg. This approach potentially results in shorter wait times than with Masuda or Shiny Charm.
\`\`\`

## Tools

- [A 3DS with PokeReader](/install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

## Step 1: Enter RNG info

1. Enter your game version and TSV.
2. Enter the initial seed.
3. Leave the Shiny Charm box unchecked. This method doesn't work with the Shiny Charm.

\`\`\`
Want to RNG the egg to have a specific ESV that isn't yours? Click on Edit TSV List, input TSV(s), and check the Other TSVs Shiny box. But don't input the TSV in the upper right. You must use YOUR TSV there or the RNG will be incorrect.
\`\`\`

## Step 2: Parent information

1. Enter details based on the parents you are using.
2. Don't check the Masuda Method box.
3. This method doesn't work if the parents have different languages.

\`\`\`
Remember: the Pokemon's region doesn't matter here. Only the Pokemon's language affects the Masuda Method.

Also, when breeding with a Genderless Pokemon and Ditto, Ditto will always be designated as female.
\`\`\`

## Step 3: Setup egg seeds, filters, and target frame

1. Input the current egg seeds of your game in the Egg Seeds field.
2. In the Filters section, describe the egg you are aiming for.
3. Leave the Shiny Only box unchecked. You'll RNG shininess later.
4. Press \`Start + Select\` to pause the game.
5. Input your current frame and increase the frame range. A larger range means more frames will be found.
6. Click "To Accept" if you'll accept the first egg. Alternatively, "To Reject" if you'll reject the first egg. It's advisable to accept the first egg to verify it matches frame -1.

\`\`\`
Note: The Consider Delay counter will change to 0 for rejecting the egg.
\`\`\`

7. After completing the steps above, click on Calculate to output target frames. If the result is empty, increase frame range and click Calculate again.

## Step 4: RNG the Egg Traits (Excluding PID/ESV)

1. Choose your target frame.
2. If you're currently on an even frame and want an odd frame (or vice versa), press \`Start\` to unpause and save the game once.

Remember:

- Frames always advance by 2 out of battles.
- Frames will be consistently even or odd.
- Save once to switch between even to odd frames.
- The first egg you collect/reject isn't the one you RNG’d for.
- Egg traits are determined when the previous egg was collected/rejected and do not change.
- The PID and ESV of the egg aren't generated until you collect the egg.
- The NEXT egg will have the traits you RNG’d for when you collect/reject the first egg.
- When you collect the second egg (the target egg), you'll RNG for its ESV. The other traits were RNG’d when the first egg was collected/rejected.
- Frame -1 represents the current egg’s traits. This is the first egg you'll collect (or reject if you chose to reject).

## Step 5: Hit the Target Frame

1. In the game, talk to the daycare man until a specific dialogue appears.
   - For accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY) with Yes or No options. Point to Yes and wait for your target frame.
   - For rejecting the first egg: “Well then, I'll hang on to it. Thank you!” (XY/ORAS) after choosing No from previous dialogue.
2. As you approach your target frame, press \`Start + Select\` to pause, then repeatedly press \`Select\` to advance frame by frame.
3. Reach your target frame and then hold A to both unpause and receive/reject the egg.
4. The first egg you collect isn't the one you RNG’d for.
5. The egg seeds in-game should match the egg seeds for your chosen target frame in the 3DSRNGTool.

## Step 6: RNG the ESV of the Egg

1. Right-click on the target frame you chose earlier and click on "Set as Current Status".
2. Click Reset in Filters and then check the Shiny Only box.
3. Input current frame and a frame range to search. A larger range means more frames will be found.
4. Click Calculate to show frames with the desired ESV.
5. Choose a target frame as you did before.

- To switch from even to odd frames (or vice versa), unpause and save the game once.

## Step 7: Hit the Target Frame (Repeat from before)

1. In the game, talk to the daycare man until a specific dialogue appears.
   - For accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY) with Yes or No options. Point to Yes and wait for your target frame.
2. As you approach your target frame, press \`Start + Select\` to pause, then repeatedly press \`Select\` to advance frame by frame.
3. Reach your target frame and then hold A to both unpause and receive the egg.

Well done! The egg should now have the traits and ESV you wanted.

## Troubleshooting

- Verify the TSV in the upper right of 3DSRNGTool matches the TSV shown in the main RNG view.
- Ensure you're using the correct daycare view for ORAS if the first egg collected doesn't match frame -1.
- Egg seeds should change after each egg collected/rejected. If not, ensure you have the latest PokeReader and your game is updated to the latest version.
`;export{e as default};
