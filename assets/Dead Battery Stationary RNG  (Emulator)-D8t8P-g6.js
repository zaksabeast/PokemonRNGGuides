import{u as t,j as e}from"./index-DU9T2pcY.js";const o={title:"Dead Battery Stationary RNG",description:"Dead Battery Stationary RNG",slug:"emulator-rs-dead-battery-stationary",subCategory:"Emulator",isRoughDraft:!0,tag:"emu"};function i(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"You can refer to my FRLG guide for most of the content. This guide is BEFORE the update with Real's scripts."}),`
`,e.jsx(n.p,{children:"This guide covers Fixed Initial Seed in Gen 3, specifically RS dry and Emerald."}),`
`,e.jsx(n.p,{children:"Edited Rick's guide, not yet complete. -Subject"}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h1,{children:"Dead Battery Stationary Abuse (Ruby/Sapphire/Emerald)"}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Settings"}),`
`,e.jsx(n.h3,{children:"VBA-RR Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Set the save mode correctly."}),`
`,e.jsxs(n.li,{children:["Go to ",e.jsx(n.code,{children:"Options > Emulation > Save Type > Automatic & Flash 128K"}),"."]}),`
`,e.jsx(n.li,{children:"Disable Real Time Clock to obtain dead battery seeds."}),`
`,e.jsxs(n.li,{children:["Go to ",e.jsx(n.code,{children:"Options > Emulation > Real Time Clock"}),"."]}),`
`,e.jsx(n.li,{children:"Restart VBA if there are loading errors, like a corrupted save or dead battery message."}),`
`,e.jsx(n.li,{children:"Load the Lua script."}),`
`]}),`
`,e.jsx(n.h3,{children:"PokeFinder Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch PokeFinder and select Gen 3 Stationary."}),`
`,e.jsx(n.li,{children:"Select a profile or input TID/SID information."}),`
`,e.jsxs(n.li,{children:["Input the correct initial seeds into PokeFinder:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"0" for Emerald.'}),`
`,e.jsx(n.li,{children:'"5A0" for Ruby/Sapphire.'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Non-wild Pokémon for Generation 3 are Method 1."}),`
`,e.jsx(n.li,{children:"Search for a spread and find a target frame."}),`
`]}),`
`,e.jsx(n.p,{children:"![](pic of pokefinder example)"}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Hitting the Desired Frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Finding Delay"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Advance to the final screen before encountering the target Pokémon."}),`
`,e.jsx(n.li,{children:"Make a save state ~100 frames before the encounter."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"![](pic of wait screen)"}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," when you land on your target frame to enter the encounter."]}),`
`,e.jsxs(n.li,{children:["Use the period ",e.jsx(n.code,{children:"."})," key to advance by one frame when paused."]}),`
`,e.jsx(n.li,{children:"Take note of the IVs of the encountered Pokémon; they won't match the target Pokémon's IVs."}),`
`,e.jsx(n.li,{children:"Open a new PokeFinder window and input the IVs of the encountered Pokémon."}),`
`,e.jsx(n.li,{children:"To find the delay, subtract the frame hit from the desired frame."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Delay = Frame Hit - Target Frame"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Your new Target Frame = Desired Frame - Delay"})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Encountering the Pokémon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Reload the previous save state before the encounter."}),`
`,e.jsx(n.li,{children:"Advance to the new target frame."}),`
`,e.jsx(n.li,{children:"If the Pokémon is not the desired one, find the new delay."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"![](pic of the pokemon)"})]})}function l(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{l as default,o as frontmatter};
