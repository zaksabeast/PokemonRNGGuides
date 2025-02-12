import{u as i,j as e}from"./index-D1RsBzMR.js";const r={title:"Initial Seed RNG (RunAsDate edition)",description:"How to control Gen 5 initial seeds without any difficulty",slug:"emulator-bw-runasdate-initial-seed",subCategory:"Emulator"};function s(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide assumes that you have found your target seed. It is necessary to have your target seed before following this guide.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Desmume",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Setup Desmume for RNG"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Take care to choose the right version (32 or 64 bits) for your computer."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{children:"What is RunAsDate?"}),`
`,e.jsx(n.p,{children:"RunAsDate is a tool developed by nirsoft that allows any program to load with a set time specified by the user. This tool is really useful for Gen 5 RNG, and can be your best ally in order to hit your Seed without too much difficulty. Of course there are other ways, but this guide will only focus on RunAsDate."}),`
`,e.jsx(n.h2,{children:"Step 1: Setup RunAsDate"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch RunAsDate."}),`
`,e.jsx(n.li,{children:"Configure RunAsDate to look like the image below."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/Black-and-White/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5), so you're almost done!
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:'Select the program you want to fake the date/time, with the "Browse..." button.'}),`
`,e.jsx(n.li,{children:"Set the date and time to one of the given dates and times in PokeFinder to hit your seed."}),`
`,e.jsx(n.li,{children:'After that, just hit "Run" and your desmume should be launched.'}),`
`]}),`
`,e.jsx(n.p,{children:"Desmume should now be running with the date and time you chose."}),`
`,e.jsx(n.h2,{children:"Step 2: Hitting the target seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the lua script."}),`
`,e.jsx(n.li,{children:"Load your game."}),`
`,e.jsx(n.li,{children:"Do any necessary keypress(es) required to hit your target seed."}),`
`,e.jsx(n.li,{children:"There's nothing more to do, you can just continue as any basic RNG!"}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"If you're not hitting the right seed at the first try with runasdate, check to make sure these things are correct:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Runasdate time"}),`
`,e.jsx(n.li,{children:"RNG profile"}),`
`,e.jsx(n.li,{children:"Keypresses needed to hit your seed"}),`
`]})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{l as default,r as frontmatter};
