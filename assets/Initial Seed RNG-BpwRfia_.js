import{u as o,j as e}from"./index-DK98DMzl.js";const r={title:"HeartGold and Soulsilver Initial Seed RNG",navDrawerTitle:"Initial Seed RNG",description:"Learn how to RNG your initial seed in HeartGold and SoulSilver.",slug:"hgss-initial-seed",category:"HeartGold and SoulSilver",tag:"emu"};function s(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This guide assumes that you have found a target seed already. You need your target seed and delay before following this guide.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(n.h3,{children:"What is RunAsDate?"}),`
`,e.jsx(n.p,{children:"RunAsDate is a tool by Nirsoft that lets any program run with a time you set. It is useful for Gen 4 RNG and helps you hit your seed easily."}),`
`,e.jsx(n.h2,{children:"Setup RunAsDate"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch RunAsDate."}),`
`,e.jsx(n.li,{children:"Set up RunAsDate as shown in the image below."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/HeartGold-SoulSilver/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`You'll never have to change this again. This is the universal RunAsDate setup for RNG (Gen 3, 4, or 5), so you're almost done!
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Select the program you want to fake the date/time with the ",e.jsx(n.code,{children:"Browse..."})," button."]}),`
`,e.jsx(n.li,{children:"Set the date and time to one of the given dates and times in PokeFinder to hit your seed."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Run"}),", and your Desmume should launch."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Hitting the target seed"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Make save states often during this process.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the lua script."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"A"}),' to get to the "Continue" screen quickly.']}),`
`,e.jsxs(n.li,{children:["Pause your emulator with ",e.jsx(n.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(n.li,{children:"Make plenty of save states in case you mess up."}),`
`,e.jsx(n.li,{children:"Unpause your game, and run until you get close to your target delay."}),`
`,e.jsx(n.li,{children:"Once close, pause your emulator."}),`
`,e.jsx(n.li,{children:"Create another save state (you never know what might happen!)."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"N"})," to advance the game one video frame to increase the delay by one."]}),`
`,e.jsxs(n.li,{children:["When you're on the target delay, hold ",e.jsx(n.code,{children:"A"})," while unpausing your game."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsxs(n.p,{children:["Sometimes, even if you press ",e.jsx(n.code,{children:"A"})," at the right delay, the actual delay can be +/-1 of what you wanted. This can happen with Gen 4, where delays can be either always odd or always even. Use one of these methods to change delays from even to odd or vice versa."]}),`
`,e.jsx(n.h3,{children:"Changing the year"}),`
`,e.jsx(n.p,{children:'Close your emulator and change the year in RunAsDate to one year before or after the current year. This change will adjust the delay. Verify the new delay with PokeFinder in the "Seed to Time" window by changing the year. Once adjusted, relaunch Desmume with RunAsDate and load a save state. Then you can RNG for the new delay.'}),`
`,e.jsx(n.h3,{children:"Load a GBA game"}),`
`,e.jsx(n.p,{children:"Loading a GBA game into the GBA slot in the emulator will switch the delay from even to odd, or vice versa."}),`
`,e.jsx(n.h3,{children:"Continue Screen"}),`
`,e.jsx(n.p,{children:"At the screen to choose to continue your game, press the down arrow on the bottom touch screen to move the screen down, then press the up arrow to move it back up. This will switch the delay from even to odd, or vice versa."})]})}function a(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{a as default,r as frontmatter};
