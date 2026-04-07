import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DzYB2I0T.js";var n=e(),r=[{title:`Black 2 and White 2 Dream Radar RNG`,navDrawerTitle:`Dream Radar RNG`,description:`Learn how to RNG Level 5 Dream Ball legendary Pokémon with Hidden Abilities in Black 2 and White 2.`,slug:`emulator-b2w2-dream-radar`,category:[`Black 2 and White 2`,`Transporter and Dream Radar`],section:`pokemon_rng`,variant:`cfw-emu`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/RNGReporter/releases`,children:`RNG Reporter`})}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://github.com/suloku/BW_tool/releases`,children:`Suloku's Gen V Save Tool (Optional)`}),`. You can also extract your BW2 save file after getting the Pokémon you want from the Dream Radar if you prefer not to inject.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The "Dream Radar" tab in RNG Reporter does not work at this time. This guide will explain an alternate way to find seeds and desired IV/Nature combinations.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Finding a spread`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open RNG Reporter and go to "Gen 5 Time Finder". Stay on the "Capture" tab and adjust the settings.`}),`
`,(0,n.jsx)(r.li,{children:`Set IVs to your preference, Encounter Type to "Wild Pokémon", and the method to "IVs (Standard Seed)".`}),`
`,(0,n.jsx)(r.li,{children:`Minimum IV frame for the Therian Trio (Tornadus, Thundurus, Landorus) is 21. For other Pokémon, it's 8. Set the maximum frame to your liking.`}),`
`,(0,n.jsx)(r.li,{children:`Hit search and wait for results.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black2-and-White2/Dream-Radar/Timefinder.png`,alt:`Timefinder`})}),`
`,(0,n.jsx)(r.p,{children:`Target even IV frames for Generation 4 Legendaries or random Pokémon, and target odd IV frames for Therian-Forme Pokémon.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Finding a nature (Optional)`}),`
`,(0,n.jsx)(r.p,{children:`To find the nature, go to the main RNG Reporter screen and select "Gen 5 PIDRNG". You cannot control Dream Radar nature, only predict it.`}),`
`,(0,n.jsx)(r.p,{children:`Use the formula below to find the nature based on your seed.`}),`
`,(0,n.jsx)(r.h3,{children:`Therian Trio`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`(Your IV Frame - 21) / 2 = Number of required advancements.`}),`
`,(0,n.jsx)(r.li,{children:`Initial PIDRNG Frame + 7 + Required advancements = PID Frame you will hit.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`G4 Box Legends and Gendered Pokémon`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`(Your IV Frame - 8) / 2 = Number of required advancements.`}),`
`,(0,n.jsx)(r.li,{children:`Initial PIDRNG Frame + 2 + (2 * Required advancements) = PID Frame you will hit.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Genderless Pokémon`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`(Your IV Frame - 8) / 2 = Number of required advancements.`}),`
`,(0,n.jsx)(r.li,{children:`Initial PIDRNG Frame + 1 + (2 * Required advancements) = PID Frame you will hit.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: RNGing the Pokémon`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Use Key System's "Send and Receive Keys" function to frame advance. Each time you start the "Send and Receive Keys" search, it will advance both the PIDRNG and IVRNG Frames by 2.`}),`
`,(0,n.jsx)(r.li,{children:`Obtain your Pokémon. In the example below, we have a Dream Ball hidden ability Landorus!`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black2-and-White2/Dream-Radar/Result.png`,alt:`Result`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};