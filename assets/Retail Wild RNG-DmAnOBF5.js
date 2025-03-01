import{u as o,j as e}from"./index-BAk_Gku5.js";const l={title:"Wild Retail RNG",description:"RNG wild Pokemon on a retail console",slug:"retail-emerald-wild",subCategory:"Retail"};function t(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/DasAmpharos/EonTimer/releases",children:"EonTimer"})}),`
`,e.jsx(n.li,{children:"TID and SID (only necessary for shinies)"}),`
`,e.jsx(n.li,{children:"Pokemon with Sweet Scent"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up PokeFinder"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder and select Gen 3 wild."}),`
`,e.jsx(n.li,{children:"Choose your profile with the TID/SID of the game you're using if you're hunting for shinies."}),`
`,e.jsx(n.li,{children:'Set the method to "Wild 2".'}),`
`,e.jsx(n.li,{children:"Set the seed to 0."}),`
`,e.jsx(n.li,{children:'Choose "Grass" or "Surfing" for the encounter.'}),`
`,e.jsx(n.li,{children:"Set the location and Pokémon (if desired)."}),`
`,e.jsx(n.li,{children:"Filter by the Pokémon you want."}),`
`,e.jsx(n.li,{children:'Click "Generate" and then find a desired Pokémon from the results.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Set Up EonTimer"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open EonTimer and click the cog in the lower-left corner."}),`
`,e.jsx(n.li,{children:"Select the console you are using."}),`
`,e.jsx(n.li,{children:"Then choose the Gen 3 tab."}),`
`,e.jsx(n.li,{children:'Input the target advance from PokeFinder for the desired Pokémon in the "Target Frame" box.'}),`
`,e.jsx(n.li,{children:'Click "Start".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Calibration"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["When the timer reaches 0, reset the game by pressing ",e.jsx(n.code,{children:"Start + Select + A + B"}),"."]}),`
`,e.jsx(n.li,{children:"Open the in-game menu and go to your party."}),`
`,e.jsx(n.li,{children:'Select the Pokémon with Sweet Scent and hover over "Sweet Scent."'}),`
`,e.jsxs(n.li,{children:["Wait for the second countdown to end, then press ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsx(n.li,{children:"Catch the Pokémon and use the IV calculator under filters."}),`
`,e.jsx(n.li,{children:"Input the Pokémon's info to check its IVs."}),`
`,e.jsx(n.li,{children:'Select "Any" for the Encounter Slot and click "Generate."'}),`
`,e.jsx(n.li,{children:"Search for the Pokémon you just caught and input the advance you hit in EonTimer."}),`
`,e.jsx(n.li,{children:'Click "Update."'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: RNG the Pokemon"}),`
`,e.jsx(n.p,{children:`Now that you've calibrated for delay, it's all about timing.
Keep catching Pokémon and checking what advance you landed on.
Adjust EonTimer if needed.
If off by one or two advances, try again without changes.`})]})}function s(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{s as default,l as frontmatter};
