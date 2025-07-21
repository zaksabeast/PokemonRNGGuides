import{E as l,j as e}from"./index-BMwHshYJ.js";const d={title:"Emerald Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",slug:"emulator-emerald-egg",category:"Emerald",tag:"emu",addedOn:"2025-03-09"};function s(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...l(),...t.components},{EmeraldHeldEgg:i,EmeraldPickupEgg:r,YouTubeVideo:o}=n;return i||a("EmeraldHeldEgg"),r||a("EmeraldPickupEgg"),o||a("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"Eggs in Emerald are generated in two steps: the PID is set when you take a step that creates the egg, and the IVs are set when you pick it up from the daycare man. You'll need to do two RNGs to get a perfect shiny egg."}),`
`,e.jsx(n.h2,{children:"Video Guide"}),`
`,e.jsx(o,{id:"JtwSZgw6Q4U"}),`
`,e.jsx(n.h2,{children:"Getting a Shiny Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open the "Pokemon Info" tab in the Lua script to view the IVs and Nature of your parent Pokémon. Write them down for later.'}),`
`,e.jsx(n.li,{children:"Place both Pokémon in the Daycare. The first parent given to the Daycare is Parent 1, the second is Parent 2. Write this down for later."}),`
`,e.jsx(n.li,{children:"Talk to the Daycare Man to check Pokémon compatibility, and input this into the RNG tool below."}),`
`,e.jsx(n.li,{children:"Walk inside the Daycare until the Lua script's step counter is 1."}),`
`,e.jsx(n.li,{children:"Save the game, restart, and pause after loading the save."}),`
`,e.jsx(n.li,{children:`Switch to the Lua script's "Breeding" tab and input the "Calibration", "Initial Seed", "TID", "SID", and "Advances" (as "Initial advances") into the RNG tool. Also, enter the Nature of the non-Ditto or female parent. Optionally, filter for shininess, nature, and gender.`}),`
`,e.jsx(n.li,{children:'Click "Generate" to get a list of potential PIDs, and choose one to target. If there are no results, increase the "Max Advances."'}),`
`,e.jsx(n.li,{children:"Unpause your game."}),`
`,e.jsxs(n.li,{children:["If there are redraws, open the game menu (press ",e.jsx(n.code,{children:"Start"}),"), then open and close the Pokedex for each redraw."]}),`
`,e.jsx(n.li,{children:"Pause the game near your target advance, then create a save state."}),`
`,e.jsxs(n.li,{children:["Manually advance the game (",e.jsx(n.code,{children:"Ctrl + N"})," for Windows, ",e.jsx(n.code,{children:"Cmd + N"})," for Mac) until you reach your target advance."]}),`
`,e.jsxs(n.li,{children:["Hold the movement button to make your character walk, then unpause while holding the button. Walk in the same direction your character is facing (e.g., if facing left, hold the ",e.jsx(n.code,{children:"Left"})," button)."]}),`
`,e.jsx(n.li,{children:"The egg you receive should have your target PID."}),`
`,e.jsx(n.li,{children:"If you missed the target, input the nature in the RNG tool to find the advance you landed on."}),`
`,e.jsx(n.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Congrats! You now have a shiny egg!"})}),`
`,e.jsx(i,{lua:!0}),`
`,e.jsx(n.h2,{children:"Getting IVs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Walk outside next to the Daycare man, save the game, then restart."}),`
`,e.jsx(n.li,{children:"After loading your save, view your Trainer Card, flip it once, and close the menu."}),`
`,e.jsx(n.li,{children:'Talk to the Daycare man until you see the text "Take good care of it." Pause the game and make a save state.'}),`
`,e.jsx(n.li,{children:'Input the current advance into the "Initial advances" field in the RNG tool.'}),`
`,e.jsx(n.li,{children:"Enter the IVs of your parent Pokémon into the RNG tool."}),`
`,e.jsx(n.li,{children:'Click "Generate" to get a list of possible results, and choose a target advance.'}),`
`,e.jsx(n.li,{children:"Pause the game near your target advance, then create a save state."}),`
`,e.jsxs(n.li,{children:["Manually advance the game (",e.jsx(n.code,{children:"Ctrl + N"})," for Windows, ",e.jsx(n.code,{children:"Cmd + N"})," for Mac) until you reach the target advance."]}),`
`,e.jsx(n.li,{children:'Hold "A" and unpause to finish receiving the egg at the target advance.'}),`
`,e.jsx(n.li,{children:`Use the Lua script's "Pokemon Info" tab to check the received Pokémon's IVs.`}),`
`,e.jsx(n.li,{children:'If you missed the target, input the IVs in the RNG tool to find the advance you landed on. You might need to change the "Method" field to find a match.'}),`
`,e.jsx(n.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Congrats! Your egg now has fantastic IVs!"})}),`
`,e.jsx(r,{lua:!0}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Thanks to all ",e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder",children:"PokeFinder"})," contributors, whose work this tool is built upon."]}),`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`,e.jsx(n.li,{children:"Italian translation: Fiask."}),`
`]})]})}function c(t={}){const{wrapper:n}={...l(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}function a(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,d as frontmatter};
