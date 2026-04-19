import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-CvakMO0A.js";var n=e(),r=[{title:`Diamond, Pearl, and Platinum Initial Seed RNG`,navDrawerTitle:`Initial Seed RNG`,description:`Learn how to RNG your initial seed in Diamond, Pearl, and Platinum.`,slug:`dppt-initial-seed`,category:`Diamond, Pearl, and Platinum`,section:`rng_technique`,variant:`cfw-emu`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`This guide assumes you have found a target seed already. You need your target seed and delay before following this guide.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://www.nirsoft.net/utils/run_as_date.html`,children:`RunAsDate`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`What is RunAsDate?`}),`
`,(0,n.jsx)(r.p,{children:`RunAsDate is a tool that allows any program to load with a set time you specify. This tool is useful for Gen 4 RNG and helps hit your seed easier.`}),`
`,(0,n.jsx)(r.h2,{children:`Setup RunAsDate`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Launch RunAsDate.`}),`
`,(0,n.jsx)(r.li,{children:`Configure RunAsDate to match the image below.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Diamond-Pearl-Platinum/Initial-Seed/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5).
`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Select the program you want to fake the date/time with the `,(0,n.jsx)(r.code,{children:`Browse...`}),` button.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set the date and time to hit your seed as shown in `,(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`}),`.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Right click on the chosen seed and choose "Generate times for seed".`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Hit `,(0,n.jsx)(r.code,{children:`Run`}),` to launch Desmume.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Hitting the target seed`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Make save states often during this process.
`})}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Load the lua script.`}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`A`}),` to reach the "Continue" screen quickly.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Pause your emulator using `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Make plenty of save states.`}),`
`,(0,n.jsx)(r.li,{children:`Unpause your game and let it run until close to your target delay.`}),`
`,(0,n.jsx)(r.li,{children:`When close, pause your emulator.`}),`
`,(0,n.jsx)(r.li,{children:`Create another save state.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`N`}),` to advance the game one video frame to increase the delay.`]}),`
`,(0,n.jsxs)(r.li,{children:[`When you reach the target delay, hold `,(0,n.jsx)(r.code,{children:`A`}),` while unpausing.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsxs)(r.p,{children:[`If you notice that you are pressing `,(0,n.jsx)(r.code,{children:`A`}),` at the right delay but hitting a different delay by +/-1, this can happen due to Gen 4 delays being always odd or always even. You can switch delays from even to odd or vice versa with the following methods:`]}),`
`,(0,n.jsx)(r.h3,{children:`Changing the year`}),`
`,(0,n.jsx)(r.p,{children:`Close your emulator, then change the year in RunAsDate to one year before or after your current year. This will change the delay as well. Verify your new delay in PokeFinder in the "Seed to Time" window. Relaunch Desmume with RunAsDate and load a save state to RNG for the new delay.`}),`
`,(0,n.jsx)(r.h3,{children:`Load a GBA game`}),`
`,(0,n.jsx)(r.p,{children:`Load a GBA game into the GBA slot in the emulator to switch the delay from even to odd, or vice versa.`}),`
`,(0,n.jsx)(r.h3,{children:`Continue Screen`}),`
`,(0,n.jsxs)(r.p,{children:[`Choose "New Game", then press `,(0,n.jsx)(r.code,{children:`B`}),` to cancel and go back to the continue screen, which will switch the delay from even to odd, or vice versa.`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};