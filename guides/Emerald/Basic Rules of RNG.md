---
title: 'Basic rules of Gen 3 RNG'
description: 'How to advance the RNG and tips to make everything more stable'
slug: 'e-tips-rng'
subCategory: 'Basic Knowledge'
isRoughDraft: true
---

## Intro

Emerald offers some useful features for seeding in RNG. However, vblank issues can be quite frustrating.

## RNG Methods

- For stationary Pokémon: Method 1
- For wild encounters: Method H-2

```
Note: When dealing with wild encounters, it's often a hit-or-miss situation. You might encounter a high vblank rate, and it's challenging to predict which method you'll hit. Unfortunately, there's no surefire solution, and you may end up trying repeatedly, wasting a lot of time for uncertain results.
```

## Trainer Card Flip

In Gen 3, performing a Trainer Card Flip resets the noise-related delays, allowing you to focus on the default delay. It's a crucial step you should do almost reflexively. Simply access your Trainer Card and press A. To keep it simple, do this between 10k-5k advances before your target advance. This can save you a lot of trouble.

## Minimizing Noise

Building on the previous tip, a way to minimize vblank and noise issues is to open your Trainer Card when starting your RNG, perform a flip, close it, and advance to your target advance. This might sound simple, but it's an effective strategy to shield yourself from unexpected surprises.

## Speeding Up RNG Advances (Including Seeding Help)

### Battle Video

This method serves as the foundation for seeding. It allows you to preserve the RNG's current state as an initial seed. Simply engage in a battle in the Battle Frontier and save it as a video. This video retains the seed when the battle occurred, and you can set it as the initial seed when loading it. For instance, if your target is 1 million advances away, you can go up to 950k, save a battle video, and upon loading it, you'll start at 950k advances.

Although this method has its uses, it has become somewhat outdated compared to Painting RNG. Nonetheless, it can be valuable when you need to hit a specific advance multiple times.

### In-Battle

As in any Gen 3 game, being in battle accelerates RNG advancement by a factor of two. This is particularly helpful for wild Pokémon RNG.

### Painting RNG

Lastly, it's essential to note that Painting RNG is a viable method for obtaining any desired initial seed. Since it's a more advanced technique, it will be covered in a separate guide.
