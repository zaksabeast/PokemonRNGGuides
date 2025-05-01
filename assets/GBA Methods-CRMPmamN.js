import{u as h,j as e}from"./index-C0zE1Mnn.js";const l={title:"Methods 1-4 in Emerald",navDrawerTitle:"Methods 1-4",description:"What is a Method, the reason why Methods 1-4 exist, and how they impact Pokémon generation.",slug:"gba-methods",category:"GBA Technical Documentation",tag:"any",addedOn:"2025-04-08"};function d(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...h(),...t.components},{Gist:s,Text:r}=n;return s||i("Gist"),r||i("Text"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsx(n.p,{children:`Gist: What is a Method, the reason why Methods 1-4 exist, and how they impact
Pokémon generation.`})}),`
`,e.jsx(n.h3,{children:"What is a Method"}),`
`,e.jsx(n.p,{children:"A method indicates how a Pokémon will be generated for a given RNG advance."}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"RNG Advance + Method => Pokémon generation result"})}),`
`,e.jsx(n.p,{children:"A method is split into 2 components (ex: Wild-2):"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Prefix: The program CPU instructions used to generate it. (ex: Wild)."}),`
`,e.jsx(n.li,{children:"Suffix: When the Vblanks occured (ex: 2)."}),`
`]}),`
`,e.jsx(n.h3,{children:"Method Prefix: Program CPU Instructions"}),`
`,e.jsx(n.p,{children:"The program CPU instructions depends on how the Pokémon is encountered. For RNG manipulations, 3 of them are relevant:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Stationary Pokémon: Prefix is "Method" (Not convenient, I know...).'}),`
`,e.jsx(n.li,{children:'Wild Pokémon: Prefix is "Wild" or "H".'}),`
`,e.jsx(n.li,{children:'Egg Pokémon: Prefix is "Egg".'}),`
`]}),`
`,e.jsx(n.p,{children:"Program CPU instructions for Stationary Pokémon are the simplest. The GBA game generates PID then IVs, without additional RNG logic."}),`
`,e.jsx(n.p,{children:"Instructions for Wild Pokémon determine the encountered species from Encounter Table, apply Synchronize lead logic which can force multiple PID to be generated, then generate IVs."}),`
`,e.jsx(n.p,{children:"Instructions for Egg Pokémon select inherited stats from parents and more. This guide won't cover Egg generation in details."}),`
`,e.jsx(n.h3,{children:"Method Suffix: Vblank occurence"}),`
`,e.jsxs(n.p,{children:["As explained in ",e.jsx(n.a,{href:"/gba-vblank",children:"Understanding VBlanks"}),", Vblanks can occur seemingly at any time, altering the Pokémon generation."]}),`
`,e.jsx(n.p,{children:"How exactly the Pokémon generation will be affected depends if a Vblank occurs and on which program instruction exactly."}),`
`,e.jsx(n.p,{children:"This depends on many factors such as the map, background music, lead PID, the game played and how it is played (ex: via Pokémon Box Ruby & Sapphire)."}),`
`,e.jsx(n.h2,{children:"List of Methods"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Instructions"}),e.jsx(n.th,{children:"Methods"}),e.jsx(n.th,{children:"Rarity"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Stationary"}),e.jsxs(n.td,{children:["Method-1",e.jsx("br",{}),"Method-4"]}),e.jsxs(n.td,{children:["Very common",e.jsx("br",{}),"Very rare"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Wild"}),e.jsxs(n.td,{children:["Wild-1",e.jsx("br",{}),"Wild-2",e.jsx("br",{}),"Wild-4"]}),e.jsxs(n.td,{children:["Very rare",e.jsx("br",{}),"Very common",e.jsx("br",{}),"Very rare"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Egg"}),e.jsxs(n.td,{children:["Egg-Normal",e.jsx("br",{}),"Egg-Split",e.jsx("br",{}),"Egg-Alternate"]}),e.jsxs(n.td,{children:["Common",e.jsx("br",{}),"Common",e.jsx("br",{}),"Uncommon"]})]})]})]}),`
`,e.jsx(n.h3,{children:"Method-1 and Wild-1"}),`
`,e.jsx(n.p,{children:"Here's the game logic for generating a Pokémon:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Step"}),e.jsx(n.th,{children:"Advance At Step Start"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate 1st half PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate 2nd half PID"}),e.jsx(n.td,{children:"2"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate Def, Atk, HP IVs"}),e.jsx(n.td,{children:"3"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate SpD, SpA, Spe IVs"}),e.jsx(n.td,{children:"4"})]})]})]}),`
`,e.jsx(n.p,{children:"Method-1 and Wild-1 is when a Pokémon is generated and no vblanks occur. The Pokémon is generated using the value of the RNG of advances 1,2,3,4."}),`
`,e.jsx(n.h3,{children:"Wild-2"}),`
`,e.jsx(n.p,{children:'Wild-2 is when a vblank occurs between the steps "Generate 2nd half PID" and "Generate Def, Atk, HP IVs".'}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Step"}),e.jsx(n.th,{children:"Advance At Step Start"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate 1st half PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate 2nd half PID"}),e.jsx(n.td,{children:"2"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(r,{color:"Green",strong:!0,children:"VBLANK: Advance RNG"})}),e.jsx(n.td,{children:e.jsx(r,{color:"Green",strong:!0,children:"3"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate Def, Atk, HP IVs"}),e.jsx(n.td,{children:e.jsx(r,{strong:!0,children:"4"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate SpD, SpA, Spe IVs"}),e.jsx(n.td,{children:e.jsx(r,{strong:!0,children:"5"})})]})]})]}),`
`,e.jsx(n.p,{children:"The Pokémon is generated using the value of the RNG of advances 1,2,4,5. The RNG value of advance 3 has no impact on the generated Pokémon."}),`
`,e.jsx(n.h3,{children:"Method-4 and Wild-4"}),`
`,e.jsx(n.p,{children:'Method-4 and Wild-4 are when a vblank occurs between the steps "Generate Def, Atk, HP IVs" and "Generate SpD, SpA, Spe IVs".'}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Step"}),e.jsx(n.th,{children:"Advance At Step Start"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate 1st half PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate 2nd half PID"}),e.jsx(n.td,{children:"2"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate Def, Atk, HP IVs"}),e.jsx(n.td,{children:"3"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(r,{color:"Green",strong:!0,children:"VBLANK: Advance RNG"})}),e.jsx(n.td,{children:e.jsx(r,{color:"Green",strong:!0,children:"4"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generate SpD, SpA, Spe IVs"}),e.jsx(n.td,{children:e.jsx(r,{strong:!0,children:"5"})})]})]})]}),`
`,e.jsx(n.p,{children:"The Pokémon is generated using the value of the RNG of advances 1,2,3,5. The RNG value of advance 4 has no impact on the generated Pokémon."}),`
`,e.jsx(n.h3,{children:"Additional Methods"}),`
`,e.jsx(n.p,{children:`In theory, it is possible for Vblanks to occur between the steps "Generate 1st half PID" and "Generate 2nd half PID", which would result in Wild-3.
However, because there are so few instructions in-between those steps, a Vblank very rarely occurs there.`}),`
`,e.jsx(n.p,{children:"It is also theorically possible for Vblanks to occur during a very specific instruction in the RNG update, causing the RNG update to be skipped."})]})}function c(t={}){const{wrapper:n}={...h(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,l as frontmatter};
