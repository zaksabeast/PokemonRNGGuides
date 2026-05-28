var e=`---
- title: "HeartGold and SoulSilver Swarm RNG"
  navDrawerTitle: "Swarm RNG"
  description: "Learn how to RNG Swarm Pokémon in HeartGold and SoulSilver for shiny, high-IV Pokémon."
  slug: "retail-hgss-swarm"
  category: "HeartGold and SoulSilver"
  section: "pokemon_rng"
  variant: "retail"
  isRoughDraft: true
- title: "Diamond, Pearl, and Platinum Swarm RNG"
  navDrawerTitle: "Swarm RNG"
  description: "Learn how to RNG Swarm Pokémon in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon."
  slug: "retail-dppt-swarm"
  category: "Diamond, Pearl, and Platinum"
  section: "pokemon_rng"
  variant: "retail"
  isRoughDraft: true
---

> [!NOTE]
> This guide is interactive and updates instructions based on your settings!

<Stepper titles={["Set up", "Find your seed", "Advance the RNG", "Get the Pokémon"]}>

<Step step={0}>

## Find your target

Select a game and a target Pokemon from the interactive map below.

<Alert type="warning" message="Todo: add map" />

<SelectSwarm4Target />

## Prepare your save

<Alert
  type="warning"
  message="Todo: add game specific prerequisites to advance the RNG"
/>

1. Save at the location in the screenshots below depending on your game.

<Pixelate>

<EqualColumnTable>

| Diamond, Pearl and Platinum                                              | HeartGold and SoulSilver                                               |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| ![Where to Save in DPPt](/images/Diamond-Pearl-Platinum/Swarm/Save.webp) | ![Where to Save in HGSS](/images/HeartGold-SoulSilver/Swarm/Save.webp) |

</EqualColumnTable>

</Pixelate>

</Step>

<Step step={1}>

## Find your seed

1. Restart the game, and enter the date, time, and approximate second when you **loaded the save**.
   - ~15 seconds after launch on NDS
   - ~20 seconds with TwilightMenu
   - ~30 seconds using a 3DS launcher
2. Click "Generate" to get a list of possible seeds.
3. Use the Coin Toss Poketch app and click the "Heads" and "Tails" buttons to narrow down your seed.
4. Once a single seed remains, click "Select".

<Alert type="warning" message="Todo: add coin flip filter" />

</Step>

<Step step={2}>

## Advance the RNG

<Alert type="warning" message="Todo: add coin flip advance tracker" />

</Step>

<Step step={3}>

## Get the Pokémon

1. If you are on Diamond, Pearl, or Platinum, take into account all coin flips already performed.
2. Do whatever is necessary to reach your MT Advance Target.
3. Once you have reached your target, talk to the group NPC and make a new group (in DPPt it is standing in Jubilife City in front of the Jubilife TV Station, in HGSS it is inside the Pokémon School of Violet City)
4. Save the game and wait for the DS clock to pass midnight
5. In DPPt talk to your rival's sister or check TV news, in HGSS listen to the Mary and Oak transmission in the Pokémon Talk radio channel. They should nominate your target Pokémon.

   - <Pixelate>

      <EqualColumnTable>

     | Diamond, Pearl and Platinum                                                             | HeartGold and SoulSilver                                                                          |
     | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
     | ![Talk to your rival's sister](/images/Diamond-Pearl-Platinum/Swarm/GetThePokemon.webp) | ![Listen to the Mary and Oak transmission](/images/HeartGold-SoulSilver/Swarm/GetThePokemon.webp) |

      </EqualColumnTable>

      </Pixelate>

6. If this didn't happen, wait 24h and retry.

**Congratulations!** If all went well, you should now have a swarm with your desired Pokemon.

</Step>

</Stepper>

## Credits

- Fiask for writing the guide and writing the tool.
- Real96 for his [Gen 4 Swarm tool](https://github.com/Real96/Gen4SwarmDailyEncounterRNGTool), which this tool is a direct port of.
`;export{e as default};