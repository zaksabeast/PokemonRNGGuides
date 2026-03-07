import{ic as s,j as e}from"./index-i78DV5Dt.js";const a=[{title:"Emerald Wild Searcher",description:"Emerald Wild Searcher",slug:"emerald-wild",category:"Emerald",section:"pokemon_rng",variant:"retail",isRoughDraft:!0}];function r(i){const n={h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...i.components},{Wild3MethodDistribution:t,Wild3SearcherFindTarget:o}=n;return t||l("Wild3MethodDistribution"),o||l("Wild3SearcherFindTarget"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Searcher"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use case"}),": Determine the best setup (map, advance, lead) to obtain the wanted target Pokémon."]}),`
`,e.jsx(o,{}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{children:"Generate All Methods At Once"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"What it does"}),": Given a setup (map, advance, lead), calculate the Pokémon outcome for every method (Wild1-Wild5) and their likelihood."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use case"}),": Determine if the likelihood of hitting your target Pokémon is good enough with your actual lead."]}),`
`,e.jsx(t,{}),`
`,e.jsx(n.h2,{children:"Coming soon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fix a bug causing some Wild5 method results to be missing."}),`
`,e.jsx(n.li,{children:"Improve the search so it finds optimal painting seeds."}),`
`,e.jsx(n.li,{children:"Add support for Latios and Latias."}),`
`,e.jsx(n.li,{children:"Add support for Safari Zone."}),`
`,e.jsx(n.li,{children:"Add a textual guide for the Emerald Wild Searcher."}),`
`,e.jsx(n.li,{children:"Add a calibration tool."}),`
`,e.jsx(n.li,{children:"Improve performance."}),`
`]}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"RainingChain: Research about cycle range to estimate method likelihood. Creation of the multi-lead searcher, multi-method generator, and the web UI tool."}),`
`,e.jsx(n.li,{children:"Sorendog: Original Wild generation tool."}),`
`,e.jsx(n.li,{children:"Shao: Function to calculate cycles taken by modulo operations."}),`
`]})]})}function c(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}function l(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,a as frontmatter};
