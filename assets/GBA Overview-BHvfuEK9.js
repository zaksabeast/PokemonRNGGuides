import{u as s,j as e}from"./index-W2y165gb.js";const d={title:"GBA Overview",navDrawerTitle:"Overview",description:"Particularities, key RNG concepts, and version differences of GBA games.",slug:"gba-overview",category:"GBA Overview",tag:"any",addedOn:"2025-04-08"};function r(t){const n={a:"a",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...t.components},{Gist:i}=n;return i||a("Gist"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsx(n.p,{children:"Gist: Particularities, key RNG concepts, and version differences of GBA games."})}),`
`,e.jsx(n.h3,{children:"Particularities of GBA RNG Manipulation"}),`
`,e.jsx(n.p,{children:"In GBA games, the RNG advances every in-game video frame (every 1/60th of a second). This means RNG manipulation requires pressing A with a 1/60th second precision, making it more difficult than the DS generation."}),`
`,e.jsxs(n.p,{children:["RNG manipulation for very rare traits can require waiting for a very long time (1h+ for each attempt). Fortunately, some advanced techniques exist ",e.jsx(n.a,{href:"/e-tips-rng",children:"to speed up RNG advances"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"/gba-vblank",children:"vblanks"})," can cause hard to predict RNG advances during the Pokémon generation, altering the outcome unexpectely. Those unexpected advances are the source of the differences between ",e.jsx(n.a,{href:"/gba-methods",children:"Methods 1-4"}),"."]}),`
`,e.jsx(n.p,{children:"Still, they are good reasons to RNG manipulate in GBA games, most notably:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Only way to obtain all Ribbons on a Pokémon."}),`
`,e.jsx(n.li,{children:"Only way to obtain Shiny Mew and Shiny Deoxys."}),`
`]}),`
`,e.jsx(n.h3,{children:"GBA RNG Mechanisms Overview"}),`
`,e.jsx(n.p,{children:"There is only 1 type of RNG for Pokémon generation. It is used to generate the PID (which dictates Nature, Ability, Shininess) and IVs."}),`
`,e.jsxs(n.p,{children:["Shininess depends on PID, TID, and SID. This means you must ",e.jsx(n.a,{href:"/gen3-sid",children:"know your SID"})," to RNG manipulate a shiny Pokémon."]}),`
`,e.jsx(n.h3,{children:"Key Differences between GBA Games"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Game"}),e.jsx(n.th,{children:"Initial Seed"}),e.jsx(n.th,{children:"Useful For"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"/emerald-overview",children:"Pokémon Emerald"})}),e.jsx(n.td,{children:"Normally 0"}),e.jsx(n.td,{children:"Easiest to RNG Static, Wild, and Egg Pokémon"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Ruby & Sapphire"}),e.jsxs(n.td,{children:["With live battery: Random.",e.jsx("br",{}),"With dead battery: Normally 5A0"]}),e.jsx(n.td,{children:"Access to level 45 Groudon and Kyogre"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"FireRed & LeafGreen"}),e.jsx(n.td,{children:"Random"}),e.jsxs(n.td,{children:["Only way to get Shiny Mewtwo and Unown",e.jsx("br",{}),"Easiest way to get Shiny Articuno, Zapdos, Moltres"]})]})]})]}),`
`,e.jsx(n.h3,{children:"Console Interoperability"}),`
`,e.jsx(n.p,{children:"Pokémon can be traded between GBA and GameCube games."}),`
`,e.jsx(n.p,{children:"GameCube games are specifically useful for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Only way to obtain ",e.jsx(n.a,{href:"/emulator-rs-wishmaker",children:"Shiny Jirachi"}),"."]}),`
`,e.jsx(n.li,{children:"Obtaining Entei, Raikou, Suicune with rare traits is easier than on GBA games."}),`
`]}),`
`,e.jsx(n.p,{children:"Pokémon can be transfered from GBA to DS games, but not the other way around."})]})}function l(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}function a(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default,d as frontmatter};
