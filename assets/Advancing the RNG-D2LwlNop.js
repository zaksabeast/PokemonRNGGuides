import{u as i,j as e}from"./index-DweVeu07.js";const s={title:"Advancing the RNG",description:"The different methods the RNG can be advanced and events that influence the RNG",slug:"dppt-advance-rng",subCategory:"Basic Knowledge"};function a(t){const n={code:"code",h2:"h2",img:"img",li:"li",p:"p",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This is an explanantion of the different ways the RNG can be advanced and influenced in Diamond, Pearl, and Platinum. The preferred method to advance the RNG is using Chatot or the Journal, though there are other methods should Chatot or the Journal not be available."}),`
`,e.jsx(n.h2,{children:"Chatot Chatter"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For this method you must have a Chatot with the move Chatter and you must have recorded a custom Chatter to advance the RNG with this method. Afterwards, accessing Chatot's summary page will advance the RNG by 1."}),`
`,e.jsx(n.li,{children:"You do not have to listen to the whole Chatter sound, simply viewing their summary is enough."}),`
`,e.jsxs(n.li,{children:["To make things quicker you can have two Chatots next to each other in your party and flip between their summaries by pressing ",e.jsx(n.code,{children:"Up"})," and ",e.jsx(n.code,{children:"Down"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Character Movement"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Taking a step or turning in areas where you can encounter wild Pokemon (grass, water, or caves) advances the RNG by 1 for each step or turn made."}),`
`,e.jsx(n.li,{children:"Walking at least 128 steps will advance the RNG by the number of Pokemon in your party."}),`
`,e.jsx(n.li,{children:"There is an internal step counter that starts at 0 and increases up to 128 before resetting back to 0. The step counter is always saved, therefore if you load your game and the step counter is at 127, taking one step will advance the RNG by the number of Pokemon in your party."}),`
`,e.jsx(n.li,{children:"It is recommended to not use this method unless none of the other methods are an option."}),`
`]}),`
`,e.jsx(n.h2,{children:"NPC Movement"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Any NPC that randomly moves, by either turning or walking, will advance the RNG by 1 for each random movement. If an NPC does both, then the RNG advances by 2."}),`
`,e.jsx(n.li,{children:"NPCs offscreen can still advance the RNG as long as they are within the same area. Because of this, it is advised to attempt your captures in areas with little or no NPCs."}),`
`,e.jsx(n.li,{children:"The VS Seeker can be used to prevent some NPCs from moving."}),`
`,e.jsxs(n.li,{children:["If NPC movement cannot be avoided you must press ",e.jsx(n.code,{children:"X"})," to bring up the menu the moment you enter the ingame world. This freezes all NPCs in place and stops them from making any unnecessary advancements."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Journal Flips"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When the journal is on a page that displays ",e.jsx(n.code,{children:"(Pokemon) was caught (Time)"})," like the picture below, the RNG is advanced by 2."]}),`
`,e.jsx(n.li,{children:"Flipping the journal to another page with a similar entry will also advance the RNG by 2."}),`
`,e.jsxs(n.li,{children:["As long as the journal has at least one ",e.jsx(n.code,{children:"(Pokemon) was caught (Time)"})," entry, the RNG advances by 2 regardless of how many journal entries there are."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/Advance-RNG/Journal.png",alt:"Journal"})}),`
`,e.jsx(n.h2,{children:"Active Roamer"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Having an active roamer in your game advances the initial RNG by one or two advances for each active roamer."}),`
`,e.jsx(n.li,{children:"These advances will need to be accounted for in determining how much to advance the RNG to reach a target advance."}),`
`,e.jsx(n.li,{children:"Based on the number of active roamers you have, you will want to aim for a higher minimum initial advance. Otherwise the target advance may be skipped by active roamers advancing the RNG past it."}),`
`]})]})}function r(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{r as default,s as frontmatter};
