import{u as i,j as e}from"./index-BJtZlH_-.js";const o={title:"Entralink (Emulator)",description:"How to RNG cool Pokémon with Entralink RNG",slug:"emulator-bw-entralink",subCategory:"Emulator",tag:"emu"};function r(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:"A save with access to the C-Gear (and with the profile/calibration set up)"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/",children:"Suloku's Gen V Save Tool (optional)"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Inject an RNG Target (optional)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Suloku's Gen V Save Tool."}),`
`,e.jsx(n.li,{children:"Add the Pokémon you want to RNG."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a Frame/Target Seed/IVs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RNG Reporter and go to Generation 5 Time Finder."}),`
`,e.jsx(n.li,{children:"Set up Time Finder like this."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Entralink/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Change Delay/Frame as needed."}),`
`,e.jsx(n.li,{children:"Set minimum frame to at least 21. You cannot hit anything lower."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Finding the Delay you need to hit"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["The seed listed may be significantly shorter than normal Generation 5 seeds.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You still need to hit the Initial Seed (the 32-digit one)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Right-click your selected spread and hit ",e.jsx(n.code,{children:"Generate Entralink Nature Seeds"}),"."]}),`
`,e.jsx(n.li,{children:"Choose a list of desired natures."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Generate"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Hitting C-Gear Seed and Initial Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go to the text where it says ",e.jsx(n.code,{children:"[Player] warped to the Entralink!"})," and make a save state. Pause the game and note the delay.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You will find out how long it takes for the C-Gear Seed to generate after pressing ",e.jsx(n.code,{children:"A"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"}),", and the Lua will tell you the C-Gear Seed you hit."]}),`
`,e.jsx(n.li,{children:"Go back to RNG Reporter and go to Generation 5 Tools > Seed To Time."}),`
`,e.jsx(n.li,{children:"Type in the C-Gear Seed you got."}),`
`,e.jsxs(n.li,{children:["Subtract the delay where you pressed ",e.jsx(n.code,{children:"A"})," from the delay when the C-Gear Seed was generated."]}),`
`,e.jsx(n.li,{children:"Subtract the result from your target delay. For example, if my target delay was 4288 and the difference was 200, I would hit delay 4088."}),`
`,e.jsxs(n.li,{children:["Hit your Initial Seed again and do delay advances. Press ",e.jsx(n.code,{children:"N"})," to add 1 to the delay to inch closer."]}),`
`,e.jsxs(n.li,{children:["If you fail, just try again. There may be a small gap between when you unpause the emulator and press ",e.jsx(n.code,{children:"A"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 5: Advancing frames"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Pay attention to the ",e.jsx(n.strong,{children:"IVRNG Frame"}),"."]}),`
`,e.jsxs(n.li,{children:["Subtract ",e.jsx(n.strong,{children:"13"})," from your target frame. You will advance frames until you hit that."]}),`
`,e.jsx(n.li,{children:"Advance frames by walking around. Only have 1 Pokémon in your party to avoid advancing too many frames at once."}),`
`,e.jsx(n.li,{children:"When you hit your IVRNG Frame, interact with your target Pokémon immediately. Make a save state and enter the battle."}),`
`,e.jsx(n.li,{children:"If done correctly, you will get the correct IVs on your target. Yay!"}),`
`,e.jsx(n.li,{children:"To get your Nature, move to Step 6 or reload the save state and re-catch the Pokémon."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Make sure to hit a different PIDRNG Frame each time, or you will get the same nature.
`})}),`
`,e.jsx(n.h2,{children:"Step 6: Getting a good Nature"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go back to RNG Reporter and go to Entralink Seed Search. Note the Frame: that is the PIDRNG Frame you need to hit."}),`
`,e.jsx(n.li,{children:"Go back to your save state and wait until you are 6 frames before the frame listed in RNG Reporter."}),`
`,e.jsx(n.li,{children:"Enter the battle again and catch the Pokémon."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Make sure to have the correct Gender ratio set up!
`})}),`
`,e.jsx(n.h3,{children:"Congrats!"}),`
`,e.jsx(n.p,{children:"You have just completed your Entralink RNG!"})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{l as default,o as frontmatter};
