import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-5uoNgSDO.js";var n=e(),r={title:`Pokemon Transporter Offline & Save Patches`,navDrawerTitle:`Transporter Patches`,description:`Learn how to patch Pokémon Transporter to work offline and load emulator or TWiLightMenu saves from the SD card.`,slug:`transporter-patches`,category:`Transporter and Dream Radar`,section:`patch`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`A 3DS with CFW (Custom Firmware)`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`Instructions for installing CFW`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Update Luma Settings`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Boot the console while holding `,(0,n.jsx)(r.code,{children:`Select`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Select "Enable game patches".`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Offline Patch + PKSM Patch`}),`
`,(0,n.jsx)(r.p,{children:`This patch lets you use Transporter offline and keeps a stable delay for RNGing Pokémon from VC games. PKSM is needed as a destination for the transferred Pokémon.`}),`
`,(0,n.jsx)(r.h3,{children:`Install the patch`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Download the `,(0,n.jsx)(r.a,{href:`https://github.com/zaksabeast/Transporter-Offline-Patch/releases`,children:`code.ips file`}),` for Transporter.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Copy the file to:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`/luma/titles/00040000000C9C00/code.ips`}),`.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Set up PKSM`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PKSM and go to storage.`}),`
`,(0,n.jsx)(r.li,{children:`Enable "Edit during transfers" in the settings.`}),`
`,(0,n.jsxs)(r.li,{children:[`Create a new bank named `,(0,n.jsx)(r.code,{children:`transport`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Transfer Pokémon using Transporter.`}),`
`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For more info, visit the `,(0,n.jsx)(r.a,{href:`https://github.com/FlagBrew/PKSM/wiki/Storage`,children:`PKSM wiki`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Troubleshooting`}),`
`,(0,n.jsx)(r.p,{children:`Q: Why does Transporter show, "At least one Pokémon remains in the Transport Box from your previous session"?`}),`
`,(0,n.jsx)(r.p,{children:`A: This may happen if:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`You don't have a PKSM bank named `,(0,n.jsx)(r.code,{children:`transport`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`You have Pokémon in Box 1 of your PKSM `,(0,n.jsx)(r.code,{children:`transport`}),` bank.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Your PKSM `,(0,n.jsx)(r.code,{children:`transport`}),` bank is invalid.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Cart Redirect Patch`}),`
`,(0,n.jsx)(r.p,{children:`This patch tricks Transporter into thinking a cartridge is inserted by loading a .sav file from the SD card instead.`}),`
`,(0,n.jsxs)(r.p,{children:[`It allows you to use your save from `,(0,n.jsx)(r.a,{href:`https://github.com/DS-Homebrew/TWiLightMenu`,children:`TWiLightMenu`}),` or `,(0,n.jsx)(r.a,{href:`https://github.com/ahezard/nds-bootstrap`,children:`nds-bootstrap`}),`. It also lets you use saves from an emulator without needing to inject them.`]}),`
`,(0,n.jsx)(r.h3,{children:`Install the patch`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Download and unzip the `,(0,n.jsx)(r.a,{href:`https://github.com/zaksabeast/DreamRadarCartRedirect/releases`,children:`zip file`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Copy the IPS patch for Transporter to:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`/luma/titles/00040000000C9C00/code.ips`}),`.`]}),`
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
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Black and White are only supported by Transporter.
`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};