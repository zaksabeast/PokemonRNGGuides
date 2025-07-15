const e=`---
title: "Omega Ruby and Alpha Sapphire TID RNG"
navDrawerTitle: "TID RNG"
description: "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Omega Ruby and Alpha Sapphire."
slug: "retail-oras-tid"
category: "Omega Ruby and Alpha Sapphire"
tag: "cfw"
addedOn: "2025-04-13"
---

\`\`\`
If a save file is present, delete it by pressing B + X + Up on the d-pad at the title screen. This will remove the save file and start the game at the language select screen.
\`\`\`

## Tools

- [PokeReader](/install-pokereader)

## Video Guide

<YouTubeVideo id="RuwwNFSqIIE" />

## Step 1: Set up the tool

1. Input the TinyMT u32 seed from PokeReader into the tool at the bottom of the page.
2. If you're on a physical console, turn the "Only Current Seed" on. If you're on an emulator, you can leave it turned off.
3. Filter for your desired TID, SID, or TSV.
   - Finding a specific TID/SID/TSV combination is very rare. It is advised to RNG for only one at a time.
4. If no results are found, increase the max advances.
5. If the target advance is too high or the TID/SID/TSV combination is not possible with your current seed, you can reset the game to start over with a different seed.

## Step 2: Advance the RNG

1. Unpause the game and continue to name your character.
2. After confirming your name, you will be asked if the name is correct.
3. Selecting "No" and going back to the naming screen advances the RNG by one.
4. Repeat choosing "No" until the target advance is reached.
5. One you have reached the target advance choose "Yes" to generate the TID.
6. When you can control your character, check if you got your TID/SID/TSV correct.

![Success](/images/OmegaRuby-AlphaSapphire/TID/Success.png)
![Success](/images/OmegaRuby-AlphaSapphire/TID/Success-2.png)

## Credits

- wwwwwwzx for reverse engineering this logic and [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool).
- Bambo_Rambo for [TinyFinder](https://github.com/Bambo-Rambo/TinyFinder), which this tool is based on.

## RNG Tool

<OrasId />
`;export{e as default};
