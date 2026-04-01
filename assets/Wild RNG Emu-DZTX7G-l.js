import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CRE-SdEk.js";var n=e(),r=[{title:`Black 2 and White 2 Wild RNG`,navDrawerTitle:`Wild RNG`,description:`Learn how to RNG wild Pokémon in Black 2 and White 2 for shiny and high-IV results.`,slug:`emulator-b2w2-wild`,category:`Black 2 and White 2`,addedOn:`2026-03-08`,section:`pokemon_rng`,variant:`cfw-emu`},{title:`Black and White Wild RNG`,navDrawerTitle:`Wild RNG`,description:`Learn how to RNG wild Pokémon in Black and White for shiny and high-IV results.`,slug:`emulator-bw-wild`,category:`Black and White`,addedOn:`2026-03-08`,section:`pokemon_rng`,variant:`cfw-emu`,canonical:`emulator-b2w2-wild`}];function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/emulator-bw-find-ds-parameters`,children:`A configured game profile`})}),`
`,(0,n.jsx)(r.li,{children:`Chatot with Chatter`}),`
`,(0,n.jsx)(r.li,{children:`A Pokémon with Sweet Scent or have Honey in bag`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Understand Gen 5 RNG`}),`
`,(0,n.jsx)(r.p,{children:`In Gen 5, RNG is split into two separate systems.`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`RNG Type`}),(0,n.jsx)(r.th,{children:`Controls`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`PIDRNG`}),(0,n.jsx)(r.td,{children:`Shiny status, nature, gender, ability.`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`IVRNG`}),(0,n.jsx)(r.td,{children:`Pokémon IVs only.`})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`You must control both to obtain a shiny Pokémon with the desired IVs.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Choose and Prepare Your Location`}),`
`,(0,n.jsx)(r.p,{children:`Go to the route where you want to encounter the Pokémon, with the script already running.`}),`
`,(0,n.jsx)(r.p,{children:`This allows you to check whether the map is noisy, which is important for Gen 5 RNG.`}),`
`,(0,n.jsx)(r.p,{children:`Once you choose your location and target:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Save the game.`}),`
`,(0,n.jsx)(r.li,{children:`Close the emulator.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`For detailed information about NPC behavior and a list of low-noise locations, see `,(0,n.jsx)(r.a,{href:`https://docs.google.com/document/d/1Hxz24gvMLrt8Qk-_6tG50hEA0TI8fuCI6yqQwBckwR4/edit?usp=sharing`,children:`this external NPC behavior guide`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Search for a Target Seed`}),`
`,(0,n.jsx)(r.p,{children:`Open PokeFinder and configure the search.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Go to the "Gen 5" tab.`}),`
`,(0,n.jsx)(r.li,{children:`Select "Wild".`}),`
`,(0,n.jsx)(r.li,{children:`Choose your game profile.`}),`
`,(0,n.jsx)(r.li,{children:`Open the "Searcher" tab.`}),`
`,(0,n.jsx)(r.li,{children:`Select a "Lead" if the first Pokémon in your party has a lead ability.`}),`
`,(0,n.jsx)(r.li,{children:`Set the "Advances" value to the amount you plan to advance in-game.`}),`
`,(0,n.jsx)(r.li,{children:`Choose your target Pokémon in the Settings section.`}),`
`,(0,n.jsx)(r.li,{children:`Configure desired values in Filter, such as IVs, gender, ability, or nature.`}),`
`,(0,n.jsx)(r.li,{children:`Adjust the date range.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Search".`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Start the Game on the Target Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.code,{children:`runasdate.exe`}),` from the `,(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume Guide`}),` to launch the game at the correct date and time.`]}),`
`,(0,n.jsx)(r.li,{children:`Enter the game quickly.`}),`
`,(0,n.jsx)(r.li,{children:`Open the menu immediately.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Be sure not to turn on the C-Gear when entering the game to avoid any unpredictable advancements.
`})}),`
`,(0,n.jsx)(r.p,{children:`The initial seed should match your target.`}),`
`,(0,n.jsx)(r.p,{children:`If the seed is incorrect, recheck your profile parameters or runasdate configuration.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 5: Advance the PIDRNG`}),`
`,(0,n.jsx)(r.p,{children:`Use these methods to increase the PIDRNG Advance:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chatot: Use Chatter to advance +1 every time you check its summary.`}),`
`,(0,n.jsx)(r.li,{children:`Save the game: This is useful for specific cases like Starters.`}),`
`,(0,n.jsx)(r.li,{children:`NPC advancement: This can be tricky but can be managed with weather to advance LCRNG quickly.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 6: Advance the IVRNG`}),`
`,(0,n.jsx)(r.p,{children:`Use these methods to increase the IVRNG Advance:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Walking 128 steps increases the IVRNG by the number of Pokémon in your party (e.g. 6 Pokémon advances by 6).`}),`
`,(0,n.jsx)(r.li,{children:`Withdraw a Pokémon in the PC advances the IVRNG by 7.`}),`
`,(0,n.jsx)(r.li,{children:`Battling Pokémon also advances the IVRNG, but the result can be unpredictable.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 7: Trigger the Encounter`}),`
`,(0,n.jsx)(r.p,{children:`After reaching the correct PIDRNG Advance and IVRNG Advance:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Make sure you are on the target Advance.`}),`
`,(0,n.jsx)(r.li,{children:`Use Sweet Scent or Honey to start the wild encounter.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Use save states in noisy areas so you can retry if you miss the target Advance.
`})}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`IMPORTANT`,children:[`
`,(0,n.jsx)(r.p,{children:`If the location has moving NPCs or weather, the LCRNG will continue advancing during the Sweet Scent/Honey animation.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Congrats! You've now got your Pokémon!`})}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsx)(r.p,{children:`This means the encounter may not occur on the exact target Advance, even if your setup is correct.`}),`
`,(0,n.jsx)(r.p,{children:`There is no guaranteed solution. You must adjust and calibrate until you consistently hit the correct shiny.`}),`
`,(0,n.jsx)(r.p,{children:`However, fishing doesn't advance LCRNG Advances, so you can fish without any problems.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Vlad for writing the original guide`}),`
`,(0,n.jsx)(r.li,{children:`Fiask for finalizing and translating the guide`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};