import{u as r,j as e}from"./index-xpWIZSsh.js";const o={title:"Live Battery TID/SID RNG",description:"RNG for a specific TID/SID combination with more options than dead battery",slug:"emulator-rs-live-battery-tid",subCategory:"Emulator"};function t(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This guide will help you get cool TIDs for your RNG. If you don't care about TID, consider the Dead Battery TID/SID Abuse for fewer steps and simplicity.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.binaryhexconverter.com/decimal-to-hex-converter",children:"Decimal to Hex Converter"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://runasdate.en.softonic.com/",children:"runasdate (Optional)"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Decide on a shiny spread (Optional)"}),`
`,e.jsx(n.p,{children:"If you don’t want a shiny Pokémon and/or don't care about IVs, you can skip this step."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open PokeFinder and go to Gen 3 Tools. Select "IV to PID" and choose your desired IVs and nature. Ensure the correct method for your target is available. Your screen should look like this:'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Enter your desired TID in the ID box and note the SID provided."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding your initial seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go to this ",e.jsx(n.a,{href:"https://www.binaryhexconverter.com/decimal-to-hex-converter",children:"website"}),"."]}),`
`,e.jsx(n.li,{children:"Open PokeFinder."}),`
`,e.jsxs(n.li,{children:["On the website, enter your desired TID.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For example, 02332 gives 91C."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Enter that hex value in the PID to IVs option under Generation 3 Tools."}),`
`,e.jsxs(n.li,{children:["Convert the SID listed in PID To IVs as well.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For example, inputting 46392 gives B538."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Hex.png",alt:"Hex"})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:"Open PokeFinder's Generation 3 Tools tab and select PID to IVs. Enter the two hex values (TID first, then SID). If you get a Method 1 Spread, you have a valid ID combo. If not, add 1 to your SID and reconvert to hex until you get a valid one."}),`
`,e.jsx(n.li,{children:"Take the seed it provides and go to Generation 3 Tools ----> 16-Bit Seed To Time. Enter the seed, ensure the year is set to 2000, hit search, and you'll get some dates. The seed will change to a 4-digit/lettered seed, which is your initial seed."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Hitting your initial seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open runasdate and enter the time from the 16-Bit Seed to Time results. Ensure Immediate Mode is set. Note that runasdate uses a 24-hour clock."}),`
`,e.jsx(n.li,{children:"Once loaded, pause the game and go to PokeFinder's Stationary screen. Search for the IVs from the PID to IVs tool. The resulting frame is what you need to hit."}),`
`,e.jsx(n.li,{children:"Hit Run and enter the game. Reach the screen where Prof. Birch says he'll see you later. Advance to the frame noted in RNGReporter and make save states along the way. You will likely miss your frame."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.p,{children:"Advance frames on the screen above."}),`
`,e.jsx(n.h2,{children:"Step 4: The delay"}),`
`,e.jsxs(n.p,{children:["Frames pass between pressing ",e.jsx(n.code,{children:"A"})," and when the TID/SID is generated. You must find how many frames pass."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go to the IDs function in PokeFinder."}),`
`,e.jsx(n.li,{children:"Enter your initial seed and the TID received to find what frame you hit."}),`
`,e.jsxs(n.li,{children:["Adjust accordingly.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For example, if you aimed for frame 89103 but hit 89175, your delay was 72, meaning you need to hit ",e.jsx(n.code,{children:"A"})," 72 frames early."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If your TID/SID are swapped, go one frame earlier.
`})}),`
`,e.jsx(n.p,{children:"Enjoy your new TID!"}),`
`,e.jsx(n.p,{children:"Here is an example of a successful ID RNG:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Success.png",alt:"Success"})})]})}function a(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{a as default,o as frontmatter};
