const n=`---
title: "Diamond, Pearl, and Platinum Honey Tree RNG"
navDrawerTitle: "Honey Tree RNG"
description: "Learn how to RNG Pokémon from Honey Trees in Diamond, Pearl, and Platinum for shiny and high-IV results."
slug: "dppt-setup-rng"
category: "Diamond, Pearl, and Platinum"
tag: "any"
---

## Intro

This guide explains how to get the Pokémon you want using Honey on a tree. We'll focus on generating Munchlax and how to find the right trees.

Credits: Big thanks to [Dragonfly Caves](https://www.dragonflycave.com/sinnoh/honey-trees) for the research on Encounter Slots and Munchlax. Use this website to locate your Honey Trees!

## Setting up

1. Stand in front of the tree where you want to find your Pokémon.
2. Open [PokeFinder](/pokefinder) and go to Gen 4 => Stationary => Method 1.
3. Start your game, note the Initial Seed, then generate results.

## The RNG

To understand the unique Encounter Slots for Honey trees, think of it as a table with rows and columns. The column shows the encounter type, and the row shows which Pokémon you'll encounter.

Each cell in the table represents a Pokémon you will find. The column is set one advance from your current advance. The row is set two advances from your current advance.

For example, if you're at advance 10, the column is set to 11, and the row is set to 12.

1. To determine your encounter, take the PID from the next two advances in PokeFinder.
2. Keep the second half of the PID.
3. Convert it to a decimal value.
4. Divide the decimal value by 656 to get the row.
5. Compare the result with the tables below to see what you'll encounter.

### Diamond/Pearl

| Row         | Column 1 (30-99) | Column 2 (10-29) | Column 3 (0-9 or 1-9 if Munchlax tree) | Column 4 (0 if Munchlax tree) |
| ----------- | ---------------- | ---------------- | -------------------------------------- | ----------------------------- |
| 40% (60-99) | Wurmple          | Combee           | Nothing                                | Munchlax                      |
| 20% (40-59) | Silcoon/Cascoon  | Burmy            | Nothing                                | Munchlax                      |
| 20% (20-39) | Combee           | Cherubi          | Nothing                                | Munchlax                      |
| 10% (10-19) | Burmy            | Aipom            | Nothing                                | Munchlax                      |
| 5% (5-9)    | Cherubi          | Heracross        | Nothing                                | Munchlax                      |
| 5% (0-4)    | Aipom            | Wurmple          | Nothing                                | Munchlax                      |

### Platinum

| Row         | Column 1 (30-99) | Column 2 (10-29) | Column 3 (0-9 or 1-9 if Munchlax tree) | Column 4 (0 if Munchlax tree) |
| ----------- | ---------------- | ---------------- | -------------------------------------- | ----------------------------- |
| 40% (60-99) | Combee           | Burmy            | Nothing                                | Munchlax                      |
| 20% (40-59) | Wurmple          | Cherubi          | Nothing                                | Munchlax                      |
| 20% (20-39) | Burmy            | Combee           | Nothing                                | Munchlax                      |
| 10% (10-19) | Cherubi          | Aipom            | Nothing                                | Munchlax                      |
| 5% (5-9)    | Aipom            | Aipom            | Nothing                                | Munchlax                      |
| 5% (0-4)    | Aipom            | Heracross        | Nothing                                | Munchlax                      |
`;export{n as default};
