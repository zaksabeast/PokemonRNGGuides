import{u as l,j as e}from"./index-JGnwVbR5.js";const o={title:"Desmume Setup",description:"Setup Desmume for RNG",slug:"desmume-setup",subCategory:"DS"};function i(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guide is for setting up Desmume on a Windows PC. Mac and Linux users can try to use Wine to run the Desmume.exe, but this is not guaranteed to work. An updated CFW (Custom Firmware) 3DS console is required to be able to dump DS game data. There are other methods for dumping DS games, but this guide will not cover those."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sourceforge.net/projects/desmume/files/desmume/0.9.11/",children:"Desmume v0.9.11"})}),`
`,e.jsxs(n.li,{children:["Lua dlls",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0#",children:"64-bit"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0",children:"32-bit"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/DevonStudios/LuaScripts",children:"Lua Scripts"})}),`
`,e.jsxs(n.li,{children:["A 3DS with CFW (Custom Firmware)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})," has instructions for installing CFW"]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/d0k3/GodMode9/releases",children:"Latest Godmode9"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/FlagBrew/Checkpoint/releases",children:"Checkpoint for the 3DS"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping game data"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"[C:] GAMECART"}),"."]}),`
`,e.jsxs(n.li,{children:["Select the ",e.jsx(n.code,{children:".nds"})," file."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Copy to 0:/gm9/out"}),"."]}),`
`,e.jsxs(n.li,{children:["Exit GodMode9 and transfer the ",e.jsx(n.code,{children:".nds"})," file from ",e.jsx(n.code,{children:"sdmc:\\gm9\\out"})," to your PC."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Extracting save"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load Checkpoint on the 3DS."}),`
`,e.jsx(n.li,{children:"Dump the save from the DS cart."}),`
`,e.jsxs(n.li,{children:["The save is then stored in ",e.jsx(n.code,{children:"sdmc:\\3ds\\Checkpoint\\saves"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting up Desmume"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download both Desmume and the lua dlls.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You'll need either the 32-bit or the 64-bit dlls depending on which Desmume version you have (win32 or win64)."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Place both dlls into the same folder as the Desmume executable."}),`
`,e.jsx(n.li,{children:"Download the lua script for your game version."}),`
`,e.jsxs(n.li,{children:["Open Desmume, then under ",e.jsx(n.code,{children:"File"})," choose ",e.jsx(n.code,{children:"Open ROM"}),"."]}),`
`,e.jsxs(n.li,{children:["Open the ",e.jsx(n.code,{children:".nds"})," file extracted from the DS cart."]}),`
`,e.jsxs(n.li,{children:["Under ",e.jsx(n.code,{children:"Tools"})," choose ",e.jsx(n.code,{children:"Lua Scripting"}),", then ",e.jsx(n.code,{children:"New Lua Script Window..."}),"."]}),`
`,e.jsx(n.li,{children:"Choose the Lua Script downloaded earlier."}),`
`]}),`
`,e.jsx(n.p,{children:"Desmume should now be running with the game of your choosing, with an overlay displaying RNG information."}),`
`,e.jsx(n.h2,{children:"Importing a save"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Under ",e.jsx(n.code,{children:"File"})," choose ",e.jsx(n.code,{children:"Import Backup Memory..."}),"."]}),`
`,e.jsxs(n.li,{children:["Load the ",e.jsx(n.code,{children:".sav"})," extracted from the DS cart."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Exporting a save"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Under ",e.jsx(n.code,{children:"File"})," choose ",e.jsx(n.code,{children:"Export Backup Memory..."}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:".sav"})," can be named and saved where you want it."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.h3,{children:"lua 51.dll was not found."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/Desmume/Lua.png",alt:"Lua Error"})}),`
`,e.jsx(n.p,{children:"If you receive a similar error to the one above, the lua dlls are missing. Redownload the dlls and make sure they are placed into the same folder as the Desmume executable. Also, verify that the dlls match the version of Desmume you are using (32-bit or 64-bit)."})]})}function d(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{d as default,o as frontmatter};
