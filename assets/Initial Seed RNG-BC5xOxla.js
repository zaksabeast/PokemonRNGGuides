import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DzYB2I0T.js";var n=e(),r={title:`HeartGold and Soulsilver Initial Seed RNG`,navDrawerTitle:`Initial Seed RNG`,description:`Learn how to RNG your initial seed in HeartGold and SoulSilver.`,slug:`hgss-initial-seed`,category:`HeartGold and SoulSilver`,section:`rng_technique`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`This guide assumes that you have found a target seed already. You need your target seed and delay before following this guide.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://www.nirsoft.net/utils/run_as_date.html`,children:`RunAsDate`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`What is RunAsDate?`}),`
`,(0,n.jsx)(r.p,{children:`RunAsDate is a tool by Nirsoft that lets any program run with a time you set. It is useful for Gen 4 RNG and helps you hit your seed easily.`}),`
`,(0,n.jsx)(r.h2,{children:`Setup RunAsDate`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Launch RunAsDate.`}),`
`,(0,n.jsx)(r.li,{children:`Set up RunAsDate as shown in the image below.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/HeartGold-SoulSilver/Initial-Seed/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`You'll never have to change this again. This is the universal RunAsDate setup for RNG (Gen 3, 4, or 5), so you're almost done!
`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Select the program you want to fake the date/time with the `,(0,n.jsx)(r.code,{children:`Browse...`}),` button.`]}),`
`,(0,n.jsx)(r.li,{children:`Set the date and time to one of the given dates and times in PokeFinder to hit your seed.`}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`Run`}),`, and your Desmume should launch.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Hitting the target seed`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Make save states often during this process.
`})}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Load the lua script.`}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`A`}),` to get to the "Continue" screen quickly.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Pause your emulator with `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Make plenty of save states in case you mess up.`}),`
`,(0,n.jsx)(r.li,{children:`Unpause your game, and run until you get close to your target delay.`}),`
`,(0,n.jsx)(r.li,{children:`Once close, pause your emulator.`}),`
`,(0,n.jsx)(r.li,{children:`Create another save state (you never know what might happen!).`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`N`}),` to advance the game one video frame to increase the delay by one.`]}),`
`,(0,n.jsxs)(r.li,{children:[`When you're on the target delay, hold `,(0,n.jsx)(r.code,{children:`A`}),` while unpausing your game.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsxs)(r.p,{children:[`Sometimes, even if you press `,(0,n.jsx)(r.code,{children:`A`}),` at the right delay, the actual delay can be +/-1 of what you wanted. This can happen with Gen 4, where delays can be either always odd or always even. Use one of these methods to change delays from even to odd or vice versa.`]}),`
`,(0,n.jsx)(r.h3,{children:`Changing the year`}),`
`,(0,n.jsx)(r.p,{children:`Close your emulator and change the year in RunAsDate to one year before or after the current year. This change will adjust the delay. Verify the new delay with PokeFinder in the "Seed to Time" window by changing the year. Once adjusted, relaunch Desmume with RunAsDate and load a save state. Then you can RNG for the new delay.`}),`
`,(0,n.jsx)(r.h3,{children:`Load a GBA game`}),`
`,(0,n.jsx)(r.p,{children:`Loading a GBA game into the GBA slot in the emulator will switch the delay from even to odd, or vice versa.`}),`
`,(0,n.jsx)(r.h3,{children:`Continue Screen`}),`
`,(0,n.jsx)(r.p,{children:`At the screen to choose to continue your game, press the down arrow on the bottom touch screen to move the screen down, then press the up arrow to move it back up. This will switch the delay from even to odd, or vice versa.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Italian translation: Fiask.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};