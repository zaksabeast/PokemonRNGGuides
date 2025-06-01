import{u as s,j as e}from"./index-f5mc6wPO.js";const r=[{title:"Diamond, Pearl, and Platinum Initial Seed RNG",navDrawerTitle:"Initial Seed RNG",description:"Learn how to RNG your initial seed in Diamond, Pearl, and Platinum.",slug:"dppt-initial-seed",category:"Diamond, Pearl, and Platinum",tag:"emu"}];function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This guide assumes you have found a target seed already. You need your target seed and delay before following this guide.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(n.h3,{children:"What is RunAsDate?"}),`
`,e.jsx(n.p,{children:"RunAsDate is a tool that allows any program to load with a set time you specify. This tool is useful for Gen 4 RNG and helps hit your seed easier."}),`
`,e.jsx(n.h2,{children:"Setup RunAsDate"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch RunAsDate."}),`
`,e.jsx(n.li,{children:"Configure RunAsDate to match the image below."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5).
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Select the program you want to fake the date/time with the ",e.jsx(n.code,{children:"Browse..."})," button."]}),`
`,e.jsxs(n.li,{children:["Set the date and time to hit your seed as shown in ",e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Right click on the chosen seed and choose "Generate times for seed".'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Hit ",e.jsx(n.code,{children:"Run"})," to launch Desmume."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Hitting the target seed"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Make save states often during this process.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the lua script."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"A"}),' to reach the "Continue" screen quickly.']}),`
`,e.jsxs(n.li,{children:["Pause your emulator using ",e.jsx(n.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(n.li,{children:"Make plenty of save states."}),`
`,e.jsx(n.li,{children:"Unpause your game and let it run until close to your target delay."}),`
`,e.jsx(n.li,{children:"When close, pause your emulator."}),`
`,e.jsx(n.li,{children:"Create another save state."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"N"})," to advance the game one video frame to increase the delay."]}),`
`,e.jsxs(n.li,{children:["When you reach the target delay, hold ",e.jsx(n.code,{children:"A"})," while unpausing."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsxs(n.p,{children:["If you notice that you are pressing ",e.jsx(n.code,{children:"A"})," at the right delay but hitting a different delay by +/-1, this can happen due to Gen 4 delays being always odd or always even. You can switch delays from even to odd or vice versa with the following methods:"]}),`
`,e.jsx(n.h3,{children:"Changing the year"}),`
`,e.jsx(n.p,{children:'Close your emulator, then change the year in RunAsDate to one year before or after your current year. This will change the delay as well. Verify your new delay in PokeFinder in the "Seed to Time" window. Relaunch Desmume with RunAsDate and load a save state to RNG for the new delay.'}),`
`,e.jsx(n.h3,{children:"Load a GBA game"}),`
`,e.jsx(n.p,{children:"Load a GBA game into the GBA slot in the emulator to switch the delay from even to odd, or vice versa."}),`
`,e.jsx(n.h3,{children:"Continue Screen"}),`
`,e.jsxs(n.p,{children:['Choose "New Game", then press ',e.jsx(n.code,{children:"B"})," to cancel and go back to the continue screen, which will switch the delay from even to odd, or vice versa."]}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function l(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{l as default,r as frontmatter};
