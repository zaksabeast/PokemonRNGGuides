import{u as a,j as e}from"./index-CTZgPBwS.js";const o={title:"Diamond, Pearl, and Platinum Static RNG",navDrawerTitle:"Static RNG",description:"Learn how to RNG static Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies.",slug:"emulator-dppt-stationary",category:"Diamond, Pearl, and Platinum",tag:"emu"};function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume with lua scripts"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Set up"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder -> Gen 4 -> Static -> Searcher. Select the Pokemon you want in Settings."}),`
`,e.jsx(n.li,{children:"Set up or select correct profile and adjust filters as wanted."}),`
`,e.jsx(n.li,{children:"Search for a target seed and its advances."}),`
`]}),`
`,e.jsx(n.h2,{children:"RNG Initial Seed"}),`
`,e.jsxs(n.p,{children:["Follow ",e.jsx(n.a,{href:"/dppt-initial-seed",children:"this guide to RNG the initial seed"})," found above."]}),`
`,e.jsx(n.h2,{children:"Advance RNG"}),`
`,e.jsxs(n.p,{children:["Follow ",e.jsx(n.a,{href:"/dppt-advance-rng",children:"this guide to advance the RNG"}),"."]}),`
`,e.jsx(n.h2,{children:"Calibration"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Navigate to the Generator tab in PokeFinder."}),`
`,e.jsx(n.li,{children:"Input the initial seed and the Pokemon you are RNGing."}),`
`,e.jsx(n.li,{children:"Search for the Pokemon you got."}),`
`,e.jsx(n.li,{children:"Adjust the delay and try again."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Target Advance - Advance Hit = Delay
`})}),`
`,e.jsx(n.h2,{children:"Unique Cases"}),`
`,e.jsx(n.p,{children:"If you want to RNG Giratina in the Distortion World, it's trickier. When you enter the Distortion World, the RNG advances by 11, and you have 12 advances when encountering Giratina. So, you need to factor in an initial advance of 23 since you will load the Distortion World at least once if using the journal method."}),`
`,e.jsx(n.p,{children:"For Sinnoh starters in Diamond and Pearl, save on the route before entering the lake. It will also be easier with a shiny target advance of 0. In Platinum, it's more difficult due to noise."}),`
`,e.jsx(n.p,{children:"Cresselia and Mesprit are generated the first time you talk to them, so RNG them before they escape."}),`
`,e.jsx(n.p,{children:"When talking to Prof. Oak for the Kanto birds, Moltres has an initial advance of 1, Zapdos of 6, and Articuno of 11. It’s suggested to use the E4 method: defeat the target, then RNG by talking to Oak again."}),`
`,e.jsx(n.h2,{children:"Manaphy Egg RNG"}),`
`,e.jsx(n.p,{children:"The Manaphy egg is received like a Wondercard Pokémon, but it uses Method 1 generation. The Wondercard follows normal RNG rules."}),`
`,e.jsx(n.p,{children:"Manaphy has a shiny lock that prevents it from hatching shiny in the game it’s obtained in. To bypass this, RNG the Manaphy to hatch shiny in a different game."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Know the shiny PID for Game A."}),`
`,e.jsx(n.li,{children:"In Game B, obtain the egg with that PID."}),`
`,e.jsx(n.li,{children:"Trade the egg from Game B to Game A."}),`
`,e.jsx(n.li,{children:"Hatch the egg in Game A."}),`
`]}),`
`,e.jsx(n.p,{children:"Congratulations, you now have a shiny Manaphy!"})]})}function s(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{s as default,o as frontmatter};
