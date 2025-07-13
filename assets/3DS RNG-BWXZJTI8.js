import{E as h,j as e}from"./index-Btf4HpkK.js";const a=[{title:"HeartGold and Soulsilver 3DS RNG",navDrawerTitle:"3DS RNG",description:"Learn how to RNG using a 3DS in HeartGold and SoulSilver for shiny, high-IV Pokémon.",slug:"hgss-3ds-rng",category:"HeartGold and SoulSilver",tag:"info",addedOn:"2025-07-03"},{title:"Diamond, Pearl, and Platinum 3DS RNG",navDrawerTitle:"3DS RNG",description:"Learn how to RNG using a 3DS in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.",slug:"dppt-3ds-rng",category:"Diamond, Pearl, and Platinum",tag:"info",addedOn:"2025-07-03"}];function r(s){const n={a:"a",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...h(),...s.components},{Gist:t,YouTubeTable:i}=n;return t||o("Gist"),i||o("YouTubeTable"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsx(n.p,{children:"This page explains why NDS RNG on 3DS can be inconsistent and how to fix it."})}),`
`,e.jsx(n.h2,{children:"Video info"}),`
`,e.jsx(i,{videos:[{title:"Why 3DS RNG is Inconsistent",src:"https://www.youtube.com/embed/-ayvPKWNkNw?si=eA7yboNXFhGl0MUX"}]}),`
`,e.jsx(n.h2,{children:"TLDR"}),`
`,e.jsx(n.p,{children:"Just want the fix?"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:['Our Gen 4 tools have a "3DS Helper" feature! ',e.jsx(n.a,{href:"/3ds-helper",children:"Learn about it here"}),"."]}),`
`,e.jsxs(n.li,{children:["For people with homebrew, there's an even easier method using the ",e.jsx(n.a,{href:"/3ds-alt-settings",children:"3DS Alt Settings app"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"We don't have Gen 5 tools yet, but the 3DS Alt Settings app works for Gen 5 RNG too."}),`
`,e.jsx(n.h2,{children:"The Problem"}),`
`,e.jsx(n.p,{children:"A common issue with NDS RNG on 3DS is inconsistent second values. It's often blamed on TwilightMenu or NDS launch delays, but I was skeptical."}),`
`,e.jsx(n.p,{children:"If launch timing was truly the cause, soft resetting when your timer beeps (the common RNG approach) should fix it, but it doesn't."}),`
`,e.jsx(n.p,{children:"That made me suspect the issue occurs earlier in the process."}),`
`,e.jsx(n.h2,{children:"The Hypothesis"}),`
`,e.jsx(n.p,{children:"The real issue, if not the only one, seems to be how the 3DS sets the system time."}),`
`,e.jsx(n.p,{children:"On many modern systems, manually setting the clock doesn't clear milliseconds, so your system time can carry leftover ms from before the change. For example, setting the time to 14:32:00 with 927ms internally results in 14:32:00.927."}),`
`,e.jsx(n.p,{children:"If the 3DS has the same behavior, the 3DS time would be one second off in just a few milliseconds."}),`
`,e.jsx(n.h2,{children:"The Tests"}),`
`,e.jsx(n.p,{children:"I wrote a research plugin to log timing info in System Settings every frame. Here's what to know from the screenshots:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Now"})," = current system time"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Changed at"})," = frame right before the time was set"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Measured after change"})," = frame right after"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/3DS/3ds-helper-1.webp",alt:"Screenshot 1"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/3DS/3ds-helper-2.webp",alt:"Screenshot 2"})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Findings:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In the first screenshot, the ms portion remains unchanged after setting the time - confirming the hypothesis."}),`
`,e.jsx(n.li,{children:"In the second screenshot, after setting the time to 14:32 at 987 ms, the clock displayed 14:32:01 in less than one second - showing the issue is reproducible."}),`
`]}),`
`,e.jsx(n.h2,{children:"The Fix"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:['Our Gen 4 tools have a "3DS Helper" feature! ',e.jsx(n.a,{href:"/3ds-helper",children:"Learn about it here"}),"."]}),`
`,e.jsxs(n.li,{children:["For people with homebrew, there's an even easier method using the ",e.jsx(n.a,{href:"/3ds-alt-settings",children:"3DS Alt Settings app"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"We don't have Gen 5 tools yet, but the 3DS Alt Settings app works for Gen 5 RNG too."}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Zaksabeast for researching this and writing the tools to fix it"}),`
`]})]})}function d(s={}){const{wrapper:n}={...h(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}function o(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,a as frontmatter};
