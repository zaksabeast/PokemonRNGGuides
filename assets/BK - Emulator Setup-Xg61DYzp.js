import{u as s,j as e}from"./index-DwuEbFCg.js";const r={title:"How to set up Ryujinx & CheatEngine",navDrawerTitle:"Ryujinx Set Up",description:"How to set up Ryujinx or Yuzu and Cheat Engine to RNG in Brilliant Diamond and Shining Pearl using lua scripts.",slug:"bdsp-emulator-setup",category:"Brilliant Diamond and Shining Pearl",tag:"emu"};function t(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://ryujinx.app/download",children:"Ryujinx"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.cheatengine.org/downloads.php",children:"Cheat Engine"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Real96/BDSP-CheatEngine-Lua",children:"BDSP_RNG.lua"})}),`
`,e.jsx(n.li,{children:"Updated game to version 1.1.1 or higher"}),`
`]}),`
`,e.jsx(n.h2,{children:"Usage"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Ryujinx, run the game, and pause it at the title screen."}),`
`,e.jsxs(n.li,{children:["Open Cheat Engine, click on ",e.jsx(n.code,{children:"Edit > Settings"}),", select ",e.jsx(n.code,{children:"Scan Settings"}),", and check the ",e.jsx(n.code,{children:"MEM_MAPPED"})," option."]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"File > Open Process"})," and select the Yuzu or Ryujinx process.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Yuzu looks like ",e.jsx(n.code,{children:"xxxx-yuzu xxx | game name"}),"."]}),`
`,e.jsxs(n.li,{children:["Ryujinx looks like ",e.jsx(n.code,{children:"xxxx-Ryujinx x.x.xxxx - game name"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"Table > Show Cheat Table Lua Script"}),". A new window called ",e.jsx(n.code,{children:"Lua Script: Cheat Table"})," will appear."]}),`
`,e.jsxs(n.li,{children:["Open the ",e.jsx(n.code,{children:"BDSP_RNG.lua"})," for your game version, copy all its content, and paste it in the window that just opened."]}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Execute Script"}),". It will freeze for a bit, just wait until it prints all the RNG info in a new window."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"To change the info view tab mode, press the keys shown in the script output."}),`
`,e.jsxs(n.li,{children:["If you want to stop the script, press ",e.jsx(n.code,{children:"0"})," or ",e.jsx(n.code,{children:"NumPad 0"}),". It won't stop otherwise."]}),`
`,e.jsx(n.li,{children:"If you want to restart the game, follow the previous steps and then restart the game and the script. It won't work otherwise."}),`
`,e.jsxs(n.li,{children:["To avoid text flickering, make sure to enlarge the ",e.jsx(n.code,{children:"Lua Engine"})," window enough."]}),`
`]}),`
`,e.jsx(n.h2,{children:"What next?"}),`
`,e.jsxs(n.p,{children:["Try to RNG for a shiny starter or legendary! ",e.jsx(n.a,{href:"/cfw-bdsp-stationary",children:"BDSP Static RNG Guide"})]})]})}function o(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{o as default,r as frontmatter};
