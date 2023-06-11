---
title: 'How to Setup some RNG'
description: 'Trophy Garden, Honey'
slug: 'dppt-advance-rng'
subCategory: 'Basic Knowledge'
---

```
Introduction : This guide isn't really about helping to RNG something, but more to achieve a setup for a RNG. This guide works for either Emulator or Retail. It'll require the user to have all the basic knowledge of Gen 4 RNG (especially the methods and how to hit an initial seed)
```

## Honey

This part will focus on how to get the right Pokemon when putting the Honey on the tree. It might be confusing at first but it's just an easy double check. This guide will cover the Munchlax generation with a little note on how to find your trees.

```
Credits : Huge thanks to [Dragonfly Caves](https://www.dragonflycave.com/sinnoh/honey-trees) for all the researches for Encounter Slots and Munchlax. You should use this website to find your Honey Trees !
```

First, you need to save in front on the tree you want to have your Pokemon on. Open PokéFinder, Gen 4 => Stationary => Method 1. Open your game, and note the Initial Seed (it might be random or chosen) and Generate result. 

Now the focus point is to understand the Encounter Slots which are exclusive to Honey trees. To make it simple, it works as a table with values called rows and column. The column will set which kind of encounter you'll get (pretty much the Shaking) and the row will set the Pokémon itself.

Now the question is : How to know what you can get : 
* The Column is set the advance right after your current one
* The Row one is set 2 advances right after your current one.

For example, I'm at advance 10. Advance 11 will set the Column and frame 12 will set the row. To know EXACTLY what you'll get, you need to take the PID of these two following advances, keep the second half part of it, then convert it in decimal value and finally divide by 656. Compare these values to the numbers in the following table to know what you'll get :

### Diamond / Pearl

| Row         | Column 1 (30-99)  | Column 2 (10-29) | Column 3 (0-9 or 1-9 if Munchlax tree) | Column 4 (0 if Munchlax tree)    |
| ----------- | ----------------- | ---------------- | -------- | -------- |
| 40% (60-99) | Wurmple           | Combee           | Nothing  | Munchlax |
| 20% (40-59) | Silcoon / Cascoon | Burmy            | Nothing  | Munchlax |
| 20% (20-39) | Combee            | Cherubi          | Nothing  | Munchlax |
| 10% (10-19) | Burmy             | Aipom            | Nothing  | Munchlax |
| 5% (5-9)    | Cherubi           | Heracross        | Nothing  | Munchlax |
| 5% (0-4)    | Aipom             | Wurmple          | Nothing  | Munchlax |


### Platinum

| Row         | Column 1 (30-99)  | Column 2 (10-29) | Column 3 (0-9 or 1-9 if Munchlax tree) | Column 4 (0 if Munchlax tree)    |
| ----------- | ----------------- | ---------------- | -------- | -------- |
| 40% (60-99) | Combee            | Burmy            | Nothing  | Munchlax |
| 20% (40-59) | Wurmple           | Cherubi          | Nothing  | Munchlax |
| 20% (20-39) | Burmy             | Combee           | Nothing  | Munchlax |
| 10% (10-19) | Cherubi           | Aipom            | Nothing  | Munchlax |
| 5% (5-9)    | Aipom             | Aipom            | Nothing  | Munchlax |
| 5% (0-4)    | Aipom             | Heracross        | Nothing  | Munchlax |



## Trophy Garden

This part will focus on how to get the right daily Pokémon. It's really easy. You'll just have to save in front of the owner of the garden, and reload your setup with **any initial seed**. Open PokeFinder, Static, Method 1, generate results.

You'll have to look at the first value of the PID at your current Advance. Based on the following, table, you'll know which Pokémon will be available once you'll trigger the conversation with the owner :

| PID | Pokemon   |
| --- | -------   |
| 0   |Eevee      |
| 1   |Bonsly     |
| 2   |Happiny    |
| 3   |Meowth     |
| 4   |Cleffa     |
| 5   |Clefairy   |
| 6   |Igglybuff  |
| 7   |Plusle     |
| 8   |Jigglypuff |
| 9   |Porygon (DP) / Ditto(Pt) |
| A   |Castform |
| B   |Minun    |
| C   |Mime Jr. |
| D   |Marill   |
| E   |Chansey  |
| F   |Azurill  |

```
Note : Because of indexation between tools, you might be one off. You just have to adjust.
```

```
Note : Reminder that the Pokémon of the day will take the Encounter Slot 6 and the previous one will now be the Encounter Slot 7
```


## Swarm

Coming soon