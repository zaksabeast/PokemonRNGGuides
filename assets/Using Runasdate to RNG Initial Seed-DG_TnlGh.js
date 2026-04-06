import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CndXGoE5.js";var n=e(),r=[{title:`Black 2 and White 2 Initial Seed RNG`,navDrawerTitle:`Initial Seed RNG`,description:`Learn how to RNG your initial seed in Black 2 and White 2.`,slug:`emulator-b2w2-runasdate-inital-seed`,category:`Black 2 and White 2`,section:`rng_technique`,variant:`cfw-emu`},{title:`Black and White Initial Seed RNG`,navDrawerTitle:`Initial Seed RNG`,description:`Learn how to RNG your initial seed in Black and White.`,slug:`emulator-bw-runasdate-initial-seed`,category:`Black and White`,section:`rng_technique`,variant:`cfw-emu`,canonical:`emulator-b2w2-runasdate-inital-seed`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`This guide assumes you have found your target seed. You need your target seed before following this guide.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://www.nirsoft.net/utils/run_as_date.html`,children:`RunAsDate`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`What is RunAsDate?`}),`
`,(0,n.jsx)(r.p,{children:`RunAsDate is a tool by Nirsoft that loads any program with a user-specified time. It's useful for Gen 5 RNG and helps you hit your seed easily. This guide focuses only on RunAsDate.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Setup RunAsDate`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Launch RunAsDate.`}),`
`,(0,n.jsx)(r.li,{children:`Configure RunAsDate to match the image below.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Initial-Seed/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`You'll never need to change this again. This is the universal RunAsDate configuration for RNG (Gen 3, 4, or 5).
`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Select the program you want to fake the date/time using the `,(0,n.jsx)(r.code,{children:`Browse...`}),` button.`]}),`
`,(0,n.jsx)(r.li,{children:`Set the date and time to one of the given times in PokeFinder to hit your seed.`}),`
`,(0,n.jsxs)(r.li,{children:[`Hit `,(0,n.jsx)(r.code,{children:`Run`}),`, and Desmume should launch.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Desmume will now run with the date and time you selected.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Hitting the target seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Load the Lua script.`}),`
`,(0,n.jsx)(r.li,{children:`Load your game.`}),`
`,(0,n.jsx)(r.li,{children:`Do any necessary keypresses to hit your target seed.`}),`
`,(0,n.jsx)(r.li,{children:`You can now continue as you would with basic RNG!`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsx)(r.p,{children:`If you're not hitting the right seed on the first try with RunAsDate, check these things:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RunAsDate time.`}),`
`,(0,n.jsx)(r.li,{children:`RNG profile.`}),`
`,(0,n.jsx)(r.li,{children:`Keypresses needed to hit your seed.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Italian translation: Fiask.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};