import{u as s,j as e}from"./index-BAEKAekl.js";const o={title:"Wild RNG",description:"RNG for Pokemon encountered in the wild using Sweet Scent in FireRed/LeafGreen",slug:"emulator-frlg-wild",subCategory:"Emulator"};function t(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://code.google.com/archive/p/vba-rerecording/downloads",children:"VBA-rr v23.6"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pokerng.forumcommunity.net/?t=56443955",children:"Lua scripts for FireRed/LeafGreen"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Password is ",e.jsx(n.code,{children:"allyouneedisnoob"})]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are doing this RNG for a shiny, make sure to have set up a profile within PokeFinder with the TID and SID of the save.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Set up PokeFinder"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open PokeFinder and select "Wild" for Gen 3. Make sure to be on the "Generator" tab.'}),`
`,e.jsx(n.li,{children:'Have "Method" set to Method H-1.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: While there are other methods in FireRed/LeafGreen, H-1 is the most common and is the one recommended to use. The other methods rely on v-blank and rarely occur.
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:'Set the "Location" to the location where the RNG will take place.'}),`
`,e.jsxs(n.li,{children:['If you want a specific Pokemon you can select it in "Pokemon" after selecting its location.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If the Pokemon you are wanting is not in the list, or you are going for a specific encounter slot, you can instead choose the number in the "Encounter Slot" box and leave "Pokemon" at the default.'}),`
`,e.jsxs(n.li,{children:["You can use ",e.jsx(n.a,{href:"https://sites.google.com/site/pokemonslots/gen-iii/emerald",children:"this site"})," to find a specific encounter slot."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'"Encounter" should be set to "Grass" or "Surfing" since this guide is focusing on using Sweet Scent to start an encounter.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: For "Lead" leave it as "Any" since Cute Charm and Synchronize do not work in FireRed/LeafGreen.
`})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsxs(n.li,{children:['Check the "Use Delay" box and input the delay for the Pokemon you are RNGing.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This ",e.jsx(n.a,{href:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147",children:"Google Doc"})," has the delays for each area."]}),`
`,e.jsx(n.li,{children:"Keep in mind there could still be a variation of +/- 1 delay."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Finding the initial seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Save the game in the location where you will RNG the Pokemon."}),`
`,e.jsx(n.li,{children:"Restart the emulator."}),`
`,e.jsx(n.li,{children:"Once the game is loaded, enter into the continue screen."}),`
`,e.jsx(n.li,{children:"Pause the game to find your seed."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: FireRed/LeafGreen will generate different seeds every time the game loads unlike repeating seeds in dry battery Ruby and Sapphire, and Emerald. This can be used to reset for different seeds if wanted.
`})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"The initial seed will be displayed on the screen from the lua script."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Initial-Seed.png",alt:"Initial Seed"})}),`
`,e.jsx(n.h2,{children:"Step 4: Find a target advance"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Enter the initial seed into "Seed".'}),`
`,e.jsxs(n.li,{children:["Enter in your target settings for the Pokemon you wish to search for (shiny, IVs, nature, etc).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep in mind that finding a shiny perfect Pokemon may take awhile to find a seed for, and then will probably have very high advances."}),`
`,e.jsx(n.li,{children:"If no results are showing up, try lowering the filters."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Click "Generate".'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.p,{children:"In the example above, the filters are set for any shiny on Route 5."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The initial seed can be changed by pressing B on the continue screen to play the intro again. The seed will change when pressing A to advance to the continue screen. You can repeat this process as needed to find a better seed if wanted.
`})}),`
`,e.jsx(n.h2,{children:"Step 5: RNG for the Pokemon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Once you have a target advance, continue into the game."}),`
`,e.jsx(n.li,{children:"Advance to within a few thousand advances of the target advance."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Teachy TV can be used to advance much, much faster. The RNG advances 313 times faster, and so you can advance millions of frames in a few minutes.

You can advance the RNG by opening the Teachy TV in Key Items and then closing it when a few thousand away from your target advance.
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Open your Trainer Card and press ",e.jsx(n.code,{children:"A"})," to flip it.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The use of flipping the Trainer Card is to reset the delay, which becomes more off the more advances that have been done."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Select the Pokemon in your party with Sweet Scent and hover over the move."}),`
`,e.jsx(n.li,{children:"When close to your target advance, pause the emulator and create a save state, and then advance a frame at a time to the target advance."}),`
`,e.jsxs(n.li,{children:["Hold ",e.jsx(n.code,{children:"A"})," and unpause the emulator at the same time on your target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the Pokemon is not the one wanted, load the previous save state and try one advance before and/or one advance after."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"If you followed all the above steps, the Pokemon should be what you wanted. Tada, you did your Gen 3 Wild RNG!"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Success.png",alt:"Success"})}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"If after trying the one advance difference above and it didn't work, you'll have to adjust for your own delay."}),`
`,e.jsx(n.p,{children:"Find what advance you are hitting and adjust as needed."})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{a as default,o as frontmatter};
