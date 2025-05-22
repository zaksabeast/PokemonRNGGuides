import{u as t,j as e}from"./index-BWkkpZHG.js";const a={title:"Ruby and Sapphire TID RNG",navDrawerTitle:"TID RNG",description:"Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire.",slug:"emulator-rs-live-battery-tid",category:"Ruby and Sapphire",tag:"emu"};function s(r){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Finding Your Initial Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder and go to Gen 3 IDs, then select the RS tab."}),`
`,e.jsx(n.li,{children:"Select the desired filter and enter the desired TIDs, SIDs, or TSVs."}),`
`,e.jsx(n.li,{children:"Leave the time and date as is, or adjust if needed."}),`
`,e.jsxs(n.li,{children:['Click "Generate" and search for a matching TID.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If no results appear, try adjusting the time, date, or increasing max advances."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Hitting Your Initial Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In mGBA, go to ",e.jsx(n.code,{children:"Tools -> Game Overrides..."}),' and enable "Realtime clock."']}),`
`,e.jsxs(n.li,{children:["Then go to ",e.jsx(n.code,{children:"Tools -> Game Pak Sensors..."}),', select "Start time at," and enter the target time and date.']}),`
`,e.jsx(n.li,{children:"Start the game and play until Prof. Birch says he'll see you later."}),`
`,e.jsx(n.li,{children:"Let the game advance to the target number of advances, making save states along the way."}),`
`]}),`
`,e.jsx(n.p,{children:"Advance at this screen:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h2,{children:"Step 3: Adjusting for Delay"}),`
`,e.jsxs(n.p,{children:["There is a delay between pressing ",e.jsx(n.code,{children:"A"})," and when the TID/SID is generated. You need to account for this."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Note your target advance."}),`
`,e.jsxs(n.li,{children:["When you reach it, press ",e.jsx(n.code,{children:"A"})," to generate a TID."]}),`
`,e.jsx(n.li,{children:"Enter this TID into PokeFinder and search for the result."}),`
`,e.jsxs(n.li,{children:["Compare your actual advance with the target to calculate the delay.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Example: If you aimed for advance ",e.jsx(n.strong,{children:"89103"})," but hit ",e.jsx(n.strong,{children:"89175"}),", your delay is ",e.jsx(n.strong,{children:"72"}),", so you need to press ",e.jsx(n.code,{children:"A"})," ",e.jsx(n.strong,{children:"72 advances earlier"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Reload a save state from before and press ",e.jsx(n.code,{children:"A"})," at the new calculated advance."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If your TID/SID are swapped, go one advance earlier.
`})}),`
`,e.jsx(n.p,{children:"Enjoy your new TID!"}),`
`,e.jsx(n.p,{children:"Here is an example of a successful ID RNG:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Live-Battery-TID/Success.png",alt:"Success"})})]})}function l(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{l as default,a as frontmatter};
