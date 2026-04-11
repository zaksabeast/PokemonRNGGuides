import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-Dg958C8T.js";var n=e(),r={title:`Initial Seed Botting for FireRed and LeafGreen`,navDrawerTitle:`Initial Seed Botting`,description:`Learn how to use the Initial Seed Bot in FireRed and LeafGreen for better control over your RNG results.`,slug:`frlg-seeding-bot`,category:`FireRed and LeafGreen`,section:`rng_technique`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h3,{children:`Tools:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://github.com/Real96/FRLGRSEInitialSeedsFinder`,children:`FRLGRSEInitialSeedsFinder`}),` by Real96`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`This guide shows an alternative RNG method for Fire Red and Leaf Green that offers more control over the initial seed using a Lua bot.`}),`
`,(0,n.jsx)(r.h3,{children:`Setup:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`First, determine your target. Open PokeFinder, go to Gen 3 => Stationary or Wild (both work similarly).`}),`
`,(0,n.jsx)(r.li,{children:`In the "Searcher" tab, apply your desired filters.`}),`
`,(0,n.jsx)(r.li,{children:`Generate results and record the seed.`}),`
`,(0,n.jsx)(r.li,{children:`Run FRLGRSEInitialSeedsFinder. It will ask for a seed; enter the one you recorded.`}),`
`,(0,n.jsx)(r.li,{children:`When asked for the number of results, input a large number, like 100.`}),`
`,(0,n.jsx)(r.li,{children:`Wait for the tool to generate results. It will create a text file with possible initial seeds. Open the file and copy its content.`}),`
`,(0,n.jsxs)(r.li,{children:[`In the FRLG Lua script, find this line: 'local botTargetInitSeeds ='. Input all the seeds (enclose them in '`,`').`]}),`
`,(0,n.jsx)(r.li,{children:`Save the Lua script.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`For starters where Teachy TV is unavailable, generate 100 results but only consider the lowest advance range possible.
`})}),`
`,(0,n.jsx)(r.h3,{children:`Botting:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Edit the first line of the lua script.`}),`
`,(0,n.jsx)(r.li,{children:`Go to the game's continue screen where you load your save file.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press your computer's `,(0,n.jsx)(r.code,{children:`Shift`}),` key and the GBA's `,(0,n.jsx)(r.code,{children:`SELECT`}),` key to start the bot.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`This setup allows the game to be controlled by the bot, trying to hit one of the selected initial seeds. Once it completes, the game will pause. Keep track of the initial seed, input it into the generator, and proceed with your RNG process as usual, knowing your target advance is now accessible.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};