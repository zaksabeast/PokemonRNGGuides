import{u as i,j as e}from"./index-CV0XqbBP.js";const o={title:"How To Find DS Parameters in Generation 5",description:"Get your DS Parameters for Generation 5 RNG",slug:"emulator-bw-find-ds-parameters",subCategory:"Emulator"};function r(s){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Desmume",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Setup Desmume for RNG"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://runasdate.en.softonic.com/",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Things To Know"}),`
`,e.jsxs(n.p,{children:["Finding your DS Parameters is ",e.jsx(n.strong,{children:"MANDATORY"}),". There are no RNGs you can do without finding these parameters. As such, you should get comfortable with doing this procedure. (Though you only have to do it once per save/console/emulator.)"]}),`
`,e.jsx(n.h2,{children:"The RNG Process"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["DS Parameters Search",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Open RNG Reporter and click on 5th Gen Tools -> Find DS Parameters."}),`
`,e.jsx(n.li,{children:"Choose your game version and language."}),`
`,e.jsxs(n.li,{children:["Set the Seed Encryption Variables to the below:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"DS Type: Lite/Original"}),`
`,e.jsx(n.li,{children:"DS Mac Address: 0009BF123456"}),`
`,e.jsx(n.li,{children:"VCount: 10-70"}),`
`,e.jsx(n.li,{children:"Timer0: 300-1200"}),`
`,e.jsx(n.li,{children:"GxStat: 6-6"}),`
`,e.jsx(n.li,{children:"VFrame: 0-15"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Unlike on consoles, DeSmuMe's DS MAC Address is always 0009BF123456."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Setup.png",alt:"Seed Encryption Variables"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you cannot find a seed using the above values, double check that everything is correct. If so then you can extend the values to the below:

- VCount: 0-FF
- Timer0: 0-FFFF

Using the above extended values will take a long time to search through.
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["The Seed",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Open runasdate and type in any time. Make sure to check the Immediate Mode."}),`
`,e.jsx(n.li,{children:"Input the same time in the DS Parameter Finder."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Time.png",alt:"Time Input"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:'Now hit "Run" on runasdate and load your rom.'}),`
`,e.jsx(n.li,{children:"Open your lua script and do not do any keypresses. Copy the seed you get and paste it into the DS Parameters finder."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Seed.png",alt:"Initial Seed"})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"Click Search and wait for the search to finish."}),`
`,e.jsx(n.li,{children:'When you get a result, click on "Send Results to Profile".'}),`
`]}),`
`,e.jsx(n.p,{children:"Good luck on your future RNGS!"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You may have to redo this process if you change emulation settings, saves, or redownload the emulator.
`})})]})}function l(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{l as default,o as frontmatter};
