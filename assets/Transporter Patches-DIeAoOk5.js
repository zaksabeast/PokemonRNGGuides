import{u as o,j as e}from"./index-BHR8omI6.js";const t={title:"Transporter Patches",description:"Collection of patches to modify or enhance Pokémon Transporter functionality.",slug:"transporter-patches",category:"3DS Tools",tag:"cfw"};function r(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
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
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/Transporter-Offline-Patch/releases",children:"code.ips file"})," and copy it to the SD card at ",e.jsx(n.code,{children:"/luma/titles/00040000000C9C00/code.ips"}),"."]}),`
`,e.jsxs(n.li,{children:['Open PKSM, enable "Edit during transfers", and create a new bank named ',e.jsx(n.code,{children:"transport"}),"."]}),`
`,e.jsx(n.li,{children:"Transfer Pokémon using Transporter."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: For more info, visit the [PKSM wiki](https://github.com/FlagBrew/PKSM/wiki/Storage).
`})}),`
`,e.jsx(n.h3,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:'Q: Why does Transporter show, "At least one Pokémon remains in the Transport Box from your previous session"?'}),`
`,e.jsx(n.p,{children:"A: This may happen if:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You don't have a PKSM bank named ",e.jsx(n.code,{children:"transport"}),"."]}),`
`,e.jsxs(n.li,{children:["You have Pokémon in Box 1 of your PKSM ",e.jsx(n.code,{children:"transport"})," bank."]}),`
`,e.jsxs(n.li,{children:["Your PKSM ",e.jsx(n.code,{children:"transport"})," bank is invalid."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Cart Redirect Patch"}),`
`,e.jsx(n.p,{children:"This patch redirects Transporter and Dream Radar to use a .sav file on the SD card instead of a game cartridge. It lets you use saves from an emulator without needing to inject them."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download and unzip the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/DreamRadarCartRedirect/releases",children:"zip file"}),"."]}),`
`,e.jsx(n.li,{children:"Copy the IPS patch of your choice to the SD card."}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Pokémon Transporter: ",e.jsx(n.code,{children:"/luma/titles/00040000000C9C00/code.ips"}),"."]}),`
`,e.jsxs(n.li,{children:["For Japanese Pokémon Dream Radar: ",e.jsx(n.code,{children:"/luma/titles/0004000000073200/code.ips"}),"."]}),`
`,e.jsxs(n.li,{children:["For All Regions Pokémon Dream Radar: ",e.jsx(n.code,{children:"/luma/titles/00040000000AE100/code.ips"}),"."]}),`
`]}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Make sure you have a save file at ",e.jsx(n.code,{children:"/roms/nds/saves/white2.sav"}),", ",e.jsx(n.code,{children:"/roms/nds/saves/black2.sav"}),", ",e.jsx(n.code,{children:"/roms/nds/saves/black.sav"}),", or ",e.jsx(n.code,{children:"/roms/nds/saves/white.sav"}),"."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: If using [TWiLightMenu](https://github.com/DS-Homebrew/TWiLightMenu), have a game file at `/roms/nds/white2.nds`, `/roms/nds/black2.nds`, `/roms/nds/black.nds`, or `/roms/nds/white.nds`.\n"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Black and White are only supported by Transporter.
`})})]})}function a(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{a as default,t as frontmatter};
