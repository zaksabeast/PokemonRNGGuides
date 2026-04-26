import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DYKm3G_o.js";var n=e(),r=[{title:`How To Find DS Parameters in Generation 5`,navDrawerTitle:`DS Parameters`,description:`Learn how to find your DS parameters for successful RNG in Pokémon Black and White.`,slug:`emulator-bw-find-ds-parameters`,category:`Black and White`,section:`rng_technique`,variant:`cfw-emu`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/RNGReporter/releases`,children:`RNG Reporter`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://runasdate.en.softonic.com/`,children:`RunAsDate`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Things To Know`}),`
`,(0,n.jsx)(r.p,{children:`You need to find your DS Parameters to proceed with RNG. This only needs to be done once per save, console, or emulator.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Set Up RNG Reporter`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open RNG Reporter.`}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`5th Gen Tools -> Find DS Parameters`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Choose your game version and language.`}),`
`,(0,n.jsxs)(r.li,{children:[`Set the Seed Encryption Variables:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`DS Type: Lite/Original`}),`
`,(0,n.jsxs)(r.li,{children:[`DS MAC Address: `,(0,n.jsx)(r.code,{children:`0009BF123456`})]}),`
`,(0,n.jsxs)(r.li,{children:[`VCount: `,(0,n.jsx)(r.code,{children:`10-70`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Timer0: `,(0,n.jsx)(r.code,{children:`300-1200`})]}),`
`,(0,n.jsxs)(r.li,{children:[`GxStat: `,(0,n.jsx)(r.code,{children:`6-6`})]}),`
`,(0,n.jsxs)(r.li,{children:[`VFrame: `,(0,n.jsx)(r.code,{children:`0-15`})]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`DeSmuMe's DS MAC Address is always `,(0,n.jsx)(r.code,{children:`0009BF123456`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Parameters/Setup.png`,alt:`Seed Encryption Variables`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you cannot find a seed, double-check your settings. If correct, try:
- VCount: \`0-FF\`
- Timer0: \`0-FFFF\`
This will take longer to search.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Find Your Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open RunAsDate.`}),`
`,(0,n.jsxs)(r.li,{children:[`Enter any time and check `,(0,n.jsx)(r.code,{children:`Immediate Mode`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Input the same time in the DS Parameter Finder.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Parameters/Time.png`,alt:`Time Input`})}),`
`,(0,n.jsxs)(r.ol,{start:`4`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`Run`}),` in RunAsDate and load your ROM.`]}),`
`,(0,n.jsx)(r.li,{children:`Open your Lua script. Do not press any keys.`}),`
`,(0,n.jsx)(r.li,{children:`Copy the seed you get and paste it into the DS Parameters Finder.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Parameters/Seed.png`,alt:`Initial Seed`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Search for DS Parameters`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`Search`}),` and wait for it to finish.`]}),`
`,(0,n.jsxs)(r.li,{children:[`When you get a result, click `,(0,n.jsx)(r.code,{children:`Send Results to Profile`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Good luck with your RNG!`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: You may need to redo this if you change emulation settings, saves, or redownload the emulator.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};