import{q as t,j as e}from"./index-Btqx30RV.js";const l={title:"Remove Time Penalties in Omega Ruby and Alpha Sapphire",navDrawerTitle:"Remove Time Penalties",description:"Learn how to change the time in Omega Ruby and Alpha Sapphire without triggering time penalties.",slug:"oras-remove-time-penalty",category:"Omega Ruby and Alpha Sapphire",tag:"cfw",addedOn:"2025-03-14"};function s(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"The game will lock time based events for 24 hours when any of these happen:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A save is moved between consoles."}),`
`,e.jsx(n.li,{children:"A cartridge was saved on one console, then played on another."}),`
`,e.jsx(n.li,{children:"A save is copied from a physical console to an emulator."}),`
`,e.jsx(n.li,{children:"A physical console's time is adjusted (emulator is fine)."}),`
`]}),`
`,e.jsx(n.p,{children:"Adjusting time on emulators is fine because it acts as if real world time has passed, not as if you're changing console settings."}),`
`,e.jsx(n.h2,{children:"Emulators (Citra, Lime3DS, Azahar)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Set your emulator date to be earlier than your desired date."}),`
`,e.jsx(n.li,{children:"Start the game and save."}),`
`]}),`
`,e.jsx(n.p,{children:"That's it! You can now set the date to any future date without penalty."}),`
`,e.jsx(n.h2,{children:"Physical Consoles"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Update your Pokemon Game to the latest version."}),`
`,e.jsx(n.li,{children:"Set your console date to be earlier than your desired date."}),`
`,e.jsx(n.li,{children:"Start the game, save, then close the game."}),`
`,e.jsxs(n.li,{children:["Enable IPS patching with ",e.jsx(n.a,{href:"/misc-3ds-ips-luma-citra",children:"our patch guide"}),"."]}),`
`,e.jsxs(n.li,{children:["Create a Luma patch folder if it doesn't exist:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Omega Ruby: ",e.jsx(n.code,{children:"/luma/titles/000400000011C400/"})]}),`
`,e.jsxs(n.li,{children:["Alpha Sapphire: ",e.jsx(n.code,{children:"/luma/titles/000400000011C500/"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Download the ",e.jsx(n.code,{children:"code.ips"})," for your specific game and copy it to the patch folder",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/downloads/or-remove-time-penalty/code.ips",children:"Omega Ruby code.ips"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/downloads/as-remove-time-penalty/code.ips",children:"Alpha Sapphire code.ips"})}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"If you run into any issues in the future, remove the patch and follow those steps again."}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Zaksabeast for looking into this and making the time penality removal patch."}),`
`,e.jsx(n.li,{children:"Rebel on Discord for helping test."}),`
`]})]})}function o(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{o as default,l as frontmatter};
