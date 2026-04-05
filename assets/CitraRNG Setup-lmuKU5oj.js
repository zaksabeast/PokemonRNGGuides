import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CNlyG6-4.js";var n=e(),r={title:`3DS Emulator Setup (Azahar/Lime3DS/Citra)`,navDrawerTitle:`Azahar Setup`,description:`Set up Azahar, Lime3DS, or Citra for 3DS RNG, including cart dumping and installing game updates.`,slug:`citrarng-setup`,category:`3DS Tools`,section:`tool`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This guide helps you set up a 3DS emulator to RNG on a PC. You need an updated Custom Firmware 3DS console to dump the game data.`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/azahar-emu/azahar/releases/latest`,children:`Azahar`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/d0k3/GodMode9/releases`,children:`Latest GodMode9`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`A 3DS with CFW (Custom Firmware)`})}),`
`,(0,n.jsx)(r.li,{children:`Latest game update installed on the 3DS`}),`
`,(0,n.jsxs)(r.li,{children:[`(Optional) `,(0,n.jsx)(r.a,{href:`/downloads/Dump_PKMN_Updates.gm9`,children:`Dump_PKMN_Update.gm9 Script`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Dumping Game Data`}),`
`,(0,n.jsx)(r.p,{children:`Choose one of the methods below to dump your games and game updates.`}),`
`,(0,n.jsx)(r.h3,{children:`Automatic game and update dump`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Place the `,(0,n.jsx)(r.code,{children:`Dump_PKMN_Update.gm9`}),` script on your 3DS SD card in `,(0,n.jsx)(r.code,{children:`sdmc:\\gm9\\scripts`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Boot your 3ds while holding `,(0,n.jsx)(r.code,{children:`Start`}),` and launch GodMode9.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press the console's `,(0,n.jsx)(r.code,{children:`Home`}),` button to open a new menu.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Scripts...`}),` from the menu.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Dump_PKMN_Updates`}),` script and follow the on-screen directions.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Copy the files in `,(0,n.jsx)(r.code,{children:`/gm9/out`}),` to your computer.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Manually dump a physical cartridge`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`[C:] GAMECART`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select the `,(0,n.jsx)(r.code,{children:`trim.3ds`}),` file.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`NCSD image options...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Build CIA from file`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Exit GodMode9 and transfer files from `,(0,n.jsx)(r.code,{children:`sdmc:\\gm9\\out`}),` to your PC.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Game updates are only installed digitally.
`})}),`
`,(0,n.jsx)(r.h3,{children:`Manually dump a digital game and game update`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Hover over `,(0,n.jsx)(r.code,{children:`[A:] SYSNAND SD`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Hold `,(0,n.jsx)(r.code,{children:`R`}),` and press `,(0,n.jsx)(r.code,{children:`A`}),` to open the drive options.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Open title manager...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` on the game or update you want to dump.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Manage Title...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Build CIA (standard)`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Installing games on the emulator`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Run the emulator.`}),`
`,(0,n.jsxs)(r.li,{children:[`Choose `,(0,n.jsx)(r.code,{children:`File`}),`, then `,(0,n.jsx)(r.code,{children:`Install cia...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Install both the game and update `,(0,n.jsx)(r.code,{children:`.cia`}),` files.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Setting up for RNG`}),`
`,(0,n.jsxs)(r.p,{children:[`Follow the `,(0,n.jsx)(r.a,{href:`/install-pokereader-emu`,children:`install PokeReader guide`}),`.`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};