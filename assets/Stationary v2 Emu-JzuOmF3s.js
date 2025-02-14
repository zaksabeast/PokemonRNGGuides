import{u as o,j as e}from"./index-Dz3fli10.js";const s={title:"Stationary v2 RNG",description:"Stationary v2 RNG",slug:"emulator-frlg-stationary",subCategory:"Emulator",isRoughDraft:!0};function r(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Vba"}),`
`,e.jsxs(n.li,{children:["Lua Scripts v2 on noob: ",e.jsx(n.a,{href:"https://pokerng.forumcommunity.net/?t=56443955",children:"https://pokerng.forumcommunity.net/?t=56443955"})]}),`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsxs(n.li,{children:["Vlad's doc for delays: ",e.jsx(n.a,{href:"https://docs.google.com/document/d/11jxX7bTSGf2vzkdHr-lEpz2bLRI_u7zRbXaOtbasTp0",children:"https://docs.google.com/document/d/11jxX7bTSGf2vzkdHr-lEpz2bLRI_u7zRbXaOtbasTp0"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Prepare for RNG"}),`
`,e.jsx(n.p,{children:"These scripts improve frame counting and reduce mistakes. With some technique, you can hit any frame without calibration. You need to know your Pokémon's basic delay to do this. I've provided as much data as possible. If something is missing, feel free to contact me."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open your emulator and save in front of the target."}),`
`,e.jsx(n.li,{children:'Open PokeFinder, select "Gen 3" => "Stationary" (Method 1). Select your profile.'}),`
`,e.jsx(n.li,{children:"In the delay box, check it and add the delay for your target."}),`
`,e.jsx(n.li,{children:"Search for a target."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Advance Frames"}),`
`,e.jsx(n.p,{children:"The further you go in frames, the higher the wrong delay may get. To avoid this, do a Trainer Card Flip near your target frame to refresh and get the basic delay."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the menu and go to your Trainer Card."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," to flip the card."]}),`
`,e.jsx(n.li,{children:"Do this around 2-3k frames before your target frame."}),`
`]}),`
`,e.jsx(n.p,{children:"You can advance many frames (about 1 million every 10 seconds with the Teachy TV)."}),`
`,e.jsx(n.h2,{children:"Step 3: Target the Frame"}),`
`,e.jsxs(n.p,{children:["After the card flip, go to the last input. When close to the target frame, pause the emulator (",e.jsx(n.code,{children:"ctrl + p"}),"), and advance frame by frame (",e.jsx(n.code,{children:"ctrl + n"}),") to the frame shown by PokeFinder. Press ",e.jsx(n.code,{children:"A"})," and unpause at the same time."]}),`
`,e.jsx(n.p,{children:"Congrats! You're done!"})]})}function i(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{i as default,s as frontmatter};
