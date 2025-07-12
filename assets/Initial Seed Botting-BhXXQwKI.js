const e=`---
title: "Initial Seed Botting for FireRed and LeafGreen"
navDrawerTitle: "Initial Seed Botting"
description: "Learn how to use the Initial Seed Bot in FireRed and LeafGreen for better control over your RNG results."
slug: "frlg-seeding-bot"
category: "FireRed and LeafGreen"
tag: "emu"
---

### Tools:

- [mGBA with lua scripts](/mgba-setup)
- [PokeFinder](/pokefinder)
- [FRLGRSEInitialSeedsFinder](https://github.com/Real96/FRLGRSEInitialSeedsFinder) by Real96

## Intro

This guide shows an alternative RNG method for Fire Red and Leaf Green that offers more control over the initial seed using a Lua bot.

### Setup:

1. First, determine your target. Open PokeFinder, go to Gen 3 => Stationary or Wild (both work similarly).
2. In the "Searcher" tab, apply your desired filters.
3. Generate results and record the seed.
4. Run FRLGRSEInitialSeedsFinder. It will ask for a seed; enter the one you recorded.
5. When asked for the number of results, input a large number, like 100.
6. Wait for the tool to generate results. It will create a text file with possible initial seeds. Open the file and copy its content.
7. In the FRLG Lua script, find this line: 'local botTargetInitSeeds ='. Input all the seeds (enclose them in '{}').
8. Save the Lua script.

\`\`\`
For starters where Teachy TV is unavailable, generate 100 results but only consider the lowest advance range possible.
\`\`\`

### Botting:

1. Edit the first line of the lua script.
2. Go to the game's continue screen where you load your save file.
3. Press your computer's \`Shift\` key and the GBA's \`SELECT\` key to start the bot.

This setup allows the game to be controlled by the bot, trying to hit one of the selected initial seeds. Once it completes, the game will pause. Keep track of the initial seed, input it into the generator, and proceed with your RNG process as usual, knowing your target advance is now accessible.

## Credits

- Chinese translation: xuanyelin, Hakuhiro.
`;export{e as default};
