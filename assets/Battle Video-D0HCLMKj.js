import{w as o,j as e}from"./index-BKW_koWY.js";const d=[{title:"Battle Video",navDrawerTitle:"Battle Video",description:"How to create an optimal Battle Video to save and restore the RNG state.",slug:"emerald-battle-video",category:"Emerald",section:"rng_technique",variant:"retail",addedOn:"2026-03-24"}];function r(n){const t={a:"a",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...n.components},{BattleVideo:i,Gist:a}=t;return i||s("BattleVideo"),a||s("Gist"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsx(t.p,{children:"Gist: How to create an optimal Battle Video or update an existing one."})}),`
`,e.jsx(t.h2,{children:"Prerequisite"}),`
`,e.jsxs(t.p,{children:["It is recommended to first read ",e.jsx(t.a,{href:"/emerald-advancing-rng-techniques",children:"Overview of RNG Advancing Techniques"}),"."]}),`
`,e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Battle Video is a RNG technique to save and restore the RNG state. Using that technique, players only need to wait the full delay of their RNG manipulation once. Afterwards, each retry is very quick."}),`
`,e.jsx(t.p,{children:'After winning or losing a battle at the Battle Frontier, players can record their battle. The RNG state at the start of the battle is saved into the battle record. Players can watch their battle anywhere by opening their trainer card and selecting "Battle Record". By doing so, the current RNG state is reseeded with the RNG state at the start of the recorded battle.'}),`
`,e.jsx(t.p,{children:"The RNG state saved on the battle record must leave sufficient time to perform the action required by the RNG manipulation."}),`
`,e.jsx(t.h2,{children:"Cases"}),`
`,e.jsx(t.p,{children:"Battle Video is used 3 cases:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Creating a Battle Video from scratch."}),`
`,e.jsx(t.li,{children:"Update an existing Battle Video because the current one has too much waiting."}),`
`,e.jsx(t.li,{children:"Creating a Battle Video after successful Painting Reseeding."}),`
`]}),`
`,e.jsx(t.p,{children:"The 2 first cases are covered in this guide. Battle Video in the context of Painting Reseeding will be covered in another guide."}),`
`,e.jsx(t.p,{children:"Creating a Battle Video requires waiting for the RNG state to reach the wanted advance. The easiest way is to wait in front of the Battle Frontier clerk. However, it is also possible to do most of the waiting while in battle, which advanced the RNG twice as fast. The webtool supports both approaches."}),`
`,e.jsx(t.h2,{children:"Webtool and Instructions"}),`
`,e.jsx(i,{}),`
`,e.jsx(t.h2,{children:"Credits"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"RainingChain"}),`
`,e.jsx(t.li,{children:"German translation: Parasite"}),`
`]})]})}function c(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}function s(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,d as frontmatter};
