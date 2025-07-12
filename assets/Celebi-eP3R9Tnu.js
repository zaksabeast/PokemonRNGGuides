const e=`---
title: "Celebi in Crystal"
navDrawerTitle: "Celebi RNG"
description: "Learn how to obtain a shiny Celebi in Pokémon Crystal using RNG manipulation."
slug: "gen2-celebi"
category: "Gold, Silver, Crystal"
tag: "cfw"
addedOn: "2025-03-02"
---

<Alert
  showIcon
  type="warning"
  message="Highly experimental!"
  description="Gen 2 RNG is still in its early days. Expect to need multiple attempts!"
/>

## Tools

- [PokeReader](/install-pokereader)

## Video guide

<YouTubeVideo src="https://www.youtube.com/embed/wTpI7MV_f4U?si=0qF9bFb0HrDyv2zw" />

## Written guide

1. Save in front of the Celebi shrine. This lets you reset if needed.
2. Press \`A\` to interact with the shrine and stop when you see \`Player put in the GS Ball.\`
3. Open PokeReader to the RNG screen and wait until \`Finding ADIV Index\` and \`Finding SDIV Index\` are gone.
4. Pause PokeReader with \`L + R\` then enter the info from PokeReader into the RNG tool below. Press "Generate".
5. Unpause the game with \`R\` until near the target advance.
6. Pause then advance with \`L\` one at a time.
7. Stop when the "Advance" number in PokeReader matches one shown in the tool.
   - (Optional) Make a save state if you're on an emulator.
8. Press \`A\` to accept the Pokemon. **Do not press anything else until Celebi appears!**
9. If you got your Pokemon, congrats! If not, keep trying!

### Helpful tips

- This is unstable! Expect it to take many tries!
- Only use \`L + R\` to pause and advance in Gen 2, not \`Start + Select\`. \`Start + Select\` will mess up the RNG!
- Do not press any buttons in between pressing \`A\` and seeing Celebi.
  - Switching screens or pressing buttons during this time will mess up the RNG!
- The 3DS registers button presses instantly, but the Game Boy takes a few frames.
  - Pressing \`A\` too quickly might unpause the game without starting the encounter.
- Don't hold \`A\` too long. Press it slightly longer than one frame.

## RNG Tool

<Gen2PokemonRng type="celebi" />

## What next?

Now you can use Transporter to RNG your Celebi to have perfect IVs!

- [Transporter RNG Guide](/transporter-rng)
- [Easier Transporter RNG method using an offline patch](/transporter-rng-offline)

## Credits

- All the people who have looked into Gen 2 over the years: Admiral Fish, EzPzStreamz, Zep, Real, Amab, wwwwwwzx, Vlad, Bambo_Rambo, Lincoln, Shiny_Sylveon, and Zaksabeast.
- Zaksabeast for coming up with the current RNG method and building the tool.
- Shiny_Sylveon, El Terapagos Mexicano, and Lord Timothy on Discord for helping test.
- Hakuhiro for the Chinese translation.
- El Terapagos Mexicano for the Spanish translation.
`;export{e as default};
