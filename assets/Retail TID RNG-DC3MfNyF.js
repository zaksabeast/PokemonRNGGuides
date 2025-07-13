import{E as d,j as e}from"./index-B7X06lKS.js";const u={title:"Ruby and Sapphire Retail TID RNG",navDrawerTitle:"TID RNG",description:"Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire.",slug:"retail-rubysapphire-tid",category:"Ruby and Sapphire",tag:"retail"};function h(n){const t={code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...d(),...n.components},{RsTidSearcher:o,RsTidSidGenerator:s,RsTidTimer:a,Step:r,Stepper:l}=t;return o||i("RsTidSearcher"),s||i("RsTidSidGenerator"),a||i("RsTidTimer"),r||i("Step"),l||i("Stepper"),e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"RNG manipulation in Gen 3 lets you get the exact Trainer ID (TID) and Secret ID (SID) you want. This is useful for things like knowing your SID to RNG for shiny Pokémon. This guide covers how to do it on a physical console for Ruby and Sapphire."}),`
`,e.jsx(t.p,{children:`This guide assumes you have a dead battery in your Ruby
& Sapphire cartridge. If you have a working battery, this method will not work.`}),`
`,e.jsxs(l,{titles:["Find Target TID","RNG TID"],children:[e.jsxs(r,{step:0,children:[e.jsx(t.h2,{children:"Step 1: Find a Target TID"}),e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Search for a desired TID using the tool below."}),`
`,e.jsx(t.li,{children:`If you are not finding a result, you can increase the max advances to search
through, though keep in mind it will take longer for each attempt.`}),`
`,e.jsx(t.li,{children:"Select your target TID and continue to Step 2."}),`
`]}),e.jsx(s,{})]}),e.jsxs(r,{step:1,children:[e.jsx(t.h2,{children:"Step 2: RNG your TID"}),e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Start the game."}),`
`,e.jsxs(t.li,{children:["Start the timer below. When the first timer ends, reset the game using ",e.jsx(t.code,{children:"Start + Select + A + B"}),"."]}),`
`,e.jsx(t.li,{children:"Play until the final screen (screenshot below)."}),`
`,e.jsxs(t.li,{children:["Wait until the second timer ends, then press ",e.jsx(t.code,{children:"A"})," to generate your TID."]}),`
`,e.jsx(t.li,{children:'Input the TID you got into the "Hit TID" of the tool below and click "Generate".'}),`
`,e.jsx(t.li,{children:"Select the TID in the results to update the timer. In the case of multiple results, choose the one closest to your target."}),`
`,e.jsx(t.li,{children:"Repeat the above steps to attempt to hit your target TID. If you're off by 1-2 advances, you don't need to calibrate. You can try again with the same timer settings."}),`
`]}),e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/Ruby-Sapphire/TID/RubyTIDFinalScreen.png",alt:"Final Screen"})}),e.jsx(a,{}),e.jsx(o,{})]})]}),`
`,e.jsx(t.h2,{children:"Credits"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"EzPz for the tool logic and building the UI"}),`
`,e.jsx(t.li,{children:"Shiny_Sylveon for writing the guide"}),`
`,e.jsx(t.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function p(n={}){const{wrapper:t}={...d(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(h,{...n})}):h(n)}function i(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default,u as frontmatter};
