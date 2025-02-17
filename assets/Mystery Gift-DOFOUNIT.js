import{u as r,j as e}from"./index-DXbxUTNi.js";const s={title:"Mystery Gift (Event) RNG",description:"RNG your events to have 6 IVs",slug:"retail-usum-mystery-gift",subCategory:"Custom Firmware"};function i(t){const n={a:"a",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.p,{children:"Before starting, go to the first PokeCenter (by the Pokémon School) and stand in front of the Delivery Man."}),`
`,e.jsx(n.h2,{children:"Step 1: Start at the final screen"}),`
`,e.jsx(n.p,{children:"Stand exactly as shown in the image below, or the timeline may be incorrect, causing you to miss your target frame."}),`
`,e.jsx(n.p,{children:'You should see the text: "You received xxx!"'}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Mystery-Gift/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h2,{children:"Step 2: Set Up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Input your game version and TSV in the upper right.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use PCalc by pressing ",e.jsx(n.code,{children:"Start + Up"})," to view the Game View window. Your TSV is shown after ",e.jsx(n.code,{children:"YOUR TSV"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Input the initial seed in the upper right.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Find this by pressing ",e.jsx(n.code,{children:"Start + Up"})," in the Game View window, where it says ",e.jsx(n.code,{children:"Init Seed:"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Check the Shiny Charm box if you have it."}),`
`,e.jsx(n.li,{children:`Ensure you're on the "Event RNG" tab in 3DSRNGTool.`}),`
`,e.jsxs(n.li,{children:['If you have the WonderCard file (.wc7) for the event, import it into 3DSRNGTool to update "Event Setting" automatically.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["WonderCard files are available ",e.jsx(n.a,{href:"https://github.com/projectpokemon/EventsGallery",children:"here"}),"."]}),`
`,e.jsx(n.li,{children:"Alternatively, you can enter the data manually, but ensure it's correct for your event."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Some events trigger a Pokedex registration animation, affecting RNG by changing the delay from 0 to 42 frames. Check 'No Dex Entry' in RNG Info to calibrate correctly.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: RNGing the Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Create a timeline using this guide: ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-usum-timeline",children:"Gen 7 Timeline Guide"}),"."]}),`
`,e.jsxs(n.li,{children:["Advance to your target frame. When you land on it, press ",e.jsx(n.code,{children:"A"})," to unpause and obtain the Pokémon."]}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the Pokémon you wanted. If not, reset the game and try again."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: View the Pokémon's info using PCalc. Press `Start + Right` for Party View. Use `Select + Right` to cycle through party members in Party View.\n"})}),`
`,e.jsx(n.h2,{children:"Additional notes"}),`
`,e.jsx(n.p,{children:"If you didn't get the Pokémon you wanted:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Double-check all information, especially the initial seed."}),`
`,e.jsxs(n.li,{children:["Restart the guide from the beginning and follow ",e.jsx(n.em,{children:"all"})," instructions. Incorrect Pokémon usually result from user error."]}),`
`,e.jsx(n.li,{children:"Ensure you're creating a timeline correctly. Skipping a target frame often comes from not doing it right."}),`
`]})]})}function l(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{l as default,s as frontmatter};
