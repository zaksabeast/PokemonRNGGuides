import{g7 as i,j as e}from"./index-BQ_qSqp-.js";const l={title:"Black and White Retail Entralink RNG",navDrawerTitle:"Entralink RNG",description:"Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.",slug:"retail-bw-entralink",category:"Black and White",isRoughDraft:!0,tag:"retail"};function r(s){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:e.jsx(n.em,{children:"Guide originally written by NickPlayeZ on Discord."})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://ci.appveyor.com/project/Bambo-Rambo/rngreporter/build/artifacts",children:"Rambo's RNG Reporter"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mystic-timer",children:"Mystic Timer"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Understanding C-Gear RNG"}),`
`,e.jsx(n.p,{children:"C-Gear RNG in BW1 has three phases:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hitting Initial Seed"})," – Determines nature (PID)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hitting C-Gear Seed"})," – Determines IVs."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Advancing to Target Nature"})," – Ensures correct nature using Initial Seed."]}),`
`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.strong,{children:"C-Gear Seed"})," is set upon entering ",e.jsx(n.strong,{children:"Entralink"}),", independent of the Initial Seed. It depends on:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Exact Date & Time"})," (down to the second)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Delay"})," (time elapsed in visual frames since game load; 30fps)."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Preparation"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Have a ",e.jsx(n.strong,{children:"Pokémon in your Entree Forest"})," to RNG. Ideally, only ",e.jsx(n.strong,{children:"one"})," in the first Center Area to avoid unnecessary frame advancements."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"(Optional)"})," Use ",e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/kuroppoi/entralinked",children:"Entralinked"})})," as a Game Sync emulator for Pokémon Black & White."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"(Optional but recommended)"})," Gather ",e.jsx(n.strong,{children:"20-30 Rare Candies"}),". Most Entralink Pokémon are level 10, so these will help determine exact IVs. If low on Rare Candies, RNG manipulate Pickup in Gen 5 to farm them efficiently."]}),`
`,e.jsxs(n.li,{children:["Be in a ",e.jsx(n.strong,{children:"location without moving NPCs"}),". Marvelous Bridge is recommended as it has no NPCs and low background noise, making Chatot verification easier."]}),`
`,e.jsxs(n.li,{children:["Have at least ",e.jsx(n.strong,{children:"one Chatot"})," to verify RNG advances, as required for Gen 5 RNG."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Finding Your Target Seeds"}),`
`,e.jsx(n.h3,{children:"Finding the C-Gear Seed (Pokefinder C-Gear)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Pokefinder."}),`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.strong,{children:"Gen 5 Stationary"}),", go to ",e.jsx(n.strong,{children:"Searcher tab"}),"."]}),`
`,e.jsxs(n.li,{children:["Set parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Method:"})," IVs C-Gear."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Min Delay:"})," 3000 | ",e.jsx(n.strong,{children:"Max Delay:"})," 12000 (or adjust as needed)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Min Advances:"})," 15 | ",e.jsx(n.strong,{children:"Max Advances:"})," 20."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"IV Filters:"})," Set target IVs."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Date Range:"})," Any year (20xx-01-01 to 20xx-12-31)."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.strong,{children:"Search"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If no results, ",e.jsx(n.strong,{children:"increase Max Delay"})," or ",e.jsx(n.strong,{children:"broaden IV ranges"}),"."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{children:"Finding the Initial Seed (Entralink Seed Search)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.strong,{children:"RNG Reporter"}),"."]}),`
`,e.jsxs(n.li,{children:["Copy your ",e.jsx(n.strong,{children:"BW1 profile data"}),"."]}),`
`,e.jsxs(n.li,{children:["Go to ",e.jsx(n.strong,{children:"5th Gen Tools > Entralink Seed Search"}),"."]}),`
`,e.jsxs(n.li,{children:["Paste your ",e.jsx(n.strong,{children:"C-Gear Seed"}),"."]}),`
`,e.jsxs(n.li,{children:["Set parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Year:"})," Match the C-Gear Seed's year."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Max Advances:"})," 60."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Target Nature:"})," Select desired nature."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.strong,{children:"Search"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If "invalid seed" error appears, try a different one from Pokefinder.'}),`
`,e.jsx(n.li,{children:"Ignore IVs showing as 0 (a display bug)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Pick a target ",e.jsx(n.strong,{children:"Initial Seed"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["On ",e.jsx(n.strong,{children:"DS/Lite/i"}),": Select one with ",e.jsx(n.strong,{children:"20-30 seconds"}),"."]}),`
`,e.jsxs(n.li,{children:["On ",e.jsx(n.strong,{children:"3DS/2DS"}),": Select one with ",e.jsx(n.strong,{children:"40-50 seconds"}),"."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Setting Up Tools"}),`
`,e.jsx(n.h3,{children:"Adjacent Seed Tool (Verifying Initial Seed)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.strong,{children:"5th Gen Tools > Adjacent Seed Tool"}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.strong,{children:"BW1 profile"}),"."]}),`
`,e.jsxs(n.li,{children:["Set parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Method:"})," IVs (Standard Seed)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Min & Max Frame:"})," 1."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Seconds ±:"})," 1 (DS/Lite/i) or 3 (3DS/2DS)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Date & Time:"})," From Entralink Seed Search."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.strong,{children:"Generate"}),"."]}),`
`,e.jsxs(n.li,{children:["Compare ",e.jsx(n.strong,{children:"Chatot pitches"})," to confirm your Initial Seed."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Seed to Time (For Hitting C-Gear Seed)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.strong,{children:"Seed to Time"}),"."]}),`
`,e.jsxs(n.li,{children:["Paste ",e.jsx(n.strong,{children:"C-Gear Seed"})," into the ",e.jsx(n.strong,{children:"Seed field"}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.strong,{children:"BW (C-Gear Seed)"})," option."]}),`
`,e.jsxs(n.li,{children:["Set parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Year:"})," Match Initial Seed’s year."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Seconds checkbox:"})," Unchecked."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"BW1 profile selected"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.strong,{children:"Generate"})," (top-right)."]}),`
`,e.jsxs(n.li,{children:["Scroll to your ",e.jsx(n.strong,{children:"C-Gear Seed’s target Date/Time"})," from Entralink Seed Search."]}),`
`,e.jsxs(n.li,{children:["Adjust parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Delays:"})," ±100 (increase to ±300 if needed)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Seconds ±:"})," 7."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Frame Min:"})," 21 | ",e.jsx(n.strong,{children:"Frame Max:"})," 31."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.strong,{children:"Generate (bottom-right)"}),"."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`IVRNG frame shifts occur every 128 steps, advancing by the number of Pokémon in your party.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: Setting Up Mystic Timer"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.strong,{children:e.jsx(n.a,{href:"/mystic-timer",children:"Mystic Timer"})}),", select the ",e.jsx(n.strong,{children:"Gen 5 tab"}),"."]}),`
`,e.jsxs(n.li,{children:["Choose ",e.jsx(n.strong,{children:"Mode: Entralink"}),"."]}),`
`,e.jsxs(n.li,{children:["Set calibration:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"DS/Lite/i"}),": ~-95."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"3DS/DSi"}),": ~-400 to -500."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.strong,{children:"target delay"})," and ",e.jsx(n.strong,{children:"target seconds"})," from Seed to Time."]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.strong,{children:"Entralink Calibration"})," to 315 (adjust later if needed)."]}),`
`,e.jsx(n.li,{children:'Ignore "Minutes before target: 1." Set time/date to match Adjacent Seed Tool.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Performing the RNG"}),`
`,e.jsx(n.h3,{children:"Phase 1: Hitting the Initial Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Set console date/time as shown in Adjacent Seed Tool."}),`
`,e.jsxs(n.li,{children:["Start ",e.jsx(n.strong,{children:"Mystic Timer"}),", then confirm time in console settings."]}),`
`,e.jsxs(n.li,{children:["When the timer runs out, start the game ",e.jsx(n.strong,{children:"without pressing any buttons"}),"."]}),`
`,e.jsx(n.li,{children:"Let the season screen fade on its own."}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.strong,{children:"5-10 Chatot calls"})," to verify the seed (check Adjacent Seed Tool for pitch comparison)."]}),`
`,e.jsx(n.li,{children:"If on the wrong seed, check against adjacent seeds."}),`
`]}),`
`,e.jsx(n.h3,{children:"Phase 2: Hitting the C-Gear Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Activate C-Gear"}),", dismiss the pop-up, press ",e.jsx(n.code,{children:"X > B"})," to skip loading."]}),`
`,e.jsxs(n.li,{children:["Tap ",e.jsx(n.strong,{children:"Wireless > Entralink"}),", but ",e.jsx(n.strong,{children:"DO NOT press A or B yet"}),"."]}),`
`,e.jsxs(n.li,{children:["When the timer beeps, press ",e.jsx(n.code,{children:"A"})," or ",e.jsx(n.code,{children:"B"})," to enter Entralink."]}),`
`,e.jsxs(n.li,{children:["Catch the Pokémon immediately and calculate ",e.jsx(n.strong,{children:"exact IVs"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Phase 3: Checking the Hit Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.strong,{children:"Seed to Time"}),', use "Search IVs".']}),`
`,e.jsxs(n.li,{children:["If no match, expand ",e.jsx(n.strong,{children:"delay range"})," to ±300 and retry."]}),`
`,e.jsx(n.li,{children:"If still no match, double-check time/date inputs."}),`
`,e.jsxs(n.li,{children:["If close to target delay, do ",e.jsx(n.strong,{children:"not"})," adjust yet."]}),`
`,e.jsxs(n.li,{children:["If off by more than 5 delay, enter hit values in ",e.jsx(n.strong,{children:"Mystic Timer"})," and update."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Calibration will adjust accordingly"})," (e.g., 0 → -90)."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If results are inconsistent, widen search parameters slightly.
`})}),`
`,e.jsx(n.h2,{children:"Step 4: Advancing frames"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Pay attention to the ",e.jsx(n.strong,{children:"IVRNG Frame"}),"."]}),`
`,e.jsxs(n.li,{children:["Subtract ",e.jsx(n.strong,{children:"13"})," from your target frame. You will advance frames until you hit that."]}),`
`,e.jsx(n.li,{children:"Advance frames by walking around. Only have 1 Pokémon in your party to avoid advancing too many frames at once."}),`
`,e.jsx(n.li,{children:"When you hit your IVRNG Frame, interact with your target Pokémon immediately. Make a save state and enter the battle."}),`
`,e.jsx(n.li,{children:"If done correctly, you will get the correct IVs on your target. Yay!"}),`
`,e.jsx(n.li,{children:"To get your Nature, move to Step 6 or reload the save state and re-catch the Pokémon."}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You've now got your Pokémon!"})]})}function d(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{d as default,l as frontmatter};
