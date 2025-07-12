const e=`---
title: "Legends Arceus MMO RNG"
navDrawerTitle: "MMO RNG"
description: "Learn how to RNG MMOs in Legends Arceus using Sysbot and PermuteMMO for shiny Pokémon."
slug: "sysbot-lpa-mmo"
category: "Legends Arceus"
tag: "cfw"
---

## Tools

- A CFW Switch with sysbot
- The "main" file (your save) of Legends Arceus
- PermuteMMO from Kaphotics
- [MMO Data Dumper](https://github.com/SteveCookTU/mmo_data_dumper/releases/tag/v0.1.0) from EzPzStreamz

For a smooth setup, place the MMO Data Dumper in the same folder as PermuteMMO. This ensures the required files are updated automatically. Also, put your main file in the PermuteMMO folder to help calculate the correct shiny rolls for each species.

## Intro

MMO RNG in Legends Arceus is straightforward. This guide explains how to set up PermuteMMO, acquire the necessary files, and perform basic MMO RNG. It assumes sysbot is correctly configured.

## Setup

1. In your game, check for available MMO(s).
2. Stay in Jubilife City and pause the game.
3. Run MMO Data Dumper via \`CMD\` in your folder. Use \`"{file_name} {ip}"\` where \`{file_name}\` is your file name (usually \`mmo_data_dumper.exe\`) and \`{ip}\` is your Switch's IP address. This creates 'mo.bin' and 'mmo.bin' files in the PermuteMMO folder.
4. Run PermuteMMO to see MMO data and potential shinies. Locate your target and prepare for RNG.

MMO can be tricky with skittish Pokémon. Start with aggressive targets. Save and reset if needed. Avoid rerunning the dumper tool on the map. Save in the village and retry if unsuccessful.

## RNG

RNG involves deciphering PermuteMMO's tasks, like 'A3,' where the number represents Pokémon to despawn in multi-battles.

- A: Aggressive advances, easiest method. A4 requires defeating 4 Pokémon in a battle.
- B: Beta advances, a mix of skittish and aggressive Pokémon.
- O: Oblivious advances, ideal for Mr. Mime, Lickitung, and Magikarp. O2 means defeating 1 Oblivious and 1 Aggressive Pokémon.
- S: Scaring advances for skittish Pokémon. Look for a red '!' and fast travel when they flee.
- G: Ghost spawns triggered when only 4 Pokémon are left. G3 means despawning 3 Pokémon, moving away, and returning.
- CR: Clearing remaining Pokémon for the second wave if needed.

Follow these steps to meet your target at the right time!
`;export{e as default};
