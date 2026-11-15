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
  addedOn: "2026-05-31"
  orderPriority: 3
- title: "HeartGold and SoulSilver Static RNG Guide"
  navDrawerTitle: "Legend, Gift, and Fossil RNG"
  description: "Learn how to RNG gift, legendary, fossil, NPC trade, and other static Pokémon in HeartGold and SoulSilver for perfect IVs, natures, and shinies."
  slug: "retail-hgss-static"
  category: "HeartGold and SoulSilver"
  section: "pokemon_rng"
  variant: "retail"
  isRoughDraft: true
---

<ShowIf slugs={["retail-dppt-static", "retail-dppt-honey-pokemon"]}>
  <Gen4Reset games="dppt" />
</ShowIf>

<ShowIf slug="retail-hgss-static">
  <Gen4Reset games="hgss" />
</ShowIf>

> [!NOTE]
> This guide is interactive and updates instructions based on your settings!

<ShowIf slug="retail-dppt-static">

<Gist>Get shiny legend and gift Pokémon with perfect IVs and natures.</Gist>

</ShowIf>

<ShowIf slug="retail-hgss-static">

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

<Gen4ConfigSetup />

<Gen4ShowIf game="hgss">

### Story progress

Before you start, you need to do one of these:

- Defeat Juggler Irwin on Route 35.
- Do **all three** of these:
  1. Hatch the Togepi egg and show Togepi to Professor Elm.
  2. Bring a Pokémon with Pokérus to a Pokémon Center.
  3. Step into the Kanto region.

</Gen4ShowIf>

</Step>

<Step step={1}>

## Pick a Pokémon

1. Fill out the tool below to find a Pokémon that suits you.
2. If you can't find a Pokémon you like, you can increase the min and max delays. This will increase the time to get the Pokémon.

<ShowIf slugs={["retail-dppt-static", "retail-hgss-static"]}>
  <Static4Searcher />
</ShowIf>

<ShowIf slug="retail-dppt-honey-pokemon">
  <Static4Searcher honey />
</ShowIf>

</Step>

<Step step={2}>

## Prepare the save

<Gen4ShowIf game="dppt">

If you're on Platinum, set your console date to **12/31/2099** on NDS or **12/31/2050** on 3DS.

</Gen4ShowIf>

1. Your party should have:

   <Gen4ShowIf game="dppt">

   - At least one Chatot with Chatter (two is optimal).

   </Gen4ShowIf>

   <Gen4ShowIf game="hgss">

   - Optionally, at least one Chatot with Chatter (two is optimal) if you want to advance the RNG with Chatot instead of Pokégear calls.

   </Gen4ShowIf>

   <Static4ShowIfLead lead="None">

   - A lead Pokémon without sync or cute charm.

   </Static4ShowIfLead>

   <Static4ShowIfLead lead="Cutecharm">

   - A lead Pokémon with the Cute Charm ability for your trainer's ID

   </Static4ShowIfLead>

   <Static4ShowIfLead lead="Synchronize">

   - A lead Pokémon with the Synchronize ability and <Static4SyncNature /> nature.

   </Static4ShowIfLead>

2. <Gen4ShowIf game="dppt">
     Switch your Poketch to the Coin Flip app.
   </Gen4ShowIf>
   <Gen4ShowIf game="hgss">
     Make sure you have the Pokégear so you can call Professor Elm or Juggler
     Irwin.
   </Gen4ShowIf>
3. Save in front of the Pokémon you want to RNG. <ShowIf slug="retail-dppt-honey-pokemon">If the area is raining, save in the nearest town instead.</ShowIf>

## Prepare the console

1. Set your console date to **<Gen4ConsoleSetDateString format="date" />**.
2. Start setting your console time to **<Gen4ConsoleSetDateString format="time" />**, but don't confirm it just yet.

| Confirm time screen                                                    |
| ---------------------------------------------------------------------- |
| ![Confirm time screen](/images/HeartGold-SoulSilver/SetTimeScreen.jpg) |

## Hit your seed

<Gen4ShowIf is3dsNormalSettings>
  [Learn how to use the 3DS Helper here](/3ds-helper).
</Gen4ShowIf>

