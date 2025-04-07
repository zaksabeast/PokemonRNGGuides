import{u as s,j as e}from"./index-CPDhDZJw.js";const o={title:"Wild RNG",description:"RNG for Pokémon encountered in the wild using Sweet Scent in FireRed/LeafGreen",slug:"emulator-frlg-wild",subCategory:"Emulator",tag:"emu"};function i(t){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are doing this RNG for a shiny, make sure to set up a profile in PokeFinder with the TID and SID of the save.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Set up PokeFinder"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`Open PokeFinder and select "Wild" for Gen 3. Make sure you're on the "Generator" tab.`}),`
`,e.jsx(n.li,{children:'Set "Method" to Method H-1.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: While there are other methods in FireRed/LeafGreen, H-1 is the most common and recommended. The other methods rely on v-blank and occur rarely.
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:'Set "Location" to where the RNG will take place.'}),`
`,e.jsxs(n.li,{children:['If you want a specific Pokémon, select it in "Pokemon" after selecting its location.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`If the Pokémon you want isn't listed or you need a specific encounter slot, choose the number in the "Encounter Slot" box and leave "Pokemon" at the default.`}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://sites.google.com/site/pokemonslots/gen-iii/emerald",children:"this site"})," to find a specific encounter slot."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Set "Encounter" to "Grass" or "Surfing" since this guide focuses on using Sweet Scent to start an encounter.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: For "Lead," leave it as "Any" since Cute Charm and Synchronize do not work in FireRed/LeafGreen.
`})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsxs(n.li,{children:['Check the "Use Delay" box and input the delay for the Pokémon you are RNGing.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This ",e.jsx(n.a,{href:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147",children:"Google Doc"})," has the delays for each area."]}),`
`,e.jsx(n.li,{children:"Keep in mind there could still be a variation of +/- 1 delay."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding the initial seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Save the game in the location where you'll RNG the Pokémon."}),`
`,e.jsx(n.li,{children:"Restart the emulator."}),`
`,e.jsx(n.li,{children:"Once the game loads, enter the continue screen."}),`
`,e.jsx(n.li,{children:"Pause the game to find your seed."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: FireRed/LeafGreen generates different seeds every time the game loads, unlike repeating seeds in dry battery Ruby and Sapphire, and Emerald. This can be used to reset for different seeds if needed.
`})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"The initial seed will be displayed on the screen from the Lua script."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Initial-Seed.png",alt:"Initial Seed"})}),`
`,e.jsx(n.h2,{children:"Step 3: Find a target advance"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Enter the initial seed into "Seed."'}),`
`,e.jsxs(n.li,{children:["Enter your target settings for the Pokémon you wish to search for (shiny, IVs, nature, etc.).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Finding a shiny perfect Pokémon may take a while to find a seed, which will likely have very high advances."}),`
`,e.jsx(n.li,{children:"If no results show up, try lowering the filters."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Click "Generate."'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.p,{children:"In the example above, the filters are set for any shiny on Route 5."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: The initial seed can be changed by pressing `B` on the continue screen to play the intro again. The seed will change when pressing `A` to advance to the continue screen. You can repeat this process as needed to find a better seed if wanted.\n"})}),`
`,e.jsx(n.h2,{children:"Step 4: RNG for the Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Once you have a target advance, continue into the game."}),`
`,e.jsx(n.li,{children:"Advance to within a few thousand advances of the target advance."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Teachy TV can be used to advance much faster. The RNG advances 313 times faster, allowing you to advance millions of frames in a few minutes.

Open Teachy TV in Key Items and close it when a few thousand away from your target advance.
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Open your Trainer Card and press ",e.jsx(n.code,{children:"A"})," to flip it.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Flipping the Trainer Card resets the delay, which becomes more off the more advances you make."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Select the Pokémon in your party with Sweet Scent and hover over the move."}),`
`,e.jsx(n.li,{children:"When close to your target advance, pause the emulator and create a save state, then advance a frame at a time to the target advance."}),`
`,e.jsxs(n.li,{children:["Hold ",e.jsx(n.code,{children:"A"})," and unpause the emulator at the same time on your target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the Pokémon is not the one wanted, load the previous save state and try one advance before and/or one advance after."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"If you followed all the above steps, the Pokémon should be what you wanted. Tada, you did your Gen 3 Wild RNG!"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Success.png",alt:"Success"})}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"If after trying the one advance difference above it didn't work, you'll have to adjust for your own delay."}),`
`,e.jsx(n.p,{children:"Find what advance you are hitting and adjust as needed."})]})}function a(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,o as frontmatter};
