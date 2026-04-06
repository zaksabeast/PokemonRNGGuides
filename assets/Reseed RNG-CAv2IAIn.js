import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CndXGoE5.js";var n=e(),r={title:`Reseed the RNG using paintings`,navDrawerTitle:`Painting Reseeding`,description:`Learn how to reseed the RNG using paintings in Pokémon Emerald to get the Pokémon you want quickly, without the long wait.`,slug:`emerald-painting-rng`,category:`Emerald`,section:`rng_technique`,variant:`cfw-emu`};function i(e){let r={a:`a`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{PaintingSeedToEmuTimer:i,YouTubeVideo:a}=r;return i||o(`PaintingSeedToEmuTimer`,!0),a||o(`YouTubeVideo`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Video guide`}),`
`,(0,n.jsx)(a,{id:`ydS9HLNmAog`}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`Reseeding the RNG by viewing paintings allows you to avoid waiting for higher advances. Normally, the RNG starts with a predetermined number and generates the same random numbers each time.`}),`
`,(0,n.jsx)(r.p,{children:`By viewing a painting in the game, like the ones in Lilycove Contest Hall, the RNG is reseeded using the video frame counter.`}),`
`,(0,n.jsx)(r.p,{children:`This method can be combined with battle videos to save the new RNG state after viewing the painting.`}),`
`,(0,n.jsx)(r.p,{children:`You can also use this method for Ruby and Sapphire, whether live or for a dry battery.`}),`
`,(0,n.jsx)(r.h2,{children:`Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Find a target seed using PokeFinder.`}),`
`,(0,n.jsx)(r.li,{children:`Right-click on the chosen seed in PokeFinder and select "Generate times for seed."`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Painting RNG`}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Type your target seed in the tool above to find your Target Painting Timer.`}),`
`,(0,n.jsx)(r.li,{children:`In the game, wait for the painting timer shown by the Lua script to equal the Target Painting Timer. View the party menu to prevent NPCs from affecting the RNG.`}),`
`,(0,n.jsx)(r.li,{children:`View the painting at this number to reseed the RNG to the desired seed.`}),`
`,(0,n.jsx)(r.li,{children:`Use the number of advances shown in "Seed to Time" of PokeFinder to finish the RNG as normal.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`German translation: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};