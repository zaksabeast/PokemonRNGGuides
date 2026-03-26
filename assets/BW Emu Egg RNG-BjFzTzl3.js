import{w as r,j as e}from"./index-m1a04MGk.js";const a=[{title:"Black and White Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs from the Daycare in Black and White for shiny, high-IV Pokémon.",slug:"emu-bw-egg",category:"Black and White",section:"pokemon_rng",variant:"cfw-emu",guideKey:"egg",addedOn:"2026-03-24"}];function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Real96/PokeLua/blob/main/Gen%205/DeSmuMe/BW_RNG_DeSmuMe.lua",children:"Lua Scripts"})}),`
`,e.jsx(n.li,{children:"A Chatot with Chatter (two recommended)"}),`
`,e.jsx(n.li,{children:"An empty party slot"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setup"}),`
`,e.jsxs(n.p,{children:["Check ",e.jsx(n.a,{href:"https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_breeding",children:"this website"})," for details on held items, inheritance, Nature, and IVs."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Place both parents in the daycare, keeping track of their order, IVs, and Nature; use international parents if you want Masuda Method (higher shiny chance)."}),`
`,e.jsx(n.li,{children:"Register a sound with Chatter (it can be empty; you only need it registered)."}),`
`,e.jsx(n.li,{children:"Generate the egg and save in front of the daycare man."}),`
`,e.jsx(n.li,{children:'Open PokeFinder → Gen 5 tab → "Egg" → "Searcher".'}),`
`,e.jsx(n.li,{children:"Enter all required data about the parents."}),`
`,e.jsx(n.li,{children:"Set all the filters for the egg (shininess, IVs, ability, etc.)"}),`
`,e.jsx(n.li,{children:"Set Initial Advances to at least 10."}),`
`,e.jsx(n.li,{children:"Set Max Advances as needed (increase it for more specific spreads)."}),`
`,e.jsx(n.li,{children:"Set the date range as needed (increase it for more specific spreads)."}),`
`,e.jsx(n.li,{children:"Generate results and choose a target."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`It is suggested to have a 6IV Ditto if you're not aiming for a specific moveset, so IVs won't be a huge problem.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: RNG the egg"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Hit the target Initial Seed using ",e.jsx(n.a,{href:"/emulator-bw-runasdate-initial-seed",children:"this guide"}),"."]}),`
`,e.jsx(n.li,{children:"Make a save state some advances before as a backup."}),`
`,e.jsx(n.li,{children:"Advance using Chatot (or NPCs if you accept risk) until you reach the correct Advance."}),`
`,e.jsxs(n.li,{children:["Close the menu while spamming ",e.jsx(n.code,{children:"A"})," to receive the egg without any extra Advances."]}),`
`,e.jsx(n.li,{children:"If you miss or you need to calibrate, reload the save state and repeat from step 3."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Congrats! You've now got your Pokémon!"})}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fiask for writing the guide."}),`
`]})]})}function l(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{l as default,a as frontmatter};
