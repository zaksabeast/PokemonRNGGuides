import{u as a,j as e}from"./index-BrBHIMtO.js";const s={title:"White Forest RNG",description:"White Forest RNG",slug:"emulator-bw-white-forest",subCategory:"Emulator"};function o(n){const t={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note: This guide assumes you have basic knowledge. You should be able to set up a profile, do a Wild RNG, and understand noise advancing the Seeding.
`})}),`
`,e.jsx(t.h2,{children:"Tools"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Desmume (9.11 is the best option)"}),`
`,e.jsx(t.li,{children:"Lua Script (Only available on the Discord at the moment)"}),`
`,e.jsx(t.li,{children:"Pokémon White"}),`
`,e.jsx(t.li,{children:"RNG Reporter"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note: You can edit Trainers/Pokémon available in the White Forest using the PokeCGear Tool (http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021), but this won't be covered in this guide.
`})}),`
`,e.jsx(t.h2,{children:"Setup"}),`
`,e.jsxs(t.p,{children:["The White Forest has a large pool of Pokémon, making it interesting for RNG. Although the game doesn't allow you to use Sweet Scent, it has a helpful feature: ",e.jsx(t.strong,{children:"The first step in grass or water upon entering the White Forest will lead to an encounter 100% of the time."})]}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Open Desmume and load the Lua scripts. Find a Target Spread on PokeFinder, preferably around 150-200 PID Frames."}),`
`,e.jsx(t.li,{children:"Go outside the White Forest. It's best to save at Route 14, near the gates. The grass patch seems closer there, but you can also do this from Route 15."}),`
`,e.jsx(t.li,{children:"Walk until your IV Frame Count increases. This means when you reset for RNG, you can reach the grass patch without worrying about random IV Frame advances."}),`
`,e.jsx(t.li,{children:"Save and perform the Initial Seed RNG. Do not load the C-Gear."}),`
`,e.jsx(t.li,{children:"Once in-game, enter quickly and go next to the patch that will trigger an encounter. Open the menu."}),`
`,e.jsx(t.li,{children:"Create a save state here. Let the game run briefly and find a long advance (a moment when the PID Frame doesn't advance at all) to do a step. Once you find one, reload the state, advance to it again, and go into the party as soon as you hit it. Use Chatots to reach your target frame. Close all menus and take your step."}),`
`]}),`
`,e.jsx(t.p,{children:"Congrats! You've set up your RNG in White Forest!"})]})}function i(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{i as default,s as frontmatter};
