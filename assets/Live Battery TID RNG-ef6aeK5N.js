import{u as r,j as e}from"./index-DweVeu07.js";const o={title:"Live Battery TID/SID RNG",description:"RNG for a specific TID/SID combination with more options than dead battery",slug:"emulator-rs-live-battery-tid",subCategory:"Emulator"};function i(t){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide will help you obtain cool TIDs for your RNG purposes. If you do not care about TID, I recommend that you do Dead Battery TID/SID Abuse, as it has far fewer steps and is much simpler.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://code.google.com/archive/p/vba-rerecording/downloads",children:"VBA-RR"})}),`
`,e.jsxs(n.li,{children:["Lua .dll files",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0",children:"x86 lua.dll"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0",children:"x64 lua.dll"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"http://pokerng.forumcommunity.net/?t=56443955",children:"The Ruby/Sapphire Lua Scripts for your language"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.binaryhexconverter.com/decimal-to-hex-converter",children:"Decimal to Hex Converter"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://runasdate.en.softonic.com/",children:"runasdate (Optional)"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Decide on a Shiny Spread (Optiona0)"}),`
`,e.jsx(n.p,{children:"If you have no intent on getting a Shiny Pokemon and/or don't care about IVs on the given Shiny, you may skip this step."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open to PokeFinder and go to Gen 3 Tools. Go to the "IV to PID" and select your desired IVs and nature combo. Make sure that the correct Method for your target exists. You should have a screen like this:'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Put your desired TID in the ID box and note the SID it also gives."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding your Initial Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go to this ",e.jsx(n.a,{href:"https://www.binaryhexconverter.com/decimal-to-hex-converter",children:"website"})]}),`
`,e.jsx(n.li,{children:"pen PokeFinder"}),`
`,e.jsxs(n.li,{children:["On the website, input your TID that you want",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"I want 02332, so I put in 02332 and get 91C"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Put that in the PID to IVs option under Generation 3 tools"}),`
`,e.jsxs(n.li,{children:["Take the SID listed in PID From IVs and convert it as well",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Since I want 46392, I input that and get B538"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Hex.png",alt:"Hex"})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:"Go into PokeFinder's Generation 3 Tools tab and enter PID to IVs. Put the two hexadecimal combos into PID to IVs. (Make sure to put TID first, then SID) If you get a Method 1 Spread, you have a valid ID combo. If you get a non-method 1 spread, just add 1 to your SID and reconvert it to hex until you get a valid one."}),`
`,e.jsx(n.li,{children:"Now take the seed it gives and go to Generation 3 Tools ----> 16-Bit Seed To Time. Enter the seed in the box and make sure the year is set to 2000. Hit search and you will get some dates. The seed will change to a 4-digit/lettered seed, which is your initial seed."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Hitting your Initial Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open runasdate and enter the time in 16-Bit Seed to Time. (Any of the results will work) Make sure you set Immediate Mode. Also be aware that runasdate uses a 24 hour clock, not AM/PM."}),`
`,e.jsx(n.li,{children:"Once loaded, pause the game and go to PokeFinder's Stationary screen. Search for the IVs you got in the PID to IVs tool. The resulting frame is the frame you are aiming to hit."}),`
`,e.jsx(n.li,{children:"Now hit Run and enter the game. Get to the screen where the Prof. Birch tells you he'll see you later. Advance to the Frame listed in RNGReporter and make save states along the way. You will miss your frame most likely."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.p,{children:"Advance Frames on the screen above"}),`
`,e.jsx(n.h2,{children:"Step 4: The Delay"}),`
`,e.jsx(n.p,{children:"Frames pass by between when you hit A and when the TID/SID is generated. You will need to find how many frames pass by."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go to the IDs function in PokeFinder"}),`
`,e.jsx(n.li,{children:"Put your Initial seed and TID that you recieved in and find what frame you hit"}),`
`,e.jsxs(n.li,{children:["Now adjust accordingly",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For example, if I wanted to hit frame 89103 but hit Frame 89175, my delay was 72, which means I need to hit A 72 Frames early"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If your TID / SID are swapped, go one frame earlier
`})}),`
`,e.jsx(n.p,{children:"Enjoy your new TID!"}),`
`,e.jsx(n.p,{children:"Here is an example of a successful ID RNG:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Success.png",alt:"Success"})})]})}function a(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,o as frontmatter};
