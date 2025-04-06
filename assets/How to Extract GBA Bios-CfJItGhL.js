import{u as t,j as e}from"./index-BDZjbtGI.js";const l={title:"How to extract GBA BIOS",description:"Guide to extracting the GBA BIOS file for use on emulators",slug:"misc-dolphin-gba-bios",subCategory:"GBA",tag:"cfw"};function s(o){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"Some games need a GBA BIOS file to load on emulators. If you see an error about the BIOS, you need a GBA BIOS to load that game. This guide has two methods for extracting the GBA BIOS file yourself."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Either a 3DS with CFW (Custom Firmware) and at least 1 VC game from eShop (GB, GBC or NES)."}),`
`,e.jsx(n.li,{children:"Or a hacked Wii with a GBA to GameCube Link Cable, and a GameBoy Advance or GameBoy Advance SP."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})," has instructions for installing CFW."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://wii.hacks.guide/",children:"https://wii.hacks.guide/"})," has instructions for hacking a Wii."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Using a NES/GB/GBC VC game with a CFW 3DS"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Launch GodMode9 and press ",e.jsx(n.code,{children:"A"}),' on "SYSNAND SD".']}),`
`,e.jsxs(n.li,{children:["Hold ",e.jsx(n.code,{children:"R"})," and ",e.jsx(n.code,{children:"A"})," at the same time and press ",e.jsx(n.code,{children:"A"}),' on "Search for Titles" to see all of your titles.']}),`
`,e.jsxs(n.li,{children:["Search for your NES/GB/GBC VC game (it should say .tmd at the end of the title) and press ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsxs(n.li,{children:['Select "TMD files option.." then select "Build CIA (Standard)". The .CIA file should be exported to the ',e.jsx(n.code,{children:"/gm9/out/"})," folder on your SD card."]}),`
`,e.jsxs(n.li,{children:["Navigate to ",e.jsx(n.code,{children:"/gm9/out/"})," and press ",e.jsx(n.code,{children:"A"}),' on the VC game, then select "CIA image options...".']}),`
`,e.jsxs(n.li,{children:['Select "Mount image to drive" and press ',e.jsx(n.code,{children:"A"})," on the prompt."]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"}),' on "0000.00000002", and then press ',e.jsx(n.code,{children:"A"}),' on "romfs".']}),`
`,e.jsxs(n.li,{children:['There should be an "agb.bin". Press ',e.jsx(n.code,{children:"A"}),' on it and select "Copy to 0:/gm9/out".']}),`
`,e.jsxs(n.li,{children:["Now the GBA BIOS file should be in ",e.jsx(n.code,{children:"/gm9/out"}),". Copy this file to the computer, rename it to ",e.jsx(n.code,{children:"GBA.BIOS"}),", and place it in the same folder as the emulator."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Using a hacked Wii"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download the latest ",e.jsx(n.a,{href:"https://github.com/FIX94/gba-link-cable-dumper/releases",children:"GBA Link Cable Dumper"}),". Unzip the folder into the ",e.jsx(n.code,{children:"apps"})," folder on the console's SD card. You should have ",e.jsx(n.code,{children:"apps/gba-gc-link-dumper/boot.dol"}),"."]}),`
`,e.jsx(n.li,{children:"Boot the console into the Homebrew Launcher and load the GBA Link Cable Dumper."}),`
`,e.jsx(n.li,{children:"When prompted, insert the GBA to GameCube Link Cable into one of the GameCube controller slots of the Wii."}),`
`,e.jsx(n.li,{children:"Connect the GameBoy Advance/GameBoy Advance SP and turn it on."}),`
`,e.jsxs(n.li,{children:["Wait for the program to load, then press ",e.jsx(n.code,{children:"Y"})," to dump the GBA BIOS."]}),`
`,e.jsx(n.li,{children:"Once finished, turn off the console and remove the SD card."}),`
`,e.jsxs(n.li,{children:["The GBA BIOS file can be found at ",e.jsx(n.code,{children:"/dumps/gba_bios.bin"}),"."]}),`
`,e.jsxs(n.li,{children:["Copy this file to the computer, rename it to ",e.jsx(n.code,{children:"GBA.BIOS"}),", and place it in the same folder as the emulator."]}),`
`]})]})}function d(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{d as default,l as frontmatter};
