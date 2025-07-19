import{E as i,j as e}from"./index-eK5-Hse0.js";const l={title:"Install CaptureSight",navDrawerTitle:"CaptureSight",description:"Learn how to install CaptureSight on your Switch to assist with RNG and perfect Pokémon hunting.",slug:"install-capturesight",category:"Switch Tools",tag:"cfw"};function s(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A Switch with Atmosphere Custom Firmware (",e.jsx(n.a,{href:"https://switch.hacks.guide/",children:"CFW Install Guide"}),")"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Installing Tesla Overlay"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/WerWolv/nx-ovlloader/releases",children:"nx-ovlloader"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/WerWolv/Tesla-Menu/releases",children:"Tesla Menu"})}),`
`]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Download the latest release of both Tesla Menu and nx-ovlloader."}),`
`,e.jsx(n.li,{children:"Unzip and merge folders into the root of the SD card."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Install CaptureSight"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/zaksabeast/CaptureSight/releases",children:"CaptureSight"})}),`
`]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download ",e.jsx(n.code,{children:"capturesight.ovl"})," and place it in the ",e.jsx(n.code,{children:"/switch/.overlays"})," directory on the SD card."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Using CaptureSight"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Start a supported Pokémon game, like Sword/Shield or Brilliant Diamond/Shining Pearl."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"L + D-pad Down + Click in right joystick"})," to toggle the Tesla Menu overlay."]}),`
`,e.jsx(n.li,{children:"Open the CaptureSight overlay."}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.h3,{children:"dmnt:cht is not running"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you see this error, you are not using Atmosphere (the Custom Firmware) or it is not installed correctly. Follow ",e.jsx(n.a,{href:"https://switch.hacks.guide/extras/updating.html",children:"this guide"})," to update Atmosphere to the latest version."]}),`
`]}),`
`,e.jsx(n.h3,{children:"No cheat process! Is a game running? Is something else using dmnt:cht?"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure to launch the game first before trying to run CaptureSight. Check that you are not using sysbot-base, as these cannot run together due to conflict."}),`
`]}),`
`,e.jsx(n.h3,{children:"Unsupported game update!"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Updating the game to the latest version should fix this error. This error can also occur if CaptureSight is not updated to the latest game version."}),`
`]}),`
`,e.jsx(n.h3,{children:"Unsupported game! Title Id: <title_id>"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You are not using a game that CaptureSight supports. The supported games are:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Sword & Shield."}),`
`,e.jsx(n.li,{children:"Brilliant Diamond & Shining Pearl."}),`
`,e.jsx(n.li,{children:"Legends Arceus."}),`
`]}),`
`]}),`
`]})]})}function h(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{h as default,l as frontmatter};
