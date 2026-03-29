import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-D9rvoGGh.js";var n=e(),r=[{title:`Advancing the RNG in Diamond, Pearl, and Platinum`,navDrawerTitle:`Advancing the RNG`,description:`Learn how to advance the RNG in Diamond, Pearl, and Platinum. This guide explains different methods like journal flips, Chatot chatters, and NPC actions.`,slug:`dppt-advance-rng`,category:`Diamond, Pearl, and Platinum`,section:`rng_technique`,variant:[`retail`,`cfw-emu`]}];function i(e){let r={code:`code`,h2:`h2`,img:`img`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This explains the different ways to advance the RNG in Diamond, Pearl, and Platinum. The best methods are using Chatot or the Journal, but there are other options if those are not available.`}),`
`,(0,n.jsx)(r.h2,{children:`Chatot Chatter`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`You need a Chatot with the move Chatter and a custom Chatter recorded to use this method. Accessing Chatot's summary page advances the RNG by 1.`}),`
`,(0,n.jsx)(r.li,{children:`You don't need to listen to the whole Chatter sound; just viewing their summary works.`}),`
`,(0,n.jsxs)(r.li,{children:[`To speed things up, have two Chatots in your party and flip between their summaries by pressing `,(0,n.jsx)(r.code,{children:`Up`}),` and `,(0,n.jsx)(r.code,{children:`Down`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Character Movement`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Taking a step or turning in areas where wild Pokémon appear (grass, water, or caves) advances the RNG by 1 for each step or turn.`}),`
`,(0,n.jsx)(r.li,{children:`Walking at least 128 steps advances the RNG by the number of Pokémon in your party.`}),`
`,(0,n.jsx)(r.li,{children:`There is a step counter that starts at 0, increases to 128, then resets to 0. The step counter is saved, so if you load your game at 127, taking one step advances the RNG by the number of Pokémon in your party.`}),`
`,(0,n.jsx)(r.li,{children:`It is not recommended to use this method unless no other options are available.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`NPC Movement`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Any NPC that randomly moves (turning or walking) advances the RNG by 1 for each movement. If an NPC does both, the RNG advances by 2.`}),`
`,(0,n.jsx)(r.li,{children:`NPCs offscreen still advance the RNG if they're in the same area, so try to capture Pokémon where there are few NPCs.`}),`
`,(0,n.jsx)(r.li,{children:`You can use the VS Seeker to stop some NPCs from moving.`}),`
`,(0,n.jsxs)(r.li,{children:[`If you can't avoid NPC movement, press `,(0,n.jsx)(r.code,{children:`X`}),` to access the menu as you enter the game. This freezes all NPCs in place and stops unnecessary advancements.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Journal Flips`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`When the journal shows `,(0,n.jsx)(r.code,{children:`(Pokemon) was caught (Time)`}),`, the RNG advances by 2.`]}),`
`,(0,n.jsx)(r.li,{children:`Flipping the journal to another page with a similar entry also advances the RNG by 2.`}),`
`,(0,n.jsxs)(r.li,{children:[`As long as the journal has at least one entry of `,(0,n.jsx)(r.code,{children:`(Pokemon) was caught (Time)`}),`, the RNG advances by 2, regardless of how many entries there are.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Diamond-Pearl-Platinum/Advance-RNG/Journal.png`,alt:`Journal`})}),`
`,(0,n.jsx)(r.h2,{children:`Active Roamer`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Having an active roamer in your game advances the initial RNG by one or two for each active roamer.`}),`
`,(0,n.jsx)(r.li,{children:`These advances need to be considered to reach your target advance.`}),`
`,(0,n.jsx)(r.li,{children:`Depending on the number of active roamers, aim for a higher minimum initial advance to avoid skipping your target due to active roamers advancing the RNG past it.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Spanish translation: El Terapagos Mexicano.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};