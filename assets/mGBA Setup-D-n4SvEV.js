import{q as s,j as e}from"./index-CvYLl93g.js";const r={title:"mGBA Setup",description:"Learn how to set up mGBA for GBA Pokémon RNG, including lua scripting support.",slug:"mgba-setup",category:"GBA Tools",tag:"emu",addedOn:"2025-03-03"};function o(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://mgba.io/downloads.html#desktop-os-1",children:"mGBA (development build)"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Real96/PokeLua/tree/main/Gen%203/mGBA",children:"Lua scripts"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Set up lua script"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go to Tools -> Scripting..."}),`
`,e.jsx(n.li,{children:"Then File -> Load Script... and choose the lua script for your game version."}),`
`]}),`
`,e.jsxs(n.p,{children:["Every time you need to save or load a state, hold ",e.jsx(n.code,{children:"Shift + (n)"})," or ",e.jsx(n.code,{children:"(n)"}),` with game unpaused.
This will load the save state to have the script read advances correctly.`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For example, ",e.jsx(n.code,{children:"Shift + 1"})," to save a state in slot 1 or ",e.jsx(n.code,{children:"1"})," to load the state in slot 1."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsxs(n.h3,{children:["Error: ",e.jsx(n.code,{children:"attempt to call a nil value (method 'setWatchpoint')"})]}),`
`,e.jsx(n.p,{children:"Make sure to use the development build of mGBA linked above. Other versions of mGBA will show this error."}),`
`,e.jsxs(n.h3,{children:["Error: ",e.jsx(n.code,{children:"attempt to index a nil value (global 'emu')"})]}),`
`,e.jsx(n.p,{children:"Make sure you have loaded a rom before attempting to run your lua script."}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: Hakuhiro."}),`
`]})]})}function i(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{i as default,r as frontmatter};
