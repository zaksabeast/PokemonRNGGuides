import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-jyHeP0dh.js";var n=e(),r={title:`Diamond, Pearl, and Platinum Static RNG`,navDrawerTitle:`Legend, Gift, and Fossil RNG`,description:`Learn how to RNG static Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies.`,slug:`emulator-dppt-stationary`,category:`Diamond, Pearl, and Platinum`,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume with lua scripts`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Set up`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder -> Gen 4 -> Static -> Searcher. Select the Pokemon you want in Settings.`}),`
`,(0,n.jsx)(r.li,{children:`Set up or select correct profile and adjust filters as wanted.`}),`
`,(0,n.jsx)(r.li,{children:`Search for a target seed and its advances.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`RNG Initial Seed`}),`
`,(0,n.jsxs)(r.p,{children:[`Follow `,(0,n.jsx)(r.a,{href:`/dppt-initial-seed`,children:`this guide to RNG the initial seed`}),` found above.`]}),`
`,(0,n.jsx)(r.h2,{children:`Advance RNG`}),`
`,(0,n.jsxs)(r.p,{children:[`Follow `,(0,n.jsx)(r.a,{href:`/dppt-advance-rng`,children:`this guide to advance the RNG`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Calibration`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Navigate to the Generator tab in PokeFinder.`}),`
`,(0,n.jsx)(r.li,{children:`Input the initial seed and the Pokemon you are RNGing.`}),`
`,(0,n.jsx)(r.li,{children:`Search for the Pokemon you got.`}),`
`,(0,n.jsx)(r.li,{children:`Adjust the delay and try again.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Target Advance - Advance Hit = Delay
`})}),`
`,(0,n.jsx)(r.h2,{children:`Unique Cases`}),`
`,(0,n.jsx)(r.p,{children:`If you want to RNG Giratina in the Distortion World, it's trickier. When you enter the Distortion World, the RNG advances by 11, and you have 12 advances when encountering Giratina. So, you need to factor in an initial advance of 23 since you will load the Distortion World at least once if using the journal method.`}),`
`,(0,n.jsx)(r.p,{children:`For Sinnoh starters in Diamond and Pearl, save on the route before entering the lake. It will also be easier with a shiny target advance of 0. In Platinum, it's more difficult due to noise.`}),`
`,(0,n.jsx)(r.p,{children:`Cresselia and Mesprit are generated the first time you talk to them, so RNG them before they escape.`}),`
`,(0,n.jsx)(r.p,{children:`When talking to Prof. Oak for the Kanto birds, Moltres has an initial advance of 1, Zapdos of 6, and Articuno of 11. It’s suggested to use the E4 method: defeat the target, then RNG by talking to Oak again.`}),`
`,(0,n.jsx)(r.h2,{children:`Manaphy Egg RNG`}),`
`,(0,n.jsx)(r.p,{children:`The Manaphy egg is received like a Wondercard Pokémon, but it uses Method 1 generation. The Wondercard follows normal RNG rules.`}),`
`,(0,n.jsx)(r.p,{children:`Manaphy has a shiny lock that prevents it from hatching shiny in the game it’s obtained in. To bypass this, RNG the Manaphy to hatch shiny in a different game.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Know the shiny PID for Game A.`}),`
`,(0,n.jsx)(r.li,{children:`In Game B, obtain the egg with that PID.`}),`
`,(0,n.jsx)(r.li,{children:`Trade the egg from Game B to Game A.`}),`
`,(0,n.jsx)(r.li,{children:`Hatch the egg in Game A.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Congratulations, you now have a shiny Manaphy!`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};