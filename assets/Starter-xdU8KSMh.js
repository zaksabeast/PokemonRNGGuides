const e=`---
title: "Crystal Starter RNG"
navDrawerTitle: "Starter RNG"
description: "Learn how to RNG shiny starters in Pokémon Crystal."
slug: "gen2-starters"
category: "Gold, Silver, Crystal"
tag: "cfw"
---

## Tools

- [PokeReader](/install-pokereader)

## Video guide

<YouTubeTable
  videos={[
    {
      title: "Zaksabeast",
      src: "https://www.youtube.com/embed/1PFQv-S8a48?si=7N6RoITaJg0lyrPR",
    },
    {
      title: "LazyHunter",
      src: "https://www.youtube.com/embed/PQS_hDu8CRs?si=lE0Ruqxgp4tTd2UE",
    },
  ]}
/>

## Written guide

1. Save in front of the starter you want, in case you need to reset the game.
2. Choose your starter and stop when you see the \`Player received Pokemon\` text with the flashing arrow to continue.
3. Go into PokeReader's RNG screen and wait until it stops saying \`Finding ADIV Index\` and \`Finding SDIV Index\`.
4. Pause PokeReader with \`L + R\`.
5. Type the information on PokeReader into the RNG Tool below and press "Generate".
6. Advance the game with \`L\` until PokeReader's \`Advance\` number matches one of the generated \`Advance\` columns below.
7. (Optional) Create a save state if you're on an emulator, in case you need to reset.
8. When you land on your desired advance, press \`A\` to accept the Pokemon.
9. If you got your Pokemon, congrats! If not, keep trying! It won't take long.

### Helpful tips:

- This is unstable! Expect it to take many tries!
- Only use \`L + R\` to pause and advance in Gen 2, not \`Start + Select\`. \`Start + Select\` will mess up the RNG!
- The gameboy takes more than one video frame to register a button press, but the 3ds notices it immediately. Pressing \`A\` too fast will unpause the game without starting the encounter.
- Holding \`A\` too long might mess up the RNG! Press it for more than one frame, but no longer.

## RNG Tool

<Gen2PokemonRng type="starter" />

## Credits

- All the people who have looked into Gen 2 over the years: Admiral Fish, EzPzStreamz, Zep, Real, Amab, wwwwwwzx, Vlad, Bambo_Rambo, Lincoln, Shiny_Sylveon, and Zaksabeast.
- Zaksabeast for coming up with the current RNG method and building the tool.
- Shiny_Sylveon, El Terapagos Mexicano, and Lord Timothy on Discord for helping test.
- El Terapagos Mexicano for the Spanish translation.
- Chinese translation: Hakuhiro.
`;export{e as default};
