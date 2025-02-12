import{u as s,j as e}from"./index-Cx4QpB68.js";const l={title:"Dead Battery Stationary RNG",description:"Dead Battery Stationary RNG",slug:"emulator-rs-dead-battery-stationary",subCategory:"Emulator",isRoughDraft:!0};function i(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"You can copy on my FRLG guide for 90% of the part. This guide is BEFORE the update with Real's scripts"}),`
`,e.jsx(n.p,{children:"This guide is to cover Fixed Initial Seed in Gen 3 aka RS dry and Emerald."}),`
`,e.jsx(n.p,{children:"Edited Rick's guide, not yet complete. -Subject"}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h1,{children:"Dead Battery Stationary Abuse (Ruby/Sapphire/Emerald)"}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/TASVideos/vba-rerecording/releases",children:"VBA-RR"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pokerng.forumcommunity.net/?t=56443955&p=396434940",children:"The Ruby/Sapphire Lua Scripts for your language"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Password for the lua script archive is ",e.jsx(n.code,{children:"allyouneedisnoob"})]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Settings"}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{children:"VBA-RR setup"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Make sure the save mode is set correctly.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Options > Emulation > Save Type > Automatic & Flash 128K"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Real Time Clock must be disbled in order to obtain dead battery seeds.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Options > Emulation > Real Time Clock"}),`
`,e.jsx(n.li,{children:"If there are errors when loading past the title screen, such as corrupted save or dead battery message, restart VBA for the changes to take effect."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Load the lua script."}),`
`]}),`
`,e.jsx(n.h3,{children:"PokeFinder setup"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Launch PokeFinder and select Gen 3 Stationary."}),`
`,e.jsx(n.li,{children:"Select profile or input TID/SID information."}),`
`,e.jsxs(n.li,{children:["Input the correct initial seeds into PokeFinder.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"0" for Emerald.'}),`
`,e.jsx(n.li,{children:'"5A0" for Ruby/Sapphire.'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"All non-wild pokemon for Generation 3 Pokemon are Method 1."}),`
`,e.jsx(n.li,{children:"Search for a spread and find a target frame."}),`
`]}),`
`,e.jsx(n.p,{children:"![](pic of pokefinder example)"}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Hitting the Desired Frame"}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Finding Delay",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Advance to the final screen before encountering the target Pokemon."}),`
`,e.jsx(n.li,{children:"Make a save state ~100 frames before the encouter."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"![](pic of wait screen)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When you land on your target frame press ",e.jsx(n.code,{children:"A"})," and enter the encounter."]}),`
`,e.jsxs(n.li,{children:["The period ",e.jsx(n.code,{children:"."})," key can be used to advance by one frame when paused."]}),`
`,e.jsx(n.li,{children:"Take note of the IVs of the Pokemon you encounterd, they won't be the target pokemon's IVs."}),`
`,e.jsx(n.li,{children:"We will need to find a new target frame to get the correct Pokemon."}),`
`]}),`
`,e.jsx(n.p,{children:"![](Pic of ivs)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Open a new PokeFinder window and input IVs of the Pokemon encountered."}),`
`,e.jsx(n.li,{children:"To find the delay subtract the frame hit from the desired frame."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Delay = Frame Hit - Target Frame"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Your new Target Frame = Desired Frame - Delay"})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Encountering the Pokemon",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Reload the previous save state before the encounter."}),`
`,e.jsx(n.li,{children:"Advance to the new target frame."}),`
`,e.jsx(n.li,{children:"If the Pokemon is not the desired Pokemon then find the new delay."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"![](pic of the pokemon)"})]})}function o(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{o as default,l as frontmatter};
