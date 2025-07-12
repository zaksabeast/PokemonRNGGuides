import{A as l,j as e}from"./index-DQUyanDe.js";const s=[{title:"Ultra Sun and Ultra Moon Timeline with Fidget RNG",navDrawerTitle:"Timeline Fidget RNG",description:"Learn how to create a timeline with character fidgets in Ultra Sun and Ultra Moon.",slug:"retail-usum-fidget",category:"Ultra Sun and Ultra Moon",tag:"cfw"},{title:"Sun and Moon Timeline with Fidget RNG",navDrawerTitle:"Timeline Fidget RNG",description:"Learn how to create a timeline with character fidgets in Sun and Moon.",slug:"retail-sm-fidget",category:"Sun and Moon",tag:"cfw",canonical:"retail-usum-fidget"}];function r(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...i.components},{ShowIf:t}=n;return t||o("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/install-pokereader",children:"A 3DS with PokeReader"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Create a timeline"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Follow the ",e.jsx(n.a,{href:"/retail-usum-timeline",children:"timeline guide"})," to create a timeline and find a target frame."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Account for character fidgeting"}),`
`,e.jsx(t,{slug:"/retail-usum-fidget",children:e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Creating a timeline with character fidgeting is easier, but more limited than timeline leap since you cannot land on any frame. This method works best for Lunala and Solgaleo, but for wormhole Pokémon, timeline leap is recommended.
`})})}),`
`,e.jsx(t,{slug:"/retail-sm-fidget",children:e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This process isn't used often in Sun and Moon as it's only viable for Lunala and Solgaleo.
`})})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['After calibrating your timeline, watch for your character to "fidget" and pause the game.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This must be the first fidget after calibrating your timeline."}),`
`,e.jsx(n.li,{children:"It does not need to be the first fidget when you load the game, just the first fidget after calibrating any timeline."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Advance through the fidget using ",e.jsx(n.code,{children:"Select"})," until you see a jump in frames that doesn't appear on your timeline.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will usually be 3-4 frames for wormholes since they have 1 NPC."}),`
`,e.jsx(n.li,{children:"For example, if frames jumped from 1320-1324, you should use 1320 for the fidget setting (check the box and enter it)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Once entered, hit ",e.jsx(n.code,{children:"Calculate"})," to see the frame jump accounted for in your timeline."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The NPC count is a calculation, so when the fidget happens, the NPC count on the overlay will change due to the frame jump. This does not mean your base NPC count is incorrect; it only reflects the calculation (NPC count = max # of frames advanced - 1).
`})}),`
`,e.jsx(n.p,{children:"Character mid fidget:"}),`
`,e.jsx(t,{slug:"/retail-usum-fidget",children:e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/Fidget.png",alt:"Fidget"})})}),`
`,e.jsx(t,{slug:"/retail-sm-fidget",children:e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Sun-Moon/Fidget-Timeline/Fidget.png",alt:"Fidget"})})}),`
`,e.jsxs(t,{slug:"/retail-usum-fidget",children:[e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/Before.jpg",alt:"Before Fidget"})}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/After.jpg",alt:"After Fidget"})})]}),`
`,e.jsxs(t,{slug:"/retail-sm-fidget",children:[e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Sun-Moon/Fidget-Timeline/Before.jpg",alt:"Before Fidget"})}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Sun-Moon/Fidget-Timeline/After.jpg",alt:"After Fidget"})})]}),`
`,e.jsx(n.p,{children:"Now the timeline will consider character fidgeting for future advancements. Do not move your character and do not open the menu while advancing to your target frame."})]})}function d(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}function o(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,s as frontmatter};
