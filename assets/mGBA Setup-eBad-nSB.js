import{u as s,j as e}from"./index-BVqKX7Ev.js";const r={title:"mGBA Setup",description:"Setup mGBA for RNG",slug:"mgba-setup",category:"Tools and Emulators",tag:"emu",addedOn:"2025-03-03"};function o(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Tools"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://mgba.io/downloads.html#desktop-os-1",children:"mGBA (development build)"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://github.com/Real96/PokeLua/tree/main/Gen%203/mGBA",children:"Lua scripts"})}),`
`]}),`
`,e.jsx(t.h2,{children:"Set up lua script"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Go to Tools -> Scripting..."}),`
`,e.jsx(t.li,{children:"Then File -> Load Script... and choose the lua script for your game version."}),`
`]}),`
`,e.jsxs(t.p,{children:["Every time you need to save or load a state, hold ",e.jsx(t.code,{children:"Shift + (n)"})," or ",e.jsx(t.code,{children:"(n)"}),` with game unpaused.
This will load the save state to have the script read advances correctly.`]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["For example, ",e.jsx(t.code,{children:"Shift + 1"})," to save a state in slot 1 or ",e.jsx(t.code,{children:"1"})," to load the state in slot 1."]}),`
`]}),`
`,e.jsx(t.h2,{children:"Troubleshooting"}),`
`,e.jsxs(t.h3,{children:["Error: ",e.jsx(t.code,{children:"attempt to call a nil value (method 'setWatchpoint')"})]}),`
`,e.jsx(t.p,{children:"Make sure to use the development build of mGBA linked above. Other versions of mGBA will show this error."})]})}function i(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{i as default,r as frontmatter};
