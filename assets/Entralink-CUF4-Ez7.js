import{u as r,j as e}from"./index-C7pESl3A.js";const l={title:"Entralink",description:"How to RNG cool Pokemon with Entralink RNG",slug:"emulator-bw-entralink",subCategory:"Emulator"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Desmume",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Setup Desmume for RNG"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:"A save with access to the C-Gear (And with the profile/calibration set up)"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/",children:"Suloku's Gen V Save Tool (optional)"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Inject an RNG Target (Optional)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Suloku's Gen V Save Tool"}),`
`,e.jsx(n.li,{children:"Add the Pokemon you want to RNG"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a Frame/Target Seed/IVs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RNG Reporter and go to Generation 5 Time Finder"}),`
`,e.jsx(n.li,{children:"Set up Time Finder like this"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Entralink/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Change Delay/Frame as you see fit"}),`
`,e.jsx(n.li,{children:"Set minimum frame to at least 21. It is not possible to hit anything lower."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Finding the Delay you need to hit"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["You may notice that the seed listed is significantly shorter than normal Generation 5 seeds.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Unfortunately, you still need to hit the Initial Seed (The 32 Digit one)"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Right Click your selected spread and hit ",e.jsx(n.code,{children:"Generate Entralink Nature Seeds"})]}),`
`,e.jsx(n.li,{children:"Choose a list of natures that you desire"}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Generate"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Hitting C-Gear Seed and Initial Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go to the text where it says ",e.jsx(n.code,{children:"[Player] warped to the Entralink!"})," and make a save state. Pause the game and note the delay.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"We will be finding out how long it takes for the C-Gear Seed to generate after pressing A."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Press "A" and in the output, the lua will tell us what the C-Gear Seed we hit was.'}),`
`,e.jsx(n.li,{children:"Go back to RNG Reporter and go to Generation 5 Tools > Seed To Time"}),`
`,e.jsx(n.li,{children:"Type in the C-Gear Seed you got."}),`
`,e.jsx(n.li,{children:"Subtract the Delay where you pressed A from the Delay you hit when the C-Gear Seed was generated."}),`
`,e.jsx(n.li,{children:"Now take the result and subtract the result from your target delay. For example, if my target delay was 4288 and the difference was 200, I would hit delay 4088."}),`
`,e.jsx(n.li,{children:"Hit your Initial Seed again and do Delay advances. You can inch closer by pressing N, which will add 1 to the delay."}),`
`,e.jsx(n.li,{children:"If you failed, just try again. Sometimes you think you hit it, but there was a small gap between when you unpause the emulator and press A."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 5: Advancing frames"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Make sure to pay attention to the ",e.jsx(n.strong,{children:"IVRNG Frame"}),"!"]}),`
`,e.jsxs(n.li,{children:["Subtract ",e.jsx(n.strong,{children:"13"})," from your target frame. You will be advancing frames until you hit that."]}),`
`,e.jsx(n.li,{children:"You advance frames by walking around. Make sure to only have 1 Pokemon in your party, or else it will advance too many frames at once."}),`
`,e.jsx(n.li,{children:"When you hit your IVRNG Frame, interact with your target Pokemon immediately. Make a save state and enter the battle."}),`
`,e.jsx(n.li,{children:"If you did it correctly, you will get the correct IVs on your target. Yay!"}),`
`,e.jsx(n.li,{children:"To get your Nature, you can either move onto Step 6 or reload the Save State and re-catch the Pokemon."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Make sure to hit a different PIDRNG Frame each time or you will end up getting the same nature
`})}),`
`,e.jsx(n.h2,{children:"Step 6: Getting a good Nature"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go back to RNG Reporter and go to Entralink Seed Search. Notice the Frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"That is the PIDRNG Frame you need to hit."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Go back to your save state and wait until you are 6 before the frame listed in RNG Reporter."}),`
`,e.jsx(n.li,{children:"Then enter the battle again and catch the Pokemon."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Make sure to have the correct Gender ratio set up!
`})}),`
`,e.jsx(n.h3,{children:"Congrats!"}),`
`,e.jsx(n.p,{children:"You have just completed your Entralink RNG!"})]})}function o(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,l as frontmatter};
