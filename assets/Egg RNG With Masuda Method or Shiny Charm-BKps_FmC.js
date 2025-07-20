import{E as r,j as e}from"./index-BDmOU5kO.js";const o=[{title:"Ultra Sun and Ultra Moon Egg RNG with Masuda and/or Shiny Charm",navDrawerTitle:"MM/SC Egg RNG",description:"Learn how to RNG eggs from the Daycare in Ultra Sun and Ultra Moon for shiny, high-IV Pokémon.",slug:"retail-usum-egg-mmsc",category:"Ultra Sun and Ultra Moon",tag:"any"},{title:"Sun and Moon Egg RNG with Masuda and/or Shiny Charm",navDrawerTitle:"MM/SC Egg RNG",description:"Learn how to RNG eggs from the Daycare in Sun and Moon for shiny, high-IV Pokémon.",slug:"retail-sm-egg-mmsc",category:"Sun and Moon",tag:"any",canonical:"retail-usum-egg-mmsc"}];function t(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Differences with Masuda Method and/or Shiny Charm"}),`
`,e.jsx(n.p,{children:"Using the Masuda Method and/or Shiny Charm sets the ESVs of all eggs in a fixed order. To reach desired frames, you'll need to accept or reject eggs accordingly. Without these, any egg frame can have the ESV you want since ESVs are only generated once you accept an egg."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: ESV (Egg Shiny Value) determines if an egg will hatch shiny or not. If an ESV matches a TSV (Trainer Shiny Value), the egg will hatch shiny.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,e.jsxs(n.li,{children:["Optional: ",e.jsx(n.a,{href:"/install-pokereader",children:"A 3DS with PokeReader"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setting Up 3DSRNGTool"}),`
`,e.jsx(n.h3,{children:"Configuration:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Enter your game version and TSV."}),`
`,e.jsx(n.li,{children:"Ignore the initial seed as it won't be used."}),`
`,e.jsx(n.li,{children:'Tick the "Shiny Charm" checkbox if you have the Shiny Charm.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you aim to RNG an egg with specific ESV that is not yours, click Edit TSV List, enter TSV(s), then tick the "Other TSVs Shiny". Do not enter the TSV in the top right. Only YOUR TSV should be in the top right or the RNG will be incorrect.
`})}),`
`,e.jsx(n.h3,{children:"Parents information:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Fill in details as per the parents you're using.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Tick the "Masuda Method" box if the parents have different languages.'}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Only language of the Pokémon matters for Masuda Method, not the region.
`})}),`
`,e.jsx(n.p,{children:"When using a Ditto with a genderless Pokémon, Ditto is considered the female parent. If not, Ditto is the opposite gender of the other parent."}),`
`,e.jsx(n.h3,{children:"Current status:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['Input your current egg seeds in the "Current Status" section of 3DSRNGTool.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Refer to Additional Notes for other methods to find egg seeds without PokeReader."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Avoid ticking the "Main RNG Egg (PID)" box.'}),`
`,e.jsx(n.li,{children:'Fill in "Filters" with the details of the egg you aim to RNG.'}),`
`,e.jsx(n.li,{children:'Tick "Shiny Only" if you want a shiny egg.'}),`
`,e.jsx(n.li,{children:'Enter "0" as the starting frame.'}),`
`,e.jsx(n.li,{children:'Click "Calculate".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Selecting a Target Frame"}),`
`,e.jsx(n.p,{children:"Any given frame can be chosen, but lower frames are usually more convenient due to fewer egg accepts/rejects."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Right-click on your desired row and select "Set as Target Frame".'}),`
`,e.jsxs(n.li,{children:['Click on "Shortest Path" and then "Calculate".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This calculates the shortest path for your target egg with the least number of accepts and rejects."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Accept or reject the eggs from top to bottom as listed. A different order will yield the wrong egg seeds."}),`
`,e.jsxs(n.li,{children:["The final egg that you accept will be your target egg.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Confirm your egg frame using PokeReader by checking your egg seeds in-game."}),`
`,e.jsx(n.li,{children:"If a specific shiny egg is what you're after, the frames could be quite high and demand a lot of egg accepts/rejects. This is due to the predetermined ESVs of the eggs."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Additional Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["PokeReader is useful for checking your TSV, Shiny Charm, or Masuda Method.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For TSV it is in the main RNG view. Look where it says ",e.jsx(n.code,{children:"TSV"}),"."]}),`
`,e.jsx(n.li,{children:"For Shiny Charm and parents' info, it is in the Daycare view."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Without PokeReader, your TSV can be found in other ways.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Via Homebrew or CFW with a save manager like Checkpoint. Extract save file, view it in PKHeX, then hover over TID and SID to find TSV."}),`
`,e.jsxs(n.li,{children:["In the ",e.jsx(n.a,{href:"https://www.discord.gg/d8JuAvg",children:"Pokemon RNG Discord"}),", someone else might be able to help you find it."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["If you aren't using PokeReader and don't know your egg seeds, try these methods.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you've accepted or rejected eggs and don't want to use Homebrew or CFW, use the ",e.jsx(n.a,{href:"/retail-usum-egg-seed-no-cfw",children:"127 Magikarp method"}),"."]}),`
`,e.jsxs(n.li,{children:["If you haven't interacted with the daycare and don't want to use Homebrew or CFW, try the ",e.jsx(n.a,{href:"/retail-usum-egg-seed-no-cfw",children:"8 egg method"}),"."]}),`
`,e.jsx(n.li,{children:"With access to Homebrew or CFW, PKHeX can view your egg seeds after extracting the save file using a save manager like Checkpoint."}),`
`]}),`
`]}),`
`]})]})}function h(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{h as default,o as frontmatter};
