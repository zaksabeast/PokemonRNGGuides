import{q as i,j as e}from"./index-C7PTtfVT.js";const t={title:"Dream Radar No-Cart Patch",description:"Learn how to patch Pokémon Dream Radar on the 3DS to load saves from TWiLightMenu, nds-bootstrap, or emulators — no game cart needed.",slug:"dream-radar-patches",category:["3DS Tools","Transporter and Dream Radar"],tag:"cfw"};function r(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Cart Redirect Patch"}),`
`,e.jsx(n.p,{children:"This patch tricks Dream Radar into thinking a cartridge is inserted by loading a .sav file from the SD card instead."}),`
`,e.jsxs(n.p,{children:["It allows you to use your save from ",e.jsx(n.a,{href:"https://github.com/DS-Homebrew/TWiLightMenu",children:"TWiLightMenu"})," or ",e.jsx(n.a,{href:"https://github.com/ahezard/nds-bootstrap",children:"nds-bootstrap"}),". It also lets you use saves from an emulator without needing to inject them."]}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A 3DS with CFW (Custom Firmware)"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"Instructions for installing CFW"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Update Luma Settings"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Boot the console while holding ",e.jsx(n.code,{children:"Select"}),"."]}),`
`,e.jsx(n.li,{children:'Select "Enable game patches".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Install the Patch"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Download and unzip the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/DreamRadarCartRedirect/releases",children:"zip file"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Copy the IPS patch of your choice to the SD card."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Japanese: ",e.jsx(n.code,{children:"/luma/titles/0004000000073200"}),"."]}),`
`,e.jsxs(n.li,{children:["All Other Regions: ",e.jsx(n.code,{children:"/luma/titles/00040000000AE100"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Rename the file to ",e.jsx(n.code,{children:"code.ips"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For example, if you're playing Dream Radar, you should now have a file at ",e.jsx(n.code,{children:"/luma/titles/00040000000AE100/code.ips"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Prepare your save file"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Make sure you have a save file at ",e.jsx(n.code,{children:"/roms/nds/saves/white2.sav"}),", ",e.jsx(n.code,{children:"/roms/nds/saves/black2.sav"}),", ",e.jsx(n.code,{children:"/roms/nds/saves/black.sav"}),", or ",e.jsx(n.code,{children:"/roms/nds/saves/white.sav"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["If using TWiLightMenu, have a game file at ",e.jsx(n.code,{children:"/roms/nds/white2.nds"}),", ",e.jsx(n.code,{children:"/roms/nds/black2.nds"}),", ",e.jsx(n.code,{children:"/roms/nds/black.nds"}),", or ",e.jsx(n.code,{children:"/roms/nds/white.nds"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"If working, Dream Radar should detect the save as if a cart was inserted and allow transfers."}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.h3,{children:"Error: Cart not inserted"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Make sure your save file is named correctly and in the right location."}),`
`,e.jsx(n.li,{children:"Make sure game patching is enabled in Luma."}),`
`]})]})}function l(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{l as default,t as frontmatter};
