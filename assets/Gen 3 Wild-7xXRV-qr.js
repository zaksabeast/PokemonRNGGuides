import{ga as a,j as e}from"./index-C0QdZ5Ks.js";const d=[{title:"Emerald Wild Searcher",description:"Emerald Wild Searcher",slug:"emerald-wild",category:"Emerald",section:"guide",variant:"retail",isRoughDraft:!0}];function r(t){const n={h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...a(),...t.components},{Wild3MethodDistribution:i,Wild3SearcherFindTarget:o}=n;return i||l("Wild3MethodDistribution"),o||l("Wild3SearcherFindTarget"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Searcher"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use case"}),": Determine the best setup (map, advance, lead) to obtain the wanted target Pokémon."]}),`
`,e.jsx(o,{game:"emerald"}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{children:"Generate All Methods At Once"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"What it does"}),": Given a setup (map, advance, lead), calculate the Pokémon outcome for every method (Wild1-Wild5) and their likelihood."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use case"}),": Determine if the likehood of hitting your target Pokémon is good enough with your actual lead."]}),`
`,e.jsx(i,{game:"emerald"}),`
`,e.jsx(n.h2,{children:"Coming soon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fix a bug causing some Wild5 method results to be missing."}),`
`,e.jsx(n.li,{children:"Improve the search so it finds optimal painting seeds."}),`
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
`]})]})}function c(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}function l(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,d as frontmatter};
