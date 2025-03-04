import{u as i,j as e}from"./index-CUW7P-dy.js";const o={title:"FRLG Stationary/Gift RNG",description:"Get shiny 6 IV stationaries from FRLG",slug:"emulator-flrg-stationary-and-gift",subCategory:"Emulator"};function t(r){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"VBA-rr"}),`
`,e.jsxs(n.li,{children:["Lua scripts for FRLG (available ",e.jsx(n.a,{href:"https://projectpokemon.org/home/forums/topic/15187-gen-3-lua-scripts/?tab=comments#comment-127239",children:"here"})," - you'll need to copy the code, paste it to a notepad, and rename the file to 'whatyouwant.lua')"]}),`
`,e.jsx(n.li,{children:"Knowledge of how to use the Memory Viewer"}),`
`,e.jsx(n.li,{children:"RNG Reporter"}),`
`,e.jsx(n.li,{children:"Your TID/SID"}),`
`,e.jsx(n.li,{children:"A calculator and a notepad"}),`
`,e.jsx(n.li,{children:"A way to read your save—PKHeX is recommended"}),`
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
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open your emulator."}),`
`,e.jsx(n.li,{children:"Have a save in front of the stationary Pokémon or the NPC that gives you the Pokémon."}),`
`,e.jsx(n.li,{children:'Load your Lua script by going to "Tools" => "Lua Scripting" => "New Lua Script". Select the Lua file you saved earlier.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Setup the initial seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the game."}),`
`,e.jsx(n.li,{children:'Enter the "Continue" menu.'}),`
`,e.jsxs(n.li,{children:["Pause the emulator to find your initial seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"FRLG generates different spreads each time the game loads, preventing repeats."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Open the Memory Viewer and search at the address 0x02020000."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Stationary/Memory-Viewer.png",alt:"Memory Viewer"})}),`
`,e.jsxs(n.p,{children:['The "1330" is the seed for this run. It changes after pressing ',e.jsx(n.code,{children:"A"})," or ",e.jsx(n.code,{children:"Start"}),". You must use what you have."]}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsxs(n.li,{children:['Enter it in the "Seed (Hex)" box in RNG Reporter.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Enter your target settings for the Pokémon you want (shiny, IVs, nature, encounter slots, etc.) and hit "Generate".'}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Stationary/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.h2,{children:"Step 4: RNG process"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Pick a frame to hit in RNG Reporter."}),`
`,e.jsx(n.li,{children:"Your player should be in front of the right legendary, NPC, or Pokéball."}),`
`,e.jsx(n.li,{children:"Create a save state to avoid mistakes."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Don't hesitate to overuse save states! This allows you to go back to lower frames and adjust since calibration is required every time.
`})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Advance to the final screen.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`If the Pokémon has a dialog (like a cry) before the battle, that's the final screen before it's generated. The final screen for wild Pokémon is the cursor on "Sweet Scent". This may vary by case.`}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 5: Calibration"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Create a save state."}),`
`,e.jsx(n.li,{children:"Write down the current frame."}),`
`,e.jsxs(n.li,{children:["Hold the ",e.jsx(n.code,{children:"A"})," button and unpause the game.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This triggers the battle or finishes the dialog for a gift on the final screen."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Check the stats of the Pokémon you've found. There are two cases:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If it's stationary, the Lua will show all the IVs."}),`
`,e.jsx(n.li,{children:"If it's a gift, save your game and load it with PKHeX."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Reload the save state you made to attempt the RNG again.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This keeps the calibration intact while checking the Pokémon's stats."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Enter the Pokémon's stats into RNG Reporter to find the frame."}),`
`,e.jsxs(n.li,{children:["Find how many frames you were off by:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["(Frame you pressed ",e.jsx(n.code,{children:"A"}),") - (Frame from reporter)."]}),`
`,e.jsx(n.li,{children:"It will often be a negative result around 90% of the time, which is normal."}),`
`,e.jsxs(n.li,{children:["For example, if you pressed ",e.jsx(n.code,{children:"A"})," on frame 100 and hit Pokémon was frame 103, you were off by -3 frames."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Add the number of frames you were off to your original frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If you got a negative number, subtract it from your original frame."}),`
`,e.jsxs(n.li,{children:["This new number is the new frame to press ",e.jsx(n.code,{children:"A"})," on."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can calibrate whenever you want. For fast targets, doing it near your shiny frame helps. Calibrating too early can cause too low of a delay around your frame, requiring recalibration.
`})}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"If you didn’t hit your target after calibration, retry the calibration step."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can use save states to avoid problems."}),`
`]}),`
`,e.jsx(n.p,{children:"If you still can't hit anything after a few tries, double-check your setup."}),`
`,e.jsx(n.p,{children:"If you followed all steps, the Pokémon will be what you wanted after calibration. Congrats, you did your Gen 3 wild RNG!"})]})}function a(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{a as default,o as frontmatter};
