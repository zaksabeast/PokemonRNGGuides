import{g5 as r,j as e}from"./index-DVcJqcS4.js";const l={title:"FireRed and LeafGreen Static RNG",navDrawerTitle:"Static RNG",description:"Learn how to RNG shiny 6IV legendaries in Pokémon FireRed and LeafGreen using static encounters.",slug:"emulator-flrg-stationary-and-gift",category:"FireRed and LeafGreen",tag:"emu"};function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set up PokeFinder"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the game with the lua script."}),`
`,e.jsx(n.li,{children:'Go to the "Continue" screen and pause the emulator.'}),`
`,e.jsx(n.li,{children:"Find your initial seed displayed in the lua script."}),`
`,e.jsx(n.li,{children:"Open PokeFinder > Gen 3 Static > Generator tab."}),`
`,e.jsx(n.li,{children:'Input the seed into the "Seed" box.'}),`
`,e.jsxs(n.li,{children:['Set your target filters (shiny, IVs, nature, etc.) and click "Generate."',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Method should be "Method 1."'}),`
`,e.jsx(n.li,{children:"If no results, adjust filters or reset for a new seed."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Choose a target advance from the results."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Find the Delay"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Your player should be in front of the right legendary, NPC, or Pokéball."}),`
`,e.jsx(n.li,{children:"Make a save state to avoid mistakes."}),`
`,e.jsxs(n.li,{children:["Advance to the final screen before the Pokémon is generated.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If there's a cry or dialog, that's usually the final screen."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["At your target advance, press ",e.jsx(n.code,{children:"A"})," to start the encounter or receive the Pokémon."]}),`
`,e.jsx(n.li,{children:"Check the IVs of the Pokémon."}),`
`,e.jsx(n.li,{children:"In PokeFinder, input the IVs and find the advance you hit."}),`
`,e.jsxs(n.li,{children:["Calculate the delay: ",e.jsx(n.code,{children:"Delay = Target Advance - Advance Hit"})]}),`
`,e.jsx(n.li,{children:"Enter the delay in PokeFinder and generate again."}),`
`,e.jsx(n.li,{children:"Note the new advance number."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Get the Desired Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Retry using the new advance adjusted for the delay."}),`
`,e.jsx(n.li,{children:"If successful, you'll hit the correct spread."}),`
`,e.jsx(n.li,{children:"If not, check how many advances you were off, reload, adjust, and try again."}),`
`]}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function a(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,l as frontmatter};
