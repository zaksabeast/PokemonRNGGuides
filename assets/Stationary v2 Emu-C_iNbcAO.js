import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DLFhP4kJ.js";var n=e(),r={title:`FireRed and LeafGreen Static RNG`,navDrawerTitle:`Static RNG`,description:`Static v2 RNG`,slug:`emulator-frlg-stationary`,category:`FireRed and LeafGreen`,isRoughDraft:!0,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsxs)(r.li,{children:[`Vlad's doc for delays: `,(0,n.jsx)(r.a,{href:`https://docs.google.com/document/d/11jxX7bTSGf2vzkdHr-lEpz2bLRI_u7zRbXaOtbasTp0`,children:`https://docs.google.com/document/d/11jxX7bTSGf2vzkdHr-lEpz2bLRI_u7zRbXaOtbasTp0`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Prepare for RNG`}),`
`,(0,n.jsx)(r.p,{children:`These scripts improve frame counting and reduce mistakes. With some technique, you can hit any frame without calibration. You need to know your Pokémon's basic delay to do this. I've provided as much data as possible. If something is missing, feel free to contact me.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open your emulator and save in front of the target.`}),`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder, select "Gen 3" => "Stationary" (Method 1). Select your profile.`}),`
`,(0,n.jsx)(r.li,{children:`In the delay box, check it and add the delay for your target.`}),`
`,(0,n.jsx)(r.li,{children:`Search for a target.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Advance Frames`}),`
`,(0,n.jsx)(r.p,{children:`You can advance many frames (about 1 million every 10 seconds with the Teachy TV).`}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Target the Frame`}),`
`,(0,n.jsxs)(r.p,{children:[`Go to the last input. When close to the target frame, pause the emulator (`,(0,n.jsx)(r.code,{children:`ctrl + p`}),`), and advance frame by frame (`,(0,n.jsx)(r.code,{children:`ctrl + n`}),`) to the frame shown by PokeFinder. Press `,(0,n.jsx)(r.code,{children:`A`}),` and unpause at the same time.`]}),`
`,(0,n.jsx)(r.p,{children:`Congrats! You're done!`})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};