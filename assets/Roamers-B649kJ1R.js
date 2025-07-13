import{A as t,j as e}from"./index-D7v7fLNt.js";const i=[{title:"Black and White Roamer RNG",navDrawerTitle:"Roamer RNG",description:"Learn how to RNG Tornadus and Thundurus in Black and White for shiny and high-IV results.",slug:"emulator-bw-roamers",category:"Black and White",tag:"emu"}];function s(r){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Finding a spread"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In RNG Reporter, set the Month to 2 and 11."}),`
`,e.jsx(n.li,{children:"Set the Encounter Type to Roaming Pokémon and Method as IVs (Standard Seed)."}),`
`,e.jsx(n.li,{children:"Choose a nice IV Spread; do not worry about Shininess right now."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you choose a different month, your Frames will be way more unstable/random and thus more luck-based.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This should take a while.
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Target.png",alt:"Target Seed"})}),`
`,e.jsx(n.h2,{children:"Step 2: Getting the target PID and Nature"}),`
`,e.jsx(n.p,{children:"Before we only searched for an IV spread because TID abuse is recommended for shiny roamers with good IVs."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If you only want IVs or Shininess and not both, feel free to skip this and the next step.
`})}),`
`,e.jsx(n.p,{children:"Choose a Frame (recommended: at least 1500 Frames, perhaps 2000 if using a month other than 2 or 11). Note the PID and the Frame."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Pandora.png",alt:"Pandora's Box"})}),`
`,e.jsx(n.h2,{children:"Step 3: Save preparation"}),`
`,e.jsx(n.p,{children:"Similar to Generation 3 or 4 RNG abuse, it is recommended that you TID/SID abuse for a good shiny. Skip this step if you only care about IVs or only care about Shininess."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Choose a TID/SID combo you like (or specify a TID/SID) and get your TID/SID."}),`
`,e.jsx(n.li,{children:"Hit your Initial Seed and advance frames."}),`
`,e.jsx(n.li,{children:"Note your TID/SID and get to the point you can release the roamer."}),`
`,e.jsx(n.li,{children:"Then save inside."}),`
`]}),`
`,e.jsx(n.p,{children:"This is where you should save (the house on Route 7):"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Save.png",alt:"Where to save"})}),`
`,e.jsx(n.h2,{children:"Step 4: Calibration"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.p,{children:"On the RNG Reporter screen, you got a Frame Number, most likely between 1-6."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Advance frames by walking around in the house."}),`
`,e.jsx(n.li,{children:"Make a Save State and walk outside. Get to the screen pictured above."}),`
`,e.jsx(n.li,{children:"Start advancing frames."}),`
`,e.jsxs(n.li,{children:["Once you're at the target frame, press ",e.jsx(n.code,{children:"A"}),"."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: It will most likely not have hit your Frame. You can check your Pokédex to see if you succeeded. (Assuming you are aiming for a shiny)
`})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"Run into the roamer and note the PID. You can use a Lua Script to see the PID or catch it and use PkHeX to view the stats."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Calibration.png",alt:"Calibration"})}),`
`,e.jsx(n.h2,{children:"Step 5: Getting the target"}),`
`,e.jsx(n.p,{children:"At this point, you should have found the PID you hit."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go back to RNG Reporter."}),`
`,e.jsx(n.li,{children:"On the main screen, enter your Seed and ensure it searches Generation 5 PIDRNG abuse."}),`
`,e.jsx(n.li,{children:"Hit Search and look for your PID."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: Exporting the results to .txt makes this easier, so you can use `Ctrl` + `F` to find the PID.\n"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Find out how many frames advanced after hitting ",e.jsx(n.code,{children:"A"}),", and subtract that from your target. This is your new target frame."]}),`
`,e.jsx(n.li,{children:"Try to hit this new target frame. If you do not hit your Pokémon,"}),`
`,e.jsx(n.li,{children:"Repeat these steps once more."}),`
`,e.jsx(n.li,{children:"You may need to repeat this multiple times, but you will succeed eventually."}),`
`,e.jsxs(n.li,{children:["Keep track of what Frames you have hit and what Frame you pressed ",e.jsx(n.code,{children:"A"})," on before in Notepad or Google Docs."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Success.png",alt:"Success"})}),`
`,e.jsx(n.h2,{children:"Celebrate!"}),`
`,e.jsx(n.p,{children:"Catch your roamer with a Master Ball or use a Mean Look/Arena Trap/Shadow Tag Trapper. Then share your success with your friends or the Pokemon RNG Discord's bragging channel."}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function o(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{o as default,i as frontmatter};
