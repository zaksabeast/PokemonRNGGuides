import{u as s,j as e}from"./index-Dadzxr1q.js";const l={title:"Set up Yuzu/Ryujinx & CheatEngine",description:"How to set up Yuzu/Ryujinx and Cheat Engine to RNG in BDSP using Lua scripts",slug:"bdsp-emulator-setup",category:"Brilliant Diamond and Shining Pearl",isRoughDraft:!0,tag:"emu"};function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.cheatengine.org/downloads.php",children:"Cheat Engine"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://yuzu-emu.org/downloads/",children:"Yuzu"})," or ",e.jsx(n.a,{href:"https://ryujinx.org/download",children:"Ryujinx"})]}),`
`,e.jsx(n.li,{children:"Updated game to version 1.1.1 or higher"}),`
`]}),`
`,e.jsx(n.h2,{children:"Usage"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Open Yuzu or Ryujinx, run the game, and pause it at the title screen."}),`
`,e.jsxs(n.li,{children:["Open Cheat Engine, click on ",e.jsx(n.code,{children:"Edit > Settings"}),", select ",e.jsx(n.code,{children:"Scan Settings"}),", and check the ",e.jsx(n.code,{children:"MEM_MAPPED"})," option."]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"File > Open Process"})," and select the Yuzu or Ryujinx process (Yuzu looks like ",e.jsx(n.code,{children:"xxxx-yuzu xxx | game name"}),", Ryujinx looks like ",e.jsx(n.code,{children:"xxxx-Ryujinx x.x.xxxx - game name"}),")."]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"Table > Show Cheat Table Lua Script"}),". A new window called ",e.jsx(n.code,{children:"Lua Script: Cheat Table"})," will appear."]}),`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.a,{href:"https://github.com/Real96/BDSP-CheatEngine-Lua",children:"BDSP_RNG.lua"})," with a text editor, copy all its content, and paste it in the window that just opened."]}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Execute Script"}),". It will freeze for a bit, just wait until it prints all the RNG info in a new window."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"To change the info view tab mode, press the keys shown in the script output."}),`
`,e.jsxs(n.li,{children:["If you want to stop the script, press ",e.jsx(n.code,{children:"0"})," or ",e.jsx(n.code,{children:"NumPad 0"}),". It won't stop otherwise."]}),`
`,e.jsx(n.li,{children:"If you want to restart the game, follow the previous steps and then restart the game and the script. It won't work otherwise."}),`
`,e.jsxs(n.li,{children:["To avoid text flickering, make sure to enlarge the ",e.jsx(n.code,{children:"Lua Engine"})," window enough."]}),`
`]})]})}function r(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{r as default,l as frontmatter};
