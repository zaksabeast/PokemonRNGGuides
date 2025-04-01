import{u as a,j as e}from"./index-R5JkGJWU.js";const o={title:"RNG Info",description:"How to advance the RNG and tips to make everything more stable",slug:"e-tips-rng",subCategory:"Basic Knowledge",tag:"any"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"RNG Methods"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For stationary Pokémon: Method 1"}),`
`,e.jsx(n.li,{children:"For wild encounters: Method H-2"}),`
`]}),`
`,e.jsx(n.p,{children:"The different methods for wild encounters are caused by vblank, though H-2 is the most commonly seen."}),`
`,e.jsx(n.h3,{children:"Painting RNG"}),`
`,e.jsxs(n.p,{children:["Painting RNG is a great method to obtain any desired initial seed. It's a more advanced technique and is covered in ",e.jsx(n.a,{href:"/emerald-painting-rng",children:"this guide"}),"."]}),`
`,e.jsx(n.h2,{children:"Trainer Card Flip"}),`
`,e.jsx(n.p,{children:"In Gen 3, flipping your Trainer Card resets noise-related delays, helping you focus on the default delay. You should do this almost every RNG."}),`
`,e.jsxs(n.p,{children:["To flip your trainer card, access your Trainer Card and press ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsx(n.p,{children:"You can do this between 10,000 - 5,000 advances before your target advance."}),`
`,e.jsx(n.h2,{children:"Speeding Up RNG Advances"}),`
`,e.jsx(n.h3,{children:"Battle Video"}),`
`,e.jsx(n.p,{children:"This method helps with seeding by preserving the RNG's state as an initial seed. Engage in a battle at the Battle Frontier and save it as a video. The video retains the seed from the battle, allowing you to set it as the initial seed when loading. For example, if your target is 1 million advances away, go up to 950k, save a battle video, and upon loading, you'll start at 950k advances."}),`
`,e.jsx(n.p,{children:"While this method is helpful, it's a bit outdated compared to Painting RNG. However, it’s useful when you need to hit a specific advance multiple times."}),`
`,e.jsx(n.h3,{children:"In-Battle"}),`
`,e.jsx(n.p,{children:"Being in battle advances RNG twice as fast. This is particularly helpful for wild Pokémon RNG."})]})}function r(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{r as default,o as frontmatter};
