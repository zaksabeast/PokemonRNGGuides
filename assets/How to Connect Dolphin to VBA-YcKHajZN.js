import{u as t,j as e}from"./index-CA_w39YH.js";const l={title:"Connect Dolphin to VBA",description:"Learn how to redeem Jirachi or transfer your RNGs to a GBA game.",slug:"misc-dolphin-connect-vba",category:"GBA Tools",tag:"emu"};function o(s){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This link can be unstable and may not work 100% of the time due to timing inconsistencies between the two emulators. The performance of your PC could affect the success rate of the connection.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sourceforge.net/projects/vbam/",children:"VBA-M"})}),`
`,e.jsx(n.li,{children:"Dolphin 5 (some other versions might work, Dolphin releases new versions frequently)"}),`
`,e.jsxs(n.li,{children:["GBA bios (",e.jsx(n.a,{href:"http://imgur.com/byn7Kfb",children:"This is the Nintendo logo displayed during the start"}),")"]}),`
`,e.jsx(n.li,{children:"You'll need a GBA and GameCube game that can connect."}),`
`]}),`
`,e.jsx(n.p,{children:"This guide applies to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Colosseum Bonus Disc"}),`
`,e.jsx(n.li,{children:"Pokemon Colosseum"}),`
`,e.jsx(n.li,{children:"Pokemon Channel"}),`
`,e.jsx(n.li,{children:"JPN Colosseum Bonus Disc"}),`
`,e.jsx(n.li,{children:"JPN Pokemon Colosseum"}),`
`,e.jsx(n.li,{children:"Pokemon XD Gale of Darkness"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set up VBA-M"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Navigate to GBA options and select "use bios file".'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Setup.png",alt:"Setup Bios"})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Press configure and choose the bios file to use."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Setup-2.png",alt:"Select Bios"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Choose GameCube link."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Gamecube-Link.png",alt:"Gamecube Link"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsx(n.li,{children:"Start the network link."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Set up Dolphin"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Set port 2 to GBA."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Change-Port.png",alt:"Change Port"})}),`
`,e.jsx(n.h2,{children:"Step 3: Establish the connection"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"When asked by the GameCube game to activate your GBA, import the battery file."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Import.png",alt:"Import Battery"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If the connection fails to establish immediately, try to restart the game or retry importing the battery file. If a connection is established but an error occurs, keep on trying.
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"After few restarts, the connection should succeed."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Success.png",alt:"Success"})})]})}function r(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{r as default,l as frontmatter};
