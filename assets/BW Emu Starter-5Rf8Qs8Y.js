import{w as i,j as e}from"./index-BKW_koWY.js";const a=[{title:"Black and White Starter RNG",navDrawerTitle:"Starter RNG",description:"Learn how to RNG starters in Black and White for shiny, high-IV Pokémon.",slug:"bw-emu-starter",category:"Black and White",section:"pokemon_rng",variant:"cfw-emu",guideKey:"starter",addedOn:"2026-03-25"}];function r(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Real96/PokeLua/blob/main/Gen%205/DeSmuMe/BW_RNG_DeSmuMe.lua",children:"Lua Scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/emulator-bw-find-ds-parameters",children:"A configured game profile"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setup"}),`
`,e.jsx(n.p,{children:"Set up your target starter in PokeFinder."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Save in front of the gift."}),`
`,e.jsx(n.li,{children:'Open PokeFinder → Gen 5 tab → "Static" → "Searcher".'}),`
`,e.jsx(n.li,{children:"Set the correct starter and all the desired filters for it (shininess, IVs, ability, etc.)."}),`
`,e.jsx(n.li,{children:"Set Initial Advances to at least 5."}),`
`,e.jsx(n.li,{children:"Set Max Advances as needed. Avoid setting it too high, as it can slow the process or make it impractical."}),`
`,e.jsx(n.li,{children:"Leave Min/Max IV Advances at 0."}),`
`,e.jsx(n.li,{children:"Generate results and choose a target."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: RNG the Starter"}),`
`,e.jsx(n.p,{children:"Hit your seed and reach the correct Advance to receive the Pokémon."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Hit the target Initial Seed using ",e.jsx(n.a,{href:"/emulator-bw-runasdate-initial-seed",children:"this guide"}),"."]}),`
`,e.jsx(n.li,{children:"(Optional) Make a save state some advances before as a backup."}),`
`,e.jsx(n.li,{children:"Advance by saving the game repeatedly until you reach the target Advance."}),`
`,e.jsxs(n.li,{children:["Close the menu and press ",e.jsx(n.code,{children:"A"})," to open the gift and choose the starter."]}),`
`,e.jsx(n.li,{children:"If you miss by accident, reload the save state and repeat from step 3; if no save state was made, repeat from step 1."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Congrats! You've now got your Pokémon!"})}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fiask for writing this guide."}),`
`]})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{l as default,a as frontmatter};
