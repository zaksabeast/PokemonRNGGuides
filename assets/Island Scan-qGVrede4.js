const n=`---
- title: "Ultra Sun and Ultra Moon Island Scan RNG"
  navDrawerTitle: "Island Scan RNG"
  description: "Learn how to RNG Island Scan Pokémon in Ultra Sun and Ultra Moon — great for getting shinies in Apricorn Balls."
  slug: "retail-usum-island-scan"
  category: "Ultra Sun and Ultra Moon"
  tag: "cfw"
- title: "Sun and Moon Island Scan RNG"
  navDrawerTitle: "Island Scan RNG"
  description: "Learn how to RNG Island Scan Pokémon in Sun and Moon — great for getting shinies in Apricorn Balls."
  slug: "retail-sm-island-scan"
  category: "Sun and Moon"
  tag: "cfw"
  canonical: "retail-usum-island-scan"
---

## Tools

<ShowIf slug="/retail-usum-island-scan">

- [A 3DS with PokeReader](/install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- The \`honey\` item
- Have started an Island Scan and know the Pokémon you've scanned for
- [List of Island Scan islands and days for USUM](/misc-3ds-island-scan-usum)

</ShowIf>

<ShowIf slug="/retail-sm-island-scan">

- [A 3DS with PokeReader](/install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- The \`honey\` item
- Have started an Island Scan and know the Pokémon you've scanned for
- [List of Island Scan islands and days for SM](/misc-3ds-island-scan-sm)

</ShowIf>

\`\`\`
Note: You can get the "honey" item in any store after clearing three trials.
\`\`\`

## Step 1: Setup 3DSRNGTool

1. Type the \`Init Seed\` from PokeReader into the \`Seed\` box.
2. Enter your game version and TSV.
3. If you have the shiny charm, check the \`Shiny Charm\` box.
4. Click the \`Wild RNG\` tab and change the \`Category\` dropdown to \`Island Scan\`.
5. Change the \`Pokemon\` dropdown to your target Pokémon.

## Step 2: Create a timeline

1. Follow the [timeline guide](/retail-usum-timeline) using the \`NPC count\` from PokeReader.
2. You should have a target frame to hit.

## Step 3: The RNG

If you've followed the guide, you should now:

- Have made a timeline.
- Have a target frame.
- Be standing in the area to catch your Island Scan Pokémon.
- Have the \`honey\` item.

\`\`\`
Note: If any of these are not true, start the guide over. Moving your character will mess up the RNG.
\`\`\`

### Step 4: Hitting your target frame

1. Press \`X\` to open the in-game menu.
2. Hold the cursor on the \`bag\` option.
3. Watch the \`Advances\` counter on PokeReader.
   - When the \`Advances\` counter is close to your target frame, press \`Start + Select\` to pause the game.
   - Press \`Select\` multiple times to slowly advance frames to your target frame.
4. Once at your target frame, press and hold \`A\` to unpause the game while entering the bag.
5. Find and use the \`honey\` item to start a wild encounter.
6. If the Pokémon you encountered was not the Island Scan Pokémon, see how many frames off you were and adjust.
   - Search all frames for the IVs of the Pokémon you got. Check the frame range instead of the timeline and search using the IVs.
   - After finding your actual frame, adjust as necessary from the delay and restart from the beginning.
   - This should not happen frequently.
`;export{n as default};
