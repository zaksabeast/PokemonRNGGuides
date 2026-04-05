import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CNlyG6-4.js";var n=e(),r={title:`Emerald Egg RNG`,navDrawerTitle:`Egg RNG`,description:`Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.`,slug:`emulator-emerald-egg`,category:`Emerald`,section:`pokemon_rng`,variant:`cfw-emu`,addedOn:`2025-03-09`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{EmeraldHeldEgg:i,EmeraldPickupEgg:a,YouTubeVideo:s}=r;return i||o(`EmeraldHeldEgg`,!0),a||o(`EmeraldPickupEgg`,!0),s||o(`YouTubeVideo`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`Eggs in Emerald are generated in two steps: the PID is set when you take a step that creates the egg, and the IVs are set when you pick it up from the daycare man. You'll need to do two RNGs to get a perfect shiny egg.`}),`
`,(0,n.jsx)(r.h2,{children:`Video Guide`}),`
`,(0,n.jsx)(s,{id:`JtwSZgw6Q4U`}),`
`,(0,n.jsx)(r.h2,{children:`Getting a Shiny Pokémon`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open the "Pokemon Info" tab in the Lua script to view the IVs and Nature of your parent Pokémon. Write them down for later.`}),`
`,(0,n.jsx)(r.li,{children:`Place both Pokémon in the Daycare. The first parent given to the Daycare is Parent 1, the second is Parent 2. Write this down for later.`}),`
`,(0,n.jsx)(r.li,{children:`Talk to the Daycare Man to check Pokémon compatibility, and input this into the RNG tool below.`}),`
`,(0,n.jsx)(r.li,{children:`Walk inside the Daycare until the Lua script's step counter is 1.`}),`
`,(0,n.jsx)(r.li,{children:`Save the game, restart, and pause after loading the save.`}),`
`,(0,n.jsx)(r.li,{children:`Switch to the Lua script's "Breeding" tab and input the "Calibration", "Initial Seed", "TID", "SID", and "Advances" (as "Initial advances") into the RNG tool. Also, enter the Nature of the non-Ditto or female parent. Optionally, filter for shininess, nature, and gender.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Generate" to get a list of potential PIDs, and choose one to target. If there are no results, increase the "Max Advances."`}),`
`,(0,n.jsx)(r.li,{children:`Unpause your game.`}),`
`,(0,n.jsxs)(r.li,{children:[`If there are redraws, open the game menu (press `,(0,n.jsx)(r.code,{children:`Start`}),`), then open and close the Pokedex for each redraw.`]}),`
`,(0,n.jsx)(r.li,{children:`Pause the game near your target advance, then create a save state.`}),`
`,(0,n.jsxs)(r.li,{children:[`Manually advance the game (`,(0,n.jsx)(r.code,{children:`Ctrl + N`}),` for Windows, `,(0,n.jsx)(r.code,{children:`Cmd + N`}),` for Mac) until you reach your target advance.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Hold the movement button to make your character walk, then unpause while holding the button. Walk in the same direction your character is facing (e.g., if facing left, hold the `,(0,n.jsx)(r.code,{children:`Left`}),` button).`]}),`
`,(0,n.jsx)(r.li,{children:`The egg you receive should have your target PID.`}),`
`,(0,n.jsx)(r.li,{children:`If you missed the target, input the nature in the RNG tool to find the advance you landed on.`}),`
`,(0,n.jsx)(r.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Congrats! You now have a shiny egg!`})}),`
`,(0,n.jsx)(i,{lua:!0}),`
`,(0,n.jsx)(r.h2,{children:`Getting IVs`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Walk outside next to the Daycare man, save the game, then restart.`}),`
`,(0,n.jsx)(r.li,{children:`Talk to the Daycare man until you see the text "Take good care of it." Pause the game and make a save state.`}),`
`,(0,n.jsx)(r.li,{children:`Input the current advance into the "Initial advances" field in the RNG tool.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the IVs of your parent Pokémon into the RNG tool.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Generate" to get a list of possible results, and choose a target advance.`}),`
`,(0,n.jsx)(r.li,{children:`Pause the game near your target advance, then create a save state.`}),`
`,(0,n.jsxs)(r.li,{children:[`Manually advance the game (`,(0,n.jsx)(r.code,{children:`Ctrl + N`}),` for Windows, `,(0,n.jsx)(r.code,{children:`Cmd + N`}),` for Mac) until you reach the target advance.`]}),`
`,(0,n.jsx)(r.li,{children:`Hold "A" and unpause to finish receiving the egg at the target advance.`}),`
`,(0,n.jsx)(r.li,{children:`Use the Lua script's "Pokemon Info" tab to check the received Pokémon's IVs.`}),`
`,(0,n.jsx)(r.li,{children:`If you missed the target, input the IVs in the RNG tool to find the advance you landed on. You might need to change the "Method" field to find a match.`}),`
`,(0,n.jsx)(r.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Congrats! Your egg now has fantastic IVs!`})}),`
`,(0,n.jsx)(a,{}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Thanks to all `,(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder`,children:`PokeFinder`}),` contributors, whose work this tool is built upon.`]}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Italian translation: Fiask.`}),`
`,(0,n.jsx)(r.li,{children:`German translation: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};