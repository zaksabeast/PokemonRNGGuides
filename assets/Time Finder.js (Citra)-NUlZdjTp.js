import{u as r,j as e}from"./index-CfgHBwUk.js";const s={title:"Time Finder (Citra)",description:"Finding times to get specific RNG seeds",slug:"emulator-usum-time-finder",subCategory:"Emulator",tag:"emu"};function i(t){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Citra and CitraRNG"}),`
`,e.jsx(n.li,{children:"3DSTimeFinder"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide explains how to use TimeFinder.js with CitraRNG. You can use time to hit the desired initial seed without soft resetting and redo RNG attempts. This guide assumes basic knowledge of CitraRNG."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Citra and set your RTC to any date you want. Write it down as you'll need it."}),`
`,e.jsx(n.li,{children:"Launch your game and CitraRNG, and go to the Gen 7 tab."}),`
`,e.jsx(n.li,{children:"Update the initial seed and write it down."}),`
`]}),`
`,e.jsx(n.h2,{children:"Calibration and Profile Generation"}),`
`,e.jsx(n.p,{children:"The default offset and tick values may not match. These values differ by the version of Citra and are just suggestions. For example, Citra Nightly 1543 has an offset of 3730114 and a tick of 55."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open 3DSTimeFinder and go to Tools => Gen 7 Profile Calibrator."}),`
`,e.jsx(n.li,{children:"Select the game you're calibrating (SM or USUM)."}),`
`,e.jsx(n.li,{children:"In the Tick Range, enter a small number like 10."}),`
`,e.jsx(n.li,{children:"In the Offset Range, enter a large number, like 50,000,000."}),`
`,e.jsx(n.li,{children:"It may take some time, but you'll find a result. Create a profile based on these values."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Because of daylight saving, it's common not to find results at the actual hour. If this happens, adjust by +/- 1 hour and retry until you get a result.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you find a result for Sun, Moon will have the same profile, so you can copy it for each game.
`})}),`
`,e.jsx(n.h2,{children:"Gen7TimeFinder"}),`
`,e.jsx(n.p,{children:"Gen7TimeFinder is another option to TimeFinder.js."}),`
`,e.jsx(n.p,{children:"To find desired results, select the category (Wild, Stationary, Event, or TID/SID) and input your criteria in the main tab. Ensure the correct profile is selected and search for spreads. Adjust the time range for rarer spreads."}),`
`,e.jsx(n.p,{children:"For SOS battles, use the Stationary tab. Be aware there will be many RNG advances during setup, so find a target that is further out."}),`
`,e.jsx(n.p,{children:"Once you find a result, record the date and time."}),`
`,e.jsx(n.h2,{children:"Hitting Any Initial Seed"}),`
`,e.jsx(n.p,{children:"To achieve your target initial seed, input the desired RTC in Citra, save, and run the game."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Due to daylight saving, you may need to adjust the time by +/- 1 hour and relaunch the game and CitraRNG to ensure it worked.
`})})]})}function o(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,s as frontmatter};
