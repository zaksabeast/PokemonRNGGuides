---
title: 'Wild RNG'
description: 'Wild RNG'
slug: 'dppt-wild'
subCategory: 'Basic Knowledge'
---

## Intro

This guide assumes basic knowledge of Gen 4 RNG, such as hitting an initial Seed and advancing the RNG.

## General

Before diving into specific cases, it's essential to determine your Target Frame and configure PokeFinder as follows:

- Open PokeFinder => Gen 4 => Wild => Searcher. **Make sure to select Method J.**
- Set up your profile, including the route and the desired Pokémon with the correct encounter slot.
- Apply your criteria and pinpoint your target advance.

## Basic Wild

For a straightforward wild encounter, head to the area with your target Pokémon. Make sure you have a Pokémon with Sweet Scent or honey, and you're good to go. No additional items or actions are required. Follow these steps:

1. Hit your initial seed.
2. Open your party.
3. Advance the RNG.
4. Use Sweet Scent or honey.
5. Avoid leaving the menu to prevent any noise cancelation.

Unlike Gen 5, Sweet Scent and honey animations won't affect RNG advancement.

## GBA Insertions

The RNG process for GBA insertions is the same as basic wild RNG. Just keep in mind that they use **Encounter Slot 8 and 9**. If your profile is correctly set up, PokeFinder should automatically adjust and display all the relevant information.

## Fishing

```
Note: Any methods claiming to boost the fishing rate do not work. PokeFinder should account for this, as it's a DPPt bug.
```

1. Move to your desired fishing location.
2. Advance the RNG in your party.
3. Open your bag and use the fishing rod.

On an emulator, if you notice a significant advancement, it indicates a successful hook and a possible hint that you've reached your target encounter. PokeFinder also reveals in the Generator which advances lead to an encounter and which do not.

### Feebas

Feebas encounters are a bit more challenging than usual. Here's what to do:

1. Locate the right tile.
2. Save and configure your RNG.
3. Use the PokeFinder Generator and input the initial Seed to pinpoint the target advance.
4. Ensure that your target and the subsequent advance result in an encounter; otherwise, you may get no encounter.

For Feebas, there's a 50/50 element that isn't supported at the moment, making it somewhat random.

## Trophy Garden

1. Stand in front of the garden owner and save your game.
2. Reload your setup with any initial seed.
3. Open PokeFinder, go to Static, Method 1, and generate results.
4. Examine the first value of the PID at your current Advance.
5. Use the table below to determine which Pokémon will be available when you engage in a conversation with the owner:

| PID | Pokemon                  |
| :-- | :----------------------- |
| 0   | Eevee                    |
| 1   | Bonsly                   |
| 2   | Happiny                  |
| 3   | Meowth                   |
| 4   | Cleffa                   |
| 5   | Clefairy                 |
| 6   | Igglybuff                |
| 7   | Plusle                   |
| 8   | Jigglypuff               |
| 9   | Porygon (DP) / Ditto(Pt) |
| A   | Castform                 |
| B   | Minun                    |
| C   | Mime Jr.                 |
| D   | Marill                   |
| E   | Chansey                  |
| F   | Azurill                  |

```
Note: Due to indexing differences between tools, you might be off by one. Make a small adjustment if needed.
```

```
Note: The Pokémon of the day will occupy Encounter Slot 6, and the previous day's Pokémon will become Encounter Slot 7.
```

## Great Marsh

Similar to the Trophy Garden, this utilizes Encounter Slot 6 and 7.

1. Utilize the lookout to select your desired Pokémon.
2. Save your game in front of the Great Marsh.
3. Search for a target with a narrow enough range that allows for hitting the target without introducing RNG noise from walking.
4. Conclude the RNG as usual.
