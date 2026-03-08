const e=`---
- title: "Black 2 and White 2 Wild RNG"
  navDrawerTitle: "Wild RNG"
  description: "Learn how to RNG wild Pokémon in Black 2 and White 2 for shiny and high-IV results."
  slug: "emulator-b2w2-wild"
  category: "Black 2 and White 2"
  addedOn: "2026-03-08"
  section: "pokemon_rng"
  variant: "cfw-emu"
- title: "Black and White Wild RNG"
  navDrawerTitle: "Wild RNG"
  description: "Learn how to RNG wild Pokémon in Black and White for shiny and high-IV results."
  slug: "emulator-bw-wild"
  category: "Black and White"
  addedOn: "2026-03-08"
  section: "pokemon_rng"
  variant: "cfw-emu"
  canonical: "emulator-b2w2-wild"
---

## Tools

- [PokeFinder](/pokefinder)
- [Desmume](/desmume-setup)
- [A configured game profile](/emulator-bw-find-ds-parameters)
- Chatot with Chatter
- A Pokémon with Sweet Scent or have Honey in bag

## Step 1: Understand Gen 5 RNG

In Gen 5, RNG is split into two separate systems.

| RNG Type | Controls                               |
| -------- | -------------------------------------- |
| PIDRNG   | Shiny status, nature, gender, ability. |
| IVRNG    | Pokémon IVs only.                      |

You must control both to obtain a shiny Pokémon with the desired IVs.

## Step 2: Choose and Prepare Your Location

Go to the route where you want to encounter the Pokémon, with the script already running.

This allows you to check whether the map is noisy, which is important for Gen 5 RNG.

Once you choose your location and target:

1. Save the game.
2. Close the emulator.

For detailed information about NPC behavior and a list of low-noise locations, see [this external NPC behavior guide](https://docs.google.com/document/d/1Hxz24gvMLrt8Qk-_6tG50hEA0TI8fuCI6yqQwBckwR4/edit?usp=sharing).

## Step 3: Search for a Target Seed

Open PokeFinder and configure the search.

1. Go to the "Gen 5" tab.
2. Select "Wild".
3. Choose your game profile.
4. Open the "Searcher" tab.
5. Select a "Lead" if the first Pokémon in your party has a lead ability.
6. Set the "Advances" value to the amount you plan to advance in-game.
7. Choose your target Pokémon in the Settings section.
8. Configure desired values in Filter, such as IVs, gender, ability, or nature.
9. Adjust the date range.
10. Click "Search".

## Step 4: Start the Game on the Target Seed

1. Use \`runasdate.exe\` from the [Desmume Guide](/desmume-setup) to launch the game at the correct date and time.
2. Enter the game quickly.
3. Open the menu immediately.

\`\`\`
Be sure not to turn on the C-Gear when entering the game to avoid any unpredictable advancements.
\`\`\`

The initial seed should match your target.

If the seed is incorrect, recheck your profile parameters or runasdate configuration.

## Step 5: Advance the PIDRNG

Use these methods to increase the PIDRNG Advance:

- Chatot: Use Chatter to advance +1 every time you check its summary.
- Save the game: This is useful for specific cases like Starters.
- NPC advancement: This can be tricky but can be managed with weather to advance LCRNG quickly.

## Step 6: Advance the IVRNG

Use these methods to increase the IVRNG Advance:

- Walking 128 steps increases the IVRNG by the number of Pokémon in your party (e.g. 6 Pokémon advances by 6).
- Withdraw a Pokémon in the PC advances the IVRNG by 7.
- Battling Pokémon also advances the IVRNG, but the result can be unpredictable.

## Step 7: Trigger the Encounter

After reaching the correct PIDRNG Advance and IVRNG Advance:

1. Make sure you are on the target Advance.
2. Use Sweet Scent or Honey to start the wild encounter.

\`\`\`
Use save states in noisy areas so you can retry if you miss the target Advance.
\`\`\`

<Alert
  type="warning"
  showIcon
  message="If the location has moving NPCs or weather, the LCRNG will continue advancing during the Sweet Scent/Honey animation."
/>

**Congrats! You've now got your Pokémon!**

## Troubleshooting

This means the encounter may not occur on the exact target Advance, even if your setup is correct.

There is no guaranteed solution. You must adjust and calibrate until you consistently hit the correct shiny.

However, fishing doesn't advance LCRNG Advances, so you can fish without any problems.

## Credits

- Vlad for writing the original guide
- Fiask for finalizing and translating the guide
`;export{e as default};
