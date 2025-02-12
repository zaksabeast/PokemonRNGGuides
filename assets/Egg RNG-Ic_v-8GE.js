import{u as i,j as e}from"./index-JGnwVbR5.js";const a={title:"FRLG Egg RNG",description:"RNG Eggs in FRLG",slug:"emulator-frlg-egg",subCategory:"Emulator"};function r(t){const n={a:"a",code:"code",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{children:"Requirements:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://code.google.com/archive/p/vba-rerecording/downloads",children:"VBA-RR"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pokerng.forumcommunity.net/?t=56443955&p=396434940",children:"Lua Scripts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Password is ",e.jsx(n.code,{children:"allyouneedisnoob"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"Parent's IVs and their compatibility (Can talk to the daycare man for compatibility.)"}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),`
`,e.jsx(n.h3,{children:"Intro"}),`
`,e.jsx(n.p,{children:"The PID for the egg in FRLG is generated in two parts. You'll rng the first part when the egg is generated, and you'll rng the second part when picking up the egg."}),`
`,e.jsx(n.h3,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["First deposit the Pokemon at the daycare.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Order of deposit for the parents does not matter."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Stay inside the daycare and take steps until the lua script displays ",e.jsx(n.code,{children:"FE"})," for the step counter.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure to do the steps inside the daycare and not outside of it."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Create a savestate here before continuining on."}),`
`]}),`
`,e.jsx(n.h3,{children:"PokeFinder Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder and click on Gen 3 Egg. Make sure to be on the Fire Red/Leaf Green tab."}),`
`,e.jsx(n.li,{children:"Enter ALL the information you have for the parents including their compatibility."}),`
`,e.jsx(n.li,{children:"For a frame range you can choose any min / max, though the max frame for Frame Held must be lower than the min frame for Pickup Frame."}),`
`,e.jsx(n.li,{children:"Once done, find your initial seed shown by the lua. Enter it and search for a spread."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Initial-Seed.png",alt:"Initial Seed"})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"Once you have a target frame, you'll see that you need to hit TWO different frames."}),`
`]}),`
`,e.jsx(n.h3,{children:"Held Frame RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Take one step at the right frame to generate an egg.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Frames can be advanced one by one with CTRL + N while the emulator is paused."}),`
`,e.jsx(n.li,{children:"Once on the target frame, then you can hold down the directional button to take a step while unpausing the emulator."}),`
`,e.jsx(n.li,{children:"For PokeFinder you'll have to take delay into account. Subtract 18 from the target frame and take the step on that frame."}),`
`,e.jsx(n.li,{children:"If no egg is generated, double check that everything has been entered correctly. If so, then try a delay of 17 or 19."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Once the step is done, the second half of your PID should be displayed on the screen with the script.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If it matches, continue the process. If it does not match, either restart the emulator and restart the process, or continue to the next Frame Held and try again."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Held.png",alt:"Held Frame"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"You did the Held Frame RNG. Now it's time for the Pickup Frame RNG."}),`
`]}),`
`,e.jsx(n.h3,{children:"Pickup Frame RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Create a save state in case you miss the moment to press A."}),`
`,e.jsx(n.li,{children:'Go outside, talk to the old man. Accept the egg, and pause the emulator at the last dialogue ("Take good care of it.").'}),`
`,e.jsxs(n.li,{children:["Advance to the target frame, pause, hold A and unpause.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Again, delay will have to be taken into account. For the Pickup Frame, the delay will be 3."}),`
`,e.jsx(n.li,{children:"If the egg does not have the correct PID, then try a delay of 2 or 4."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"You should have the second half of the PID for your egg, and so a successful RNG."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Success.png",alt:"Success"})}),`
`,e.jsx(n.p,{children:"If it's not matching, recheck the whole process. Don't hesitate to do save states."})]})}function o(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{o as default,a as frontmatter};
