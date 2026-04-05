import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CNlyG6-4.js";var n=e(),r={title:`Ruby and Sapphire Dead Battery Static RNG`,navDrawerTitle:`Static Dead Battery RNG`,description:`Learn how to RNG static Pokémon in Ruby and Sapphire for perfect IVs, natures, and shinies.`,slug:`emulator-rs-dead-battery-stationary`,category:`Ruby and Sapphire`,isRoughDraft:!0,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`You can refer to my FRLG guide for most of the content. This guide is BEFORE the update with Real's scripts.`}),`
`,(0,n.jsx)(r.p,{children:`This guide covers Fixed Initial Seed in Gen 3, specifically RS dry and Emerald.`}),`
`,(0,n.jsx)(r.p,{children:`Edited Rick's guide, not yet complete. -Subject`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.hr,{}),`
`,(0,n.jsx)(r.h2,{children:`Settings`}),`
`,(0,n.jsx)(r.h3,{children:`VBA-RR Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Set the save mode correctly.`}),`
`,(0,n.jsxs)(r.li,{children:[`Go to `,(0,n.jsx)(r.code,{children:`Options > Emulation > Save Type > Automatic & Flash 128K`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Disable Real Time Clock to obtain dead battery seeds.`}),`
`,(0,n.jsxs)(r.li,{children:[`Go to `,(0,n.jsx)(r.code,{children:`Options > Emulation > Real Time Clock`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Restart VBA if there are loading errors, like a corrupted save or dead battery message.`}),`
`,(0,n.jsx)(r.li,{children:`Load the Lua script.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`PokeFinder Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Launch PokeFinder and select Gen 3 Stationary.`}),`
`,(0,n.jsx)(r.li,{children:`Select a profile or input TID/SID information.`}),`
`,(0,n.jsxs)(r.li,{children:[`Input the correct initial seeds into PokeFinder:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`"0" for Emerald.`}),`
`,(0,n.jsx)(r.li,{children:`"5A0" for Ruby/Sapphire.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Non-wild Pokémon for Generation 3 are Method 1.`}),`
`,(0,n.jsx)(r.li,{children:`Search for a spread and find a target frame.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`![](pic of pokefinder example)`}),`
`,(0,n.jsx)(r.hr,{}),`
`,(0,n.jsx)(r.h2,{children:`Hitting the Desired Frame`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Finding Delay`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Advance to the final screen before encountering the target Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`Make a save state ~100 frames before the encounter.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`![](pic of wait screen)`}),`
`,(0,n.jsxs)(r.ol,{start:`2`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` when you land on your target frame to enter the encounter.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use the period `,(0,n.jsx)(r.code,{children:`.`}),` key to advance by one frame when paused.`]}),`
`,(0,n.jsx)(r.li,{children:`Take note of the IVs of the encountered Pokémon; they won't match the target Pokémon's IVs.`}),`
`,(0,n.jsx)(r.li,{children:`Open a new PokeFinder window and input the IVs of the encountered Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`To find the delay, subtract the frame hit from the desired frame.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.code,{children:`Delay = Frame Hit - Target Frame`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.code,{children:`Your new Target Frame = Desired Frame - Delay`})}),`
`,(0,n.jsxs)(r.ol,{start:`2`,children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Encountering the Pokémon`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Reload the previous save state before the encounter.`}),`
`,(0,n.jsx)(r.li,{children:`Advance to the new target frame.`}),`
`,(0,n.jsx)(r.li,{children:`If the Pokémon is not the desired one, find the new delay.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`![](pic of the pokemon)`})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};