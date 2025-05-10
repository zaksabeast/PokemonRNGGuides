import{u as i,j as e}from"./index-kx7X6zXu.js";const t={title:"Pokemon Transporter Offline & Save Patches",navDrawerTitle:"Transporter Patches",description:"Learn how to patch Pokémon Transporter to work offline and load emulator or TWiLightMenu saves from the SD card.",slug:"transporter-patches",category:"3DS Tools",tag:"cfw"};function r(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A 3DS with CFW (Custom Firmware)"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"Instructions for installing CFW"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Update Luma Settings"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Boot the console while holding ",e.jsx(n.code,{children:"Select"}),"."]}),`
`,e.jsx(n.li,{children:'Select "Enable game patches".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Offline Patch + PKSM Patch"}),`
`,e.jsx(n.p,{children:"This patch lets you use Transporter offline and keeps a stable delay for RNGing Pokémon from VC games. PKSM is needed as a destination for the transferred Pokémon."}),`
`,e.jsx(n.h3,{children:"Install the patch"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/Transporter-Offline-Patch/releases",children:"code.ips file"})," for Transporter."]}),`
`,e.jsxs(n.li,{children:["Copy the file to:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"/luma/titles/00040000000C9C00/code.ips"}),"."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{children:"Set up PKSM"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PKSM and go to storage."}),`
`,e.jsx(n.li,{children:'Enable "Edit during transfers" in the settings.'}),`
`,e.jsxs(n.li,{children:["Create a new bank named ",e.jsx(n.code,{children:"transport"}),"."]}),`
`,e.jsx(n.li,{children:"Transfer Pokémon using Transporter."}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For more info, visit the ",e.jsx(n.a,{href:"https://github.com/FlagBrew/PKSM/wiki/Storage",children:"PKSM wiki"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:'Q: Why does Transporter show, "At least one Pokémon remains in the Transport Box from your previous session"?'}),`
`,e.jsx(n.p,{children:"A: This may happen if:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You don't have a PKSM bank named ",e.jsx(n.code,{children:"transport"}),"."]}),`
`,e.jsxs(n.li,{children:["You have Pokémon in Box 1 of your PKSM ",e.jsx(n.code,{children:"transport"})," bank."]}),`
`,e.jsxs(n.li,{children:["Your PKSM ",e.jsx(n.code,{children:"transport"})," bank is invalid."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Cart Redirect Patch"}),`
`,e.jsx(n.p,{children:"This patch tricks Transporter into thinking a cartridge is inserted by loading a .sav file from the SD card instead."}),`
`,e.jsxs(n.p,{children:["It allows you to use your save from ",e.jsx(n.a,{href:"https://github.com/DS-Homebrew/TWiLightMenu",children:"TWiLightMenu"})," or ",e.jsx(n.a,{href:"https://github.com/ahezard/nds-bootstrap",children:"nds-bootstrap"}),". It also lets you use saves from an emulator without needing to inject them."]}),`
`,e.jsx(n.h3,{children:"Install the patch"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download and unzip the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/DreamRadarCartRedirect/releases",children:"zip file"}),"."]}),`
`,e.jsxs(n.li,{children:["Copy the IPS patch for Transporter to:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"/luma/titles/00040000000C9C00/code.ips"}),"."]}),`
`]}),`
`]}),`
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
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Black and White are only supported by Transporter.
`})})]})}function l(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{l as default,t as frontmatter};
