import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-B5eGYVya.js";var n=e(),r={title:`VBlank in Emerald`,navDrawerTitle:`VBlank`,description:`What are Vblanks in Emerald and their impact on Pokémon generation.`,slug:`gba-vblank`,category:[`Ruby and Sapphire`,`FireRed and LeafGreen`,`Emerald`],section:`technical_info`,orderPriority:0,addedOn:`2025-04-08`};function i(e){let r={a:`a`,h2:`h2`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gist:i,Text:a}=r;return i||o(`Gist`,!0),a||o(`Text`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:`Gist: What are Vblanks and their impact on Pokémon generation.`}),`
`,(0,n.jsx)(r.h2,{children:`What are Vblanks?`}),`
`,(0,n.jsx)(r.p,{children:`A vblank interrupt is the mechanism used by the GBA to refresh the screen. It is triggered every 1/60th of a second independently from regular game logic execution.`}),`
`,(0,n.jsx)(r.p,{children:`When a vblank interrupt occurs, the regular game program execution is paused, vblank associated code is executed, then the regular game program resumes.`}),`
`,(0,n.jsx)(r.p,{children:`In GBA Pokémon games, the vblank associated code updates the RNG to advance by 1. This means that every 1/60th of a second, the RNG advances by 1.`}),`
`,(0,n.jsx)(r.h2,{children:`Impact of vblanks`}),`
`,(0,n.jsx)(r.p,{children:`Here's the simplified logic for Pokémon generation:`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Step`}),(0,n.jsx)(r.th,{children:`Advance At Step Start`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate IVs`}),(0,n.jsx)(r.td,{children:`2`})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`In most cases, this is exactly what happens, and the Pokémon is generating with RNG advance 1 and 2.`}),`
`,(0,n.jsx)(r.p,{children:`However, in some rare cases, a vblank occurs seemingly out of nowhere and alters the generation:`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Step`}),(0,n.jsx)(r.th,{children:`Advance At Step Start`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`VBLANK: Advance RNG`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`2`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate IVs`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Red`,strong:!0,children:`3`})})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`Even though the Pokémon generation started on the same RNG advance, the resulting IVs are different because they were generated with advance 3 instead of advance 2.`}),`
`,(0,n.jsx)(r.h2,{children:`Vblanks Frequency`}),`
`,(0,n.jsx)(r.p,{children:`As stated before, a vblank occurs every 1/60th of a second, more specifically every 280'896 CPU instruction cycles. Every operation performed by the GBA (ex: addition, loading data) takes a certain number of CPU instruction cycles.`}),`
`,(0,n.jsx)(r.p,{children:`The more instruction cycles a Pokémon generation step takes, the more likely a vblank will occur during it.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Ex: A step that takes 28'000 cycles will have ~10% chance to have a vblank.`}),`
`,(0,n.jsx)(r.li,{children:`Ex: A step that takes 300'000 cycles is guaranteed to have at least 1 vblank, possibly 2.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`The generation of a stationary Pokémon takes few instructions, which makes vblank rare.`}),`
`,(0,n.jsx)(r.p,{children:`In the other hand, wild Pokémon generation with a Synchronize lead can take a lot of instructions, which makes vblanks a lot more common.`}),`
`,(0,n.jsxs)(r.p,{children:[`Fortunately, in most cases, vblanks occurring during the Pokémon generation don't actually impact the resulting Pokémon. But sometimes, they do impact and cause what we call `,(0,n.jsx)(r.a,{href:`/gba-methods`,children:`Methods 2-4`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};