const e=`---
title: "Reseed the RNG using paintings"
navDrawerTitle: "Painting RNG"
description: "Learn how to reseed the RNG using paintings in Pokémon Emerald to get the Pokémon you want quickly, without the long wait."
slug: "emerald-painting-rng"
category: "Emerald"
tag: "emu"
---

## Tools

- [mGBA with lua scripts](/mgba-setup)
- [PokeFinder](/pokefinder)

## Video guide

<YouTubeVideo src="https://www.youtube.com/embed/ydS9HLNmAog?si=MHhvzKhd32Kgd4OC" />

## Intro

Reseeding the RNG by viewing paintings allows you to avoid waiting for higher advances. Normally, the RNG starts with a predetermined number and generates the same random numbers each time.

By viewing a painting in the game, like the ones in Lilycove Contest Hall, the RNG is reseeded using the video frame counter.

This method can be combined with battle videos to save the new RNG state after viewing the painting.

You can also use this method for Ruby and Sapphire, whether live or for a dry battery.

## Setup

1. Find a target seed using PokeFinder.
2. Right-click on the chosen seed in PokeFinder and select "Generate times for seed."

## Painting RNG

<PaintingReseed />

1. Type your target seed in the tool above to find your Target Painting Timer.
2. In the game, wait for the painting timer shown by the Lua script to equal the Target Painting Timer. View the party menu to prevent NPCs from affecting the RNG.
3. View the painting at this number to reseed the RNG to the desired seed.
4. Use the number of advances shown in "Seed to Time" of PokeFinder to finish the RNG as normal.

## Credits

- Chinese translation: xuanyelin, Hakuhiro.
`;export{e as default};
