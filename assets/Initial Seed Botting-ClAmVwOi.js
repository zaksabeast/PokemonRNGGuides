import{u as r,j as e}from"./index-DEKSk6E2.js";const l={title:"Initial Seed Botting",description:"How to use the Initial Seed Bot in order to have even more control in your RNGs",slug:"frlg-seeding-bot",subCategory:"Emulator"};function i(n){const t={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h3,{children:"Requirements:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Last versions of the Lua Script"}),`
`,e.jsx(t.li,{children:"PokeFinder"}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/Real96/FRLGRSEInitialSeedsFinder",children:"FRLGRSEInitialSeedsFinder"})," by Real96"]}),`
`]}),`
`,e.jsx(t.h2,{children:"Intro"}),`
`,e.jsx(t.p,{children:"This guide introduces an alternative RNG method for Fire Red and Leaf Green that gives more control over the initial seed using a lua bot."}),`
`,e.jsx(t.h3,{children:"Setup:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"First, determine your target. Open PokeFinder, go to Gen 3 => Stationary or Wild (both work similarly)."}),`
`,e.jsx(t.li,{children:'In the "Searcher" tab, apply the desired filters.'}),`
`,e.jsx(t.li,{children:"Generate results and record the seed."}),`
`,e.jsx(t.li,{children:"Run FRLGRSEInitialSeedsFinder. It will prompt you for a seed; enter the one you recorded."}),`
`,e.jsx(t.li,{children:"When asked for the number of results, input a large number, like 100. Note: In specific cases, such as starters where Teachy TV is unavailable, generate 100 results, but only consider the lowest advance range possible."}),`
`,e.jsx(t.li,{children:"Wait for the tool to generate results. It will create a text file with all possible initial seeds. Open the file and copy its content."}),`
`,e.jsxs(t.li,{children:["In the FRLG Lua script, locate this line: 'local botTargetInitSeeds ='. Input all the seeds (ensure they are enclosed by '","')."]}),`
`,e.jsx(t.li,{children:"Save the Lua script."}),`
`]}),`
`,e.jsx(t.h3,{children:"Botting:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Run the Lua script and enter the initial seed bot mode by pressing '2'."}),`
`,e.jsx(t.li,{children:"Pause the emulator."}),`
`,e.jsx(t.li,{children:"Reset the emulator."}),`
`,e.jsx(t.li,{children:"Advance a single time (Ctrl + N) while holding the Select button."}),`
`,e.jsx(t.li,{children:"Unpause the emulator."}),`
`]}),`
`,e.jsx(t.p,{children:"This setup allows the game to be controlled by the bot, attempting to hit one of the selected initial seeds. Once it completes, the game will pause. Keep track of the Initial Seed, input it into the Generator, and proceed with your RNG process in the standard manner, knowing that your target advance is now accessible."})]})}function o(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{o as default,l as frontmatter};
