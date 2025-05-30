import{u as s,j as e}from"./index-KcclKezn.js";const o={title:"Ruby and Sapphire Live vs Dead Battery RNG",navDrawerTitle:"Live vs Dead Battery",description:"Learn the differences between RNG methods on Ruby and Sapphire with live and dead batteries, and how each impacts your Pokemon results.",slug:"rs-battery",category:"Ruby and Sapphire",tag:"any"};function i(n){const t={a:"a",br:"br",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Introduction"}),`
`,e.jsx(t.p,{children:"This guide explains how the RNG works with live and dead batteries in Ruby and Sapphire. It's for both emulator and retail players. It also answers common questions for beginners."}),`
`,e.jsx(t.p,{children:"We'll look at both methods (live and dry battery), how they work, and help you choose which one to use."}),`
`,e.jsx(t.h2,{children:"Dry Battery"}),`
`,e.jsx(t.p,{children:"If you know Emerald RNG, this will feel familiar."}),`
`,e.jsx(t.p,{children:"A dry (dead) battery means the Real Time Clock (RTC) is not working. Time-based events like berry growth stop."}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"With a dry battery, your initial seed is always 5A0."})}),`
`,e.jsx(t.p,{children:"This is great for retail players. It's just like RNG in Emerald — you always start from the same place, so it's easier to hit your target frame."}),`
`,e.jsx(t.p,{children:"Two big differences from Emerald:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The initial seed is 5A0 (not 0)."}),`
`,e.jsx(t.li,{children:"You can't use Battle Videos."}),`
`]}),`
`,e.jsxs(t.p,{children:["You can now also change the initial seed using the ",e.jsx(t.a,{href:"/emerald-painting-rng",children:"Painting Seed method"}),". This lets you start from different seeds, similar to how live battery works."]}),`
`,e.jsx(t.h2,{children:"Live Battery"}),`
`,e.jsx(t.p,{children:"Live battery works best on emulator. Here's the idea:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"One in-game minute = one initial seed."}),`
`,e.jsx(t.li,{children:"You'll always get the same seed if the clock is the same."}),`
`,e.jsx(t.li,{children:"Tools like PokeFinder can find dates and times for specific initial seeds."}),`
`]}),`
`,e.jsx(t.p,{children:"Live Battery used to be better because you could hit any seed. But now with the Painting method, dry battery can do that too. Still, Live Battery is useful if you can set the clock — especially on emulator."}),`
`,e.jsx(t.h3,{children:"What about retail?"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Take the battery out and put it back in to reset the clock."}),`
`,e.jsx(t.li,{children:"Wait for the correct time to hit your seed."}),`
`]}),`
`,e.jsxs(t.p,{children:["This method gives you one try per minute. To make it easier, use this tool:",e.jsx(t.br,{}),`
`,e.jsx(t.a,{href:"https://github.com/megaboyexe/GBA_RTCRead",children:"Set RTC with this tool"})]}),`
`,e.jsx(t.p,{children:"It lets you set the clock directly in a working battery game."}),`
`,e.jsx(t.h2,{children:"Which method is better?"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.strong,{children:"Live Battery"})," if you can control the RTC (like on emulator)."]}),`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.strong,{children:"Dry Battery"})," if you can't (like on retail)."]}),`
`,e.jsxs(t.li,{children:["With either method you can try the ",e.jsx(t.strong,{children:"Painting method"})," to hit any seed."]}),`
`]}),`
`,e.jsx(t.p,{children:"The RNG process is the same either way. Just change how you get your initial seed depending on the method."})]})}function a(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{a as default,o as frontmatter};
