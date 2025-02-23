import{u as s,j as e}from"./index-CyJ9fDjB.js";const o={title:"Initial Seed RNG",description:"How to use Dolphin to set up Initial Seed RNG for all GameCube games",slug:"gc-initial",subCategory:"Emulator"};function t(i){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Dolphin with Lua support (only available on Discord)"}),`
`,e.jsx(n.li,{children:"Lua scripts for GameCube (only available on Discord)"}),`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsx(n.li,{children:"RunAsDate (x64)"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide helps you perform Initial Seed RNG using Dolphin and Lua scripts for all GameCube games, including Pokémon Channel. Understanding this process is key for all RNG methods in other guides in this section."}),`
`,e.jsx(n.h2,{children:"How to Obtain Your Origin Seed"}),`
`,e.jsx(n.p,{children:"The Origin Seed is the Initial Seed for a specific date and time, used to calibrate results when searching for an Initial Seed. This is a quick process:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RunAsDate and set the date and time to '2000-01-01 00:00.'"}),`
`,e.jsx(n.li,{children:"Run Dolphin with this config, load the game and Lua script."}),`
`,e.jsx(n.li,{children:"Write down the Initial Seed displayed; this is your Origin Seed."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The Origin Seed will differ for each game. The Origin Seed for Colosseum will be different from XD, so keep these values recorded to avoid repeating this step.
`})}),`
`,e.jsx(n.h2,{children:"Method 1: Performing an Initial Seed RNG"}),`
`,e.jsx(n.p,{children:"Now that you have your Origin Seed, you're ready to conduct an Initial Seed RNG. This method helps you find the right Initial Seed to achieve your desired Target Seed within an Advances Range."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Open PokeFinder and navigate to 'Gen 3 Tool' > 'GameCube' > 'GameCube RTC.' Fill in the following:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Origin Seed: This is your Origin Seed."}),`
`,e.jsx(n.li,{children:"Target Seed: Enter the Seed of the spread you want to RNG, obtained from PokeFinder or another tool."}),`
`,e.jsx(n.li,{children:"End Date: Set a date a few years in the future to maximize results."}),`
`,e.jsx(n.li,{children:"Min Advance/Max Advance: Specify the Advances range according to your RNG needs."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Input your Origin Seed, Target Seed, Advances Range, and set an appropriate End Date. Start the search for results."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Once you find an Initial Seed that fits your needs, note the 'Time' result and input it into RunAsDate."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Relaunch Dolphin using RunAsDate, load the game and the Lua script. The Initial Seed will match the one displayed in the GameCube RTC results. You've successfully completed your Initial Seed RNG!"}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you're new to GameCube RNG, you can use a random Target Seed to learn how the process works.
`})})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{a as default,o as frontmatter};
