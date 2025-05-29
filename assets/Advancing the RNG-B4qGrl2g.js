import{u as i,j as e}from"./index-CXvnoZ7O.js";const s={title:"Advancing the RNG in HeartGold and SoulSilver",navDrawerTitle:"Advancing the RNG",description:"Learn how to advance the RNG in HeartGold and SoulSilver. This guide explains different methods like Chatot chatters, radio, and NPC actions.",slug:"hgss-rng-advance",category:"HeartGold and SoulSilver",tag:"any"};function t(a){const n={code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...i(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This explains how the RNG can be advanced and influenced in HeartGold and SoulSilver. The preferred method to advance the RNG is using Chatot or the Radio, but there are other methods if those are unavailable."}),`
`,e.jsx(n.h2,{children:"Chatot Chatter"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"You need a Chatot with the move Chatter and a recorded custom Chatter to use this method. Accessing Chatot's summary advances the RNG by 1."}),`
`,e.jsx(n.li,{children:"You don't need to listen to the whole Chatter sound; just viewing its summary is enough."}),`
`,e.jsxs(n.li,{children:["To speed things up, have two Chatots in your party and switch between their summaries by pressing ",e.jsx(n.code,{children:"Up"})," and ",e.jsx(n.code,{children:"Down"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Radio"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Switching between a specific channel and no channel advances the RNG."}),`
`,e.jsx(n.li,{children:"The Pokemon Talk channel advances 14-18."}),`
`,e.jsx(n.li,{children:"The Serial Radio Drama advances by 1 unless Bueno's Password is playing, in which case it does not advance."}),`
`,e.jsx(n.li,{children:"This method can be combined with other methods for more precision when close to the target advance."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/HeartGold-SoulSilver/Advance-RNG/Radio.png",alt:"Radio Station"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/HeartGold-SoulSilver/Advance-RNG/Radio-2.png",alt:"Radio Station"})}),`
`,e.jsx(n.h2,{children:"Character Movement"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Taking a step or turning in areas where you can encounter wild Pokémon (grass, water, or caves) advances the RNG by 1 for each step or turn."}),`
`,e.jsx(n.li,{children:"Walking at least 128 steps will advance the RNG by the number of Pokémon in your party."}),`
`,e.jsx(n.li,{children:"An internal step counter starts at 0 and increases up to 128, then resets. This counter is saved, so if you load your game at 127, taking one step will advance the RNG by the number of Pokémon in your party."}),`
`,e.jsx(n.li,{children:"It is recommended to avoid this method unless no other options are available."}),`
`]}),`
`,e.jsx(n.h2,{children:"NPC Movement"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Any NPC that randomly moves (by turning or walking) will advance the RNG by 1 for each movement. If an NPC does both, the RNG advances by 2."}),`
`,e.jsx(n.li,{children:"NPCs offscreen can still advance the RNG as long as they're in the same area. Try to capture in areas with few or no NPCs."}),`
`,e.jsxs(n.li,{children:["If you can't avoid NPC movement, press ",e.jsx(n.code,{children:"X"})," to open the menu when you enter the game. This freezes all NPCs and stops unnecessary advancements."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Active Roamer"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Having an active roamer in your game advances the initial RNG by one or two for each active roamer."}),`
`,e.jsx(n.li,{children:"You need to account for these advances to determine how much to advance the RNG to reach a target."}),`
`,e.jsx(n.li,{children:"Based on the number of active roamers, aim for a higher minimum initial advance; otherwise, active roamers may skip the target advance."}),`
`]}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function r(a={}){const{wrapper:n}={...i(),...a.components};return n?e.jsx(n,{...a,children:e.jsx(t,{...a})}):t(a)}export{r as default,s as frontmatter};
