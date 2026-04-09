import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-5uoNgSDO.js";var n=e(),r={title:`Ruby and Sapphire Wild RNG`,navDrawerTitle:`Wild RNG`,description:`Learn how to RNG wild Pokémon in Ruby and Sapphire for shiny and high-IV results.`,slug:`emulator-rs-wild`,category:`Ruby and Sapphire`,isRoughDraft:!0,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This guide covers Fixed Initial Seed in Gen 3, specifically for RS dry and Emerald.`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Set Up PokeFinder`}),`
`,(0,n.jsx)(r.p,{children:`Open PokeFinder with the correct profile and input the initial seed:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`0`}),` for Emerald.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`5A0`}),` for Ruby/Sapphire dry.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: To achieve dry Ruby/Sapphire, uncheck the real-time clock in VBA options.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Find Your Target`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Find a target and go to the location.`}),`
`,(0,n.jsx)(r.li,{children:`Save your game.`}),`
`,(0,n.jsx)(r.li,{children:`In PokeFinder (Gen 3 => Wild), select the route and hit the criteria you want. For Ruby/Sapphire, use Method H-1; for Emerald, use Method H-2 (you can hit alternate spreads as well) once you've selected your target.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Calibrate`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Launch VBA and create regular save states.`}),`
`,(0,n.jsxs)(r.li,{children:[`When close to your frame, do a calibration:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Save state.`}),`
`,(0,n.jsx)(r.li,{children:`Note the frame you're on.`}),`
`,(0,n.jsx)(r.li,{children:`Encounter a Pokémon using Sweet Scent.`}),`
`,(0,n.jsx)(r.li,{children:`Search that spread with PokeFinder.`}),`
`,(0,n.jsx)(r.li,{children:`Calculate the delay and enter it into the "delay box."`}),`
`,(0,n.jsx)(r.li,{children:`Regenerate your target to get your new frame.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Capture Your Pokémon`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Go to your target frame to catch what you want.`}),`
`,(0,n.jsx)(r.li,{children:`If it doesn’t work, redo the calibration.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`You can copy from my FRLG guide for 90% of this information. This guide is before the update with Real's scripts.
`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};