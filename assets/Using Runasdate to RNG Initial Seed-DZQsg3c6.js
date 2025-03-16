import{u as i,j as e}from"./index-DeHcpyfl.js";const r={title:"Initial Seed RNG (RunAsDate edition)",description:"How to control Gen 5 initial seeds without any difficulty",slug:"emulator-bw-runasdate-initial-seed",subCategory:"Emulator",tag:"emu"};function s(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This guide assumes you have found your target seed. You need your target seed before following this guide.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(n.h3,{children:"What is RunAsDate?"}),`
`,e.jsx(n.p,{children:"RunAsDate is a tool by Nirsoft that loads any program with a user-specified time. It's useful for Gen 5 RNG and helps you hit your seed easily. This guide focuses only on RunAsDate."}),`
`,e.jsx(n.h2,{children:"Step 1: Setup RunAsDate"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch RunAsDate."}),`
`,e.jsx(n.li,{children:"Configure RunAsDate to match the image below."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`You'll never need to change this again. This is the universal RunAsDate configuration for RNG (Gen 3, 4, or 5).
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Select the program you want to fake the date/time using the ",e.jsx(n.code,{children:"Browse..."})," button."]}),`
`,e.jsx(n.li,{children:"Set the date and time to one of the given times in PokeFinder to hit your seed."}),`
`,e.jsxs(n.li,{children:["Hit ",e.jsx(n.code,{children:"Run"}),", and Desmume should launch."]}),`
`]}),`
`,e.jsx(n.p,{children:"Desmume will now run with the date and time you selected."}),`
`,e.jsx(n.h2,{children:"Step 2: Hitting the target seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the Lua script."}),`
`,e.jsx(n.li,{children:"Load your game."}),`
`,e.jsx(n.li,{children:"Do any necessary keypresses to hit your target seed."}),`
`,e.jsx(n.li,{children:"You can now continue as you would with basic RNG!"}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"If you're not hitting the right seed on the first try with RunAsDate, check these things:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"RunAsDate time."}),`
`,e.jsx(n.li,{children:"RNG profile."}),`
`,e.jsx(n.li,{children:"Keypresses needed to hit your seed."}),`
`]})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{l as default,r as frontmatter};
