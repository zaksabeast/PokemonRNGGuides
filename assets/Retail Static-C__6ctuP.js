var e=`---
- title: "Diamond, Pearl, and Platinum Legend, Gift, and Fossil RNG Guide"
  navDrawerTitle: "Legend, Gift, and Fossil RNG"
  description: "Learn how to RNG gift, legendary, fossil, NPC trade, and other static Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies."
  slug: "retail-dppt-static"
  category: "Diamond, Pearl, and Platinum"
  section: "pokemon_rng"
  variant: "retail"
  addedOn: "2026-04-05"
  orderPriority: 2
- title: "Diamond, Pearl, and Platinum Honey Pokémon RNG Guide"
  navDrawerTitle: "Honey Pokémon RNG"
  description: "Learn how to RNG honey Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies."
  slug: "retail-dppt-honey-pokemon"
  category: "Diamond, Pearl, and Platinum"
  section: "pokemon_rng"
  variant: "retail"
  isRoughDraft: true
  orderPriority: 3
---

> [!NOTE]
> This guide is interactive and updates instructions based on your settings!

<ShowIf slug="retail-dppt-static">

<Gist>Get shiny legend and gift Pokémon with perfect IVs and natures.</Gist>

</ShowIf>

<ShowIf slug="retail-dppt-honey-pokemon">

<Gist>Get shiny honey Pokémon with perfect IVs and natures.</Gist>

</ShowIf>

<Stepper titles={["Set up", "Pick a Pokémon", "Hit your seed", "Get the Pokémon", "Calibrate"]}>

<Step step={0}>

## Set up

<ShowIf slug="retail-dppt-honey-pokemon">

Follow our [Honey Tree setup guide](/retail-dppt-honey-tree) to set up your desired Pokémon. Once you're done, come back here to continue.

</ShowIf>

Choose the game and console you're playing below then continue to the next step.

<Gen4StaticSetup />

<Static4ShowIf is3dsNormalSettings>
  [Learn how to use the 3DS Helper here](/3ds-helper).
</Static4ShowIf>

<Static4ShowIf is3dsAltSettings>
  [Download the 3DS Alt Settings app here](/3ds-alt-settings).
</Static4ShowIf>

</Step>

<Step step={1}>

## Pick a Pokémon

1. Fill out the tool below to find a starter that suits you.
2. If you can't find a Pokémon you like, you can increase the min and max delays. This will increase the time to get the Pokémon.

<ShowIf slug="retail-dppt-static">
  <Static4Searcher />
</ShowIf>

<ShowIf slug="retail-dppt-honey-pokemon">
  <Static4Searcher honey />
</ShowIf>

</Step>

<Step step={2}>

## Prepare the save

1. If you're on Platinum, set your console date to **12/31/2099** on NDS or **12/31/2050** on 3DS.
2. Your party should have:

   <Static4ShowIfLead lead="None">

   - At least one Chatot with Chatter (two is optimal).
   - A lead Pokémon without sync or cute charm.

   </Static4ShowIfLead>

   <Static4ShowIfLead lead="Cutecharm">

   - At least one Chatot with Chatter (two is optimal).
   - A lead Pokémon with the Cute Charm ability for your trainer's ID

   </Static4ShowIfLead>

   <Static4ShowIfLead lead="Synchronize">

   - At least one Chatot with Chatter (two is optimal).
   - A lead Pokémon with the Synchronize ability and <Static4SyncNature /> nature.

   </Static4ShowIfLead>

3. Switch your Poketch to the Coin Flip app.
4. Save in front of the Pokémon you want to RNG. <ShowIf slug="retail-dppt-honey-pokemon">If the area is raining, save in the nearest town instead.</ShowIf>

## Prepare the console

1. Set your console date to **<Static4ConsoleSetDateString format="date" />**.
2. Start setting your console time to **<Static4ConsoleSetDateString format="time" />**, but don't confirm it just yet.

| Confirm time screen                                                    |
| ---------------------------------------------------------------------- |
| ![Confirm time screen](/images/HeartGold-SoulSilver/SetTimeScreen.jpg) |

## Hit your seed

<Static4ShowIf is3dsNormalSettings>
  [Learn how to use the 3DS Helper here](/3ds-helper).
</Static4ShowIf>

1. Simultaneously press \`A\` to set the console time and start the timer below.
2. <Static4ShowIf is3dsNormalSettings>
     Exit the settings on your console, restart your console, and start the
     game.
   </Static4ShowIf>
   <Static4ShowIf is3dsAltSettings>
     Press \`Start\` to exit the Alt Settings on your console, then start the
     game.
   </Static4ShowIf>
   <Static4ShowIf isNdsDsi>
     Exit the settings on your console and restart your console.
   </Static4ShowIf>
3. When the first timer ends, <Static4ShowIf is3dsNormalSettings is3dsAltSettings>press \`L + R + Start + Select\` to soft reset the game.</Static4ShowIf><Static4ShowIf isNdsDsi>press \`A\` to start the game.</Static4ShowIf>
4. Get to the screen where you load your save.
5. Immediately press \`A\` when the second timer to goes off.

> [!TIP]
> If you don't have enough time to hit your seed, go back to the previous step and search for a Pokémon with a higher "Max Delay".

<Static4Timer />

## Calibrate the seed

1. Click "Generate" below to generate a list of possible seeds you hit.
2. Flip the coin in the Poketch and click the heads or tails buttons below to filter results.
3. If you have one result left and it isn't your target seed, click "Calibrate".
4. Try to hit your target again.
5. If the "Flip Delay" column is checked for the Pokémon you hit, take one of these actions:
   - For **Any game**, insert a GBA cart
   - For **HeartGold and SoulSilver**, use the touch screen to press the down and up arrows on the continue screen.
   - For **Diamond, Pearl, and Platinum**, click "New Game", then press \`B\` to return to the continue screen.
   - If you've flipped the delay, you need to keep flipping it every time.

> [!TIP]
> If you don't see your seed, increase the delay and second offsets and try again.

<Static4HitSeed />

</Step>

<Step step={3}>

<ShowIf slug="retail-dppt-honey-pokemon">

## Optional: Quiet NPCs

You can skip this if you can open/close your party fast enough to avoid NPC noise. Otherwise, this makes things more consistent.

1. Battle every NPC for your tree in the [Honey Tree NPC list](/dppt-honey-tree-npcs).
2. If an NPC won't battle, use the VS Seeker.
3. Defeat **all** NPCs the VS Seeker finds.

#### Notes

- If the VS Seeker says an NPC isn't ready, try again.
- Do not leave the area, or NPCs will reset.
- The VS Seeker can trigger multiple NPCs at once, so keep only your target NPC on screen when using it.

</ShowIf>

## Get your Pokémon

<ShowIf slug="retail-dppt-static">

Follow these steps once you've hit your target seed.

1. **Immediately** open your party menu as fast as possible when the save loads.
2. Open Chatot's summary screen **<Static4ChatotCount />** times to advance the RNG. Verify the Chatter pitches below.
3. Exit the party and catch or receive your target Pokémon.

</ShowIf>

<ShowIf slug="retail-dppt-honey-pokemon">

Follow these steps once you've hit your target seed and quieted the NPCs.

1. Stand in front of your tree and open your party menu.
2. Click "Generate" to view a list of Chatter pitches.
3. View Chatot's summary to hear the Chatter sound.
4. Select "Low", "Medium", or "High" to match the pitch you hear and identify your current RNG advance.
5. Repeat steps 3 and 4 until you're 1 advance before your target.
6. Exit the party and press \`A\` to start the battle or receive the Pokémon.

> [!TIP]
> If you're skipping the quiet NPC step and starting immediately after loading your save, open and close your party **as fast as possible**.

</ShowIf>

<ShowIf slug="retail-dppt-static">
  <Static4ChatterFilter />
</ShowIf>

<ShowIf slug="retail-dppt-honey-pokemon">
  <Static4ChatterFilter honey />
</ShowIf>

</Step>

<Step step={4}>

### Calibrate Advances

Use this if you didn't get your Pokémon after advancing the correct number of times and verifying Chatter pitches.

1. Check your Pokémon stats.
2. Fill out the form below with the stats of the Pokémon you caught and click "Generate".
3. Click "Calibrate Advance" to adjust your Chatot summary count, or use the "Calibrate Timer" to adjust your seed timing.
4. Try to hit your target again.

> [!TIP]
> If you can't find the Pokémon you hit, increase the advance range, delay range, and/or seconds range in the calibrator to expand your search.

<Static4Calibrator />

</Step>

</Stepper>

## Credits

- Sorendog and Zaksabeast for writing this tool.
- Thanks to all [PokeFinder](https://github.com/Admiral-Fish/PokeFinder) contributors, whose work this tool is built upon.
- Bilbo and Fiask for helping test this tool and providing feedback.
`;export{e as default};