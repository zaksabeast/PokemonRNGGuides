import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-Dx1x27-2.js";var n=e(),r={title:`(PAL) Channel RNG`,description:`Step-by-step guide to RNG the Channel Jirachi.`,slug:`channel-jirachi`,category:`Gamecube`,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`A finished save of Channel with the Jirachi option unlocked`}),`
`,(0,n.jsx)(r.li,{children:`A finished save of Ruby/Sapphire`}),`
`,(0,n.jsx)(r.li,{children:`Toolbox from Lincoln`}),`
`,(0,n.jsx)(r.li,{children:`Dolphin-Lua + Channel Lua from Real96`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`In Gen 3, there are two ways to RNG Jirachi: Wishmaker and Channel. Wishmaker is easier but has limited spreads. This guide focuses on Channel using Dolphin and updates to simplify the RNG. It assumes you have basic knowledge of GC RNG, especially how to hit an initial seed.`}),`
`,(0,n.jsx)(r.h2,{children:`Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open Toolbox and access GameCube in the main window.`}),`
`,(0,n.jsx)(r.li,{children:`Go to "Searcher" without a profile and apply your filters.`}),`
`,(0,n.jsx)(r.li,{children:`Once you find a spread, note its Seed.`}),`
`,(0,n.jsx)(r.li,{children:`Go to Gen 3 Tools => GameCube => GameCube RTC. Enter your Origin Seed and Target Seed. Search for a 10-100 advance range.`}),`
`,(0,n.jsx)(r.li,{children:`After obtaining a result, enter the date/time in runasdate and run Dolphin.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`RNG and Advancing`}),`
`,(0,n.jsx)(r.p,{children:`Next, obtain Jirachi. When Dolphin and the Lua are loaded, the initial seed should match. Pause Dolphin at the main menu.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In Toolbox, navigate to Gen 3 Tools => GameCube => Jirachi Advancer.`}),`
`,(0,n.jsx)(r.li,{children:`Input the Current Seed in the Starting Seed box.`}),`
`,(0,n.jsx)(r.li,{children:`For Target Seed, enter the Jirachi seed.`}),`
`,(0,n.jsx)(r.li,{children:`Max Advances, related to the earlier range, should be around 100.`}),`
`,(0,n.jsx)(r.li,{children:`Leave the Bruteforce Range empty and don't check the "Min Actions" box. Then, hit generate.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`If everything was done correctly, you'll have a list of actions to follow. You can adjust by updating the Origin Seed to see the current steps.`}),`
`,(0,n.jsx)(r.p,{children:`Once all steps are completed, claim Jirachi for a final advance and obtain your desired target.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If no result is found, it’s rare but possible. Try another initial seed or search again. It should work.
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:'Note: If you see "Reload Menu," go to Options and press `B`.\n'})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};