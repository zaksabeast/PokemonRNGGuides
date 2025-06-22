import{q as i,j as e}from"./index-PYrgJAUJ.js";const t=[{title:"How To Find DS Parameters in Generation 5",navDrawerTitle:"DS Parameters",description:"Learn how to find your DS parameters for successful RNG in Pokémon Black and White.",slug:"emulator-bw-find-ds-parameters",category:"Black and White",tag:"emu"}];function r(s){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://runasdate.en.softonic.com/",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Things To Know"}),`
`,e.jsx(n.p,{children:"You need to find your DS Parameters to proceed with RNG. This only needs to be done once per save, console, or emulator."}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up RNG Reporter"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RNG Reporter."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"5th Gen Tools -> Find DS Parameters"}),"."]}),`
`,e.jsx(n.li,{children:"Choose your game version and language."}),`
`,e.jsxs(n.li,{children:["Set the Seed Encryption Variables:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"DS Type: Lite/Original"}),`
`,e.jsxs(n.li,{children:["DS MAC Address: ",e.jsx(n.code,{children:"0009BF123456"})]}),`
`,e.jsxs(n.li,{children:["VCount: ",e.jsx(n.code,{children:"10-70"})]}),`
`,e.jsxs(n.li,{children:["Timer0: ",e.jsx(n.code,{children:"300-1200"})]}),`
`,e.jsxs(n.li,{children:["GxStat: ",e.jsx(n.code,{children:"6-6"})]}),`
`,e.jsxs(n.li,{children:["VFrame: ",e.jsx(n.code,{children:"0-15"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["DeSmuMe's DS MAC Address is always ",e.jsx(n.code,{children:"0009BF123456"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Setup.png",alt:"Seed Encryption Variables"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: If you cannot find a seed, double-check your settings. If correct, try:\n- VCount: `0-FF`\n- Timer0: `0-FFFF`\nThis will take longer to search.\n"})}),`
`,e.jsx(n.h2,{children:"Step 2: Find Your Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RunAsDate."}),`
`,e.jsxs(n.li,{children:["Enter any time and check ",e.jsx(n.code,{children:"Immediate Mode"}),"."]}),`
`,e.jsx(n.li,{children:"Input the same time in the DS Parameter Finder."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Time.png",alt:"Time Input"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Run"})," in RunAsDate and load your ROM."]}),`
`,e.jsx(n.li,{children:"Open your Lua script. Do not press any keys."}),`
`,e.jsx(n.li,{children:"Copy the seed you get and paste it into the DS Parameters Finder."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Seed.png",alt:"Initial Seed"})}),`
`,e.jsx(n.h2,{children:"Step 3: Search for DS Parameters"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Search"})," and wait for it to finish."]}),`
`,e.jsxs(n.li,{children:["When you get a result, click ",e.jsx(n.code,{children:"Send Results to Profile"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"Good luck with your RNG!"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You may need to redo this if you change emulation settings, saves, or redownload the emulator.
`})}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function d(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{d as default,t as frontmatter};
