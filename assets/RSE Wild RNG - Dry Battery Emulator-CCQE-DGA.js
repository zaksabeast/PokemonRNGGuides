import{u as t,j as e}from"./index-BWkkpZHG.js";const l={title:"Ruby and Sapphire Wild RNG",navDrawerTitle:"Wild RNG",description:"Learn how to RNG wild Pokémon in Ruby and Sapphire for shiny and high-IV results.",slug:"emulator-rs-wild",category:"Ruby and Sapphire",isRoughDraft:!0,tag:"emu"};function i(r){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guide covers Fixed Initial Seed in Gen 3, specifically for RS dry and Emerald."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up PokeFinder"}),`
`,e.jsx(n.p,{children:"Open PokeFinder with the correct profile and input the initial seed:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"0"})," for Emerald."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"5A0"})," for Ruby/Sapphire dry."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: To achieve dry Ruby/Sapphire, uncheck the real-time clock in VBA options.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Find Your Target"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Find a target and go to the location."}),`
`,e.jsx(n.li,{children:"Save your game."}),`
`,e.jsx(n.li,{children:"In PokeFinder (Gen 3 => Wild), select the route and hit the criteria you want. For Ruby/Sapphire, use Method H-1; for Emerald, use Method H-2 (you can hit alternate spreads as well) once you've selected your target."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Calibrate"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch VBA and create regular save states."}),`
`,e.jsxs(n.li,{children:["When close to your frame, do a calibration:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Save state."}),`
`,e.jsx(n.li,{children:"Note the frame you're on."}),`
`,e.jsx(n.li,{children:"Encounter a Pokémon using Sweet Scent."}),`
`,e.jsx(n.li,{children:"Search that spread with PokeFinder."}),`
`,e.jsx(n.li,{children:'Calculate the delay and enter it into the "delay box."'}),`
`,e.jsx(n.li,{children:"Regenerate your target to get your new frame."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Capture Your Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go to your target frame to catch what you want."}),`
`,e.jsx(n.li,{children:"If it doesn’t work, redo the calibration."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`You can copy from my FRLG guide for 90% of this information. This guide is before the update with Real's scripts.
`})})]})}function s(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{s as default,l as frontmatter};
