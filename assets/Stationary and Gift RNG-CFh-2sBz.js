import{u as o,j as e}from"./index-JGnwVbR5.js";const s={title:"FRLG Stationary/Gift RNG",description:"Get shiny 6 IV stationaries from FRLG",slug:"emulator-flrg-stationary-and-gift",subCategory:"Emulator"};function r(t){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"VBA-rr"}),`
`,e.jsxs(n.li,{children:["Lua scripts for FRLG (available ",e.jsx(n.a,{href:"https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239",children:"here"})," - you'll need to copy the code, paste it to a notepad, and rename the file into 'whatyouwant.lua')"]}),`
`,e.jsx(n.li,{children:"Knowledge of how to deal with the Memory Viewer"}),`
`,e.jsx(n.li,{children:"RNG Reporter"}),`
`,e.jsx(n.li,{children:"Your TID / SID"}),`
`,e.jsx(n.li,{children:"A Calculator and a notepad"}),`
`,e.jsx(n.li,{children:"A way to read your save - PKHeX is recommended"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setup RNG Reporter"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RNG Reporter."}),`
`,e.jsx(n.li,{children:"Enter your TID/SID."}),`
`,e.jsx(n.li,{children:"Use Method 1."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Pokemon that are Method 1 in FRLG:

Bulbasaur, Charmander, Squirtle, Clefairy, Abra, Hypno, Voltorb, Electrode, Hitmonlee, Hitmonchan, Scyther, Pinsir, Magikarp, Lapras, Eevee, Porygon, Omanyte, Kabuto, Aerodactyl, Snorlax, Articuno, Zapdos, Moltres, Dratini, Mewtwo, Togepi, Lugia, Ho-Oh, Deoxys.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Setup VBA"}),`
`,e.jsx(n.p,{children:"1.Open your emulator."}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"You should have a save in front of the stationary Pokemon or the NPC that gives you the Pokemon."}),`
`,e.jsxs(n.li,{children:['Load your Lua Script by going to "Tools" => "Lua Scripting" => "New Lua Script".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A box will pop-up where you'll be able to select the lua you saved earlier."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Setup the initial seed"}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsx(n.li,{children:"Load the game"}),`
`,e.jsx(n.li,{children:'Enter into the "Continue" menu of the game.'}),`
`,e.jsxs(n.li,{children:["Pause the emulator to find your initial seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"FRLG uses the continue screen to generate different spreads every time the game loads to avoid repeating spreads like in dry battery Ruby and Sapphire. This has the big advantage to give you new results every time you load your game."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"To find your seed, you must open the Memory Viewer, and search the address at 0x02020000."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Stationary/Memory-Viewer.png",alt:"Memory Viewer"})}),`
`,e.jsx(n.p,{children:`The "1330" is my seed for this run of FRLG. It changes after pressing A / Start in the main screen. There's no real way to manipulate it for the moment, so you must go with what you have.`}),`
`,e.jsxs(n.ol,{start:"8",children:[`
`,e.jsxs(n.li,{children:['Enter it in the "Seed (Hex)" box in RNG Reporter.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`Now the tool is ALMOST set up. Enter in your target settings for the Pokemon you wish to search for (shiny, IVs, nature, encounter slots, etc) and once it's done, hit "Generate".`}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Stationary/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.h2,{children:"Step 4: RNG process"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Pick a frame you want to hit in RNG Reporter."}),`
`,e.jsx(n.li,{children:"Your player should be in front of the right legendary, NPC or Pokeball."}),`
`,e.jsx(n.li,{children:"Create a save state in case you mess up something later."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Don't hesitate to overuse save states! It's really important! This way you can go back to lower frames, and adjust correctly since calibration will be necessary EVERY TIME!
`})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Advance to the final screen.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`For example, if a Pokemon has a dialog (like a cry) before launching the battle it's the last screen you have before the Pokemon is generated (aka the moment the battle triggers, and the stats will be generated). To compare, the final screen for Wild Pokemon is the cursor on "Sweet Scent".`}),`
`,e.jsx(n.li,{children:"This can change from case to case."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 5: Calibration"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Create a save state."}),`
`,e.jsx(n.li,{children:"Write the current frame down."}),`
`,e.jsxs(n.li,{children:["Hold the A button and unpause the game.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will trigger the battle or finish the dialog for a gift on the final screen."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Check the stats of the Pokemon you've found. There are two cases.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If it's a stationary, the lua will show all the IVs without doing anything."}),`
`,e.jsx(n.li,{children:"If it's a gift, you need to save your game and load it with PKHeX."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Reload the save state you made before in case you need to attempt the RNG again.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In this way, if you have to save the game to check your Pokemon's stats, the calibration will not be messed up."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Enter the Pokemon's stats into RNG Reporter and find the frame of the Pokemon."}),`
`,e.jsxs(n.li,{children:["Find the amount of frames you were off by:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(Frame you pressed A) - (Frame you got from reporter)"}),`
`,e.jsx(n.li,{children:"It'll be a negative result around 90% of the time, but that's normal."}),`
`,e.jsx(n.li,{children:"For example if someone pressed A on frame 100 and the hit Pokemon was frame 103, you were off by -3 frames."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Add the number of frames you were off to your original frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If you had a negative number, subtract it from your original frame."}),`
`,e.jsx(n.li,{children:"This new number is the new frame you should press 'A' on."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can calibrate when you want. For fast targets (aka not going for millions frames) doing it NEAR your Shiny frame will help to have a good delay. Doing it too early could give you a delay too low around your frame, and cause you to calibrate again.
`})}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"If you didn't hit what you wanted after calibration, just retry the calibration part."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can use save-states done before to avoid any problems."}),`
`]}),`
`,e.jsx(n.p,{children:"After a few tries if you still can't hit anything double check your setup."}),`
`,e.jsx(n.p,{children:"If you followed all steps, the Pokemon will be what you wanted after calibration. Tada, you did your Gen 3 Wild RNG!"})]})}function a(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{a as default,s as frontmatter};
