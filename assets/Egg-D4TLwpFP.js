import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BWlJUHS5.js";var n=e(),r=[{title:`HeartGold and Soulsilver Egg RNG`,navDrawerTitle:`Egg RNG`,description:`Learn how to RNG eggs from the Daycare in HeartGold and SoulSilver for shiny, high-IV Pokémon.`,slug:`emulator-hgss-egg`,category:`HeartGold and SoulSilver`,section:`pokemon_rng`,variant:`cfw-emu`},{title:`HeartGold and Soulsilver Egg RNG`,navDrawerTitle:`Egg RNG`,description:`Learn how to RNG eggs from the Daycare in HeartGold and SoulSilver for shiny, high-IV Pokémon.`,slug:`emulator-hgss-breeding`,category:`HeartGold and SoulSilver`,section:`pokemon_rng`,variant:`cfw-emu`,hideFromNavDrawer:!0,canonical:`emulator-hgss-egg`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder/releases`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/blob/main/Gen%204/DeSmuMe/HGSS_RNG_DeSmuMe.lua`,children:`Lua Scripts`})}),`
`,(0,n.jsx)(r.li,{children:`A Chatot with Chatter (two recommended)`}),`
`,(0,n.jsx)(r.li,{children:`An empty party slot`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Setup & PID RNG`}),`
`,(0,n.jsxs)(r.p,{children:[`This process is split into two parts: `,(0,n.jsx)(r.strong,{children:`PID RNG`}),` and `,(0,n.jsx)(r.strong,{children:`IV RNG`}),`.
Check `,(0,n.jsx)(r.a,{href:`https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_breeding`,children:`this website`}),` for details on held items, inheritance, Nature, and IVs.`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Place both parents in the daycare, keeping track of their order, IVs, and Nature.`}),`
`,(0,n.jsx)(r.li,{children:`Save the game.`}),`
`,(0,n.jsx)(r.li,{children:`Register a sound with Chatter (it can be empty; you only need it registered).`}),`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder → Gen 4 tab → "Egg" → "Searcher".`}),`
`,(0,n.jsx)(r.li,{children:`Enter all required data.`}),`
`,(0,n.jsx)(r.li,{children:`Use international parents if you want Masuda Method (higher shiny chance).`}),`
`,(0,n.jsx)(r.li,{children:`Set Min Delay to 700.`}),`
`,(0,n.jsx)(r.li,{children:`Set Max Delay as needed (increase it for more specific spreads).`}),`
`,(0,n.jsx)(r.li,{children:`Set Held Advances to 0 / 0; ignore Pickup Advances for now.`}),`
`,(0,n.jsx)(r.li,{children:`Generate results and choose a target.`}),`
`,(0,n.jsxs)(r.li,{children:[`Hit the target Initial Seed using `,(0,n.jsx)(r.a,{href:`/hgss-initial-seed`,children:`this guide`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Generate the egg and save in front of the daycare man.`}),`
`,(0,n.jsx)(r.li,{children:`Stop here if you only need shiny, Nature, gender, or ability. Congrats, you got it!`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`It is suggested to have a 6IV Ditto if you're not aiming for a specific moveset, so IVs won't be a huge problem.
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you want to be sure, create a save state, take the egg, verify it with PKHeX, and reload the state.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: IV RNG`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Return to PokeFinder → "Searcher".`}),`
`,(0,n.jsx)(r.li,{children:`Set Min Delay to 700.`}),`
`,(0,n.jsx)(r.li,{children:`Set Max Delay as needed (increase it for more specific spreads).`}),`
`,(0,n.jsx)(r.li,{children:`Set Held Advances to 0 / 100000.`}),`
`,(0,n.jsxs)(r.li,{children:[`Set Pickup Advances minimum to `,(0,n.jsx)(r.code,{children:`number of uncaptured roamers + 1`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Set Pickup Advances maximum as needed (increase it for more specific spreads).`}),`
`,(0,n.jsx)(r.li,{children:`Enter desired IVs in the filter.`}),`
`,(0,n.jsx)(r.li,{children:`Generate results and choose a target.`}),`
`,(0,n.jsx)(r.li,{children:`Hit the new Initial Seed.`}),`
`,(0,n.jsx)(r.li,{children:`Advance using Chatot (or NPCs if you accept risk) until you reach the correct Pickup Advance.`}),`
`,(0,n.jsx)(r.li,{children:`Make a save state as backup.`}),`
`,(0,n.jsxs)(r.li,{children:[`Close the menu while spamming `,(0,n.jsx)(r.code,{children:`A`}),` to receive the egg without extra Advances.`]}),`
`,(0,n.jsx)(r.li,{children:`If you miss, reload the save state and repeat from step 12.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Congrats! You've now got your Pokémon!`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Fiask for finalizing and translating the guide to Italian.`}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};