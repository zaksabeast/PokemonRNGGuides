import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-IIWtMu3s.js";var n=e(),r={title:`How to set up Ryujinx & CheatEngine`,navDrawerTitle:`Ryujinx Set Up`,description:`How to set up Ryujinx or Yuzu and Cheat Engine to RNG in Brilliant Diamond and Shining Pearl using lua scripts.`,slug:`bdsp-emulator-setup`,category:`Brilliant Diamond and Shining Pearl`,section:`tool`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://ryujinx.app/download`,children:`Ryujinx`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://www.cheatengine.org/downloads.php`,children:`Cheat Engine`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Real96/BDSP-CheatEngine-Lua`,children:`BDSP_RNG.lua`})}),`
`,(0,n.jsx)(r.li,{children:`Updated game to version 1.1.1 or higher`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Usage`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open Ryujinx, run the game, and pause it at the title screen.`}),`
`,(0,n.jsxs)(r.li,{children:[`Open Cheat Engine, click on `,(0,n.jsx)(r.code,{children:`Edit > Settings`}),`, select `,(0,n.jsx)(r.code,{children:`Scan Settings`}),`, and check the `,(0,n.jsx)(r.code,{children:`MEM_MAPPED`}),` option.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Click on `,(0,n.jsx)(r.code,{children:`File > Open Process`}),` and select the Yuzu or Ryujinx process.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Yuzu looks like `,(0,n.jsx)(r.code,{children:`xxxx-yuzu xxx | game name`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Ryujinx looks like `,(0,n.jsx)(r.code,{children:`xxxx-Ryujinx x.x.xxxx - game name`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Click on `,(0,n.jsx)(r.code,{children:`Table > Show Cheat Table Lua Script`}),`. A new window called `,(0,n.jsx)(r.code,{children:`Lua Script: Cheat Table`}),` will appear.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Open the `,(0,n.jsx)(r.code,{children:`BDSP_RNG.lua`}),` for your game version, copy all its content, and paste it in the window that just opened.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`Execute Script`}),`. It will freeze for a bit, just wait until it prints all the RNG info in a new window.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Notes`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`To change the info view tab mode, press the keys shown in the script output.`}),`
`,(0,n.jsxs)(r.li,{children:[`If you want to stop the script, press `,(0,n.jsx)(r.code,{children:`0`}),` or `,(0,n.jsx)(r.code,{children:`NumPad 0`}),`. It won't stop otherwise.`]}),`
`,(0,n.jsx)(r.li,{children:`If you want to restart the game, follow the previous steps and then restart the game and the script. It won't work otherwise.`}),`
`,(0,n.jsxs)(r.li,{children:[`To avoid text flickering, make sure to enlarge the `,(0,n.jsx)(r.code,{children:`Lua Engine`}),` window enough.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`What next?`}),`
`,(0,n.jsxs)(r.p,{children:[`Try to RNG for a shiny starter or legendary! `,(0,n.jsx)(r.a,{href:`/cfw-bdsp-stationary`,children:`BDSP Static RNG Guide`})]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};