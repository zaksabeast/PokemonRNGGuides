import{u as i,j as e}from"./index-CIHdflGl.js";const s={title:"Ruby and Sapphire Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs from the Daycare in Ruby and Sapphire for shiny, high-IV Pokémon.",slug:"emulator-rs-egg",category:"Ruby and Sapphire",tag:"emu"};function r(t){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"Parent's IVs and their compatibility (ask the daycare man)"}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"The PID for the egg in Ruby/Sapphire is created in two parts. You'll RNG the first part when the egg is generated and the second part when picking up the egg."}),`
`,e.jsx(n.p,{children:"Egg RNG in Ruby/Sapphire can be done with both live and dead battery."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: In Ruby and Sapphire, the Everstone does not work to pass down natures in breeding.
`})}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Deposit the Pokémon at the daycare. Make sure the parents aren't holding items. The order of deposit does not matter."}),`
`,e.jsxs(n.li,{children:["Stay in the daycare and take steps until the Lua script displays ",e.jsx(n.code,{children:"FE"})," for the step counter. Do this inside the daycare."]}),`
`,e.jsx(n.li,{children:"Create a savestate here before continuing."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.h2,{children:"PokeFinder Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder and select Gen 3 Egg. Make sure to be on the Ruby/Sapphire tab."}),`
`,e.jsx(n.li,{children:"Enter all the information for the parents, including their compatibility."}),`
`,e.jsx(n.li,{children:"Choose any min/max for the frame range, but the max Frame Held must be lower than the min Pickup Frame."}),`
`,e.jsxs(n.li,{children:["Enter your initial seed from the Lua script and find a spread. For a dead battery, the initial seed will be ",e.jsx(n.code,{children:"5A0"})," for Ruby/Sapphire."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Initial-Seed.png",alt:"Initial Seed"})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"Once you have a target frame, note that you need to hit two different frames."}),`
`]}),`
`,e.jsx(n.h2,{children:"Held Frame RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Take one step at the right frame to generate an egg. Use ",e.jsx(n.code,{children:"CTRL + N"})," to advance frames one by one while paused. Once on the target frame, hold the directional button and unpause the emulator. For PokeFinder, subtract 18 from the target frame and take the step on that frame. If no egg is generated, check your entries and try a delay of 17 or 19."]}),`
`,e.jsx(n.li,{children:"After the step, the second half of your PID should display on the screen with the script. If it matches, continue. If not, restart the emulator or try the next Frame Held."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Held.png",alt:"Held Frame"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"You have finished the Held Frame RNG. Now, it's time for the Pickup Frame RNG."}),`
`]}),`
`,e.jsx(n.h2,{children:"Pickup Frame RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Create a savestate in case you miss the chance to press ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsx(n.li,{children:'Go outside, talk to the old man and accept the egg. Pause the emulator at the last dialogue ("Take good care of it.").'}),`
`,e.jsxs(n.li,{children:["Advance to the target frame, pause, hold ",e.jsx(n.code,{children:"A"}),", and unpause. For the Pickup Frame, the delay will be 3. If the egg does not have the correct PID, try a delay of 2 or 4."]}),`
`]}),`
`,e.jsx(n.p,{children:"You should have the second part of the PID for your egg, resulting in a successful RNG."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Success.png",alt:"Success"})}),`
`,e.jsx(n.p,{children:"If it doesn't match, recheck the whole process, and feel free to use savestates."})]})}function h(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{h as default,s as frontmatter};
