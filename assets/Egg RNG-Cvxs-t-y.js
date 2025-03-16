import{u as i,j as e}from"./index-CwZaltgI.js";const a={title:"FRLG Egg RNG",description:"RNG eggs in FRLG",slug:"emulator-frlg-egg",subCategory:"Emulator",tag:"emu"};function s(t){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"Parent's IVs and compatibility (talk to the daycare man)"}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"The egg's PID in FRLG is generated in two parts. The first part is set when the egg is generated, and the second part is set when picking it up."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Deposit both parents at the daycare. The order doesn't matter."}),`
`,e.jsxs(n.li,{children:["Stay inside and take steps until the Lua script displays ",e.jsx(n.code,{children:"FE"})," for the step counter. Do this inside the daycare."]}),`
`,e.jsx(n.li,{children:"Create a savestate before continuing."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.h2,{children:"PokeFinder Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder and go to Gen 3 Egg. Select the Fire Red/Leaf Green tab."}),`
`,e.jsx(n.li,{children:"Enter the parents' info, including compatibility."}),`
`,e.jsx(n.li,{children:"Set a frame range. The max for Frame Held must be lower than the min for Pickup Frame."}),`
`,e.jsx(n.li,{children:"Find your initial seed from the Lua script, enter it, and search for a spread."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Initial-Seed.png",alt:"Initial Seed"})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"You'll need to hit two different frames."}),`
`]}),`
`,e.jsx(n.h2,{children:"Held Frame RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Take one step at the right frame to generate an egg. Use ",e.jsx(n.code,{children:"CTRL + N"})," to advance frames while paused. When on the target frame, hold a directional button and unpause.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In PokeFinder, subtract 18 from the target frame and step on that frame."}),`
`,e.jsx(n.li,{children:"If no egg appears, double-check your inputs. If correct, try a delay of 17 or 19."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"After stepping, the Lua script will show the second half of the PID. If it matches, continue. If not, restart and try again."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Held.png",alt:"Held Frame"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Held Frame RNG is done. Now for Pickup Frame RNG."}),`
`]}),`
`,e.jsx(n.h2,{children:"Pickup Frame RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Create a savestate to avoid missing the ",e.jsx(n.code,{children:"A"})," press."]}),`
`,e.jsx(n.li,{children:'Exit, talk to the old man, and accept the egg. Pause at the last dialogue ("Take good care of it.").'}),`
`,e.jsxs(n.li,{children:["Advance to the target frame, pause, hold ",e.jsx(n.code,{children:"A"}),", and unpause.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The Pickup Frame delay is 3. If incorrect, try 2 or 4."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"If successful, your egg's second PID half should match."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Success.png",alt:"Success"})}),`
`,e.jsx(n.p,{children:"If it doesn't match, recheck your steps and use savestates."})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{l as default,a as frontmatter};
