var e=`---
- title: "Diamond, Pearl, and Platinum PokéRadar RNG"
  navDrawerTitle: "PokéRadar RNG"
  description: "Learn how to RNG PokéRadar in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon."
  slug: "dppt-pokeradar-rng"
  category: "Diamond, Pearl, and Platinum"
  section: "pokemon_rng"
  isRoughDraft: true
  variant:
    - "retail"
    - "cfw-emu"
---

## Intro

In this guide we will explain how PokéRadar works and how to perform RNG Manipulation with it on Pokemon Diamond, Pearl and Platinum!

PokéRadar is an item that allows you to find particular wild Pokémon in the tall grass and create "chains" of consecutive encounters with the same species. It is the most famous method of Gen 4 together with the Masuda method for hunting Shiny Pokémon, because long chains greatly increase the chances of finding one.

It is usually used to catch exclusive Pokémon or perform RNG manipulation where it is not possible to do so, such as during a blizzard or a sandstorm.

## How does PokéRadar work?

Once used, 4 "rings" are created, each spaced 1 tile where at least one piece of tall grass per ring will vibrate, indicating that at that specific point if the user passes over that tile, a wild encounter will be started.

The first pokemon encountered, if it is captured or knocked out, will start a chain with that pokemon species. The longer the chain becomes, the more the game increases the chance that a special lump containing a Shiny Pokémon will appear.

### Grass shake types

The grass can shake in two different ways:

- **Slow**
- **Fast**

Once you start a chain with one shake type, you must continue entering patches with the same shake type for the entire chain.

For example, if the chain starts from a fast patch and you enter a slow patch, the chain will immediately break.

### Hidden chain breaks

Even patches with the correct shake type are not always safe.

When a patch breaks the chain, the game performs a random 50/50 roll between shake types 1 and 2. Because of this, a dangerous patch can sometimes appear to have the same shake type as a safe patch.

As a result, it is impossible to determine with certainty whether every matching patch is safe just by looking at the animation.

Your chain will break if:

- A random encounter starts (it is therefore very important to use repellent).
- You encounter a Pokémon other than the one in the chain.
- You enter a patch of grass that doesn't have the same vibration.
- You change route, enter a building or leave the area.
- You turn off the game or restart it.
- You use the bike.
- PokéRadar usage fails.

You can stop right at the first encounter, since the probability changes gradually, and the difference between the first two is minimal. But you're free to build a chain as long as you want.
This tool can also be used simply to build very long chains, as it will show which patches are safe and which aren't.

## In-game preparations

1. Make sure you have a charged PokéRadar.
2. Go to the area with as much tall grass as possible, trying to cover the entire 9x9. If this is not possible, try to cover as many tiles as possible.
3. Once done, save the game.

## Webtool

> [!NOTE]
> WIP, it will be available in the next few days.
`;export{e as default};