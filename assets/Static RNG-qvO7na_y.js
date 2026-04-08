import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BWlJUHS5.js";var n=e(),r={title:`FireRed and LeafGreen Static RNG`,navDrawerTitle:`Static RNG`,description:`Learn how to RNG shiny 6IV legendaries in Pokémon FireRed and LeafGreen using static encounters.`,slug:`emulator-flrg-stationary-and-gift`,category:`FireRed and LeafGreen`,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Set up PokeFinder`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Load the game with the lua script.`}),`
`,(0,n.jsx)(r.li,{children:`Go to the "Continue" screen and pause the emulator.`}),`
`,(0,n.jsx)(r.li,{children:`Find your initial seed displayed in the lua script.`}),`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder > Gen 3 Static > Generator tab.`}),`
`,(0,n.jsx)(r.li,{children:`Input the seed into the "Seed" box.`}),`
`,(0,n.jsxs)(r.li,{children:[`Set your target filters (shiny, IVs, nature, etc.) and click "Generate."`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Method should be "Method 1."`}),`
`,(0,n.jsx)(r.li,{children:`If no results, adjust filters or reset for a new seed.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Choose a target advance from the results.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Find the Delay`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Your player should be in front of the right legendary, NPC, or Pokéball.`}),`
`,(0,n.jsx)(r.li,{children:`Make a save state to avoid mistakes.`}),`
`,(0,n.jsxs)(r.li,{children:[`Advance to the final screen before the Pokémon is generated.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If there's a cry or dialog, that's usually the final screen.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`At your target advance, press `,(0,n.jsx)(r.code,{children:`A`}),` to start the encounter or receive the Pokémon.`]}),`
`,(0,n.jsx)(r.li,{children:`Check the IVs of the Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`In PokeFinder, input the IVs and find the advance you hit.`}),`
`,(0,n.jsxs)(r.li,{children:[`Calculate the delay: `,(0,n.jsx)(r.code,{children:`Delay = Target Advance - Advance Hit`})]}),`
`,(0,n.jsx)(r.li,{children:`Enter the delay in PokeFinder and generate again.`}),`
`,(0,n.jsx)(r.li,{children:`Note the new advance number.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Get the Desired Pokémon`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Retry using the new advance adjusted for the delay.`}),`
`,(0,n.jsx)(r.li,{children:`If successful, you'll hit the correct spread.`}),`
`,(0,n.jsx)(r.li,{children:`If not, check how many advances you were off, reload, adjust, and try again.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};