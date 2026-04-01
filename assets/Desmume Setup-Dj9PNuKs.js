import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-B3ekRtZG.js";var n=e(),r={title:`Desmume Setup`,description:`Learn how to set up DeSmuME for RNG, including cart dumping, save extraction, and using lua scripts.`,slug:`desmume-setup`,category:`NDS Tools`,section:`tool`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This guide helps you set up Desmume on a Windows PC. Mac and Linux users can try using Wine to run Desmume.exe, but this may not work. An updated CFW (Custom Firmware) 3DS console is needed to dump DS game data. Other methods for dumping DS games exist, but this guide won't cover them.`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download`,children:`Desmume v0.9.11`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://sourceforge.net/projects/luabinaries/files/5.1.5/Windows%20Libraries/Dynamic/lua-5.1.5_Win32_dll17_lib.zip/download`,children:`Lua dll`})}),`
`,(0,n.jsxs)(r.li,{children:[`Lua Scripts - `,(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/tree/main/Gen%204`,children:`Gen 4`}),` `,(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/tree/main/Gen%205`,children:`Gen 5`})]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`A 3DS with CFW (Custom Firmware)`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/d0k3/GodMode9/releases`,children:`Latest Godmode9`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/FlagBrew/Checkpoint/releases`,children:`Checkpoint for the 3DS`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Dumping Game Data`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Load Godmode9 by holding `,(0,n.jsx)(r.code,{children:`Start`}),` while turning on the console.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`[C:] GAMECART`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Choose the `,(0,n.jsx)(r.code,{children:`.nds`}),` file.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`Copy to 0:/gm9/out`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Exit GodMode9 and transfer the `,(0,n.jsx)(r.code,{children:`.nds`}),` file from `,(0,n.jsx)(r.code,{children:`sdmc:\\gm9\\out`}),` to your PC.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Extracting Save`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Load Checkpoint on your 3DS.`}),`
`,(0,n.jsx)(r.li,{children:`Dump the save from the DS cart.`}),`
`,(0,n.jsxs)(r.li,{children:[`The save is saved in `,(0,n.jsx)(r.code,{children:`sdmc:\\3ds\\Checkpoint\\saves`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Setting Up Desmume`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Download both Desmume and the lua dll.`}),`
`,(0,n.jsxs)(r.li,{children:[`Rename `,(0,n.jsx)(r.code,{children:`lua5.1.dll`}),` to `,(0,n.jsx)(r.code,{children:`lua51.dll`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Place the dll in the same folder as the Desmume executable.`}),`
`,(0,n.jsx)(r.li,{children:`Download the lua script for your game version.`}),`
`,(0,n.jsxs)(r.li,{children:[`Open Desmume and go to `,(0,n.jsx)(r.code,{children:`File`}),`, select `,(0,n.jsx)(r.code,{children:`Open ROM`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Open the `,(0,n.jsx)(r.code,{children:`.nds`}),` file extracted from the DS cart.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Go to `,(0,n.jsx)(r.code,{children:`Tools`}),`, select `,(0,n.jsx)(r.code,{children:`Lua Scripting`}),`, then `,(0,n.jsx)(r.code,{children:`New Lua Script Window...`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Choose the Lua Script you downloaded earlier.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Desmume should now be running with your game and displaying RNG information.`}),`
`,(0,n.jsx)(r.h2,{children:`Importing a Save`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Go to `,(0,n.jsx)(r.code,{children:`File`}),` and select `,(0,n.jsx)(r.code,{children:`Import Backup Memory...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Load the `,(0,n.jsx)(r.code,{children:`.sav`}),` file extracted from the DS cart.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Exporting a Save`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Go to `,(0,n.jsx)(r.code,{children:`File`}),` and select `,(0,n.jsx)(r.code,{children:`Export Backup Memory...`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Name your `,(0,n.jsx)(r.code,{children:`.sav`}),` file and choose where to save it.`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Everytime you restart the game, press the `,(0,n.jsx)(r.code,{children:`Restart`}),` button in the lua window.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Every time you need to save or load a state, pause the game and hold `,(0,n.jsx)(r.code,{children:`Shift + F(n)`}),` / `,(0,n.jsx)(r.code,{children:`F(n)`}),` until you see the message `,(0,n.jsx)(r.code,{children:`Saved State (n)`}),` / `,(0,n.jsx)(r.code,{children:`Loaded State (n)`}),` appearing on the lower screen for less than a second.`]}),`
`,(0,n.jsxs)(r.p,{children:[`For example, `,(0,n.jsx)(r.code,{children:`Shift + F1`}),` to save a state in slot 1 or `,(0,n.jsx)(r.code,{children:`F1`}),` to load the state in slot 1.`]}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsx)(r.h3,{children:`lua 51.dll was not found.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Tools-and-Emulators/Desmume/Lua.png`,alt:`Lua Error`})}),`
`,(0,n.jsx)(r.p,{children:`If you see an error like the one above, the lua dll may be missing. Redownload the dll and ensure it is in the same folder as the Desmume executable. Verify that the dll was renamed correctly.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};