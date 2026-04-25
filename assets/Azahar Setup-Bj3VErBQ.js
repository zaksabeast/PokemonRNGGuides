import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-BhGva7Hs.js";var n=e(),r={title:`Azahar Setup - Install Pokemon CIAs`,navDrawerTitle:`Azahar Setup`,description:`Learn how to dump and install Pokemon CIAs on Azahar.`,slug:`azahar-setup`,category:`3DS Tools`,section:`tool`,hideFromNavDrawer:!0};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This guide helps you install Pokemon CIAs on Azahar. You need an updated Custom Firmware 3DS console to dump the CIA from a cartridge or digitally purchased game.`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/azahar-emu/azahar/releases/latest`,children:`Azahar`})}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`For dumping the CIA:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`A 3DS with CFW (Custom Firmware)`}),` and the `,(0,n.jsx)(r.a,{href:`https://github.com/d0k3/GodMode9/releases`,children:`latest GodMode9`})]}),`
`,(0,n.jsx)(r.li,{children:`Latest game update installed on the 3DS`}),`
`,(0,n.jsxs)(r.li,{children:[`(Optional) `,(0,n.jsx)(r.a,{href:`/downloads/Dump_PKMN_Updates.gm9`,children:`Dump_PKMN_Update.gm9 Script`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Dumping Game Data`}),`
`,(0,n.jsx)(r.p,{children:`Choose one of the methods below to dump your games and game updates.`}),`
`,(0,n.jsxs)(`details`,{children:[(0,n.jsx)(`summary`,{children:(0,n.jsx)(`b`,{children:`Automatic Pokemon game and update dumping`})}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Place the `,(0,n.jsx)(r.code,{children:`Dump_PKMN_Update.gm9`}),` script on your 3DS SD card in `,(0,n.jsx)(r.code,{children:`sdmc:\\gm9\\scripts`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Boot your 3ds while holding `,(0,n.jsx)(r.code,{children:`Start`}),` and launch GodMode9.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press the console's `,(0,n.jsx)(r.code,{children:`Home`}),` button to open a new menu.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Scripts...`}),` from the menu.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Dump_PKMN_Updates`}),` script and follow the on-screen directions.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Exit GodMode9 and copy the files in `,(0,n.jsx)(r.code,{children:`/gm9/out`}),` to your computer.`]}),`
`]})]}),`
`,(0,n.jsxs)(`details`,{children:[(0,n.jsx)(`summary`,{children:(0,n.jsx)(`b`,{children:`Manually dump a physical cartridge`})}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`[C:] GAMECART`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select the `,(0,n.jsx)(r.code,{children:`trim.3ds`}),` file.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`NCSD image options...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Build CIA from file`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Exit GodMode9 and transfer files from `,(0,n.jsx)(r.code,{children:`/gm9/out`}),` to your computer.`]}),`
`]}),(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Game updates are only installed digitally.
`})})]}),`
`,(0,n.jsxs)(`details`,{children:[(0,n.jsx)(`summary`,{children:(0,n.jsx)(`b`,{children:`Manually dump a digital game`})}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Hover over `,(0,n.jsx)(r.code,{children:`[A:] SYSNAND SD`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Hold `,(0,n.jsx)(r.code,{children:`R`}),` and press `,(0,n.jsx)(r.code,{children:`A`}),` to open the drive options.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Open title manager...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` on the game or update you want to dump.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Manage Title...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Build CIA (standard)`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Exit GodMode9 and copy the files in `,(0,n.jsx)(r.code,{children:`/gm9/out`}),` to your computer.`]}),`
`]})]}),`
`,(0,n.jsxs)(`details`,{children:[(0,n.jsx)(`summary`,{children:(0,n.jsx)(`b`,{children:`Manually dump a game update`})}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Hover over `,(0,n.jsx)(r.code,{children:`[A:] SYSNAND SD`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Hold `,(0,n.jsx)(r.code,{children:`R`}),` and press `,(0,n.jsx)(r.code,{children:`A`}),` to open the drive options.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Select `,(0,n.jsx)(r.code,{children:`Open title manager...`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` on the game or update you want to dump.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Select `,(0,n.jsx)(r.code,{children:`Manage Title...`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Select `,(0,n.jsx)(r.code,{children:`Build CIA (standard)`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Exit GodMode9 and copy the files in `,(0,n.jsx)(r.code,{children:`/gm9/out`}),` to your computer.`]}),`
`]}),`
`]})]}),`
`,(0,n.jsx)(r.h2,{children:`Installing games on Azahar Desktop`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Run the emulator.`}),`
`,(0,n.jsxs)(r.li,{children:[`Choose `,(0,n.jsx)(r.code,{children:`File`}),`, then `,(0,n.jsx)(r.code,{children:`Install cia...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Install both the game and update `,(0,n.jsx)(r.code,{children:`.cia`}),` files.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Installing games on Azahar Mobile`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open the emulator.`}),`
`,(0,n.jsx)(r.li,{children:`Tap on the three dots in the bottom right.`}),`
`,(0,n.jsxs)(r.li,{children:[`Choose `,(0,n.jsx)(r.code,{children:`Install CIA file`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Install both the game and update `,(0,n.jsx)(r.code,{children:`.cia`}),` files.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Setting up for RNG`}),`
`,(0,n.jsxs)(r.p,{children:[`If you are interested in using Azahar for RNGing in the Pokemon games, follow the `,(0,n.jsx)(r.a,{href:`/install-pokereader-emu`,children:`install PokeReader guide`}),` to set up a useful tool for RNG.`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};