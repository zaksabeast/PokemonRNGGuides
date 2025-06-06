import{q as i,j as e}from"./index-9R9CRZXL.js";const l=[{title:"Ultra Sun and Ultra Moon Mystery Gift RNG",navDrawerTitle:"Mystery Gift RNG",description:"Learn how to RNG Mystery Gift Pokémon in Ultra Sun and Ultra Moon for perfect IVs.",slug:"retail-usum-mystery-gift",category:"Ultra Sun and Ultra Moon",tag:"cfw"},{title:"Sun and Moon Mystery Gift RNG",navDrawerTitle:"Mystery Gift RNG",description:"Learn how to RNG Mystery Gift Pokémon in Sun and Moon for perfect IVs.",slug:"retail-sm-myster-gift",category:"Sun and Moon",tag:"cfw",canonical:"retail-usum-mystery-gift"}];function r(t){const n={a:"a",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/install-pokereader",children:"A 3DS with PokeReader"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.p,{children:"Before starting, go to the first PokeCenter (by the Pokémon School) and stand in front of the Delivery Man."}),`
`,e.jsx(n.h2,{children:"Step 1: Start at the final screen"}),`
`,e.jsx(n.p,{children:"Stand exactly as shown in the image below, or the timeline may be incorrect, causing you to miss your target frame."}),`
`,e.jsx(n.p,{children:'You should see the text: "You received xxx!"'}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Mystery-Gift/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h2,{children:"Step 2: Set Up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Input your game version and TSV in the upper right."}),`
`,e.jsx(n.li,{children:"Input the initial seed in the upper right."}),`
`,e.jsx(n.li,{children:"Check the Shiny Charm box if you have it."}),`
`,e.jsx(n.li,{children:`Ensure you're on the "Event RNG" tab in 3DSRNGTool.`}),`
`,e.jsxs(n.li,{children:['If you have the WonderCard file (.wc7) for the event, import it into 3DSRNGTool to update "Event Setting" automatically.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["WonderCard files are available ",e.jsx(n.a,{href:"https://github.com/projectpokemon/EventsGallery",children:"here"}),"."]}),`
`,e.jsx(n.li,{children:"Alternatively, you can enter the data manually, but ensure it's correct for your event."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Some events trigger a Pokedex registration animation, affecting RNG by changing the delay from 0 to 62 frames. Check 'No Dex Entry' in RNG Info to calibrate correctly. When the Pokedex entry screen comes up, try to close it quickly.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: RNGing the Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Create a timeline using this guide: ",e.jsx(n.a,{href:"/retail-usum-timeline",children:"Gen 7 Timeline Guide"}),"."]}),`
`,e.jsxs(n.li,{children:["Advance to your target frame. When you land on it, press ",e.jsx(n.code,{children:"A"})," to unpause and obtain the Pokémon."]}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the Pokémon you wanted. If not, reset the game and try again."}),`
`,e.jsx(n.h2,{children:"Additional notes"}),`
`,e.jsx(n.p,{children:"If you didn't get the Pokémon you wanted:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Double-check all information, especially the initial seed."}),`
`,e.jsxs(n.li,{children:["Restart the guide from the beginning and follow ",e.jsx(n.em,{children:"all"})," instructions. Incorrect Pokémon usually result from user error."]}),`
`,e.jsx(n.li,{children:"Ensure you're creating a timeline correctly. Skipping a target frame often comes from not doing it right."}),`
`]})]})}function s(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{s as default,l as frontmatter};
