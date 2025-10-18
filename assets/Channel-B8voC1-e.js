import{g7 as t,j as e}from"./index-BQ_qSqp-.js";const o={title:"(PAL) Channel RNG",description:"Step-by-step guide to RNG the Channel Jirachi.",slug:"channel-jirachi",category:"Gamecube",tag:"emu"};function a(i){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A finished save of Channel with the Jirachi option unlocked"}),`
`,e.jsx(n.li,{children:"A finished save of Ruby/Sapphire"}),`
`,e.jsx(n.li,{children:"Toolbox from Lincoln"}),`
`,e.jsx(n.li,{children:"Dolphin-Lua + Channel Lua from Real96"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"In Gen 3, there are two ways to RNG Jirachi: Wishmaker and Channel. Wishmaker is easier but has limited spreads. This guide focuses on Channel using Dolphin and updates to simplify the RNG. It assumes you have basic knowledge of GC RNG, especially how to hit an initial seed."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Toolbox and access GameCube in the main window."}),`
`,e.jsx(n.li,{children:'Go to "Searcher" without a profile and apply your filters.'}),`
`,e.jsx(n.li,{children:"Once you find a spread, note its Seed."}),`
`,e.jsx(n.li,{children:"Go to Gen 3 Tools => GameCube => GameCube RTC. Enter your Origin Seed and Target Seed. Search for a 10-100 advance range."}),`
`,e.jsx(n.li,{children:"After obtaining a result, enter the date/time in runasdate and run Dolphin."}),`
`]}),`
`,e.jsx(n.h2,{children:"RNG and Advancing"}),`
`,e.jsx(n.p,{children:"Next, obtain Jirachi. When Dolphin and the Lua are loaded, the initial seed should match. Pause Dolphin at the main menu."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In Toolbox, navigate to Gen 3 Tools => GameCube => Jirachi Advancer."}),`
`,e.jsx(n.li,{children:"Input the Current Seed in the Starting Seed box."}),`
`,e.jsx(n.li,{children:"For Target Seed, enter the Jirachi seed."}),`
`,e.jsx(n.li,{children:"Max Advances, related to the earlier range, should be around 100."}),`
`,e.jsx(n.li,{children:`Leave the Bruteforce Range empty and don't check the "Min Actions" box. Then, hit generate.`}),`
`]}),`
`,e.jsx(n.p,{children:"If everything was done correctly, you'll have a list of actions to follow. You can adjust by updating the Origin Seed to see the current steps."}),`
`,e.jsx(n.p,{children:"Once all steps are completed, claim Jirachi for a final advance and obtain your desired target."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If no result is found, it’s rare but possible. Try another initial seed or search again. It should work.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:'Note: If you see "Reload Menu," go to Options and press `B`.\n'})}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function s(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}export{s as default,o as frontmatter};
