import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CRE-SdEk.js";var n=e(),r={title:`GBA BIOS File - What It Is and How to Extract It for Emulators`,navDrawerTitle:`GBA Bios`,description:`Learn what the GBA BIOS is, why emulators like mGBA and VBA need it, and how to legally extract it from real hardware. Step-by-step guide included.`,slug:`misc-dolphin-gba-bios`,category:`GBA Tools`,section:`tool`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`What is the GBA BIOS?`}),`
`,(0,n.jsx)(r.p,{children:`The GBA BIOS is a small file (16 KB) that contains the Game Boy Advance's built-in firmware. It handles low-level system tasks like:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Starting the game.`}),`
`,(0,n.jsx)(r.li,{children:`Running certain graphical and sound functions.`}),`
`,(0,n.jsx)(r.li,{children:`Handling save types and resets.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Many emulators need the GBA BIOS file to run games correctly. Without it, you may get errors, missing graphics, or incorrect behavior. This guide shows two legal ways to extract the GBA BIOS yourself.`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Either a 3DS with CFW (Custom Firmware) and at least 1 VC game from eShop (GB, GBC or NES).`}),`
`,(0,n.jsx)(r.li,{children:`Or a hacked Wii with a GBA to GameCube Link Cable, and a GameBoy Advance or GameBoy Advance SP.`}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`https://3ds.hacks.guide/`}),` has instructions for installing CFW.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://wii.hacks.guide/`,children:`https://wii.hacks.guide/`}),` has instructions for hacking a Wii.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Using a NES/GB/GBC VC game with a CFW 3DS`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Launch GodMode9 and press `,(0,n.jsx)(r.code,{children:`A`}),` on "SYSNAND SD".`]}),`
`,(0,n.jsxs)(r.li,{children:[`Hold `,(0,n.jsx)(r.code,{children:`R`}),` and `,(0,n.jsx)(r.code,{children:`A`}),` at the same time and press `,(0,n.jsx)(r.code,{children:`A`}),` on "Search for Titles" to see all of your titles.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Search for your NES/GB/GBC VC game (it should say .tmd at the end of the title) and press `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select "TMD files option.." then select "Build CIA (Standard)". The .CIA file should be exported to the `,(0,n.jsx)(r.code,{children:`/gm9/out/`}),` folder on your SD card.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Navigate to `,(0,n.jsx)(r.code,{children:`/gm9/out/`}),` and press `,(0,n.jsx)(r.code,{children:`A`}),` on the VC game, then select "CIA image options...".`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select "Mount image to drive" and press `,(0,n.jsx)(r.code,{children:`A`}),` on the prompt.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` on "0000.00000002", and then press `,(0,n.jsx)(r.code,{children:`A`}),` on "romfs".`]}),`
`,(0,n.jsxs)(r.li,{children:[`There should be an "agb.bin". Press `,(0,n.jsx)(r.code,{children:`A`}),` on it and select "Copy to 0:/gm9/out".`]}),`
`,(0,n.jsxs)(r.li,{children:[`Now the GBA BIOS file should be in `,(0,n.jsx)(r.code,{children:`/gm9/out`}),`. Copy this file to the computer, rename it to `,(0,n.jsx)(r.code,{children:`GBA.BIOS`}),`, and place it in the same folder as the emulator.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Using a hacked Wii`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Download the latest `,(0,n.jsx)(r.a,{href:`https://github.com/FIX94/gba-link-cable-dumper/releases`,children:`GBA Link Cable Dumper`}),`. Unzip the folder into the `,(0,n.jsx)(r.code,{children:`apps`}),` folder on the console's SD card. You should have `,(0,n.jsx)(r.code,{children:`apps/gba-gc-link-dumper/boot.dol`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Boot the console into the Homebrew Launcher and load the GBA Link Cable Dumper.`}),`
`,(0,n.jsx)(r.li,{children:`When prompted, insert the GBA to GameCube Link Cable into one of the GameCube controller slots of the Wii.`}),`
`,(0,n.jsx)(r.li,{children:`Connect the GameBoy Advance/GameBoy Advance SP and turn it on.`}),`
`,(0,n.jsxs)(r.li,{children:[`Wait for the program to load, then press `,(0,n.jsx)(r.code,{children:`Y`}),` to dump the GBA BIOS.`]}),`
`,(0,n.jsx)(r.li,{children:`Once finished, turn off the console and remove the SD card.`}),`
`,(0,n.jsxs)(r.li,{children:[`The GBA BIOS file can be found at `,(0,n.jsx)(r.code,{children:`/dumps/gba_bios.bin`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Copy this file to the computer, rename it to `,(0,n.jsx)(r.code,{children:`GBA.BIOS`}),`, and place it in the same folder as the emulator.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};