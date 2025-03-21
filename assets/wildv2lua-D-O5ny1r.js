import{u as i,j as e}from"./index-B_2stWN7.js";const o={title:"Wild v2 RNG",description:"Wild v2 RNG",slug:"emulator-frlg-wild-v2",subCategory:"Emulator",isRoughDraft:!0,tag:"emu"};function t(r){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This guide uses the new lua scripts from noob.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsxs(n.li,{children:["Vlad's doc for delays: ",e.jsx(n.a,{href:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147",children:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Understanding the Scripts"}),`
`,e.jsx(n.p,{children:"These scripts provide better frame counting and fewer mistakes. With some technique, you can hit any frame without calibration. You need to know the basic delay of the zone. I've included as much data as possible."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"On Fire Red/Leaf Green, delays are stable. Follow the delays I've provided."}),`
`,e.jsx(n.li,{children:"There can be a difference of +1 (e.g., 264 instead of 263), but this is rare."}),`
`,e.jsx(n.li,{children:"If you want to check, do one calibration, and it'll work 100% after that."}),`
`]}),`
`,e.jsx(n.p,{children:"Routes are always the same."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'256 frames apply to every "Route" zone.'}),`
`,e.jsx(n.li,{children:"263 frames apply to caves."}),`
`,e.jsx(n.li,{children:"Surfing matches the frames of the zone (e.g., 263 frames in caves)."}),`
`]}),`
`,e.jsx(n.p,{children:"If you find anything wrong (like a huge difference), PM or ping me to correct it."}),`
`,e.jsx(n.h2,{children:"Step 2: Setting Up"}),`
`,e.jsx(n.p,{children:"Open your emulator and save in the area you want."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open PokeFinder, select "Gen 3" => "Wild" (Method H-1).'}),`
`,e.jsx(n.li,{children:"Select your profile."}),`
`,e.jsx(n.li,{children:"Choose the zone and the Pokémon you want (if you have one in mind)."}),`
`,e.jsx(n.li,{children:"In the delay box, add the delay for your target."}),`
`,e.jsx(n.li,{children:"Search for a target frame."}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"})," The more you advance in frames, the more likely you will have a higher and incorrect delay. To avoid this, do a Trainer Card Flip near your target frame to refresh and get the basic delay."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the menu."}),`
`,e.jsxs(n.li,{children:["Go to your Trainer Card and press ",e.jsx(n.code,{children:"A"})," to flip it."]}),`
`,e.jsx(n.li,{children:"Do this about 2-3k frames before your target frame."}),`
`]}),`
`,e.jsx(n.p,{children:"You can advance a lot of frames (up to 1 million every 10 seconds with Teachy TV)."}),`
`,e.jsx(n.h2,{children:"Step 3: Finding the Pokémon"}),`
`,e.jsx(n.p,{children:"After the card flip is done:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the menu and select the Pokémon with Sweet Scent."}),`
`,e.jsx(n.li,{children:"Put your cursor on the move."}),`
`,e.jsxs(n.li,{children:["Once close to the target frame, pause the emulator (",e.jsx(n.code,{children:"ctrl + p"}),")."]}),`
`,e.jsxs(n.li,{children:["Advance frame by frame (",e.jsx(n.code,{children:"ctrl + n"}),") to the frame shown by PokeFinder."]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," and unpause at the same time."]}),`
`]}),`
`,e.jsx(n.p,{children:"Done."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Last thing:"})," If you don't get the target, double-check your own delay and make sure to do the Trainer Flip."]})]})}function l(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{l as default,o as frontmatter};
