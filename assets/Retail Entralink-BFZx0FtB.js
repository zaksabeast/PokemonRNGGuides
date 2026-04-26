import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-B5eGYVya.js";var n=e(),r={title:`Black and White Retail Entralink RNG`,navDrawerTitle:`Entralink RNG`,description:`Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.`,slug:`retail-bw-entralink`,category:`Black and White`,isRoughDraft:!0,section:`pokemon_rng`,variant:`retail`};function i(e){let r={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:(0,n.jsx)(r.em,{children:`Guide originally written by NickPlayeZ on Discord.`})}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://ci.appveyor.com/project/Bambo-Rambo/rngreporter/build/artifacts`,children:`Rambo's RNG Reporter`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Understanding C-Gear RNG`}),`
`,(0,n.jsx)(r.p,{children:`C-Gear RNG in BW1 has three phases:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Hitting Initial Seed`}),` – Determines nature (PID).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Hitting C-Gear Seed`}),` – Determines IVs.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Advancing to Target Nature`}),` – Ensures correct nature using Initial Seed.`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.strong,{children:`C-Gear Seed`}),` is set upon entering `,(0,n.jsx)(r.strong,{children:`Entralink`}),`, independent of the Initial Seed. It depends on:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Exact Date & Time`}),` (down to the second).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Delay`}),` (time elapsed in visual frames since game load; 30fps).`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Preparation`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Have a `,(0,n.jsx)(r.strong,{children:`Pokémon in your Entree Forest`}),` to RNG. Ideally, only `,(0,n.jsx)(r.strong,{children:`one`}),` in the first Center Area to avoid unnecessary frame advancements.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.em,{children:`(Optional)`}),` Use `,(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.a,{href:`https://github.com/kuroppoi/entralinked`,children:`Entralinked`})}),` as a Game Sync emulator for Pokémon Black & White.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.em,{children:`(Optional but recommended)`}),` Gather `,(0,n.jsx)(r.strong,{children:`20-30 Rare Candies`}),`. Most Entralink Pokémon are level 10, so these will help determine exact IVs. If low on Rare Candies, RNG manipulate Pickup in Gen 5 to farm them efficiently.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Be in a `,(0,n.jsx)(r.strong,{children:`location without moving NPCs`}),`. Marvelous Bridge is recommended as it has no NPCs and low background noise, making Chatot verification easier.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Have at least `,(0,n.jsx)(r.strong,{children:`one Chatot`}),` to verify RNG advances, as required for Gen 5 RNG.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Finding Your Target Seeds`}),`
`,(0,n.jsx)(r.h3,{children:`Finding the C-Gear Seed (Pokefinder C-Gear)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open Pokefinder.`}),`
`,(0,n.jsxs)(r.li,{children:[`Open `,(0,n.jsx)(r.strong,{children:`Gen 5 Stationary`}),`, go to `,(0,n.jsx)(r.strong,{children:`Searcher tab`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set parameters:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Method:`}),` IVs C-Gear.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Min Delay:`}),` 3000 | `,(0,n.jsx)(r.strong,{children:`Max Delay:`}),` 12000 (or adjust as needed).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Min Advances:`}),` 15 | `,(0,n.jsx)(r.strong,{children:`Max Advances:`}),` 20.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`IV Filters:`}),` Set target IVs.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Date Range:`}),` Any year (20xx-01-01 to 20xx-12-31).`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.strong,{children:`Search`}),`.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`If no results, `,(0,n.jsx)(r.strong,{children:`increase Max Delay`}),` or `,(0,n.jsx)(r.strong,{children:`broaden IV ranges`}),`.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Finding the Initial Seed (Entralink Seed Search)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Open `,(0,n.jsx)(r.strong,{children:`RNG Reporter`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Copy your `,(0,n.jsx)(r.strong,{children:`BW1 profile data`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Go to `,(0,n.jsx)(r.strong,{children:`5th Gen Tools > Entralink Seed Search`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Paste your `,(0,n.jsx)(r.strong,{children:`C-Gear Seed`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set parameters:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Year:`}),` Match the C-Gear Seed's year.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Max Advances:`}),` 60.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Target Nature:`}),` Select desired nature.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.strong,{children:`Search`}),`.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If "invalid seed" error appears, try a different one from Pokefinder.`}),`
`,(0,n.jsx)(r.li,{children:`Ignore IVs showing as 0 (a display bug).`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Pick a target `,(0,n.jsx)(r.strong,{children:`Initial Seed`}),`:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`On `,(0,n.jsx)(r.strong,{children:`DS/Lite/i`}),`: Select one with `,(0,n.jsx)(r.strong,{children:`20-30 seconds`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`On `,(0,n.jsx)(r.strong,{children:`3DS/2DS`}),`: Select one with `,(0,n.jsx)(r.strong,{children:`40-50 seconds`}),`.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Setting Up Tools`}),`
`,(0,n.jsx)(r.h3,{children:`Adjacent Seed Tool (Verifying Initial Seed)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Open `,(0,n.jsx)(r.strong,{children:`5th Gen Tools > Adjacent Seed Tool`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.strong,{children:`BW1 profile`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set parameters:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Method:`}),` IVs (Standard Seed).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Min & Max Frame:`}),` 1.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Seconds ±:`}),` 1 (DS/Lite/i) or 3 (3DS/2DS).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Date & Time:`}),` From Entralink Seed Search.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.strong,{children:`Generate`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Compare `,(0,n.jsx)(r.strong,{children:`Chatot pitches`}),` to confirm your Initial Seed.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Seed to Time (For Hitting C-Gear Seed)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Open `,(0,n.jsx)(r.strong,{children:`Seed to Time`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Paste `,(0,n.jsx)(r.strong,{children:`C-Gear Seed`}),` into the `,(0,n.jsx)(r.strong,{children:`Seed field`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.strong,{children:`BW (C-Gear Seed)`}),` option.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set parameters:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Year:`}),` Match Initial Seed’s year.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Seconds checkbox:`}),` Unchecked.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`BW1 profile selected`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.strong,{children:`Generate`}),` (top-right).`]}),`
`,(0,n.jsxs)(r.li,{children:[`Scroll to your `,(0,n.jsx)(r.strong,{children:`C-Gear Seed’s target Date/Time`}),` from Entralink Seed Search.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Adjust parameters:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Delays:`}),` ±100 (increase to ±300 if needed).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Seconds ±:`}),` 7.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Frame Min:`}),` 21 | `,(0,n.jsx)(r.strong,{children:`Frame Max:`}),` 31.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.strong,{children:`Generate (bottom-right)`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`IVRNG frame shifts occur every 128 steps, advancing by the number of Pokémon in your party.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Setting Up Mystic Timer`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Open `,(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`, select the `,(0,n.jsx)(r.strong,{children:`Gen 5 tab`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Choose `,(0,n.jsx)(r.strong,{children:`Mode: Entralink`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set calibration:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`DS/Lite/i`}),`: ~-95.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`3DS/DSi`}),`: ~-400 to -500.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set `,(0,n.jsx)(r.strong,{children:`target delay`}),` and `,(0,n.jsx)(r.strong,{children:`target seconds`}),` from Seed to Time.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set `,(0,n.jsx)(r.strong,{children:`Entralink Calibration`}),` to 315 (adjust later if needed).`]}),`
`,(0,n.jsx)(r.li,{children:`Ignore "Minutes before target: 1." Set time/date to match Adjacent Seed Tool.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Performing the RNG`}),`
`,(0,n.jsx)(r.h3,{children:`Phase 1: Hitting the Initial Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Set console date/time as shown in Adjacent Seed Tool.`}),`
`,(0,n.jsxs)(r.li,{children:[`Start `,(0,n.jsx)(r.strong,{children:`Mystic Timer`}),`, then confirm time in console settings.`]}),`
`,(0,n.jsxs)(r.li,{children:[`When the timer runs out, start the game `,(0,n.jsx)(r.strong,{children:`without pressing any buttons`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Let the season screen fade on its own.`}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.strong,{children:`5-10 Chatot calls`}),` to verify the seed (check Adjacent Seed Tool for pitch comparison).`]}),`
`,(0,n.jsx)(r.li,{children:`If on the wrong seed, check against adjacent seeds.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Phase 2: Hitting the C-Gear Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Activate C-Gear`}),`, dismiss the pop-up, press `,(0,n.jsx)(r.code,{children:`X > B`}),` to skip loading.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Tap `,(0,n.jsx)(r.strong,{children:`Wireless > Entralink`}),`, but `,(0,n.jsx)(r.strong,{children:`DO NOT press A or B yet`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`When the timer beeps, press `,(0,n.jsx)(r.code,{children:`A`}),` or `,(0,n.jsx)(r.code,{children:`B`}),` to enter Entralink.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Catch the Pokémon immediately and calculate `,(0,n.jsx)(r.strong,{children:`exact IVs`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Phase 3: Checking the Hit Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Open `,(0,n.jsx)(r.strong,{children:`Seed to Time`}),`, use "Search IVs".`]}),`
`,(0,n.jsxs)(r.li,{children:[`If no match, expand `,(0,n.jsx)(r.strong,{children:`delay range`}),` to ±300 and retry.`]}),`
`,(0,n.jsx)(r.li,{children:`If still no match, double-check time/date inputs.`}),`
`,(0,n.jsxs)(r.li,{children:[`If close to target delay, do `,(0,n.jsx)(r.strong,{children:`not`}),` adjust yet.`]}),`
`,(0,n.jsxs)(r.li,{children:[`If off by more than 5 delay, enter hit values in `,(0,n.jsx)(r.strong,{children:`Mystic Timer`}),` and update.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Calibration will adjust accordingly`}),` (e.g., 0 → -90).`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`If results are inconsistent, widen search parameters slightly.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Advancing frames`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Pay attention to the `,(0,n.jsx)(r.strong,{children:`IVRNG Frame`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Subtract `,(0,n.jsx)(r.strong,{children:`13`}),` from your target frame. You will advance frames until you hit that.`]}),`
`,(0,n.jsx)(r.li,{children:`Advance frames by walking around. Only have 1 Pokémon in your party to avoid advancing too many frames at once.`}),`
`,(0,n.jsx)(r.li,{children:`When you hit your IVRNG Frame, interact with your target Pokémon immediately. Make a save state and enter the battle.`}),`
`,(0,n.jsx)(r.li,{children:`If done correctly, you will get the correct IVs on your target. Yay!`}),`
`,(0,n.jsx)(r.li,{children:`To get your Nature, move to Step 6 or reload the save state and re-catch the Pokémon.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Congrats! You've now got your Pokémon!`})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};