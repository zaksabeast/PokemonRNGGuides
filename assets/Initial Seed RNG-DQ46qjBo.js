import{u as s,j as e}from"./index-JGnwVbR5.js";const r={title:"Initial Seed RNG",description:"How to use Dolphin to set up Initial Seed RNG for all the Gamecube Games",slug:"gc-initial",subCategory:"Emulator",isRoughDraft:!1};function t(i){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Dolphin with the Lua support (Only available on the Discord at the moment)"}),`
`,e.jsx(n.li,{children:"The Lua scripts for Gamecube (Only available on the Discord at the moment)"}),`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsx(n.li,{children:"RunAsDate (x64)"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide will help you perform Initial Seed RNG using a specific version of Dolphin and Lua Scripts. This method applies to all Gamecube games, including Pokemon Channel. Understanding this process is essential for all RNG methods covered in the other guides found in this section."}),`
`,e.jsx(n.h2,{children:"How to Obtain Your Origin Seed"}),`
`,e.jsx(n.p,{children:"The Origin Seed is the Initial Seed at a specific date and time, used to calibrate results when searching for a specific Initial Seed. This is a quick and easy process:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RunAsDate and set the date and time to '2000-01-01 00:00.'"}),`
`,e.jsx(n.li,{children:"Run Dolphin with this configuration, load the appropriate game and Lua script."}),`
`,e.jsx(n.li,{children:"Write down the Initial Seed displayed; this is your Origin Seed."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The Origin Seed will vary for each game you use. The Origin Seed for Colosseum will differ from that of XD, so keep these values safely recorded to avoid repeating this step.
`})}),`
`,e.jsx(n.h2,{children:"Method 1: Performing an Initial Seed RNG"}),`
`,e.jsx(n.p,{children:"Now that you have your Origin Seed, you're ready to conduct an Initial Seed RNG. This process is simple and beneficial for Gamecube games, allowing you to find the right Initial Seed to achieve your desired Target Seed within an Advances Range, giving you more control over your RNG."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Open PokeFinder and navigate to 'Gen 3 Tool' > 'GameCube' > 'GameCube RTC.' Here, you'll need to fill in the following:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Origin Seed: As explained earlier, this is your Origin Seed."}),`
`,e.jsx(n.li,{children:"Target Seed: Enter the Seed of the spread you want to RNG, obtained from PokeFinder or another tool."}),`
`,e.jsx(n.li,{children:"End Date: Set the last date for the tool to search for results. It's recommended to choose a date a few years in the future to maximize results."}),`
`,e.jsx(n.li,{children:"Min Advance / Max Advance: Define the Advances range according to your specific RNG needs."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Input your Origin Seed, Target Seed, Advances Range, and ensure you've set an appropriate End Date. Start the search for results."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Once you find an Initial Seed that suits your requirements, make note of the 'Time' result and input it into RunAsDate."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Relaunch Dolphin using RunAsDate, load the game and the Lua script. The Initial Seed will match the one displayed in the GameCube RTC results. You've successfully completed your Initial Seed RNG!"}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you're new to Gamecube RNG, you can use a random Target Seed to learn how the process works.
`})})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{a as default,r as frontmatter};
