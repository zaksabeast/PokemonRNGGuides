import{u as a,j as e}from"./index-ufF5IZ5h.js";const r={title:"Basic rules of Gen 3 RNG",description:"How to advance the RNG and tips to make everything more stable",slug:"e-tips-rng",subCategory:"Basic Knowledge",isRoughDraft:!0};function i(t){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"Emerald has useful features for RNG seeding, but vblank issues can be frustrating."}),`
`,e.jsx(n.h2,{children:"RNG Methods"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For stationary Pokémon: Method 1."}),`
`,e.jsx(n.li,{children:"For wild encounters: Method H-2."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`When dealing with wild encounters, it's often hit-or-miss. You might have a high vblank rate, making it hard to predict which method to use. There's no guaranteed solution, and you might need to try repeatedly, wasting time for uncertain results.
`})}),`
`,e.jsx(n.h2,{children:"Trainer Card Flip"}),`
`,e.jsxs(n.p,{children:["In Gen 3, flipping your Trainer Card resets noise-related delays, helping you focus on the default delay. You should do this almost reflexively. Access your Trainer Card and press ",e.jsx(n.code,{children:"A"}),". Do this between 10k-5k advances before your target advance to save yourself trouble."]}),`
`,e.jsx(n.h2,{children:"Minimizing Noise"}),`
`,e.jsx(n.p,{children:"To reduce vblank and noise issues, open your Trainer Card at the start of your RNG, perform a flip, close it, and then advance to your target advance. It's a simple but effective strategy."}),`
`,e.jsx(n.h2,{children:"Speeding Up RNG Advances (Including Seeding Help)"}),`
`,e.jsx(n.h3,{children:"Battle Video"}),`
`,e.jsx(n.p,{children:"This method helps with seeding by preserving the RNG's state as an initial seed. Engage in a battle at the Battle Frontier and save it as a video. The video retains the seed from the battle, allowing you to set it as the initial seed when loading. For example, if your target is 1 million advances away, go up to 950k, save a battle video, and upon loading, you'll start at 950k advances."}),`
`,e.jsx(n.p,{children:"While this method is helpful, it's a bit outdated compared to Painting RNG. However, it’s useful when you need to hit a specific advance multiple times."}),`
`,e.jsx(n.h3,{children:"In-Battle"}),`
`,e.jsx(n.p,{children:"Being in battle advances RNG twice as fast. This is particularly helpful for wild Pokémon RNG."}),`
`,e.jsx(n.h3,{children:"Painting RNG"}),`
`,e.jsx(n.p,{children:"Painting RNG is a great method to obtain any desired initial seed. It's a more advanced technique and will be covered in a separate guide."})]})}function o(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,r as frontmatter};
