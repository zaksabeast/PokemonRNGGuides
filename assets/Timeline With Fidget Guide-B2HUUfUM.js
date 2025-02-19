import{u as r,j as e}from"./index-BA0UoWvs.js";const o={title:"Timeline with Fidget",description:"Using the timeline method with character fidgets",slug:"retail-usum-fidget",subCategory:"Custom Firmware"};function i(t){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc install guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Create a timeline"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Follow the ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-usum-timeline",children:"timeline guide"})," to create a timeline and find a target frame."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Account for character fidgeting"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Creating a timeline with character fidgeting is easier, but more limited than timeline leap since you cannot land on any frame. This method works best for Lunala and Solgaleo, but for wormhole Pokémon, timeline leap is recommended.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['After calibrating your timeline, watch for your character to "fidget" and pause the game.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This must be the first fidget after calibrating your timeline."}),`
`,e.jsx(n.li,{children:"It does not need to be the first fidget when you load the game, just the first fidget after calibrating any timeline."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The NPC count is a calculation, so when the fidget happens, the NPC count on the overlay will change due to the frame jump. This does not mean your base NPC count is incorrect; it only reflects the calculation (NPC count = max # of frames advanced - 1).
`})}),`
`,e.jsx(n.p,{children:"Character mid fidget:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/Fidget.png",alt:"Fidget"})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Advance through the fidget using ",e.jsx(n.code,{children:"Select"})," until you see a jump in frames that doesn't appear on your timeline.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will usually be 3-4 frames for wormholes since they have 1 NPC."}),`
`,e.jsx(n.li,{children:"For example, if frames jumped from 1320-1324, you should use 1320 for the fidget setting (check the box and enter it)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Once entered, hit ",e.jsx(n.code,{children:"Calculate"})," to see the frame jump accounted for in your timeline."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/Before.jpg",alt:"Before Fidget"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/After.jpg",alt:"After Fidget"})}),`
`,e.jsx(n.p,{children:"Now the timeline will consider character fidgeting for future advancements. Do not move your character and do not open the menu while advancing to your target frame."})]})}function a(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,o as frontmatter};
