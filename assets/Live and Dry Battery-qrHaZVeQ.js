import{u as o,j as e}from"./index-DWyu2pqB.js";const r={title:"Difference between Live and Dry Battery",description:"Discover the two ways to RNG on Ruby/Sapphire and learn their differences",slug:"rs-battery",subCategory:"Basic Knowledge",tag:"any"};function i(n){const t={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"This guide introduces Ruby/Sapphire RNG. It applies to all RNGers: Emu and Retail. It answers common questions for those new to RNG abuse."}),`
`,e.jsx(t.p,{children:"We'll look at each method, explain how it works, and offer a conclusion to help you decide which to use."}),`
`,e.jsx(t.h2,{children:"Dry Battery"}),`
`,e.jsx(t.p,{children:"The Dry Battery will feel familiar if you know how Emerald works."}),`
`,e.jsx(t.p,{children:"A dead battery means the RTC (Real Time Clock) is no longer active. This means that time-dependent actions, like berry growth, are frozen. Without an active RTC, seeding and RNGing are also based on the time."}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"With a dead battery, you have only one Initial Seed: 5A0."})}),`
`,e.jsx(t.p,{children:"This is a huge advantage for Retail RNGers, allowing you to hit your frame like you would on Emerald. It all works the same way."}),`
`,e.jsx(t.p,{children:"Two major differences between RS Dry Battery and Emerald are:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The Initial Seed is 5A0, not 0."}),`
`,e.jsx(t.li,{children:"Battle Video isn't available."}),`
`]}),`
`,e.jsx(t.p,{children:"Recent discoveries show that the Initial Seed can be changed using the Painting Seed method. This involves a small setup before aiming for your target, allowing you to hit any Initial Seed, which makes it similar to Live Battery."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note: Dry Battery is necessary for Wishmaker Jirachi RNG.
`})}),`
`,e.jsx(t.h2,{children:"Live Battery"}),`
`,e.jsx(t.p,{children:"Live Battery is more emulator-focused. To simplify, one minute (based on the in-game clock) equals one Initial Seed. In a specific minute, you'll always hit the same Initial Seed. Using PokeFinder makes it easy to know which Initial Seed you have, provided you know the exact time on your game clock."}),`
`,e.jsx(t.p,{children:"Live Battery was previously more interesting as you could target any Initial Seed easily. However, with the Painting Seed method, Live Battery is less versatile because now you can easily find the Initial Seed you want and use it to your advantage—still important for users who control the RTC on an emulator."}),`
`,e.jsx(t.p,{children:"How does Live Battery work for Retail?"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Remove the battery and put it back to reset the clock."}),`
`,e.jsx(t.li,{children:"Wait for the right time and date to perform your RNG."}),`
`]}),`
`,e.jsxs(t.p,{children:["You typically have one shot for RNG since you only have one minute to hit the correct Initial Seed. To avoid this hassle, you can use this tool to set an RTC: ",e.jsx(t.a,{href:"https://github.com/megaboyexe/GBA_RTCRead",children:"https://github.com/megaboyexe/GBA_RTCRead"}),". This allows you to set any RTC in a working battery game and then do your Live Battery RNG."]}),`
`,e.jsx(t.h2,{children:"In the end, what's the better method?"}),`
`,e.jsx(t.p,{children:"Choose Live Battery if you can control the RTC easily. Choose Dry Battery if you can't. If you're skilled enough, try the Painting method for any desired Initial Seed."}),`
`,e.jsx(t.p,{children:"Apart from that, RNG does not change between the two methods. Follow the steps in the guides and adjust the Initial Seed based on your method."})]})}function s(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{s as default,r as frontmatter};
