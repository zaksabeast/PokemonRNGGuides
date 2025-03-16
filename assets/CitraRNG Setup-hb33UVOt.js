import{u as d,j as e}from"./index-C9L5QNiH.js";const t={title:"3DS Emulator Setup (Azahar/Lime3DS/Citra)",description:"Setup a 3DS emulator for RNG",slug:"citrarng-setup",subCategory:"3DS",tag:"emu"};function l(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...d(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guide helps you set up a 3DS emulator to RNG on a PC. You need an updated Custom Firmware 3DS console to dump the game data."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Lime3DS/lime3ds-archive/releases/",children:"Lime3DS"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/d0k3/GodMode9/releases",children:"Latest GodMode9"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"A 3DS with CFW (Custom Firmware)"})}),`
`,e.jsx(n.li,{children:"Latest game update installed on the 3DS"}),`
`,e.jsxs(n.li,{children:["(Optional) ",e.jsx(n.a,{href:"/downloads/Dump_PKMN_Updates.gm9",children:"Dump_PKMN_Update.gm9 Script"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping Game Data"}),`
`,e.jsx(n.p,{children:"Choose one of the methods below to dump your games and game updates."}),`
`,e.jsx(n.h3,{children:"Automatic game and update dump"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Place the ",e.jsx(n.code,{children:"Dump_PKMN_Update.gm9"})," script on your 3DS SD card in ",e.jsx(n.code,{children:"sdmc:\\gm9\\scripts"}),"."]}),`
`,e.jsxs(n.li,{children:["Boot your 3ds while holding ",e.jsx(n.code,{children:"Start"})," and launch GodMode9."]}),`
`,e.jsxs(n.li,{children:["Press the console's ",e.jsx(n.code,{children:"Home"})," button to open a new menu."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Scripts..."})," from the menu."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Dump_PKMN_Updates"})," script and follow the on-screen directions."]}),`
`,e.jsxs(n.li,{children:["Copy the files in ",e.jsx(n.code,{children:"/gm9/out"})," to your computer."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Manually dump a physical cartridge"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"[C:] GAMECART"}),"."]}),`
`,e.jsxs(n.li,{children:["Select the ",e.jsx(n.code,{children:"trim.3ds"})," file."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"NCSD image options..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Build CIA from file"}),"."]}),`
`,e.jsxs(n.li,{children:["Exit GodMode9 and transfer files from ",e.jsx(n.code,{children:"sdmc:\\gm9\\out"})," to your PC."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Game updates are only installed digitally.
`})}),`
`,e.jsx(n.h3,{children:"Manually dump a digital game and game update"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Hover over ",e.jsx(n.code,{children:"[A:] SYSNAND SD"}),"."]}),`
`,e.jsxs(n.li,{children:["Hold ",e.jsx(n.code,{children:"R"})," and press ",e.jsx(n.code,{children:"A"})," to open the drive options."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Open title manager..."}),"."]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," on the game or update you want to dump."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Manage Title..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Build CIA (standard)"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Installing games on the emulator"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Run the emulator."}),`
`,e.jsxs(n.li,{children:["Choose ",e.jsx(n.code,{children:"File"}),", then ",e.jsx(n.code,{children:"Install cia..."}),"."]}),`
`,e.jsxs(n.li,{children:["Install both the game and update ",e.jsx(n.code,{children:".cia"})," files."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting up for RNG"}),`
`,e.jsxs(n.p,{children:["Follow the ",e.jsx(n.a,{href:"https://www.pokemonrng.com/install-pokereader",children:"install PokeReader guide"}),"."]})]})}function r(s={}){const{wrapper:n}={...d(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(l,{...s})}):l(s)}export{r as default,t as frontmatter};
