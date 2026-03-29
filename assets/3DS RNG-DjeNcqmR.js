import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-D9rvoGGh.js";var n=e(),r=[{title:`HeartGold and Soulsilver 3DS RNG`,navDrawerTitle:`3DS RNG`,description:`Learn how to RNG using a 3DS in HeartGold and SoulSilver for shiny, high-IV Pokémon.`,slug:`hgss-3ds-rng`,category:`HeartGold and SoulSilver`,section:`technical_info`,addedOn:`2025-07-03`},{title:`Diamond, Pearl, and Platinum 3DS RNG`,navDrawerTitle:`3DS RNG`,description:`Learn how to RNG using a 3DS in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon.`,slug:`dppt-3ds-rng`,category:`Diamond, Pearl, and Platinum`,section:`technical_info`,addedOn:`2025-07-03`}];function i(e){let r={a:`a`,h2:`h2`,img:`img`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{Gist:i,YouTubeTable:a}=r;return i||o(`Gist`,!0),a||o(`YouTubeTable`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`This page explains why NDS RNG on 3DS can be inconsistent and how to fix it.`})}),`
`,(0,n.jsx)(r.h2,{children:`Video info`}),`
`,(0,n.jsx)(a,{videos:[{title:`Why 3DS RNG is Inconsistent`,id:`-ayvPKWNkNw`}]}),`
`,(0,n.jsx)(r.h2,{children:`TLDR`}),`
`,(0,n.jsx)(r.p,{children:`Just want the fix?`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Our Gen 4 tools have a "3DS Helper" feature! `,(0,n.jsx)(r.a,{href:`/3ds-helper`,children:`Learn about it here`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`For people with homebrew, there's an even easier method using the `,(0,n.jsx)(r.a,{href:`/3ds-alt-settings`,children:`3DS Alt Settings app`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`We don't have Gen 5 tools yet, but the 3DS Alt Settings app works for Gen 5 RNG too.`}),`
`,(0,n.jsx)(r.h2,{children:`The Problem`}),`
`,(0,n.jsx)(r.p,{children:`A common issue with NDS RNG on 3DS is inconsistent second values. It's often blamed on TwilightMenu or NDS launch delays, but I was skeptical.`}),`
`,(0,n.jsx)(r.p,{children:`If launch timing was truly the cause, soft resetting when your timer beeps (the common RNG approach) should fix it, but it doesn't.`}),`
`,(0,n.jsx)(r.p,{children:`That made me suspect the issue occurs earlier in the process.`}),`
`,(0,n.jsx)(r.h2,{children:`The Hypothesis`}),`
`,(0,n.jsx)(r.p,{children:`The real issue, if not the only one, seems to be how the 3DS sets the system time.`}),`
`,(0,n.jsx)(r.p,{children:`On many modern systems, manually setting the clock doesn't clear milliseconds, so your system time can carry leftover ms from before the change. For example, setting the time to 14:32:00 with 927ms internally results in 14:32:00.927.`}),`
`,(0,n.jsx)(r.p,{children:`If the 3DS has the same behavior, the 3DS time would be one second off in just a few milliseconds.`}),`
`,(0,n.jsx)(r.h2,{children:`The Tests`}),`
`,(0,n.jsx)(r.p,{children:`I wrote a research plugin to log timing info in System Settings every frame. Here's what to know from the screenshots:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Now`}),` = current system time`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Changed at`}),` = frame right before the time was set`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Measured after change`}),` = frame right after`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/3DS/3ds-helper-1.webp`,alt:`Screenshot 1`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/3DS/3ds-helper-2.webp`,alt:`Screenshot 2`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Findings:`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`In the first screenshot, the ms portion remains unchanged after setting the time - confirming the hypothesis.`}),`
`,(0,n.jsx)(r.li,{children:`In the second screenshot, after setting the time to 14:32 at 987 ms, the clock displayed 14:32:01 in less than one second - showing the issue is reproducible.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`The Fix`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Our Gen 4 tools have a "3DS Helper" feature! `,(0,n.jsx)(r.a,{href:`/3ds-helper`,children:`Learn about it here`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`For people with homebrew, there's an even easier method using the `,(0,n.jsx)(r.a,{href:`/3ds-alt-settings`,children:`3DS Alt Settings app`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`We don't have Gen 5 tools yet, but the 3DS Alt Settings app works for Gen 5 RNG too.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Zaksabeast for researching this and writing the tools to fix it`}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};