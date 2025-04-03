---
title: "V-Blank"
description: "V-Blank"
slug: "v-blank"
category: "Technical Documentation"
tag: "any"
addedOn: "2025-04-02"
---

## What are V-blanks?

A V-blank interrupt is the mechanism used by the GBA to refresh the screen. It is triggered every 1/60th of a second independently from regular game logic execution.

When a V-blank interrupt occurs, the regular game program execution is paused, v-blank associated code is executed, then the regular game program resumes.

In GBA Pokemon games, the v-blank associated code updates the RNG frame by 1. This means that every 1/60th of a second, the RNG frame updates by 1.


## Impact of V-blanks
Here's the logic for Pokémon generation:

```
Generate PID  (ex: frame 1000)
Update RNG frame
Generate IVs  (frame 1001)
Update RNG frame
```

In most cases, this is exactly what happens.

However, in some rare cases, a v-blank occurs seemingly out of nowhere and alters the generation:

```
Generate PID  (frame 1000)
Update RNG frame
Update RNG frame (caused by v-blank)
Generate IVs  (frame 1002)
Update RNG frame
```

Even though the Pokémon generation started on the same frame, the resulting IVs are different.

## Understanding V-blanks Frequency
As stated before, a v-blank occurs every 1/60th of a second, more specially every 280'896 CPU instruction cycles.

Every operation performed by the GBA (ex: addition, loading data) takes a certain number of CPU instruction cycles.

The more instructions a Pokémon generation step takes, the more likely a v-blank will occur during it.
  - Ex: A Pokémon generation step that takes ~28'000 instruction cycles will have ~10% chance to have a v-blank.
  - Ex: A step that takes 300'000 cycles is guaranteed to have at least 1 v-blank, possibly 2.

The generation of stationary takes very few instructions, which makes v-blank very rare.

In the other hand, wild Pokémon generation with a Synchronize leader can take a lot of instructions, which makes v-blank a lot more common.

Check TODO for more information about the concrete impact of v-blanks on Pokémon generation.

<!--


## Predicting V-blanks
A simplified game repeat loop is:

```
Refresh image displayed
Update the audio
Check for button press
If player is holding A, then Generate Pokémon
Do nothing for the remaining instructions
```

To predict when a v-blank will occur during a Pokémon generation step, we need to know:
 1- How many instruction cycles have passed before the Pokémon generation step.
 2- How many instruction cycles each of the Pokémon generation steps take.

The 1st point is particulary hard to predict because updating the audio is highly variable (between 35'000 and 65'000 cycles depending on where the song track is).

The 2nd point, while also very complex, is a lot more predictable because all the factors are known. For more details, check TODO Researcher Documentation.

Fortunately for us, even though the exact occurence of v-blanks is hard to predict, it often falls in the approximatively same timing.

-->