var e=`---
title: "Pokémon Emerald RNG with ACE Guide (Seed Manipulation & Setup)"
description: "Step-by-step guide to RNG manipulation in Pokémon Emerald using ACE. Learn how to set custom seeds, generate targets, calibrate advances, and reliably hit perfect Pokémon."
navDrawerTitle: "RNG With ACE"
slug: "emerald-rng-with-ace"
category: "Emerald"
section: "rng_technique"
addedOn: "2026-05-05"
variant: "retail"
---

## Tools

- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [A stable ACE species](https://e-sh4rk.github.io/ACE3/emerald/getting-started/introduction/)
- [Mystic Timer](/mystic-timer)
- A Pokémon with Sweet Scent (only for wild)
- At least one free slot in the party (optional, recommended to calibrate faster)

> [!IMPORTANT]
> This guide assumes a basic knowledge of Gen 3 RNG.
> Pokémon obtained with this method are not illegal despite the use of ACE.

## Step 1: Preparation of the Seed and the Code

Prepare your target and generate the ACE code to change the Initial Seed.

1. Open PokeFinder → Gen 3 → Wild/Static.
2. Go to the "Researcher" tab and filter the target Pokémon. If it is wild, select "Wild 2". Do not close PokeFinder.
   - ![Searching target with PokeFinder](/images/Emerald/ACE/SearchingTarget.webp)
3. Copy the Seed of your target.
4. Use [this script by E-Sh4rk](https://e-sh4rk.github.io/CodeGenerator/scripts/seed/index.html) to obtain the seed to use for the code.
   - ![First Script](/images/Emerald/ACE/1stScript.webp)
5. Paste the Seed adding \`0x\` at the beginning.
6. Enter \`5\` as category.
7. Set the range to \`-900 -900\` (~15 seconds).
8. Copy the Seed generated in output.
9. Use the [ACE script generator by E-Sh4rk](https://e-sh4rk.github.io/CodeGenerator/index.html) to obtain the code.
   - ![ACE Script Generator](/images/Emerald/ACE/2ndScript.webp)
10. Go to "RNG and PID Manipulation" and select "Change PRNG Seed".
11. Paste the Seed keeping \`0x\` and finally click "Compute".
12. Enter all the codes into the game.
13. Save and execute the script to verify that it works.

> [!WARNING]
> If the game crashes or freezes, check the codes and make sure there are no Pokémon or ghost data in Boxes 12, 13, 14 and in the last row of Box 11. Repeat until the Pokédex diploma appears.
>
> <br />
>
> This is how to remove ghost data. Do this in Box 11, 12, 13, 14 if you encounter issues.
>
> <br />
> ![Remove Ghost Data](/images/Emerald/ACE/RemoveGhostData.webp)

## Step 2: RNG of the Pokémon

Perform the RNG after setting the new Initial Seed.

1. Save in the correct spot to capture your target.
2. Open Mystic Timer and select Gen 3.
3. Set the timer with \`Target Advance = 900\`.
4. Start the timer and open the ACE species info at the same time.
5. Proceed as in a classic RNG.

| Mystic Timer Config                                           |
| ------------------------------------------------------------- |
| ![Mystic Timer and ACE](/images/Emerald/ACE/TimerConfig.webp) |

## Step 3: Calibration

Calibration is different because the Seed has been modified directly.

1. Configure the settings based on the capture location. If it is wild, select "Wild 2".
2. On Generator tab, paste the Current Seed you've used in the Code Generator into \`Initial Advance\` field and hit generate.
3. Filter and find the Pokémon you've actually hit.
4. Calibrate the value PokeFinder outputs.
5. Repeat until you obtain the desired Pokémon.

## Troubleshooting

- The IVs may be incorrect even if everything else is correct. The use of ACE can in fact alter audio or graphics. This affects the cycle counter of the wild method, generating one different from Wild 2.
- If the IVs do not match, the only solution is to try again.

## Credits

- Fiask for writing this guide and translating it to Italian.
`;export{e as default};