import{u as i,j as e}from"./index-BA0UoWvs.js";const a={title:"Egg RNG",description:"RNG Eggs from the Daycare",slug:"emulator-emerald-egg",subCategory:"Emulator"};function t(r){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://code.google.com/archive/p/vba-rerecording/downloads",children:"VBA-RR"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pokerng.forumcommunity.net/?t=56443955&p=396434940",children:"Lua Scripts"}),", password is ",e.jsx(n.code,{children:"allyouneedisnoob"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"The parent Pokémon IVs and their compatibility (talk to the daycare man for compatibility)"}),`
`,e.jsx(n.li,{children:"TID and SID if going for a shiny. These are unnecessary if only wanting IVs/nature"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"Eggs in Emerald are generated in two parts. The PID of the Pokémon is generated when the player takes a step that creates an egg at the daycare. The IVs are generated when collecting the egg from the daycare man. Therefore, there are two parts to RNGing a perfect shiny egg."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Deposit both Pokémon into the daycare.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Note the order: first parent is Parent A, second is Parent B."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Do not give an Everstone to either parent. Everstone does not work in Emerald for breeding and will give incorrect results.
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Talk to the daycare man to check their compatibility.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is needed later for PokeFinder."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Go back inside the daycare and take steps until the lua script shows ",e.jsx(n.code,{children:"FE"})," for the step counter.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Step inside the daycare, not outside."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/Egg/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsx(n.li,{children:"Create a savestate here before continuing."}),`
`]}),`
`,e.jsx(n.h2,{children:"PokeFinder Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open PokeFinder and select "Gen 3 Egg". Ensure you are on the Emerald tab.'}),`
`,e.jsxs(n.li,{children:['Set "Max Results" to a number you are comfortable waiting for.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For a shiny PID, you should typically find a result within a few minutes."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:`Set "Method" to PID, as the egg's PID will be RNG'd first.`}),`
`]}),`
`,e.jsx(n.h2,{children:"Redraws"}),`
`,e.jsx(n.p,{children:"For Emerald egg RNG, you can redraw the game's graphics to target specific PIDs."}),`
`,e.jsx(n.p,{children:"To do a single redraw:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the menu."}),`
`,e.jsx(n.li,{children:"Open the Pokédex."}),`
`,e.jsx(n.li,{children:"Back out of the Pokédex into the menu."}),`
`]}),`
`,e.jsx(n.p,{children:"Open and close the Pokédex as many times as needed to get your target PID."}),`
`,e.jsx(n.h2,{children:"Calibration"}),`
`,e.jsx(n.p,{children:"Before RNGing for your desired egg, you must calibrate."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Restart the emulator and pause when the save has loaded."}),`
`,e.jsx(n.li,{children:"Note the RNG Frame displayed by the lua script and create a save state."}),`
`,e.jsxs(n.li,{children:["Hold down a directional button to take a step while unpausing.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If an egg is generated, proceed to the next step."}),`
`,e.jsxs(n.li,{children:["If no egg is generated, reload the previous save state and advance a frame (",e.jsx(n.code,{children:"CTRL + N"}),"). Take another step to try to generate an egg. Repeat as needed."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Choose the egg's nature from the dropdown."}),`
`,e.jsx(n.li,{children:"Set redraws to 0 in PokeFinder."}),`
`,e.jsxs(n.li,{children:['Click "Generate" in PokeFinder and find the PID of the generated egg in the Advances column by checking the RNG Frame you stepped on.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If you can't find the PID, adjust the calibration by 1 and generate new results."}),`
`,e.jsx(n.li,{children:"Repeat until a match is found."}),`
`,e.jsx(n.li,{children:"Calibration will be between 17 and 21."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/Egg/Calibration.png",alt:"Calibration"})}),`
`,e.jsx(n.p,{children:"In the example above, the calibration is 20. The frame was found after selecting Timid from the nature dropdown and searching for the PID of the egg."}),`
`,e.jsx(n.p,{children:"The calibration remains the same for this save, allowing reuse for future egg RNGs."}),`
`,e.jsx(n.h2,{children:"Part 1: RNGing for PID"}),`
`,e.jsx(n.p,{children:"Now that you have calibrated, it’s time to RNG an egg."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Set the filters to your preferences.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For this part, only Ability, Gender, Nature, and Shiny can be RNG'd."}),`
`,e.jsx(n.li,{children:"Ensure the Gender Ratio is set correctly."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Set the redraws according to your needs.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Adjusting redraws can create different results for more options."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Generate results and search for a target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Modify redraws and filters as needed to find a target advance."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Reset the emulator and perform the necessary redraws."}),`
`,e.jsx(n.li,{children:"Create a save state when nearing the target advance."}),`
`]}),`
`,e.jsx(n.p,{children:"To hit your target advance, consider the delay. The next section explains how to find it."}),`
`,e.jsx(n.h3,{children:"Finding Your Delay for PID"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Take a step 18 advances before your target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If no egg is produced, continue to find your delay."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Use PokeFinder to find the advance you hit by setting the filters for the egg obtained and checking for the PID."}),`
`,e.jsxs(n.li,{children:["Determine your delay using ",e.jsx(n.code,{children:"Target Advance - Advance Hit = Delay"}),"."]}),`
`,e.jsxs(n.li,{children:["Add the delay to your target advance for the RNG Frame you need to step on (",e.jsx(n.code,{children:"Target Advance + Delay = RNG Frame to take a step on"}),")."]}),`
`,e.jsx(n.li,{children:"Return to the previous save state."}),`
`,e.jsx(n.li,{children:"Step on the RNG Frame calculated from the above steps."}),`
`]}),`
`,e.jsx(n.p,{children:"You should now have the desired PID."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/Egg/PID.png",alt:"PID"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If the PID does not match the desired one, check for accuracy in PokeFinder. Common issues include incorrect info and taking steps outside the daycare.
`})}),`
`,e.jsx(n.h2,{children:"Part 2: RNGing for IVs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go outside and stand by the daycare man. Save the game."}),`
`,e.jsxs(n.li,{children:["Input the parents' IVs into PokeFinder.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure the first Pokémon deposited is Parent A, and the second is Parent B."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Change the Method to Normal."}),`
`,e.jsx(n.li,{children:"Set the IVs to your desired values."}),`
`,e.jsx(n.li,{children:"Generate results to find a target advance."}),`
`,e.jsx(n.li,{children:"Restart the emulator."}),`
`,e.jsx(n.li,{children:'Accept the egg from the daycare man, pausing the emulator at the last dialogue ("Take good care of it.").'}),`
`,e.jsx(n.li,{children:"Create a save state."}),`
`]}),`
`,e.jsx(n.p,{children:"Again, you need to consider delay."}),`
`,e.jsx(n.h3,{children:"Finding Your Delay for IVs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Advance to 3 before the target advance, pause, hold ",e.jsx(n.code,{children:"A"}),", and unpause."]}),`
`,e.jsx(n.li,{children:"If the IVs aren’t what you want, find what advance you hit in PokeFinder. Set the IV filters for the egg obtained and check for matching IVs."}),`
`,e.jsxs(n.li,{children:["Determine your delay using ",e.jsx(n.code,{children:"Target Advance - Advance Hit = Delay"}),"."]}),`
`,e.jsxs(n.li,{children:["Subtract the delay from your target advance to find the RNG Frame to press ",e.jsx(n.code,{children:"A"})," on (",e.jsx(n.code,{children:"Target Advance - Delay = RNG Frame to press A on"}),")."]}),`
`,e.jsx(n.li,{children:"Return to the previous save state."}),`
`,e.jsx(n.li,{children:"Step on the RNG Frame calculated from the above steps."}),`
`]}),`
`,e.jsx(n.p,{children:"You should now have the desired IVs."}),`
`,e.jsx(n.p,{children:"If the IVs are not as desired, ensure you have correctly inputted info in PokeFinder and that the order of parents is not swapped."})]})}function d(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{d as default,a as frontmatter};
