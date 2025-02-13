import{u as s,j as e}from"./index-BAEKAekl.js";const h={title:"Reseed using paintings",description:"Reseed the RNG using paintings to obtain the Pokemon wanted without the long wait",slug:"emerald-painting-rng",subCategory:"Emulator"};function t(i){const n={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://code.google.com/archive/p/vba-rerecording/downloads",children:"VBA-RR"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://cdn.discordapp.com/attachments/438735638754361345/959767753521258546/E_RNG_2.0.lua",children:"Painting Lua Script"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"By viewing a painting in the game, like the ones in Lilycove Contest Hall, the RNG is reseeded using the video frame counter."}),`
`,e.jsx(n.p,{children:"The benefit to reseeding the RNG by viewing paintings is to not have to wait for higher advances. Normally, the RNG will always start with a predetermined number and generate the same random numbers each time."}),`
`,e.jsx(n.p,{children:"This method can be combined with battle videos to save the new RNG state after viewing the painting."}),`
`,e.jsx(n.p,{children:"Reseeding the RNG with paintings can also be used for Ruby and Sapphire, live or dry battery."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Find a target seed using PokeFinder."}),`
`,e.jsx(n.li,{children:'Right click on the chosen seed within PokeFinder and choose "Generate times for seed".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Painting RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Subtract 0x1E (or 30 in decimal) from the seed shown in PokeFinder.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This can be done by using Google, or the built in Windows calculator."}),`
`,e.jsx(n.li,{children:"Keep in mind this number is a base and may need to be adjusted depending on the emulator used and how it's set up. If the desired seed is not the seed shown in the lua script, adjust the number subtracted by 1 and try again."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["In the game, wait for the painting timer shown by the lua script to equal the number calculated.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This should be done by viewing the party menu to avoid having NPCs mess with the RNG."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"View the painting at this number to reseed the RNG to the seed wanted."}),`
`,e.jsx(n.li,{children:'Then use the number of advances shown in "Seed to Time" of PokeFinder to finish the RNG like normal.'}),`
`]})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{a as default,h as frontmatter};
