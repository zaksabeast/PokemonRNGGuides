import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DO7tO6lS.js";var n=e(),r=[{title:`Black and White Roamer RNG`,navDrawerTitle:`Roamer RNG`,description:`Learn how to RNG Tornadus and Thundurus in Black and White for shiny and high-IV results.`,slug:`emulator-bw-roamers`,category:`Black and White`,section:`pokemon_rng`,variant:`cfw-emu`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/RNGReporter/releases`,children:`RNG Reporter`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Finding a spread`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In RNG Reporter, set the Month to 2 and 11.`}),`
`,(0,n.jsx)(r.li,{children:`Set the Encounter Type to Roaming Pokémon and Method as IVs (Standard Seed).`}),`
`,(0,n.jsx)(r.li,{children:`Choose a nice IV Spread; do not worry about Shininess right now.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Roamer/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you choose a different month, your Frames will be way more unstable/random and thus more luck-based.
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: This should take a while.
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Roamer/Target.png`,alt:`Target Seed`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Getting the target PID and Nature`}),`
`,(0,n.jsx)(r.p,{children:`Before we only searched for an IV spread because TID abuse is recommended for shiny roamers with good IVs.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`If you only want IVs or Shininess and not both, feel free to skip this and the next step.
`})}),`
`,(0,n.jsx)(r.p,{children:`Choose a Frame (recommended: at least 1500 Frames, perhaps 2000 if using a month other than 2 or 11). Note the PID and the Frame.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Roamer/Pandora.png`,alt:`Pandora's Box`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Save preparation`}),`
`,(0,n.jsx)(r.p,{children:`Similar to Generation 3 or 4 RNG abuse, it is recommended that you TID/SID abuse for a good shiny. Skip this step if you only care about IVs or only care about Shininess.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Choose a TID/SID combo you like (or specify a TID/SID) and get your TID/SID.`}),`
`,(0,n.jsx)(r.li,{children:`Hit your Initial Seed and advance frames.`}),`
`,(0,n.jsx)(r.li,{children:`Note your TID/SID and get to the point you can release the roamer.`}),`
`,(0,n.jsx)(r.li,{children:`Then save inside.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`This is where you should save (the house on Route 7):`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Roamer/Save.png`,alt:`Where to save`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Calibration`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Roamer/Final-Screen.png`,alt:`Final Screen`})}),`
`,(0,n.jsx)(r.p,{children:`On the RNG Reporter screen, you got a Frame Number, most likely between 1-6.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Advance frames by walking around in the house.`}),`
`,(0,n.jsx)(r.li,{children:`Make a Save State and walk outside. Get to the screen pictured above.`}),`
`,(0,n.jsx)(r.li,{children:`Start advancing frames.`}),`
`,(0,n.jsxs)(r.li,{children:[`Once you're at the target frame, press `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: It will most likely not have hit your Frame. You can check your Pokédex to see if you succeeded. (Assuming you are aiming for a shiny)
`})}),`
`,(0,n.jsxs)(r.ol,{start:`5`,children:[`
`,(0,n.jsx)(r.li,{children:`Run into the roamer and note the PID. You can use a Lua Script to see the PID or catch it and use PkHeX to view the stats.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Roamer/Calibration.png`,alt:`Calibration`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 5: Getting the target`}),`
`,(0,n.jsx)(r.p,{children:`At this point, you should have found the PID you hit.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Go back to RNG Reporter.`}),`
`,(0,n.jsx)(r.li,{children:`On the main screen, enter your Seed and ensure it searches Generation 5 PIDRNG abuse.`}),`
`,(0,n.jsx)(r.li,{children:`Hit Search and look for your PID.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:"Note: Exporting the results to .txt makes this easier, so you can use `Ctrl` + `F` to find the PID.\n"})}),`
`,(0,n.jsxs)(r.ol,{start:`4`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Find out how many frames advanced after hitting `,(0,n.jsx)(r.code,{children:`A`}),`, and subtract that from your target. This is your new target frame.`]}),`
`,(0,n.jsx)(r.li,{children:`Try to hit this new target frame. If you do not hit your Pokémon,`}),`
`,(0,n.jsx)(r.li,{children:`Repeat these steps once more.`}),`
`,(0,n.jsx)(r.li,{children:`You may need to repeat this multiple times, but you will succeed eventually.`}),`
`,(0,n.jsxs)(r.li,{children:[`Keep track of what Frames you have hit and what Frame you pressed `,(0,n.jsx)(r.code,{children:`A`}),` on before in Notepad or Google Docs.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Roamer/Success.png`,alt:`Success`})}),`
`,(0,n.jsx)(r.h2,{children:`Celebrate!`}),`
`,(0,n.jsx)(r.p,{children:`Catch your roamer with a Master Ball or use a Mean Look/Arena Trap/Shadow Tag Trapper. Then share your success with your friends or the Pokemon RNG Discord's bragging channel.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};