import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BB5MVq97.js";var n=e(),r={title:`Ruby and Sapphire TID RNG`,navDrawerTitle:`TID RNG`,description:`Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire.`,slug:`emulator-rs-live-battery-tid`,category:`Ruby and Sapphire`,section:`other_rng`,variant:`cfw-emu`,guideKey:`rs-tid`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Finding Your Initial Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder and go to Gen 3 IDs, then select the RS tab.`}),`
`,(0,n.jsx)(r.li,{children:`Select the desired filter and enter the desired TIDs, SIDs, or TSVs.`}),`
`,(0,n.jsx)(r.li,{children:`Leave the time and date as is, or adjust if needed.`}),`
`,(0,n.jsxs)(r.li,{children:[`Click "Generate" and search for a matching TID.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If no results appear, try adjusting the time, date, or increasing max advances.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Hitting Your Initial Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`In mGBA, go to `,(0,n.jsx)(r.code,{children:`Tools -> Game Overrides...`}),` and enable "Realtime clock."`]}),`
`,(0,n.jsxs)(r.li,{children:[`Then go to `,(0,n.jsx)(r.code,{children:`Tools -> Game Pak Sensors...`}),`, select "Start time at," and enter the target time and date.`]}),`
`,(0,n.jsx)(r.li,{children:`Start the game and play until Prof. Birch says he'll see you later.`}),`
`,(0,n.jsx)(r.li,{children:`Let the game advance to the target number of advances, making save states along the way.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Advance at this screen:`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png`,alt:`Final Screen`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Adjusting for Delay`}),`
`,(0,n.jsxs)(r.p,{children:[`There is a delay between pressing `,(0,n.jsx)(r.code,{children:`A`}),` and when the TID/SID is generated. You need to account for this.`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Note your target advance.`}),`
`,(0,n.jsxs)(r.li,{children:[`When you reach it, press `,(0,n.jsx)(r.code,{children:`A`}),` to generate a TID.`]}),`
`,(0,n.jsx)(r.li,{children:`Enter this TID into PokeFinder and search for the result.`}),`
`,(0,n.jsxs)(r.li,{children:[`Compare your actual advance with the target to calculate the delay.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Example: If you aimed for advance `,(0,n.jsx)(r.strong,{children:`89103`}),` but hit `,(0,n.jsx)(r.strong,{children:`89175`}),`, your delay is `,(0,n.jsx)(r.strong,{children:`72`}),`, so you need to press `,(0,n.jsx)(r.code,{children:`A`}),` `,(0,n.jsx)(r.strong,{children:`72 advances earlier`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Reload a save state from before and press `,(0,n.jsx)(r.code,{children:`A`}),` at the new calculated advance.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`If your TID/SID are swapped, go one advance earlier.
`})}),`
`,(0,n.jsx)(r.p,{children:`Enjoy your new TID!`}),`
`,(0,n.jsx)(r.p,{children:`Here is an example of a successful ID RNG:`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Live-Battery-TID/Success.png`,alt:`Success`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};