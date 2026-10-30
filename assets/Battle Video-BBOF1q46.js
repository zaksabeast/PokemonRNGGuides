var e=`---
- title: "Battle Video"
  navDrawerTitle: "Battle Video"
  description: "How to create an optimal Battle Video to save and restore the RNG state."
  slug: "emerald-battle-video"
  category: "Emerald"
  section: "rng_technique"
  variant: "retail"
  addedOn: "2026-03-24"
---

<Gist>
  Gist: How to create an optimal Battle Video or update an existing one.
</Gist>

## Prerequisite

- Access to the Battle Frontier.
- Recommended: Having read [Overview of RNG Advancing Techniques](/emerald-advancing-rng-techniques).

## Overview

Battle Video is a RNG technique to save and restore the RNG state. Using that technique, players only need to wait the full delay of their RNG manipulation once. Afterwards, each retry is very quick.

After winning or losing a battle at the Battle Frontier, players can record their battle. The RNG state at the start of the battle is saved into the battle record. Players can watch their battle anywhere by opening their trainer card and selecting "Battle Record". By doing so, the current RNG state is reseeded with the RNG state at the start of the recorded battle.

The RNG state saved on the battle record must leave sufficient time to perform the action required by the RNG manipulation.

## Cases

Battle Video is used 3 cases:

- Creating a Battle Video from scratch.
- Update an existing Battle Video because the current one has too much waiting.
- Creating a Battle Video after successful Painting Reseeding.

The 2 first cases are covered in this guide. Battle Video in the context of Painting Reseeding will be covered in another guide.

Creating a Battle Video requires waiting for the RNG state to reach the wanted advance. The easiest way is to wait in front of the Battle Frontier clerk. However, it is also possible to do most of the waiting while in battle, which advanced the RNG twice as fast. The webtool supports both approaches.

## Webtool and Instructions

<BattleVideo />

## Credits

- RainingChain
- German translation: Parasite
`;export{e as default};