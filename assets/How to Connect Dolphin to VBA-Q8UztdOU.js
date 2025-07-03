import{v as i,j as n}from"./index-CNyGBSTc.js";const c={title:"Connect Dolphin to VBA",description:"Learn how to redeem Jirachi or transfer your RNGs to a GBA game.",slug:"misc-dolphin-connect-vba",category:"GBA Tools",tag:"emu",hideFromNavDrawer:!0};function t(o){const e={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...o.components},{Alert:s}=e;return s||r("Alert"),n.jsxs(n.Fragment,{children:[n.jsx(s,{showIcon:!0,type:"warning",message:"This guide is outdated!",description:n.jsx(e.a,{href:"/connect-dolphin-to-gba",children:"Use the Connect Dolphin to mGBA Guide instead."})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`This link can be unstable and may not work 100% of the time due to timing inconsistencies between the two emulators. The performance of your PC could affect the success rate of the connection.
`})}),`
`,n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://sourceforge.net/projects/vbam/",children:"VBA-M"})}),`
`,n.jsx(e.li,{children:"Dolphin 5 (some other versions might work, Dolphin releases new versions frequently)"}),`
`,n.jsxs(e.li,{children:["GBA bios (",n.jsx(e.a,{href:"http://imgur.com/byn7Kfb",children:"This is the Nintendo logo displayed during the start"}),")"]}),`
`,n.jsx(e.li,{children:"You'll need a GBA and GameCube game that can connect."}),`
`]}),`
`,n.jsx(e.p,{children:"This guide applies to:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Colosseum Bonus Disc"}),`
`,n.jsx(e.li,{children:"Pokemon Colosseum"}),`
`,n.jsx(e.li,{children:"Pokemon Channel"}),`
`,n.jsx(e.li,{children:"JPN Colosseum Bonus Disc"}),`
`,n.jsx(e.li,{children:"JPN Pokemon Colosseum"}),`
`,n.jsx(e.li,{children:"Pokemon XD Gale of Darkness"}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 1: Set up VBA-M"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'Navigate to GBA options and select "use bios file".'}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Setup.png",alt:"Setup Bios"})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"Press configure and choose the bios file to use."}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Setup-2.png",alt:"Select Bios"})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"Choose GameCube link."}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Gamecube-Link.png",alt:"Gamecube Link"})}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsx(e.li,{children:"Start the network link."}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 2: Set up Dolphin"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Set port 2 to GBA."}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Change-Port.png",alt:"Change Port"})}),`
`,n.jsx(e.h2,{children:"Step 3: Establish the connection"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"When asked by the GameCube game to activate your GBA, import the battery file."}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Import.png",alt:"Import Battery"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`If the connection fails to establish immediately, try to restart the game or retry importing the battery file. If a connection is established but an error occurs, keep on trying.
`})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"After few restarts, the connection should succeed."}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Success.png",alt:"Success"})})]})}function h(o={}){const{wrapper:e}={...i(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}function r(o,e){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,c as frontmatter};
