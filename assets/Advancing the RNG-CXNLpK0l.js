import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-5uoNgSDO.js";var n=e(),r={title:`Advancing the RNG in HeartGold and SoulSilver`,navDrawerTitle:`Advancing the RNG`,description:`Learn how to advance the RNG in HeartGold and SoulSilver. This guide explains different methods like Chatot chatters, radio, and NPC actions.`,slug:`hgss-rng-advance`,category:`HeartGold and SoulSilver`,section:`rng_technique`,variant:[`retail`,`cfw-emu`]};function i(e){let r={code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This explains how the RNG can be advanced and influenced in HeartGold and SoulSilver. The preferred method to advance the RNG is using Chatot or the Radio, but there are other methods if those are unavailable.`}),`
`,(0,n.jsx)(r.h2,{children:`Chatot Chatter`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`You need a Chatot with the move Chatter and a recorded custom Chatter to use this method. Accessing Chatot's summary advances the RNG by 1.`}),`
`,(0,n.jsx)(r.li,{children:`You don't need to listen to the whole Chatter sound; just viewing its summary is enough.`}),`
`,(0,n.jsxs)(r.li,{children:[`To speed things up, have two Chatots in your party and switch between their summaries by pressing `,(0,n.jsx)(r.code,{children:`Up`}),` and `,(0,n.jsx)(r.code,{children:`Down`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Radio`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Switching between a specific channel and no channel advances the RNG.`}),`
`,(0,n.jsx)(r.li,{children:`The Pokemon Talk channel advances 14-18.`}),`
`,(0,n.jsx)(r.li,{children:`The Serial Radio Drama advances by 1 unless Bueno's Password is playing, in which case it does not advance.`}),`
`,(0,n.jsx)(r.li,{children:`This method can be combined with other methods for more precision when close to the target advance.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/HeartGold-SoulSilver/Advance-RNG/Radio.png`,alt:`Radio Station`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/HeartGold-SoulSilver/Advance-RNG/Radio-2.png`,alt:`Radio Station`})}),`
`,(0,n.jsx)(r.h2,{children:`Character Movement`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Taking a step or turning in areas where you can encounter wild Pokémon (grass, water, or caves) advances the RNG by 1 for each step or turn.`}),`
`,(0,n.jsx)(r.li,{children:`Walking at least 128 steps will advance the RNG by the number of Pokémon in your party.`}),`
`,(0,n.jsx)(r.li,{children:`An internal step counter starts at 0 and increases up to 128, then resets. This counter is saved, so if you load your game at 127, taking one step will advance the RNG by the number of Pokémon in your party.`}),`
`,(0,n.jsx)(r.li,{children:`It is recommended to avoid this method unless no other options are available.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`NPC Movement`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Any NPC that randomly moves (by turning or walking) will advance the RNG by 1 for each movement. If an NPC does both, the RNG advances by 2.`}),`
`,(0,n.jsx)(r.li,{children:`NPCs offscreen can still advance the RNG as long as they're in the same area. Try to capture in areas with few or no NPCs.`}),`
`,(0,n.jsxs)(r.li,{children:[`If you can't avoid NPC movement, press `,(0,n.jsx)(r.code,{children:`X`}),` to open the menu when you enter the game. This freezes all NPCs and stops unnecessary advancements.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Active Roamer`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Having an active roamer in your game advances the initial RNG by one or two for each active roamer.`}),`
`,(0,n.jsx)(r.li,{children:`You need to account for these advances to determine how much to advance the RNG to reach a target.`}),`
`,(0,n.jsx)(r.li,{children:`Based on the number of active roamers, aim for a higher minimum initial advance; otherwise, active roamers may skip the target advance.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Spanish translation: El Terapagos Mexicano.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};