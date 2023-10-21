---
title: 'Honey RNG'
description: 'RNG honey tree Pokémon'
slug: 'dppt-setup-rng'
subCategory: 'Basic Knowledge'
---

## Intro

This guide explains how to obtain the desired Pokémon by using Honey on a tree. In this guide, we will walk through the process of generating Munchlax and provide a brief explanation of how to locate the appropriate trees.

Credits: Huge thanks to [Dragonfly Caves](https://www.dragonflycave.com/sinnoh/honey-trees) for all the researches for Encounter Slots and Munchlax. You should use this website to find your Honey Trees!

## Setting up

1. Stand in front of the tree where you want to find your Pokémon.
1. Open PokeFinder and go to Gen 4 => Stationary => Method 1.
1. Open your game, make a note of the Initial Seed, then generate results

## The RNG

To understand the exclusive Encounter Slots for Honey trees, think of it like a table with rows and columns. The column determines the type of encounter, and the row decides which Pokémon you'll encounter. These tables are shown below.

Each cell in the table represents a Pokemon you will hit. The column is set one advance from your current advance. The row is set two advances from your current advance.

For example if you're at advance 10, the column will be set on 11, and the row will be set on 12.

1. To precisely determine your encounter, you need to take the PID of the two upcoming advances from PokeFinder.
1. Keep the second half of the PID.
1. Convert it to a decimal value.
1. Divide the decimal value by 656 to get the row.
1. Compare the result with the numbers in the following tables to know what you'll get.

### Diamond / Pearl

| Row         | Column 1 (30-99)  | Column 2 (10-29) | Column 3 (0-9 or 1-9 if Munchlax tree) | Column 4 (0 if Munchlax tree) |
| :---------- | :---------------- | :--------------- | :------------------------------------- | :---------------------------- |
| 40% (60-99) | Wurmple           | Combee           | Nothing                                | Munchlax                      |
| 20% (40-59) | Silcoon / Cascoon | Burmy            | Nothing                                | Munchlax                      |
| 20% (20-39) | Combee            | Cherubi          | Nothing                                | Munchlax                      |
| 10% (10-19) | Burmy             | Aipom            | Nothing                                | Munchlax                      |
| 5% (5-9)    | Cherubi           | Heracross        | Nothing                                | Munchlax                      |
| 5% (0-4)    | Aipom             | Wurmple          | Nothing                                | Munchlax                      |

### Platinum

| Row         | Column 1 (30-99) | Column 2 (10-29) | Column 3 (0-9 or 1-9 if Munchlax tree) | Column 4 (0 if Munchlax tree) |
| :---------- | :--------------- | :--------------- | :------------------------------------- | :---------------------------- |
| 40% (60-99) | Combee           | Burmy            | Nothing                                | Munchlax                      |
| 20% (40-59) | Wurmple          | Cherubi          | Nothing                                | Munchlax                      |
| 20% (20-39) | Burmy            | Combee           | Nothing                                | Munchlax                      |
| 10% (10-19) | Cherubi          | Aipom            | Nothing                                | Munchlax                      |
| 5% (5-9)    | Aipom            | Aipom            | Nothing                                | Munchlax                      |
| 5% (0-4)    | Aipom            | Heracross        | Nothing                                | Munchlax                      |
