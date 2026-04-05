import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-Bjk3q04a.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon Time Finder (Citra)`,navDrawerTitle:`Time Finder`,description:`Finding times to get specific RNG seeds.`,slug:`emulator-usum-time-finder`,category:`Ultra Sun and Ultra Moon`,section:`rng_technique`,variant:`cfw-emu`},{title:`Sun and Moon Time Finder (Citra)`,navDrawerTitle:`Time Finder`,description:`Finding times to get specific RNG seeds.`,slug:`emulator-sm-time-finder`,category:`Sun and Moon`,section:`rng_technique`,variant:`cfw-emu`,canonical:`emulator-usum-time-finder`}];function i(e){let r={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components},{ShowIf:i}=r;return i||o(`ShowIf`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Citra and CitraRNG`}),`
`,(0,n.jsx)(r.li,{children:`3DSTimeFinder`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`This guide explains how to use TimeFinder.js with CitraRNG. You can use time to hit the desired initial seed without soft resetting and redo RNG attempts. This guide assumes basic knowledge of CitraRNG.`}),`
`,(0,n.jsx)(r.h2,{children:`Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open Citra and set your RTC to any date you want. Write it down as you'll need it.`}),`
`,(0,n.jsx)(r.li,{children:`Launch your game and CitraRNG, and go to the Gen 7 tab.`}),`
`,(0,n.jsx)(r.li,{children:`Update the initial seed and write it down.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Calibration and Profile Generation`}),`
`,(0,n.jsx)(i,{slug:`/emulator-usum-time-finder`,children:(0,n.jsx)(r.p,{children:`The default offset and tick values may not match. These values differ by the version of Citra and are just suggestions. For example, Citra Nightly 1543 has an offset of 3730114 and a tick of 55.`})}),`
`,(0,n.jsx)(i,{slug:`/emulator-sm-time-finder`,children:(0,n.jsx)(r.p,{children:`The default offset and tick values may not match. These values differ by the version of Citra and are just suggestions. For example, Citra Nightly 1543 has an offset of 4470937 and a tick of 56.`})}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open 3DSTimeFinder and go to Tools => Gen 7 Profile Calibrator.`}),`
`,(0,n.jsx)(r.li,{children:`Select the game you're calibrating (SM or USUM).`}),`
`,(0,n.jsx)(r.li,{children:`In the Offset Range, enter a small number like 10.`}),`
`,(0,n.jsx)(r.li,{children:`In the Tick Range, enter a large number, like 50,000,000.`}),`
`,(0,n.jsx)(r.li,{children:`It may take some time, but you'll find a result. Create a profile based on these values.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Because of daylight saving, it's common not to find results at the actual hour. If this happens, adjust by +/- 1 hour and retry until you get a result.
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you find a result, its counterpart will have the same profile, so you can copy it for each game.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Gen7TimeFinder`}),`
`,(0,n.jsx)(r.p,{children:`Gen7TimeFinder is another option to TimeFinder.js.`}),`
`,(0,n.jsx)(r.p,{children:`To find desired results, select the category (Wild, Stationary, Event, or TID/SID) and input your criteria in the main tab. Ensure the correct profile is selected and search for spreads. Adjust the time range for rarer spreads.`}),`
`,(0,n.jsx)(r.p,{children:`For SOS battles, use the Stationary tab. Be aware there will be many RNG advances during setup, so find a target that is further out.`}),`
`,(0,n.jsx)(r.p,{children:`Once you find a result, record the date and time.`}),`
`,(0,n.jsx)(r.h2,{children:`Hitting Any Initial Seed`}),`
`,(0,n.jsx)(r.p,{children:`To achieve your target initial seed, input the desired RTC in Citra, save, and run the game.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Due to daylight saving, you may need to adjust the time by +/- 1 hour and relaunch the game and CitraRNG to ensure it worked.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};