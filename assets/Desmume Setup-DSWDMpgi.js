import{u as l,j as e}from"./index-Df4k8dKg.js";const d={title:"Desmume Setup",description:"Setup Desmume for RNG",slug:"desmume-setup",category:"NDS Tools",tag:"emu"};function i(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guide helps you set up Desmume on a Windows PC. Mac and Linux users can try using Wine to run Desmume.exe, but this may not work. An updated CFW (Custom Firmware) 3DS console is needed to dump DS game data. Other methods for dumping DS games exist, but this guide won't cover them."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download",children:"Desmume v0.9.11"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sourceforge.net/projects/luabinaries/files/5.1.5/Windows%20Libraries/Dynamic/lua-5.1.5_Win32_dll17_lib.zip/download",children:"Lua dll"})}),`
`,e.jsxs(n.li,{children:["Lua Scripts - ",e.jsx(n.a,{href:"https://github.com/Real96/PokeLua/tree/main/Gen%204",children:"Gen 4"})," ",e.jsx(n.a,{href:"https://github.com/Real96/PokeLua/tree/main/Gen%205",children:"Gen 5"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"A 3DS with CFW (Custom Firmware)"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/d0k3/GodMode9/releases",children:"Latest Godmode9"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/FlagBrew/Checkpoint/releases",children:"Checkpoint for the 3DS"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping Game Data"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Load Godmode9 by holding ",e.jsx(n.code,{children:"Start"})," while turning on the console."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"[C:] GAMECART"}),"."]}),`
`,e.jsxs(n.li,{children:["Choose the ",e.jsx(n.code,{children:".nds"})," file."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Copy to 0:/gm9/out"}),"."]}),`
`,e.jsxs(n.li,{children:["Exit GodMode9 and transfer the ",e.jsx(n.code,{children:".nds"})," file from ",e.jsx(n.code,{children:"sdmc:\\gm9\\out"})," to your PC."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Extracting Save"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load Checkpoint on your 3DS."}),`
`,e.jsx(n.li,{children:"Dump the save from the DS cart."}),`
`,e.jsxs(n.li,{children:["The save is saved in ",e.jsx(n.code,{children:"sdmc:\\3ds\\Checkpoint\\saves"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting Up Desmume"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Download both Desmume and the lua dll."}),`
`,e.jsxs(n.li,{children:["Rename ",e.jsx(n.code,{children:"lua5.1.dll"})," to ",e.jsx(n.code,{children:"lua51.dll"}),"."]}),`
`,e.jsx(n.li,{children:"Place the dll in the same folder as the Desmume executable."}),`
`,e.jsx(n.li,{children:"Download the lua script for your game version."}),`
`,e.jsxs(n.li,{children:["Open Desmume and go to ",e.jsx(n.code,{children:"File"}),", select ",e.jsx(n.code,{children:"Open ROM"}),"."]}),`
`,e.jsxs(n.li,{children:["Open the ",e.jsx(n.code,{children:".nds"})," file extracted from the DS cart."]}),`
`,e.jsxs(n.li,{children:["Go to ",e.jsx(n.code,{children:"Tools"}),", select ",e.jsx(n.code,{children:"Lua Scripting"}),", then ",e.jsx(n.code,{children:"New Lua Script Window..."}),"."]}),`
`,e.jsx(n.li,{children:"Choose the Lua Script you downloaded earlier."}),`
`]}),`
`,e.jsx(n.p,{children:"Desmume should now be running with your game and displaying RNG information."}),`
`,e.jsx(n.h2,{children:"Importing a Save"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go to ",e.jsx(n.code,{children:"File"})," and select ",e.jsx(n.code,{children:"Import Backup Memory..."}),"."]}),`
`,e.jsxs(n.li,{children:["Load the ",e.jsx(n.code,{children:".sav"})," file extracted from the DS cart."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Exporting a Save"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go to ",e.jsx(n.code,{children:"File"})," and select ",e.jsx(n.code,{children:"Export Backup Memory..."}),"."]}),`
`,e.jsxs(n.li,{children:["Name your ",e.jsx(n.code,{children:".sav"})," file and choose where to save it."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Everytime you restart the game, press the ",e.jsx(n.code,{children:"Restart"})," button in the lua window."]}),`
`,e.jsxs(n.p,{children:["Every time you need to save or load a state, pause the game and hold ",e.jsx(n.code,{children:"Shift + F(n)"})," / ",e.jsx(n.code,{children:"F(n)"})," until you see the message ",e.jsx(n.code,{children:"Saved State (n)"})," / ",e.jsx(n.code,{children:"Loaded State (n)"})," appearing on the lower screen for less than a second."]}),`
`,e.jsxs(n.p,{children:["For example, ",e.jsx(n.code,{children:"Shift + F1"})," to save a state in slot 1 or ",e.jsx(n.code,{children:"F1"})," to load the state in slot 1."]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.h3,{children:"lua 51.dll was not found."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/Desmume/Lua.png",alt:"Lua Error"})}),`
`,e.jsx(n.p,{children:"If you see an error like the one above, the lua dll may be missing. Redownload the dll and ensure it is in the same folder as the Desmume executable. Verify that the dll was renamed correctly."})]})}function r(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{r as default,d as frontmatter};
