import{u as r,j as e}from"./index-DqbXmijk.js";const s={title:"BDSP RNG Guide - Setup PokeFinder for shiny hunting",navDrawerTitle:"PokeFinder Setup",description:"Step-by-step guide to set up PokeFinder for RNG abuse in Brilliant Diamond and Shining Pearl.",slug:"bdsp-pokefinder",category:"Brilliant Diamond and Shining Pearl",tag:"any"};function o(i){const n={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsxs(n.li,{children:["For non-Custom Firmware use ",e.jsx(n.a,{href:"https://github.com/Lincoln-LM/Project_Xs",children:"Project Xs"})]}),`
`,e.jsxs(n.li,{children:["For Custom Firmware use ",e.jsx(n.a,{href:"/install-capturesight",children:"CaptureSight"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting up Profiles"}),`
`,e.jsx(n.p,{children:"PokeFinder has the ability to set up profiles for each of your individual saves. By setting up a profile for a save, you can have information such as TID/SID readily available. This is useful because you only need to input save specific information once, and then it's available every time you relaunch PokeFinder."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open PokeFinder and navigate to "Gen 8 Tools" -> "Profile Manager".'}),`
`,e.jsxs(n.li,{children:['Select "New" and input the info needed to create a profile for your game.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For TID and SID, these values will be the 5 digit values displayed in either CaptureSight or PkHeX (hover over the TID box to see this)."}),`
`,e.jsx(n.li,{children:"This will only have to be done once for each profile you set up."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Menu Options"}),`
`,e.jsx(n.p,{children:"In the opening screen of PokeFinder there are options for which type of RNG you are doing sorted by generation. You will want to pick the correct one for the Pokemon you are going to RNG."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Static - for Pokemon found in the overworld, roaming Pokemon, or Pokemon received as gifts"}),`
`,e.jsx(n.li,{children:"Wild - for Pokemon found in the wild, such as grass, surfing, etc."}),`
`,e.jsx(n.li,{children:"Event - for Pokemon obtained through Mystery Gift"}),`
`,e.jsx(n.li,{children:"Egg - for Pokemon eggs collected from the daycare"}),`
`,e.jsx(n.li,{children:"TID/SID - for finding a specific TID/SID to RNG"}),`
`]}),`
`,e.jsx(n.h2,{children:"RNG Seeds"}),`
`,e.jsx(n.h3,{children:"Non-Custom Firmware"}),`
`,e.jsxs(n.p,{children:["Follow the ",e.jsx(n.a,{href:"https://github.com/Lincoln-LM/Project_Xs?tab=readme-ov-file#how-to-run",children:"instructions in the Github ReadMe"})," to set up Project Xs."]}),`
`,e.jsxs(n.p,{children:["Join the ",e.jsx(n.a,{href:"https://www.discord.gg/d8JuAvg",children:"Pokemon RNG Discord"})," for assistance."]}),`
`,e.jsx(n.h3,{children:"For Custom Firmware"}),`
`,e.jsx(n.p,{children:"Within the different RNG method screens there are inputs for Seed 0 and Seed 1. Take note that if you are using CaptureSight to view the RNG seeds there are 4 seeds displayed. To input the 4 seeds from CaptureSight into PokeFinder use the following:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Seed 0 of PokeFinder = Seed 0 and Seed 1 of CaptureSight"}),`
`,e.jsx(n.li,{children:"Seed 1 of PokeFinder = Seed 2 and Seed 3 of CaptureSight"}),`
`]})]})}function l(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{l as default,s as frontmatter};
