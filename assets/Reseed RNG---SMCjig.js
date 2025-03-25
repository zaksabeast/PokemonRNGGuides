import{u as s,j as e}from"./index-DiAjNCVH.js";const o={title:"Reseed using paintings",description:"Reseed the RNG using paintings to obtain the Pokémon wanted without the long wait",slug:"emerald-painting-rng",subCategory:"Emulator",tag:"any"};function i(t){const n={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"By viewing a painting in the game, like the ones in Lilycove Contest Hall, the RNG is reseeded using the video frame counter."}),`
`,e.jsx(n.p,{children:"Reseeding the RNG by viewing paintings allows you to avoid waiting for higher advances. Normally, the RNG starts with a predetermined number and generates the same random numbers each time."}),`
`,e.jsx(n.p,{children:"This method can be combined with battle videos to save the new RNG state after viewing the painting."}),`
`,e.jsx(n.p,{children:"You can also use this method for Ruby and Sapphire, whether live or for a dry battery."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Find a target seed using PokeFinder."}),`
`,e.jsx(n.li,{children:'Right-click on the chosen seed in PokeFinder and select "Generate times for seed."'}),`
`]}),`
`,e.jsx(n.h2,{children:"Painting RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Subtract 0x1E (or 30 in decimal) from the seed shown in PokeFinder. This can be done using Google or the built-in Windows calculator. Adjust this number based on your emulator setup; if the desired seed does not match the seed shown in the Lua script, adjust the subtraction by 1 and try again."}),`
`,e.jsx(n.li,{children:"In the game, wait for the painting timer shown by the Lua script to equal the calculated number. View the party menu to prevent NPCs from affecting the RNG."}),`
`,e.jsx(n.li,{children:"View the painting at this number to reseed the RNG to the desired seed."}),`
`,e.jsx(n.li,{children:'Use the number of advances shown in "Seed to Time" of PokeFinder to finish the RNG as normal.'}),`
`]})]})}function a(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,o as frontmatter};
