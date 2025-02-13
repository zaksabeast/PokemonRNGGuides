import{u as a,j as e}from"./index-DtinywFa.js";const s={title:"Egg RNG",description:"RNG Eggs from the Daycare",slug:"emulator-emerald-egg",subCategory:"Emulator"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://code.google.com/archive/p/vba-rerecording/downloads",children:"VBA-RR"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pokerng.forumcommunity.net/?t=56443955&p=396434940",children:"Lua Scripts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Password is ",e.jsx(n.code,{children:"allyouneedisnoob"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"The parent Pokemon IVs and their compatibility (Talk to the daycare man for compatibility)"}),`
`,e.jsx(n.li,{children:"TID and SID if you're going for a shiny. These are not necessary if you just want IVs/Nature."}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"Eggs in Emerald are generated in two parts. The PID of the Pokemon is generated when the player takes a step that causes an egg to be generated at the daycare. The IVs of the Pokemon are generated when collecting the egg from the daycare man. As a result, there are two parts to RNGing a perfect shiny egg."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Deposit both Pokemon into the daycare.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Take note of the order you deposit them in."}),`
`,e.jsx(n.li,{children:"The first parent deposited will be Parent A, and the second parent deposited will be Parent B"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Do not give an Everstone to either parent. Everstone does not work in Emerald for breeding and will give incorrect results.
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Talk to the daycare man to determine their compatibility.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will be needed later to input into PokeFinder."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Go back inside the daycare and take steps until the lua script displays ",e.jsx(n.code,{children:"FE"})," for the step counter.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure to do the steps inside the daycare and not outside of it."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/Egg/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsx(n.li,{children:"Create a savestate here before continuining on."}),`
`]}),`
`,e.jsx(n.h2,{children:"PokeFinder Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open PokeFinder and click on "Gen 3 Egg". Make sure to be on the Emerald tab.'}),`
`,e.jsxs(n.li,{children:['You can set "Max Results" to however high you are willing to wait.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For a shiny PID it shouldn't be too hard to find a result within a few minutes wait though."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:`Set "Method" to PID, since the PID of the egg will be RNG'd first.`}),`
`]}),`
`,e.jsx(n.h2,{children:"Redraws"}),`
`,e.jsx(n.p,{children:"For Emerald egg RNG, redraws of the game's graphics can be done to hit specific PIDs."}),`
`,e.jsx(n.p,{children:"To do a single redraw:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the menu"}),`
`,e.jsx(n.li,{children:"Open the Pokedex"}),`
`,e.jsx(n.li,{children:"Back out of the Pokedex into the menu"}),`
`]}),`
`,e.jsx(n.p,{children:"Open and close the Pokedex for as many redraws as needed for the target PID."}),`
`,e.jsx(n.h2,{children:"Calibration"}),`
`,e.jsx(n.p,{children:"Before RNGing for your desired egg, a calibration must be done."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Restart the emulator and pause when the save has loaded."}),`
`,e.jsx(n.li,{children:"Take note of the RNG Frame displayed by the lua script and create a save state."}),`
`,e.jsxs(n.li,{children:["Hold down the directional button to take a step while unpausing the emulator.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If an egg is generated, continue to the next step."}),`
`,e.jsx(n.li,{children:"If no egg is generated, reload the previous save state and advance a frame (CTRL + N). Take another step to try to generate an egg. Repeat as needed."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Choose the nature of the egg generated in the dropdown for Nature."}),`
`,e.jsx(n.li,{children:"Set redraws to 0 in PokeFinder."}),`
`,e.jsxs(n.li,{children:['Click "Generate" in PokeFinder and find the PID of the generated egg in the Advances column by looking around the RNG Frame you took a step on.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the PID cannot be found, change the calibration by 1 and generate new results."}),`
`,e.jsx(n.li,{children:"Repeat as needed until a match is found."}),`
`,e.jsx(n.li,{children:"Calibration will be between 17 and 21."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/Egg/Calibration.png",alt:"Calibration"})}),`
`,e.jsx(n.p,{children:"In the example above, the calibration is 20. The frame was found after selecting Timid from the nature dropdown and searching for the PID of the egg."}),`
`,e.jsx(n.p,{children:"The calibration will always be the same for this save, so you can use the same calibration for future egg RNGs."}),`
`,e.jsx(n.h2,{children:"Part 1: RNGing for PID"}),`
`,e.jsx(n.p,{children:"Now that you have found your calibration, it is time to RNG an egg."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Set the filters to what you want.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For this part only Ability, Gender, Nature, and Shiny can be RNG'd."}),`
`,e.jsx(n.li,{children:"Make sure the Gender Ratio is set correctly for the Pokemon you are RNGing."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Set the redraws to what you want as well.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Adjusting redraws can give different results for more possibilities if needed."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Generate results and look for a target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can adjust redraws and the filters as needed to find a target advance."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Reset the emulator and do the redraws as needed."}),`
`,e.jsx(n.li,{children:"Create a save state when you get close to the target advance."}),`
`]}),`
`,e.jsx(n.p,{children:"To be able to hit your target advance, the delay must be taken into account. The next section explains how to do this."}),`
`,e.jsx(n.h3,{children:"Finding your delay for PID"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Take a step 18 advances before your target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If no egg is generated, continue on to find your delay."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Find what advance you hit in PokeFinder. You can do this by setting the filters to the egg you got and then looking for the PID of the egg."}),`
`,e.jsxs(n.li,{children:["Find your delay using ",e.jsx(n.code,{children:"Target Advance - Advance Hit = Delay"}),"."]}),`
`,e.jsxs(n.li,{children:["Add the delay to your target advance to get the RNG Frame you need to take a step on (",e.jsx(n.code,{children:"Target Advance + Delay = RNG Frame to take a step on"}),")."]}),`
`,e.jsx(n.li,{children:"Go back to the previous save state."}),`
`,e.jsx(n.li,{children:"Take a step on the RNG Frame calculated from the above steps."}),`
`]}),`
`,e.jsx(n.p,{children:"You should now have the desired PID."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/Egg/PID.png",alt:"PID"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If the PID does not match the desired PID, check that everything is correct in PokeFinder. Common issues are not having all of the info correct, and not doing the steps inside the daycare.
`})}),`
`,e.jsx(n.h2,{children:"Part 2: RNGing for IVs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go outside and stand by the daycare man. Save the game."}),`
`,e.jsxs(n.li,{children:["Input the parent's IVs into PokeFinder.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure the first Pokemon you deposited is Parent A, and the second Pokemon deposited is Parent B."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Change the Method to Normal."}),`
`,e.jsx(n.li,{children:"Set the IVs to be what you want."}),`
`,e.jsx(n.li,{children:"Generate results and look for a target advance."}),`
`,e.jsx(n.li,{children:"Restart the emulator."}),`
`,e.jsx(n.li,{children:'Accept the egg from the daycare man, and pause the emulator at the last dialogue. ("Take good care of it.")'}),`
`,e.jsx(n.li,{children:"Make a save state."}),`
`]}),`
`,e.jsx(n.p,{children:"Again, delay will have to be taken into account."}),`
`,e.jsx(n.h3,{children:"Finding your delay for IVs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Advance to 3 before the target advance, pause, hold A, and unpause."}),`
`,e.jsx(n.li,{children:"If the IVs are not the desired ones, you can find what advance you hit in PokeFinder. You can do this by setting the IV filters for the egg you got and then looking for the advance with matching IVs."}),`
`,e.jsxs(n.li,{children:["Find your delay using ",e.jsx(n.code,{children:"Target Advance - Advance Hit = Delay"}),"."]}),`
`,e.jsxs(n.li,{children:["Subtract the delay from your target advance to know what RNG Frame to press A. (",e.jsx(n.code,{children:"Target Advance - Delay = RNG Frame to press A on"}),")"]}),`
`,e.jsx(n.li,{children:"Go back to the previous save state."}),`
`,e.jsx(n.li,{children:"Take a step on the RNG Frame calculated from the above steps."}),`
`]}),`
`,e.jsx(n.p,{children:"You should now have the desired IVs."}),`
`,e.jsx(n.p,{children:"If you do not have the desired IVs, check that everything is correct in PokeFinder and that the order of parents is not swapped."})]})}function o(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,s as frontmatter};
