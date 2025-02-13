import{u as r,j as e}from"./index-DlzSnQqK.js";const s={title:"Time Finder (Citra)",description:"Finding times to get specific RNG seeds",slug:"emulator-usum-time-finder",subCategory:"Emulator"};function i(t){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Citra and CitraRNG"}),`
`,e.jsx(n.li,{children:"3DSTimeFinder"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide shows how to use TimeFinder.js with CitraRNG. You can harness time to hit the desired Initial Seed without soft resetting and redo RNG attempts. This guides assumes basic CitraRNG knowledge."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Citra and set your RTC to any date you want. Write it down somewhere since you'll need it."}),`
`,e.jsx(n.li,{children:"Launch your game and CitraRNG, and go to Gen 7 Tab."}),`
`,e.jsx(n.li,{children:"Update the initial seed and write it down too."}),`
`]}),`
`,e.jsx(n.h2,{children:"Calibration and Profile Generation"}),`
`,e.jsx(n.p,{children:"The default offset and tick values won't match. These values change depending on the version of Citra you're using and are only suggestions. For example, Citra Nightly 1543 has a tick of 4470937 and and offset of 56."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open 3DSTimeFinder and go to Tools => Gen 7 Profile Calibrator."}),`
`,e.jsx(n.li,{children:"Select the game you're trying to calibrate (SM or USUM)."}),`
`,e.jsx(n.li,{children:"In the Offset Range, put a small number like 10."}),`
`,e.jsx(n.li,{children:"In the Tick Range, put a big number, such as 50,000,000."}),`
`,e.jsx(n.li,{children:"It'll take some time but you'll find a result. Once you find the result, create a profile based on these values."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Because of daylight saving, the chances that you don't find any result on the actual hour is important. However it doesn't mean you're doing it wrong. You'll need to adjust by one hour (+/- 1) and retry until getting a result.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you find a result for Ultra Sun, Ultra Moon will have the same profile, so you can just copy it for each game.
`})}),`
`,e.jsx(n.h2,{children:"Using Gen7TimeFinder"}),`
`,e.jsx(n.p,{children:"Gen7TimeFinder is an alternate to TimeFinder.js."}),`
`,e.jsx(n.p,{children:"To find desired results, select the category (Wild, Stationary, Event, or TID/SID) and input your criteria in the main tab. Make sure the correct profile is selected and search for spreads. Adjust the time range for rarer spreads."}),`
`,e.jsx(n.p,{children:"For SOS battles, use the Stationary tab. Keep in mind there will be lots of RNG advances during setup, so find a target that is quite a ways out."}),`
`,e.jsx(n.p,{children:"Once you find a result, record the date and time."}),`
`,e.jsx(n.h2,{children:"Hitting Any Initial Seed"}),`
`,e.jsx(n.p,{children:"To achieve your target Initial Seed, input the desired RTC in Citra, save, and run the game."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Due to daylight saving, you may need to adjust the time by +/- 1 hour and relaunch the game and CitraRNG to ensure it worked.
`})})]})}function o(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,s as frontmatter};
