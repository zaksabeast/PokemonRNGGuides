var e=`---
- title: "Diamond, Pearl, and Platinum Lottery RNG Guide"
  navDrawerTitle: "Lottery RNG"
  description: "Get unlimited Master Balls and Experience Shares in Diamond, Pearl, and Platinum with lottery RNG."
  slug: "retail-dppt-lottery"
  category: "Diamond, Pearl, and Platinum"
  section: "other_rng"
  variant: "retail"
  addedOn: "2026-07-19"
---

<Stepper titles={['Set up', 'Pick a Prize', 'Hit your seed', 'Advance to target', 'Get prize']}>

<Step step={0}>

## Set up

Choose the game and console you're playing below then continue to the next step.

<Gen4ConfigSetup onlyDppt />

</Step>

<Step step={1}>

## Pick a Prize

Type your TID and other info below, then choose the lottery prize you want to win.

<Lottery4Searcher />

</Step>

<Step step={2}>

## Prepare the save

1. If you're on Platinum, set your console date to **12/31/2099** on NDS or **12/31/2050** on 3DS.
2. Have at least one Chatot with Chatter (two is optimal).
3. Switch your Poketch to the Coin Flip app.
4. Save next to the Group NPC, south of the Jubilife TV station.

<Pixelate>

<EqualColumnTable>

| Group NPC                                                   | Coin Flip App                                                           |
| ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| ![Group NPC](/images/Diamond-Pearl-Platinum/group-npc.webp) | ![Poketch Coin Flip App](/images/Diamond-Pearl-Platinum/coin-flip.webp) |

</EqualColumnTable>

</Pixelate>

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
> If you don't have enough time to hit your seed, go back to the previous step and search for a prize with a higher "Max Delay".

<Gen4EmbeddedTimer />

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

<DpptCoinFlipSeedCalibrator />

</Step>

<Step step={3}>

## Advance to target

1. Press "Generate" below to generate a list of coin flips.
2. Flip the coin in the Poketch and click the heads or tails buttons to track your current advance.
3. Stop right before your target advance, then move on to the next step.

<DpptCoinFlipAdvanceFilter />

</Step>

<Step step={4}>

## Get prize

1. Talk to the group NPC to create a new group.
2. Save the game.
3. Turn off the game and change the console time to 11:59pm.
4. Load the game as fast as possible (still at 11:59pm).
5. Wait until the clock turns to 12:00am.
6. Talk to the Lottery NPC inside the Jubilife TV building to get your prize.

> [!WARNING]
> If you load your save at 12:00am, you will not get the correct prize!

<Pixelate>

<EqualColumnTable>

| Group NPC                                                   | Lottery Counter                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ![Group NPC](/images/Diamond-Pearl-Platinum/group-npc.webp) | ![Lottery Counter](/images/Diamond-Pearl-Platinum/Lottery/lottery-counter.webp) |

</EqualColumnTable>

</Pixelate>

**Congratulations!** You should have your winning prize!

</Step>

</Stepper>

## Credits

- Thanks to all [Pret](https://github.com/pret/pokeplatinum) contributors.
- Zaksabeast for writing this tool and guide.
`;export{e as default};