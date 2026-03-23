import{ii as t,j as e}from"./index-CLgpAzd3.js";const a=[{title:"HeartGold and Soulsilver Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs from the Daycare in HeartGold and SoulSilver for shiny, high-IV Pokémon.",slug:"emulator-hgss-egg",category:"HeartGold and SoulSilver",section:"pokemon_rng",variant:"cfw-emu"},{title:"HeartGold and Soulsilver Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs from the Daycare in HeartGold and SoulSilver for shiny, high-IV Pokémon.",slug:"emulator-hgss-breeding",category:"HeartGold and SoulSilver",section:"pokemon_rng",variant:"cfw-emu",hideFromNavDrawer:!0,canonical:"emulator-hgss-egg"}];function r(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Real96/PokeLua/blob/main/Gen%204/DeSmuMe/HGSS_RNG_DeSmuMe.lua",children:"Lua Scripts"})}),`
`,e.jsx(n.li,{children:"A Chatot with Chatter (two recommended)"}),`
`,e.jsx(n.li,{children:"An empty party slot"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setup & PID RNG"}),`
`,e.jsxs(n.p,{children:["This process is split into two parts: ",e.jsx(n.strong,{children:"PID RNG"})," and ",e.jsx(n.strong,{children:"IV RNG"}),`.
Check `,e.jsx(n.a,{href:"https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_breeding",children:"this website"})," for details on held items, inheritance, Nature, and IVs."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Place both parents in the daycare, keeping track of their order, IVs, and Nature."}),`
`,e.jsx(n.li,{children:"Save the game."}),`
`,e.jsx(n.li,{children:"Register a sound with Chatter (it can be empty; you only need it registered)."}),`
`,e.jsx(n.li,{children:'Open PokeFinder → Gen 4 tab → "Egg" → "Searcher".'}),`
`,e.jsx(n.li,{children:"Enter all required data."}),`
`,e.jsx(n.li,{children:"Use international parents if you want Masuda Method (higher shiny chance)."}),`
`,e.jsx(n.li,{children:"Set Min Delay to 700."}),`
`,e.jsx(n.li,{children:"Set Max Delay as needed (increase it for more specific spreads)."}),`
`,e.jsx(n.li,{children:"Set Held Advances to 0 / 0; ignore Pickup Advances for now."}),`
`,e.jsx(n.li,{children:"Generate results and choose a target."}),`
`,e.jsxs(n.li,{children:["Hit the target Initial Seed using ",e.jsx(n.a,{href:"/hgss-initial-seed",children:"this guide"}),"."]}),`
`,e.jsx(n.li,{children:"Generate the egg and save in front of the daycare man."}),`
`,e.jsx(n.li,{children:"Stop here if you only need shiny, Nature, gender, or ability. Congrats, you got it!"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`It is suggested to have a 6IV Ditto if you're not aiming for a specific moveset, so IVs won't be a huge problem.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you want to be sure, create a save state, take the egg, verify it with PKHeX, and reload the state.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: IV RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Return to PokeFinder → "Searcher".'}),`
`,e.jsx(n.li,{children:"Set Min Delay to 700."}),`
`,e.jsx(n.li,{children:"Set Max Delay as needed (increase it for more specific spreads)."}),`
`,e.jsx(n.li,{children:"Set Held Advances to 0 / 100000."}),`
`,e.jsxs(n.li,{children:["Set Pickup Advances minimum to ",e.jsx(n.code,{children:"number of uncaptured roamers + 1"}),"."]}),`
`,e.jsx(n.li,{children:"Set Pickup Advances maximum as needed (increase it for more specific spreads)."}),`
`,e.jsx(n.li,{children:"Enter desired IVs in the filter."}),`
`,e.jsx(n.li,{children:"Generate results and choose a target."}),`
`,e.jsx(n.li,{children:"Hit the new Initial Seed."}),`
`,e.jsx(n.li,{children:"Advance using Chatot (or NPCs if you accept risk) until you reach the correct Pickup Advance."}),`
`,e.jsx(n.li,{children:"Make a save state as backup."}),`
`,e.jsxs(n.li,{children:["Close the menu while spamming ",e.jsx(n.code,{children:"A"})," to receive the egg without extra Advances."]}),`
`,e.jsx(n.li,{children:"If you miss, reload the save state and repeat from step 12."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Congrats! You've now got your Pokémon!"})}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fiask for finalizing and translating the guide to Italian."}),`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function l(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{l as default,a as frontmatter};
