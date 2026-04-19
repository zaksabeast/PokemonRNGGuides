import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-CvakMO0A.js";var n=e(),r={title:`mGBA Setup`,description:`Learn how to set up mGBA for GBA Pokémon RNG, including lua scripting support.`,slug:`mgba-setup`,category:`GBA Tools`,section:`tool`,addedOn:`2025-03-03`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://mgba.io/downloads.html#desktop-os-1`,children:`mGBA (development build)`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/tree/main/Gen%203/mGBA`,children:`Lua scripts`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Set up lua script`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Go to Tools -> Scripting...`}),`
`,(0,n.jsx)(r.li,{children:`Then File -> Load Script... and choose the lua script for your game version.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Every time you need to save or load a state, hold `,(0,n.jsx)(r.code,{children:`Shift + (n)`}),` or `,(0,n.jsx)(r.code,{children:`(n)`}),` with game unpaused.
This will load the save state to have the script read advances correctly.`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For example, `,(0,n.jsx)(r.code,{children:`Shift + 1`}),` to save a state in slot 1 or `,(0,n.jsx)(r.code,{children:`1`}),` to load the state in slot 1.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsxs)(r.h3,{children:[`Error: `,(0,n.jsx)(r.code,{children:`attempt to call a nil value (method 'setWatchpoint')`})]}),`
`,(0,n.jsx)(r.p,{children:`Make sure to use the development build of mGBA linked above. Other versions of mGBA will show this error.`}),`
`,(0,n.jsxs)(r.h3,{children:[`Error: `,(0,n.jsx)(r.code,{children:`attempt to index a nil value (global 'emu')`})]}),`
`,(0,n.jsx)(r.p,{children:`Make sure you have loaded a rom before attempting to run your lua script.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};