import{u as h,j as e}from"./index-DGZZ56bh.js";const d={title:"Egg RNG",description:"RNG Eggs from the Daycare",slug:"emulator-emerald-egg",subCategory:"Emulator",tag:"emu",addedOn:"2025-03-09"};function s(n){const t={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...h(),...n.components},{EmeraldHeldEgg:r,EmeraldPickupEgg:i,YouTubeVideo:o}=t;return r||a("EmeraldHeldEgg"),i||a("EmeraldPickupEgg"),o||a("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Tools:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`]}),`
`,e.jsx(t.h2,{children:"Intro"}),`
`,e.jsx(t.p,{children:"Eggs in Emerald are generated in two steps: the PID is set when you take a step that creates the egg, and the IVs are set when you pick it up from the daycare man. You'll need to do two RNGs to get a perfect shiny egg."}),`
`,e.jsx(t.h2,{children:"Video Guide"}),`
`,e.jsx(o,{src:"https://www.youtube.com/embed/JtwSZgw6Q4U?si=Fvmg7KLqI9J06wAa"}),`
`,e.jsx(t.h2,{children:"Getting a Shiny Pokémon"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:'Open the "Pokemon Info" tab in the Lua script to view the IVs and Nature of your parent Pokémon. Write them down for later.'}),`
`,e.jsx(t.li,{children:"Place both Pokémon in the Daycare. The first parent given to the Daycare is Parent 1, the second is Parent 2. Write this down for later."}),`
`,e.jsx(t.li,{children:"Talk to the Daycare Man to check Pokémon compatibility, and input this into the RNG tool below."}),`
`,e.jsx(t.li,{children:"Walk inside the Daycare until the Lua script's step counter is 1."}),`
`,e.jsx(t.li,{children:"Save the game, restart, and pause after loading the save."}),`
`,e.jsx(t.li,{children:`Switch to the Lua script's "Breeding" tab and input the "Calibration", "Initial Seed", "TID", "SID", and "Advances" (as "Initial advances") into the RNG tool. Also, enter the Nature of the non-Ditto or female parent. Optionally, filter for shininess, nature, and gender.`}),`
`,e.jsx(t.li,{children:'Click "Generate" to get a list of potential PIDs, and choose one to target. If there are no results, increase the "Max Advances."'}),`
`,e.jsx(t.li,{children:"Unpause your game."}),`
`,e.jsxs(t.li,{children:["If there are redraws, open the game menu (press ",e.jsx(t.code,{children:"Start"}),"), then open and close the Pokedex for each redraw."]}),`
`,e.jsx(t.li,{children:"Pause the game near your target advance, then create a save state."}),`
`,e.jsxs(t.li,{children:["Manually advance the game (",e.jsx(t.code,{children:"Ctrl + N"})," for Windows, ",e.jsx(t.code,{children:"Cmd + N"})," for Mac) until you reach your target advance."]}),`
`,e.jsxs(t.li,{children:["Hold the movement button to make your character walk, then unpause while holding the button. Walk in the same direction your character is facing (e.g., if facing left, hold the ",e.jsx(t.code,{children:"Left"})," button)."]}),`
`,e.jsx(t.li,{children:"The egg you receive should have your target PID."}),`
`,e.jsx(t.li,{children:"If you missed the target, input the nature in the RNG tool to find the advance you landed on."}),`
`,e.jsx(t.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Congrats! You now have a shiny egg!"})}),`
`,e.jsx(r,{lua:!0}),`
`,e.jsx(t.h2,{children:"Getting IVs"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Walk outside next to the Daycare man, save the game, then restart."}),`
`,e.jsx(t.li,{children:"After loading your save, view your Trainer Card, flip it once, and close the menu."}),`
`,e.jsx(t.li,{children:'Talk to the Daycare man until you see the text "Take good care of it." Pause the game and make a save state.'}),`
`,e.jsx(t.li,{children:'Input the current advance into the "Initial advances" field in the RNG tool.'}),`
`,e.jsx(t.li,{children:"Enter the IVs of your parent Pokémon into the RNG tool."}),`
`,e.jsx(t.li,{children:'Click "Generate" to get a list of possible results, and choose a target advance.'}),`
`,e.jsx(t.li,{children:"Pause the game near your target advance, then create a save state."}),`
`,e.jsxs(t.li,{children:["Manually advance the game (",e.jsx(t.code,{children:"Ctrl + N"})," for Windows, ",e.jsx(t.code,{children:"Cmd + N"})," for Mac) until you reach the target advance."]}),`
`,e.jsx(t.li,{children:'Hold "A" and unpause to finish receiving the egg at the target advance.'}),`
`,e.jsx(t.li,{children:`Use the Lua script's "Pokemon Info" tab to check the received Pokémon's IVs.`}),`
`,e.jsx(t.li,{children:'If you missed the target, input the IVs in the RNG tool to find the advance you landed on. You might need to change the "Method" field to find a match.'}),`
`,e.jsx(t.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Congrats! Your egg now has fantastic IVs!"})}),`
`,e.jsx(i,{lua:!0}),`
`,e.jsx(t.h2,{children:"Credits"}),`
`,e.jsxs(t.p,{children:["Thanks to all ",e.jsx(t.a,{href:"https://github.com/Admiral-Fish/PokeFinder",children:"PokeFinder"})," contributors, whose work this tool is built upon."]})]})}function c(n={}){const{wrapper:t}={...h(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s(n)}function a(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,d as frontmatter};
