import{u as l,j as e}from"./index-Csb-3nBq.js";const o={title:"Desmume Setup",description:"Setup Desmume for RNG",slug:"desmume-setup",subCategory:"DS"};function i(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guide helps you set up Desmume on a Windows PC. Mac and Linux users can try using Wine to run Desmume.exe, but this may not work. An updated CFW (Custom Firmware) 3DS console is needed to dump DS game data. Other methods for dumping DS games exist, but this guide won't cover them."}),`
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
`,e.jsxs(n.li,{children:["A 3DS with CFW (Custom Firmware). Visit ",e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})," for CFW installation instructions."]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/d0k3/GodMode9/releases",children:"Latest Godmode9"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/FlagBrew/Checkpoint/releases",children:"Checkpoint for the 3DS"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping Game Data"}),`
`,e.jsxs(n.ol,{children:[`
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
`,e.jsxs(n.li,{children:["Download both Desmume and the lua dlls.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use either the 32-bit or the 64-bit dlls based on your Desmume version (win32 or win64)."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Place both dlls in the same folder as the Desmume executable."}),`
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
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.h3,{children:"lua 51.dll was not found."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Tools-and-Emulators/Desmume/Lua.png",alt:"Lua Error"})}),`
`,e.jsx(n.p,{children:"If you see an error like the one above, the lua dlls may be missing. Redownload the dlls and ensure they are in the same folder as the Desmume executable. Verify that the dlls match your Desmume version (32-bit or 64-bit)."})]})}function d(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{d as default,o as frontmatter};
