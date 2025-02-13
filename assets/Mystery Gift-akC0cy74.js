import{u as o,j as e}from"./index-C7pESl3A.js";const s={title:"Mystery Gift (Event) RNG",description:"RNG your events to have 6 IVs",slug:"retail-sm-myster-gift",subCategory:"Custom Firmware"};function i(t){const n={a:"a",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.p,{children:"Before continuing with the guide it is recommended to be in the first PokeCenter (the one by the Pokemon School) and standing directly in front of the Delivery Man."}),`
`,e.jsx(n.h2,{children:"Step 1: Start at the final screen"}),`
`,e.jsx(n.p,{children:"Make sure to stand exactly like the image below or the timeline may be off resulting in missing your target frame."}),`
`,e.jsx(n.p,{children:'You should see the text: "You received xxx!"'}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Sun-Moon/Mystery-Gift/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h2,{children:"Step 2: Set Up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In the upper right, input your game version and your TSV.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["With PCalc, you can find your TSV by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. Your TSV is listed by where it says ",e.jsx(n.code,{children:"YOUR TSV"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Also in the upper right, input the initial seed. You can find this by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. The initial seed is found where it says ",e.jsx(n.code,{children:"Init Seed:"}),"."]}),`
`,e.jsx(n.li,{children:"If you have the Shiny Charm check the Shiny Charm box."}),`
`,e.jsx(n.li,{children:'Make sure you are on the "Event RNG" tab in 3DSRNGTool.'}),`
`,e.jsxs(n.li,{children:['If you have the WonderCard file (a .wc7) for the event you are RNGing, you can import that directly into 3DSRNGTool and have it automatically update the "Event Setting" area for you.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["WonderCard files can be found ",e.jsx(n.a,{href:"https://github.com/projectpokemon/EventsGallery",children:"here"}),"."]}),`
`,e.jsx(n.li,{children:"Alternatively you can change the data yourself, but make sure it is correct for the event you are RNGing."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: With some events, the game will trigger a Pokedex registration animation (the same as you would catch a new Pokemon). This influences the RNG itself by changing the delay from 0 frame to 42 Frames. You can check the 'No Dex Entry' in the RNG Info in order to calibrate everything well.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: RNGing the Pokemon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Create a timeline following this guide: ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-usum-timeline",children:"Gen 7 Timeline Guide"})]}),`
`,e.jsx(n.li,{children:"Advance to your target frame and when you land on it, press A to unpause the game and obtain the Pokemon."}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: You can view the Pokemon's info using PCalc. Press `Start + Right` to bring up the Party View window. `Select + Right` can be used to cycle through party members with the Party View window up.\n"})}),`
`,e.jsx(n.h2,{children:"Additional notes"}),`
`,e.jsx(n.p,{children:"If you did not obtain the Pokemon you wanted"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Double check that all info has been inputted correctly, especially the initial seed."}),`
`,e.jsxs(n.li,{children:["Restart the guide from the beginning and make sure to follow ",e.jsx(n.em,{children:"all"})," instructions given. Not getting the correct Pokemon is usually a result of user error."]}),`
`,e.jsx(n.li,{children:"Make sure you are creating a timeline correctly. Skipping a target frame is usually a result of not doing a timeline correctly."}),`
`]})]})}function l(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{l as default,s as frontmatter};
