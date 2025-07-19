import{E as r,j as e}from"./index-DNZ5h1hz.js";const l={title:"Initial Seed Botting for FireRed and LeafGreen",navDrawerTitle:"Initial Seed Botting",description:"Learn how to use the Initial Seed Bot in FireRed and LeafGreen for better control over your RNG results.",slug:"frlg-seeding-bot",category:"FireRed and LeafGreen",tag:"emu"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{children:"Tools:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
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
`,e.jsx(n.li,{children:"Wait for the tool to generate results. It will create a text file with possible initial seeds. Open the file and copy its content."}),`
`,e.jsxs(n.li,{children:["In the FRLG Lua script, find this line: 'local botTargetInitSeeds ='. Input all the seeds (enclose them in '","')."]}),`
`,e.jsx(n.li,{children:"Save the Lua script."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`For starters where Teachy TV is unavailable, generate 100 results but only consider the lowest advance range possible.
`})}),`
`,e.jsx(n.h3,{children:"Botting:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Edit the first line of the lua script."}),`
`,e.jsx(n.li,{children:"Go to the game's continue screen where you load your save file."}),`
`,e.jsxs(n.li,{children:["Press your computer's ",e.jsx(n.code,{children:"Shift"})," key and the GBA's ",e.jsx(n.code,{children:"SELECT"})," key to start the bot."]}),`
`]}),`
`,e.jsx(n.p,{children:"This setup allows the game to be controlled by the bot, trying to hit one of the selected initial seeds. Once it completes, the game will pause. Keep track of the initial seed, input it into the generator, and proceed with your RNG process as usual, knowing your target advance is now accessible."}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function o(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,l as frontmatter};
