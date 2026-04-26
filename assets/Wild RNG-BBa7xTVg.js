import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DYKm3G_o.js";var n=e(),r=[{title:`FireRed and LeafGreen Wild RNG`,navDrawerTitle:`Wild RNG`,description:`Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method.`,slug:`emulator-frlg-wild`,category:`FireRed and LeafGreen`,section:`pokemon_rng`,variant:`cfw-emu`},{title:`FireRed and LeafGreen Wild RNG`,description:`Learn how to RNG wild Pokemon in FireRed and LeafGreen using the Sweet Scent method.`,slug:`emulator-frlg-wild-v2`,category:`FireRed and LeafGreen`,section:`pokemon_rng`,variant:`cfw-emu`,hideFromNavDrawer:!0,canonical:`emulator-frlg-wild`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsxs)(r.li,{children:[`TID and SID (if going for shiny) - `,(0,n.jsx)(r.a,{href:`/frlg-gen3-sid`,children:`FRLG Find SID Guide`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Set up PokeFinder`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder and select "Wild" for Gen 3. Make sure you're on the "Generator" tab.`}),`
`,(0,n.jsxs)(r.li,{children:[`Set "Method" to Method H-1.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`While there are other methods in FireRed/LeafGreen, H-1 is the most common and recommended. The other methods rely on v-blank and occur rarely.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Set "Location" to where the RNG will take place.`}),`
`,(0,n.jsxs)(r.li,{children:[`If you want a specific Pokemon, select it in "Pokemon" after selecting its location.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If the Pokemon you want isn't listed or you need a specific encounter slot, choose the number in the "Encounter Slot" box and leave "Pokemon" at the default.`}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.a,{href:`https://sites.google.com/site/pokemonslots/gen-iii/emerald`,children:`this site`}),` to find a specific encounter slot.`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Set "Encounter" to "Grass" or "Surfing" since this guide focuses on using Sweet Scent to start an encounter.`}),`
`,(0,n.jsx)(r.li,{children:`For "Lead," leave it as "Any" since Cute Charm and Synchronize do not work in FireRed/LeafGreen.`}),`
`,(0,n.jsxs)(r.li,{children:[`Check the "Use Delay" box and input the delay for the Pokemon you are RNGing.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`This `,(0,n.jsx)(r.a,{href:`https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147`,children:`Google Doc`}),` has the delays for each area.`]}),`
`,(0,n.jsx)(r.li,{children:`Keep in mind there could still be a variation of +/- 1 delay.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Finding the initial seed (Manually)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Save the game in the location where you'll RNG the Pokemon.`}),`
`,(0,n.jsx)(r.li,{children:`Restart the emulator.`}),`
`,(0,n.jsx)(r.li,{children:`Once the game loads, enter the continue screen.`}),`
`,(0,n.jsx)(r.li,{children:`Pause the game to find your seed.`}),`
`,(0,n.jsx)(r.li,{children:`The initial seed will be displayed on the screen from the Lua script.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Wild/Initial-Seed.png`,alt:`Initial Seed`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Finding the initial seed (Botting)`}),`
`,(0,n.jsx)(r.p,{children:`An alternative method to finding an initial seed is to use a bot to reset for seeds until a desired one is found.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.a,{href:`/frlg-seeding-bot`,children:`Initial Seed Botting Guide`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Find a target advance`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Enter the initial seed into "Seed."`}),`
`,(0,n.jsxs)(r.li,{children:[`Enter your target settings for the Pokemon you wish to search for (shiny, IVs, nature, etc.).`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Finding a shiny perfect Pokemon may take a while to find a seed, which will likely have very high advances.`}),`
`,(0,n.jsx)(r.li,{children:`If no results show up, try lowering the filters.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Click "Generate."`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Wild/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.p,{children:`In the example above, the filters are set for any shiny on Route 5.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The initial seed can be changed by pressing B on the continue screen to play the intro again. The seed will change when pressing A to advance to the continue screen. You can repeat this process as needed to find a better seed if wanted.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: RNG for the Pokemon`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Once you have a target advance, continue into the game.`}),`
`,(0,n.jsxs)(r.li,{children:[`Advance to within a few thousand advances of the target advance.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Teachy TV can be used to advance much faster. The RNG advances 313 times faster, allowing you to advance millions of frames in a few minutes.`}),`
`,(0,n.jsx)(r.li,{children:`Open Teachy TV in Key Items and close it when a few thousand away from your target advance.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Select the Pokemon in your party with Sweet Scent and hover over the move.`}),`
`,(0,n.jsx)(r.li,{children:`When close to your target advance, pause the emulator and create a save state, then advance a frame at a time to the target advance.`}),`
`,(0,n.jsxs)(r.li,{children:[`Hold `,(0,n.jsx)(r.code,{children:`A`}),` and unpause the emulator at the same time on your target advance.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If the Pokemon is not the one wanted, load the previous save state and try one advance before and/or one advance after.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`If you followed all the above steps, the Pokémon should be what you wanted. Tada, you did your Gen 3 Wild RNG!`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Wild/Success.png`,alt:`Success`})}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsx)(r.p,{children:`If after trying the one advance difference above it didn't work, you'll have to adjust for your own delay.`}),`
`,(0,n.jsx)(r.p,{children:`Find what advance you are hitting and adjust as needed.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};