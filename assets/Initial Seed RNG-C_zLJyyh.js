import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-CvakMO0A.js";var n=e(),r={title:`Initial Seed RNG`,description:`How to use Dolphin to set up Initial Seed RNG for all GameCube games.`,slug:`gc-initial`,category:`Gamecube`,section:`rng_technique`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Dolphin with Lua support (only available on Discord)`}),`
`,(0,n.jsx)(r.li,{children:`Lua scripts for GameCube (only available on Discord)`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`RunAsDate (x64)`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`This guide helps you perform Initial Seed RNG using Dolphin and Lua scripts for all GameCube games, including Pokémon Channel. Understanding this process is key for all RNG methods in other guides in this section.`}),`
`,(0,n.jsx)(r.h2,{children:`How to Obtain Your Origin Seed`}),`
`,(0,n.jsx)(r.p,{children:`The Origin Seed is the Initial Seed for a specific date and time, used to calibrate results when searching for an Initial Seed. This is a quick process:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open RunAsDate and set the date and time to '2000-01-01 00:00.'`}),`
`,(0,n.jsx)(r.li,{children:`Run Dolphin with this config, load the game and Lua script.`}),`
`,(0,n.jsx)(r.li,{children:`Write down the Initial Seed displayed; this is your Origin Seed.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The Origin Seed will differ for each game. The Origin Seed for Colosseum will be different from XD, so keep these values recorded to avoid repeating this step.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Method 1: Performing an Initial Seed RNG`}),`
`,(0,n.jsx)(r.p,{children:`Now that you have your Origin Seed, you're ready to conduct an Initial Seed RNG. This method helps you find the right Initial Seed to achieve your desired Target Seed within an Advances Range.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Open PokeFinder and navigate to 'Gen 3 Tool' > 'GameCube' > 'GameCube RTC.' Fill in the following:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Origin Seed: This is your Origin Seed.`}),`
`,(0,n.jsx)(r.li,{children:`Target Seed: Enter the Seed of the spread you want to RNG, obtained from PokeFinder or another tool.`}),`
`,(0,n.jsx)(r.li,{children:`End Date: Set a date a few years in the future to maximize results.`}),`
`,(0,n.jsx)(r.li,{children:`Min Advance/Max Advance: Specify the Advances range according to your RNG needs.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Input your Origin Seed, Target Seed, Advances Range, and set an appropriate End Date. Start the search for results.`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Once you find an Initial Seed that fits your needs, note the 'Time' result and input it into RunAsDate.`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Relaunch Dolphin using RunAsDate, load the game and the Lua script. The Initial Seed will match the one displayed in the GameCube RTC results. You've successfully completed your Initial Seed RNG!`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you're new to GameCube RNG, you can use a random Target Seed to learn how the process works.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};