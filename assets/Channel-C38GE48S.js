import{u as o,j as e}from"./index-CV0XqbBP.js";const a={title:"(PAL) Channel RNG",description:"How to RNG the gift Jirachi on Channel",slug:"channel-jirachi",subCategory:"Emulator",isRoughDraft:!1};function t(i){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A finished save of Channel with the Jirachi option unlocked"}),`
`,e.jsx(n.li,{children:"A finished save of Ruby / Sapphire"}),`
`,e.jsx(n.li,{children:"Toolbox from Lincoln"}),`
`,e.jsx(n.li,{children:"Dolphin-Lua + Channel Lua from Real96"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"In Gen 3, there are only two ways to RNG Jirachi: Wishmaker and Channel. The former is easier but has limited spreads. This guide is for the latter, using Dolphin and updates to simplify the RNG. This guide assumes you have basic knowledge of GC RNG, especially how to hit an initial seed."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Toolbox and access Gamecube on the main window."}),`
`,e.jsx(n.li,{children:'Go to "Searcher" without any profile and apply your chosen filters.'}),`
`,e.jsx(n.li,{children:"Once you find a spread, note its Seed."}),`
`,e.jsx(n.li,{children:"Go to Gen 3 Tools => GameCube => GameCube RTC. Enter your Origin Seed and Target Seed. Search for a 10-100 adnvace range."}),`
`,e.jsx(n.li,{children:"Once you get a result, enter the date/time in runasdate and run Dolphin."}),`
`]}),`
`,e.jsx(n.h2,{children:"RNG and Advancing"}),`
`,e.jsx(n.p,{children:"The next step is obtaining Jirachi. When Dolphin and the lua are loaded, the initial seed should match. On the main menu, pause Dolphin."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In Toolbox, navigate to Gen 3 Tools => GameCube => Jirachi Advancer."}),`
`,e.jsx(n.li,{children:"Input the Current Seed in the Starting Seed box."}),`
`,e.jsx(n.li,{children:"For Target Seed, enter the Jirachi seed."}),`
`,e.jsx(n.li,{children:"Max Advances, something related to the earlier range, should be around 100."}),`
`,e.jsx(n.li,{children:`Leave the Bruteforce Range empty and don't check the "Min Actions box." Then, hit generate.`}),`
`]}),`
`,e.jsx(n.p,{children:"If everything was done correctly, you'll have a list of actions to follow in order. You can adjust by updating the Origin Seed to see the current steps."}),`
`,e.jsx(n.p,{children:"Once all steps are completed, claim Jirachi for a final advance and obtain your desired target."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If no result is found, it's rare but possible. Try another initial seed or search again. It should work.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you see "Reload Menu", it means go to Options and press B.
`})})]})}function s(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{s as default,a as frontmatter};
