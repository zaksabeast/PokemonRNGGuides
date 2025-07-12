const e=`---
- title: "Ultra Sun and Ultra Moon Static RNG"
  navDrawerTitle: "Static RNG"
  description: "Learn how to RNG static Pokémon in Ultra Sun and Ultra Moon for perfect IVs, natures, and shinies."
  slug: "retail-usum-stationary"
  category: "Ultra Sun and Ultra Moon"
  tag: "cfw"
- title: "Sun and Moon Static RNG"
  navDrawerTitle: "Static RNG"
  description: "Learn how to RNG static Pokémon in Sun and Moon for perfect IVs, natures, and shinies."
  slug: "retail-sm-stationary"
  category: "Sun and Moon"
  tag: "cfw"
  canonical: "retail-usum-stationary"
---

## Tools

- [A 3DS with PokeReader](/install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

### Recommended Reading

If you want to RNG a Mystery Gift (or Event) Pokémon, follow the [Gen 7 Mystery Gift RNG guide](/retail-usum-mystery-gift).

If you want to RNG a Pokémon in a Wormhole, follow the [USUM Wormhole RNG guide](/retail-usum-wormhole).

## Final Screens

- Tapus: _Tapu ko-ko-ko-kooo!!!_ / _Ta-pu-leeeh!_ / _Ta-pu-looooo_ / _Ta-pu-fiiieee!_.
- In-game gifts/Fossils/Cosmog: "You received xxx!".
- Necrozma: _Linooo!_.
- Starters:
  - SM - "Having accepted one another, you'll surely be friends for life."
  - USUM - "You chose xxx!".

## Step 1: Set Up 3DSRNGTool

1. In the upper right, input your game version and your TSV.
2. Also in the upper right, input the initial seed.
3. If you have the Shiny Charm, check the "Shiny Charm" box.
4. Ensure you're on the "Stationary RNG" tab in 3DSRNGTool. Choose the "Category" and then the Pokémon you are RNGing for.
5. If you have a Pokémon with Synchronize in the first slot of your party, select its nature from the dropdown for "Synch Nature". Failure to do this if the lead Pokémon has Synchronize will result in incorrect frames.

\`\`\`
Note: For gift Pokémon, Synchronize guarantees the Pokémon will have the same nature as the lead Pokémon. If aiming for a specific nature, having Synchronize in the first slot will significantly improve your chances of finding target frames, as every frame will have the desired nature.
The gift Eevee egg and the move Pikachu gift are exceptions. Synchronize has no effect on their natures.
\`\`\`

## Step 2 (with NPCs): Create a Timeline

Follow the [timeline guide](/retail-usum-timeline) to create a timeline and find a target frame.

## Step 3: Obtaining the Wanted Pokémon

1. Once you have a correct timeline and a target frame, the next step is to RNG the Pokémon.
2. Advance to your target frame. When you land on it, press \`A\` to obtain the Pokémon or start a battle with it.

Congrats! You should now have the Pokémon you wanted. If not, reset the game and try again.

## Step 2 (with 0 NPCs):

1. Do not check the "Blink F Only" box.
2. Advance to the final screen for the Pokémon you want to RNG. Input the current frame in the frame range.
3. Adjust filters as needed, then click "Calculate" and choose any result as your target frame. If there are no results, increase the frame range or restart the game to get a new initial seed. (Restart from the beginning of the guide if you restart the game.)
4. Advance frames by pressing \`Start\` to unpause the game. Pause again near your target frame with \`Start + Select\`, then slowly advance by pressing \`Select\` while paused.

- You can use Festival Plaza to advance frames quicker.
- Exit Festival Plaza approximately a thousand frames before your target frame to avoid missing it.

5. Advance to your target frame. When you land on it, press \`A\` to obtain the Pokémon or start a battle with it.

Congrats! You should now have the Pokémon you wanted. If not, reset the game and try again.

## If You Did Not Obtain the Pokémon You Wanted

1. Double-check that all info has been input correctly, especially the initial seed.
2. Restart the guide from the beginning and ensure to follow all instructions. Not getting the correct Pokémon is usually due to user error.
3. Make sure you are using the correct method based on whether there are NPCs or not. Failing to create a timeline when NPCs are over 0 will skip target frames.
`;export{e as default};
