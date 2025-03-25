import{u as o,j as e}from"./index-Dd9K0D0t.js";const s={title:"Timeline with Fidget",description:"Using the timeline method with character fidgets",slug:"retail-sm-fidget",subCategory:"Custom Firmware",tag:"cfw"};function i(n){const t={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Tools"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["A 3DS with PCalc (",e.jsx(t.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(t.h2,{children:"Step 1: Create a timeline"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Follow the ",e.jsx(t.a,{href:"https://www.pokemonrng.com/retail-sm-timeline",children:"timeline guide"})," to create a timeline and find a target frame."]}),`
`]}),`
`,e.jsx(t.h2,{children:"Step 2: Account for character fidgeting"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note: This process isn't used often in Sun and Moon as it's only viable for Lunala and Solgaleo.
`})}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:'After calibrating a basic timeline, watch for your character to "fidget" and pause the game. This must be the first fidget after calibrating your timeline. It does not have to be the first fidget when you load the game, just the first fidget after calibrating any timeline.'}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note: The NPC count is a calculation, so when the fidget happens, the NPC count on the overlay will change because of the frame jump. This does not mean your base NPC count is incorrect; it is just the calculation taking the fidget into account (NPC count = max # of frames advanced - 1).
`})}),`
`,e.jsx(t.p,{children:"Character mid fidget:"}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/Sun-Moon/Fidget-Timeline/Fidget.png",alt:"Fidget"})}),`
`,e.jsxs(t.ol,{start:"2",children:[`
`,e.jsxs(t.li,{children:["Advance through the fidget using ",e.jsx(t.code,{children:"select"})," until you notice a jump in frames that doesn't show on your timeline. This will usually be 3-4 frames in the case of wormholes, as they all have 1 NPC. In the example below, the frames jumped from 1320-1324, which means 1320 should be used for the fidget setting (check the box and put it in)."]}),`
`,e.jsxs(t.li,{children:["Once entered, hit ",e.jsx(t.code,{children:"Calculate"})," to see the frame jump accounted for in your timeline."]}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/Sun-Moon/Fidget-Timeline/Before.jpg",alt:"Before Fidget"})}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/Sun-Moon/Fidget-Timeline/After.jpg",alt:"After Fidget"})}),`
`,e.jsx(t.p,{children:"Now the timeline will take character fidgeting into account for future advancements. Do not move your character and do not open the menu while advancing to your target frame."})]})}function r(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{r as default,s as frontmatter};
