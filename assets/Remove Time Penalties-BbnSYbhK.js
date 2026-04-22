import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-jyHeP0dh.js";var n=e(),r={title:`Remove Time Penalties in Omega Ruby and Alpha Sapphire`,navDrawerTitle:`Remove Time Penalties`,description:`Learn how to change the time in Omega Ruby and Alpha Sapphire without triggering time penalties.`,slug:`oras-remove-time-penalty`,category:`Omega Ruby and Alpha Sapphire`,section:`supporting_info`,addedOn:`2025-03-14`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`The game will lock time based events for 24 hours when any of these happen:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`A save is moved between consoles.`}),`
`,(0,n.jsx)(r.li,{children:`A cartridge was saved on one console, then played on another.`}),`
`,(0,n.jsx)(r.li,{children:`A save is copied from a physical console to an emulator.`}),`
`,(0,n.jsx)(r.li,{children:`A physical console's time is adjusted (emulator is fine).`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Adjusting time on emulators is fine because it acts as if real world time has passed, not as if you're changing console settings.`}),`
`,(0,n.jsx)(r.h2,{children:`Emulators (Citra, Lime3DS, Azahar)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Set your emulator date to be earlier than your desired date.`}),`
`,(0,n.jsx)(r.li,{children:`Start the game and save.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`That's it! You can now set the date to any future date without penalty.`}),`
`,(0,n.jsx)(r.h2,{children:`Physical Consoles`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Update your Pokemon Game to the latest version.`}),`
`,(0,n.jsx)(r.li,{children:`Set your console date to be earlier than your desired date.`}),`
`,(0,n.jsx)(r.li,{children:`Start the game, save, then close the game.`}),`
`,(0,n.jsxs)(r.li,{children:[`Enable IPS patching with `,(0,n.jsx)(r.a,{href:`/misc-3ds-ips-luma-citra`,children:`our patch guide`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Create a Luma patch folder if it doesn't exist:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Omega Ruby: `,(0,n.jsx)(r.code,{children:`/luma/titles/000400000011C400/`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Alpha Sapphire: `,(0,n.jsx)(r.code,{children:`/luma/titles/000400000011C500/`})]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Download the `,(0,n.jsx)(r.code,{children:`code.ips`}),` for your specific game and copy it to the patch folder`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/downloads/or-remove-time-penalty/code.ips`,children:`Omega Ruby code.ips`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/downloads/as-remove-time-penalty/code.ips`,children:`Alpha Sapphire code.ips`})}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`If you run into any issues in the future, remove the patch and follow those steps again.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Zaksabeast for looking into this and making the time penality removal patch.`}),`
`,(0,n.jsx)(r.li,{children:`Rebel on Discord for helping test.`}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};