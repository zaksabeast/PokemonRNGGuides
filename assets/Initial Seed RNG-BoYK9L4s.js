import{u as s,j as e}from"./index-Cx4QpB68.js";const r={title:"Initial Seed RNG",description:"How to RNG an initial seed in HeartGold/SoulSilver",slug:"hgss-initial-seed",subCategory:"Basic Knowledge"};function o(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide assumes that you have found a target seed already. It is necessary to have your target seed and delay before following this guide.
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
`,e.jsx(n.p,{children:"RunAsDate is a tool developed by nirsoft that allows any program to load with a set time specified by the user. This tool is really useful for Gen 4 RNG, and can be your best ally in order to hit your seed without difficulty."}),`
`,e.jsx(n.h2,{children:"Setup RunAsDate"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch RunAsDate."}),`
`,e.jsx(n.li,{children:"Configure RunAsDate to look like the image below."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/HeartGold-SoulSilver/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5), so you're almost done!
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:'Select the program you want to fake the date/time, with the "Browse..." button.'}),`
`,e.jsx(n.li,{children:"Set the date and time to one of the given dates and times in PokeFinder to hit your seed."}),`
`,e.jsx(n.li,{children:'After that, just hit "Run" and your desmume should be launched.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Hitting the target seed"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Make save states often during this process.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the lua script."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"A"}),' to get to the "Continue" screen as fast as possible.']}),`
`,e.jsxs(n.li,{children:["Pause your emulator ",e.jsx(n.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(n.li,{children:"Make plenty of save states in case you mess up."}),`
`,e.jsx(n.li,{children:"Unpause your game, and let it run until you get close to your target delay."}),`
`,e.jsx(n.li,{children:"Once you are close, pause your emulator."}),`
`,e.jsx(n.li,{children:"Create another save state (you never know what might happen!)."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"N"})," to advance the game one video frame to increase the delay one time."]}),`
`,e.jsxs(n.li,{children:["Once you are on the target delay, hold ",e.jsx(n.code,{children:"A"})," while unpausing your game."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"Sometimes you will find that even though you are pressing A on the right delay, the actual delay you hit is +/-1 of what you wanted. This is to be expected because of how Gen 4 delays can either be always odd or always even. There are three methods to switch delays from even to odd or vice versa listed below."}),`
`,e.jsx(n.h3,{children:"Changing the year"}),`
`,e.jsx(n.p,{children:`This is a simple method with RunAsDate. You just have to close your emulator, then change the year in RunAsDate to one year before or after the current year being used. To account for the change in year, the delay will change as well. You can verify the new delay with PokeFinder in the "Seed to Time" window by changing the year and generating the new delay. Once you've adjusted everything, you can relaunch Desmume with RunAsDate and load a save state. Then you can RNG for the new delay.`}),`
`,e.jsx(n.h3,{children:"Load a GBA game"}),`
`,e.jsx(n.p,{children:"Loading a GBA game into the GBA slot in the emulator will switch the delay from even to odd, or vice versa."}),`
`,e.jsx(n.h3,{children:"Continue Screen"}),`
`,e.jsx(n.p,{children:"When at the screen to choose to continue your game, you can press the down arrow on the bottom touch screen to move the screen down, and then press the up arrow to move the screen back up. This will switch the delay from even to odd, or vice versa."})]})}function a(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{a as default,r as frontmatter};