1. Simultaneously press \`A\` to set the console time and start the timer below.
2. <Gen4ShowIf is3dsNormalSettings>
     Exit the settings on your console, restart your console, and start the
     game.
   </Gen4ShowIf>
   <Gen4ShowIf is3dsAltSettings>
     Press \`Start\` to exit the Alt Settings on your console, then start the
     game.
   </Gen4ShowIf>
   <Gen4ShowIf isNdsDsi>
     Exit the settings on your console and restart your console.
   </Gen4ShowIf>
3. When the first timer ends, <Gen4ShowIf is3dsNormalSettings is3dsAltSettings>press \`L + R + Start + Select\` to soft reset the game.</Gen4ShowIf><Gen4ShowIf isNdsDsi>press \`A\` to start the game.</Gen4ShowIf>
4. Get to the screen where you load your save.
5. Immediately press \`A\` when the second timer to goes off.

> [!TIP]
> If you don't have enough time to hit your seed, go back to the previous step and search for a Pokémon with a higher "Max Delay".

<Gen4EmbeddedTimer />

## Calibrate the seed

1. Click "Generate" below to generate a list of possible seeds you hit.
2. <Gen4ShowIf game="dppt">
     Flip the coin in the Poketch and click the heads or tails buttons below to
     filter results.
   </Gen4ShowIf>
   <Gen4ShowIf game="hgss">
     **Immediately** open the menu as fast as possible when the save loads to
     stop NPCs from moving. Then call Professor Elm or Juggler Irwin with the
     Pokégear and click the button below that matches what they talk about to
     filter results.
   </Gen4ShowIf>
3. If you have one result left and it isn't your target seed, click "Calibrate".
4. Try to hit your target again.
5. If the "Flip Delay" column is checked for the Pokémon you hit, take one of these actions:
   - Insert a GBA cart.
   - <Gen4ShowIf game="hgss">
       Use the touch screen to press the down and up arrows on the continue
       screen.
     </Gen4ShowIf>
     <Gen4ShowIf game="dppt">
       Click "New Game", then press \`B\` to return to the continue screen.
     </Gen4ShowIf>
   - If you've flipped the delay, you need to keep flipping it every time.

> [!TIP]
> If you don't see your seed, increase the delay and second offsets and try again.

<Gen4SeedCalibrator />

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

<ShowIf slugs={["retail-dppt-static", "retail-hgss-static"]}>

Follow these steps once you've hit your target seed.

<Gen4ShowIf game="hgss">

Choose whether you'll advance the RNG with Pokégear calls or Chatot.

<Gen4AdvanceMethodSetup />

</Gen4ShowIf>

<Gen4ShowIf advanceMethod="chatot">

1. <Gen4ShowIf game="dppt">
     **Immediately** open your party menu as fast as possible when the save
     loads.
   </Gen4ShowIf>
   <Gen4ShowIf game="hgss">Open your party menu.</Gen4ShowIf>
2. Open Chatot's summary screen and enter the Chatter pitches below until you're 1 advance before your target.
3. Exit the party and catch or receive your target Pokémon.

</Gen4ShowIf>

<Gen4ShowIf advanceMethod="pokegearCall">

1. Call Professor Elm or Juggler Irwin with the Pokégear and enter their responses below until you're 1 advance before your target.
2. Catch or receive your target Pokémon.

</Gen4ShowIf>

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

<Gen4LcrngAdvanceFilter />

</Step>

<Step step={4}>

### Calibrate Advances

Use this if you didn't get your Pokémon after advancing the correct number of times and verifying <Gen4ShowIf advanceMethod="chatot">Chatter pitches</Gen4ShowIf><Gen4ShowIf advanceMethod="pokegearCall">Pokégear call responses</Gen4ShowIf>.

1. Check your Pokémon stats.
2. Fill out the form below with the stats of the Pokémon you caught and click "Generate".
3. Click "Calibrate Advance" to adjust your <Gen4ShowIf advanceMethod="chatot">Chatot summary</Gen4ShowIf><Gen4ShowIf advanceMethod="pokegearCall">Pokégear call</Gen4ShowIf> count, or use the "Calibrate Timer" to adjust your seed timing.
4. Try to hit your target again.

> [!NOTE]
> If you flipped the delay while calibrating your seed, you need to keep flipping it every time.

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