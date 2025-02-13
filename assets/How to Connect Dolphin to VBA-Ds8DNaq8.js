import{u as i,j as n}from"./index-CV0XqbBP.js";const l={title:"Connecting Dolphin to VBA",description:"RNG a Jirachi or transfer your RNGs to a GBA game",slug:"misc-dolphin-connect-vba",subCategory:"Gamecube"};function o(s){const e={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.pre,{children:n.jsx(e.code,{children:`Note: This link is very unstable. It does not work 100% of the time due to timing inconsistencies with the two emulators. Your computer's specs play a role in if/how often the connection works.
`})}),`
`,n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://sourceforge.net/projects/vbam/",children:"VBA-M"})}),`
`,n.jsxs(e.li,{children:["Dolphin 5 (other versions ",n.jsx(e.em,{children:"may"})," work, dolphin comes out with new versions multiple times a week)"]}),`
`,n.jsxs(e.li,{children:["GBA bios (",n.jsx(e.a,{href:"http://imgur.com/byn7Kfb",children:"responsible for the nintendo logo on startup screen"}),")"]}),`
`,n.jsx(e.li,{children:`Obviously a GBA and GC game that can connect
Here are the settings you'll need to change in VBA-M.`}),`
`]}),`
`,n.jsx(e.h3,{children:"Games this is compatible with"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Colosseum Bonus Disc"}),`
`,n.jsx(e.li,{children:"Pokemon Colosseum"}),`
`,n.jsx(e.li,{children:"Pokemon Channel"}),`
`,n.jsx(e.li,{children:"JPN Colosseum Bonus Disc"}),`
`,n.jsx(e.li,{children:"JPN Pokemon Colosseum"}),`
`,n.jsx(e.li,{children:"Pokemon XD Gale of Darkness"}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 1: Setup VBA"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'Go to GBA options and check "use bios file"'}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Setup.png",alt:"Setup Bios"})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"Click configure and select the bios file to be used"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Setup-2.png",alt:"Select Bios"})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"Specify gamecube link"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Gamecube-Link.png",alt:"Gamecube Link"})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"Start the network link"}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 2: Setup Dolphin"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Change port 2 to GBA"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Change-Port.png",alt:"Change Port"})}),`
`,n.jsx(e.h2,{children:"Step 3: Making the connection"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"When prompted by the gamecube game to turn on your GBA, you need to import the battery file."}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Import.png",alt:"Import Battery"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Note: If the connection isn't made immediately, you can try restarting the game or reimporting the battery file. If the connection is made but you get an error, just keep trying.
`})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"After some resetting, it will work."}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Tools-and-Emulators/VBA-to-Dolphin/Success.png",alt:"Success"})})]})}function r(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(o,{...s})}):o(s)}export{r as default,l as frontmatter};
