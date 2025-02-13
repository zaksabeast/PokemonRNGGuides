import{u as a,j as e}from"./index-DweVeu07.js";const r={title:"Timeline with Fidget",description:"Using the timeline method with character fidgets",slug:"retail-usum-fidget",subCategory:"Custom Firmware"};function i(n){const t={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Tools"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["A 3DS with PCalc (",e.jsx(t.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(t.h2,{children:"Step 1: Create a timeline"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Follow the ",e.jsx(t.a,{href:"https://www.pokemonrng.com/retail-usum-timeline",children:"timeline guide"})," to create a timeline and find a target frame."]}),`
`]}),`
`,e.jsx(t.h2,{children:"Step 2: Account for character fidgeting"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note: Creating a timeline with character fidgeting is easier to do, however it is more limited than timeline leap due to not being able to land on any frame.

The main use of this method is for Lunala and Solgaleo since the regular timeline method and timeline leap does not work for them. For wormhole Pokemon, timeline leap is recommended instead of this method.
`})}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:['After calibrating a basic timeline you need to watch for your character to "fidget" and pause the game.',`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"This must be the first fidget after calibrating your timeline"}),`
`,e.jsx(t.li,{children:"This does not have to be the first fidget when you load the game, just the first fidget after calibrating any timeline"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note: The NPC count is a calculation, so when the fidget happens the NPC count on the overlay will change because of the frame jump. This does not mean your base NPC count is incorrect, it is just the calculation taking the fidget into account (NPC count = max # of frames advanced - 1).
`})}),`
`,e.jsx(t.p,{children:"Boy:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.img,{src:"https://camo.githubusercontent.com/6319d400d9f87d6dceda41b36caad2bc2a03d905/68747470733a2f2f692e696d6775722e636f6d2f6d41794a3149372e676966",alt:""})," ",e.jsx(t.img,{src:"https://camo.githubusercontent.com/dfd85f146d791e87030b5c402100fb64ea711837/68747470733a2f2f692e696d6775722e636f6d2f62587a704d42702e676966",alt:""})]}),`
`,e.jsx(t.p,{children:"Girl:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.img,{src:"https://camo.githubusercontent.com/783ad84d0ba843a82f8ceae7224f88d12278a35c/68747470733a2f2f692e696d6775722e636f6d2f637735787770432e676966",alt:""})," ",e.jsx(t.img,{src:"https://camo.githubusercontent.com/4d46716f6dbda58e43acbb7a4837644e6b99bfd9/68747470733a2f2f692e696d6775722e636f6d2f4e6c78337278452e676966",alt:""})]}),`
`,e.jsx(t.p,{children:"Character mid fidget:"}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/Fidget.png",alt:"Fidget"})}),`
`,e.jsxs(t.ol,{start:"2",children:[`
`,e.jsxs(t.li,{children:["Advance through the fidget using select until you notice a jump in frames that doesn't show on your timeline.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"This will usually be 3-4 frames in the case of wormholes, as they all have 1 NPC."}),`
`,e.jsx(t.li,{children:"In the example below, the frames jumped from 1320-1324, which means 1320 should be used for the fidget setting (Check the box and put it in)."}),`
`]}),`
`]}),`
`,e.jsx(t.li,{children:"Once entered, hit Calculate and you can see the frame jump accounted for in your timeline."}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/Before.jpg",alt:"Before Fidget"})}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/UltraSun-UltraMoon/Fidget-Timeline/After.jpg",alt:"After Fidget"})}),`
`,e.jsx(t.p,{children:"Now the timeline will take character fidgeting into account for future advancements. Do not move your character and do not open the menu while advancing to your target frame."})]})}function s(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{s as default,r as frontmatter};
