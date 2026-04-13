import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DUsdE6jN.js";var n=e(),r={title:`Ruby and Sapphire Live vs Dead Battery RNG`,navDrawerTitle:`Live vs Dead Battery`,description:`Learn the differences between RNG methods on Ruby and Sapphire with live and dead batteries, and how each impacts your Pokemon results.`,slug:`rs-battery`,category:`Ruby and Sapphire`,section:`rng_technique`,variant:[`retail`,`cfw-emu`]};function i(e){let r={a:`a`,br:`br`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Introduction`}),`
`,(0,n.jsx)(r.p,{children:`This guide explains how the RNG works with live and dead batteries in Ruby and Sapphire. It's for both emulator and retail players. It also answers common questions for beginners.`}),`
`,(0,n.jsx)(r.p,{children:`We'll look at both methods (live and dry battery), how they work, and help you choose which one to use.`}),`
`,(0,n.jsx)(r.h2,{children:`Dry Battery`}),`
`,(0,n.jsx)(r.p,{children:`If you know Emerald RNG, this will feel familiar.`}),`
`,(0,n.jsx)(r.p,{children:`A dry (dead) battery means the Real Time Clock (RTC) is not working. Time-based events like berry growth stop.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`With a dry battery, your initial seed is always 5A0.`})}),`
`,(0,n.jsx)(r.p,{children:`This is great for retail players. It's just like RNG in Emerald — you always start from the same place, so it's easier to hit your target frame.`}),`
`,(0,n.jsx)(r.p,{children:`Two big differences from Emerald:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The initial seed is 5A0 (not 0).`}),`
`,(0,n.jsx)(r.li,{children:`You can't use Battle Videos.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`You can now also change the initial seed using the `,(0,n.jsx)(r.a,{href:`/emerald-painting-rng`,children:`Painting Seed method`}),`. This lets you start from different seeds, similar to how live battery works.`]}),`
`,(0,n.jsx)(r.h2,{children:`Live Battery`}),`
`,(0,n.jsx)(r.p,{children:`Live battery works best on emulator. Here's the idea:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`One in-game minute = one initial seed.`}),`
`,(0,n.jsx)(r.li,{children:`You'll always get the same seed if the clock is the same.`}),`
`,(0,n.jsx)(r.li,{children:`Tools like PokeFinder can find dates and times for specific initial seeds.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Live Battery used to be better because you could hit any seed. But now with the Painting method, dry battery can do that too. Still, Live Battery is useful if you can set the clock — especially on emulator.`}),`
`,(0,n.jsx)(r.h3,{children:`What about retail?`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Take the battery out and put it back in to reset the clock.`}),`
`,(0,n.jsx)(r.li,{children:`Wait for the correct time to hit your seed.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`This method gives you one try per minute. To make it easier, use this tool:`,(0,n.jsx)(r.br,{}),`
`,(0,n.jsx)(r.a,{href:`https://github.com/megaboyexe/GBA_RTCRead`,children:`Set RTC with this tool`})]}),`
`,(0,n.jsx)(r.p,{children:`It lets you set the clock directly in a working battery game.`}),`
`,(0,n.jsx)(r.h2,{children:`Which method is better?`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.strong,{children:`Live Battery`}),` if you can control the RTC (like on emulator).`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.strong,{children:`Dry Battery`}),` if you can't (like on retail).`]}),`
`,(0,n.jsxs)(r.li,{children:[`With either method you can try the `,(0,n.jsx)(r.strong,{children:`Painting method`}),` to hit any seed.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`The RNG process is the same either way. Just change how you get your initial seed depending on the method.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};