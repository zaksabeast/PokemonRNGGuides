import{g7 as a,j as e}from"./index-Dw-l60qV.js";const s=[{title:"White Forest RNG",navDrawerTitle:"White Forest RNG",description:"Learn how to RNG Pokémon found exclusively in White Forest in Pokémon White for desired IVs, nature, and shininess.",slug:"emulator-bw-white-forest",category:"Black and White",tag:"emu"}];function o(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide assumes you have basic knowledge. You should be able to set up a profile, do a Wild RNG, and understand noise advancing the Seeding.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:"Pokémon White"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can edit Trainers/Pokémon available in the White Forest using the PokeCGear Tool (http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021), but this won't be covered in this guide.
`})}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.p,{children:["The White Forest has a large pool of Pokémon, making it interesting for RNG. Although the game doesn't allow you to use Sweet Scent, it has a helpful feature: ",e.jsx(n.strong,{children:"The first step in grass or water upon entering the White Forest will lead to an encounter 100% of the time."})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Desmume and load the Lua scripts. Find a Target Spread on PokeFinder, preferably around 150-200 PID Frames."}),`
`,e.jsx(n.li,{children:"Go outside the White Forest. It's best to save at Route 14, near the gates. The grass patch seems closer there, but you can also do this from Route 15."}),`
`,e.jsx(n.li,{children:"Walk until your IV Frame Count increases. This means when you reset for RNG, you can reach the grass patch without worrying about random IV Frame advances."}),`
`,e.jsx(n.li,{children:"Save and perform the Initial Seed RNG. Do not load the C-Gear."}),`
`,e.jsx(n.li,{children:"Once in-game, enter quickly and go next to the patch that will trigger an encounter. Open the menu."}),`
`,e.jsx(n.li,{children:"Create a save state here. Let the game run briefly and find a long advance (a moment when the PID Frame doesn't advance at all) to do a step. Once you find one, reload the state, advance to it again, and go into the party as soon as you hit it. Use Chatots to reach your target frame. Close all menus and take your step."}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You've set up your RNG in White Forest!"}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function i(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{i as default,s as frontmatter};
