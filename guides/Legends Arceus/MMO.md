---
title: 'MMO RNG'
description: 'How to RNG MMOs using Sysbot and PermuteMMO'
slug: 'sysbot-lpa-mmo'
subCategory: 'Sysbot'
---

## Requirements

- A CFW Switch with sysbot
- The "main" file (your save) of Legends Arceus
- PermuteMMO from Kaphotics
- [MMO Data Dumper](https://github.com/SteveCookTU/mmo_data_dumper/releases/tag/v0.1.0) from EzPzStreamz

For a smooth setup, place the MMO Data Dumper in the same folder as PermuteMMO. This ensures the required files are updated automatically. Also, put your main file in the PermuteMMO folder, which helps calculate the correct Shiny Rolls for each species, saving you time and hassle.

## Intro

MMO RNG in Legends Arceus is a straightforward process. This guide explains setting up PermuteMMO, acquiring the necessary files for effective use, and basic MMO RNG. Assumes a correctly configured sysbot.

## Setup

1. In your game, check for available MMO(s).
1. Stay in Jubilife City and pause the game.
1. Run MMO Data Dumper via CMD (Command Prompt) in your folder. Use `"{file_name} {ip}"` where `{file_name}` is your file name (usually `mmo_data_dumper.exe`) and `{ip}` is your Switch's IP address. This creates 'mo.bin' and 'mmo.bin' files in the PermuteMMO folder.
1. Run PermuteMMO to see MMO data and potential Shinies. Locate your target and prepare for RNG.

MMO can be tricky with skittish Pokémon. Start with aggressive targets. Save and reset if needed. Avoid rerunning the dumper tool on the map. Save in the village and retry if unsuccessful.

## RNG

RNG involves deciphering PermuteMMO's tasks, like 'A3,' where the number represents Pokémon to despawn in multi-battles.

- A: Aggressive advances, the easiest. A4 requires defeating 4 Pokémon in a battle.
- B: Beta advances, a mix of Skittish and Aggressive Pokémon.
- O: Oblivious advances, ideal for Mr. Mime, Lickitung, and Magikarp. O2 means defeating 1 Oblivious and 1 Aggressive Pokémon.
- S: Scaring Advances for skittish Pokémon. Look for a red '!' and fast travel when they flee.
- G: Ghost Spawns, triggered when only 4 Pokémon are left. G3 means despawning 3 Pokémon, moving away, and returning.
- CR: Clearing remaining Pokémon for the second wave if needed.

Follow these steps to meet your target at the right time!
