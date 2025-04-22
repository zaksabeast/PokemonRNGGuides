import{u as s,j as e}from"./index-BVqKX7Ev.js";const l={title:"Initial Seed Botting",description:"How to use the Initial Seed Bot for more control in your RNGs",slug:"frlg-seeding-bot",subCategory:"Emulator",tag:"emu"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{children:"Tools:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Real96/FRLGRSEInitialSeedsFinder",children:"FRLGRSEInitialSeedsFinder"})," by Real96"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide shows an alternative RNG method for Fire Red and Leaf Green that offers more control over the initial seed using a Lua bot."}),`
`,e.jsx(n.h3,{children:"Setup:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"First, determine your target. Open PokeFinder, go to Gen 3 => Stationary or Wild (both work similarly)."}),`
`,e.jsx(n.li,{children:'In the "Searcher" tab, apply your desired filters.'}),`
`,e.jsx(n.li,{children:"Generate results and record the seed."}),`
`,e.jsx(n.li,{children:"Run FRLGRSEInitialSeedsFinder. It will ask for a seed; enter the one you recorded."}),`
`,e.jsx(n.li,{children:"When asked for the number of results, input a large number, like 100."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`For starters where Teachy TV is unavailable, generate 100 results but only consider the lowest advance range possible.
`})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:"Wait for the tool to generate results. It will create a text file with possible initial seeds. Open the file and copy its content."}),`
`,e.jsxs(n.li,{children:["In the FRLG Lua script, find this line: 'local botTargetInitSeeds ='. Input all the seeds (enclose them in '","')."]}),`
`,e.jsx(n.li,{children:"Save the Lua script."}),`
`]}),`
`,e.jsx(n.h3,{children:"Botting:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Run the Lua script and enter the initial seed bot mode by pressing ",e.jsx(n.code,{children:"2"}),"."]}),`
`,e.jsx(n.li,{children:"Pause the emulator."}),`
`,e.jsx(n.li,{children:"Reset the emulator."}),`
`,e.jsxs(n.li,{children:["Advance a single time (",e.jsx(n.code,{children:"Ctrl + N"}),") while holding the ",e.jsx(n.code,{children:"Select"})," button."]}),`
`,e.jsx(n.li,{children:"Unpause the emulator."}),`
`]}),`
`,e.jsx(n.p,{children:"This setup allows the game to be controlled by the bot, trying to hit one of the selected initial seeds. Once it completes, the game will pause. Keep track of the initial seed, input it into the generator, and proceed with your RNG process as usual, knowing your target advance is now accessible."})]})}function o(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,l as frontmatter};
