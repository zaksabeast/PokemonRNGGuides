import{u as r,j as e}from"./index-BAEKAekl.js";const s={title:"Wild v2 RNG",description:"Wild v2 RNG",slug:"emulator-frlg-wild-v2",subCategory:"Emulator",isRoughDraft:!0};function o(n){const t={a:"a",br:"br",li:"li",p:"p",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"/!\\ This guide uses the NEW lua scripts from noob /!\\"}),`
`,e.jsx(t.p,{children:"Necessary :"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Vba"}),`
`,e.jsxs(t.li,{children:["Lua Scripts v2 on noob : ",e.jsx(t.a,{href:"https://pokerng.forumcommunity.net/?t=56443955",children:"https://pokerng.forumcommunity.net/?t=56443955"})]}),`
`,e.jsx(t.li,{children:"PokeFinder"}),`
`,e.jsxs(t.li,{children:["My doc for delays : ",e.jsx(t.a,{href:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147",children:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147"})]}),`
`]}),`
`,e.jsx(t.p,{children:"Okay so little notes :"}),`
`,e.jsx(t.p,{children:`First these scripts allow a better frame count, and less mistakes. This allows with a little technique to hit any frame without
any calibration. But you need to know the basic delay of the zone. I've provided as much data as possible. Important notes. On
Fire Red / Leaf Green delay are REALLY stables. So you can follow the ones i've wrote here. There can be a difference of +1 (aka
264 rather than 263 for example) but this applies everywhere, and is pretty rare. Got it once. If you want to do any check, just do a
calibration once. It'll work 100% after on that zone.`}),`
`,e.jsx(t.p,{children:`Second thing, routes will be always the same. 256 Frames applies on every "Route" zone, 263 for Caves etc etc. Surfing matches the
frames of the zone. For example in a cave, it'll be 263 Frames.`}),`
`,e.jsx(t.p,{children:`Finally, if you find anything wrong (a HUGE difference, not the +1 frame thing i've said earlier) just pm / ping me to see with me
and correct that.`}),`
`,e.jsx(t.p,{children:"Okay so now it's really similar to the v1."}),`
`,e.jsx(t.p,{children:"Open your emulator, save in the area you want to."}),`
`,e.jsxs(t.p,{children:[`Open PokeFinder, select "Gen 3" => "Wild it'll be Method H-1. Select your profile.
Select the Zone and the Pokemon targeted (if you have one in mind)
/!\\ In the delay box, check it and add the delay corresponding to your target /!`,e.jsx(t.br,{}),`
`,"Search for a target frame."]}),`
`,e.jsx(t.p,{children:`IMPORTANT : More you advance in frames, more you'll be likely have a higher and wrong delay. To avoid that, you need to do a
Trainer Card Flip near your target frame to refresh this and get the basic delay.
For that. Open the menu, go in your trainer Card, press A. It'll flip. It's done.
Do that around 2/3k before your target frame.`}),`
`,e.jsx(t.p,{children:"Important : You can advance a LOT of frames (talking about 1 Million every 10 seconds with the Teachy TV)"}),`
`,e.jsx(t.p,{children:`Once the card flip done, go to menu, select the Pokemon with Sweet Scent and put your cursor on the move.
Once close to the target frame, pause the emulator (ctrl + p), and advance frame by frame (ctrl + n) to the one shown by
PokeFinder. PRess A and unpause at the same time.`}),`
`,e.jsx(t.p,{children:"Done."}),`
`,e.jsx(t.p,{children:"Last thing : If you don't get the target, double check your OWN delay, and be sure to do the Trainer Flip."})]})}function i(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{i as default,s as frontmatter};
