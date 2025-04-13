import{u as o,j as e}from"./index-OHtGuHlA.js";const d={title:"VBlank",description:"What are Vblanks and their impact on Pokémon generation.",slug:"gba-vblank",category:"GBA Technical Documentation",tag:"any",addedOn:"2025-04-08"};function a(t){const n={a:"a",h2:"h2",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...t.components},{Gist:s,Text:r}=n;return s||i("Gist"),r||i("Text"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Gist: What are Vblanks and their impact on Pokémon generation."}),`
`,e.jsx(n.h2,{children:"What are Vblanks?"}),`
`,e.jsx(n.p,{children:"A vblank interrupt is the mechanism used by the GBA to refresh the screen. It is triggered every 1/60th of a second independently from regular game logic execution."}),`
`,e.jsx(n.p,{children:"When a vblank interrupt occurs, the regular game program execution is paused, vblank associated code is executed, then the regular game program resumes."}),`
`,e.jsx(n.p,{children:"In GBA Pokémon games, the vblank associated code updates the RNG to advance by 1. This means that every 1/60th of a second, the RNG advances by 1."}),`
`,e.jsx(n.h2,{children:"Impact of vblanks"}),`
`,e.jsx(n.p,{children:"Here's the simplified logic for Pokémon generation:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Step"}),e.jsx(n.th,{children:"Advance At Step Start"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate IVs"}),e.jsx(n.td,{children:"2"})]})]})]}),`
`,e.jsx(n.p,{children:"In most cases, this is exactly what happens, and the Pokémon is generating with RNG advance 1 and 2."}),`
`,e.jsx(n.p,{children:"However, in some rare cases, a vblank occurs seemingly out of nowhere and alters the generation:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Step"}),e.jsx(n.th,{children:"Advance At Step Start"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(r,{color:"Green",strong:!0,children:"VBLANK: Advance RNG"})}),e.jsx(n.td,{children:e.jsx(r,{color:"Green",strong:!0,children:"2"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate IVs"}),e.jsx(n.td,{children:e.jsx(r,{color:"Red",strong:!0,children:"3"})})]})]})]}),`
`,e.jsx(n.p,{children:"Even though the Pokémon generation started on the same RNG advance, the resulting IVs are different because they were generated with advance 3 instead of advance 2."}),`
`,e.jsx(n.h2,{children:"Vblanks Frequency"}),`
`,e.jsx(n.p,{children:"As stated before, a vblank occurs every 1/60th of a second, more specifically every 280'896 CPU instruction cycles. Every operation performed by the GBA (ex: addition, loading data) takes a certain number of CPU instruction cycles."}),`
`,e.jsx(n.p,{children:"The more instruction cycles a Pokémon generation step takes, the more likely a vblank will occur during it."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ex: A step that takes 28'000 cycles will have ~10% chance to have a vblank."}),`
`,e.jsx(n.li,{children:"Ex: A step that takes 300'000 cycles is guaranteed to have at least 1 vblank, possibly 2."}),`
`]}),`
`,e.jsx(n.p,{children:"The generation of a stationary Pokémon takes few instructions, which makes vblank rare."}),`
`,e.jsx(n.p,{children:"In the other hand, wild Pokémon generation with a Synchronize lead can take a lot of instructions, which makes vblanks a lot more common."}),`
`,e.jsxs(n.p,{children:["Fortunately, in most cases, vblanks occuring during the Pokémon generation don't actually impact the resulting Pokémon. But sometimes, they do impact and cause what we call ",e.jsx(n.a,{href:"/gba-methods",children:"Methods 2-4"}),"."]})]})}function h(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,d as frontmatter};
