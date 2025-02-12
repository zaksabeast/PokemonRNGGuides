import{u as i,j as e}from"./index-DEKSk6E2.js";const t={title:"Transporter Patches",description:"Various patches for use with Transporter",slug:"transporter-patches",subCategory:"3DS"};function r(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with CFW (Custom Firmware)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"Instructions for installing CFW"}),"."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Update Luma Settings"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Boot the console while holding ",e.jsx(n.code,{children:"Select"}),"."]}),`
`,e.jsx(n.li,{children:'Select "Enable game patches".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Offline Patch + PKSM Patch"}),`
`,e.jsx(n.p,{children:"This patch enables the use of Transporter offline and ensures a stable delay when RNGing Pokémon transferred from VC games. PKSM is required as a destination for the transferred Pokémon."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Download the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/Transporter-Offline-Patch/releases",children:"code.ips file"})," and copy it to the SD card at ",e.jsx(n.code,{children:"/luma/titles/00040000000C9C00/code.ips"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:['Open PKSM, enable "Edit during transfers", and create a new bank named ',e.jsx(n.code,{children:"transport"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For more information, refer to the ",e.jsx(n.a,{href:"https://github.com/FlagBrew/PKSM/wiki/Storage",children:"PKSM wiki"}),"."]}),`
`]}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Transfer Pokemon using Transporter."}),`
`]}),`
`,e.jsx(n.h3,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:'Q: Why does Transporter display the message, "At least one Pokemon remains in the Transport Box from your previous session"?'}),`
`,e.jsx(n.p,{children:"A: This issue can be caused by the following:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You don't have a PKSM bank named ",e.jsx(n.code,{children:"transport"})]}),`
`,e.jsxs(n.li,{children:["You have Pokemon in Box 1 of your PKSM ",e.jsx(n.code,{children:"transport"})," bank"]}),`
`,e.jsxs(n.li,{children:["Your PKSM ",e.jsx(n.code,{children:"transport"})," bank is invalid"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Cart Redirect Patch"}),`
`,e.jsx(n.p,{children:"This patch redirects Transporter and Dream Radar to use a .sav file on the SD card instead of a game cartridge. It allows the use of saves from an emulator without the need to inject them into a cartridge."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download and unzip the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/DreamRadarCartRedirect/releases",children:"zip file"}),"."]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The zip contains ",e.jsx(n.code,{children:"radar"})," and ",e.jsx(n.code,{children:"transporter"})," folders with patches for the supported games."]}),`
`]}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Copy the IPS patch of your choice to the SD card."}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Pokemon Transporter: ",e.jsx(n.code,{children:"/luma/titles/00040000000C9C00/code.ips"}),"."]}),`
`,e.jsxs(n.li,{children:["For Japanese Pokemon Dream Radar: ",e.jsx(n.code,{children:"/luma/titles/0004000000073200/code.ips"}),"."]}),`
`,e.jsxs(n.li,{children:["For All Regions Pokemon Dream Radar: ",e.jsx(n.code,{children:"/luma/titles/00040000000AE100/code.ips"}),"."]}),`
`]}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Ensure you have a save file at ",e.jsx(n.code,{children:"/roms/nds/saves/white2.sav"}),", ",e.jsx(n.code,{children:"/roms/nds/saves/black2.sav"}),", ",e.jsx(n.code,{children:"/roms/nds/saves/black.sav"}),", or ",e.jsx(n.code,{children:"/roms/nds/saves/white.sav"}),"."]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you're using ",e.jsx(n.a,{href:"https://github.com/DS-Homebrew/TWiLightMenu",children:"TWiLightMenu"}),", this means having a game file at ",e.jsx(n.code,{children:"/roms/nds/white2.nds"}),", ",e.jsx(n.code,{children:"/roms/nds/black2.nds"}),", ",e.jsx(n.code,{children:"/roms/nds/black.nds"}),", or ",e.jsx(n.code,{children:"/roms/nds/white.nds"}),"."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Black and White are only supported by Transporter.
`})})]})}function a(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{a as default,t as frontmatter};
