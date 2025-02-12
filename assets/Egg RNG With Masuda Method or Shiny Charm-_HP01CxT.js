import{u as o,j as e}from"./index-Cx4QpB68.js";const r={title:"Egg RNG Guide with Masuda and/or Shiny Charm",description:"RNG for eggs using Masuda Method and/or with the Shiny Charm",slug:"retail-sm-egg-mmsc",subCategory:"General"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"How is this different than not using the Masuda Method and/or Shiny Charm?"}),`
`,e.jsx(n.p,{children:"When using the Masuda Method and/or Shiny Charm, the ESVs of every egg are already set in a predetermined order that will not change. The only way to reach the frames you want is to accept and/or reject however many eggs it takes to reach those frames. However, without using the Masuda Method and without having the Shiny Charm, the ESVs are not generated until the moment you accept the egg. This means ANY egg frame can be ANY ESV you want it to be."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Note:",children:`If an ESV matches a TSV (Trainer Shiny Value) then the egg will hatch shiny.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,e.jsxs(n.li,{children:["Optional: A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up 3DSRNGTool"}),`
`,e.jsx(n.h3,{children:"In the upper right of 3DSRNGTool:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Input your game version and your TSV.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you are using PCalc, you can find your TSV by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. Your TSV is listed by where it says YOUR TSV."]}),`
`,e.jsx(n.li,{children:"If you are not using PCalc, there are other ways to find your TSV. Additional Notes at the end has alternative ways of finding your TSV."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"The initial seed does not matter as that will not be used."}),`
`,e.jsx(n.li,{children:'Check the "Shiny Charm" box if you have the Shiny Charm.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If you are wanting to RNG the egg to have a specific ESV that is not yours, click on Edit TSV List and input TSV(s). Then check the "Other TSVs Shiny" box.

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
`})}),`
`,e.jsx(n.h3,{children:"For parents information:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Fill it out according to the parents you are using.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If the parents are of different languages make sure to check the "Masuda Method" box.'}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
`})}),`
`,e.jsx(n.p,{children:`If using a Ditto and genderless Pokemon, the Ditto will be the female.
Otherwise, the Ditto will be the opposite gender of the other parent.`}),`
`,e.jsx(n.p,{children:"Note about breeding for Rockruff:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If its ability is Own Tempo, then the ability can either be 1, 2, or H, it won’t make a difference."}),`
`,e.jsx(n.li,{children:"If its ability is not Own Tempo then its abilities are [1] Keen Eye, [2] Vital Spirit, or [H] Steadfast."}),`
`]}),`
`,e.jsx(n.h3,{children:"For current status"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['For the "Current Status" section in 3DSRNGTool input the current egg seeds of your game.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you are using PCalc, press ",e.jsx(n.code,{children:"Start + Down"})," in-game to bring up the egg seed window and input them into 3DSRNGTool."]}),`
`,e.jsx(n.li,{children:"If you are not using PCalc, see the Additional Notes at the end for ways to find your egg seeds if you do not already know them."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Do not check the "Main RNG Egg (PID)" box.'}),`
`,e.jsx(n.li,{children:'For "Filters", input the info for the egg you are wanting.'}),`
`,e.jsx(n.li,{children:'Check the "Shiny Only" box if you are wanting a shiny egg.'}),`
`,e.jsx(n.li,{children:'Input "0" as the starting frame.'}),`
`,e.jsx(n.li,{children:'Click "Calculate".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a Target Frame"}),`
`,e.jsx(n.p,{children:"You can choose any of the given frames, but lower frames are generally better due to less egg accepts/rejects."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Right click on the row for the one you want and click "Set as Target Frame".'}),`
`,e.jsxs(n.li,{children:['Click on "Shortest Path" and "Calculate".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will automatically calculate the shortest path for least number of accepts and rejects for your target egg."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Accept and/or reject the eggs in the order given from top to bottom. Doing the accepts and/or rejects out of order will result in the wrong egg seeds."}),`
`,e.jsxs(n.li,{children:["The very last egg you accept will be your target egg.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you are using PCalc you can check which egg frame you are on by looking at your egg seeds in-game (",e.jsx(n.code,{children:"Start + Down"})," to bring up the menu)."]}),`
`,e.jsxs(n.li,{children:["If you are wanting a specific shiny egg the frames will more than likely be very high and require accepting/rejecting a lot of eggs.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is due to the ESVs of the eggs being predetermined."}),`
`,e.jsx(n.li,{children:"The only way to change this is to not have the Shiny Charm and to not use the Masuda Method."}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Additional Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["To find your TSV, you can easily check it with PCalc.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window."]}),`
`,e.jsxs(n.li,{children:["Your TSV is where it says ",e.jsx(n.code,{children:"YOUR TSV"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["You can also check if you have the Shiny Charm and/or are using Masuda Method with PCalc.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Start + Down"})," to bring up the Egg Info window."]}),`
`,e.jsx(n.li,{children:"All info for the parents is located there along with whether or not you have the Shiny Charm."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["If you are not using PCalc there are other ways to find your TSV.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use Homebrew or CFW with a save manager such as Checkpoint to extract the save file. You can then view the save file in PKHeX and hover over TID and SID to find your TSV."}),`
`,e.jsx(n.li,{children:"Ask someone else to find it for you. /r/SVEXchange is one place this can be done."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["If you are not using PCalc and do not know your egg seeds there are methods to find them.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you have already used the daycare by having accepted or rejected eggs, and do not wish to use Homebrew or CFW, then you will have to do the ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-sm-egg-seed-no-cfw",children:"127 Magikarp method"})," to find your egg seeds."]}),`
`,e.jsxs(n.li,{children:["If you have not used the daycare and do not wish to use Homebrew or CFW, you can use the ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-sm-egg-seed-no-cfw",children:"8 egg method"})," to find your egg seeds."]}),`
`,e.jsx(n.li,{children:"If you have access to Homebrew or CFW you can use PKHeX to view your egg seeds after using a save manager such as Checkpoint to extract the save file."}),`
`]}),`
`]}),`
`]})]})}function h(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{h as default,r as frontmatter};
