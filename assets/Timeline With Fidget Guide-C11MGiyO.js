import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-OZ62x8fR.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon Timeline with Fidget RNG`,navDrawerTitle:`Timeline Fidget RNG`,description:`Learn how to create a timeline with character fidgets in Ultra Sun and Ultra Moon.`,slug:`retail-usum-fidget`,category:`Ultra Sun and Ultra Moon`,section:`rng_technique`,variant:`cfw-emu`},{title:`Sun and Moon Timeline with Fidget RNG`,navDrawerTitle:`Timeline Fidget RNG`,description:`Learn how to create a timeline with character fidgets in Sun and Moon.`,slug:`retail-sm-fidget`,category:`Sun and Moon`,section:`rng_technique`,variant:`cfw-emu`,canonical:`retail-usum-fidget`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components},{ShowIf:i}=r;return i||o(`ShowIf`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Create a timeline`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Follow the `,(0,n.jsx)(r.a,{href:`/retail-usum-timeline`,children:`timeline guide`}),` to create a timeline and find a target frame.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Account for character fidgeting`}),`
`,(0,n.jsx)(i,{slug:`/retail-usum-fidget`,children:(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Creating a timeline with character fidgeting is easier, but more limited than timeline leap since you cannot land on any frame. This method works best for Lunala and Solgaleo, but for wormhole Pokémon, timeline leap is recommended.
`})})}),`
`,(0,n.jsx)(i,{slug:`/retail-sm-fidget`,children:(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: This process isn't used often in Sun and Moon as it's only viable for Lunala and Solgaleo.
`})})}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`After calibrating your timeline, watch for your character to "fidget" and pause the game.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`This must be the first fidget after calibrating your timeline.`}),`
`,(0,n.jsx)(r.li,{children:`It does not need to be the first fidget when you load the game, just the first fidget after calibrating any timeline.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Advance through the fidget using `,(0,n.jsx)(r.code,{children:`Select`}),` until you see a jump in frames that doesn't appear on your timeline.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`This will usually be 3-4 frames for wormholes since they have 1 NPC.`}),`
`,(0,n.jsx)(r.li,{children:`For example, if frames jumped from 1320-1324, you should use 1320 for the fidget setting (check the box and enter it).`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Once entered, hit `,(0,n.jsx)(r.code,{children:`Calculate`}),` to see the frame jump accounted for in your timeline.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The NPC count is a calculation, so when the fidget happens, the NPC count on the overlay will change due to the frame jump. This does not mean your base NPC count is incorrect; it only reflects the calculation (NPC count = max # of frames advanced - 1).
`})}),`
`,(0,n.jsx)(r.p,{children:`Character mid fidget:`}),`
`,(0,n.jsx)(i,{slug:`/retail-usum-fidget`,children:(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Fidget-Timeline/Fidget.png`,alt:`Fidget`})})}),`
`,(0,n.jsx)(i,{slug:`/retail-sm-fidget`,children:(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Sun-Moon/Fidget-Timeline/Fidget.png`,alt:`Fidget`})})}),`
`,(0,n.jsxs)(i,{slug:`/retail-usum-fidget`,children:[(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Fidget-Timeline/Before.jpg`,alt:`Before Fidget`})}),(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Fidget-Timeline/After.jpg`,alt:`After Fidget`})})]}),`
`,(0,n.jsxs)(i,{slug:`/retail-sm-fidget`,children:[(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Sun-Moon/Fidget-Timeline/Before.jpg`,alt:`Before Fidget`})}),(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Sun-Moon/Fidget-Timeline/After.jpg`,alt:`After Fidget`})})]}),`
`,(0,n.jsx)(r.p,{children:`Now the timeline will consider character fidgeting for future advancements. Do not move your character and do not open the menu while advancing to your target frame.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};