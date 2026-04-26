import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-B5eGYVya.js";var n=e(),r={title:`Dream Radar No-Cart Patch`,description:`Learn how to patch Pokémon Dream Radar on the 3DS to load saves from TWiLightMenu, nds-bootstrap, or emulators — no game cart needed.`,slug:`dream-radar-patches`,category:`Transporter and Dream Radar`,section:`patch`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Cart Redirect Patch`}),`
`,(0,n.jsx)(r.p,{children:`This patch tricks Dream Radar into thinking a cartridge is inserted by loading a .sav file from the SD card instead.`}),`
`,(0,n.jsxs)(r.p,{children:[`It allows you to use your save from `,(0,n.jsx)(r.a,{href:`https://github.com/DS-Homebrew/TWiLightMenu`,children:`TWiLightMenu`}),` or `,(0,n.jsx)(r.a,{href:`https://github.com/ahezard/nds-bootstrap`,children:`nds-bootstrap`}),`. It also lets you use saves from an emulator without needing to inject them.`]}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`A 3DS with CFW (Custom Firmware)`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`Instructions for installing CFW`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Update Luma Settings`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Boot the console while holding `,(0,n.jsx)(r.code,{children:`Select`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Select "Enable game patches".`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Install the Patch`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Download and unzip the `,(0,n.jsx)(r.a,{href:`https://github.com/zaksabeast/DreamRadarCartRedirect/releases`,children:`zip file`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Copy the IPS patch of your choice to the SD card.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Japanese: `,(0,n.jsx)(r.code,{children:`/luma/titles/0004000000073200`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`All Other Regions: `,(0,n.jsx)(r.code,{children:`/luma/titles/00040000000AE100`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Rename the file to `,(0,n.jsx)(r.code,{children:`code.ips`}),`.`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For example, if you're playing Dream Radar, you should now have a file at `,(0,n.jsx)(r.code,{children:`/luma/titles/00040000000AE100/code.ips`}),`.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Prepare your save file`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Make sure you have a save file at `,(0,n.jsx)(r.code,{children:`/roms/nds/saves/white2.sav`}),`, `,(0,n.jsx)(r.code,{children:`/roms/nds/saves/black2.sav`}),`, `,(0,n.jsx)(r.code,{children:`/roms/nds/saves/black.sav`}),`, or `,(0,n.jsx)(r.code,{children:`/roms/nds/saves/white.sav`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`If using TWiLightMenu, have a game file at `,(0,n.jsx)(r.code,{children:`/roms/nds/white2.nds`}),`, `,(0,n.jsx)(r.code,{children:`/roms/nds/black2.nds`}),`, `,(0,n.jsx)(r.code,{children:`/roms/nds/black.nds`}),`, or `,(0,n.jsx)(r.code,{children:`/roms/nds/white.nds`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`If working, Dream Radar should detect the save as if a cart was inserted and allow transfers.`}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsx)(r.h3,{children:`Error: Cart not inserted`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Make sure your save file is named correctly and in the right location.`}),`
`,(0,n.jsx)(r.li,{children:`Make sure game patching is enabled in Luma.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};