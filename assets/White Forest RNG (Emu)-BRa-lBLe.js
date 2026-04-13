import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DUsdE6jN.js";var n=e(),r=[{title:`White Forest RNG`,navDrawerTitle:`White Forest RNG`,description:`Learn how to RNG Pokémon found exclusively in White Forest in Pokémon White for desired IVs, nature, and shininess.`,slug:`emulator-bw-white-forest`,category:`Black and White`,section:`pokemon_rng`,variant:`cfw-emu`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: This guide assumes you have basic knowledge. You should be able to set up a profile, do a Wild RNG, and understand noise advancing the Seeding.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:`Pokémon White`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: You can edit Trainers/Pokémon available in the White Forest using the PokeCGear Tool (http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021), but this won't be covered in this guide.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Setup`}),`
`,(0,n.jsxs)(r.p,{children:[`The White Forest has a large pool of Pokémon, making it interesting for RNG. Although the game doesn't allow you to use Sweet Scent, it has a helpful feature: `,(0,n.jsx)(r.strong,{children:`The first step in grass or water upon entering the White Forest will lead to an encounter 100% of the time.`})]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open Desmume and load the Lua scripts. Find a Target Spread on PokeFinder, preferably around 150-200 PID Frames.`}),`
`,(0,n.jsx)(r.li,{children:`Go outside the White Forest. It's best to save at Route 14, near the gates. The grass patch seems closer there, but you can also do this from Route 15.`}),`
`,(0,n.jsx)(r.li,{children:`Walk until your IV Frame Count increases. This means when you reset for RNG, you can reach the grass patch without worrying about random IV Frame advances.`}),`
`,(0,n.jsx)(r.li,{children:`Save and perform the Initial Seed RNG. Do not load the C-Gear.`}),`
`,(0,n.jsx)(r.li,{children:`Once in-game, enter quickly and go next to the patch that will trigger an encounter. Open the menu.`}),`
`,(0,n.jsx)(r.li,{children:`Create a save state here. Let the game run briefly and find a long advance (a moment when the PID Frame doesn't advance at all) to do a step. Once you find one, reload the state, advance to it again, and go into the party as soon as you hit it. Use Chatots to reach your target frame. Close all menus and take your step.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Congrats! You've set up your RNG in White Forest!`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};